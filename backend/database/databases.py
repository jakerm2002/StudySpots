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
    alias = db.Column(db.String())
    zipcode = db.Column(db.String())
    city = db.Column(db.String())
    state = db.Column(db.String())
    url = db.Column(db.String())
    locale = db.Column(db.Integer)
    size = db.Column(db.Integer)
    enrollment_all = db.Column(db.Integer)
    enrollment_ugr_12m = db.Column(db.Integer)
    enrollment_gr_12m = db.Column(db.Integer)
    instate_tuition = db.Column(db.Float)
    outstate_tuition = db.Column(db.Float)
    acceptance_rate = db.Column(db.Float)
    carnegie_basic = db.Column(db.Integer)
    ownership = db.Column(db.Integer)
    institutional_characteristics = db.Column(db.Integer)
    sat_average = db.Column(db.Integer)
    sat_median_math = db.Column(db.Integer)
    sat_median_writing = db.Column(db.Integer)
    sat_median_reading = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    

    def __init__(self,
                    id="NaN", 
                    name="NaN",
                    alias="NaN",
                    zipcode="NaN",
                    city="NaN",
                    state = "NaN",
                    url = "NaN",
                    locale = 0,
                    size = 0,
                    enrollment_all = 0,
                    enrollment_ugr_12m = 0,
                    enrollment_gr_12m = 0,
                    instate_tuition = 0.0,
                    outstate_tuition = 0.0,
                    acceptance_rate = 0.0,
                    carnegie_basic = 0,
                    ownership = 0,
                    institutional_characteristics = 0,
                    sat_average = 0,
                    sat_median_math = 0,
                    sat_median_writing = 0 ,
                    sat_median_reading = 0 ,
                    latitude=0.0,
                    longitude=0.0):
        self.id = id
        self.name = name
        self.alias = alias
        self.zipcode = zipcode
        self.city = city
        self.state = state
        self.url = url
        self.locale = locale
        self.size = size
        self.enrollment_all = enrollment_all
        self.enrollment_ugr_12m = enrollment_ugr_12m
        self.enrollment_gr_12m = enrollment_gr_12m
        self.instate_tuition = instate_tuition
        self.outstate_tuition = outstate_tuition
        self.acceptance_rate = acceptance_rate
        self.carnegie_basic = carnegie_basic
        self.ownership = ownership
        self.institutional_characteristics = institutional_characteristics
        self.sat_average = sat_average
        self.sat_median_math = sat_median_math
        self.sat_median_writing = sat_median_writing
        self.sat_median_reading = sat_median_reading
        self.latitude = latitude
        self.longitude = longitude

        

class UniversitySchema(ma.Schema):
    class Meta: # for flask_marshmallow
        # Fields to expose
        fields = (
            "id",
            "name",
            "alias",
            "zipcode",
            "city",
            "state",
            "url",
            "locale",
            "size",
            "enrollment_all",
            "enrollment_ugr_12m",
            "enrollment_gr_12m",
            "instate_tuition",
            "outstate_tuition",
            "acceptance_rate",
            "carnegie_basic",
            "ownership",
            "institutional_characteristics",
            "sat_average",
            "sat_median_math",
            "sat_median_writing",
            "sat_median_reading",
            "latitude",
            "longitude"
        )

university_schema = UniversitySchema()
universities_schema = UniversitySchema(many=True)

def populate_universities():
    file_path = os.path.join(os.getcwd(), 'api_information/all_universities.json')
    file = open(file_path, 'r')
    db.create_all()
    universities_json = json.load(file)

    universities_list = []
    for university in universities_json:
        new_university = University(
            id=university["id"],
            name=university["latest.school.name"],
            alias=university["latest.school.alias"],
            zipcode=university["latest.school.zip"],
            city=university["latest.school.city"],
            state=university["latest.school.state"],
            url=university["latest.school.school_url"],
            locale=university["latest.school.locale"],
            size=university["latest.student.size"],
            enrollment_all=university["latest.student.enrollment.all"],
            enrollment_ugr_12m=university["latest.student.enrollment.undergrad_12_month"],
            enrollment_gr_12m=university["latest.student.enrollment.grad_12_month"],
            instate_tuition=university["latest.cost.tuition.in_state"],
            outstate_tuition=university["latest.cost.tuition.out_of_state"],
            acceptance_rate=university["latest.admissions.admission_rate.overall"],
            carnegie_basic=university["latest.school.carnegie_basic"],
            ownership=university["latest.school.ownership"],
            institutional_characteristics=university["latest.school.institutional_characteristics.level"],
            sat_average=university["latest.admissions.sat_scores.average.overall"],
            sat_median_math=university["latest.admissions.sat_scores.midpoint.math"],
            sat_median_writing=university["latest.admissions.sat_scores.midpoint.writing"],
            sat_median_reading=university["latest.admissions.sat_scores.midpoint.critical_reading"],
            latitude=university["location.lat"],
            longitude=university["location.lon"],
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

    review_count = db.Column(db.Integer)
    address1 = db.Column(db.String())
    state = db.Column(db.String())
    display_address = db.Column(db.String())
    photo = db.Column(db.String())

    # figure out how to store hours in the DB?
    
        
    '''
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
    '''

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
            "phone",

            "review_count",
            "address1",
            "state",
            "display_address",
            "photo"
        )

coffeeshop_schema = CoffeeShopSchema()
coffeeshops_schema = CoffeeShopSchema(many=True)

def populate_coffee_shops():
    file_path = os.path.join(os.getcwd(), 'api_information/all_coffee_shops.json')
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
            phone=coffee_shop['phone'] if coffee_shop['phone']!='' else 'N/A',

            review_count=coffee_shop['review_count'],
            address1=coffee_shop['location']['address1'],
            state=coffee_shop['location']['state'],
            display_address=coffee_shop['location']['display_address'],
            photo=coffee_shop['photos'][0] if coffee_shop['photos'] else ''
        )
        coffeeshops_list.append(new_coffeeshop)

    db.session.add_all(coffeeshops_list)
    db.session.commit()

    file.close()

class Library(db.Model):
    id = db.Column(db.String(), primary_key=True)
    name = db.Column(db.String())
    address = db.Column(db.String())
    city = db.Column(db.String())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    phone = db.Column(db.String)

    maps_url = db.Column(db.String())
    utc_offset = db.Column(db.Integer)
    formatted_hours = db.Column(db.String())
    photo_reference = db.Column(db.String())
    rating = db.Column(db.Float)
    review = db.Column(db.String())
    website = db.Column(db.String())
        
    '''
    def __init__(self, id="NaN", name="NaN", address="NaN", latitude=0.0, longitude=0.0, rating=0.0, city="NaN", phone=""):
        self.id = id
        self.name = name
        self.address = address
        self.city = city
        self.latitude = latitude
        self.longitude = longitude
        self.rating = rating
        self.phone = phone
    '''

class LibrarySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (
            "id",
            "name",
            "address",
            "city",
            "latitude",
            "longitude",
            "rating",
            "phone",

            "maps_url",
            "utc_offset",
            "formatted_hours",
            "photo_reference",
            "rating",
            "review",
            "website"
        )

library_schema = LibrarySchema()
libraries_schema = LibrarySchema(many=True)

def populate_libraries():
    file_path = os.path.join(os.getcwd(), 'api_information/all_libraries.json')
    file = open(file_path, 'r')
    db.create_all()
    libraries_json = json.load(file)

    libraries_list = []
    for library in libraries_json:
        new_library = Library(
            id=library['place_id'],
            name=library['name'],
            address=library['formatted_address'],
            latitude=library['geometry']['location']['lat'],
            longitude=library['geometry']['location']['lng'],
            rating=library['rating'] if "rating" in library else -1,
            phone=library["formatted_phone_number"] if "formatted_phone_number" in library else "",

            maps_url = library['url'],
            utc_offset = library['utc_offset'],
            formatted_hours = library['opening_hours']['weekday_text'] if 'opening_hours' in library else 'N/A',
            photo_reference = library['photos'][0]['photo_reference'] if 'photos' in library else 'N/A',
            review = library['reviews'][0]['text'] if 'reviews' in library else 'N/A',
            website = library['website'] if 'website' in library else 'N/A'
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
    print("Finished University database. Creating Coffee Shop database")
    populate_coffee_shops()
    print("Finished Coffee Shop database. Creating Library database")
    populate_libraries()
    print("Finished Library database.")

