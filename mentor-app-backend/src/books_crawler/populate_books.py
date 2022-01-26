import json
import os

def get_books_from_directory(db, api):
    files = os.listdir("./crawled_books")

    interests_books = {}
    for file in files:
        interest = file.replace('-books.txt', '').replace('_', " ")
        interest_id = db.session.query(api.Course) \
            .filter(api.Course.title == interest) \
            .one().course_id

        with open(f'./crawled_books/{file}', 'r') as f:
            interests_books[interest_id] = json.loads(f.read())

    return interests_books

def populate_books_table(db, api):
    interests_books = get_books_from_directory(db, api)

    for key in interests_books:
        interest_books = interests_books[key]

        for interest_book in interest_books:
            to_add_book = api.Book(
                image=interest_book["image"],
                title=interest_book["book_name"],
                author=interest_book["author_name"],
                avg_rating=interest_book["avg_rating"],
                interest_id=key,
                number_ratings=interest_book["number_ratings"]
            )
            db.session.add(to_add_book)

    db.session.commit()
