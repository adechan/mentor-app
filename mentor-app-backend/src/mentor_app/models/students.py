from mentor_app import db

class Student(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    profile_image = db.Column(db.String)
    country = db.Column(db.String)
    city = db.Column(db.String)
    username = db.Column(db.String)
    statement = db.Column(db.String)

    def to_dict(self):
        return dict(
            student_id=self.student_id,
            profile_image=self.profile_image,
            country=self.country,
            city=self.city,
            username=self.username,
            statement=self.statement
        )
