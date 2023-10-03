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
    i: int
    j: int


# Обработчик POST-запроса для обработки выбранной ячейки
@router.post("/api/cell-click")
async def cell_click(cell_data: CellData):
    i = cell_data.i
    j = cell_data.j

    # Здесь вы можете обработать выбранную ячейку по координатам (i, j)

    print(f"Выбрана ячейка с координатами ({i}, {j})")

    # Верните какой-либо ответ, если это необходимо
    return {"message": f"Выбрана ячейка с координатами ({i}, {j})"}
