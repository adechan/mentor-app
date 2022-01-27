import math

from loguru import logger


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

def transpose(matrix):
    logger.debug(f'{matrix=}')
    transposed_matrix = []
    rows = len(matrix)
    columns = len(matrix[0])

    for i in range(0, columns):
        new_row = []
        for j in range(0, rows):
            new_row.append(matrix[j][i])

        transposed_matrix.append(new_row)

    return transposed_matrix
