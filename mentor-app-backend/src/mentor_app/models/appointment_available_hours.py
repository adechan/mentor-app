from mentor_app import db

# Example:
#   Course 1, Mentor 1, Mondays, 8:00-9:00 (1, 1, 0, 0)
#   Course 1, Mentor 1, Mondays, 9:00-10:00 (1, 1, 0, 1)
#   Course 1, Mentor 1, Tuesdays, 10:00-11:00 (1, 1, 1, 2)

class AppointmentAvailableHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer)
    mentor_id = db.Column(db.Integer)
    day = db.Column(db.Integer)
    hours = db.Column(db.Integer)
    available = db.Column(db.Boolean)

    def to_dict(self):
        return dict(
            id=self.id,
            course_id=self.course_id,
            mentor_id=self.mentor_id,
            day=self.day,
            hours=self.hours,
            available=self.available
        )
