def define_books_table(db):
    class Book(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        image = db.Column(db.String)
        title = db.Column(db.String)
        author = db.Column(db.String)
        avg_rating = db.Column(db.Float)
        interest_id = db.Column(db.Integer)
        number_ratings = db.Column(db.Integer)

        def to_dict(self):
            return dict(
                id=self.id,
                image=self.image,
                title=self.title,
                author=self.author,
                interest_id=self.interest_id,
                avg_rating=self.avg_rating,
                number_ratings=self.avg_rating
            )

    return Book