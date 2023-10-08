from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

from backend.entity.cell import CellData

router = APIRouter(
    prefix='/game',
    tags=['Game']
)

templates = Jinja2Templates(directory='frontend/templates')


@router.get('/base')
def get_base_page(request: Request):
    return templates.TemplateResponse("base.html", {'request': request})


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
    new_value = value + 2
    # Верните какой-либо ответ, если это необходимо
    return {"i": i, "j": j, "value": new_value, 'matrix': matrix}


@router.get("/api/random_matrix")
async def random_matrix():

    print('click')
    # Здесь вы можете обработать выбранную ячейку по координатам (i, j)

    generated_matrix = [
        [0, 0, 0, 0, 0, 8, 8, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [0, 0, 0, 0, 0, 0, 8, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 8, 0],
        [0, 8, 8, 8, 0, 8, 8, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 8, 0],
        [0, 0, 0, 8, 0, 0, 8, 0, 8, 0],
        [0, 0, 0, 8, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 8, 0, 0, 0, 0, 0]
    ]

    # Верните какой-либо ответ, если это необходимо
    return {"generated_matrix": generated_matrix}
