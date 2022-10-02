# Program to call the College Scorecard API with search parameters
# Places the results into a JSON and stores it in a file

import requests
import json

api_key = "IQN7xi1l6wM8gbmJfFTSjRMBJSTDCj1zwqNGrWbG"
search_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?"
api_url = "&api_key=" + api_key

# University of Texas at Austin
ut_austin_url = search_url + "school.name=University%20of%20Texas%20at%20Austin" + api_url
ut_austin_response = requests.get(ut_austin_url)
with open("ut_austin.json", "w") as f:
    json.dump(ut_austin_response.json(), f, indent = 4)

# Rice University
rice_url = search_url + "school.name=Rice%20University" + api_url
rice_response = requests.get(rice_url)
with open("rice.json", "w") as f:
    json.dump(rice_response.json(), f, indent = 4)

# University of California at Los Angeles
ucla_url = search_url + "school.name=University%20of%20California%20At%20Los%20Angeles" + api_url
ucla_response = requests.get(ucla_url)
with open("ucla.json", "w") as f:
    json.dump(ucla_response.json(), f, indent = 4)

    