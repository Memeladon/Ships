from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

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


# Класс для данных о выбранной ячейке
class CellData(BaseModel):
    matrix: str
    i: int
    j: int
    value: int


# Обработчик POST-запроса для обработки выбранной ячейки
@router.post("/api/cell-click")
async def cell_click(cell_data: CellData):
    matrix = cell_data.matrix
    i = cell_data.i
    j = cell_data.j
    value = cell_data.value

    # Здесь вы можете обработать выбранную ячейку по координатам (i, j)

    print(f"Выбрана ячейка с координатами ({i}, {j}), и значением {value}, в матрице \'{matrix}\'")

    new_value = value + 1
    # Верните какой-либо ответ, если это необходимо
    return {"i": i, "j": j, "value": new_value, 'matrix': matrix}
