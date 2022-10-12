from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import requests




def initialize_db(db):
    # Define Universities table/data model
    class Universities(db.Model):
        university_id = db.Column(db.String(), primary_key=True)
        university_name = db.Column(db.String())
        university_zipcode = db.Column(db.String())
        university_city = db.Column(db.String())
        university_lat = db.Column(db.Float)
        university_long = db.Column(db.Float)
        university_population = db.Column(db.Integer)
        university_instate_tuition = db.Column(db.Float)
        university_outstate_tuition = db.Column(db.Float)
        university_acceptance_rate = db.Column(db.Float)
        
    def __init__(self,
                    university_id="NaN", 
                    university_name="NaN",
                    university_zipcode="NaN",
                    university_city="NaN",
                    university_lat=0.0,
                    university_long=0.0,
                    university_population=0,
                    university_instate_tuition=0.0,
                    university_outstate_tuition=0.0,
                    university_acceptance_rate=0.0):
        self.university_id = university_id
        self.university_name = university_name
        self.university_zipcode = university_zipcode
        self.university_city = university_city
        self.university_lat = university_lat
        self.university_long = university_long
        self.university_population = university_population
        self.university_instate_tuition = university_instate_tuition
        self.university_outstate_tuition = university_outstate_tuition
        self.university_acceptance_rate = university_acceptance_rate
        
    # creates the table
    db.create_all()

    # Get API request
    api_key = "IQN7xi1l6wM8gbmJfFTSjRMBJSTDCj1zwqNGrWbG"
    search_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?"
    api_url = "&api_key=" + api_key
    get_url = search_url + api_url

    # response.content will give you raw json
    response = requests.get(get_url)

    # prints reponse to json
    # with open('response.json', 'w') as f:
    #     json.dump(response.json(), f, indent = 4)    
        
    data = response.json()
    return (data, Universities)

# List of coffeeshop instances to be added to db
def university_list_maker(db) :

    result = initialize_db(db)
    data = result[0]
    Universities = result[1]

    university_list = []
    for item in data['results']:
        new_university = Universities(
                        university_id=item['id'],
                        university_name=item['latest']['school']['name'],
                        university_zipcode=item['latest']['school']['zip'],
                        university_city=item['latest']['school']['city'],
                        university_lat=item['location']['lat'],
                        university_long=item['location']['lon'],
                        university_population=item['latest']['student']['size'],
                        university_instate_tuition = item['latest']['cost']['tuition']['in_state'],
                        university_outstate_tuition = item['latest']['cost']['tuition']['out_of_state'],
                        university_acceptance_rate = item['latest']['admissions']['admission_rate']['overall'],
                        )
        university_list.append(new_university)


    print(university_list)
    return university_list