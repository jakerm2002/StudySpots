from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from database.University import populate_universities
from database.CoffeeShop import populate_coffee_shops
from database.Library import populate_libraries


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
