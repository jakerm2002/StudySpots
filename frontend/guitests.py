import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class GUITests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("/usr/local/bin/chromedriver")

    def tearDown(self):
        self.driver.close()

    def test_homepage(self):
        self.driver.get("https://studyspots.me")
        title = self.driver.title 
        self.assertEqual(title, "React App")

    def test_universities(self):
        self.driver.get("https://studyspots.me/universities")
        title = self.driver.title
        self.assertEqual(title, "React App")

    def test_coffeeshops(self):
        self.driver.get("https://studyspots.me/coffeeshops")
        title = self.driver.title
        self.assertEqual(title, "React App")

    def test_libraries(self):
        self.driver.get("https://studyspots.me/libraries")
        title = self.driver.title
        self.assertEqual(title, "React App")

    def test_click_universities(self):
        self.driver.get("https://studyspots.me")
        self.driver.get("https://studyspots.me/universities")
        self.assertEqual(self.driver.current_url, "https://www.studyspots.me/universities")

    def test_click_back(self):
        self.driver.get("https://studyspots.me")
        self.driver.get("https://studyspots.me/universities")
        self.driver.back()
        self.assertEqual(self.driver.current_url, "https://www.studyspots.me/")

    def test_click_forward(self):
        self.driver.get("https://studyspots.me")
        self.driver.get("https://studyspots.me/universities")
        self.driver.back()
        self.driver.forward()
        self.assertEqual(self.driver.current_url, "https://www.studyspots.me/universities")

    def test_click_refresh(self):
        self.driver.get("https://studyspots.me")
        self.driver.get("https://studyspots.me/universities")
        self.driver.back()
        self.driver.forward()
        self.assertEqual(self.driver.current_url, "https://www.studyspots.me/universities")

    def test_universities_ucla(self):
        self.driver.get("https://studyspots.me/Universities/110662")
        self.assertEqual(self.driver.title, "React App")

    def test_coffeeshops_bennu(self):
        self.driver.get("https://www.studyspots.me/CoffeeShops/gXip--EE80jF-sqdk5Aghw")
        self.assertEqual(self.driver.title, "React App")

if __name__ == "__main__":
    unittest.main()