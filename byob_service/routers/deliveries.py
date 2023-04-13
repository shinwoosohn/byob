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
#
