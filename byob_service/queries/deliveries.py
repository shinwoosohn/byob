from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from queries.pool import pool


class Error(BaseModel):
    message: str


class DeliveryIn(BaseModel):
    posts_id: Optional[int]
    produce_id: int
    producer_id: int
    order_quantity: int
    from_address: str
    from_city: str
    from_state: str
    to_address: str
    to_city: str
    to_state: str
    requestor_id: Optional[int]
    order_status: Optional[str]


class DeliveryOut(BaseModel):
    delivery_id: int
    posts_id: Optional[int]
    produce_id: int
    producer_id: int
    order_quantity: int
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
    delivery_id: Optional[int]
    order_status: str
    order_quantity: Optional[int]


class DeliveryUpdate(BaseModel):
    delivery_id: Optional[int]
    delivery_status: str
    driver_id: Optional[int]


class DeliveryProduce(BaseModel):
    produce_id: int
    name: str
    quantity: int
    weight: int
    description: str
    image_url: str
    exp_date: date
    is_decorative: bool
    is_available: bool
    price: float


class DeliveryDriver(BaseModel):
    driver_id: Optional[int]
    phone_number: Optional[str]
    car_model: Optional[str]
    license_plate: Optional[str]
    dl_number: Optional[str]


class DeliveryOutWithDriver(BaseModel):
    delivery_id: int
    posts_id: Optional[int]
    producer_id: int
    order_quantity: int
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
    produce: DeliveryProduce
    driver: Optional[DeliveryDriver]


class DeliveryRepo:
    #######################################################################################################
    # Create a Delivery method
    def create_delivery(self, delivery: DeliveryIn, account_data: dict) -> Union[DeliveryOut, Error]:
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
                                order_quantity,
                                from_address,
                                from_city,
                                from_state,
                                to_address,
                                to_city,
                                to_state,
                                requestor_id
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id AS delivery_id;
                        """,
                        [
                            delivery.posts_id,
                            delivery.produce_id,
                            delivery.producer_id,
                            delivery.order_quantity,
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
        except Exception:
            raise ValueError("Could not create delivery request")


    #######################################################################################################
    # GET ALL Delivery method
    def get_all_deliveries(self) -> Union[List[DeliveryOutWithDriver], ValueError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
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
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        ORDER BY pr.exp_date DESC;
                        """
                    )
                    rows = cur.fetchall()
                    return [
                        self.delivery_record_to_dict(row, cur.description)
                        for row in rows
                    ]
        except Exception:
            raise ValueError("Could not get deliveries")


    #######################################################################################################
    # GET Delivery by delivery_id method
    def get_delivery(self, delivery_id: int) -> Union[DeliveryOutWithDriver, ValueError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.id = %s;
                        """,
                        [delivery_id]
                    )
                    row = cur.fetchone()
                    return self.delivery_record_to_dict(row, cur.description)
        except Exception:
            raise ValueError("Could not get delivery")


    #######################################################################################################
    # PATCH Delivery by delivery_id method
    def accept_delivery_status(self, delivery_id: int, delivery: DeliveryUpdate, account_data: dict) -> Union[DeliveryUpdate, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE deliveries
                        SET delivery_status = 'accepted'
                        WHERE id = %s;
                        """,
                        [
                            delivery.delivery_status,
                            delivery_id,
                        ]
                    )
                    old_data = delivery.dict()
                    old_data["driver_id"] = account_data["user_id"]
                    return DeliveryUpdate(**old_data)
        except Exception:
            raise ValueError("Could not accept delivery request")


    #######################################################################################################
    # PATCH Delivery by driver_id and delivery_id method
    def complete_delivery_status(self, driver_id: int, delivery_id: int, delivery: DeliveryUpdate, account_data: dict) -> Union[DeliveryUpdate, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE deliveries
                        SET delivery_status = 'completed'
                        WHERE driver_id = %s and id = %s;
                        """,
                        [
                            delivery.delivery_status,
                            delivery_id,
                        ]
                    )
                    driver_id = driver_id
                    old_data = delivery.dict()
                    return DeliveryUpdate(driver_id, **old_data)
        except Exception:
            raise ValueError("Could not complete delivery request")


    #######################################################################################################
    # GET Deliveries by driver_id
    def get_driver_deliveries(self, driver_id: int) -> Union[List[DeliveryOutWithDriver], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.driver_id = %s
                        GROUP BY d.id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        ORDER BY pr.exp_date DESC;
                        """,
                        [driver_id]
                    )
                    rows = cur.fetchall()
                    return [
                        self.delivery_record_to_dict(row, cur.description)
                        for row in rows
                    ]
        except Exception:
            return {"message": "Could not get driver deliveries"}


    #######################################################################################################
    # UPDATE Remove Driver Delivery by setting driver_id to null
    def remove_delivery_status(self, driver_id: int, delivery_id: int, delivery: DeliveryUpdate, account_data: dict) -> Union[DeliveryUpdate, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE deliveries
                        SET delivery_status = 'pending'
                            , driver_id = null
                        WHERE driver_id = %s and id = %s;
                        """,
                        [
                            delivery.delivery_status,
                            delivery.driver_id,
                            delivery_id,
                        ]
                    )
                    old_data = delivery.dict()
                    return DeliveryUpdate(**old_data)
        except Exception:
            raise ValueError("Could not remove delivery request")


    #######################################################################################################
    # GET User ALL Deliveries - where requestor_id = current user_id
    def get_user_deliveries(self, user_id: int) -> Union[List[DeliveryOutWithDriver], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.requestor_id = %s
                        GROUP BY d.id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        ORDER BY pr.exp_date DESC;
                        """,
                        [user_id]
                    )
                    rows = cur.fetchall()
                    return [
                        self.delivery_record_to_dict(row, cur.description)
                        for row in rows
                    ]
        except Exception:
            return {"message": "Could not get user delivery requests"}

    #######################################################################################################
    # GET User single Delivery - where requestor_id = current user_id
    def get_user_delivery(self, user_id: int, delivery_id: int) -> Union[DeliveryOutWithDriver, ValueError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.requestor_id = %s and d.id = %s;
                        """,
                        [user_id, delivery_id]
                    )
                    row = cur.fetchone()
                    return self.delivery_record_to_dict(row, cur.description)
        except Exception:
            ValueError("Could not get user delivery request")


    #######################################################################################################
    # UPDATE User single Delivery - where requestor_id = current user_id
    def update_user_delivery(self, user_id: int, delivery_id: int, delivery: DeliveryIn) -> Union[DeliveryOut, ValueError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE deliveries
                        SET posts_id = %s
                            , produce_id = %s
                            , producer_id = %s
                            , order_quantity = %s
                            , from_address = %s
                            , from_city = %s
                            , from_state = %s
                            , to_address = %s
                            , to_city = %s
                            , to_state = %s
                        WHERE requestor_id = %s and id = %s;
                        """,
                        [
                            delivery.posts_id,
                            delivery.produce_id,
                            delivery.producer_id,
                            delivery.order_quantity,
                            delivery.from_address,
                            delivery.from_city,
                            delivery.from_state,
                            delivery.to_address,
                            delivery.to_city,
                            delivery.to_state,
                            delivery.requestor_id,
                            delivery_id,
                        ]
                    )
                    delivery_id = delivery_id
                    old_data = delivery.dict()
                    old_data["requestor_id"] = user_id
                    return DeliveryOut(delivery_id=delivery_id, **old_data)
        except Exception:
            raise ValueError("Could not update delivery request")


    #######################################################################################################
    # DELETE User single Delivery - where requestor_id = current user_id
    def delete_user_delivery(self, user_id: int, delivery_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM deliveries
                        WHERE requestor_id = %s and id = %s;
                        """,
                        [user_id, delivery_id],
                    )
                    return True
        except Exception:
            return False


    #######################################################################################################
    # GET User ALL Orders - where producer_id = current user_id
    def get_user_orders(self, producer_id: int) -> Union[List[DeliveryOutWithDriver], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.producer_id = %s
                        GROUP BY d.id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        ORDER BY pr.exp_date DESC;
                        """,
                        [producer_id]
                    )
                    rows = cur.fetchall()
                    return [
                        self.delivery_record_to_dict(row, cur.description)
                        for row in rows
                    ]
        except Exception:
            return {"message": "Could not get user orders"}


    #######################################################################################################
    # GET User Single Order - where producer_id = current user_id
    def get_user_order(self, producer_id: int, delivery_id: int) -> Union[DeliveryOutWithDriver, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # SELECT SQL statement
                        """
                        SELECT d.id AS delivery_id
                            , d.posts_id
                            , d.producer_id
                            , d.order_quantity
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
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , d.driver_id
                            , u.phone_number
                            , u.car_model
                            , u.license_plate
                            , u.dl_number
                        FROM deliveries d
                        LEFT JOIN produce pr
                        ON d.produce_id = pr.id
                        LEFT JOIN users u
                        ON d.driver_id = u.id
                        WHERE d.producer_id = %s and d.id = %s;
                        """,
                        [producer_id, delivery_id]
                    )
                    row = cur.fetchone()
                    return self.delivery_record_to_dict(row, cur.description)
        except Exception:
            return {"message": "Could not get user order"}


    #######################################################################################################
    # PATCH User Single Order Status - where producer_id = current user_id
    def complete_order_status(self, producer_id: int, delivery_id: int, delivery: OrderAccept, account_data: dict) -> Union[OrderAccept, ValueError]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE deliveries
                        SET order_status = 'ready'
                        WHERE producer_id = %s and id = %s;
                        """,
                        [
                            delivery.order_status,
                            producer_id,
                            delivery_id,
                        ]
                    )
                    old_data = delivery.dict()
                    return OrderAccept(**old_data)
        except Exception:
            raise ValueError("Could not complete order request")


    #*************************************Encoder**********************************************#
    # method to translate deliveries into proper dictionary structure
    def delivery_record_to_dict(self, row, description):
        delivery = None
        if row is not None:
            delivery = {}
            delivery_fields = [
                "delivery_id",
                "posts_id",
                "producer_id",
                "order_quantity",
                "from_address",
                "from_city",
                "from_state",
                "to_address",
                "to_city",
                "to_state",
                "requestor_id",
                "order_status",
                "delivery_status",
                "request_created",
            ]
            for i, column in enumerate(description):
                if column.name in delivery_fields:
                    delivery[column.name] = row[i]


            produce = {}
            produce_fields = [
                "produce_id",
                "name",
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
            delivery["produce"] = produce


            driver = {}
            driver_fields = [
                "driver_id",
                "phone_number",
                "car_model",
                "license_plate",
                "dl_number",
            ]
            for i, column in enumerate(description):
                if column.name in driver_fields:
                    driver[column.name] = row[i]
            delivery["driver"] = driver
        return delivery
