def define_student_recommended_books_table(db):
    class StudentRecommendedBooks(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        student_id = db.Column(db.Integer)
        book_id = db.Column(db.Integer)
        rating = db.Column(db.Float)

        def to_dict(self):
            return dict(
                id=self.id,
                student_id=self.student_id,
                book_id=self.book_id,
                rating=self.rating,
            )

    return StudentRecommendedBooks
