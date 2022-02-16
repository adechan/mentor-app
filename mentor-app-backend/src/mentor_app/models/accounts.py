
def define_account_table(db):
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
                id=self.account_id,
                mentor_id=self.mentor_id,
                student_id=self.student_id,
                first_name=self.first_name,
                last_name=self.last_name,
                email=self.email,
                password=self.password,
            )

        def __str__(self):
            return f'<Account {self.account_id} | {self.first_name} {self.last_name} | {self.email}>'

    return Account
