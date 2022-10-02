import json
import requests

api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
api_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

# Fondren Library API Call
fondren_library_response = requests.get(api_url,
    params={
        "query": "Fondren Library",
        "key": api_key,

    })
with open("fondren_library.json", "w") as f:
    json.dump(fondren_library_response.json(), f, indent = 4)

# Austin Central Library API Call
austin_central_library_response = requests.get(api_url,
    params={
        "query": "Austin Central Library",
        "key": api_key,

    })
with open("austin_central_library.json", "w") as f:
    json.dump(austin_central_library_response.json(), f, indent = 4)


# Westwood Branch Library API Call
westwood_branch_library_response = requests.get(api_url,
    params={
        "query": "Westwood Branch Library California",
        "key": api_key,

    })
with open("westwood_branch_library.json", "w") as f:
    json.dump(westwood_branch_library_response.json(), f, indent = 4)
