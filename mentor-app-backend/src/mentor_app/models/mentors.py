def define_mentors_table(db):
    class Mentor(db.Model):
        mentor_id = db.Column(db.Integer, primary_key=True)
        profile_image = db.Column(db.String)
        mentor_email = db.Column(db.String)
        country = db.Column(db.String)
        city = db.Column(db.String)
        username = db.Column(db.String)
        statement = db.Column(db.String)
        quote = db.Column(db.String)
        hobbies = db.Column(db.String)

        def to_dict(self):
            return dict(
                mentor_id=self.mentor_id,
                profile_image=self.profile_image,
                mentor_email=self.mentor_email,
                country=self.country,
                city=self.city,
                username=self.username,
                statement=self.statement,
                quote=self.quote,
                hobbies=self.hobbies
            )

    return Mentor