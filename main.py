# Запускаем сервер в режиме разработки (uvicorn main:app --reload).
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.core import settings
from frontend.pages.router import router as router_pages

app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

# ---------------------------------------- CORSMiddleware ------------------------------------------------- #
'''
Зачем нам нужен CORSMiddleware? Чтобы выполнять запросы с других источников (cross-origin requests) - то есть 
запросы, которые происходят из другого протокола, IP-адреса, доменного имени или порта - необходимо включить механизм 
Cross Origin Resource Sharing (CORS). Встроенный в FastAPI CORSMiddleware обрабатывает это для нас.
'''

origins = [
    "127.0.0.1:8000",
    "localhost:8000"
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
# Отображение api
app.include_router(router_pages)

# --------------------------------------------- Fast api ---------------------------------------------- #

# Запуск сервера на host=x.x.x.x:port
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


# --------------------------------------------- Get Post ---------------------------------------------- #


