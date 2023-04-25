steps = [
    [
        """
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY NOT NULL,
            post_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            text VARCHAR(1000) NOT NULL,
            postimg_url VARCHAR(1000),
            poster_id INT NOT NULL,
            produce_id INT
        );
        """,
        """
        DROP TABLE posts;
        """,
    ]
]
