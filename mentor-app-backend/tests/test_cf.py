import pytest
from collaborative_filtering.collaborative_filtering import get_similarity, make_similarity_matrix
from collaborative_filtering.similiarity import pearson_similarity

def test_pearson():
    full_ratings_4x4 = [[5, 4, 1, 4], [3, 1, 2, 3], [4, 3, 4, 3], [3, 3, 1, 5]]
    similarity = make_similarity_matrix(full_ratings_4x4, pearson_similarity)
    assert similarity == [
        [1, 0.30151134457776363, -0.3333333333333333, 0.7071067811865475],
        [0.30151134457776363, 1, 0.30151134457776363, 0.42640143271122083],
        [-0.3333333333333333, 0.30151134457776363, 1, -0.7071067811865475],
        [0.7071067811865475, 0.42640143271122083, -0.7071067811865475, 1]
    ]

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

    get_similarity(users, books, ratings, "Math")


