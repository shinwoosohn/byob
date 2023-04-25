# from fastapi import FastAPI
from fastapi.testclient import TestClient
from fastapi import status
from main import app
from authenticator import authenticator
from queries.produce import ProduceRepo


client = TestClient(app)

def fake_get_current_data():
    fake_account = {
        "user_id": 0,
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "phone_number": "string",
        "address": "string",
        "city": "string",
        "state": "string",
        "username": "string",
        "avatar_url": "string",
        "is_driver": True,
        "car_model": "string",
        "license_plate": "string",
        "dl_number": "string",
        "hashed_password": "string"
        }
    return fake_account

class CreateProduceRepo:
    def create(self, produce):
        result = {
            "name": "string",
            "quantity": 0,
            "weight": 0,
            "description": "string",
            "image_url": "string",
            "exp_date": "2023-04-25",
            "is_decorative": True,
            "is_available": True,
            "price": 0,
            "owner_id": 0
        }
        result.update(produce)

        return produce

def test_create_produce():
    app.dependency_overrides[ProduceRepo] = CreateProduceRepo
    app.dependency_overrides[
        authenticator.try_get_current_data
    ] = fake_get_current_data

    response = client.post("/user/${user_id}/produce", json={
        "name": "carrot",
        "quantity": "12",
        "weight": "10lbs",
        "description": "orange,pointy,good for rabbits",
        "image_url": "blank",
        "exp_date": "2025-10-12",
        "is_decorative": True,
        "is_available": True,
        "price": "10",
    })

    app.dependency_overrides = {}
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "Produce Creation Success"}
