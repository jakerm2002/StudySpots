from database.databases import *
from flask import Flask, request
import os

@app.route('/universities')
def universities():
    all_universities = University.query.all()
    return universities_schema.dumps(all_universities)

@app.route('/universities/<string:id>')
def universities_by_id(id):
    university = University.query.filter_by(id=id).first()
    return university_schema.dumps(university)

@app.route('/coffeeshops')
def coffeeshops():
    all_coffee_shops = CoffeeShop.query.all()
    return coffeeshops_schema.dumps(all_coffee_shops)

@app.route('/coffeeshops/<string:id>')
def coffeeshops_by_id(id):
    coffeeshop = CoffeeShop.query.filter_by(id=id).first()
    return coffeeshop_schema.dumps(coffeeshop)

@app.route('/')
def home():
    return "Welcome to the Study Spots API!"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
    # app.run()