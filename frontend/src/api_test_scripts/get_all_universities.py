import requests
import json

api_key = "IQN7xi1l6wM8gbmJfFTSjRMBJSTDCj1zwqNGrWbG"
search_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?"
api_url = "&api_key=" + api_key
get_url = search_url + api_url

all_schools_response = requests.get(get_url)
with open("allschools.json", "w") as f:
    json.dump(all_schools_response.json(), f, indent = 4)