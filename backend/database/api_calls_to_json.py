from serpapi import GoogleSearch
import json
import math
import os
import requests
import sys


def api_call_for_universities():
    # Get API request
    api_key = "IQN7xi1l6wM8gbmJfFTSjRMBJSTDCj1zwqNGrWbG"
    search_url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?"
    api_url = "&api_key=" + api_key
    get_url = search_url + api_url

    # set what fields to retrieve from API
    # comments are descriptions from College Scorecard API documentation
    fields = [
        "id",
        "latest.school.name",
        "latest.school.alias",
        "latest.school.zip",
        "latest.school.city",
        "latest.school.state",
        "latest.school.school_url",
        "latest.school.locale",
        "location.lat",
        "location.lon",
        "latest.student.size",  # Enrollment of undergraduate certificate/degree-seeking students
        "latest.student.enrollment.all",  # Enrollment of all undergraduate students
        "latest.student.enrollment.undergrad_12_month",  # Unduplicated count of undergraduate students enrolled during a 12 month period
        "latest.student.enrollment.grad_12_month",  # Unduplicated count of graduate students enrolled during a 12 month period
        "latest.cost.tuition.in_state",
        "latest.cost.tuition.out_of_state",
        "latest.admissions.admission_rate.overall",
        "latest.school.carnegie_basic",  # Carnegie Classification -- basic
        "latest.school.ownership",  # 1-public, 2-private nonprofit, 3-private forprofit
        "latest.school.institutional_characteristics.level",  # 1: 4-year, 2: 2-year, 3-less than 2-year
        "latest.admissions.sat_scores.average.overall",  # Average SAT equivalent score of students admitted
        "latest.admissions.sat_scores.midpoint.math",  # Midpoint of the SAT math score
        "latest.admissions.sat_scores.midpoint.writing",  # Midpoint of the SAT writing score
        "latest.admissions.sat_scores.midpoint.critical_reading",  # Midpoint of the SAT English score
    ]

    FIELDS_STRING = ",".join(
        fields
    )  # puts the fields into one string and comma-separates them
    TOTAL_NUM_UNIVERSITIES = 6681
    RESULTS_PER_PAGE = 100
    # retrns a requests.Response object of the results of the current page call
    def get_page(page_num):
        params = {
            "_per_page": RESULTS_PER_PAGE,  # maximum number of results the API can return per page
            "_page": page_num,
            "fields": FIELDS_STRING,
        }

        # run the request
        response = requests.get(get_url, params=params)
        return response

    def get_all_pages():
        all_results = []
        us_states = {
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MD",
            "MA",
            "MI",
            "MN",
            "MS",
            "MO",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
            "NM",
            "NY",
            "NC",
            "ND",
            "OH",
            "OK",
            "OR",
            "PA",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VT",
            "VA",
            "WA",
            "WV",
            "WI",
            "WY",
        }
        requests_needed = math.ceil(TOTAL_NUM_UNIVERSITIES / RESULTS_PER_PAGE)
        print(requests_needed, "API requests needed. Starting now...")
        for page_num in range(requests_needed):
            response = get_page(page_num)
            json_response = response.json()  # response in python dict format
            for result in json_response["results"]:
                state = result["latest.school.state"]
                locale = (
                    result["latest.school.locale"]
                    if result["latest.school.locale"]
                    else 41
                )
                carnegie_basic = result["latest.school.carnegie_basic"]
                size = (
                    result["latest.student.size"]
                    if result["latest.student.size"]
                    else 0
                )
                sat_average = result["latest.admissions.sat_scores.average.overall"]
                sat_median_math = result["latest.admissions.sat_scores.midpoint.math"]
                sat_median_reading = result[
                    "latest.admissions.sat_scores.midpoint.critical_reading"
                ]
                acceptance_rate = result["latest.admissions.admission_rate.overall"]
                # Only store colleges in the US states and not in rural areas
                if (
                    state in us_states
                    and (
                        locale == 11
                        or locale == 12
                        or locale == 13
                        or locale == 21
                        or locale == 22
                        or locale == 23
                    )
                    and (
                        carnegie_basic == 15
                        or carnegie_basic == 16
                        or carnegie_basic == 17
                    )
                    and (
                        sat_average != None
                        and sat_median_math != None
                        and sat_median_reading != None
                    )
                    and acceptance_rate != None
                    and size > 500
                ):
                    all_results.append(result)
        print("Finished. Gathered", len(all_results), "results.")
        return all_results

    def get_descriptions(all_universities):
        all_modified_results = []
        wikipedia_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles="
        images_api = "https://serpapi.com/playground?tbm=isch&device=desktop&q="
        for uni in all_universities:
            # Query Wikipedia for more in-depth descriptions for the colleges
            uni_name = uni["latest.school.name"]
            uni_name = uni_name.replace(" ", "%20")
            uni_name = uni_name.replace("&", "%26")
            uni_name = uni_name.replace("/", "|")
            uni_name = uni_name.replace(".", "")
            request = requests.get(wikipedia_api + uni_name)
            # Try to strip away any extra information if the wikipedia search didn't provide anything
            if "-1" in request.json()["query"]["pages"]:
                uni_name = (
                    uni_name[: uni_name.find("-")]
                    if uni_name.find("-") != -1
                    else uni_name
                )
                uni_name = (
                    uni_name[: uni_name.find("%20at%20")]
                    if uni_name.find("%20at%20") != -1
                    else uni_name
                )
                uni_name = (
                    uni_name[: uni_name.find("Main%20Campus")]
                    if uni_name.find("Main%20Campus") != -1
                    else uni_name
                )
                if uni_name:
                    request = requests.get(wikipedia_api + uni_name)
            # Try to search by the school's alias instead if wikipedia search still didn't provide anything
            if "-1" in request.json()["query"]["pages"] and uni["latest.school.alias"]:
                uni_name = uni["latest.school.alias"]
                uni_name = uni_name.replace(" ", "%20")
                uni_name = uni_name.replace("&", "%26")
                uni_name = uni_name.replace("/", "|")
                uni_name = uni_name.replace(",", "|")
                uni_name = uni_name.replace(".", "")
                request = requests.get(wikipedia_api + uni_name)
            # Get the description from the first page
            for page in request.json()["query"]["pages"]:
                try:
                    uni["description"] = request.json()["query"]["pages"][page][
                        "extract"
                    ]
                    break
                except:
                    print(
                        "Unable to find a description for school "
                        + uni["latest.school.name"]
                        + " from querying with "
                        + uni_name
                    )
                    uni["description"] = ""
                    pass

            all_modified_results.append(uni)

        return all_modified_results

    def get_images(all_universities):
        all_modified_results = []
        # Query ____ for pictures of the colleges
        for i in range(len(all_universities)):
            uni = all_universities[i]
            if i < 200:
                all_modified_results.append(uni)
                continue
            params = {
                "device": "desktop",
                "engine": "google",
                "q": uni["latest.school.name"],
                "google_domain": "google.com",
                "tbm": "isch",
                "api_key": "80a7060b228602de007ffe4d8e560fd0c8588ce11488c88f70a50428ebd3ef17",
            }
            image_response = GoogleSearch(params).get_dict()
            for image in image_response["images_results"]:
                try:
                    uni["photo"] = image["original"]
                    break
                except:
                    print("Unable to find an image for " + uni["latest.school.name"])
                    pass

            all_modified_results.append(uni)

        return all_modified_results

    file_name = os.path.join(os.getcwd(), "api_information/all_universities.json")
    all_universities_file = open(file_name)
    final = get_images(json.load(all_universities_file))

    with open(file_name, "w") as f:
        json.dump(final, f, indent=4)


def get_university_zipcodes():
    JSON_FILENAME = os.path.join(os.getcwd(), "/api_information/all_universities.json")

    with open(JSON_FILENAME) as f:
        universities = json.load(f)

    zipcodes = set()

    for university in universities:
        current_zip = university["latest.school.zip"]
        # we need to remove the postal code extension
        zipcodes.add(current_zip[:5])  # cut every zipcode to five digits

    sorted_zipcodes = sorted(zipcodes)
    file_name = os.path.join(os.getcwd(), "/api_information/zipcodes.txt")
    with open(file_name, "w") as f:
        for zipcode in sorted_zipcodes:
            f.write(f"{zipcode}\n")
    return sorted_zipcodes


def get_university_coordinates():
    JSON_FILENAME = os.path.join(os.getcwd(), "api_information/all_universities.json")

    with open(JSON_FILENAME) as f:
        universities = json.load(f)

    coordinates = set()
    for university in universities:
        coordinates.add((university["location.lat"], university["location.lon"]))

    file_name = os.path.join(os.getcwd(), "/api_information/coordinates.txt")
    sorted_coordinates = sorted(coordinates)
    with open(file_name, "w") as f:
        for coordinate in sorted_coordinates:
            f.write(f"{coordinate}\n")
    return sorted_coordinates


def api_call_for_coffeeshops():
    api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"

    def get_coffee_shops_from_coordinates(coordinates):
        search_url = "https://api.yelp.com/v3/businesses/search"
        headers = {"Authorization": "Bearer {}".format(api_key)}
        coffee_shop_ids = set()
        # for testing, you can select the first 10 coordinate pairs in the set
        # by replacing the current for loop definition with:
        # for lat, lng in coordinates[:10]:
        for lat, lng in coordinates:
            # customize search parameters for Yelp GET call
            params = {
                "term": "coffee shops",
                "latitude": str(lat),
                "longitude": str(lng),
                "limit": 4,  # limits number of results returned
            }

            response = requests.get(search_url, headers=headers, params=params)
            for shop in response.json()["businesses"]:
                try:
                    coffee_shop_ids.add(shop["id"])
                except:
                    print("error with getting place id from coffee shop: " + str(shop))

        # output all coffee shop ids to a file
        file_name = os.path.join(
            os.getcwd(), "/api_information/all_coffee_shop_ids.txt"
        )
        with open(file_name, "w") as sys.stdout:
            for identifier in coffee_shop_ids:
                print(identifier)
        sys.stdout = sys.__stdout__  # reset stdout to the console

        return coffee_shop_ids

    def get_coffee_shops_from_zipcode():
        zipcodes = get_university_zipcodes()
        # Get API request
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        search_url = "https://api.yelp.com/v3/businesses/search"
        headers = {"Authorization": "Bearer {}".format(api_key)}
        coffee_shops = {}
        print("Searching " + str(len(zipcodes)) + " zipcodes for coffee shops.")
        for zipcode in zipcodes[:10]:
            # customize search parameters for Yelp GET call
            params = {
                "term": "coffee shops",
                "location": zipcode,
                "limit": 50,  # limits results to just one
            }
            # response.content will give you raw json

            response = requests.get(search_url, headers=headers, params=params)
            try:
                coffee_shops.update(
                    {item["id"]: item for item in response.json()["businesses"]}
                )
            except:
                print(
                    "Error retrieving coffee shops for zipcode "
                    + str(zipcode)
                    + " "
                    + str(response.json())
                )
        print("Finished getting initial list of all coffee shops.")
        return coffee_shops

    def get_all_coffee_shops_detailed(coffee_shop_ids):
        all_coffee_shops = []
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        headers = {"Authorization": "Bearer {}".format(api_key)}

        print(
            "Getting detailed information for each of the "
            + str(len(coffee_shop_ids))
            + " coffee shops"
        )
        for shop_id in coffee_shop_ids:
            id = str(shop_id)
            search_url = "https://api.yelp.com/v3/businesses/" + id
            response = requests.get(search_url, headers=headers)
            all_coffee_shops.append(response.json())
        print("Finished querying each individual coffee shop.")
        return all_coffee_shops

    def get_all_coffee_shops_detailed_from_file():
        file_name = os.path.join(os.getcwd(), "api_information/all_coffee_shop_ids.txt")
        coffee_shop_ids = set(line.strip() for line in open(file_name))
        all_coffee_shops = []
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        headers = {"Authorization": "Bearer {}".format(api_key)}

        print(
            "Getting detailed information for each of the "
            + str(len(coffee_shop_ids))
            + " coffee shops"
        )
        for shop_id in coffee_shop_ids:
            id = str(shop_id)
            search_url = "https://api.yelp.com/v3/businesses/" + id
            response = requests.get(search_url, headers=headers)
            all_coffee_shops.append(response.json())
        print("Finished querying each individual coffee shop.")
        return all_coffee_shops

    # takes a list of coffee shop reviews and appends them
    # to the json containing the detailed information of coffee shops
    # then writes the json to a new file
    def append_reviews_to_json():
        # api parameters
        api_key = "wnDyPi75MaLBd8T2WNc3wF14RINVWWxvVbL504fNQFN7AVQ41NIOhv5Sf2FBm1hI2AhZa3_nPI_edrv2GGZOTTD663sWT7jpc6poba4C2jI13L-o9Zl08ZGazvg0Y3Yx"
        headers = {"Authorization": "Bearer {}".format(api_key)}

        JSON_FILENAME = os.path.join(
            os.getcwd(), "api_information/all_coffee_shops.json"
        )

        with open(JSON_FILENAME) as f:
            all_shops = json.load(
                f
            )  # this will get us a list where each element contains a dict

        # go through each coffee shop and call the review endpoint and give it the business id
        for shop in all_shops:
            id = shop["id"]
            search_url = "https://api.yelp.com/v3/businesses/" + id + "/reviews"
            response = requests.get(search_url, headers=headers)
            reviews = response.json()  # reviews in a python dict

            if "reviews" in reviews:
                shop["reviews"] = reviews["reviews"]

        return all_shops

    print("Get coordinates from universities")
    coordinates = get_university_coordinates()
    print("Got the coordinates needed!")
    print("Getting coffee shops around each area.")
    coffee_shop_ids = get_coffee_shops_from_coordinates(coordinates)
    print("Got all the coffee shop place ids!")
    print("Getting detailed information about each place")
    all_coffee_shops = get_all_coffee_shops_detailed(coffee_shop_ids)
    all_coffee_shops = get_all_coffee_shops_detailed_from_file()
    print(
        "Got all of the detailed information and writing to a file! items:"
        + str(len(all_coffee_shops))
    )
    file_name = os.path.join(os.getcwd(), "/api_information/all_coffee_shops.json")
    with open(file_name, "w") as f:
        json.dump(all_coffee_shops, f, indent=4)
    print("Getting user reviews for each business...:" + str(len(all_coffee_shops)))
    all_coffee_shops_with_reviews = append_reviews_to_json()
    file_name = os.path.join(
        os.getcwd(), "api_information/all_coffee_shops_with_reviews.json"
    )
    with open(file_name, "w") as f:
        json.dump(all_coffee_shops_with_reviews, f, indent=4)
    print("Finished writing reviews to file with path:" + file_name)


def api_call_for_libraries():
    api_key = "AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"

    def get_all_libraries(coordinates):
        api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
        library_ids = set()
        for lat, lng in coordinates:
            response = requests.get(
                api_url
                + "location="
                + str(lat)
                + "%2C"
                + str(lng)
                + "&radius=2000"
                + "&keyword=library"
                + "&key="
                + api_key
            )

            for library in response.json()["results"]:
                try:
                    library_ids.add(library["place_id"])
                except:
                    print("error with getting place id from library: " + str(library))

        # output all library place ids to a file
        file_name = os.path.join(os.getcwd(), "/api_information/all_library_ids.txt")
        with open(file_name, "w") as sys.stdout:
            for identifier in library_ids:
                print(identifier)
        sys.stdout = sys.__stdout__  # reset stdout to the console

        return library_ids

    def get_library_detailed_info(library_ids):
        fields = [
            "address_components",
            "formatted_address",
            "formatted_phone_number",
            "geometry",
            "name",
            "opening_hours",
            "photos",
            "place_id",
            "rating",
            "reviews",
            "url",
            "utc_offset",
            "website",
        ]

        FIELDS_STRING = ",".join(
            fields
        )  # puts the fields into one string and comma-separates them

        api_url = "https://maps.googleapis.com/maps/api/place/details/json?"
        all_libraries = []
        for library_id in library_ids:
            params = {
                "place_id": library_id,  # maximum number of results the API can return per page
                "key": api_key,
                "fields": FIELDS_STRING,
            }
            response = requests.get(api_url, params=params)
            all_libraries.append(response.json()["result"])

        return all_libraries

    print("Get coordinates from universities")
    coordinates = get_university_coordinates()
    print("Got the coordinates needed!")
    print("Getting libraries around each area.")
    library_ids = get_all_libraries(coordinates)
    print("Got all the library place ids!")
    print("Getting detailed information about each place")
    all_libraries = get_library_detailed_info(library_ids)
    print(
        "Got all of the detailed information and writing to a file! items:"
        + str(len(all_libraries))
    )
    file_name = os.path.join(os.getcwd(), "/api_information/all_libraries.json")
    with open(file_name, "w") as f:
        json.dump(all_libraries, f, indent=4)


if __name__ == "__main__":
    # api_call_for_universities()
    # api_call_for_coffeeshops()
    # api_call_for_libraries()
    print("calling apis")
