steps = [
    [
    """
    CREATE TABLE users (
        id SERIAL PRIMARY KEY NOT NULL,
        first_name VARCHAR(25) NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone_number VARCHAR(25) NOT NULL,
        address VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(15) NOT NULL,
        username VARCHAR(25) NOT NULL,
        password VARCHAR(25) NOT NULL,
        avatar_url VARCHAR(1000),
        is_driver BOOL DEFAULT FALSE NOT NULL,
        car_model VARCHAR(25),
        license_plate VARCHAR(25),
        dl_number VARCHAR(25)

    );
    """,
    """
    DROP TABLE users
    """
    ]
]
