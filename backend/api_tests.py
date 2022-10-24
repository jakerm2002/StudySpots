import json
from database.databases import *
from unittest import main, TestCase
from app import universities_by_id, coffeeshops_by_id, libraries_by_id, libraries, coffeeshops, universities

class APITest(TestCase):

    def test_universities_by_id(self):
        with app.app_context():
            res = universities_by_id(0)
            res = json.loads(res)
            self.assertEqual(res, {
                "url": "https://www.uab.edu/", 
                "size": 13549, 
                "carnegie_basic": 15, 
                "latitude": 33.505697, 
                "locale": 12, 
                "sat_median_writing": None, 
                "longitude": -86.799345, 
                "sat_average": 1245, 
                "zipcode": "35294-0110", 
                "institutional_characteristics": 1, 
                "outstate_tuition": 20400.0, 
                "sat_median_math": 595, 
                "acceptance_rate": 0.806, 
                "name": "University of Alabama at Birmingham", 
                "city": "Birmingham", 
                "enrollment_ugr_12m": 14969, 
                "state": "AL", 
                "ownership": 1, 
                "enrollment_all": None, 
                "description": "The University of Alabama at Birmingham (UAB) is a public research university in Birmingham, Alabama. Developed from an academic extension center established in 1936, the institution became a four-year campus in 1966 and a fully autonomous university in the University of Alabama System in 1969.\nUAB offers 140 programs of study in 12 academic divisions leading to bachelor's, master's, doctoral, and professional degrees in the social and behavioral sciences, the liberal arts, business, education, engineering, and health-related fields such as medicine, dentistry, optometry, nursing, and public health. In the fall of 2019, 22,080 students from more than 110 countries were enrolled.The UAB Health System, one of the largest academic medical centers in the United States, is affiliated with the university. UAB Hospital sponsors residency programs in medical specialties, including internal medicine, neurology, physical medicine and rehabilitation, surgery, radiology, and anesthesiology.\nUAB is the state's largest single employer, with more than 23,000 faculty and staff and over 53,000 jobs at the university and in the health system. An estimated 10 percent of the jobs in the Birmingham-Hoover Metropolitan Area and 1 in 31 jobs in the state of Alabama are directly or indirectly related to UAB. The university's overall annual economic impact was estimated to be $7.15 billion in 2017.",
                "sat_median_reading": 614, 
                "id": 0, 
                "enrollment_gr_12m": 10874, 
                "photo": "https://www.usnews.com/dims4/USNEWS/7095941/17177859217/resize/800x540%3E/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F30%2F09a5b34c4fa3a81530dcb48b57fc70%2Fcollege-photo_12935.jpg", 
                "alias": "UAB", 
                "instate_tuition": 8568.0})
    
    def test_coffeeshops_by_id(self):
        with app.app_context():
            res = coffeeshops_by_id(0)
            res = json.loads(res)
            self.assertEqual(res, {
                "formatted_hours": "Monday: 06:30 AM - 09:00 PM\n Tuesday: 06:30 AM - 09:00 PM\n Wednesday: 06:30 AM - 09:00 PM\n Thursday: 06:30 AM - 09:00 PM\n Friday: 06:30 AM - 10:00 PM\n Saturday: 06:30 AM - 10:00 PM\n Sunday: 06:30 AM - 04:00 PM", 
                "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/e3U2FiTzBUjYvRLon8ln-w/o.jpg", 
                "hours_day_2_open": "0630", 
                "review_1_available": True, 
                "latitude": 39.080624, 
                "hours_day_4_closed": "2200", 
                "rating": 4.5, 
                "hours_day_6_closed": "1600", 
                "review_count": 31, 
                "id": 0, 
                "price": "$", 
                "review_2_rating": 4, 
                "hours_day_5_closed": "2200", 
                "hours_day_1_open": "0630", 
                "review_1_text": "my friend and I needed a place to sit and study a while, and Fort Thomas was GREAT! The staff were all super kind and great. I got the green Greek smoothie,...", "review_3_rating_string": "4", "state": "KY", "hours_day_0_open": "0630", "city": "Fort Thomas", "review_3_text": "Very welcoming staff and cozy nook by the window to spend some time catching up or even working. Variety of coffee and sweets that are delicious but I...", "review_3_rating": 4, "hours_day_2_closed": "2100", "hours_day_3_open": "0630", "hours_day_6_open": "0630", "display_address": "{\"118 N Fort Thomas Ave\",\"Fort Thomas, KY 41075\"}", "phone": "+18599998080", "review_2_text": "Really enjoyed this adorable coffee shop! I got a delicious lavender latte, the service was great and the place inside was nice and quaint. I would love to...", 
                "rating_string": "4.5", 
                "zipcode": "41075", 
                "hours_arr": "{\"Monday: 06:30 AM - 09:00 PM\",\"Tuesday: 06:30 AM - 09:00 PM\",\"Wednesday: 06:30 AM - 09:00 PM\",\"Thursday: 06:30 AM - 09:00 PM\",\"Friday: 06:30 AM - 10:00 PM\",\"Saturday: 06:30 AM - 10:00 PM\",\"Sunday: 06:30 AM - 04:00 PM\"}", 
                "review_1_rating": 5, 
                "hours_day_0_closed": "2100", 
                "longitude": -84.448471, 
                "photo": "https://s3-media2.fl.yelpcdn.com/bphoto/e3U2FiTzBUjYvRLon8ln-w/o.jpg", 
                "review_2_rating_string": "4", 
                "hours_day_1_closed": "2100", 
                "hours_day_5_open": "0630", 
                "review_2_available": True, 
                "address1": "118 N Fort Thomas Ave", 
                "hours_day_3_closed": "2100", 
                "review_3_author": "Haley A.", 
                "name": "Fort Thomas Coffee", 
                "review_1_author": "Katie H.", 
                "review_1_rating_string": "5", 
                "review_3_available": True, 
                "hours_day_4_open": "0630", 
                "review_2_author": "Tulsi P."
                })

    def test_library_by_id(self):
        with app.app_context():
            res = library_by_id(0)
            res = json.loads(res)
            self.assertEqual(res, {
                "review_3_text": "This place is da bomb. Free printing, cool selection of books, super nice courtyard, helpful staff. It's all ya need :)", 
                "review_3_rating": 5, 
                "review_1_text": "Very friendly number one helpful, clean if they don\u2019t have the books they order them for you.", 
                "review_2_available": True, 
                "hours_arr": "{\"Monday: 10:00 AM \u2013 6:00 PM\",\"Tuesday: 10:00 AM \u2013 6:00 PM\",\"Wednesday: 12:00 \u2013 8:00 PM\",\"Thursday: 10:00 AM \u2013 6:00 PM\",\"Friday: 9:00 AM \u2013 5:00 PM\",\"Saturday: 9:00 AM \u2013 2:00 PM\",\"Sunday: Closed\"}", 
                "review_3_available": True, 
                "rating_string": "4.6", 
                "website": "https://www.bpl.org/locations/26/", 
                "review_2_text": "A small decent library with a lot of furniture to relax in. Nice staff. BUT it can be very loud to study and read because sounds echo the entire building. Chairs don't have leg protectors against the hardwood floor so it's very loud when people move their chairs. No study rooms or a quiet section. I would recommend bringing ear plugs if you need to focus.\n\nAlso a security guy with a black suit sits in the entrance!", 
                "id": 0, 
                "utc_offset": -240, 
                "city": "Boston", 
                "review_2_author": "Caasi", 
                "review_3_author": "Zach Shelley", 
                "maps_url": "https://maps.google.com/?cid=16577649552135182082", 
                "review_3_rating_string": "5", 
                "address": "300 N Harvard St, Boston, MA 02134, USA", 
                "review_1_available": true, 
                "formatted_hours": "Monday: 10:00 AM \u2013 6:00 PM\n Tuesday: 10:00 AM \u2013 6:00 PM\n Wednesday: 12:00 \u2013 8:00 PM\n Thursday: 10:00 AM \u2013 6:00 PM\n Friday: 9:00 AM \u2013 5:00 PM\n Saturday: 9:00 AM \u2013 2:00 PM\n Sunday: Closed", 
                "review_2_rating": 4, 
                "longitude": -71.12809440000001, 
                "phone": "(617) 787-6313", 
                "review_2_rating_string": "4", 
                "latitude": 42.3601136, 
                "review_1_rating": 5, 
                "review_1_rating_string": "5", 
                "zipcode": "02134", 
                "photo_reference": "AcYSjRjmXeEI_v2N5FMIIz3pM693s7EN8jmyoPM8Rxy3qkzEB2rwKmYs1sUTzBx9vHLk4_vDJ3jvSnRS_l4ZrywLxvhujZ38aRm5-fLV2BqmcIMwpCGn1E_YBLZ64kXCtliVB3SnKqofNwCv-chH93EVRLjewCxgK1Qqoro-dVoJFrUHHc0P", 
                "review_1_author": "Janet Umanzor", 
                "rating": 4.6, 
                "name": "Honan-Allston Branch of the Boston Public Library", 
                "photo_link": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=AcYSjRjmXeEI_v2N5FMIIz3pM693s7EN8jmyoPM8Rxy3qkzEB2rwKmYs1sUTzBx9vHLk4_vDJ3jvSnRS_l4ZrywLxvhujZ38aRm5-fLV2BqmcIMwpCGn1E_YBLZ64kXCtliVB3SnKqofNwCv-chH93EVRLjewCxgK1Qqoro-dVoJFrUHHc0P&key=AIzaSyDzolF8UfW4i-_ATJ04UskWuJGVgVjTNOQ"
                })

    def test_universities(self):
        with app.test_request_context():
            res = universities()
            res = json.loads(res)
            self.assertEqual(len(res), 10)
            for uni in res:
                self.assertIn('url', uni)
                self.assertIn('size', uni)
                self.assertIn('carnegie_basic', uni)
                self.assertIn('latitude', uni)
                self.assertIn('locale', uni)
                self.assertIn('sat_median_writing', uni)
                self.assertIn('longitude', uni)
                self.assertIn('sat_average', uni)
                self.assertIn('zipcode', uni)
                self.assertIn('institutional_characteristics', uni)
                self.assertIn('outstate_tuition', uni)
                self.assertIn('sat_median_math', uni)
                self.assertIn('acceptance_rate', uni)
                self.assertIn('name', uni)
                self.assertIn('city', uni)
                self.assertIn('enrollment_ugr_12m', uni)
                self.assertIn('state', uni)
                self.assertIn('ownership', uni)
                self.assertIn('enrollment_all', uni)
                self.assertIn('description', uni)
                self.assertIn('sat_median_reading', uni)
                self.assertIn('id', uni)
                self.assertIn('enrollment_gr_12m', uni)
                self.assertIn('photo', uni)
                self.assertIn('alias', uni)
                self.assertIn('instate_tuition', uni)

    def test_coffeeshops(self):
        with app.test_request_context():
            res = coffeeshops()
            res = json.loads(res)
            self.assertEqual(len(res), 10)
            for cs in res:
                self.assertIn('formatted_hours', cs)
                self.assertIn('image_url', cs)
                self.assertIn('hours_day_2_open', cs)
                self.assertIn('review_1_available', cs)
                self.assertIn('latitude', cs)
                self.assertIn('hours_day_4_closed', cs)
                self.assertIn('rating', cs)
                self.assertIn('hours_day_6_closed', cs)
                self.assertIn('review_count', cs)
                self.assertIn('id', cs)
                self.assertIn('price', cs)
                self.assertIn('review_2_rating', cs)
                self.assertIn('hours_day_5_closed', cs)
                self.assertIn('hours_day_1_open', cs)
                self.assertIn('review_1_text', cs)
                self.assertIn('rating_string', cs)
                self.assertIn('zipcode', cs)
                self.assertIn('hours_arr', cs)
                self.assertIn('review_1_rating', cs)
                self.assertIn('hours_day_0_closed', cs)
                self.assertIn('longitude', cs)
                self.assertIn('photo', cs)
                self.assertIn('review_2_rating_string', cs)
                self.assertIn('hours_day_1_closed', cs)
                self.assertIn('hours_day_5_open', cs)
                self.assertIn('review_2_available', cs)
                self.assertIn('address1', cs)
                self.assertIn('hours_day_3_closed', cs)
                self.assertIn('review_3_author', cs)
                self.assertIn('name', cs)
                self.assertIn('review_1_author', cs)
                self.assertIn('review_1_rating_string', cs)
                self.assertIn('review_3_available', cs)
                self.assertIn('hours_day_4_open', cs)
                self.assertIn('review_2_author', cs)

    def test_libraries(self):
        with app.test_request_context():
            res = libraries()   
            res = json.loads(res)
            self.assertEqual(len(res), 10)
            for lib in res:
                self.assertIn('utc_offset', lib)
                self.assertIn('rating_string', lib)
                self.assertIn('maps_url', lib)
                self.assertIn('rating', lib)
                self.assertIn('review_3_rating', lib)
                self.assertIn('review_3_text', lib)
                self.assertIn('review_1_rating_string', lib)
                self.assertIn('name', lib)
                self.assertIn('website', lib)
                self.assertIn('review_2_available', lib)
                self.assertIn('review_1_text', lib)
                self.assertIn('latitude', lib)
                self.assertIn('photo_reference', lib)
                self.assertIn('photo_link', lib)
                self.assertIn('address', lib)
                self.assertIn('longitude', lib)
                self.assertIn('review_1_available', lib)
                self.assertIn('review_2_text', lib)
                self.assertIn('review_2_rating', lib)
                self.assertIn('id', lib)
                self.assertIn('review_3_rating_string', lib)
                self.assertIn('review_1_author', lib)
                self.assertIn('review_3_author', lib)
                self.assertIn('review_1_rating', lib)
                self.assertIn('formatted_hours', lib)
                self.assertIn('city', lib)
                self.assertIn('review_3_available', lib)
                self.assertIn('zipcode', lib)
                self.assertIn('review_2_author', lib)
                self.assertIn('review_2_rating_string', lib)
                self.assertIn('hours_arr', lib)
                self.assertIn('phone', lib)


    
