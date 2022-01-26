from loguru import logger

from collaborative_filtering.collaborative_filtering import calculate_predictions


def recommend_item_to_user(item, prediction, interest, db, api):
    unrecommended_books = db.session.query(api.Book, api.StudentRecommendedBooks) \
        .filter(api.Book.interest_id == interest) \
        .filter(api.StudentRecommendedBooks.book_id != api.Book.id) \
        .all()

    if prediction >= 3:
        return item

    if len(unrecommended_books) > 0:
        return unrecommended_books[0]

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

    return (user_id, user_ratings)

def get_ratings(db, api, users):
    all_ratings = []

    for user in users:
        user_ratings = get_rating_for_user(db, api, user[0])
        all_ratings.append(user_ratings)

    return all_ratings

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
    logger.debug(f'{predictions}=')
    # for key in predictions:
    #     prediction = predictions[key]
    #     recommended_book = recommend_item_to_user(key, prediction[0], prediction[1], "Math")
    #     logger.debug(f'{recommended_book=}')

#
# [(0, [1, 2])]
def wrap_elements(xs: list):
    result = {}
    for t in xs:
        if t[1] in result:
            result[t[1]].append(t[0])
        else:
            result[t[1]] = [t[0]]
    return [(k, v) for k, v in result.items()]
