import math


def mean(values: list) -> float:
    return sum(values) / len(values)

def covariance(values1: list, values2: list) -> float:
    avg1 = mean(values1)
    avg2 = mean(values2)

    return sum((x - avg1) * (y - avg2) for (x, y) in zip(values1, values2))

def variance(values: list) -> float:
    avg = mean(values)
    return sum((x - avg) ** 2 for x in values)

def standard_deviation(values: list) -> float:
    return math.sqrt(variance(values))

def pearson_similarity(values1: list, values2: list) -> float:
    return covariance(values1, values2) / (standard_deviation(values1) * standard_deviation(values2))

def cosine_similiarity(X, Y):
    pass