from dataclasses import replace
from operator import index
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import create_engine, Column, String, Integer, literal_column, text
from flask_cors import CORS
import time
from flask_cors import CORS
import json
import os
import functools
import copy
from collections import Counter
from itertools import chain


app = Flask(__name__)
app.config["DEBUG"] = True
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres"
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


class University(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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

    def __init__(
        self,
        id="NaN",
        name="NaN",
        alias="NaN",
        zipcode="NaN",
        city="NaN",
        state="NaN",
        url="NaN",
        locale=0,
        size=0,
        enrollment_all=0,
        enrollment_ugr_12m=0,
        enrollment_gr_12m=0,
        instate_tuition=0.0,
        outstate_tuition=0.0,
        acceptance_rate=0.0,
        carnegie_basic=0,
        ownership=0,
        institutional_characteristics=0,
        sat_average=0,
        sat_median_math=0,
        sat_median_writing=0,
        sat_median_reading=0,
        latitude=0.0,
        longitude=0.0,
        description="",
        photo="",
    ):
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
    class Meta:  # for flask_marshmallow
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
            "photo",
        )


university_schema = UniversitySchema()
universities_schema = UniversitySchema(many=True)


def populate_universities():
    file_path = os.path.join(os.getcwd(), "api_information/all_universities.json")
    file = open(file_path, "r")
    db.create_all()
    universities_json = json.load(file)
    dynamic_id_university = 0
    universities_list = []

    for university in universities_json:
        replace_id = dynamic_id_university
        dynamic_id_university += 1
        new_university = University(
            id=replace_id,
            name=university["latest.school.name"],
            alias=university["latest.school.alias"],
            zipcode=university["latest.school.zip"][:5],
            city=university["latest.school.city"],
            state=university["latest.school.state"],
            url=university["latest.school.school_url"],
            locale=university["latest.school.locale"],
            size=university["latest.student.size"],
            enrollment_all=university["latest.student.enrollment.all"],
            enrollment_ugr_12m=university[
                "latest.student.enrollment.undergrad_12_month"
            ],
            enrollment_gr_12m=university["latest.student.enrollment.grad_12_month"],
            instate_tuition=university["latest.cost.tuition.in_state"],
            outstate_tuition=university["latest.cost.tuition.out_of_state"],
            acceptance_rate=university["latest.admissions.admission_rate.overall"],
            carnegie_basic=university["latest.school.carnegie_basic"],
            ownership=university["latest.school.ownership"],
            institutional_characteristics=university[
                "latest.school.institutional_characteristics.level"
            ],
            sat_average=university["latest.admissions.sat_scores.average.overall"],
            sat_median_math=university["latest.admissions.sat_scores.midpoint.math"],
            sat_median_writing=university[
                "latest.admissions.sat_scores.midpoint.writing"
            ],
            sat_median_reading=university[
                "latest.admissions.sat_scores.midpoint.critical_reading"
            ],
            latitude=university["location.lat"],
            longitude=university["location.lon"],
            description=university["description"],
            photo=university["photo"],
        )
        universities_list.append(new_university)

    def sort_by_num_null_values(item1, item2):
        # print("comparing", item1.__dict__["name"], "with", item2.__dict__["name"])
        counter_1 = Counter(item1.__dict__.values())
        counter_2 = Counter(item2.__dict__.values())
        return counter_1[None] - counter_2[None]

    num_unis = len(universities_list)
    new_unis_list = copy.deepcopy(universities_list)
    new_unis_list.sort(key=functools.cmp_to_key(sort_by_num_null_values))

    # for uni in new_unis_list:
    #     print(str(uni.__dict__["id"]) + " " + uni.__dict__["name"])

    # change the id of all universities
    for num in range(num_unis):
        new_id = num - num_unis
        index = new_unis_list[num].__dict__["id"]
        # print("changing id from", universities_list[index].id, "to", new_id)
        universities_list[index].id = new_id

    # print("len", num_unis)

    for num in range(-num_unis, 0):
        new_id = universities_list[num].id + num_unis
        # print("changing id from", universities_list[num].id, "to", new_id)
        universities_list[num].id = new_id

    db.session.add_all(universities_list)
    db.session.commit()

    file.close()


class CoffeeShop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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

    rating_string = db.Column(db.String())

    review_1_available = db.Column(db.Boolean)
    review_2_available = db.Column(db.Boolean)
    review_3_available = db.Column(db.Boolean)

    review_1_text = db.Column(db.String())
    review_2_text = db.Column(db.String())
    review_3_text = db.Column(db.String())

    review_1_author = db.Column(db.String())
    review_2_author = db.Column(db.String())
    review_3_author = db.Column(db.String())

    review_1_rating = db.Column(db.Integer)
    review_2_rating = db.Column(db.Integer)
    review_3_rating = db.Column(db.Integer)

    review_1_rating_string = db.Column(db.String())
    review_2_rating_string = db.Column(db.String())
    review_3_rating_string = db.Column(db.String())

    hours_day_0_open = db.Column(db.String())
    hours_day_0_closed = db.Column(db.String())

    hours_day_1_open = db.Column(db.String())
    hours_day_1_closed = db.Column(db.String())

    hours_day_2_open = db.Column(db.String())
    hours_day_2_closed = db.Column(db.String())

    hours_day_3_open = db.Column(db.String())
    hours_day_3_closed = db.Column(db.String())

    hours_day_4_open = db.Column(db.String())
    hours_day_4_closed = db.Column(db.String())

    hours_day_5_open = db.Column(db.String())
    hours_day_5_closed = db.Column(db.String())

    hours_day_6_open = db.Column(db.String())
    hours_day_6_closed = db.Column(db.String())

    hours_arr = db.Column(db.String())
    formatted_hours = db.Column(db.String())

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
            "rating_string",
            "review_1_available",
            "review_2_available",
            "review_3_available",
            "review_1_text",
            "review_2_text",
            "review_3_text",
            "review_1_author",
            "review_2_author",
            "review_3_author",
            "review_1_rating",
            "review_2_rating",
            "review_3_rating",
            "review_1_rating_string",
            "review_2_rating_string",
            "review_3_rating_string",
            "hours_day_0_open",
            "hours_day_0_closed",
            "hours_day_1_open",
            "hours_day_1_closed",
            "hours_day_2_open",
            "hours_day_2_closed",
            "hours_day_3_open",
            "hours_day_3_closed",
            "hours_day_4_open",
            "hours_day_4_closed",
            "hours_day_5_open",
            "hours_day_5_closed",
            "hours_day_6_open",
            "hours_day_6_closed",
            "hours_arr",
            "formatted_hours",
        )


coffeeshop_schema = CoffeeShopSchema()
coffeeshops_schema = CoffeeShopSchema(many=True)


def populate_coffee_shops():
    file_path = os.path.join(
        os.getcwd(), "api_information/all_coffee_shops_with_reviews.json"
    )
    file = open(file_path, "r")
    db.create_all()
    coffeeshops_json = json.load(file)
    coffeeshops_list = []

    def generate_hours(coffee_shop):
        hours = [None for x in range(7)]
        if "hours" in coffee_shop and "open" in coffee_shop["hours"][0]:
            day_count = 0
            index = 0
            while day_count < 7:
                if index < len(coffee_shop["hours"][0]["open"]):
                    day = coffee_shop["hours"][0]["open"][index]
                    day_number = day["day"]
                    if day_count == day_number:
                        hours[day_count] = day
                        day_count += 1
                        index += 1
                    # handles the case where a day has more than
                    # one set of hours (for example 7-11am then 6-8pm).
                    # in this case, we'll take only the first set of hours from that day
                    # this is an extremely rare case that only happens like once in the database
                    elif day_count > day_number:
                        index += 1
                    # this day does not have hours, which means it's closed.
                    # create a new entry with hours as '-1', signifying closed
                    else:
                        hours[day_count] = {
                            "is_overnight": False,
                            "start": "-1",
                            "end": "-1",
                            "day": day_count,
                        }
                        day_count += 1
                # set any remaining days without an entry to 'closed'
                else:
                    hours[day_count] = {
                        "is_overnight": False,
                        "start": "-1",
                        "end": "-1",
                        "day": day_count,
                    }
                    day_count += 1
        return hours

    def generate_hours_arr(hours):
        hours_arr = [None for x in range(7)]

        index = 0
        for day in hours:
            if day is None:
                hours_string = days[index] + ": Not available"
            elif day["start"] == "-1":
                hours_string = days[index] + ": Closed"
                day["formatted"] = hours_string
            else:
                start_time_obj = time.strptime(day["start"], "%H%M")
                start_time = time.strftime("%I:%M %p", start_time_obj)

                end_time_obj = time.strptime(day["end"], "%H%M")
                end_time = time.strftime("%I:%M %p", end_time_obj)
                hours_string = days[index] + ": " + start_time + " - " + end_time
                day["formatted"] = hours_string
            hours_arr[index] = hours_string
            index += 1
        return hours_arr

    def generate_formatted_hours(hours_arr):
        if not hours_arr:
            return "N/A"

        chars_to_replace_with_blank = "{[']}"
        orig_str = str(hours_arr)
        for c in chars_to_replace_with_blank:
            if c in orig_str:
                orig_str = orig_str.replace(c, "")
        formatted_hours = orig_str.replace(",", "\n")
        return formatted_hours

    dynamic_id_coffeeshop = 0
    for coffee_shop in coffeeshops_json:
        hours = generate_hours(coffee_shop)
        hours_arr = generate_hours_arr(hours)
        formatted_hours = generate_formatted_hours(hours_arr)

        replace_id = dynamic_id_coffeeshop
        dynamic_id_coffeeshop += 1

        new_coffeeshop = CoffeeShop(
            id=replace_id,
            name=coffee_shop["name"],
            image_url=coffee_shop["image_url"],
            zipcode=coffee_shop["location"]["zip_code"],
            city=coffee_shop["location"]["city"],
            latitude=coffee_shop["coordinates"]["latitude"],
            longitude=coffee_shop["coordinates"]["longitude"],
            rating=coffee_shop["rating"],
            price=coffee_shop["price"] if "price" in coffee_shop else "N/A",
            phone=coffee_shop["phone"] if coffee_shop["phone"] != "" else "N/A",
            review_count=coffee_shop["review_count"],
            address1=coffee_shop["location"]["address1"],
            state=coffee_shop["location"]["state"],
            display_address=coffee_shop["location"]["display_address"],
            photo=coffee_shop["photos"][0] if coffee_shop["photos"] else "",
            rating_string=str(coffee_shop["rating"])
            if "rating" in coffee_shop
            else "N/A",
            review_1_available=True
            if "reviews" in coffee_shop and 0 < len(coffee_shop["reviews"])
            else False,
            review_2_available=True
            if "reviews" in coffee_shop and 1 < len(coffee_shop["reviews"])
            else False,
            review_3_available=True
            if "reviews" in coffee_shop and 2 < len(coffee_shop["reviews"])
            else False,
            review_1_text=coffee_shop["reviews"][0]["text"]
            if "reviews" in coffee_shop and 0 < len(coffee_shop["reviews"])
            else "N/A",
            review_2_text=coffee_shop["reviews"][1]["text"]
            if "reviews" in coffee_shop and 1 < len(coffee_shop["reviews"])
            else "N/A",
            review_3_text=coffee_shop["reviews"][2]["text"]
            if "reviews" in coffee_shop and 2 < len(coffee_shop["reviews"])
            else "N/A",
            review_1_author=coffee_shop["reviews"][0]["user"]["name"]
            if "reviews" in coffee_shop and 0 < len(coffee_shop["reviews"])
            else "N/A",
            review_2_author=coffee_shop["reviews"][1]["user"]["name"]
            if "reviews" in coffee_shop and 1 < len(coffee_shop["reviews"])
            else "N/A",
            review_3_author=coffee_shop["reviews"][2]["user"]["name"]
            if "reviews" in coffee_shop and 2 < len(coffee_shop["reviews"])
            else "N/A",
            review_1_rating=coffee_shop["reviews"][0]["rating"]
            if "reviews" in coffee_shop and 0 < len(coffee_shop["reviews"])
            else -1,
            review_2_rating=coffee_shop["reviews"][1]["rating"]
            if "reviews" in coffee_shop and 1 < len(coffee_shop["reviews"])
            else -1,
            review_3_rating=coffee_shop["reviews"][2]["rating"]
            if "reviews" in coffee_shop and 2 < len(coffee_shop["reviews"])
            else -1,
            review_1_rating_string=str(coffee_shop["reviews"][0]["rating"])
            if "reviews" in coffee_shop and 0 < len(coffee_shop["reviews"])
            else "N/A",
            review_2_rating_string=str(coffee_shop["reviews"][1]["rating"])
            if "reviews" in coffee_shop and 1 < len(coffee_shop["reviews"])
            else "N/A",
            review_3_rating_string=str(coffee_shop["reviews"][2]["rating"])
            if "reviews" in coffee_shop and 2 < len(coffee_shop["reviews"])
            else "N/A",
            # -1 means closed on that day, N/A means hours not available
            hours_day_0_open=hours[0]["start"] if hours[0] else "N/A",
            hours_day_0_closed=hours[0]["end"] if hours[0] else "N/A",
            hours_day_1_open=hours[1]["start"] if hours[1] else "N/A",
            hours_day_1_closed=hours[1]["end"] if hours[1] else "N/A",
            hours_day_2_open=hours[2]["start"] if hours[2] else "N/A",
            hours_day_2_closed=hours[2]["end"] if hours[2] else "N/A",
            hours_day_3_open=hours[3]["start"] if hours[3] else "N/A",
            hours_day_3_closed=hours[3]["end"] if hours[3] else "N/A",
            hours_day_4_open=hours[4]["start"] if hours[4] else "N/A",
            hours_day_4_closed=hours[4]["end"] if hours[4] else "N/A",
            hours_day_5_open=hours[5]["start"] if hours[5] else "N/A",
            hours_day_5_closed=hours[5]["end"] if hours[5] else "N/A",
            hours_day_6_open=hours[6]["start"] if hours[6] else "N/A",
            hours_day_6_closed=hours[6]["end"] if hours[6] else "N/A",
            hours_arr=hours_arr if hours_arr else "N/A",
            formatted_hours=formatted_hours,
        )
        coffeeshops_list.append(new_coffeeshop)

    def sort_by_num_null_values(item1, item2):
        item_1_vals = [
            item for item in item1.__dict__.values() if type(item) is not list
        ]
        item_2_vals = [
            item for item in item2.__dict__.values() if type(item) is not list
        ]

        counter_1 = Counter(item_1_vals)
        counter_2 = Counter(item_2_vals)
        num_null_values1 = counter_1[None] + counter_1["N/A"]
        num_null_values2 = counter_2[None] + counter_2["N/A"]
        return num_null_values1 - num_null_values2

    num_items = len(coffeeshops_list)
    sorted_list = copy.deepcopy(coffeeshops_list)
    sorted_list.sort(key=functools.cmp_to_key(sort_by_num_null_values))

    for num in range(num_items):
        new_id = num - num_items
        index = sorted_list[num].__dict__["id"]
        coffeeshops_list[index].id = new_id

    for num in range(-num_items, 0):
        new_id = coffeeshops_list[num].id + num_items
        coffeeshops_list[num].id = new_id

    db.session.add_all(coffeeshops_list)
    db.session.commit()

    file.close()


class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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
    hours_arr = db.Column(db.String())
    formatted_hours = db.Column(db.String())
    photo_reference = db.Column(db.String())
    photo_link = db.Column(db.String())
    rating = db.Column(db.Float)
    website = db.Column(db.String())
    rating_string = db.Column(db.String())

    review_1_available = db.Column(db.Boolean)
    review_2_available = db.Column(db.Boolean)
    review_3_available = db.Column(db.Boolean)

    review_1_text = db.Column(db.String())
    review_2_text = db.Column(db.String())
    review_3_text = db.Column(db.String())

    review_1_author = db.Column(db.String())
    review_2_author = db.Column(db.String())
    review_3_author = db.Column(db.String())

    review_1_rating = db.Column(db.Integer)
    review_2_rating = db.Column(db.Integer)
    review_3_rating = db.Column(db.Integer)

    review_1_rating_string = db.Column(db.String())
    review_2_rating_string = db.Column(db.String())
    review_3_rating_string = db.Column(db.String())


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
            "hours_arr",
            "formatted_hours",
            "photo_reference",
            "photo_link",
            "rating",
            "website",
            "rating_string",
            "review_1_available",
            "review_2_available",
            "review_3_available",
            "review_1_text",
            "review_2_text",
            "review_3_text",
            "review_1_author",
            "review_2_author",
            "review_3_author",
            "review_1_rating",
            "review_2_rating",
            "review_3_rating",
            "review_1_rating_string",
            "review_2_rating_string",
            "review_3_rating_string",
        )


library_schema = LibrarySchema()
libraries_schema = LibrarySchema(many=True)


def populate_libraries():
    file_path = os.path.join(os.getcwd(), "api_information/all_libraries.json")
    file = open(file_path, "r")
    db.create_all()
    libraries_json = json.load(file)

    # info for getting photos from photo_reference field
    api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
    photos_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference="

    libraries_list = []
    dynamic_id_library = 0

    for library in libraries_json:
        replace_id = dynamic_id_library
        dynamic_id_library += 1

        index_of_city = -1
        index_of_zip_code = -1

        def generate_formatted_hours():
            if "opening_hours" not in library:
                return "N/A"

            chars_to_replace_with_blank = "{[']}"
            orig_str = str(library["opening_hours"]["weekday_text"])
            for c in chars_to_replace_with_blank:
                if c in orig_str:
                    orig_str = orig_str.replace(c, "")
            formatted_hours = orig_str.replace(",", "\n")
            return formatted_hours

        formatted_hours = generate_formatted_hours()

        count = 0
        # search through address_components array to find
        # the indices of the city, zip code, and state fields in that array
        for component in library["address_components"]:
            # the 'types' field of each component denotes which part of the address this is
            if "locality" in component["types"]:
                index_of_city = count
            if "sublocality" in component["types"] and index_of_city == -1:
                index_of_city = count
            if "postal_code" in component["types"]:
                index_of_zip_code = count
            count += 1

        new_library = Library(
            id=replace_id,
            name=library["name"],
            address=library["formatted_address"],
            latitude=library["geometry"]["location"]["lat"],
            longitude=library["geometry"]["location"]["lng"],
            rating=library["rating"] if "rating" in library else -1,
            phone=library["formatted_phone_number"]
            if "formatted_phone_number" in library
            else "",
            maps_url=library["url"],
            utc_offset=library["utc_offset"],
            hours_arr=library["opening_hours"]["weekday_text"]
            if "opening_hours" in library
            else "N/A",
            formatted_hours=formatted_hours,
            photo_reference=library["photos"][0]["photo_reference"]
            if "photos" in library
            else "N/A",
            photo_link=photos_url
            + library["photos"][0]["photo_reference"]
            + "&key="
            + api_key
            if "photos" in library
            else "N/A",
            website=library["website"] if "website" in library else "N/A",
            rating_string=str(library["rating"]) if "rating" in library else "N/A",
            city=library["address_components"][index_of_city]["long_name"],
            zipcode=library["address_components"][index_of_zip_code]["long_name"],
            review_1_available=True
            if "reviews" in library and 0 < len(library["reviews"])
            else False,
            review_2_available=True
            if "reviews" in library and 1 < len(library["reviews"])
            else False,
            review_3_available=True
            if "reviews" in library and 2 < len(library["reviews"])
            else False,
            review_1_text=library["reviews"][0]["text"]
            if "reviews" in library and 0 < len(library["reviews"])
            else "N/A",
            review_2_text=library["reviews"][1]["text"]
            if "reviews" in library and 1 < len(library["reviews"])
            else "N/A",
            review_3_text=library["reviews"][2]["text"]
            if "reviews" in library and 2 < len(library["reviews"])
            else "N/A",
            review_1_author=library["reviews"][0]["author_name"]
            if "reviews" in library and 0 < len(library["reviews"])
            else "N/A",
            review_2_author=library["reviews"][1]["author_name"]
            if "reviews" in library and 1 < len(library["reviews"])
            else "N/A",
            review_3_author=library["reviews"][2]["author_name"]
            if "reviews" in library and 2 < len(library["reviews"])
            else "N/A",
            review_1_rating=library["reviews"][0]["rating"]
            if "reviews" in library and 0 < len(library["reviews"])
            else -1,
            review_2_rating=library["reviews"][1]["rating"]
            if "reviews" in library and 1 < len(library["reviews"])
            else -1,
            review_3_rating=library["reviews"][2]["rating"]
            if "reviews" in library and 2 < len(library["reviews"])
            else -1,
            review_1_rating_string=str(library["reviews"][0]["rating"])
            if "reviews" in library and 0 < len(library["reviews"])
            else "N/A",
            review_2_rating_string=str(library["reviews"][1]["rating"])
            if "reviews" in library and 1 < len(library["reviews"])
            else "N/A",
            review_3_rating_string=str(library["reviews"][2]["rating"])
            if "reviews" in library and 2 < len(library["reviews"])
            else "N/A",
        )
        libraries_list.append(new_library)

    def sort_by_num_null_values(item1, item2):
        item_1_vals = [
            item for item in item1.__dict__.values() if type(item) is not list
        ]
        item_2_vals = [
            item for item in item2.__dict__.values() if type(item) is not list
        ]

        counter_1 = Counter(item_1_vals)
        counter_2 = Counter(item_2_vals)
        num_null_values1 = counter_1[None] + counter_1["N/A"]
        num_null_values2 = counter_2[None] + counter_2["N/A"]
        return num_null_values1 - num_null_values2

    num_items = len(libraries_list)
    sorted_list = copy.deepcopy(libraries_list)
    sorted_list.sort(key=functools.cmp_to_key(sort_by_num_null_values))

    for num in range(num_items):
        new_id = num - num_items
        index = sorted_list[num].__dict__["id"]
        libraries_list[index].id = new_id

    for num in range(-num_items, 0):
        new_id = libraries_list[num].id + num_items
        libraries_list[num].id = new_id

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
