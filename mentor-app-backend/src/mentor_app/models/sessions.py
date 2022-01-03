def define_sessions_table(db):
    class Session(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        account_id = db.Column(db.Integer)
        creation = db.Column(db.DateTime)
        user_agent = db.Column(db.String)

        def to_dict(self):
            return dict(
                id=self.id,
                account_id=self.account_id,
                creation=self.creation,
                user_agent=self.user_agent,
            )

        def __str__(self):
            return f'<Session {self.id} | {self.account_id} | {self.creation} | {self.user_agent}>'

    return Session
