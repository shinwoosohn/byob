from fastapi import APIRouter, Depends, Response, Request
from typing import Union, List, Optional
from authenticator import authenticator
from pydantic import BaseModel
from queries.produce import (
    ProduceIn,
    ProduceOut,
    ProduceGetOut,
    ProduceRepo
)

router = APIRouter()

class HttpError(BaseModel):
    detail: str

@router.post("/users/{user_id}/produce", response_model=ProduceOut | HttpError)
def create_produce(
    user_id: int,
    produce: ProduceIn,
    request: Request,
    response: Response,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(user_id,produce)
    except Exception as e:
        response.status_code = 400
        return {"message": "Can not create produce"}
################################################################################
# GET singular produce endpoint
@router.get('/users/{user_id}/produce/{produce_id}', response_model=ProduceGetOut)
def get_produce(
    user_id: int,
    produce_id: int,
    response: Response,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = repo.get_produce(user_id, produce_id)
    if record is None:
        response.status_code = 404
    else:
        return record


################################################################################
# UPDATE singular produce endpoint

@router.put("/users/{user_id}/produce/{produce_id}", response_model=ProduceOut)
def update_produce(
    user_id: int,
    produce_id: int,
    response: Response,
    produce: ProduceIn,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ProduceOut:
    try:
        return repo.update_produce(user_id, produce_id, produce)
    except Exception as e:
        response.status_code = 400
        return {"message": "Can not update produce"}
