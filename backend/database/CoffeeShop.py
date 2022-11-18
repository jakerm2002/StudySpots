from database.databases import db, ma
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import functools
import copy
import json
import os
import time
from collections import Counter

days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class CoffeeShop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    image_url = db.Column(db.String())
    image_2_url = db.Column(db.String())
    image_3_url = db.Column(db.String())
    zipcode = db.Column(db.String())
    city = db.Column(db.String())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    rating = db.Column(db.Float)
    price = db.Column(db.String())
    price_integer = db.Column(db.Integer)
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
            "image_2_url",
            "image_3_url",
            "zipcode",
            "city",
            "latitude",
            "longitude",
            "rating",
            "price",
            "price_integer",
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
            image_2_url=coffee_shop["photos"][1] if len(coffee_shop["photos"]) > 1 else "",
            image_3_url=coffee_shop["photos"][2] if len(coffee_shop["photos"]) > 2 else "",
            zipcode=coffee_shop["location"]["zip_code"],
            city=coffee_shop["location"]["city"],
            latitude=coffee_shop["coordinates"]["latitude"],
            longitude=coffee_shop["coordinates"]["longitude"],
            rating=coffee_shop["rating"],
            price=coffee_shop["price"] if "price" in coffee_shop else "N/A",
            price_integer=len(coffee_shop["price"]) if "price" in coffee_shop else 0,
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