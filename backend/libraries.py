from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import requests


def initialize_db(db):
    # Define library table/data model
    class library(db.Model):
        library_id = db.Column(db.String(), primary_key=True)
        library_name = db.Column(db.String())
        library_address = db.Column(db.Integer)
        library_city = db.Column(db.String())
        library_lat = db.Column(db.Float)
        library_long = db.Column(db.Float)
        library_rating = db.Column(db.Float)
        library_phone = db.Column(db.String())
        
    def __init__(self, library_id="NaN", library_name="NaN", library_address="NaN", library_lat=0.0, library_long=0.0, library_rating=0.0, library_city="NaN", library_phone="NaN"):
        self.library_id = library_id
        self.library_name = library_name
        self.library_address = library_address
        self.library_city = library_city
        self.library_lat = library_lat
        self.library_long = library_long
        self.library_rating = library_rating
        self.library_phone = library_phone

    # creates the table
    db.create_all()

    # Get API request
    api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
    api_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    #headers = {'Authorization': 'Bearer {}'.format(api_key)}

    # customize search parameters for Yelp GET call
    params={
        "query": "library"
        "key": api_key
    }

    # response.content will give you raw json
    response = requests.get(api_url, params = params)

    # prints reponse to json
    # with open('response.json', 'w') as f:
    #     json.dump(response.json(), f, indent = 4)    
        
    data = response.json()
    return (data, library)


# List of library instances to be added to db
def libraries_list_maker(db) :

    result = initialize_db(db)
    data = result[0]
    library = result[1]

    library_list = []
    for item in data['results']:
        new_library = library(
                        library_id=item['place_id'],
                        library_name=item['name'],
                        library_address=item['formatted_address'],
                        library_lat=item['geometry']['location']['lat'],
                        library_long=item['geometry']['location']['lng'],
                        library_rating=item['rating'],
                        library_phone=item['phone']
                        )
        library_list.append(new_library)


    print(library_list)
    return library_list