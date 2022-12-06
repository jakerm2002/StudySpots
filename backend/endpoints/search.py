from flask import Blueprint, request
from query import *
from database.CoffeeShop import CoffeeShop, coffeeshops_schema
from database.University import University, universities_schema
from database.Library import Library, libraries_schema
from endpoints.coffeeshops import search_fields as coffeeshop_search_fields
from endpoints.universities import search_fields as university_search_fields
from endpoints.libraries import search_fields as library_search_fields
import json

search = Blueprint("search", __name__)

# Sitewide search
@search.route("/search")
def search_entire_site():
    search_query = request.args.get("search") if request.args.get("search") else ""
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    matching_universities = generate_query(
        University,
        page,
        per_page,
        [],
        [],
        University.id,
        university_search_fields,
        search_query,
    )
    matching_coffeeshops = generate_query(
        CoffeeShop,
        page,
        per_page,
        [],
        [],
        CoffeeShop.id,
        coffeeshop_search_fields,
        search_query,
    )
    matching_libraries = generate_query(
        Library, page, per_page, [], [], Library.id, library_search_fields, search_query
    )

    matching_university_info = json.loads(
        universities_schema.dumps(matching_universities.items)
    )
    matching_coffeeshop_info = json.loads(
        coffeeshops_schema.dumps(matching_coffeeshops.items)
    )
    matching_library_info = json.loads(libraries_schema.dumps(matching_libraries.items))

    return {
        "metadata": {
            "university_metadata": {
                "num_results": len(matching_university_info),
                "num_total_results": matching_universities.query.count(),
            },
            "coffeeshop_metadata": {
                "num_results": len(matching_coffeeshop_info),
                "num_total_results": matching_coffeeshops.query.count(),
            },
            "library_metadata": {
                "num_results": len(matching_library_info),
                "num_total_results": matching_libraries.query.count(),
            },
        },
        "university_results": matching_university_info,
        "coffeeshop_results": matching_coffeeshop_info,
        "library_results": matching_library_info,
    }
