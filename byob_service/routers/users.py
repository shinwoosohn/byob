from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from typing import Union, List, Optional
from authenticator import authenticator
from pydantic import BaseModel
from queries.users import UsersIn, UsersOut, UsersOutWithPassword, UsersRepo


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/users", response_model=UserToken | HttpError)
async def create_user(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = repo.create(info, hashed_password)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=user, **token.dict())


############################################################################

# grabs token from cookie store related user session


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: UsersIn = Depends(authenticator.try_get_current_account_data),
) -> UserToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/users/{user_id}", response_model=UsersOutWithPassword)
def get_one_user(
    user_id: int,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOutWithPassword:
    return repo.get_user(user_id)


@router.put("/users/{user_id}", response_model=UsersOut)
def update_user(
    user_id: int,
    user: UsersIn,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    return repo.update_user_profile(user_id, user)
