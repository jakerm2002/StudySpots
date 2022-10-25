import unittest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://www.studyspots.me/"

class GUITests(unittest.TestCase):
    def setUp(self):
        print("beginning setup for test_gui module")

        # allow gitlab ci/cd to run selenium tests
        #global driver, wait
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("window-size=1200x600")
        if False:
            self.driver = webdriver.Chrome(service = Service(ChromeDriverManager().install()), options = chrome_options)
        else:
            self.driver = Remote(
                "http://selenium__standalone-chrome:4444/wd/hub",
                desired_capabilities=chrome_options.to_capabilities(),
            )
        self.driver.get(url)
        wait = WebDriverWait(self.driver, 20)
        # return self.driver

    def tearDown(self):
        self.driver.quit()

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