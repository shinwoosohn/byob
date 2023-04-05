from fastapi import APIRouter, Depends, Response, Request
from typing import Union, List, Optional
from authenticator import authenticator
from pydantic import BaseModel
from queries.produce import (
    ProduceIn,
    ProduceOut,
    ProduceRepo
)

router = APIRouter()

class HttpError(BaseModel):
    detail: str



@router.post("/produce", response_model=ProduceOut | HttpError)
def create_produce(
    produce: ProduceIn,
    request: Request,
    response: Response,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(produce, account_data)
    except Exception as e:
        response.status_code = 400
        return {"message": "Can not create produce"}
