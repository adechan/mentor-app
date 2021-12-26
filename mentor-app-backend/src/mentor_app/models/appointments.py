from mentor_app import db

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, )
    status = db.Column(db.String)
    available_hours_id = db.Column(db.Integer)

    def to_dict(self):
        return dict(
            id=self.id,
            student_id=self.student_id,
            status=self.status,
            available_hours_id=self.available_hours_id
        )

    # student_id = db.Column(db.Integer, db.ForeignKey())
    # id = db.Column(db.Integer, primary_key=True)
    # description = db.Column(db.String)
    # completed = db.Column(db.Boolean, default=False)
    # due_date = db.Column(db.Date)