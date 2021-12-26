from mentor_app import db

class MentorCourses(db.Model):
    mentor_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer)
    price = db.Column(db.Float)

    def to_dict(self):
        return dict(
            mentor_id=self.mentor_id,
            course_id=self.course_id,
            price=self.price
        )
