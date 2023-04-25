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


Thursday:

    created produce migration table

    added copy/paste for produce queiries
     turned into querie.py with proper class names
     implentend UsersRepository(pass) and ProduceRepositor

monday ********************

    user.py routers and queries DELETE endpoint
        ***** removed .hashed_passwords from update endpoints

        @router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UsersRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:


    try:
        return repo.delete_user_profile(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete an account with those credentials",
        )



    def delete_user_profile(self,  user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s;
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message":"Could not delete Profile"}
*************
added
              try:
        return repo.get_user(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot ***** an account with those credentials",
        )
        for update elte get



THURSDAY april 6

updating create route

![Alt text](screenshots/Screen%20Shot%202023-04-06%20at%2012.51.31%20PM.png)


working on get post



FRIDAY

fixed get see discord for screenshots of missing pieces
produce.id doubled, missing user.id in WHERE statement, user -> users to match naming convention in migration table


test
