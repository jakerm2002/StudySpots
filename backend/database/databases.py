from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import os

app = Flask(__name__)
app.config['DEBUG'] = True
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class University(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String())
    zipcode = db.Column(db.String())
    city = db.Column(db.String())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    population = db.Column(db.Integer)
    instate_tuition = db.Column(db.Float)
    outstate_tuition = db.Column(db.Float)
    acceptance_rate = db.Column(db.Float)
    def __init__(self,
                    id="NaN", 
                    name="NaN",
                    zipcode="NaN",
                    city="NaN",
                    latitude=0.0,
                    longitude=0.0,
                    population=0,
                    instate_tuition=0.0,
                    outstate_tuition=0.0,
                    acceptance_rate=0.0):
        self.id = id
        self.name = name
        self.zipcode = zipcode
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.population = population
        self.instate_tuition = instate_tuition
        self.outstate_tuition = outstate_tuition
        self.acceptance_rate = acceptance_rate

class UniversitySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (
            "id",
            "name",
            "zipcode",
            "city",
            "latitude",
            "longitude",
            "population",
            "instate_tuition",
            "outstate_tuition",
            "acceptance_rate"
        )

university_schema = UniversitySchema()
universities_schema = UniversitySchema(many=True)

def populate_universities():
    file_path = os.path.join(os.getcwd(), 'database/api_information/all_universities.json')
    file = open(file_path, 'r')
    db.create_all()
    universities_json = json.load(file)

    universities_list = []
    for university in universities_json:
        new_university = University(
            id=university["id"],
            name=university["latest.school.name"],
            zipcode=university["latest.school.zip"],
            city=university["latest.school.city"],
            latitude=university["location.lat"],
            longitude=university["location.lon"],
            population=university["latest.student.size"],
            instate_tuition=university["latest.cost.tuition.in_state"],
            outstate_tuition=university["latest.cost.tuition.out_of_state"],
            acceptance_rate=university["latest.admissions.admission_rate.overall"],
        )
        universities_list.append(new_university)

    db.session.add_all(universities_list)
    db.session.commit()

    file.close()

class CoffeeShop(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String())
    image_url = db.Column(db.String())
    zipcode = db.Column(db.String())
    city = db.Column(db.String())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    price = db.Column(db.String())
    phone = db.Column(db.String())
        
    def __init__(self, id="NaN", name="NaN", image_url="", zipcode="NaN", city="NaN", latitude=0.0, longitude=0.0, rating=0, price="NaN", phone="NaN"):
        self.id = id
        self.name = name
        self.image_url=image_url
        self.zipcode = zipcode
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.rating = rating
        self.price = price
        self.phone = phone

class CoffeeShopSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (
            "id",
            "name",
            "image_url",
            "zipcode",
            "city",
            "latitude",
            "longitude",
            "rating",
            "price",
            "phone"
        )

coffeeshop_schema = CoffeeShopSchema()
coffeeshops_schema = CoffeeShopSchema(many=True)

def populate_coffee_shops():
    file_path = os.path.join(os.getcwd(), 'database/api_information/all_coffee_shops.json')
    file = open(file_path, 'r')
    db.create_all()
    coffeeshops_json = json.load(file)

    coffeeshops_list = []
    for coffee_shop in coffeeshops_json:
        new_coffeeshop = CoffeeShop(
            id=coffee_shop['id'],
            name=coffee_shop['name'],
            image_url=coffee_shop['image_url'],
            zipcode=coffee_shop['location']['zip_code'],
            city=coffee_shop['location']['city'],
            latitude=coffee_shop['coordinates']['latitude'],
            longitude=coffee_shop['coordinates']['longitude'],
            rating=coffee_shop['rating'],
            price=coffee_shop['price'] if 'price' in coffee_shop else 'N/A',
            phone=coffee_shop['phone']
        )
        coffeeshops_list.append(new_coffeeshop)

    db.session.add_all(coffeeshops_list)
    db.session.commit()

    file.close()

class Library(db.Model):
    library_id = db.Column(db.String(), primary_key=True)
    library_name = db.Column(db.String())
    library_address = db.Column(db.String())
    library_city = db.Column(db.String())
    library_lat = db.Column(db.Float)
    library_long = db.Column(db.Float)
    library_rating = db.Column(db.Float)
        
    def __init__(self, library_id="NaN", library_name="NaN", library_address="NaN", library_lat=0.0, library_long=0.0, library_rating=0.0, library_city="NaN"):
        self.library_id = library_id
        self.library_name = library_name
        self.library_address = library_address
        self.library_city = library_city
        self.library_lat = library_lat
        self.library_long = library_long
        self.library_rating = library_rating

#TODO: change based on how the format of the json files turn out
def populate_libraries():
    file_path = os.path.join(os.getcwd(), 'database/api_information/libraries.json')
    file = open(file_path, 'r')
    db.create_all()
    libraries_json = json.load(file)

    libraries_list = []
    for library in libraries_json:
        new_library = Library(
            library_id=library['place_id'],
            library_name=library['name'],
            library_address=library['formatted_address'],
            library_lat=library['geometry']['location']['lat'],
            library_long=library['geometry']['location']['lng'],
            library_rating=library['rating']
        )
        libraries_list.append(new_library)

    db.session.add_all(libraries_list)
    db.session.commit()

    file.close()

def clear_databases():
    print("Clearing previous databases")
    db.session.remove()
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    print("Creating the databases")
    clear_databases()
    print("Creating University database")
    populate_universities()
    print("Finished University databse. Creating Coffee Shop database")
    populate_coffee_shops()
    print("Finished Coffee Shop database")
    # populate_libraries()

