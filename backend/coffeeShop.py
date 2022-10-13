from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import requests
from get_university_zipcodes import get_university_zipcodes


def initialize_db(db):
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

    # creates the table
    db.create_all()

    
    
    

    
    # prints reponse to json
    # with open('response.json', 'w') as f:
    #     json.dump(response.json(), f, indent = 4)    
    make_coffee_shops_json()
    data = response.json()
    return (data, CoffeeShop)

def get_coffee_shops_from_zipcode() :
    zipcodes = get_university_zipcodes()
    # Get API request
    api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
    search_url = "https://api.yelp.com/v3/businesses/search"
    headers = {'Authorization': 'Bearer {}'.format(api_key)}
    coffee_shops = {}
    for zipcode in zipcodes[:10] :
        # customize search parameters for Yelp GET call
        params = {
        'term' : 'coffee shops',
        'location' : zipcode,
        'limit' : 50 # limits results to just one
        }
        # response.content will give you raw json
        
        response = requests.get(search_url, headers = headers, params = params)
        try:
            coffee_shops.update({item['id']:item for item in response.json()['businesses']})
        except:
            print(response.json())
    print(len(coffee_shops.keys()))
    return coffee_shops
        

def make_coffee_shops_json() :
    coffee_shop_dict = get_coffee_shops_from_zipcode()
    api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
    
    headers = {'Authorization': 'Bearer {}'.format(api_key)}
    for shop_id in coffee_shop_dict:
        id = str(shop_id)
        search_url = "https://api.yelp.com/v3/businesses/" + id
        response = requests.get(search_url, headers = headers)
        
        assert False



# List of coffeeshop instances to be added to db
def coffeshop_list_maker(db) :

    result = initialize_db(db)
    data = result[0]
    CoffeeShop = result[1]

    coffeeshop_list = []
    for item in data['businesses']:
        new_coffeeshop = CoffeeShop(
                        coffeeshop_id=item['id'],
                        coffeeshop_name=item['name'],
                        coffeeshop_zipcode=item['location']['zip_code'],
                        coffeeshop_city=item['location']['city'],
                        coffeeshop_lat=item['coordinates']['latitude'],
                        coffeeshop_long=item['coordinates']['longitude'],
                        coffeeshop_rating=item['rating'],
                        coffeeshop_price=item['price'] if 'price' in item else 'N/A',
                        coffeeshop_phone=item['phone']
                        )
        coffeeshop_list.append(new_coffeeshop)


    print(coffeeshop_list)
    return coffeeshop_list

