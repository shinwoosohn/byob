from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from queries.pool import pool
from queries.produce import ProduceOut


class DeliveryIn(BaseModel):
    posts_id: Optional[int]
    produce_id: int
    producer_id: int
    from_address: str
    from_city: str
    from_state: str
    to_address: str
    to_city: str
    to_state: str
    requestor_id: int
    order_status: Optional[str]


class DeliveryOut(BaseModel):
    delivery_id: int
    posts_id: Optional[int]
    produce_id: int
    producer_id: int
    from_address: str
    from_city: str
    from_state: str
    to_address: str
    to_city: str
    to_state: str
    requestor_id: int
    order_status: Optional[str]
    delivery_status: Optional[str]
    request_created: Optional[datetime]


class OrderAccept(BaseModel):
    delivery_id: int
    order_status: str


class DeliveryUpdate(BaseModel):
    delivery_id: int
    delivery_status: str
    driver_id: Optional[int]


class DeliveryOutWithDriver(BaseModel):
    delivery_id: int
    posts_id: Optional[int]
    produce: ProduceOut
    producer_id: int
    from_address: str
    from_city: str
    from_state: str
    to_address: str
    to_city: str
    to_state: str
    requestor_id: int
    order_status: Optional[str]
    delivery_status: Optional[str]
    request_created: Optional[datetime]
    driver_id: Optional[int]
    phone_number: Optional[str]
    car_model: Optional[str]
    license_plate: Optional[str]
    DL_number: Optional[str]


class DeliveryRepo:
    ###################################################################################
    # Create a Delivery method
    def create_delivery(self, delivery: DeliveryIn, account_data: dict) -> DeliveryOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # INSERT INTO SQL statement to create delivery
                        """
                        INSERT INTO deliveries
                            (
                                posts_id,
                                produce_id,
                                producer_id,
                                from_address,
                                from_city,
                                from_state,
                                to_address,
                                to_city,
                                to_state,
                                requestor_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id AS delivery_id;
                        """,
                        [
                            delivery.posts_id,
                            delivery.produce_id,
                            delivery.producer_id,
                            delivery.from_address,
                            delivery.from_city,
                            delivery.from_state,
                            delivery.to_address,
                            delivery.to_city,
                            delivery.to_state,
                            account_data["user_id"],
                        ]
                    )
                    delivery_id = cur.fetchone()[0]
                    old_data = delivery.dict()
                    old_data["requestor_id"] = account_data["user_id"]
                    return DeliveryOut(
                        delivery_id=delivery_id,
                        **old_data,
                    )
        except Exception as e:
            print(e)
            raise ValueError("Could not create delivery")
