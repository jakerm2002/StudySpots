from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from collections import Counter
import functools
import copy

app = Flask(__name__)
app.config["DEBUG"] = True
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgresql+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres"
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

# reassign database ID numbers so that the rows with less
# amount of null or "N/A" columns have a lower ID
def reassign_ids(model_list):
    # method to compare two elements in order to determine
    # which element has the least amount of null or "N/A" columns.
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

    num_items = len(model_list)
    sorted_list = copy.deepcopy(model_list)
    sorted_list.sort(key=functools.cmp_to_key(sort_by_num_null_values))

    # reassign database ID numbers so that the rows with less
    # amount of null or "N/A" columns have a lower ID
    for num in range(num_items):
        new_id = num - num_items
        index = sorted_list[num].__dict__["id"]
        model_list[index].id = new_id

    for num in range(-num_items, 0):
        new_id = model_list[num].id + num_items
        model_list[num].id = new_id

    return model_list