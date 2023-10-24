import numpy as np
import random


class MatrixProcessing(object):
    matrix = np.zeros((10, 10),dtype=np.int32)  # Создать нулевую матрицу размером 10x10
    hidden_war_place = matrix

    # либо сгенереную матрицу, либо None + количество строк + количество столбцов(размеры) матрицы для рандом
    # расстановки
    def __init__(self, given_matrix=None, amount_rows=None, amount_columns=None):

        if given_matrix is None:
            if amount_rows is None or amount_columns is None:
                print("Или передайте матрицу или количество строк + количество столбцов")
                exit(1)
            self.matrix = np.zeros((amount_rows, amount_columns), dtype=np.int32)
            self.hidden_war_place = self.matrix

        else:
            num_rows = len(given_matrix)
            num_columns = len(given_matrix[0])
            self.matrix = given_matrix
            self.hidden_war_place = np.zeros((num_rows, num_columns), dtype=np.int32)

    # Нужен для расстановки кораблей "по правилам" (метод random_place)
    @staticmethod
    def __ship_random_place__(ships_size, amount_ships, matrix_for_place):
        copy_matrix = matrix_for_place
        while amount_ships != 0:
            copy_matrix = np.transpose(copy_matrix[::-1])
            for k in range(0, amount_ships):

                check_place = True
                i = random.randint(0, 9)
                j = random.randint(0, 9)
                if j + ships_size <= 9:
                    for l in range(j, j + ships_size):
                        if copy_matrix[i, l] in (6, 8):
                            check_place = False
                            break
                    if check_place:
                        amount_ships = amount_ships - 1
                        if j - 1 != -1:
                            copy_matrix[i, j - 1] = 6
                            if (i - 1) != -1:
                                copy_matrix[i - 1, j - 1] = 6
                            if (i + 1) != 10:
                                copy_matrix[i + 1, j - 1] = 6

                        if j + ships_size != 10:
                            copy_matrix[i, j + ships_size] = 6
                            if i - 1 != -1:
                                copy_matrix[i - 1, j + ships_size] = 6
                            if i + 1 != 10:
                                copy_matrix[i + 1, j + ships_size] = 6

                        for l in range(j, j + ships_size):
                            copy_matrix[i, l] = 8
                            if i - 1 != -1:
                                copy_matrix[i - 1, l] = 6
                            if i + 1 != 10:
                                copy_matrix[i + 1, l] = 6

                    else:
                        break
        return copy_matrix

    # Случайно расставляет корабли "по правилам"
    def random_place(self, amount_ship_types):

        is_zero_matrix = np.all(self.matrix == 0)
        if not is_zero_matrix:
            self.matrix.fill(0)

        matrix_for_place = self.matrix.copy()
        start_rows = len(matrix_for_place)
        x = amount_ship_types - 1
        for i in range(amount_ship_types, 0, -1):
            matrix_for_place = self.__ship_random_place__(i, amount_ship_types - x, matrix_for_place)
            x = x - 1

        if start_rows != len(matrix_for_place):
            matrix_for_place = np.transpose(matrix_for_place[::-1])
        copy_matrix_for_place = matrix_for_place.copy()
        copy_matrix_for_place[copy_matrix_for_place == 6] = 0
        self.matrix = copy_matrix_for_place
        return self.matrix.tolist()

    # 8 - кораблик
    # False - игра не закончена(есть кораблики)
    # True - конец игры (все корабли разбиты)
    def end_of_game(self):
        result = np.any(self.matrix.copy() == 8)
        if result:
            result = False
        else:
            result = True
        return result

    def attack(self, i, j):
        ans = ""
        changed_coords = []
        if self.matrix[i][j] == 0 or self.hidden_war_place[i][j] == 1:  # попали в воду?
            self.hidden_war_place[i][j] = 1
            changed_coords.append([i,j,1])
            #добавить в список единичку.
            ans = "miss"
        else:

            self.hidden_war_place[i][j] = 2
            changed_coords.append([i,j,7])
            #добавить i,j 7
            ans = "hit"
            # осталась ли хоть одна целая часть корабля
            if (not ((i != 9 and (self.matrix[i + 1][j] == 8)) or  # справа
                     (i != 0 and (self.matrix[i - 1][j] == 8)) or  # слева
                     (j != 9 and (self.matrix[i][j + 1] == 8)) or  # вверх
                     (j != 0 and (self.matrix[i][j - 1] == 8)))):  # низ
                #удалить из списка 1-й элемент
                changed_coords.pop(0)
                if ((i != 9 and (self.hidden_war_place[i + 1][j] == 2)) or
                        (i != 0 and (self.hidden_war_place[i - 1][j] == 2))):  # корабль вертикально стоит?
                    k = i
                    kk = -1
                    while (k != 0) and (self.hidden_war_place[k - 1][j] == 2):  # бежим вверх
                        k -= 1
                    if k != 0:
                        k -= 1  # зашли за корабль
                        kk = k
                    while True:  # бежим по кораблю обратно и закрашиваем 3 строки
                        self.hidden_war_place[k][j] = 7##
                        changed_coords.append([k,j,7])

                        if j != 9:
                            self.hidden_war_place[k][j + 1] = 1##
                            changed_coords.append([k,j+1,1])
                        if j != 0:
                            self.hidden_war_place[k][j - 1] = 1##
                            changed_coords.append([k,j-1,1])
                        k += 1
                        if k == 9 or self.hidden_war_place[k][j] != 2:
                            break
                    if (kk!=-1):
                        self.hidden_war_place[kk][j] = 1
                        target = [kk, j, 7]

                        # Найдем индекс целевого списка в основном списке
                        index = changed_coords.index(target)

                        # Заменим 7 на 1
                        changed_coords[index][2] = 1

                        #найти kk j == 7 заменить на 1 
                    if k != 10:  # можно ли закрасить после корабля?
                        self.hidden_war_place[k][j] = 1##
                        changed_coords.append([k,j,1])
                        if j != 9:
                            self.hidden_war_place[k][j + 1] = 1##
                            changed_coords.append([k,j+1,1])
                        if j != 0:
                            self.hidden_war_place[k][j - 1] = 1##
                            changed_coords.append([k,j-1,1])



                    ans = "break down"
                else:
                    kk = -1
                    k = j
                    while (k != 0) and (self.hidden_war_place[i][k - 1] == 2):  # бежим влево и ищем КОНЕЦ
                        k -= 1
                    if k != 0:
                        k -= 1  # зашли за корабль
                        kk = k

                    while True:  # бежим вправо до КОНЦА
                        self.hidden_war_place[i][k] = 7##
                        changed_coords.append([i,k,7])
                        if i != 9:
                            self.hidden_war_place[i + 1][k] = 1##
                            changed_coords.append([i+1,k,1])
                        if i != 0:
                            self.hidden_war_place[i - 1][k] = 1##
                            changed_coords.append([i-1,k,1])
                        k += 1
                        if k == 9 or self.hidden_war_place[i][k] != 2:

                            break
                    if (kk!=-1):
                        self.hidden_war_place[i][kk] = 1

                        target = [i, kk, 7]

                        # Найдем индекс целевого списка в основном списке
                        index = changed_coords.index(target)
                        
                        # Заменим 7 на 1
                        changed_coords[index][2] = 1

                         #найти kk j == 7 заменить на 1  
                    if k != 10:
                        self.hidden_war_place[i][k] = 1##
                        changed_coords.append([i,k,1])
                        if i != 9:
                            self.hidden_war_place[i + 1][k] = 1##
                            changed_coords.append([i + 1,k,1])
                        if i != 0:
                            self.hidden_war_place[i - 1][k] = 1##
                            changed_coords.append([i - 1,k,1])

                    ans = "break down"
        if self.matrix[i][j] == 8:
            self.matrix[i][j] = 7
        else:
            self.matrix[i][j] = 1
        return changed_coords,ans


    def get_hidden_war_place(self):
        return self.hidden_war_place.tolist()


# amount_types = 4
# battleground_rows = 10
# battleground_columns = 10

# matrix = np.array([
#     [0, 0, 0, 0, 0, 8, 0, 0, 0, 0],
#     [0, 8, 0, 8, 0, 0, 0, 0, 0, 8],
#     [0, 0, 0, 8, 0, 8, 0, 0, 0, 8],
#     [0, 0, 0, 8, 0, 8, 0, 0, 0, 8],
#     [0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 8, 0, 0, 0],
#     [8, 8, 0, 8, 0, 0, 0, 0, 0, 8],
#     [0, 0, 0, 0, 0, 8, 8, 8, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 8, 8, 0, 0, 0, 0, 0, 0]
# ], dtype=np.int32)

# bot = MatrixProcessing(matrix)


# # for i in range (7):
# #     for j in range (7):
# #         print (bot.attack(i,j))
# #         print (bot.hidden_war_place)
# #         print (bot.matrix)

# print (bot.attack(1,3))
# print (bot.attack(2,3))
# print (bot.attack(3,3))
# print (bot.attack(4,3))

# print (bot.hidden_war_place)
# print (bot.matrix)
#             # 0: 'empty.png',
#             # 1: 'miss.png',
#             # 8: 'ship.png',
#             # 7: 'hit.png'

