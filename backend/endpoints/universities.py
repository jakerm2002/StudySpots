from flask import Blueprint, request
from query import *
from database.University import *
from model_functions import get_nearby_universities, get_model_cities, get_model_zipcodes

universities = Blueprint("universities", __name__)

@universities.route("/universities")
def get_universities():
    # this should be the names of the fields we want exact filters for
    # and this should be the DATABASE name of the field.
    exact_filter_fields = [
        University.state,
        University.city,
        University.zipcode
    ]

    range_filter_fields = [
        University.enrollment_ugr_12m,
        University.instate_tuition,
        University.outstate_tuition,
        University.sat_median_math,
        University.sat_median_reading,
        University.acceptance_rate,
        University.sat_average
    ]

    sort_filter_fields = [
        University.id,
        University.name,
        University.enrollment_ugr_12m,
        University.instate_tuition,
        University.outstate_tuition,
        University.acceptance_rate,
        University.sat_average
    ]

    # TODO: search fields can only be for Strings -- provide support for other fields?
    search_fields = [
        University.name,
        University.alias,
        University.zipcode,
        University.city,
        University.state,
        University.url,
        University.description,
        University.photo,
    ]

    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    # Exact filters will be based on certain columns in the DB:
    # for example, City, State, Zip Code are all exactly filterable.
    # 
    # If we wanted to filter by state, we will need a stateFilter
    # parameter that takes in a list of one or more states to filter by.
    # For example, if we wanted universities in Texas and California,
    # we would have a parameter in our API call: stateFilter=TX,CA
    #
    # Let's say we just want universities in Texas.
    # Our API call would then include the parameter: stateFilter=TX
    # If we also wanted to filter by city, we can add on another exact filter
    # called cityFilter. For example, if we wanted universities in Austin,
    # we can add an additional parameter: cityFilter=Austin.
    # Our API call would then have a form of something like:
    #   api.studyspots.me/universities?stateFilter=TX&cityFilter=Austin
    #
    # Of course, this means that we need to modify our SQLAlchemy query
    # so that we filter by multiple things.
    # In SQL, the above API call would look like:
    #   SELECT * from universities WHERE state = 'TX' and city = 'Austin'
    # However, SQLAlchemy does not use raw SQL, so we will have to implement
    # this slightly differently. We can use the .filter() method to narrow
    # down our query. Calling .filter() on a query will return another query
    # object. We can call filter() again on this one with a new parameter.
    # We will use list unpacking to call filter() on a query with multiple
    # filter parameters.
    #
    # We are going to create a get_exact_filters method that fetches
    # all of the exact filters for a model.
    # For the Universities model, the exact filters will be:
    #   - State
    #   - City
    #   - Zip Code
    #
    # We are also going to create a get_sort_attributes method that looks for the
    # API parameters sortBy (type String) and ascending (type Boolean)
    # For the Universities model, the possible sort fields will be:
    #   - Name
    #   - Undergraduate Population
    #   - Acceptance Rate
    #   - In-State Tuition
    #   - Out-of-State Tuition

    if latitude and longitude:
        return get_nearby_universities(latitude, longitude)
    
    search_query = request.args.get("search") if request.args.get("search") else ""
    exact_filters = get_exact_filters(request.args, exact_filter_fields)
    range_filters = get_range_filters(request.args, range_filter_fields)
    sort_attributes = get_sort_attributes(request.args, sort_filter_fields, University)
    
    all_universities = generate_query(University, page, per_page, exact_filters, range_filters, sort_attributes, search_fields, search_query)
    print(all_universities.query.count())

    # Filtering by an exact filter will reduce the number of results
    # returned by the API. We will no longer be returning ALL universities
    # every time. This means there will no longer be a fixed number of pages
    # if we start filtering things.
    # 
    # For example, there are 22 universities in the database that are in TX.
    # A call to the universities API with parameter stateFilter=TX will
    # will display 10 of them, because our default per_page value is 10.
    # We can add on a page= parameter to go to pages 2 and 3 of the results.
    # However, in order for the frontend to know how to paginate the results,
    # we need to find out a way to return the number of pages our API call
    # is generating.
    #
    # This means our api response should now be in the form:
    # {
    #   "page": the current page, probably optional but let's include it
    #   "per_page": number of results per page, let's include this too
    #   "num_results": number of results on this page
    #   "num_total_results": number of total results without pagination, 
    #       we definitely need this one
    #   "results": [ data for the universities goes here ]
    # }
    #
    # page, per_page, and num_results are optional because we are going to set
    # page and per_page on the frontend, and num_results is calculated by
    # calling length() on the API response in the frontend.
    # response = {}
    # response["page"] = page
    # response["per_page"] = per_page
    # response["num_results"] = len(json.loads(universities_schema.dumps(all_universities.items)))
    # response["num_total_results"] = all_universities.query.count()
    # response["results"] = json.loads(universities_schema.dumps(all_universities.items))

    # print(type(json.loads(universities_schema.dumps(all_universities.items))))
    # print (json.loads(universities_schema.dumps(all_universities.items)))

    university_info = json.loads(universities_schema.dumps(all_universities.items))
    metadata = {
        "page": page,
        "per_page": per_page,
        "num_results": len(university_info),
        "num_total_results": all_universities.query.count()
    }
    return {"metadata": metadata, "results": university_info}


@universities.route("/universities/<string:id>")
def universities_by_id(id):
    university = University.query.filter_by(id=id).first()
    return university_schema.dumps(university)

# support for autocomplete in frontend filter fields
@universities.route("/universities/cities")
def universities_list_cities():
    cities = get_model_cities(University)
    return universities_schema.dumps(cities)

@universities.route("/universities/zipcodes")
def universities_list_zipcodes():
    zipcodes = get_model_zipcodes(University)
    return universities_schema.dumps(zipcodes)