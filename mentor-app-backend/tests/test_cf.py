from loguru import logger
import pytest
from collaborative_filtering.collaborative_filtering import calculate_predictions, make_similarity_matrix, get_unrated_items, \
    get_best_predicted_item_for_users
from collaborative_filtering.recommend_item import recommend_item_to_user
from collaborative_filtering.similiarity import pearson_similarity

def test_unrated_items():
    feedback_matrix = [[5, 4, 1, 0, 0], [3, 1, 2, 3, 3], [4, 3, 4, 3, 5], [3, 3, 1, 5, 4]]
    assert get_unrated_items(0, feedback_matrix) == [3, 4]

def test_pearson_similarity():
    full_ratings_4x4 = [[5, 4, 1, 4], [3, 1, 2, 3], [4, 3, 4, 3], [3, 3, 1, 5]]
    similarity = make_similarity_matrix(full_ratings_4x4, pearson_similarity)
    assert similarity == [
        [1, 0.30151134457776363, -0.3333333333333333, 0.7071067811865475],
        [0.30151134457776363, 1, 0.30151134457776363, 0.42640143271122083],
        [-0.3333333333333333, 0.30151134457776363, 1, -0.7071067811865475],
        [0.7071067811865475, 0.42640143271122083, -0.7071067811865475, 1]
    ]

    # get_best_predicted_item_for_user

    # prediction = predict_weighted_sum(
    #     user_index=0,
    #     item_index=4,
    #     similarity=similarities,
    #     ratings=full_ratings_matrix,
    #     original_ratings=matrix
    # )

    full_ratings_4x3 = [[5, 4, 1], [3, 1, 2], [4, 3, 4], [3, 3, 1]]
    similarity = make_similarity_matrix(full_ratings_4x3, pearson_similarity)
    assert similarity == [
        [1, 0.24019223070763066, -0.2773500981126145, 0.9707253433941508],
        [0.24019223070763066, 1, 0.8660254037844385, 0.0],
        [-0.2773500981126145, 0.8660254037844385, 1, -0.5000000000000001],
        [0.9707253433941508, 0.0, -0.5000000000000001, 1]
    ]

    full_ratings_4x2 = [[5, 4], [3, 1], [4, 3], [3, 3]]
    with pytest.raises(ZeroDivisionError):
        make_similarity_matrix(full_ratings_4x2, pearson_similarity)

def test_pearson_predictions():
    feedback_matrix = [[5, 4, 1, 4, 0], [3, 1, 2, 3, 3], [4, 3, 4, 3, 5], [3, 3, 1, 5, 4]]
    full_ratings_matrix = [[5, 4, 1, 4], [3, 1, 2, 3], [4, 3, 4, 3], [3, 3, 1, 5]]
    similarities = [
        [1, 0.30151134457776363, -0.3333333333333333, 0.7071067811865475],
        [0.30151134457776363, 1, 0.30151134457776363, 0.42640143271122083],
        [-0.3333333333333333, 0.30151134457776363, 1, -0.7071067811865475],
        [0.7071067811865475, 0.42640143271122083, -0.7071067811865475, 1]
    ]

    predictions = get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix)
    assert predictions == {0: (4, 3.8228434878793527)}

def test_pearson_predictions_2_users():
    feedback_matrix = [[5, 4, 1, 0, 0], [3, 1, 2, 0, 3], [4, 3, 4, 3, 5], [3, 3, 1, 5, 4]]
    full_ratings_matrix = [[5, 4, 1], [3, 1, 2], [4, 3, 4], [3, 3, 1]]
    similarities = make_similarity_matrix(full_ratings_matrix, pearson_similarity)
    assert similarities == [
        [1, 0.24019223070763066, -0.2773500981126145, 0.9707253433941508],
        [0.24019223070763066, 1, 0.8660254037844385, 0.0],
        [-0.2773500981126145, 0.8660254037844385, 1, -0.5000000000000001],
        [0.9707253433941508, 0.0, -0.5000000000000001, 1]
    ]

    predictions = get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix)
    assert predictions == {0: (3, 4.874129093748495), 1: (3, 0.7543219387857802)}

def test_example():
    users = [("Alice", ["Math", "Biology"]),
             ("U1", ["Math"]),
             ("U2", ["Biology", "Painting", "Math"]),
             ("U3", ["Biology", "Painting", "Math"])]

    ratings = [
        ("Alice", [("I1", 5), ("I2", 4), ("I3", 1), ("I4", 4)]),
        ("U1", [("I1", 3), ("I2", 1), ("I3", 2), ("I4", 3), ("I5", 3)]),
        ("U2", [("I1", 4), ("I2", 3), ("I3", 4), ("I4", 3), ("I5", 5)]),
        ("U3", [("I1", 3), ("I2", 3), ("I3", 1), ("I4", 5), ("I5", 4)]),
    ]

    books = [("Math", ["I1", "I2", "I3", "I4", "I5"]),
             ("Biology", ["B1", "B2", "B3", "B4"]),
             ("Painting", ["P1", "P2", "P3"])]

    calculate_predictions(users, books, ratings, "Math")

def test_recommend_book():
    users = [("Alice", ["Math", "Biology"]),
             ("U1", ["Math"]),
             ("U2", ["Biology", "Painting", "Math"]),
             ("U3", ["Biology", "Painting", "Math"])]

    ratings = [
        ("Alice", [("I1", 5), ("I2", 4), ("I3", 1), ("I4", 4)]),
        ("U1", [("I1", 3), ("I2", 1), ("I3", 2), ("I4", 3), ("I5", 3)]),
        ("U2", [("I1", 4), ("I2", 3), ("I3", 4), ("I4", 3), ("I5", 5)]),
        ("U3", [("I1", 3), ("I2", 3), ("I3", 1), ("I4", 5), ("I5", 4)]),
    ]

    books = [("Math", ["I1", "I2", "I3", "I4", "I5"]),
             ("Biology", ["B1", "B2", "B3", "B4"]),
             ("Painting", ["P1", "P2", "P3"])]

    predictions = calculate_predictions(users, books, ratings, "Math")
    # for key in predictions:
    #     prediction = predictions[key]
    #     recommended_book = recommend_item_to_user(key, prediction[0], prediction[1], "Math")
    #     logger.debug(f'{recommended_book=}')

