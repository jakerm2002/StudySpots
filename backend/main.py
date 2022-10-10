from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
#import urllib
import json

import requests

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgre:rephrase-struggle-sulk@studyspots-db.cz5in1adcwq7.us-east-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)


# Define CoffeeShop table/data model
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

db.create_all()



# Get API request
api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
search_url = "https://api.yelp.com/v3/businesses/search"
headers = {'Authorization': 'Bearer {}'.format(api_key)}

# customize search parameters for Yelp GET call
params = {
    'term' : 'coffee shops',
    'location' : 'Austin',
    'limit' : 50 # limits results to just one
}

# response.content will give you raw json
response = requests.get(search_url, headers = headers, params = params)


with open('response.json', 'w') as f:
    json.dump(response.json(), f, indent = 4)    
    
data = response.json()


# request_url = 'http://api.worldbank.org/v2/countries?format=json&&per_page=50'
# r = urllib.request.urlopen(request_url)
# data = json.loads(r.read())

# print(data)
print (len(data['businesses']))
print (data['businesses'][1])

# List of coffeeshop instances to be added to db
coffeeshop_list = []
for item in data['businesses']:
    print (type(item))
    new_coffeeshop = CoffeeShop(
                    coffeeshop_id=item["id"],
                    coffeeshop_name=item["name"],
                    coffeeshop_zipcode=item['location']["zip_code"],
                    coffeeshop_city=item['location']['city'],
                    coffeeshop_lat=item['coordinates']["latitude"],
                    coffeeshop_long=item['coordinates']["longitude"],
                    coffeeshop_rating=item['rating'],
                    coffeeshop_price=item["price"] if 'price' in item else "N/A",
                    coffeeshop_phone=item['phone']
                    )
    coffeeshop_list.append(new_coffeeshop)


print(coffeeshop_list)


# # commit the list to the db
db.session.add_all(coffeeshop_list)
db.session.commit()