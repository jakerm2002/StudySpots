import json
import math
import os
import requests

def api_call_for_universities():
    # Get API request
    api_key = "IQN7xi1l6wM8gbmJfFTSjRMBJSTDCj1zwqNGrWbG"
    search_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?"
    api_url = "&api_key=" + api_key
    get_url = search_url + api_url

    # set what fields to retrieve from API
    # comments are descriptions from College Scorecard API documentation
    fields = ['id',
        'latest.school.name',
        'latest.school.alias',
        'latest.school.zip',
        'latest.school.city',
        'latest.school.state',
        'latest.school.school_url',
        'location.lat',
        'location.lon',
        'latest.student.size',                                  # Enrollment of undergraduate certificate/degree-seeking students
        'latest.student.enrollment.all',                        # Enrollment of all undergraduate students
        'latest.student.enrollment.undergrad_12_month',         # Unduplicated count of undergraduate students enrolled during a 12 month period
        'latest.student.enrollment.grad_12_month',              # Unduplicated count of graduate students enrolled during a 12 month period
        'latest.cost.tuition.in_state', 
        'latest.cost.tuition.out_of_state',
        'latest.admissions.admission_rate.overall',
        'latest.school.carnegie_basic',                         # Carnegie Classification -- basic
        'latest.school.ownership',                              # 1-public, 2-private nonprofit, 3-private forprofit
        'latest.school.institutional_characteristics.level',    # 1: 4-year, 2: 2-year, 3-less than 2-year
        'latest.admissions.sat_scores.average.overall',         # Average SAT equivalent score of students admitted
        'latest.admissions.sat_scores.midpoint.math',           # Midpoint of the ACT math score
        'latest.admissions.sat_scores.midpoint.writing',        # Midpoint of the ACT writing score
        'latest.admissions.sat_scores.midpoint.critical_reading' # Midpoint of the ACT English score
        ]

    FIELDS_STRING = ','.join(fields) # puts the fields into one string and comma-separates them
    TOTAL_NUM_UNIVERSITIES = 6681
    RESULTS_PER_PAGE = 100
    # retrns a requests.Response object of the results of the current page call
    def get_page(page_num, fields_string):
        params = {
            '_per_page' : RESULTS_PER_PAGE, # maximum number of results the API can return per page
            '_page' : page_num,
            'fields' : FIELDS_STRING 
        }

        # run the request
        response = requests.get(get_url, params = params)
        return response


    def get_all_pages():
        all_results = []
        requests_needed = math.ceil(TOTAL_NUM_UNIVERSITIES / RESULTS_PER_PAGE)
        print(requests_needed, 'API requests needed. Starting now...')
        for page_num in range(requests_needed):
            response = get_page(page_num, FIELDS_STRING)
            json_response = response.json() # response in python dict format
            all_results.extend(json_response['results'])
        print('Finished.')
        return all_results
    
    final = get_all_pages()

    file_name = os.path.join(os.getcwd(), 'database/api_information/all_universities.json')
    with open(file_name, 'w') as f:
        json.dump(final, f, indent = 4)

def get_university_zipcodes():
    JSON_FILENAME = os.path.join(os.getcwd(), 'database/api_information/all_universities.json')

    with open(JSON_FILENAME) as f:
        universities = json.load(f)

    zipcodes = set()

    for university in universities:
        current_zip = university['latest.school.zip']
        # we need to remove the postal code
        zipcodes.add(current_zip[:5]) # cut every zipcode to five digits

    sorted_zipcodes = sorted(zipcodes)
    file_name = os.path.join(os.getcwd(), 'database/api_information/zipcodes.txt')
    with open(file_name, 'w') as f:
        for zipcode in sorted_zipcodes:
            f.write(f"{zipcode}\n")
    return sorted_zipcodes

def api_call_for_coffeeshops():
    def get_coffee_shops_from_zipcode() :
        zipcodes = get_university_zipcodes()
        # Get API request
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        search_url = "https://api.yelp.com/v3/businesses/search"
        headers = {'Authorization': 'Bearer {}'.format(api_key)}
        coffee_shops = {}
        print("Searching " + str(len(zipcodes)) + " zipcodes for coffee shops.")
        for zipcode in zipcodes[:10] :
            # customize search parameters for Yelp GET call
            params = {
            'term' : 'coffee shops',
            'location' : zipcode,
            'limit' : 50 # limits results to just one
            }
            # response.content will give you raw json
            
            response = requests.get(search_url, headers = headers, params = params)
            try:
                coffee_shops.update({item['id']:item for item in response.json()['businesses']})
            except:
                print("Error retrieving coffee shops for zipcode " + str(zipcode) + " " + str(response.json()))
        print("Finished getting initial list of all coffee shops.")
        return coffee_shops
            

    def get_all_coffee_shops_detailed() :
        all_coffee_shops = []
        coffee_shop_ids = get_coffee_shops_from_zipcode()
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        headers = {'Authorization': 'Bearer {}'.format(api_key)}

        print("Getting detailed information for each of the " + str(len(coffee_shop_ids)) + " coffee shops")
        for shop_id in coffee_shop_ids:
            id = str(shop_id)
            search_url = "https://api.yelp.com/v3/businesses/" + id
            response = requests.get(search_url, headers = headers)
            all_coffee_shops.append(response.json())
        print("Finished querying each individual coffee shop.")
        return all_coffee_shops
            
    final = get_all_coffee_shops_detailed()

    file_name = os.path.join(os.getcwd(), 'database/api_information/all_coffee_shops.json')
    with open(file_name, 'w') as f:
        json.dump(final, f, indent = 4)

# TODO
def api_call_for_libraries():
    # Get API request
    api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
    api_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    #headers = {'Authorization': 'Bearer {}'.format(api_key)}

    # customize search parameters for Yelp GET call
    params={
        "query": "library",
        "key": api_key
    }

    # response.content will give you raw json
    response = requests.get(api_url, params = params)

    # prints reponse to json
    # with open('response.json', 'w') as f:
    #     json.dump(response.json(), f, indent = 4)    
        
    data = response.json()

if __name__ == "__main__":
    # api_call_for_universities()
    api_call_for_coffeeshops()