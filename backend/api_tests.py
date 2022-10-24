import json
from database.databases import *
from unittest import main, TestCase
from app import universities_by_id, coffeeshops_by_id, libraries

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


    
