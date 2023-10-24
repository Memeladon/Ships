from pyswip import Prolog
from backend.src.classes.matrix_processing import MatrixProcessing


def pl_connect(matrix_for_attack):
    prolog = Prolog()
    prolog.consult("backend/core/shipCore.pl")  # Загрузка файла prolog.pl

    # Преобразование списка списков в один плоский список
    flat_list = [item for sublist in matrix_for_attack for item in sublist]

    # Вызов предиката fire(List, I) с аргументом List и получение I
    list_argument = flat_list  # Пример списка аргументов
    result = list(prolog.query("fire({}, I).".format(list_argument)))

    # Обработка результата
    for solution in result:
        i_value = solution["I"]
        break
    print(i_value)  # Вывод значения I

    i = i_value // 10
    j = i_value % 10
    return i, j

# nested_list = [
# [0, 2, 0],
# [0, 0, 0],
# [0, 0, 0]
# ]
# i,j = pl_connect(nested_list)
# print(i,j)
