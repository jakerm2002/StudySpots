from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from collections import Counter
import functools
import copy
from database.connection import db,ma
from database.University import populate_universities
from database.CoffeeShop import populate_coffee_shops
from database.Library import populate_libraries


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
