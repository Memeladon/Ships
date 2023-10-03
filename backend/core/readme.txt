#О_прологе


Основой предикат файла это "fire(List,I)."
	где,
	List - матрица представленная в виде списка;
	I - Индекс в списке указывающий на выбранное место для стрельбы ИИ.


Матрица в виде списка это
A = [[0,0,0],
     [0,2,1],
     [0,2,0]] -> [0,0,0,0,2,1,0,2,0].


Правила ввода: В параметр List есть 3 условности:
а) 0 - место куда можно стрелять (пусто);
б) 2 - часть УЖЕ поврежденнго корабля;
в) любая другая цифра - запрещенное место.


#Как_запустить


Пример кода на python для запуска файла пролога 

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