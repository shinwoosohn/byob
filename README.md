# BYOB

**Team:**

- Edward Sohn - Software Developer
- Garrett Hoffman - Software Developer
- Timi Thompson - Software Developer
- David Jimenez - Software Developer

## Design

Project Link: https://byob1.gitlab.io/byob

Introducing BYOB, Bring your own backyard, a community-focused React application that aims to connect backyard gardeners with a platform to share their produce. BYOB is built using FastAPI and PostgreSQL to provide a robust and scalable backend architecture.

BYOB leverages Redux and RTK Query to manage state and provide efficient data fetching, ensuring a seamless front-end experience for users. The use of Tailwind also ensures a clean and modern user interface that is both responsive and user-friendly.

The application's main feature is the ability for users to create posts about the produce they grow in their backyards. The community-focused platform aims to promote sharing and community-building around the shared interest of homegrown produce. Users can create an account to join the community, create posts, and interact with other users by sharing each other's crops through a delivery system. (In construction now)

BYOB's backend architecture consists of a FastAPI server that provides endpoints for CRUD operations on the PostgreSQL database. The server's modularity allows for easy scaling and maintenance, while the use of database migrations ensures data consistency and schema updates.

## BYOB Wireframe Design

#### User Sign Up and Login

![User Sign Up and Login](https://i.gyazo.com/1a98b5fa7f344c06ed9243b50f0c9a0c.png)

#### List of Posts and Post Detail

![List of Posts and Post Detail](https://i.gyazo.com/3f124e450d9a2d18d75870845fdc04fb.png)

#### Create/Update Post/Produce Forms

![Create/Update Post/Produce Forms](https://i.gyazo.com/1c7a3a1c899efef62b892cf2e8cb9766.png)

#### Profile Page

![Profile Page](https://i.gyazo.com/0c89bbe89609c16aab9e4e2bc266e52e.png)

## Getting Started

Please have Docker Desktop downloaded before continuing with the following directions listed below.

#### Cloning the Repository

1. Inside your terminal, change to a directory that you would like to clone this project into.

2. In your terminal, type: `git clone https://gitlab.com/byob1/byob.git`

3. Switch into the project directory:

#### Starting up Docker

After running the commands above, type and press enter after each command listed below:

1. `docker volume create byob-data`

2. `docker volume create pg-admin`

3. `docker-compose build`

4. `docker-compose up`

After successfully following the steps outlined above, you should see all 4 containers running.

![Successful Docker containers](https://i.gyazo.com/7bb313354f6a532e06edbbec816f74ba.png)

#### Localhost Resources

- The port to view the React-based Front end is located at `http:localhost:3000`
- The port to view the FastAPI Documentation is located at `http:localhost:8000/docs`
- The port settings for the Database is located at `http:localhost:15432`

## API Outline

Byob-service directory contains migration, queries, and routers respective subdirectories that make up the entire backend.

- The migration directory contains the table setup for the PostgreSQL database along with some additional script that is created to import
  the tables upon running the script.

- The queries directory contains the pydantic models or query schema pictured below and is used to hold the Repository methods that will
  handle the SQL interaction with the database and later used within the router endpoint.

- The routers directory contains the actual endpoints along with any active user based authorization for accessing endpoints. The latter
  refers to an authorization on the individual routers for the correct user_id when specific routers such as the update or delete endpoints
  should only be able to be accessed by the author of the information.

The query schema is pictured in the below screenshot with the schema labeled 'In' being used as inputs for all create and update endpoints.
Utilizing data normalization and the SQL join methods, we have structured our tables to contain foreign key columns allowing for easy
data destructuring and combination without duplicating information.

See below for the respective endpoint inputs and outputs for how the query schema is utilized in which endpoint.

![Alt text](images/BYOB%20MVP%20Schema.png)

**FastAPI Endpoints:**
| Action | Method | URL |
|:---:|:---:|:---:|
| List of User| GET | http://localhost:8000/users |
| Create new User | POST | http://localhost:8000/users |
| Get User | GET | http://localhost:8000/users/{user_id} |
| Update User | PUT | http://localhost:8000/users/{user_id} |
| Update Driver | PUT | http://localhost:8000/users/{user_id}/driver |
| Delete User | DELETE | http://localhost:8000/users/{user_id} |

<details>
  <summary markdown="span">GET: List of User </summary>
Returns:

```
[
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
    "hashed_password": "$2b$12$0uc66BkfeTcMpGDiXtbgeezjP8B5RXNYXQ7oq4hKVHb83LNgvQEGu"
  },
  {
    "user_id": 3,
    "first_name": "string1",
    "last_name": "string1",
    "email": "string1",
    "phone_number": "string1",
    "address": "string1",
    "city": "string1",
    "state": "string1",
    "username": "string1",
    "avatar_url": "string1",
    "is_driver": false,
    "car_model": null,
    "license_plate": null,
    "dl_number": null,
    "hashed_password": "$2b$12$p6sNpik.8kNxd9E6/hvdfe2RDYU3yK9Yztzkq4Cpokz7SYyzyNZCS"
  }
]
```

</details>

<details>
  <summary markdown="span">POST: Creating a new User</summary>
Request Body:

```
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone_number": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "username": "string",
  "password": "string",
  "avatar_url": "string"
}
```

Returns:

```
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
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
    "is_driver": true,
    "car_model": "string",
    "license_plate": "string",
    "dl_number": "string"
  }
}
```

</details>

<details>
  <summary markdown="span">GET: User Detail</summary>
Returns:

```
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
  "hashed_password": "$2b$12$0uc66BkfeTcMpGDiXtbgeezjP8B5RXNYXQ7oq4hKVHb83LNgvQEGu"
}
```

</details>

<details>
  <summary markdown="span">PUT: Update User Detail</summary>
Returns:

```
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
  "is_driver": true,
  "car_model": "string",
  "license_plate": "string",
  "dl_number": "string"
}
```

Returns:

```
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
  "is_driver": true,
  "car_model": "string",
  "license_plate": "string",
  "dl_number": "string"
}
```

</details>

<details>
  <summary markdown="span">PUT: Update Driver Detail</summary>
Returns:

```
{
  "car_model": "string",
  "license_plate": "string",
  "dl_number": "string"
}
```

Returns:

```
{
  "car_model": "string",
  "license_plate": "string",
  "dl_number": "string"
}
```

</details>

<details>
  <summary markdown="span">DELETE: Delete User </summary>
Returns:

```
true
```

</details>

|         Action          | Method |                            URL                             |
| :---------------------: | :----: | :--------------------------------------------------------: |
|  List of User Produce   |  GET   |       http://localhost:8000/users/{user_id}/produce        |
| Create new User Produce |  POST  |       http://localhost:8000/users/{user_id}/produce        |
|    Get User Produce     |  GET   | http://localhost:8000/users/{user_id}/produce/{produce_id} |
|   Update User Produce   |  PUT   | http://localhost:8000/users/{user_id}/produce/{produce_id} |
|   Delete User Produce   | DELETE | http://localhost:8000/users/{user_id}/produce/{produce_id} |

<details>
  <summary markdown="span">GET: List of User Produce</summary>
Returns:

```
[
  {
    "produce_id": 1,
    "name": "string",
    "quantity": 0,
    "weight": 0,
    "description": "string",
    "image_url": "string",
    "exp_date": "2023-04-27",
    "is_decorative": true,
    "is_available": true,
    "price": 0,
    "user": {
      "user_id": 1,
      "username": "string"
    }
  },
  {
    "produce_id": 2,
    "name": "string",
    "quantity": 0,
    "weight": 0,
    "description": "string",
    "image_url": "string",
    "exp_date": "2023-04-27",
    "is_decorative": true,
    "is_available": true,
    "price": 0,
    "user": {
      "user_id": 1,
      "username": "string"
    }
  }
]
```

</details>

<details>
  <summary markdown="span">POST: Creating a new Produce</summary>
Request Body:

```
{
  "name": "string",
  "quantity": 0,
  "weight": 0,
  "description": "string",
  "image_url": "string",
  "exp_date": "2023-04-27",
  "is_decorative": true,
  "is_available": true,
  "price": 0.0,
}
```

Returns:

```
{
  "produce_id": 3,
  "name": "string",
  "quantity": 0,
  "weight": 0,
  "description": "string",
  "image_url": "string",
  "exp_date": "2023-04-27",
  "is_decorative": true,
  "is_available": true,
  "price": 0.0,
  "owner_id": 1
}
```

</details>

<details>
  <summary markdown="span">GET: User Produce Detail</summary>
Returns:

```
{
    "produce_id": 1,
    "name": "string",
    "quantity": 0,
    "weight": 0,
    "description": "string",
    "image_url": "string",
    "exp_date": "2023-04-27",
    "is_decorative": true,
    "is_available": true,
    "price": 0,
    "user": {
      "user_id": 1,
      "username": "string"
    }
}
```

</details>

<details>
  <summary markdown="span">PUT: Update User Produce Detail</summary>
Returns:

```
{
  "name": "string",
  "quantity": 0,
  "weight": 0,
  "description": "string",
  "image_url": "string",
  "exp_date": "2023-04-27",
  "is_decorative": true,
  "is_available": true,
  "price": 0.0,
}
```

Returns:

```
{
  "produce_id": 3,
  "name": "string",
  "quantity": 0,
  "weight": 0,
  "description": "string",
  "image_url": "string",
  "exp_date": "2023-04-27",
  "is_decorative": true,
  "is_available": true,
  "price": 0.0,
  "owner_id": 1
}
```

</details>

<details>
  <summary markdown="span">DELETE: Delete User Produce</summary>
Returns:

```
true
```

</details>

|     Action      | Method |                  URL                   |
| :-------------: | :----: | :------------------------------------: |
|  List of Post   |  GET   |      http://localhost:8000/posts       |
| Create new Post |  POST  |      http://localhost:8000/posts       |
|    Get Post     |  GET   | http://localhost:8000/posts/{posts_id} |
|   Update Post   |  PUT   | http://localhost:8000/posts/{posts_id} |
|   Delete Post   | DELETE | http://localhost:8000/posts/{posts_id} |

<details>
  <summary markdown="span">GET: List of Post</summary>
Returns:

```
[
  {
    "posts_id": 1,
    "post_created": "2023-04-27T22:54:15.173102",
    "text": "string",
    "postimg_url": "string",
    "poster_id": 1,
    "produce": {
      "produce_id": null,
      "name": null,
      "quantity": null,
      "weight": null,
      "description": null,
      "image_url": null,
      "exp_date": null,
      "is_decorative": null,
      "is_available": null,
      "price": null
    },
    "user": {
      "user_id": 1,
      "username": "string",
      "avatar_url": "string"
    }
  },
  {
    "posts_id": 2,
    "post_created": "2023-04-27T22:54:43.376857",
    "text": "string",
    "postimg_url": "string",
    "poster_id": 1,
    "produce": {
      "produce_id": 3,
      "name": "string",
      "quantity": 0,
      "weight": 0,
      "description": "string",
      "image_url": "string",
      "exp_date": "2023-04-27",
      "is_decorative": true,
      "is_available": true,
      "price": 0
    },
    "user": {
      "user_id": 1,
      "username": "string",
      "avatar_url": "string"
    }
  }
]
```

</details>

<details>
  <summary markdown="span">POST: Creating a new Post</summary>
Request Body:

```
{
  "text": "string",
  "postimg_url": "string",
  "produce_id": 3,
  "poster_id": 0
}
```

Returns:

```
{
  "posts_id": 2,
  "post_created": "2023-04-27T22:59:26.723Z",
  "text": "string",
  "postimg_url": "string",
  "produce_id": 3,
  "poster_id": 1
}
```

</details>

<details>
  <summary markdown="span">GET: Post Detail</summary>
Returns:

```
{
    "posts_id": 2,
    "post_created": "2023-04-27T22:54:43.376857",
    "text": "string",
    "postimg_url": "string",
    "poster_id": 1,
    "produce": {
      "produce_id": 3,
      "name": "string",
      "quantity": 0,
      "weight": 0,
      "description": "string",
      "image_url": "string",
      "exp_date": "2023-04-27",
      "is_decorative": true,
      "is_available": true,
      "price": 0
    },
    "user": {
      "user_id": 1,
      "username": "string",
      "avatar_url": "string"
    }
}
```

</details>

<details>
  <summary markdown="span">PUT: Update Post Detail</summary>
Returns:

```
{
  "text": "string",
  "postimg_url": "string",
  "produce_id": 3,
  "poster_id": 0
}
```

Returns:

```
{
  "posts_id": 2,
  "post_created": "2023-04-27T22:59:26.723Z",
  "text": "string",
  "postimg_url": "string",
  "produce_id": 3,
  "poster_id": 1
}
```

</details>

<details>
  <summary markdown="span">DELETE: Delete Post</summary>
Returns:

```
true
```

</details>
