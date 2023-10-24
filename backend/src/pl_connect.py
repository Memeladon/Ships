from pyswip import Prolog
from backend.src.classes.matrix_processing import MatrixProcessing


def pl_connect(matrix_for_attack):
    print("ASDDDDDDDDDAA")
    print(matrix_for_attack)
    prolog = Prolog()
    prolog.consult("backend/core/shipCore.pl")  # Загрузка файла prolog.pl

    # Преобразование списка списков в один плоский список
    flat_list = [item for sublist in matrix_for_attack for item in sublist]
    print(flat_list)

    # Вызов предиката fire(List, I) с аргументом List и получение I
    list_argument = flat_list  # Пример списка аргументов
    result = prolog.query("fire({}, I).".format(list_argument))

    try:
        first_solution = next(result)
        i_value = first_solution["I"]
        print(i_value)
    except StopIteration:
        print("Нет решений")

    i = i_value // 10
    j = i_value % 10
    print(i,j)
    return i, j
