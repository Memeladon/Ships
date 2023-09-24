# Запускаем сервер в режиме разработки (uvicorn main:app --reload).
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from core import settings

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("menu.html", {"request": request})
