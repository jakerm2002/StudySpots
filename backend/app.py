from database.databases import *
from flask import Flask, request
import os

NEARBY_RADIUS = 25


@app.route("/universities")
def universities():
    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    # zip code parameter means you can give the endpoint a zipcode
    # and it will return all universities in that zipcode
    zipcode = request.args.get("zipcode") if request.args.get("zipcode") else None
    if zipcode:
        universities_matching_zipcodes = University.query.filter_by(zipcode=zipcode)
        return universities_schema.dumps(universities_matching_zipcodes)

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
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

    all_universities = (
        db.session.query(University)
        .order_by(University.id)
        .paginate(page=page, per_page=per_page)
    )
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

    zipcode = request.args.get("zipcode") if request.args.get("zipcode") else None
    if zipcode:
        coffeeshops_matching_zipcodes = CoffeeShop.query.filter_by(zipcode=zipcode)
        return coffeeshops_schema.dumps(coffeeshops_matching_zipcodes)

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
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

    zipcode = request.args.get("zipcode") if request.args.get("zipcode") else None
    if zipcode:
        libraries_matching_zipcodes = Library.query.filter_by(zipcode=zipcode)
        return libraries_schema.dumps(libraries_matching_zipcodes)

    latitude = request.args.get("latitude") if request.args.get("latitude") else None
    longitude = request.args.get("longitude") if request.args.get("longitude") else None

    if latitude and longitude:
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
