import itertools
from typing import Dict, Tuple
from loguru import logger

from .errors import CannotMakeCFPrediction
from .math import transpose
from .predictions import predict_weighted_sum
from .similiarity import pearson_similarity


def get_books_within_given_interest(interest, books):
    books_within_interest = []
    for book in books:
        if book[0] == interest:
            books_within_interest.extend(book[1])

    return books_within_interest

def get_all_possible_interests_for_all_users(users):
    interests = []
    for user in users:
        user_interests = user[1]
        interests.extend(user_interests)

    return list(set(interests))

def get_users_that_have_same_interest(users, interest):
    users_with_same_interest = []
    for user in users:
        intersts = user[1]
        if interest in intersts:
            users_with_same_interest.append(user[0])

    return users_with_same_interest

def get_rating_for_given_book_and_user(user, book, ratings):
    for rating in ratings:
        if rating[0] == user:
            given_ratings = rating[1]

            for given_rating in given_ratings:

                if given_rating[0] == book:
                    return given_rating[1]
    return 0

def create_ranking_table_for_given_books(similar_users, books, ratings):
    matrix = []

    for user in similar_users:
        row = []
        for book in books:
            rating = get_rating_for_given_book_and_user(user, book, ratings)
            row.append(rating)

        matrix.append(row)

    return matrix


def get_full_ratings_matrix(matrix):
    new_matrix = []
    for col in transpose(matrix):
        if 0 not in col:
            new_matrix.append(col)

    return transpose(new_matrix)

def make_similarity_matrix(full_ratings_matrix, similarity_fn):
    num_rows = len(full_ratings_matrix)

    similarities = [[1] * num_rows for _ in range(num_rows)]
    user_combinations = list(itertools.combinations(range(len(full_ratings_matrix)), 2))
    logger.trace(f'{list(user_combinations)=}')
    for i, j in user_combinations:
        ui = full_ratings_matrix[i]
        uj = full_ratings_matrix[j]
        logger.trace(f"calculate similarity between {i} {j}: {ui} {uj}")
        similarity = similarity_fn(full_ratings_matrix[i], full_ratings_matrix[j])
        logger.trace(f'{similarity=}')
        similarities[i][j] = similarity
        similarities[j][i] = similarity
    logger.trace(f'{similarities=}')

    return similarities

def make_feedback_matrix(users, books, ratings, interest):
    users_with_same_interests = get_users_that_have_same_interest(users, interest)
    books_within_interest = get_books_within_given_interest(interest, books)
    matrix = create_ranking_table_for_given_books(users_with_same_interests, books_within_interest, ratings)

    return matrix

def get_unrated_items(user: int, feedback_matrix):
    unrated_columns = []
    for j in range(len(feedback_matrix[0])):
        if feedback_matrix[user][j] == 0:
            unrated_columns.append(j)

    return unrated_columns

def get_best_predicted_item_for_user(user, unrated_items, similarities, full_ratings_matrix, feedback_matrix) \
        -> Tuple[int, float]:
    predictions: Dict[int, float] = {}
    try:
        for index in unrated_items:
            prediction = predict_weighted_sum(
                user_index=user,
                item_index=index,
                similarity=similarities,
                ratings=full_ratings_matrix,
                original_ratings=feedback_matrix
            )
            predictions[index] = prediction
    except ZeroDivisionError as e:
        raise CannotMakeCFPrediction(str(e))

    # m = max(predictions, key=lambda x: predictions[x])
    logger.trace(f'{user=} {predictions=}')
    prediction, item = 0, 0
    for key in predictions:
        if predictions[key] > prediction:
            prediction = predictions[key]
            item = key

    return item, prediction

def get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix):
    predictions = {}

    for user in range(len(similarities)):
        unrated_items = get_unrated_items(user, feedback_matrix)
        if len(unrated_items) == 0:
            continue

        item, prediction = get_best_predicted_item_for_user(
            user, unrated_items, similarities, full_ratings_matrix, feedback_matrix
        )

        predictions[user] = (item, prediction)

    logger.trace(f'{predictions=}')
    return predictions

def get_similarity(users, books, ratings, interest, similarity_fn=pearson_similarity):
    feedback_matrix = make_feedback_matrix(users, books, ratings, interest)
    logger.trace(f'{feedback_matrix=}')

    full_ratings_matrix = get_full_ratings_matrix(feedback_matrix)
    logger.trace(f'{full_ratings_matrix=}')

    similarities = make_similarity_matrix(full_ratings_matrix, similarity_fn)
    predictions = get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix)
    logger.debug(f'{predictions=}')

# get_similarity(users, books, ratings)
