from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:POSTGRES@localhost:5500/dummy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class AddMember(db.Model):
    __tablename__ = 'members'
    member_id = db.Column(db.Integer)
    council_id = db.Column(db.Integer)
    year = db.Column(db.Integer)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    designation = db.Column(db.String(80), nullable=False)
    branch = db.Column(db.String(80), nullable=False)
    academic_year = db.Column(db.Enum('First', 'Second', 'Third', 'Fourth', name='academic_year'), nullable=False)
    roll_number = db.Column(db.String(80), nullable=False, primary_key=True)
    email = db.Column(db.String(80), nullable=False)
    contact = db.Column(db.String(15), nullable=False)

class Activities(db.Model):
    __tablename__ = 'activities'
    activity_id = db.Column(db.Integer, primary_key=True)
    name_of_activity = db.Column(db.String(255), nullable=False)
    council_id = db.Column(db.Integer)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    venue = db.Column(db.String(255))
    no_of_hours = db.Column(db.Integer)
    no_of_participants = db.Column(db.Integer)
    objectives = db.Column(db.String(255))

class Certificates(db.Model):
    __tablename__ = 'certificates'
    certificate_id = db.Column(db.Integer, primary_key=True)
    name_of_certificate = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    date_of_issue = db.Column(db.Date)
    issued_by = db.Column(db.String(255))
    tenure = db.Column(db.Enum('First', 'Second', 'Third', 'Fourth', name='tenure'), nullable=False)
    type = db.Column(db.Enum('Individual', 'Team', name='certificate_type'))
    level = db.Column(db.Enum('Inter college', 'Intra college', 'Regional', 'State', 'National', 'International', name='certificate_level'))
    certificate_description = db.Column(db.String(255))

@app.route('/')
def index():
    certificates = Certificates.query.all()
    return render_template('viewcertificate.html', certificates=certificates)

@app.route('/api/members', methods=['GET'])
def get_members():
    members = AddMember.query.all()
    members_data = [{
        'firstName': member.first_name,
        'lastName': member.last_name,
        'designation': member.designation,
        'branch': member.branch,
        'year': member.academic_year,
        'rollNo': member.roll_number,
        'email': member.email,
        'contact': member.contact
    } for member in members]
    return jsonify(members_data)

@app.route('/viewactivities')
def view_activities():
    activities = Activities.query.all()
    return render_template('viewactivities.html', activities=activities)

@app.route('/api/activities', methods=['GET'])
def get_activities():
    activities = Activities.query.all()
    activities_list = [
        {
            "activity_id": activity.activity_id,  # Corrected to match the model field
            "council_id": activity.council_id,
            "start_date": activity.start_date.strftime("%Y-%m-%d") if activity.start_date else None,
            "end_date": activity.end_date.strftime("%Y-%m-%d") if activity.end_date else None,
            "venue": activity.venue,
            "no_of_hours": activity.no_of_hours,
            "no_of_participants": activity.no_of_participants,
            "objectives": activity.objectives,
            "name_of_activity": activity.name_of_activity
        }
        for activity in activities
    ]
    return jsonify(activities_list)

@app.route('/api/certificates', methods=['GET'])
def get_certificates():
    certificates = Certificates.query.all()
    certificates_list = [
        {
            "certificate_id": certificate.certificate_id,
            "name_of_certificate": certificate.name_of_certificate,  # Corrected key name
            "start_date": certificate.start_date.strftime("%Y-%m-%d") if certificate.start_date else None,
            "end_date": certificate.end_date.strftime("%Y-%m-%d") if certificate.end_date else None,
            "date_of_issue": certificate.date_of_issue.strftime("%Y-%m-%d") if certificate.date_of_issue else None,
            "issued_by": certificate.issued_by,
            "tenure": certificate.tenure,
            "certificate_type": certificate.type,
            "certificate_level": certificate.level,
            "certificate_description": certificate.certificate_description  # Corrected key name
        }
        for certificate in certificates
    ]
    return jsonify(certificates_list)

@app.route('/viewcertificates')
def view_certificates():
    certificates = Certificates.query.all()
    return render_template('viewcertificate.html', certificates=certificates)

if __name__ == '__main__':
    app.run(debug=True)
