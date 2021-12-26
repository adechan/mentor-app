from mentor_app import db

class Account(db.Model):
    account_id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer)
    student_id = db.Column(db.Integer)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    def to_dict(self):
        return dict(
            id=self.id,
            status=self.status
        )
