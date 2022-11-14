# based on https://gitlab.com/Nathaniel-Nemenzo/getthatbread/-/blob/main/frontend/getthatbread/selenium/test_gui.py
import sys
import time
import pytest

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = None
wait = None
local = False # set to FALSE when pushing to gitlab

url = "https://www.studyspots.me/"

def setup_module():
    print("beginning setup for test_gui module")

    # allow gitlab ci/cd to run selenium tests
    global driver, wait
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("window-size=1200x600")
    if local:
        driver = webdriver.Chrome(service = Service(ChromeDriverManager().install()), chrome_options = chrome_options)
    else:
        driver = Remote(
            "http://selenium__standalone-chrome:4444/wd/hub",
            desired_capabilities=chrome_options.to_capabilities(),
        )
    driver.get(url)
    wait = WebDriverWait(driver, 20)
    return driver

def teardown_module():
    print("tearing down test_gui module")
    driver.quit()

'''
Basic Tests
'''
def test_title():
    print("starting test_title")
    assert driver.title == "React App"

def test_navbar_home():
    print("starting test_navbar_home")
    home = driver.find_elements(By.XPATH, "/html/body/div/div/nav/div/div/a[1]")
    home.click()
    assert driver.current_url == url

def test_navbar_coffeeshops():
    print("starting test_navbar_coffeeshops")
    coffeeshops = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/a[2]")
    coffeeshops.click()
    assert driver.current_url == url + "CoffeeShops"

def test_navbar_libraries():
    print("starting test_navbar_libraries")
    libraries = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/a[3]")
    libraries.click()
    assert driver.current_url == url + "Libraries"

def test_navbar_universities():
    print("starting test_navbar_universities")
    universities = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/a[4]")
    universities.click()
    assert driver.current_url == url + "Universities"

def test_navbar_about():
    print("starting test_navbar_about")
    about = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/a[5]")
    about.click()
    assert driver.current_url == url + "About"