## Journal

### Tuesday April 25,2023

Today I continued working on the unit test for create produce and believe it is is complete
I learned that unit test will only work in deployment and not locally... i wasted some time wondering why my unit test were no working...

Other things done

- Merged and debugged the delivery form to work properly
-

### Monday April 24,2023

### Friday April 21, 2023

### Thursday April 20, 2023

created the update Delivery form
Had some tailwind issues. Turns out i did not complete the set up - I was missing

```
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: [
    "..."
    "./src/**/*.{js,jsx,ts,tsx}",    <----THIS
  ],
  theme: {
    extend: {
      colors: {
        "byob-cyan": "#dfebe9",
      },
    },
  },
  plugins: [],
};

```

### Wednesday April 19, 2023

created the delivery form with drop down for post and produce that pulls data from the User data

### Tuesday April 18, 2023

Todays main focus was on creating a form for users to create a produce to add to their inventory

I created a file **_CreateProduceForm_** under the **_Produce_** directory in the **_src_** directory

**_The Good_**

- Form is up and appears on the website
- Most if not all the code is done
- The Nav link to the form Works

**_The Bad_**

- When creating the

### Monday April 17, 2023

Sick day. Did not do much

### Wednesday April 12, 2023 **_Spring Break_**

- Edward and I worked on learning Tailwind CSS React
- We got our NavBar up with search bar and a user profile picture
- The Sidebar is up as well but does not look how we want it to. Were still learning the Tailwind class names and will continue to adjust
- As a team we caught up and talked about plans on approaching more frontend stuff. Pretty much learning TailWind CSS

### Friday April 7, 2023

- I created the get_all_produce method to get a list of produce for users as well as the router.

```
 def get_all_produce(
        self, user_id: int
    ) -> Union[List[ProduceGetOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT pr.id AS produce_id
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id AS user_id
                            , u.username
                        FROM produce pr
                        LEFT JOIN users u
                        ON pr.owner_id = u.id
                        WHERE u.id = %s
                        GROUP BY pr.id
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id
                            , u.username
                        ORDER BY pr.exp_date DESC
                        """,
                        [user_id],
                    )
                    rows = cur.fetchall()
                    return [
                        self.produce_record_to_dict(row, cur.description)
                        for row in rows
                    ]

        except Exception:
            return {"message": "Could not get list of produce"}


# GET ALL  produce endpoint
@router.get(
    "/users/{user_id}/produce",
    response_model=Union[List[ProduceGetOut], HttpError],
)
def get_all_produce(
    user_id: int,
    repo: ProduceRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all_produce(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot view all produce",
        )

```

- Spent some time **Garrett** getting his methods and routers for the **_post_** set up and running on our docs page

### Thursday April 6, 2023

### Wednesday April 5, 2023

- Created the Post method for Produce

```
    def create(self, produce: ProduceIn, account_data: dict) -> ProduceOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result=cur.execute(
                        """
                        INSERT INTO produce
                            (quantity,weight,description,image_url,exp_date,is_decorative,is_available,price,owner_id)
                        VALUES
                            (%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        RETURNING id AS produce_id;
                        """,
                        [
                            produce.quantity,
                            produce.weight,
                            produce.description,
                            produce.image_url,
                            produce.exp_date,
                            produce.is_decorative,
                            produce.is_available,
                            produce.price,
                            account_data["user_id"]
                        ]
                    )
                    produce_id = cur.fetchone()[0]
                    old_data = produce.dict()
                    old_data["owner_id"] = account_data["user_id"]
                    return ProduceOut(
                        produce_id=produce_id,
                        **old_data,
                    )
        except Exception as e:
            raise ValueError("Could not create produce")

```

FastApi Doc is working

### Tuesday April 4, 2023

- Worked on FrontEnd Sign up

### Monday April 3, 2023

added update user method query and router

```
    def update_user_profile(self, user_id: int, user:UsersIn) -> Optional[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE users
                        SET first_name = %s
                          , last_name = %s
                          , email = %s
                          , phone_number = %s
                          , address = %s
                          , city = %s
                          , state = %s
                          , username = %s
                          , hashed_password = %s
                          , avatar_url = %s
                        WHERE id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.phone_number,
                            user.address,
                            user.city,
                            user.state,
                            user.username,
                            user.hashed_password,
                            user.avatar_url,
                            user_id

                        ]
                    )

                    return self.record_to_user_update(user_id,user)
        except Exception as e:
            print(e)
            return {"message":"Could not update Profile"}

            .....

        def record_to_user_update(self, record):
        return UsersOutWithPassword(
            user_id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            phone_number=record[4],
            address=record[5],
            city=record[6],
            state=record[7],
            username=record[8],
            hashed_password=record[9],
            avatar_url=record[10]
        )


------------------------------------------------------------

@router.put("/users/{user_id}", response_model=UsersOut)
def update_user(
    user_id: int,
    user: UsersIn,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    return repo.update_user_profile(user_id, user)


```

### Thursday March 30, 2023

Merged the **users_migration.** into main

Helped eddie create the users query

```
from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class UsersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: str
    city: str
    state: str
    username: str
    password: str
    avatar_url: Optional[str]


class UsersOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    address: str
    city: str
    state: str
    username: str
    password: str
    avatar_url: Optional[str]
    is_driver: bool
    car_model: Optional[str]
    license_plate: Optional[str]
    dl_number: Optional[str]


class UsersOutWithPassword(UsersOut):
    hashed_password: str


```

### Wednesday March 29, 2023

Helped Timi Navigate the set up of the Docker-compose.yaml file

Created 2 volumes:

- byob-data
- pg-admin

Created 3 services:

- byob-service ->
- ghi -> React stuff
- postgres -> SQL database

Implemented **001_users_migration.py** into **migrations** folder, under the **byob-service**

```
steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(25) NOT NULL,
            last_name VARCHAR(25) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone_number VARCHAR(25) UNIQUE NOT NULL,
            address VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(15) NOT NULL,
            username VARCHAR(25) UNIQUE NOT NULL,
            hashed_password VARCHAR(1000) NOT NULL,
            avatar_url VARCHAR(1000),
            is_driver BOOL DEFAULT FALSE,
            car_model VARCHAR(25),
            license_plate VARCHAR(25) UNIQUE,
            dl_number VARCHAR(25) UNIQUE
        );
        """,
        """
        DROP TABLE users;
        """
    ]
]
```
