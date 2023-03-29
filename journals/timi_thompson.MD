## Journals

Please keep all of your individual journals in this directory.

Each team member is required to keep a development journal, which should be a single markdown file with an entry for each day the project was worked on.

Recommended naming convention is `first_last.md`.

    Docker file
       1 - Before running docker compose up, you'll need to create the postgres-data volume
            ```docker volume create byob-data```
       2 - (for PGAdmin) Now that you've specified a new external volume, create it with the terminal command
            ```docker volume create pg-admin```
       3 - Important for Apple Silicon folx:
          If you're using a new Mac with
          the M1 silicon and using FastAPI and Postgres,
          you will need to build your
               Docker Compose file with this command
        ```DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build```

        --**-- Once everything is up and running, you should be able to open your browser to http://localhost:8082  because of the port mapping in the pg-admin service definition above.

            -Type in the email and password that you used to configure the application in the docker-compose.yml file.
            USER: ADMIN@HACKREACTOR.COM
            PASSWORD: PASSWORD


    API related:
        For each back-end service that you want your front-end to communicate with, add an environment variable that starts with REACT_APP_ and the URL it should use

                REACT_APP_FASTAPI_SERVICE: http://localhost:8000
                REACT_APP_THIRD_PARTY_SERVICE: http://third-party.com

            Use those in your API calls rather than hard-coded URLs like this.

                ```const url = `${process.env.REACT_APP_FASTAPI_SERVICE}/api/boots`;
                const response = await fetch(url);```

    Queries
        - when you create a ConnectionPool to use to connect to the database, use code like this
            ```pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])```
