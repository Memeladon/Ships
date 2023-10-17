from fastapi import APIRouter, Form
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

from backend.entity.cell import CellData


from backend.src.classes.matrix_processing import MatrixProcessing
import random
#from pyswip import Prolog


amount_types = 4
battleground_rows = 10
battleground_columns = 10

bot = MatrixProcessing(None,battleground_rows,battleground_columns)

router = APIRouter(
    prefix='/game',
    tags=['Game']
)

templates = Jinja2Templates(directory='frontend/templates')


@router.get('/')
def get_main_page(request: Request):
    return templates.TemplateResponse("trial.html", {'request': request})


# Обработчик POST-запроса для обработки выбранной ячейки
@router.post("/api/cell-click")
async def cell_click(cell_data: CellData):
    matrix = cell_data.matrix
    i = cell_data.i
    j = cell_data.j
    value = cell_data.value

    # Здесь вы можете обработать выбранную ячейку по координатам (i, j)

    print(f"Выбрана ячейка с координатами ({i}, {j}), и значением {value}, в матрице \'{matrix}\'")

    # 1 - miss
    # 2 - hit
    new_value = value + 1
    # Верните какой-либо ответ, если это необходимо
    return {"i": i, "j": j, "value": new_value, 'matrix': matrix}

@router.post("/api/initialize_matrix")
async def random_matrix():

    player = MatrixProcessing(None,battleground_rows,battleground_columns)
    generated_matrix = player.random_place(amount_types)

    # Верните какой-либо ответ, если это необходимо

    generated_matrix = bot.random_place(amount_types)

    return {"generated_matrix": generated_matrix}


@router.post("/api/update_matrix")
async def update_matrix(
        matrix: list[list[int]] = Form(...),  # Принимаем матрицу как параметр формы
        matrix_name: str = Form(...),  # Принимаем имя матрицы (например, 'player' или 'enemy')
 ):
    side = matrix_name
    current_matrix = matrix

    # Здесь вы можете выполнить необходимую обработку матрицы
    # Например, вы можете сохранить ее в базе данных или выполнять другие операции

    # Вернем успешный статус, чтобы клиент знал, что матрица была обновлена
    return {"message": f"Матрица '{matrix_name}' успешно обновлена"}
