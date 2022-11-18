# program to call the Yelp API with search parameters
# and put the resulting JSON in a file
import requests
import json

business_id = "XK3KLVSOq0Hz2i1ECbsx7Q"

api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
search_url = "https://api.yelp.com/v3/businesses/" + business_id

headers = {'Authorization': 'Bearer {}'.format(api_key)}

# response.content will give you raw json
response = requests.get(search_url, headers = headers)

print(response.url)
print(response.status_code)

# generates a file 'coffee.json' with the results of API call
with open(business_id+'.json', 'w') as f: # sets up write to file
    json.dump(response.json(), f, indent = 4) # pretty print the JSON


# with open('coffee.json', 'wb') as f:
#     # f.write(response.content)
# JSON raw without pretty print ^


data_dict = response.json() # creates dictionary out of the resulting JSON
print(data_dict) # print the first result