# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: UsersRepo,
    ):
        # Use your repo to get the user based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: UsersRepo = Depends(),
    ):
        # Return the users. That's it.
        return accounts

    def get_hashed_password(self, account: UsersOutWithPassword):
        # Return the encrypted password value from your
        # user object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UsersOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, UsersOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
