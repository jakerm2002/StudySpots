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
    assert driver.title == "Study Spots"
