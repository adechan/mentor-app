def define_courses_table(db):
    class Course(db.Model):
        course_id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String)

        def to_dict(self):
            return dict(
                course_id=self.course_id,
                title=self.title
            )

    return Course
