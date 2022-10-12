from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import coffeeShop
import universities
import libraries

import requests

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)



coffeeshop_list = coffeeShop.coffeshop_list_maker(db)
university_list = universities.university_list_maker(db)
libraries_list = libraries.libraries_list_maker(db)



# # commit the list to the db
db.session.add_all(coffeeshop_list)
db.session.add_all(university_list)
db.session.add_all(libraries_list)
db.session.commit()