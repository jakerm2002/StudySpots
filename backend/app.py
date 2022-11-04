from database.databases import *
from flask import Flask, request
import os

NEARBY_RADIUS = 25

def get_nearby_universities(latitude, longitude):
    sub = (
            db.session.query(
                University.name,
                University.id,
                University.latitude,
                University.longitude,
                literal_column(
                    "SQRT(POW(69.1 * (latitude - "
                    + latitude
                    + "), 2) + POW(69.1 * ("
                    + longitude
                    + " - longitude) * COS(latitude / 57.3), 2))"
                ).label("distance"),
            )
            .order_by("distance")
            .subquery()
        )
    universities_nearby = (
        db.session.query(sub)
        .filter(text("distance<" + str(NEARBY_RADIUS)))
        .limit(6)
        .all()
    )
    return universities_schema.dumps(universities_nearby)

def get_nearby_coffeeshops(latitude, longitude):
    sub = (
    db.session.query(
        CoffeeShop.name,
        CoffeeShop.id,
        CoffeeShop.latitude,
        CoffeeShop.longitude,
        literal_column(
            "SQRT(POW(69.1 * (latitude - "
            + latitude
            + "), 2) + POW(69.1 * ("
            + longitude
            + " - longitude) * COS(latitude / 57.3), 2))"
        ).label("distance"),
    )
    .order_by("distance")
    .subquery()
    )
    coffeeshops_nearby = (
        db.session.query(sub)
        .filter(text("distance<" + str(NEARBY_RADIUS)))
        .limit(6)
        .all()
    )
    return coffeeshops_schema.dumps(coffeeshops_nearby)

def get_nearby_libraries(latitude, longitude):
    sub = (
    db.session.query(
        Library.name,
        Library.id,
        Library.latitude,
        Library.longitude,
        literal_column(
            "SQRT(POW(69.1 * (latitude - "
            + latitude
            + "), 2) + POW(69.1 * ("
            + longitude
            + " - longitude) * COS(latitude / 57.3), 2))"
        ).label("distance"),
    )
    .order_by("distance")
    .subquery()
    )
    libraries_nearby = (
        db.session.query(sub)
        .filter(text("distance<" + str(NEARBY_RADIUS)))
        .limit(6)
        .all()
    )
    return libraries_schema.dumps(libraries_nearby)

# link any possible exact filters with the arguments passed into them
# ex: stateFilter='TX'   cityFilter='Austin'
# this method will then return a dictionary:
#   {
#   University.state : ['TX'],
#   University.city : ['Austin'],
#   University.zipcode : []
#   }
def get_exact_filters(request_args, exact_filter_fields):
    exact_filters = {}
    for field in exact_filter_fields:
        filter_name = field.name + 'Filter'
        elements = get_filter_elements(request_args, filter_name)

        # if we didn't filter by a field, we don't need to add it to the
        # query. only add filters containing elements.
        if elements:
            exact_filters[field] = elements

    return exact_filters

# return a list containing the inidivudal elements
# passed into the API paramter {fieldName}.
# for example, if we call the API with stateFilter=TX,CA
# then get_filter_elements(request_args, stateFilter) will return ['TX', 'CA']
def get_filter_elements(request_args, filter_name):
    # we will treat every filter parameter like it is a list,
    # meaning we are going to assume we may be recieving multiple parameters,
    # ex: stateFilter=TX,CA

    # check if the filter parameter was actually passed into the request
    if filter_name in request_args:
        elements = request_args[filter_name].split(",")
        return elements
    
    # if we didn't filter by a field, just return an empty list
    return []

# add our exact filters to the query.
def add_exact_filters(existing_query, filters):
    # for each of the fields (state, city, zipcode),
    # filter based on the arguments we have passed in to
    # stateFilter, cityFilter, and zipcodeFilter

    new_query = []
    for field in filters:
        if field.type.python_type is list:
            new_query.append(field.contains(filters[field]))
        else:
            new_query.append(field.in_(filters[field]))
    return existing_query.filter(*new_query)


    



@app.route("/universities")
def universities():
    # this should be the names of the fields we want exact filters for
    # and this should be the DATABASE name of the field.
    exact_filter_fields = [
        University.state,
        University.city,
        University.zipcode
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
    # We are also going to create a get_sort_field method that looks for the
    # API parameters sortBy (type String) and ascOrder (type Boolean)
    # For the Universities model, the possible sort fields will be:
    #   - Name
    #   - Undergraduate Population
    #   - Acceptance Rate
    #   - In-State Tuition
    #   - Out-of-State Tuition

    if latitude and longitude:
        return get_nearby_universities(latitude, longitude)
    
    exact_filters = get_exact_filters(request.args, exact_filter_fields)

    base_query = db.session.query(University)
    base_query = add_exact_filters(base_query, exact_filters)
    base_query = base_query.order_by(University.id)
    base_query = base_query.paginate(page=page, per_page=per_page)
    all_universities = base_query

    # **** TODO ****
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
    return universities_schema.dumps(all_universities.items)


@app.route("/universities/<string:id>")
def universities_by_id(id):
    university = University.query.filter_by(id=id).first()
    return university_schema.dumps(university)


@app.route("/coffeeshops")
def coffeeshops():
    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
        return get_nearby_coffeeshops(latitude, longitude)

    all_coffee_shops = (
        db.session.query(CoffeeShop)
        .order_by(CoffeeShop.id)
        .paginate(page=page, per_page=per_page)
    )
    return coffeeshops_schema.dumps(all_coffee_shops.items)


@app.route("/coffeeshops/<string:id>")
def coffeeshops_by_id(id):
    coffeeshop = CoffeeShop.query.filter_by(id=id).first()
    return coffeeshop_schema.dumps(coffeeshop)


@app.route("/libraries")
def libraries():
    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
        return get_nearby_libraries(latitude, longitude)

    all_libraries = (
        db.session.query(Library)
        .order_by(Library.id)
        .paginate(page=page, per_page=per_page)
    )
    return libraries_schema.dumps(all_libraries.items)


@app.route("/libraries/<string:id>")
def libraries_by_id(id):
    library = Library.query.filter_by(id=id).first()
    return library_schema.dumps(library)


@app.route("/")
def home():
    return "Welcome to the Study Spots API!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
    # app.run()
