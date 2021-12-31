def define_mentor_courses_table(db):
    class MentorCourses(db.Model):
        mentor_course_id = db.Column(db.Integer, primary_key=True)
        mentor_id = db.Column(db.Integer)
        course_id = db.Column(db.Integer)
        price = db.Column(db.Float)

        def to_dict(self):
            return dict(
                mentor_course_id=self.mentor_course_id,
                mentor_id=self.mentor_id,
                course_id=self.course_id,
                price=self.price
            )

    return MentorCourses