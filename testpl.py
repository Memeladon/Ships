from pyswip import Prolog
from backend.src.classes.matrix_processing import MatrixProcessing


prolog = Prolog()
prolog.consult("backend/core/shipCore.pl")  # Загрузка файла prolog.pl

# Вызов предиката fire(List, I) с аргументом List и получение I
list_argument = [0,0,0, 0,0,0, 0,0,0,0,0,0,2]  # Пример списка аргументов
result = list(prolog.query("fire({}, I).".format(list_argument)))

# Обработка результата
for solution in result:
    i_value = solution["I"]
    print(i_value)  # Вывод значения I
    break