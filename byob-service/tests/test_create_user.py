from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo
from authenticator import authenticator


client = TestClient(app)


class MockUsersQueries:
    def create(fake_create_user_data):
        return [
            fake_create_user_data={
                "user_id": 1,
                "first_name": "Joe",
                "last_name": "Johnson",
                "email": "joe@johnson.com",
                "phone_number": "1234567890",
                "address": "123 Main Street",
                "city": "San Diego",
                "state": "California",
                "username": "JoeJohnson123",
                "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
                "avatar_url": "JoeProfilePic.jpeg",
            }
        ]


def account_override():
    return mock_user


def test_create_user():

    app.dependency_overrides[UsersRepo] = MockUsersQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("user")
    print(response)

    assert response.status_code == 200
    assert response.json() == [all_users_mock]

    app.dependency_overrides = {}
