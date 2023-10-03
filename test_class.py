from backend.src.classes.matrix_processing import MatrixProcessing

def turn(who_is_turn):
    if who_is_turn == "player":
        pass

    else who_is_turn == "bot":
        pass





amount_types = 4
battleground_rows = 10
battleground_columns = 10

bot = MatrixProcessing(None,battleground_rows,battleground_columns)
bot.random_place(amount_types)

random_place = True
if random_place == True:
    player = MatrixProcessing(None,10,10)
    player.random_place(amount_types)
else:
#    player = MatrixProcessing(customized_matrix)
    pass

while :
    pass
