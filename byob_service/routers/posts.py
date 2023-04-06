from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.posts import PostsIn, PostOut,PostsOut, PostsRepo


router = APIRouter()


# Create a post/listing endpoint
@router.post('/posts', response_model=PostOut)
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
            detail="Cannot create post with those credentials"
        )


########################################################################################
# GET singular post/listing endpoint
@router.get('/posts/{posts_id}', response_model=PostsOut)
def get_post(
    posts_id: int,
    response: Response,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = repo.get_post(posts_id)
    if record is None:
        response.status_code = 404
    else:
        return record
