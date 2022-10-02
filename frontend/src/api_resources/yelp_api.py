# program to call the Yelp API with search parameters
# and put the resulting JSON in a file
import requests
import json


api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
search_url = "https://api.yelp.com/v3/businesses/search"

headers = {'Authorization': 'Bearer {}'.format(api_key)}


# customize search parameters for Yelp GET call
params = {
    'term' : 'Badolina coffee',
    'location' : 'Houston',
    'limit' : 1 # limits results to just one
}

# response.content will give you raw json
response = requests.get(search_url, headers = headers, params = params)

print(response.url)
print(response.status_code)

# generates a file 'coffee.json' with the results of API call
with open('coffee.json', 'w') as f: # sets up write to file
    json.dump(response.json(), f, indent = 4) # pretty print the JSON


# with open('coffee.json', 'wb') as f:
#     # f.write(response.content)
# JSON raw without pretty print ^


data_dict = response.json() # creates dictionary out of the resulting JSON
print(data_dict['businesses'][0]) # print the first result