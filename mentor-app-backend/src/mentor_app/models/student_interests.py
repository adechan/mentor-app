from mentor_app import db

class StudentInterests(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer)

    def to_dict(self):
        return dict(
            student_id=self.student_id,
            course_id=self.course_id
        )
