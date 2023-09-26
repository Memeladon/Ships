import numpy as np


class MatrixProcessing(object):
    Matrix = np.zeros((10, 10))  # Создать нулевую матрицу размером 10x10

    def __init__(self):
        pass

    # 8 - кораблик
    def end_of_game(self):
        result = np.any(self.Matrix == 8)
        return result


# tests
a = MatrixProcessing()
b = a.end_of_game()
print(b)
