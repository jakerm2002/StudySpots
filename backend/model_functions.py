from sqlalchemy import literal_column, text
from flask import request
from sqlalchemy import cast, String
from database.databases import db
from database.CoffeeShop import *
from database.University import *
from database.Library import *

NEARBY_RADIUS = 25

def get_nearby_universities(latitude, longitude, limit):
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
        .all()
    )
    if limit:
        universities_nearby = universities_nearby[:limit]
    return universities_schema.dumps(universities_nearby)

def get_nearby_coffeeshops(latitude, longitude, limit):
    sub = (
    db.session.query(
        CoffeeShop.name,
        CoffeeShop.id,
        CoffeeShop.latitude,
        CoffeeShop.longitude,
        CoffeeShop.rating,
        CoffeeShop.price,
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
        .all()
    )
    if limit:
        coffeeshops_nearby = coffeeshops_nearby[:limit]
    return coffeeshops_schema.dumps(coffeeshops_nearby)

def get_nearby_libraries(latitude, longitude, limit):
    sub = (
    db.session.query(
        Library.name,
        Library.id,
        Library.latitude,
        Library.longitude,
        Library.rating,
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
        .all()
    )
    if limit:
        libraries_nearby = libraries_nearby[:limit]
    return libraries_schema.dumps(libraries_nearby)

def get_model_cities(model):
    q = request.args.get("query", "")
    # ilike() specifies LIKE as not case sensitive
    cities = db.session.query(model.city)\
        .filter(cast( model.city, String ).ilike( q + '%' ))\
        .order_by(model.city).distinct().paginate(page=1, per_page=10)
    return cities.items

def get_model_zipcodes(model):
    q = request.args.get("query", "")
    zipcodes = db.session.query(model.zipcode)\
        .filter(cast( model.zipcode, String ).ilike( q + '%' ))\
        .order_by(model.zipcode).distinct().paginate(page=1, per_page=10)
    return zipcodes.items