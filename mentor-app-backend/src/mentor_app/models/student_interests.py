
def define_student_interests_table(db):
    class StudentInterests(db.Model):
        student_interest_id = db.Column(db.Integer, primary_key=True)
        student_id = db.Column(db.Integer)
        course_id = db.Column(db.Integer)

        def to_dict(self):
            return dict(
                student_interest_id=self.student_interest_id,
                student_id=self.student_id,
                course_id=self.course_id
            )

        def __str__(self):
            return f'<StudentInterests {self.student_id=} {self.course_id=}>'

    return StudentInterests