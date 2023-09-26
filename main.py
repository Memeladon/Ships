# Запускаем сервер в режиме разработки (uvicorn main:app --reload).
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from core import settings

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# ---------------------------------------- CORSMiddleware ------------------------------------------------- #
'''
Зачем нам нужен CORSMiddleware? Чтобы выполнять запросы с других источников (cross-origin requests) - то есть 
запросы, которые происходят из другого протокола, IP-адреса, доменного имени или порта - необходимо включить механизм 
Cross Origin Resource Sharing (CORS). Встроенный в FastAPI CORSMiddleware обрабатывает это для нас.
'''

origins = [
    "http://localhost:3000",
    "127.0.0.1:8000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# -------------------------------------------- Static dirs -------------------------------------------- #

app.mount("/static", StaticFiles(directory="./frontend/static"), name="static")

templates = Jinja2Templates(directory="frontend/templates")

# --------------------------------------------- Fast api ---------------------------------------------- #

# Запуск сервера на host=x.x.x.x:port
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


# --------------------------------------------- Get Post ---------------------------------------------- #

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

