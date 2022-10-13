# Generate a JSON file containing all universities
# in the College Scorecard API
import json
import requests
import math

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
        'latest.location.lat',
        'latest.location.lon',
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


# given a requests.Response object, outputs it to a file in JSON format
def print_response(response, outputFileName):
    with open(outputFileName, "w") as f:
        json.dump(response.json(), f, indent = 4)


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


def main():
    final = get_all_pages()

    with open('all_universities.json', "w") as f:
            json.dump(final, f, indent = 4)

if __name__ == "__main__":
    main()