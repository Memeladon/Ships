from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.templating import Jinja2Templates

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
    return templates.TemplateResponse("index.html", {'request': request})
