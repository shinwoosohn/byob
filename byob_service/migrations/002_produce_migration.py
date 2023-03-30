steps = [
    [
    """
    CREATE TABLE produce (
        id SERIAL PRIMARY KEY NOT NULL,
        quantity SMALLINT NOT NULL,
        weight SMALLINT NOT NULL,
        description	VARCHAR(1000) NOT NULL,
        image_url VARCHAR(1000) NOT NULL,
        exp_date DATE NOT NULL,
        is_decorative BOOL DEFAULT false NOT NULL,
        is_available BOOL DEFAULT false NOT NULL,
        owner_id INT NOT NULL,
    );
    """,
    """
    DROP TABLE produce;
    """
    ]
]
