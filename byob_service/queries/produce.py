from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool
from datetime import date

# from queries.posts import PostsOut
# from queries.deliveries import DeliveriesOut


class ProduceIn(BaseModel):
    quantity: int
    weight: int
    description: str
    image_url: str
    exp_date: date
    is_decorative: bool
    is_available: bool
    price: float
    owner_id: Optional[int]


class ProduceOut(BaseModel):
    produce_id: int
    quantity: int
    weight: int
    description: str
    image_url: str
    exp_date: date
    is_decorative: bool
    is_available: bool
    price: float
    owner_id: Optional[int]


class ProduceUser(BaseModel):
    user_id: int
    username: str


class ProduceGetOut(BaseModel):
    produce_id: int
    quantity: int
    weight: int
    description: str
    image_url: str
    exp_date: date
    is_decorative: bool
    is_available: bool
    price: float
    user: ProduceUser


class ProduceRepo:
    # ******************************CREATE*PRODUCE******************************************

    def create(self, user_id: int, produce: ProduceIn) -> ProduceOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO produce
                            (
                                quantity
                                , weight
                                , description
                                , image_url
                                , exp_date
                                , is_decorative
                                , is_available
                                , price
                                , owner_id
                            )
                        VALUES
                            (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        RETURNING id AS produce_id;
                        """,
                        [
                            produce.quantity,
                            produce.weight,
                            produce.description,
                            produce.image_url,
                            produce.exp_date,
                            produce.is_decorative,
                            produce.is_available,
                            produce.price,
                            user_id,
                        ],
                    )
                    produce_id = cur.fetchone()[0]
                    old_data = produce.dict()
                    old_data["owner_id"] = user_id
                    return ProduceOut(
                        produce_id=produce_id,
                        **old_data,
                    )
        except Exception as e:
            raise ValueError("Could not create produce")

    ##############################################################################################
    # GET specific produce for specific user
    def get_produce(
        self, user_id: int, produce_id: int
    ) -> Optional[ProduceGetOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT pr.id AS produce_id
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id AS user_id
                            , u.username
                        FROM produce pr
                        LEFT JOIN users u
                        ON pr.owner_id = u.id
                        WHERE u.id = %s and pr.id = %s
                        """,
                        [user_id, produce_id],
                    )
                    row = cur.fetchone()
                    return self.produce_record_to_dict(row, cur.description)
        except Exception as e:
            return {"message": "Could not get that produce"}

    # ******************************UPDATE*A*PRODUCE*****************************************
    def update_produce(
        self,
        user_id: int,
        produce_id: int,
        produce: ProduceIn,
    ) -> ProduceOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE produce
                        SET quantity = %s
                          ,  weight = %s
                          ,  description = %s
                          ,  image_url = %s
                          ,  exp_date = %s
                          ,  is_decorative = %s
                          ,  is_available = %s
                          ,  price = %s
                        WHERE owner_id = %s and id = %s
                        """,
                        [
                            produce.quantity,
                            produce.weight,
                            produce.description,
                            produce.image_url,
                            produce.exp_date,
                            produce.is_decorative,
                            produce.is_available,
                            produce.price,
                            produce.owner_id,
                            produce_id,
                        ],
                    )
                    produce_id = produce_id
                    old_data = produce.dict()
                    old_data["owner_id"] = user_id
                    return ProduceOut(produce_id=produce_id, **old_data)
        except Exception as e:
            raise ValueError("Could not update produce")

    ######################################################################
    # DELETE specific produce for specific user
    def delete_produce(self, produce_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM produce
                        WHERE id = %s
                        """,
                        [produce_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    # *****************************ENCODER***********************************************************
    # method to call in get_produce that structures the data into proper nested dict form
    def produce_record_to_dict(self, row, description):
        produce = None
        if row is not None:
            produce = {}
            produce_fields = [
                "produce_id",
                "quantity",
                "weight",
                "description",
                "image_url",
                "exp_date",
                "is_decorative",
                "is_available",
                "price",
            ]
            for i, column in enumerate(description):
                if column.name in produce_fields:
                    produce[column.name] = row[i]

            user = {}
            user_fields = [
                "user_id",
                "username",
            ]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
            # user["id"] = user["user_id"]
            produce["user"] = user
        return produce
