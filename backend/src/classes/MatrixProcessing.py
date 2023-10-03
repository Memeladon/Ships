import numpy as np
import random


class MatrixProcessing(object):
    matrix = np.zeros((10, 10))   # Создать нулевую матрицу размером 10x10
    hidden_war_place = matrix

#либо сгенереную матрицу, либо None + количество строк + количество столбцов(размеры) матрицы для рандом расстановки
    def __init__(self,given_matrix = None,amount_rows=None, amount_columns = None):

        if given_matrix is None:
            if (amount_rows == None or amount_columns == None):
                print ("Или передайте матрицу или количество строк + количество столбцов")
                exit(1)
            self.matrix = np.zeros((amount_rows,amount_columns))
            self.hidden_war_place = self.matrix

        else:
            num_rows = len (given_matrix)
            num_columns = len(given_matrix[0])
            self.matrix = given_matrix
            self.hidden_war_place = np.zeros((num_rows,num_columns))



#Нужен для расстановки кораблей "по правилам" (метод random_place)
    def __ship_random_place__ (self, ships_size, amount_ships, matrix_for_place):
        copy_matrix = matrix_for_place
        while (amount_ships!=0):
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

#Случайно расставляет корабли "по правилам"
    def random_place(self,amount_ship_types):

        is_zero_matrix = np.all(self.matrix == 0)
        if is_zero_matrix == False:
            self.matrix.fill(0)

        matrix_for_place = self.matrix.copy()
        start_rows = len(matrix_for_place)
        x = amount_ship_types - 1
        for i in range (amount_ship_types,0,-1):
            matrix_for_place = self.__ship_random_place__ (i, amount_ship_types-x, matrix_for_place)
            x = x - 1

        if start_rows != len(matrix_for_place):
            matrix_for_place = np.transpose(matrix_for_place[::-1])
        copy_matrix_for_place = matrix_for_place.copy()
        copy_matrix_for_place[copy_matrix_for_place == 6] = 0
        self.matrix = copy_matrix_for_place
        return matrix_for_place


# 8 - кораблик
#False - игра не закончена(есть кораблики)
#True - конец игры (все корабли разбиты)
    def end_of_game(self):
        result = np.any(self.matrix.copy() == 8)
        if result:
            result = False
        else:
            result = True
        return result

    def get_matrix(self):
        return self.matrix

#tests
a = MatrixProcessing(None,15,10)
a.random_place(4)

#print (z)
print (a.get_matrix())

a.random_place(5)
mat = a.get_matrix()
print (mat)

b = MatrixProcessing(mat)
print (b.get_matrix())
