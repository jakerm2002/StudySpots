from flask import Flask, request, Blueprint
from endpoints.universities import universities
from endpoints.coffeeshops import coffeeshops
from endpoints.libraries import libraries
from endpoints.search import search
from database.database_object import app, db, ma

app.register_blueprint(universities)
app.register_blueprint(coffeeshops)
app.register_blueprint(libraries)
app.register_blueprint(search)


@app.route("/")
def home():
    return "Welcome to the Study Spots API!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
    # app.run()
