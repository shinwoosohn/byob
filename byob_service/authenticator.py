# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UsersRepo,
    ):
        # Use your repo to get the user based on the
        # username (which could be an email)
        return users.get(username)

    def get_account_getter(
        self,
        users: UsersRepo = Depends(),
    ):
        # Return the users. That's it.
        return users

    def get_hashed_password(self, user: UsersOutWithPassword):
        # Return the encrypted password value from your
        # user object
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UsersOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UsersOut(**user.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
