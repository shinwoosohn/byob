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


class ProduceOut(ProduceIn):
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
    # posts: List[PostsOut]
    # deliveries: List[DeliveriesOut]


class ProduceRepo:
# ******************************CREATE*PRODUCE******************************************

    def create(self, produce: ProduceIn, account_data: dict) -> ProduceOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result=cur.execute(
                        """
                        INSERT INTO produce
                            (quantity,weight,description,image_url,exp_date,is_decorative,is_available,price,owner_id)
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
                            account_data["user_id"]
                        ]
                    )
                    produce_id = cur.fetchone()[0]
                    old_data = produce.dict()
                    old_data["owner_id"] = account_data["user_id"]
                    return ProduceOut(
                        produce_id=produce_id,
                        **old_data,
                    )
        except Exception as e:
            raise ValueError("Could not create produce")




    def produce_in_to_out(self, record):
        return ProduceOut(
            produce_id=record[0],
            quantity=record[1],
            weight=record[2],
            description=record[3],
            image_url=record[4],
            exp_date=record[5],
            is_decorative=record[6],
            is_available=record[7],
            price=record[8],
        )
# ****************************END*CREATE*PRODUCE******************************************

# ******************************UPDATE*A*PRODUCE*****************************************
