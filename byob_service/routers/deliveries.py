from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.deliveries import DeliveryIn, DeliveryOut, DeliveryUpdate, DeliveryRepo


router = APIRouter()


# Create delivery endpoint
@router.post("/deliveries", response_model=DeliveryOut)
def create_delivery() -> DeliveryOut:
    pass


#######################################################################################################
# GET ALL Deliveries



#######################################################################################################
# GET Singular Delivery



#######################################################################################################
# GET Driver ALL Deliveries - where driver_id = current user_id



#######################################################################################################
# UPDATE Driver Delivery Status



#######################################################################################################
# DELETE Driver Delivery Delivery - removes driver_id and changes status back to pending



#######################################################################################################
# GET User ALL Deliveries - where requestor_id = current user_id



#######################################################################################################
# GET User Single Delivery - where requestor_id = current user_id



#######################################################################################################
# UPDATE User Single Delivery - where requestor_id = current user_id



#######################################################################################################
# DELETE User Single Delivery - where requestor_id = current user_id



#######################################################################################################
# GET User ALL Orders - where producer_id = current user_id



#######################################################################################################
# GET User Single Order - where producer_id = current user_id



#######################################################################################################
# UPDATE User Single Order Status - where producer_id = current user_id
