from operator import index
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
    description = db.Column(db.String)
    photo = db.Column(db.String)

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
                    longitude=0.0,
                    description="",
                    photo=""):
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
        self.description = description
        self.photo = photo

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
            "longitude",
            "description",
            "photo"
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
            description=university["description"],
            photo=university["photo"]
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

    review_1_text = db.Column(db.String())
    review_2_text = db.Column(db.String())
    review_3_text = db.Column(db.String())

    review_1_author = db.Column(db.String())
    review_2_author = db.Column(db.String())
    review_3_author = db.Column(db.String())

    review_1_rating = db.Column(db.Integer)
    review_2_rating = db.Column(db.Integer)
    review_3_rating = db.Column(db.Integer)

    # figure out how to store hours in the DB?

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
            "photo",

            "review_1_text",
            "review_2_text",
            "review_3_text",

            "review_1_author",
            "review_2_author",
            "review_3_author",

            "review_1_rating",
            "review_2_rating",
            "review_3_rating"
        )

coffeeshop_schema = CoffeeShopSchema()
coffeeshops_schema = CoffeeShopSchema(many=True)

def populate_coffee_shops():
    file_path = os.path.join(os.getcwd(), 'api_information/all_coffee_shops_with_reviews.json')
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
            photo=coffee_shop['photos'][0] if coffee_shop['photos'] else '',

            review_1_text=coffee_shop['reviews'][0]['text'] if 'reviews' in coffee_shop and 0 < len(coffee_shop['reviews']) else 'N/A',
            review_2_text=coffee_shop['reviews'][1]['text'] if 'reviews' in coffee_shop and 1 < len(coffee_shop['reviews']) else 'N/A',
            review_3_text=coffee_shop['reviews'][2]['text'] if 'reviews' in coffee_shop and 2 < len(coffee_shop['reviews']) else 'N/A',

            review_1_author=coffee_shop['reviews'][0]['user']['name'] if 'reviews' in coffee_shop and 0 < len(coffee_shop['reviews']) else 'N/A',
            review_2_author=coffee_shop['reviews'][1]['user']['name'] if 'reviews' in coffee_shop and 1 < len(coffee_shop['reviews']) else 'N/A',
            review_3_author=coffee_shop['reviews'][2]['user']['name'] if 'reviews' in coffee_shop and 2 < len(coffee_shop['reviews']) else 'N/A',

            review_1_rating=coffee_shop['reviews'][0]['rating'] if 'reviews' in coffee_shop and 0 < len(coffee_shop['reviews']) else -1,
            review_2_rating=coffee_shop['reviews'][1]['rating'] if 'reviews' in coffee_shop and 1 < len(coffee_shop['reviews']) else -1,
            review_3_rating=coffee_shop['reviews'][2]['rating'] if 'reviews' in coffee_shop and 2 < len(coffee_shop['reviews']) else -1
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
    zipcode = db.Column(db.String())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    phone = db.Column(db.String)

    maps_url = db.Column(db.String())
    utc_offset = db.Column(db.Integer)
    formatted_hours = db.Column(db.String())
    photo_reference = db.Column(db.String())
    rating = db.Column(db.Float)
    website = db.Column(db.String())

    review_1_text = db.Column(db.String())
    review_2_text = db.Column(db.String())
    review_3_text = db.Column(db.String())

    review_1_author = db.Column(db.String())
    review_2_author = db.Column(db.String())
    review_3_author = db.Column(db.String())

    review_1_rating = db.Column(db.Integer)
    review_2_rating = db.Column(db.Integer)
    review_3_rating = db.Column(db.Integer)
        

class LibrarySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (
            "id",
            "name",
            "address",
            "city",
            "zipcode",
            "latitude",
            "longitude",
            "rating",
            "phone",

            "maps_url",
            "utc_offset",
            "formatted_hours",
            "photo_reference",
            "rating",
            "website",

            "review_1_text",
            "review_2_text",
            "review_3_text",

            "review_1_author",
            "review_2_author",
            "review_3_author",

            "review_1_rating",
            "review_2_rating",
            "review_3_rating"
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
        index_of_city = -1
        index_of_zip_code = -1

        count = 0
        # search through address_components array to find
        # the indices of the city, zip code, and state fields in that array
        for component in library['address_components']:
            # the 'types' field of each component denotes which part of the address this is
            if 'locality' in component['types']:
                index_of_city = count
            if 'sublocality' in component['types'] and index_of_city == -1:
                index_of_city = count
            if 'postal_code' in component['types']:
                index_of_zip_code = count
            count+=1

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
            website = library['website'] if 'website' in library else 'N/A',

            city = library['address_components'][index_of_city]['long_name'],
            zipcode = library['address_components'][index_of_zip_code]['long_name'],

            review_1_text = library['reviews'][0]['text'] if 'reviews' in library and 0 < len(library['reviews']) else 'N/A',
            review_2_text = library['reviews'][1]['text'] if 'reviews' in library and 1 < len(library['reviews']) else 'N/A',
            review_3_text = library['reviews'][2]['text'] if 'reviews' in library and 2 < len(library['reviews']) else 'N/A',

            review_1_author = library['reviews'][0]['author_name'] if 'reviews' in library and 0 < len(library['reviews']) else 'N/A',
            review_2_author = library['reviews'][1]['author_name'] if 'reviews' in library and 1 < len(library['reviews']) else 'N/A',
            review_3_author = library['reviews'][2]['author_name'] if 'reviews' in library and 2 < len(library['reviews']) else 'N/A',

            review_1_rating = library['reviews'][0]['rating'] if 'reviews' in library and 0 < len(library['reviews']) else -1,
            review_2_rating = library['reviews'][1]['rating'] if 'reviews' in library and 1 < len(library['reviews']) else -1,
            review_3_rating = library['reviews'][2]['rating'] if 'reviews' in library and 2 < len(library['reviews']) else -1,
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

