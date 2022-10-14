from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json

app = Flask(__name__)
app.config['DEBUG'] = True
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)

class Universities(db.Model):
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

def populate_universities():
    file = open('api_information/all_universities.json', 'r')
    db.create_all()
    universities_json = json.load(file)

    universities_list = []
    for university in universities_json:
        new_university = Universities(
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
    coffeeshop_id = db.Column(db.String(), primary_key=True)
    coffeeshop_name = db.Column(db.String())
    coffeeshop_zipcode = db.Column(db.Integer)
    coffeeshop_city = db.Column(db.String())
    coffeeshop_lat = db.Column(db.Float)
    coffeeshop_long = db.Column(db.Float)
    coffeeshop_rating = db.Column(db.Float)
    coffeeshop_price = db.Column(db.String())
    coffeeshop_phone = db.Column(db.String())
        
    def __init__(self, coffeeshop_id="NaN", coffeeshop_name="NaN", coffeeshop_zipcode="NaN", city="NaN", coffeeshop_lat=0.0, coffeeshop_long=0.0, coffeeshop_rating=0, coffeeshop_price="NaN", coffeeshop_phone="NaN"):
        self.coffeeshop_id = coffeeshop_id
        self.coffeeshop_name = coffeeshop_name
        self.coffeeshop_zipcode = coffeeshop_zipcode
        self.coffeeshop_city = city
        self.coffeeshop_lat = coffeeshop_lat
        self.coffeeshop_long = coffeeshop_long
        self.coffeeshop_rating = coffeeshop_rating
        self.coffeeshop_price = coffeeshop_price
        self.coffeshop_phone = coffeeshop_phone

#TODO: change based on how the format of the json files turn out
def populate_coffee_shops():
    file = open('api_information/coffee_shops.json', 'r')
    db.create_all()
    coffeeshops_json = json.load(file)

    coffeeshops_list = []
    for coffee_shop in coffeeshops_json:
        new_coffeeshop = CoffeeShop(
            coffeeshop_id=library['id'],
            coffeeshop_name=library['name'],
            coffeeshop_zipcode=library['location']['zip_code'],
            coffeeshop_city=library['location']['city'],
            coffeeshop_lat=library['coordinates']['latitude'],
            coffeeshop_long=library['coordinates']['longitude'],
            coffeeshop_rating=library['rating'],
            coffeeshop_price=library['price'] if 'price' in library else 'N/A',
            coffeeshop_phone=library['phone']
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
    file = open('api_information/libraries.json', 'r')
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
    populate_universities()
    # populate_coffee_shops()
    populate_libraries()

