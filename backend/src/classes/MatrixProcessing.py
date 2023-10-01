import numpy as np
import random


class MatrixProcessing(object):
    Matrix = np.zeros((10, 10))   # Создать нулевую матрицу размером 10x10


    def __init__(self,amount_lines,amount_columns):
        self.Matrix = np.zeros((amount_lines,amount_columns))
        pass

    def __ship_random_place__ (self, ships_size, amount_ships, matrix_for_place):
        copy_matrix = matrix_for_place
        while (amount_ships!=0):
            print(amount_ships)
            copy_matrix = np.transpose(copy_matrix[::-1])
            for k in range(0,amount_ships):

                check_place = True
                i = random.randint(0,9)
                j = random.randint(0,9)
                if (j+ships_size<=9):
                    for l in range (j,j+ships_size):
                        if copy_matrix[i, l] in (6, 8):
                            check_place = False
                            break
                    if check_place == True:
                        amount_ships = amount_ships - 1
                        if (j-1 != -1):
                            copy_matrix[i,j-1] = 6
                            if ((i-1) !=-1):
                                copy_matrix[i-1,j-1] = 6
                            if ((i+1) != 10):
                                copy_matrix[i+1,j-1] = 6

                        if (j+ships_size != 10):
                            copy_matrix[i,j+ships_size] = 6
                            if (i-1 !=-1):
                                copy_matrix[i-1,j+ships_size] = 6
                            if (i+1 != 10):
                                copy_matrix[i+1,j+ships_size] = 6


                        for l in range(j,j+ships_size):
                            copy_matrix[i,l] = 8
                            if (i-1 !=-1):
                                copy_matrix[i-1,l] = 6
                            if (i+1 != 10):
                                copy_matrix[i+1,l] = 6

                    else:
                        break
        return copy_matrix


    def random_place(self,amount_ship_types):
        matrix_for_place = self.Matrix.copy()
        x = amount_ship_types - 1
        for i in range (amount_ship_types,0,-1):
            matrix_for_place = self.__ship_random_place__ (i, amount_ship_types-x, matrix_for_place)
            x = x - 1
        print(self.Matrix.copy())
        return matrix_for_place
        pass


    def hide_ships(self):
        self.Matrix.copy()[self.Matrix.copy() == 8] = 1
# 8 - кораблик
    def end_of_game(self):
        result = np.any(self.Matrix.copy() == 8)
        return result

#tests
a = MatrixProcessing(15,17)
z = a.random_place(4)
print (z)
