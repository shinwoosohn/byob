from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class UsersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: str
    city: str
    state: str
    username: str
    password: str
    avatar_url: Optional[str]


class UsersOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: str
    city: str
    state: str
    username: str
    avatar_url: Optional[str]
    is_driver: bool
    car_model: Optional[str]
    license_plate: Optional[str]
    dl_number: Optional[str]


class UsersOutWithPassword(UsersOut):
    hashed_password: str


class UsersRepo:

    # Create method for Users
    def create(self, users: UsersIn,
               hashed_password: str) -> UsersOutWithPassword:
        try:
            # connect the database
            with pool.connection() as conn:  # with keyword is called a monitor and a way to not try catch block
                # get a cursor (something to run SQL with)
                with conn.cursor() as cur:
                    result = cur.execute(
                        # Insert statement part of SQL execute method
                        # using value syntax '%...'
                        """
                        INSERT INTO users
                            (
                                first_name,
                                last_name,
                                email,
                                phone_number,
                                address,
                                city,
                                state,
                                username,
                                hashed_password,
                                avatar_url
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id AS user_id;
                        """,
                        [
                            users.first_name,
                            users.last_name,
                            users.email,
                            users.phone_number,
                            users.address,
                            users.city,
                            users.state,
                            users.username,
                            users.hashed_password,
                            users.avatar_url
                        ]
                    )
                    user_id = result.fetchOne()[0]
                    old_data = users.dict()
                    return UsersOutWithPassword(
                        user_id = user_id,
                        **old_data,
                        hashed_password=hashed_password
                    )
        except Exception as e:
            if 'username' in str(e):
                raise ValueError('Username already exists')
            elif 'email' in str(e):
                raise ValueError('Email already exists')
            elif 'phone_number' in str(e):
                raise ValueError('Phone number already exists')
