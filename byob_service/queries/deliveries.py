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
    pass
