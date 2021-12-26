from mentor_app import db

class MentorReview(db.Model):
    mentor_review_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer)
    course_id = db.Column(db.Integer)
    mentor_id = db.Column(db.Integer)
    review = db.Column(db.String)
    stars = db.Column(db.Integer)
    date = db.Column(db.Date)

    def to_dict(self):
        return dict(
            mentor_review_id=self.mentor_review_id,
            student_id=self.student_id,
            course_id=self.course_id,
            mentor_id=self.mentor_id,
            review=self.review,
            stars=self.stars,
            date=self.date
        )
