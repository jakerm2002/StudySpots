import json

def get_university_zipcodes():
    JSON_FILENAME = 'all_universities.json'

    with open(JSON_FILENAME) as f:
        universities = json.load(f)

    zipcodes = set()

    for university in universities:
        current_zip = university['latest.school.zip']
        # we need to remove the postal code
        zipcodes.add(current_zip[:5]) # cut every zipcode to five digits

    sorted_zipcodes = sorted(zipcodes)
    print(sorted_zipcodes)
    print(len(sorted_zipcodes), 'zipcodes')
    with open('zipcodes.txt', 'w') as f:
        for zipcode in sorted_zipcodes:
            f.write(f"{zipcode}\n")
    return sorted_zipcodes

get_university_zipcodes()