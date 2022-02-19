import pytest
from recommender.collaborative_filtering.collaborative_filtering import calculate_predictions, make_similarity_matrix, \
    get_unrated_items, get_best_predicted_item_for_users
from recommender.collaborative_filtering.similiarity import pearson_similarity

def test_unrated_items():
    feedback_matrix = [[1, 3, 1, 0, 0], [2, 1, 2, 4, 3], [4, 1, 2, 5, 1], [4, 2, 1, 1, 4]]
    assert get_unrated_items(0, feedback_matrix) == [3, 4]

def test_pearson_similarity():
    full_ratings_4x4 = [
        [1, 3, 1, 5, 0],
        [2, 1, 2, 4, 5],
        [4, 1, 2, 5, 4],
        [4, 2, 1, 1, 1]
    ]

    no_zero_matrix = [
        [1, 3, 1, 5],
        [2, 1, 2, 4],
        [4, 1, 2, 5],
        [4, 2, 1, 1]
    ]

    similarity = make_similarity_matrix(full_ratings_4x4, pearson_similarity)
    assert similarity == [
        [1, -0.07607257743127306, 0.15214515486254612, -0.19174124721184263],
        [-0.07607257743127306, 1, 0.7592592592592592, -0.49009802940980335],
        [0.15214515486254612, 0.7592592592592592, 1, 0.023338001400466872],
        [-0.19174124721184263, -0.49009802940980335, 0.023338001400466872, 1]
    ]


    predictions = get_best_predicted_item_for_users(similarity, no_zero_matrix, full_ratings_4x4)
    assert predictions == {0: (4, 2.820714214271425)}


    full_ratings_4x3 = [[5, 4, 1], [3, 1, 2], [4, 3, 4], [3, 3, 1]]
    similarity = make_similarity_matrix(full_ratings_4x3, pearson_similarity)
    assert similarity == [
        [1, 0.24019223070763066, -0.2773500981126145, 0.9707253433941508],
        [0.24019223070763066, 1, 0.8660254037844385, 0.0],
        [-0.2773500981126145, 0.8660254037844385, 1, -0.5000000000000001],
        [0.9707253433941508, 0.0, -0.5000000000000001, 1]
    ]

    full_ratings_4x2 = [[3, 2], [1, 1], [1, 3], [3, 3]]
    with pytest.raises(ZeroDivisionError):
        make_similarity_matrix(full_ratings_4x2, pearson_similarity)

def test_pearson_predictions():
    feedback_matrix = [[3, 1, 2, 5, 0], [4, 2, 3, 4, 5], [1, 3, 3, 4, 5], [3, 2, 2, 4, 1]]

    full_ratings_matrix = [[3, 1, 2, 5], [4, 2, 3, 4], [1, 3, 3, 4], [3, 2, 2, 4]]
    similarities = [
        [1, 0.04559607525875531, -0.28039985489311264, 0.9803156180632393],
        [0.04559607525875531, 1, 0.35478743759344955, -0.03846153846153844],
        [-0.28039985489311264, 0.35478743759344955, 1, -0.35478743759344955],
        [0.9803156180632393, -0.03846153846153844, -0.35478743759344955, 1]
    ]

    predictions = get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix)

    assert predictions == {0: (4, 1.014840514872257)}

def test_pearson_predictions_2_users():
    feedback_matrix = [[3, 2, 1, 0, 0], [2, 1, 3, 0, 5], [1, 2, 3, 4, 5], [3, 2, 2, 3, 5]]
    full_ratings_matrix = [[3, 2, 1], [2, 1, 3], [1, 2, 3], [3, 2, 2]]
    similarities = make_similarity_matrix(full_ratings_matrix, pearson_similarity)

    assert similarities == [
        [1, -0.4999999999999999, -0.9999999999999998, 0.8660254037844385],
        [-0.4999999999999999, 1, 0.4999999999999999, 0.0],
        [-0.9999999999999998, 0.4999999999999999, 1, -0.8660254037844385],
        [0.8660254037844385, 0.0, -0.8660254037844385, 1]
    ]

    predictions = get_best_predicted_item_for_users(similarities, full_ratings_matrix, feedback_matrix)

    assert predictions == {0: (3, 1.8213672050459182), 1: (3, 4.0)}

def test_example():
    users = [("Alice", ["Math", "Biology"]),
             ("U1", ["Math"]),
             ("U2", ["Biology", "Painting", "Math"]),
             ("U3", ["Biology", "Painting", "Math"])]

    ratings = [
        ("Alice", [("I1", 3), ("I2", 5), ("I3", 2), ("I4", 3)]),
        ("U1", [("I1", 4), ("I2", 3), ("I3", 2), ("I4", 3), ("I5", 4)]),
        ("U2", [("I1", 3), ("I2", 4), ("I3", 3), ("I4", 3), ("I5", 1)]),
        ("U3", [("I1", 2), ("I2", 1), ("I3", 1), ("I4", 2), ("I5", 1)]),
    ]

    books = [("Math", ["I1", "I2", "I3", "I4", "I5"]),
             ("Biology", ["B1", "B2", "B3", "B4"]),
             ("Painting", ["P1", "P2", "P3"])]

    calculate_predictions(users, books, ratings, "Math")

