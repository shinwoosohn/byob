steps = [
    [
        """
        CREATE TABLE produce (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            quantity SMALLINT NOT NULL,
            weight SMALLINT NOT NULL,
            description	VARCHAR(1000) NOT NULL,
            image_url VARCHAR(1000) NOT NULL,
            exp_date DATE NOT NULL,
            is_decorative BOOL DEFAULT false,
            is_available BOOL DEFAULT false,
            price FLOAT,
            owner_id INT NOT NULL
        );
        """,
        """
        DROP TABLE produce;
        """
    ]
]
