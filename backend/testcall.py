import requests
import json

api_url = "http://localhost:5000/universities?stateFilter=TX"

response = requests.get(api_url)
j = (response.json())
data = json.dumps(j)
print(data)