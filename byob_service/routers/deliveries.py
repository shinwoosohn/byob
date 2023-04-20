from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.deliveries import (
    DeliveryIn,
    DeliveryOut,
    DeliveryUpdate,
    DeliveryRepo,
    DeliveryOutWithDriver,
    OrderAccept,
)


router = APIRouter()


# Create delivery endpoint
@router.post("/deliveries", response_model=DeliveryOut)
def create_delivery(
    info: DeliveryIn,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> DeliveryOut:
    pass


#######################################################################################################
# GET ALL Deliveries
@router.get("/deliveries", response_model=List[DeliveryOutWithDriver])
def get_all_deliveries(
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET Singular Delivery
@router.get("/deliveries/{delivery_id}", response_model=DeliveryOutWithDriver)
def get_delivery(
    delivery_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# PATCH Accept Driver Delivery Status
@router.patch("/deliveries/{delivery_id}/accept", response_model=DeliveryUpdate)
def accept_delivery_status(
    delivery_id: int,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# PATCH Complete Driver Delivery Status
@router.patch("drivers/{driver_id}/deliveries/{delivery_id}/complete", response_model=DeliveryUpdate)
def complete_delivery_status(
    driver_id: int,
    delivery_id: int,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET Driver ALL Deliveries - where driver_id = current user_id
@router.get("/drivers/{driver_id}/deliveries", response_model=List[DeliveryOutWithDriver])
def get_driver_deliveries(
    driver_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# UPDATE Remove Driver Delivery by setting driver_id to null - removes driver_id and changes status back to pending
@router.put("/drivers/{driver_id}/deliveries/{delivery_id}", response_model=DeliveryUpdate)
def remove_driver_delivery(
    driver_id: int,
    delivery_id: int,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET User ALL Deliveries - where requestor_id = current user_id
@router.get("/users/{user_id}/deliveries/", response_model=List[DeliveryOutWithDriver])
def get_user_deliveries(
    user_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET User Single Delivery - where requestor_id = current user_id
@router.get("/users/{user_id}/deliveries/{delivery_id}", response_model=DeliveryOutWithDriver)
def get_user_delivery(
    user_id: int,
    delivery_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# UPDATE User Single Delivery - where requestor_id = current user_id
@router.put("/users/{user_id}/deliveries/{delivery_id}", response_model=DeliveryOutWithDriver)
def update_user_delivery(
    user_id: int,
    delivery_id: int,
    info: DeliveryIn,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# DELETE User Single Delivery - where requestor_id = current user_id
@router.delete("/users/{user_id}/deliveries/{delivery_id}", response_model=bool)
def delete_user_delivery(
    user_id: int,
    delivery_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET User ALL Orders - where producer_id = current user_id
@router.get("/users/{producer_id}/orders", response_model=List[DeliveryOutWithDriver])
def get_user_orders(
    producer_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# GET User Single Order - where producer_id = current user_id
@router.get("/users/{producer_id}/orders/{delivery_id}", response_model=DeliveryOutWithDriver)
def get_user_order(
    producer_id: int,
    delivery_id: int,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass


#######################################################################################################
# PATCH User Single Order Status - where producer_id = current user_id
@router.patch("/users/{producer_id}/orders/{delivery_id}", response_model=OrderAccept)
def complete_order_status(
    producer_id: int,
    delivery_id: int,
    info: OrderAccept,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass
