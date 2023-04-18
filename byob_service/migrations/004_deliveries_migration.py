steps = [
    [
        """
        CREATE TABLE deliveries (
            id SERIAL PRIMARY KEY NOT NULL,
            posts_id INT,
            produce_id INT NOT NULL,
            producer_id INT NOT NULL,
            from_address VARCHAR(1000) NOT NULL,
            from_city VARCHAR(1000) NOT NULL,
            from_state VARCHAR(25) NOT NULL,
            to_address VARCHAR(1000) NOT NULL,
            to_city VARCHAR(1000) NOT NULL,
            to_state VARCHAR(1000) NOT NULL,
            requestor_id INT NOT NULL,
            order_status VARCHAR(25) DEFAULT 'pending',
            delivery_status VARCHAR(25) DEFAULT 'pending',
            request_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            driver_id INT
        );
        """,
        """
        DROP TABLE deliveries;
        """
    ]
]
