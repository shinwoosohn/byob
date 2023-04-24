from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import Union, List
from authenticator import authenticator
from queries.posts import Error, PostsIn, PostOut, PostsOut, PostsRepo
from pydantic import BaseModel


router = APIRouter()


class HttpError(BaseModel):
    detail: str


# Create a post/listing endpoint
@router.post("/posts", response_model=Union[PostOut, HttpError])
def create_post(
    info: PostsIn,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> PostOut:
    try:
        return repo.create(info, account_data)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create post with those credentials",
        )


########################################################################################
# GET all post/listing endpoint
@router.get("/posts", response_model=Union[List[PostsOut], HttpError])
def get_all_post(
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all_post()
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all posts",
        )


########################################################################################
# GET singular post/listing endpoint
@router.get("/posts/{posts_id}", response_model=Union[PostsOut, Error])
def get_post(
    posts_id: int,
    response: Response,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = repo.get_post(posts_id)
    if record is None:
        response.status_code = 404
        return {"message": "Could not retrieve post by that id"}
    else:
        return record


########################################################################################
# PUT singular post/listing endpoint
@router.put("/posts/{posts_id}", response_model=Union[PostOut, Error, HttpError])
def update_post(
    posts_id: int,
    response: Response,
    info: PostsIn,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_post(posts_id)
        if account_data["user_id"] == result["user"]["user_id"]:
            return repo.update_post(info, posts_id, account_data)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to update this post"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update post with those credentials",
        )



########################################################################################
# DELETE singular post endpoint
@router.delete("/posts/{posts_id}", response_model=Union[bool, Error, HttpError])
def delete_post(
    posts_id: int,
    response: Response,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_post(posts_id)
        if account_data["user_id"] == result["user"]["user_id"]:
            record = repo.delete_post(posts_id)
            if record is None:
                response.status_code = 404
                return {"message": "There is no post to delete"}
            else:
                return record
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this post"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete post with those credentials",
        )
