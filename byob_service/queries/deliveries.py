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


class DeliveryDriver(BaseModel):
    driver_id: Optional[int]
    phone_number: Optional[str]
    car_model: Optional[str]
    license_plate: Optional[str]
    dl_number: Optional[str]


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
    driver: Optional[DeliveryDriver]


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


    ###################################################################################
    # GET ALL Delivery method
    def get_all_deliveries(self) -> List[DeliveryOutWithDriver]:
        try:
            with pool.connection as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.from_address
                            , d.from_city
                            , d.from_state
                            , d.to_address
                            , d.to_city
                            , d.to_state
                            , d.requestor_id
                            , d.order_status
                            , d.delivery_status
                            , d.request_created
                            , pr.id AS produce_id
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id AS driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        GROUP BY d.id
                            , d.posts_id
                            , d.producer_id
                            , d.from_address
                            , d.from_city
                            , d.from_state
                            , d.to_address
                            , d.to_city
                            , d.to_state
                            , d.requestor_id
                            , d.order_status
                            , d.delivery_status
                            , d.request_created
                            , pr.id
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        ORDER BY pr.exp_date DESC
                        """
                    )
                    rows = cur.fetchall()
                    return [
                        self.delivery_record_to_dict(row, cur.description)
                        for row in rows
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get deliveries"}


    ###################################################################################
    # GET Delivery by delivery_id method
