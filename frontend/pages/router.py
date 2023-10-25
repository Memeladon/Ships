from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

from backend.entity import (CellData, MatrixItem)
from backend.src.classes.matrix_processing import MatrixProcessing
from backend.src.pl_connect import pl_connect

# from pyswip import Prolog


amount_types = 4
battleground_rows = 10
battleground_columns = 10

bot = MatrixProcessing(None, battleground_rows, battleground_columns)
player = MatrixProcessing(None, battleground_rows, battleground_columns)

router = APIRouter(
    # prefix='/game',
    tags=['Game'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory='frontend/templates')


@router.get('/')
def get_main_page(request: Request):
    return templates.TemplateResponse("trial.html", {'request': request})


# 7 - подбит
# 1 - промах
# 8 - Корабль
# 0 - ничего

# Обработчик POST-запроса для обработки выбранной ячейки
@router.post("/api/cell-click")
async def cell_click(cell_data: CellData):
    matrix = cell_data.matrix
    i = cell_data.i
    j = cell_data.j
    value = cell_data.value
    # Попал
    # вернул знач
    # Промах
    # ходы бота
    answer_list_player = []
    answer_list_bot = []
    bot_coords, ans = bot.attack(i, j)
    answer_list_player.append(ans)

    final_bot_coords = []
    final_bot_coords += bot_coords
    final_player_coords = []
    check_end_of_game_for_bot = bot.end_of_game()

    if check_end_of_game_for_bot:
        return {'data_bot': final_bot_coords, 'data_player': final_player_coords, 'check_eof': 'bot',
                'answer_list_player': answer_list_player, 'answer_list_bot': answer_list_bot}
    if ans == "miss":
        ans = ""
        while ans != "miss":

            col, row = pl_connect(player.hidden_war_place)

            player_coords, ans = player.attack(col, row)
            answer_list_bot.append(ans)

            final_player_coords += player_coords

            check_end_of_game_for_player = player.end_of_game()

            if check_end_of_game_for_player:
                return {'data_bot': final_bot_coords, 'data_player': final_player_coords, 'check_eof': 'player','answer_list_player': answer_list_player,'answer_list_bot': answer_list_bot}
    return {'data_bot': final_bot_coords, 'data_player': final_player_coords, 'check_eof': False,
            'answer_list_player': answer_list_player, 'answer_list_bot': answer_list_bot}


@router.post("/api/initialize_matrix")
async def random_matrix():
    global player
    global bot
    player = MatrixProcessing(None, battleground_rows, battleground_columns)
    generated_matrix = player.random_place(amount_types)

    # Верните какой-либо ответ, если это необходимо

    generated_matrix = bot.random_place(amount_types)

    return {"generated_matrix": generated_matrix}


@router.post("/api/save_matrix")
async def save_matrix(matrix_item: MatrixItem):
    player_matrix = matrix_item.matrix
    global player
    player = MatrixProcessing(player_matrix)


    # Здесь вы можете выполнить необходимую обработку матрицы
    # Например, вы можете сохранить ее в базе данных или выполнять другие операции

    # Вернем успешный статус, чтобы клиент знал, что матрица была обновлена
    return {"message": f"Матрица '{player_matrix}' сохранена"}

[[8, 0, 0, 8, 8, 0, 0, 0, 0, 0], 
[8, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 8, 1, 8, 0], 
[0, 8, 8, 8, 1, 0, 0, 1, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 1, 0, 0, 8, 0, 0], 
[0, 0, 8, 8, 8, 0, 0, 7, 1, 0], 
[0, 0, 0, 0, 0, 0, 0, 7, 0, 0], 
[8, 0, 0, 8, 0, 0, 0, 7, 0, 0], 
[0, 0, 0, 8, 0, 8, 0, 0, 0, 0]]
