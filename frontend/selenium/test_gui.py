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

url = "https://develop.studyspots.me/"

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
    assert driver.title == "StudySpots"

'''
Navbar Tests
'''
def test_navbar_home():
    print("starting test_navbar_home")
    home = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[1]")
    print(home)
    home.click()
    assert driver.current_url == url

def test_navbar_search():
    print("starting test_navbar_search")
    search = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[2]")
    search.click()
    assert driver.current_url == url + "Search"

def test_navbar_coffeeshops():
    print("starting test_navbar_coffeeshops")
    coffeeshops = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[3]")
    coffeeshops.click()
    assert driver.current_url == url + "CoffeeShops"

def test_navbar_libraries():
    print("starting test_navbar_libraries")
    libraries = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[4]")
    libraries.click()
    assert driver.current_url == url + "Libraries"

def test_navbar_universities():
    print("starting test_navbar_universities")
    universities = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[5]")
    universities.click()
    assert driver.current_url == url + "Universities"

def test_navbar_visualizations():
    print("starting test_navbar_visualizations")
    about = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[6]")
    about.click()
    assert driver.current_url == url + "Visualizations"

def test_navbar_provider_visualizations():
    print("starting test_navbar_provider_visualizations")
    about = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[7]")
    about.click()
    assert driver.current_url == url + "ProviderVisualizations"

def test_navbar_about():
    print("starting test_navbar_about")
    about = driver.find_element(By.XPATH, "/html/body/div/div/nav/div/div/div/a[8]")
    about.click()
    assert driver.current_url == url + "About"

'''
About Page Tests
'''
def test_about_info():
    print("starting test_about_info")
    driver.get(url + 'About')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/h1")
    assert title.text == "StudySpots"
    mission = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/h3[1]")
    assert mission.text == "Mission"
    discovery = driver.find_element(By.XPATH, "/html/body/div/div/div[2]/h3[2]")
    assert discovery.text == "Discovery"

def test_about_team_info():
    print("starting test_about_team_info")
    driver.get(url + 'About')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/h1")
    assert title.text == "Meet the Team"
    members = driver.find_element(By.XPATH, "/html/body/div/div/div[3]/h3")
    assert members.text == "Members"

def test_about_tech_info():
    print("starting test_about_tech_info")
    driver.get(url + 'About')
    tech = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/h1")
    assert tech.text == "Technology Used"
    tools = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/h3[1]")
    assert tools.text == "Tools"
    apis = driver.find_element(By.XPATH, "/html/body/div/div/div[4]/h3[2]")
    assert apis.text == "APIs Scraped"

def test_about_project_info():
    print("starting test_about_project_info")
    driver.get(url + 'About')
    project = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/h3")
    assert project.text == "Project Links"
    gitlab = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/a[1]")
    assert gitlab.text == "GitLab Project Repository"
    postman = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/a[2]")
    assert postman.text == "Postman API Documentation"

'''
Search Page Tests
'''
def test_search_page_title():
    print("starting test_search_page_title")
    driver.get(url + "Search")
    assert "Search" in driver.page_source
    assert "Coffee Shops" in driver.page_source
    assert "Libraries" in driver.page_source
    assert "Universities" in driver.page_source

def test_search_page_coffeeshops():
    print("starting test_search_page_coffeeshops")
    driver.get(url + "Search")
    driver.implicitly_wait(5)
    buttons = driver.find_elements(By.TAG_NAME, "button")
    buttons[2].click()
    assert driver.current_url == url + "CoffeeShops"

def test_search_page_libraries():
    print("starting test_search_page_libraries")
    driver.get(url + "Search")
    driver.implicitly_wait(5)
    buttons = driver.find_elements(By.TAG_NAME, "button")
    buttons[3].click()
    assert driver.current_url == url + "Libraries"

def test_search_page_universities():
    print("starting test_search_page_universities")
    driver.get(url + "Search")
    driver.implicitly_wait(5)
    buttons = driver.find_elements(By.TAG_NAME, "button")
    buttons[4].click()
    assert driver.current_url == url + "Universities"

'''
Coffee Shops Page Tests
'''

def test_coffeeshops_title():
    print("starting test_coffeeshops_title")
    driver.get(url + 'CoffeeShops')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[6]/div[1]/h1")
    assert title.text == "Coffee Shops"

def test_coffeeshops_items():
    print("starting test_coffeeshops_items")
    driver.get(url + 'CoffeeShops')
    count = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]")
    assert "Showing " in count.text
    assert "items" in count.text

def test_coffeeshops_search_sort_filter():
    print("starting test_coffeeshops_search_sort_filter")
    driver.get(url + 'CoffeeShops')
    assert "Search" in driver.page_source
    assert "State Filter" in driver.page_source
    assert "City Filter" in driver.page_source
    assert "Zip Code Filter" in driver.page_source
    assert "Price" in driver.page_source
    assert "Rating" in driver.page_source
    assert "Sort" in driver.page_source

def test_coffeeshops_sort():
    print("starting test_coffeeshops_sort")
    driver.get(url + 'CoffeeShops')
    sort = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/div[1]/div/div")
    sort.click()

    options = driver.find_elements(By.CLASS_NAME, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1km1ehz")
    print(options)
    assert options[0].text == "Name"
    options[0].click()
    assert driver.current_url == url + "CoffeeShops?ascending=true&sortBy=name"

'''
Libraries Page Tests
'''
def test_libraries_title():
    print("starting test_libraries_title")
    driver.get(url + 'Libraries')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[6]/div[1]/h1")
    assert title.text == "Libraries"

def test_libraries_items():
    print("starting test_libraries_items")
    driver.get(url + 'Libraries')
    count = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]")
    assert "Showing " in count.text
    assert "items" in count.text

def test_libraries_search_sort_filter():
    print("starting test_libraries_search_sort_filter")
    driver.get(url + 'Libraries')
    assert "Search" in driver.page_source
    assert "State Filter" in driver.page_source
    assert "City Filter" in driver.page_source
    assert "Zip Code Filter" in driver.page_source
    assert "Rating" in driver.page_source
    assert "Sort" in driver.page_source

def test_libraries_sort():
    print("starting test_libraries_sort")
    driver.get(url + 'Libraries')
    sort = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/div[1]/div/div")
    sort.click()

    options = driver.find_elements(By.CLASS_NAME, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1km1ehz")
    assert options[0].text == "Name"
    options[0].click()
    assert driver.current_url == url + "Libraries?ascending=true&sortBy=name"

'''
Universities Page Tests
'''
def test_universities_title():
    print("starting test_coffeeshops_title")
    driver.get(url + 'Universities')
    title = driver.find_element(By.XPATH, "/html/body/div/div/div[6]/div[1]/h1")
    assert title.text == "Universities"

def test_universities_items():
    print("starting test_universities_items")
    driver.get(url + 'Universities')
    count = driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[2]")
    assert "Showing " in count.text
    assert "items" in count.text

def test_universities_search_sort_filter():
    print("starting test_universities_search_sort_filter")
    driver.get(url + 'Universities')
    assert "Search" in driver.page_source
    assert "State Filter" in driver.page_source
    assert "City Filter" in driver.page_source
    assert "Zip Code Filter" in driver.page_source
    assert "Undergrad Population" in driver.page_source
    assert "Average SAT" in driver.page_source
    assert "In-State Tuition" in driver.page_source
    assert "Out-of-State Tuition" in driver.page_source
    assert "Sort" in driver.page_source

def test_universities_sort():
    print("starting test_universities_sort")
    driver.get(url + 'Universities')
    sort = driver.find_element(By.XPATH, "/html/body/div/div/div[5]/div[1]/div/div")
    sort.click()

    options = driver.find_elements(By.CLASS_NAME, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters css-1km1ehz")
    assert options[0].text == "Name"
    options[0].click()
    assert driver.current_url == url + "Universities?ascending=true&sortBy=name"