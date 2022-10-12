import json
import requests

api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
api_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"


#photo_reference = "AcYSjRg9JrqSFDz2vyIl4TEEJKC2-hpGkcweMSb0T_PqC7FZwigdVkm3nHeIuPbxso_HrdmyZP_0V0qxTb-6HMcTkV6gEiCuKwUF8AhnA9qEwzTMcCUbu0jYpvprgOM_hv2H-Dh8mi8MmiDqd3YQ6J07Oe0qrCbByAgFlzNXuE63s54aOiRN"


response = requests.get(api_url,
    params={
        "query": "library 02110",
        "key": api_key,
    })

with open("libraries.json", "w") as f:
    json.dump(response.json(), f, indent = 4)