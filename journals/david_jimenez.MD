## Journal

### Thursday April 4, 2023

### Wednesday April 3, 2023

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

### Thursday March 30, 2023

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
