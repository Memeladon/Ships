from backend.src.classes.matrix_processing import MatrixProcessing

import random
def lets_game(player,bot):

    random_variable_for_turn = randint(0,1)
    if randint == 0:
        turn = "player"
    else:
        turn = "bot"

    while ((player.end_of_game() != True) or (bot.end_of_game() != True)):
    if turn == "player":
        # принятие координат с веба (GET)
        bot.attack(]принятые координаты атаки c web])
        if (bot.attack(]принятые координаты атаки c web]) == "Попал!") or  (bot.attack() == "Разбил!"):
            turn = "player"
        #публикация матрицы(POST)
    else:
        #отправка матрицы прологу
        #принятие координат от пролога
        player.attack(]принятые координаты с prolog])
        if (player.attack(]принятые координаты с prolog]) == "Попал!") or  (bot.attack() == "Разбил!"):
            turn = "bot"
        #публикация матрицы(POST)

    if player.end_of_game():
        game_result = "Вы проиграли"
    else:
        game_result = "Победа!"


amount_types = 4
battleground_rows = 10
battleground_columns = 10

bot = MatrixProcessing(None,battleground_rows,battleground_columns)
bot.random_place(amount_types)

#сюда отправить, сам ли располагает
random_place = True
if random_place:
    player = MatrixProcessing(None,10,10)
    player.random_place(amount_types)
else:
    #сюда подтянуть матрицу с кораблями, в случае если матрица кастомная 
    player = MatrixProcessing(customized_matrix)
    pass










