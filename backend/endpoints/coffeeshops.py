from flask import Blueprint, request
from query import *
from database.CoffeeShop import *
from model_functions import get_nearby_coffeeshops, get_model_cities, get_model_zipcodes

coffeeshops = Blueprint("coffeeshops", __name__)


@coffeeshops.route("/coffeeshops")
def get_coffeeshops():
    exact_filter_fields = [CoffeeShop.state, CoffeeShop.city, CoffeeShop.zipcode]

    range_filter_fields = [
        CoffeeShop.price_integer,
        CoffeeShop.rating,
    ]

    time_filter_fields = [
        CoffeeShop.hours_day_0_closed,
        CoffeeShop.hours_day_1_closed,
        CoffeeShop.hours_day_2_closed,
        CoffeeShop.hours_day_3_closed,
        CoffeeShop.hours_day_4_closed,
        CoffeeShop.hours_day_5_closed,
        CoffeeShop.hours_day_6_closed,
    ]

    sort_filter_fields = [
        CoffeeShop.id,
        CoffeeShop.name,
        CoffeeShop.review_count,
        CoffeeShop.rating,
        CoffeeShop.price_integer,
    ]

    search_fields = [
        CoffeeShop.name,
        CoffeeShop.image_url,
        CoffeeShop.zipcode,
        CoffeeShop.city,
        CoffeeShop.price,
        CoffeeShop.phone,
        CoffeeShop.address1,
        CoffeeShop.state,
        CoffeeShop.display_address,
        CoffeeShop.photo,
        CoffeeShop.review_1_text,
        CoffeeShop.review_2_text,
        CoffeeShop.review_3_text,
        CoffeeShop.review_1_author,
        CoffeeShop.review_2_author,
        CoffeeShop.review_3_author,
    ]

    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
        return get_nearby_coffeeshops(latitude, longitude)

    search_query = request.args.get("search") if request.args.get("search") else ""
    exact_filters = get_exact_filters(request.args, exact_filter_fields)
    range_filters = get_range_filters(request.args, range_filter_fields)
    time_filters = get_time_filters(request.args, time_filter_fields)
    sort_attributes = get_sort_attributes(request.args, sort_filter_fields, CoffeeShop)

    all_coffee_shops = generate_query(
        CoffeeShop,
        page,
        per_page,
        exact_filters,
        range_filters,
        sort_attributes,
        search_fields,
        search_query,
        time_filters=time_filters,
    )

    coffee_shop_info = json.loads(coffeeshops_schema.dumps(all_coffee_shops.items))
    metadata = {
        "page": page,
        "per_page": per_page,
        "num_results": len(coffee_shop_info),
        "num_total_results": all_coffee_shops.query.count(),
    }
    return {"metadata": metadata, "results": coffee_shop_info}


@coffeeshops.route("/coffeeshops/<string:id>")
def coffeeshops_by_id(id):
    coffeeshop = CoffeeShop.query.filter_by(id=id).first()
    return coffeeshop_schema.dumps(coffeeshop)


# support for autocomplete in frontend filter fields
@coffeeshops.route("/coffeeshops/cities")
def coffeeshops_list_cities():
    cities = get_model_cities(CoffeeShop)
    return coffeeshops_schema.dumps(cities)


@coffeeshops.route("/coffeeshops/zipcodes")
def coffeeshops_list_zipcodes():
    zipcodes = get_model_zipcodes(CoffeeShop)
    return coffeeshops_schema.dumps(zipcodes)
