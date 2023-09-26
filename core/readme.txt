Пример кода для запуска файла пролога 

!!!Предварительно используй pip install git+https://github.com/yuce/pyswip@master#egg=pyswip


from pyswip import Prolog

prolog = Prolog()
prolog.consult("shipCore.pl")  # Загрузка файла prolog.pl

# Вызов предиката fire(List, I) с аргументом List и получение I
list_argument = [0,0,0, 0,2,0, 0,0,0]  # Пример списка аргументов
result = list(prolog.query("fire({}, I).".format(list_argument)))

# Обработка результата
for solution in result:
    i_value = solution["I"]
    print(i_value)  # Вывод значения I
    break