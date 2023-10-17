# Класс для данных о выбранной ячейке
from pydantic import BaseModel


class MatrixItem(BaseModel):
    matrix: list[list[int]]
