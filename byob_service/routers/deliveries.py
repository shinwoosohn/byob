from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
from typing import List, Union
from authenticator import authenticator
from queries.deliveries import (
    Error,
    DeliveryIn,
    DeliveryOut,
    DeliveryUpdate,
    DeliveryRepo,
    DeliveryOutWithDriver,
    OrderAccept,
)


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# Create delivery endpoint
@router.post("/deliveries", response_model=Union[DeliveryOut, HttpError])
def create_delivery(
    info: DeliveryIn,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create_delivery(info, account_data)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create delivery with those credentials",
        )


#######################################################################################################
# GET ALL Deliveries
@router.get("/deliveries", response_model=List[DeliveryOutWithDriver])
def get_all_deliveries(
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["is_driver"]:
            return repo.get_all_deliveries()
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view this page"}
    except Exception:
        response.status_code = 400
        return {"message": "Cannot view deliveries list"}


#######################################################################################################
# GET Singular Delivery
@router.get("/deliveries/{delivery_id}", response_model=DeliveryOutWithDriver)
def get_delivery(
    delivery_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["is_driver"]:
            record = repo.get_delivery(delivery_id)
            if record is None:
                response.status_code = 404
                return {"message": "You are not authorized to view this page"}
            else:
                return record
    except Exception:
        response.status_code = 400
        return {"message": "Cannot view delivery details"}


#######################################################################################################
# PATCH Accept Driver Delivery Status
@router.patch("/deliveries/{delivery_id}/accept", response_model=Union[DeliveryUpdate, Error, HttpError])
def accept_delivery_status(
    delivery_id: int,
    response: Response,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_delivery(delivery_id)
        if account_data["is_driver"] and result["driver"]["driver_id"] is None:
            if result.order_status == 'ready':
                return repo.accept_delivery_status(delivery_id, info, account_data)
        else:
            response.status_code = 401
            return {"message": "You are unable to accept this delivery request"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot accept delivery request",
        )


#######################################################################################################
# PATCH Complete Driver Delivery Status
@router.patch("drivers/{driver_id}/deliveries/{delivery_id}/complete", response_model=Union[DeliveryUpdate, Error, HttpError])
def complete_delivery_status(
    driver_id: int,
    delivery_id: int,
    response: Response,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == driver_id:
            return repo.complete_delivery_status(driver_id, delivery_id, info, account_data)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to complete this delivery request"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot complete delivery request",
        )


#######################################################################################################
# GET Driver ALL Deliveries - where driver_id = current user_id
@router.get("/drivers/{driver_id}/deliveries", response_model=Union[List[DeliveryOutWithDriver], Error, HttpError])
def get_driver_deliveries(
    driver_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == driver_id:
            return repo.get_driver_deliveries(driver_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view these driver deliveries"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all driver deliveries",
        )


#######################################################################################################
# UPDATE Remove Driver Delivery by setting driver_id to null - removes driver_id and changes status back to pending
@router.put("/drivers/{driver_id}/deliveries/{delivery_id}", response_model=Union[DeliveryUpdate, Error, HttpError])
def remove_driver_delivery(
    driver_id: int,
    delivery_id: int,
    response: Response,
    info: DeliveryUpdate,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        result = repo.get_delivery(delivery_id)
        if account_data["user_id"] == result["driver"]["driver_id"]:
            return repo.remove_delivery_status(driver_id, delivery_id, info)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to remove this driver delivery"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update delivery with those credentials",
        )


#######################################################################################################
# GET User ALL Deliveries - where requestor_id = current user_id
@router.get("/users/{user_id}/deliveries/", response_model=List[DeliveryOutWithDriver])
def get_user_deliveries(
    user_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            return repo.get_user_deliveries(user_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view this user's delivery requests"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all user delivery requests",
        )


#######################################################################################################
# GET User Single Delivery - where requestor_id = current user_id
@router.get("/users/{user_id}/deliveries/{delivery_id}", response_model=DeliveryOutWithDriver)
def get_user_delivery(
    user_id: int,
    delivery_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            return repo.get_user_delivery(user_id, delivery_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view this user's delivery request"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view user delivery request",
        )


#######################################################################################################
# UPDATE User Single Delivery - where requestor_id = current user_id
@router.put("/users/{user_id}/deliveries/{delivery_id}", response_model=Union[DeliveryOut, Error, HttpError])
def update_user_delivery(
    user_id: int,
    delivery_id: int,
    response: Response,
    info: DeliveryIn,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            return repo.update_user_delivery(user_id, delivery_id, info)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to edit this user's delivery request"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update user delivery with those credentials",
        )


#######################################################################################################
# DELETE User Single Delivery - where requestor_id = current user_id
@router.delete("/users/{user_id}/deliveries/{delivery_id}", response_model=Union[bool, Error, HttpError])
def delete_user_delivery(
    user_id: int,
    delivery_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == user_id:
            return repo.delete_user_delivery(user_id, delivery_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to delete this user's delivery request"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete user delivery with those credentials",
        )



#######################################################################################################
# GET User ALL Orders - where producer_id = current user_id
@router.get("/users/{producer_id}/orders", response_model=Union[List[DeliveryOutWithDriver], Error, HttpError])
def get_user_orders(
    producer_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == producer_id:
            return repo.get_user_orders(producer_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view this user's orders"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all user's orders",
        )


#######################################################################################################
# GET User Single Order - where producer_id = current user_id
@router.get("/users/{producer_id}/orders/{delivery_id}", response_model=Union[DeliveryOutWithDriver, Error, HttpError])
def get_user_order(
    producer_id: int,
    delivery_id: int,
    response: Response,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == producer_id:
            return repo.get_user_order(producer_id, delivery_id)
        else:
            response.status_code = 401
            return {"message": "You are not authorized to view this user's order"}
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view user's order",
        )


#######################################################################################################
# PATCH User Single Order Status - where producer_id = current user_id
@router.patch("/users/{producer_id}/orders/{delivery_id}", response_model=Union[OrderAccept, HttpError])
def complete_order_status(
    producer_id: int,
    delivery_id: int,
    response: Response,
    info: OrderAccept,
    repo: DeliveryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data["user_id"] == producer_id:
            result = repo.get_user_order(producer_id, delivery_id)
            if result["order_status"] == 'pending':
                return repo.complete_order_status(producer_id, delivery_id, info, account_data)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot complete order request",
        )
