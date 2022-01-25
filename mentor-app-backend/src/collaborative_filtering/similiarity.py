from .math import covariance, standard_deviation

def pearson_similarity(values1: list, values2: list) -> float:
    return covariance(values1, values2) / (standard_deviation(values1) * standard_deviation(values2))

def cosine_similiarity(X, Y):
    pass