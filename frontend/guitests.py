import unittest
from selenium import webdriver

class GUITests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("/usr/local/bin/chromedriver")
        self.driver.get("https://studyspots.me")

    def tearDown(self):
        self.driver.close()

    def test_homepage(self):
        title = self.driver.title 
        self.assertEqual(title, "React App")

    def test_universities(self):
        self.open("https://studyspots.me/universities")
        print(title)
        self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")

    # def test_homepage(self):
    #     title = self.driver.title 
    #     self.assertEqual(title, "React App")