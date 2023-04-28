from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator
from queries.posts import PostsRepo


client = TestClient(app)


class PostsQueries:
    def get_post(self, posts_id: 2):
        post_mock = {
            "posts_id": 2,
            "post_created": "2023-04-27T02:59:05.555073",
            "text": "string",
            "postimg_url": "string",
            "poster_id": 2,
            "produce": {
                "produce_id": 2,
                "name": "string",
                "quantity": 20,
                "weight": 20,
                "description": "string",
                "image_url": "string",
                "exp_date": "2023-04-28",
                "is_decorative": True,
                "is_available": True,
                "price": 20.22
            },
            "user": {
                "user_id": 2,
                "username": "string",
                "avatar_url": "string"
            }
        }

        return post_mock


def fake_get_current_account_data():
    return {
        "user_id": 2,
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
        "hashed_password": "$2b$12$esVcCggUoG7xmv2HogSqSuCOq/7QidUvxcAtVzuVSRYnA690O2s86",
    }



def test_get_post_protected():
    app.dependency_overrides[PostsRepo] = PostsQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data

    response = client.get("/posts/2")

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "posts_id": 2,
        "post_created": "2023-04-27T02:59:05.555073",
        "text": "string",
        "postimg_url": "string",
        "poster_id": 2,
        "produce": {
            "produce_id": 2,
            "name": "string",
            "quantity": 20,
            "weight": 20,
            "description": "string",
            "image_url": "string",
            "exp_date": "2023-04-28",
            "is_decorative": True,
            "is_available": True,
            "price": 20.22
        },
        "user": {
            "user_id": 2,
            "username": "string",
            "avatar_url": "string"
        }
    }
