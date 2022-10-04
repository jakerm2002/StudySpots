import json
import requests

api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
api_url = "https://maps.googleapis.com/maps/api/place/photo"


photo_reference = "AcYSjRg9JrqSFDz2vyIl4TEEJKC2-hpGkcweMSb0T_PqC7FZwigdVkm3nHeIuPbxso_HrdmyZP_0V0qxTb-6HMcTkV6gEiCuKwUF8AhnA9qEwzTMcCUbu0jYpvprgOM_hv2H-Dh8mi8MmiDqd3YQ6J07Oe0qrCbByAgFlzNXuE63s54aOiRN"

# Fondren Library API Call
fondren_library_response = requests.get(api_url,
    params={
        "photo_reference" : "AcYSjRi7bD4z9P3m0vfjAk0DIEmkAFDn3MmxBS6SjgOnj5hVs5GEi8AUdDZTqvpAYvj2Lb1xj3dIYdaMwfTExMUQLi_ACOixqjM5wi_rP7y8660kqLglWXfZTAlSzIrSnP5MV54wnwLdobXhy04_3k8-s1QSIurDWrS6-FdNTUYrn7z_6SdM",
        "key": api_key
    })
print('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=' + photo_reference + '&key=' + api_key)
# with open("fondren_library.json", "w") as f:
#     json.dump(fondren_library_response.json(), f, indent = 4)

'''
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
'''