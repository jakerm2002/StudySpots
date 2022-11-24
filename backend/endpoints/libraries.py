from flask import Blueprint, request
from query import *
from database.Library import *
from model_functions import get_nearby_libraries, get_model_cities, get_model_zipcodes

libraries = Blueprint("libraries", __name__)


@libraries.route("/libraries")
def get_libraries():
    exact_filter_fields = [Library.state, Library.city, Library.zipcode]

    range_filter_fields = [Library.rating]

    sort_filter_fields = [
        Library.id,
        Library.name,
        Library.rating,
    ]

    search_fields = [
        Library.name,
        Library.address,
        Library.state,
        Library.city,
        Library.zipcode,
        Library.phone,
        Library.rating_string,
        Library.website,
        Library.review_1_text,
        Library.review_2_text,
        Library.review_3_text,
        Library.review_1_author,
        Library.review_2_author,
        Library.review_3_author,
    ]

    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
        return get_nearby_libraries(latitude, longitude)

    search_query = request.args.get("search") if request.args.get("search") else ""
    exact_filters = get_exact_filters(request.args, exact_filter_fields)
    range_filters = get_range_filters(request.args, range_filter_fields)
    sort_attributes = get_sort_attributes(request.args, sort_filter_fields, Library)

    all_libraries = generate_query(
        Library,
        page,
        per_page,
        exact_filters,
        range_filters,
        sort_attributes,
        search_fields,
        search_query,
    )

    library_info = json.loads(libraries_schema.dumps(all_libraries.items))
    metadata = {
        "page": page,
        "per_page": per_page,
        "num_results": len(library_info),
        "num_total_results": all_libraries.query.count(),
    }
    return {"metadata": metadata, "results": library_info}


@libraries.route("/libraries/<string:id>")
def libraries_by_id(id):
    library = Library.query.filter_by(id=id).first()
    return library_schema.dumps(library)


# support for autocomplete in frontend filter fields
@libraries.route("/libraries/cities")
def libraries_list_cities():
    cities = get_model_cities(Library)
    return libraries_schema.dumps(cities)


@libraries.route("/libraries/zipcodes")
def libraries_list_zipcodes():
    zipcodes = get_model_zipcodes(Library)
    return libraries_schema.dumps(zipcodes)
