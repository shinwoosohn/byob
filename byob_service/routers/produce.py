from fastapi import APIRouter, Depends, Response, HTTPException, status
from typing import Union, List
from authenticator import authenticator
from pydantic import BaseModel
from queries.produce import Error, ProduceIn, ProduceOut, ProduceGetOut, ProduceRepo

router = APIRouter()


class HttpError(BaseModel):
    detail: str


# Create a produce endpoint
@router.post("/users/{user_id}/produce", response_model=Union[ProduceOut, Error])
def create_produce(
    user_id: int,
    produce: ProduceIn,
    response: Response,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(user_id, produce)
    except Exception as e:
        response.status_code = 400
        return {"message": "Can not create produce"}


################################################################################
# GET ALL  produce endpoint
@router.get("/users/{user_id}/produce/", response_model=Union[List[ProduceGetOut], HttpError])
def get_all_produce(
    user_id: int,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all_produce(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all produce",
        )


################################################################################
# GET singular produce endpoint
@router.get("/users/{user_id}/produce/{produce_id}", response_model=Union[ProduceGetOut, Error])
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
        return {"message": "Could not retrieve user produce by that id"}
    else:
        return record


################################################################################
# UPDATE singular produce endpoint
@router.put("/users/{user_id}/produce/{produce_id}", response_model=Union[ProduceOut, Error, HttpError])
def update_produce(
    user_id: int,
    produce_id: int,
    response: Response,
    produce: ProduceIn,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            return repo.update_produce(user_id, produce_id, produce)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to update this produce"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete produce with those credentials",
        )


################################################################################
# DELETE singular produce endpoint
@router.delete("/users/{user_id}/produce/{produce_id}", response_model=Union[bool, Error, HttpError])
def delete_produce(
    user_id: int,
    produce_id: int,
    response: Response,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            record = repo.delete_produce(user_id, produce_id)
            if record is None:
                response.status_code = 404
            else:
                return record
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this produce"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete post with those credentials",
        )
