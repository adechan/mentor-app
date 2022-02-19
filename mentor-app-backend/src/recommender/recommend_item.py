from loguru import logger

from .collaborative_filtering.collaborative_filtering import calculate_predictions

def recommend_item_to_user(item, prediction, interest, books, db, api):
    unrecommended_books = db.session.query(api.Book, api.StudentRecommendedBooks) \
        .filter(api.Book.interest_id == interest) \
        .filter(api.StudentRecommendedBooks.book_id != api.Book.id) \
        .all()

    if prediction >= 3:
        return books[item]

    if len(unrecommended_books) > 0:
        return unrecommended_books[0][0].id

    return None

def get_users(db, api):
    students = db.session.query(api.Student) \
        .all()

    users = []
    for student in students:
        interests_found = []
        interests = db.session.query(api.StudentInterests) \
            .filter(api.StudentInterests.student_id == student.student_id) \
            .all()

        for interest in interests:
            interests_found.append(interest.course_id)

        users.append((student.student_id, interests_found))

    return users

def get_rating_for_user(db, api, user_id):
    ratingRows = db.session.query(api.StudentRecommendedBooks) \
        .filter(api.StudentRecommendedBooks.student_id == user_id) \
        .all()

    user_ratings = []
    for ratingRow in ratingRows:
        user_ratings.append((ratingRow.book_id, ratingRow.rating))

    if len(user_ratings) > 0:
        return (user_id, user_ratings)

    return None

def get_ratings(db, api, users):
    all_ratings = []

    for user in users:
        user_ratings = get_rating_for_user(db, api, user[0])

        if user_ratings:
            all_ratings.append(user_ratings)

    return all_ratings

# [(0, [1, 2])]
def wrap_elements(xs: list):
    result = {}
    for t in xs:
        if t[1] in result:
            result[t[1]].append(t[0])
        else:
            result[t[1]] = [t[0]]

    return [(k, list(set(v))) for k, v in result.items()]


def books_that_are_rated_by_at_least_1_user(db, api):
    books = db.session.query(api.StudentRecommendedBooks.book_id, api.Book.interest_id) \
        .join(api.Book, api.StudentRecommendedBooks.book_id == api.Book.id) \
        .all()

    books_within_interests = wrap_elements(books)

    return books_within_interests

def recommend_book_to_users(db, api):
    users = get_users(db, api)
    all_ratings = get_ratings(db, api, users)
    books = books_that_are_rated_by_at_least_1_user(db, api)

    predictions = calculate_predictions(users, books, all_ratings, 5)

    for user in users:
        for key in predictions:
            if user[0] == key+1:
                prediction = predictions[key]
                interest_id = db.session.query(api.Book) \
                    .filter(api.Book.id == prediction[0]) \
                    .one().interest_id

                books_within_interest = books[interest_id][1]

                recommended_book = recommend_item_to_user(
                    prediction[0],
                    prediction[1],
                    interest_id,
                    books_within_interest,
                    db,
                    api
                )
            else:
                interests = db.session.query(api.StudentInterests) \
                    .filter(api.StudentInterests.student_id == user[0]) \
                    .all()

                interest = interests[0].course_id
                recommended_book = recommend_item_to_user(0, 0, interest, [], db, api)
            logger.debug(f'User={user[0]} got recommended book={recommended_book}')

            recommendation_to_add = api.StudentRecommendedBooks(
                student_id=user[0],
                book_id=recommended_book,
                rating=None
            )
            db.session.add(recommendation_to_add)

    db.session.commit()


