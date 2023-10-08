# Класс для данных о выбранной ячейке
from pydantic import BaseModel


class CellData(BaseModel):
    matrix: str
    i: int
    j: int
    value: int