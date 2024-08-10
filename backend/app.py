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




@app.route('/')
def index():
    activities = Activities.query.all()
    return render_template('viewactivities.html', activities=activities)

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

if __name__ == '__main__':
    app.run(debug=True)
