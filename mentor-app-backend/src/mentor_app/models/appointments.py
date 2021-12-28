def define_appointments_table(db):
    class Appointment(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        student_id = db.Column(db.Integer)
        course_id = db.Column(db.Integer)
        mentor_id = db.Column(db.Integer)
        available_hours_id = db.Column(db.Integer)
        status = db.Column(db.String, default='Pending')

        def to_dict(self):
            return dict(
                id=self.id,
                student_id=self.student_id,
                course_id=self.course_id,
                mentor_id=self.mentor_id,
                status=self.status,
                available_hours_id=self.available_hours_id
            )

    return Appointment
