import math

from loguru import logger

from collaborative_filtering.similiarity import mean


def predict_weighted_sum(user_index, item_index, ratings, similarity, original_ratings):
    user_average = mean(ratings[user_index])

    sum = 0
    for i in range(len(ratings)):
        if user_index == i:
            continue

        similarity_between_2_users = similarity[user_index][i]
        rating_deviation = original_ratings[i][item_index] - mean(ratings[i])
        logger.trace(f'{rating_deviation=}')

        sum += similarity_between_2_users * rating_deviation

    similarities_sum = 0
    for i in range(len(ratings)):
        if i == user_index:
            continue

        value = math.fabs(similarity[user_index][i])
        logger.trace(f'normalizer {i}: {value}')
        similarities_sum += math.fabs(similarity[user_index][i])

    prediction = user_average + sum / similarities_sum

    return prediction
