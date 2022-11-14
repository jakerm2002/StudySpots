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

'''
Navbar Tests
'''
def test_navbar_home():
    print("starting test_navbar_home")
    home = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/a[1]")
    print(home)
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

'''
About Page Tests
'''
def test_about_info():
    print("starting test_about_info")
    driver.get(url + 'About')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/h1")
    assert title.text == "StudySpots"
    mission = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/h3[1]")
    assert mission.text == "Mission"
    discovery = driver.find_element(By.XPATH, "/html/body/div/div/div[1]/h3[2]")
    assert discovery.text == "Discovery"

def test_about_team_info():
    print("starting test_about_team_info")
    driver.get(url + 'About')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/h1")
    assert title.text == "Meet the Team"
    members = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/h3")
    assert members.text == "Members"

def test_about_tech_info():
    print("starting test_about_tech_info")
    driver.get(url + 'About')
    tech = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/h1")
    assert tech.text == "Technology Used"
    tools = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/h3[1]")
    assert tools.text == "Tools"
    apis = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/h3[2]")
    assert apis.text == "APIs Scraped"

def test_about_project_info():
    print("starting test_about_project_info")
    driver.get(url + 'About')
    project = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/h3")
    assert project.text == "Project Links"
    gitlab = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/a[1]")
    assert gitlab.text == "GitLab Project Repository"
    postman = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/a[2]")
    assert postman.text == "Postman API Documentation"