def define_student_award_table(db):
    class StudentAward(db.Model):
        student_award_id = db.Column(db.Integer, primary_key=True)
        student_id = db.Column(db.Integer)
        mentor_id = db.Column(db.Integer)
        course_id = db.Column(db.Integer)
        awarded = db.Column(db.Boolean)
        date = db.Column(db.Date)

        def to_dict(self):
            return dict(
                student_award_id=self.student_award_id,
                student_id=self.student_id,
                mentor_id=self.mentor_id,
                course_id=self.course_id,
                awarded=self.awarded,
                date=self.date
            )

    return StudentAward
