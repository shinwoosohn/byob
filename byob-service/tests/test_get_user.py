from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo
from authenticator import authenticator


client = TestClient(app)


class MockUsersRepo:
    def get_user(self, user_id: 1):
            result = {
                "user_id": 1,
                "first_name": "Joe",
                "last_name": "Johnson",
                "email": "joe@johnson.com",
                "phone_number": "1234567890",
                "address": "123 Main Street",
                "city": "San Diego",
                "state": "California",
                "username": "JoeJohnson123",
                "avatar_url": "JoeProfilePic.jpeg",
                "is_driver": True,
                "car_model": "string",
                "license_plate": "string",
                "dl_number": "string",
                "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
            }
            return result

def fake_get_current_account_data():
    return {
            "user_id": 1,
            "first_name": "Joe",
            "last_name": "Johnson",
            "email": "joe@johnson.com",
            "phone_number": "1234567890",
            "address": "123 Main Street",
            "city": "San Diego",
            "state": "California",
            "username": "JoeJohnson123",
            "avatar_url": "JoeProfilePic.jpeg",
            "is_driver": True,
            "car_model": "string",
            "license_plate": "string",
            "dl_number": "string",
            "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
    }



def test_get_user():

    app.dependency_overrides[UsersRepo] = MockUsersRepo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data

    response = client.get("/users/1")

    app.dependency_overrides = {}


    assert response.status_code == 200
    assert response.json() == {
            "user_id": 1,
            "first_name": "Joe",
            "last_name": "Johnson",
            "email": "joe@johnson.com",
            "phone_number": "1234567890",
            "address": "123 Main Street",
            "city": "San Diego",
            "state": "California",
            "username": "JoeJohnson123",
            "avatar_url": "JoeProfilePic.jpeg",
            "is_driver": True,
            "car_model": "string",
            "license_plate": "string",
            "dl_number": "string",
            "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
        }
