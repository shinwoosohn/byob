from fastapi.testclient import TestClient
from main import app
from queries.posts import PostsRepo
from authenticator import authenticator


client = TestClient(app)


class PostsQueries:
    def get_all_post(self):
        return [post_mock]


post_mock = {
    "posts_id": 1,
    "post_created": "2023-04-26T06:08:07.602000+00:00",
    "text": "string",
    "postimg_url": "string",
    "poster_id": 1,
    "produce": {
      "produce_id": 1,
      "name": "string",
      "quantity": 10,
      "weight": 10,
      "description": "string",
      "image_url": "string",
      "exp_date": "2023-04-26",
      "is_decorative": False,
      "is_available": True,
      "price": 0.0
    },
    "user": {
      "user_id": 1,
      "username": "string",
      "avatar_url": "string"
    }
}


mock_user = {
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
    "is_driver": True,
    "car_model": "string",
    "license_plate": "string",
    "dl_number": "string",
    "hashed_password": "string"
}


def account_override():
    return mock_user


def test_get_all_posts_protected():

    app.dependency_overrides[PostsRepo] = PostsQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    #Act
    response = client.get("/posts")

    app.dependency_overrides = {}

    #Assert
    assert response.status_code == 200
    assert response.json() == [post_mock]



def test_init():
    assert 1 == 1
