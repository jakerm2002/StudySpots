from database.databases import *
from flask import Flask, request, jsonify
import os


@app.route("/universities")
def universities():
    # Possible arguments that can be added to request
    page = int(request.args.get("page")) if request.args.get("page") else 1
    per_page = int(request.args.get("per_page")) if request.args.get("per_page") else 10

    all_universities = db.session.query(University).paginate(
        page=page, per_page=per_page
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

    all_coffee_shops = db.session.query(CoffeeShop).paginate(
        page=page, per_page=per_page
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

    all_libraries = db.session.query(Library).paginate(page=page, per_page=per_page)
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
