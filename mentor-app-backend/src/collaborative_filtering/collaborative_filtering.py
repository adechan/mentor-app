import math

users = [("User1", ["Math", "Biology"]),
         ("User2", ["Math"]),
         ("User3", ["Biology", "Painting", "Math"])]

ratings = [("User1", [("M1", 5), ("M2", 5)]),
           ("User2", [("M1", 5)]),
           ("User3", [("M1", 5), ("M2", 5), ("M3", 0)])]

books = [("Math", ["M1", "M2", "M3", "M4"]),
         ("Biology", ["B1", "B2", "B3", "B4"]),
         ("Painting", ["P1", "P2", "P3"])]

def get_user_interests(users):
    interests = []
    for user in users:
        user_interests = user[1]
        interests.extend(user_interests)

    return list(set(interests))

def get_users_with_same_interests(users, interest):
    users_with_same_interest = []
    for user in users:
        intersts = user[1]
        if interest in intersts:
            users_with_same_interest.append(user[0])

    return users_with_same_interest

def get_rating_for_given_book_and_user(user, book):
    for rating in ratings:
        if rating[0] == user:
            given_ratings = rating[1]

            for given_rating in given_ratings:

                if given_rating[0] == book:
                    return given_rating[1]
    return 0

def create_similarity_matrix(similar_users, books):
    matrix = []
    #       M1 M2 M3 M4
    # U1
    # U2
    # No rating = 0
    for user in similar_users:
        row = []
        for book in books:
            rating = get_rating_for_given_book_and_user(user, book)
            row.append(rating)

        matrix.append(row)

    return matrix

def get_books_within_interst(interest, books):
    books_within_interest = []
    for book in books:
        if book[0] == interest:
            books_within_interest.extend(book[1])

    return books_within_interest

def get_product_between_2_vectors(v1, v2):
    final_product = 0
    for i in range(0, len(v1)):
        prod = v1[i] * v2[i]
        final_product += prod

    return final_product

def get_length_of_vector(v):
    # 2 norm
    sum = 0
    for i in range(0, len(v)):
        sum += v[i] * v[i]

    return sum

def get_similarity_between_2_users(user1_ratings, user2_ratings):
    product_of_norms =  math.sqrt(get_length_of_vector(user1_ratings)) * math.sqrt(get_length_of_vector(user2_ratings))
    similarity = get_product_between_2_vectors(user1_ratings, user2_ratings) / product_of_norms

    return similarity

def get_best_similarity(user_ratings, matrix):
    best_similarity_for_user = 0
    index = 0
    for i in range(0, len(matrix)):
        if user_ratings == matrix[i]:
            continue

        similarity = get_similarity_between_2_users(user_ratings, matrix[i])

        if best_similarity_for_user < similarity:
            best_similarity_for_user = similarity
            index = i

    print(user_ratings)
    print(matrix[index])
    return similarity


def get_simmilarity():
    all_intersts = get_user_interests(users)

    for interest in all_intersts:
        if interest != "Math":
            continue

        users_with_same_intersts = get_users_with_same_interests(users, interest)
        books_within_interest = get_books_within_interst(interest, books)
        matrix = create_similarity_matrix(users_with_same_intersts, books_within_interest)

        for i in range(0, len(matrix)):
            print(get_best_similarity(matrix[i], matrix))


get_simmilarity()

