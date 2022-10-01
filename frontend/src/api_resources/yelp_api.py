import requests
import json


api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
search_url = "https://api.yelp.com/v3/businesses/search"

headers = {'Authorization': 'Bearer {}'.format(api_key)}

params = {
    'term' : 'Badolina',
    'location' : 'Houston',
    'limit' : 1
}

response = requests.get(search_url, headers = headers, params = params)

print(response.url)
print(response.status_code)

with open('coffee.json', 'w') as f:
    json.dump(response.json(), f, indent = 4)

# with open('coffee.json', 'wb') as f:
#     # f.write(response.content)

data_dict = response.json()
print(data_dict['businesses'][0])