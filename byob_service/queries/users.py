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
    def create(
        self, users: UsersIn, hashed_password: str
    ) -> UsersOutWithPassword:
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
                            users.avatar_url,
                        ],
                    )
                    user_id = result.fetchOne()[0]
                    old_data = users.dict()
                    return UsersOutWithPassword(
                        user_id=user_id,
                        **old_data,
                        hashed_password=hashed_password
                    )
        except Exception as e:
            if "username" in str(e):
                raise ValueError("Username already exists")
            elif "email" in str(e):
                raise ValueError("Email already exists")
            elif "phone_number" in str(e):
                raise ValueError("Phone number already exists")

    # Get a specific user method for Users
    def get_user(self, user_id: int) -> Optional[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT id AS user_id
                            , first_name
                            , last_name
                            , email
                            , phone_number
                            , address
                            , city
                            , state
                            , username
                            , hashed_password
                            , avatar_url
                            , is_driver
                            , car_model
                            , license_plate
                            , dl_number
                        FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}


    def update_user_profile(self, user_id: int, user:UsersIn) -> Optional[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET first_name = %s
                          , last_name = %s
                          , email = %s
                          , phone_number = %s
                          , address = %s
                          , city = %s
                          , state = %s
                          , username = %s
                          , avatar_url = %s
                        WHERE id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.phone_number,
                            user.address,
                            user.city,
                            user.state,
                            user.username,
                            user.avatar_url,
                            user_id

                        ]
                    )

                    return self.record_to_user_update(user_id,user)
        except Exception as e:
            print(e)
            return {"message":"Could not update Profile"}


    def delete_user_profile(self,  user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message":"Could not delete Profile"}


#######################################################################
# ENCODERS BELOW
#######################################################################

    def record_to_user_out(self, record):
        return UsersOutWithPassword(
            user_id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            phone_number=record[4],
            address=record[5],
            city=record[6],
            state=record[7],
            username=record[8],
            hashed_password=record[9],
            avatar_url=record[10],
            is_driver=record[11],
            car_model=record[12],
            license_plate=record[13],
            dl_number=record[14],
        )


    def record_to_user_update(self, record):
        return UsersOutWithPassword(
            user_id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            phone_number=record[4],
            address=record[5],
            city=record[6],
            state=record[7],
            username=record[8],
            avatar_url=record[10]
        )
