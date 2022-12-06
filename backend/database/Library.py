from database.connection import db, ma
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import json
import os
from database.connection import reassign_ids


class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    address = db.Column(db.String())
    state = db.Column(db.String())
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
            "state",
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

    # info for getting photo from photo_reference field
    api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
    photos_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference="

    libraries_list = []
    dynamic_id_library = 0

    for library in libraries_json:
        replace_id = dynamic_id_library
        dynamic_id_library += 1

        index_of_city = -1
        index_of_zip_code = -1
        index_of_state = -1

        def generate_formatted_hours():
            if "opening_hours" not in library:
                return "Hours unavailable"

            chars_to_replace_with_blank = "{[']}"
            orig_str = str(library["opening_hours"]["weekday_text"])
            for c in chars_to_replace_with_blank:
                if c in orig_str:
                    orig_str = orig_str.replace(c, "")
            formatted_hours = orig_str.replace(",", "\n")
            return formatted_hours

        formatted_hours = generate_formatted_hours()

        # the google maps API returns city, state, and zipcode
        # in possibly the worst way ever. this code is for parsing it.
        #
        # search through address_components array to find
        # the indices of the city, zip code, and state fields in that array
        count = 0
        for component in library["address_components"]:
            # the 'types' field of each component denotes which part of the address this is
            if "locality" in component["types"]:
                index_of_city = count
            if "sublocality" in component["types"] and index_of_city == -1:
                index_of_city = count
            if "postal_code" in component["types"]:
                index_of_zip_code = count
            if "administrative_area_level_1" in component["types"]:
                index_of_state = count
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
            else "N/A",
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
            state=library["address_components"][index_of_state]["short_name"],
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

    libraries_list = reassign_ids(libraries_list)

    db.session.add_all(libraries_list)
    db.session.commit()

    file.close()
