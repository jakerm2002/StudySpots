from database.databases import db, ma
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import json
import os
from databases import reassign_ids


class University(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    alias = db.Column(db.String())
    zipcode = db.Column(db.String())
    city = db.Column(db.String())
    state = db.Column(db.String())
    url = db.Column(db.String())
    locale = db.Column(db.Integer)
    size = db.Column(db.Integer)
    enrollment_all = db.Column(db.Integer)
    enrollment_ugr_12m = db.Column(db.Integer)
    enrollment_gr_12m = db.Column(db.Integer)
    instate_tuition = db.Column(db.Float)
    outstate_tuition = db.Column(db.Float)
    acceptance_rate = db.Column(db.Float)
    carnegie_basic = db.Column(db.Integer)
    ownership = db.Column(db.Integer)
    institutional_characteristics = db.Column(db.Integer)
    sat_average = db.Column(db.Integer)
    sat_median_math = db.Column(db.Integer)
    sat_median_writing = db.Column(db.Integer)
    sat_median_reading = db.Column(db.Integer)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    description = db.Column(db.String)
    photo = db.Column(db.String)

    def __init__(
        self,
        id="NaN",
        name="NaN",
        alias="NaN",
        zipcode="NaN",
        city="NaN",
        state="NaN",
        url="NaN",
        locale=0,
        size=0,
        enrollment_all=0,
        enrollment_ugr_12m=0,
        enrollment_gr_12m=0,
        instate_tuition=0.0,
        outstate_tuition=0.0,
        acceptance_rate=0.0,
        carnegie_basic=0,
        ownership=0,
        institutional_characteristics=0,
        sat_average=0,
        sat_median_math=0,
        sat_median_writing=0,
        sat_median_reading=0,
        latitude=0.0,
        longitude=0.0,
        description="",
        photo="",
    ):
        self.id = id
        self.name = name
        self.alias = alias
        self.zipcode = zipcode
        self.city = city
        self.state = state
        self.url = url
        self.locale = locale
        self.size = size
        self.enrollment_all = enrollment_all
        self.enrollment_ugr_12m = enrollment_ugr_12m
        self.enrollment_gr_12m = enrollment_gr_12m
        self.instate_tuition = instate_tuition
        self.outstate_tuition = outstate_tuition
        self.acceptance_rate = acceptance_rate
        self.carnegie_basic = carnegie_basic
        self.ownership = ownership
        self.institutional_characteristics = institutional_characteristics
        self.sat_average = sat_average
        self.sat_median_math = sat_median_math
        self.sat_median_writing = sat_median_writing
        self.sat_median_reading = sat_median_reading
        self.latitude = latitude
        self.longitude = longitude
        self.description = description
        self.photo = photo


class UniversitySchema(ma.Schema):
    class Meta:  # for flask_marshmallow
        # Fields to expose
        fields = (
            "id",
            "name",
            "alias",
            "zipcode",
            "city",
            "state",
            "url",
            "locale",
            "size",
            "enrollment_all",
            "enrollment_ugr_12m",
            "enrollment_gr_12m",
            "instate_tuition",
            "outstate_tuition",
            "acceptance_rate",
            "carnegie_basic",
            "ownership",
            "institutional_characteristics",
            "sat_average",
            "sat_median_math",
            "sat_median_writing",
            "sat_median_reading",
            "latitude",
            "longitude",
            "description",
            "photo",
        )


university_schema = UniversitySchema()
universities_schema = UniversitySchema(many=True)


def populate_universities():
    file_path = os.path.join(os.getcwd(), "api_information/all_universities.json")
    file = open(file_path, "r")
    db.create_all()
    universities_json = json.load(file)
    dynamic_id_university = 0
    universities_list = []

    for university in universities_json:
        replace_id = dynamic_id_university
        dynamic_id_university += 1
        new_university = University(
            id=replace_id,
            name=university["latest.school.name"],
            alias=university["latest.school.alias"],
            zipcode=university["latest.school.zip"][:5],
            city=university["latest.school.city"],
            state=university["latest.school.state"],
            url=university["latest.school.school_url"],
            locale=university["latest.school.locale"],
            size=university["latest.student.size"],
            enrollment_all=university["latest.student.enrollment.all"],
            enrollment_ugr_12m=university[
                "latest.student.enrollment.undergrad_12_month"
            ],
            enrollment_gr_12m=university["latest.student.enrollment.grad_12_month"],
            instate_tuition=university["latest.cost.tuition.in_state"],
            outstate_tuition=university["latest.cost.tuition.out_of_state"],
            acceptance_rate=university["latest.admissions.admission_rate.overall"],
            carnegie_basic=university["latest.school.carnegie_basic"],
            ownership=university["latest.school.ownership"],
            institutional_characteristics=university[
                "latest.school.institutional_characteristics.level"
            ],
            sat_average=university["latest.admissions.sat_scores.average.overall"],
            sat_median_math=university["latest.admissions.sat_scores.midpoint.math"],
            sat_median_writing=university[
                "latest.admissions.sat_scores.midpoint.writing"
            ],
            sat_median_reading=university[
                "latest.admissions.sat_scores.midpoint.critical_reading"
            ],
            latitude=university["location.lat"],
            longitude=university["location.lon"],
            description=university["description"],
            photo=university["photo"],
        )
        universities_list.append(new_university)

    universities_list = reassign_ids(universities_list)

    db.session.add_all(universities_list)
    db.session.commit()

    file.close()
