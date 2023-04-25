from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo
from authenticator import authenticator

client = TestClient(app)


class FakeUserRepo:
    def get_all_users(self):
        return [
            {
                "user_id": 1,
                "first_name": "string",
                "last_name": "string",
                "email": "string",
                "phone_number": "string",
                "address": "string",
                "city": "string",
                "state": "string",
                "username": "string",
                "avatar_url": "string",
                "is_driver": false,
                "car_model": null,
                "license_plate": null,
                "dl_number": null,
                "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
            }
        ]


def fake_get_current_account_data():
    return {
        "user_id": 1,
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "phone_number": "string",
        "address": "string",
        "city": "string",
        "state": "string",
        "username": "string",
        "avatar_url": "string",
        "is_driver": false,
        "car_model": null,
        "license_plate": null,
        "dl_number": null,
        "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
    }


def test_get_all_users():
    app.dependency_overrides[UsersRepo] = FakeUserRepo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data

    response = client.get("/users")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "user_id": 1,
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "phone_number": "string",
            "address": "string",
            "city": "string",
            "state": "string",
            "username": "string",
            "avatar_url": "string",
            "is_driver": false,
            "car_model": null,
            "license_plate": null,
            "dl_number": null,
            "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
        }
    ]
