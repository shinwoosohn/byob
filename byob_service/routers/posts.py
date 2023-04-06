from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union, List, Optional
from authenticator import authenticator
from queries.posts import PostsIn, PostsOut, PostsRepo


router = APIRouter()


# Create a post/listing endpoint
@router.post('/posts', response_model=PostsOut)
def create_post(
    info: PostsIn,
    repo: PostsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> PostsOut:
    try:
        return repo.create(info, account_data)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create post with those credentials"
        )

########################################################################################
