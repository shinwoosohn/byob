from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from typing import Union, List
from authenticator import authenticator
from pydantic import BaseModel
from queries.users import (
    UsersIn,
    UsersOut,
    UsersOutWithPassword,
    UsersRepo,
    DriverUpdate,
)


class DuplicateAccountError(ValueError):
    pass


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# SignUp endpoint / Create User using Authenticator for hashing password
@router.post("/users", response_model=AccountToken | HttpError)
async def create_user(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


############################################################################
# From jwtdown-fastapi : Grabs token from cookie store related user session
@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UsersIn = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


############################################################################
# GET regular user_profile api endpoint
@router.get(
    "/users/{user_id}", response_model=Union[UsersOutWithPassword, HttpError]
)
def get_one_user(
    user_id: int,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOutWithPassword:
    try:
        return repo.get_user(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


############################################################################
# GET All users api endpoint for development purposes
@router.get(
    "/users", response_model=Union[List[UsersOutWithPassword], HttpError]
)
def get_all(
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all()
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get all users",
        )


############################################################################
# UPDATE regular user_profile api endpoint
@router.put("/users/{user_id}", response_model=Union[UsersOut, HttpError])
def update_user(
    user_id: int,
    user: UsersOut,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    try:
        return repo.update_user_profile(user_id, user)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update an account with those credentials",
        )


############################################################################
# DELETE user api endpoint
@router.delete("/users/{user_id}", response_model=Union[bool, HttpError])
def delete_user(
    user_id: int,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    try:
        return repo.delete_user_profile(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete an account with those credentials",
        )


############################################################################
# UPDATE driver api endpoint
@router.patch(
    "/users/{user_id}", response_model=Union[DriverUpdate, HttpError]
)
def update_driver(
    user_id: int,
    user: DriverUpdate,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> DriverUpdate:
    try:
        return repo.update_driver_profile(user_id, user)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update an account with those credentials",
        )
