from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool
from queries.produce import ProduceOut
from queries.users import UsersOut


class PostsIn(BaseModel):
    text: str
    postimg_url: str
    produce_id: Optional[int]
    poster_id: int


class PostsOut(BaseModel):
    posts_id: int
    post_created: Optional[datetime]
    text: str
    postimg_url: str
    produce: Optional[ProduceOut]
    user: UsersOut


class PostsRepo:
    ####################################################################
    # CREATE posts/listings method
    def create(self, posts: PostsIn, account_data: dict) -> PostsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        # INSERT SQL statement to create posts
                        """
                        INSERT INTO posts
                            (
                                text,
                                postimg_url,
                                produce_id,
                                poster_id
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id AS posts_id;
                        """,
                        [
                            posts.text,
                            posts.postimg_url,
                            posts.produce_id,
                            account_data["user_id"],
                        ]
                    )
                    posts_id = cur.fetchone()[0]
                    old_data = posts.dict()
                    old_data["poster_id"] = account_data["user_id"]
                    return PostsOut(
                        posts_id=posts_id,
                        **old_data,
                    )
        except Exception as e:
            raise ValueError("Could not create post")


    ##############################################################################
    # GET post by id not caring about the user
    def get_post(self, posts_id: int) -> Optional[PostsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT p.id AS posts_id
                            , p.post_created
                            , p.text
                            , p.postimg_url
                            , pr.id AS produce_id
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , u.id AS user_id
                            , u.username
                        FROM posts p
                        LEFT JOIN produce pr
                        ON p.produce_id = pr.id
                        LEFT JOIN users u
                        ON p.poster_id = u.id
                        WHERE posts_id = %s
                        ORDER BY posts_id;
                        """,
                        [posts_id]
                    )
                    row = cur.fetchone()
                    return self.post_record_to_dict(row, cur.description)
        except Exception as e:
            print(e)
            return {"message": "Could not get that post"}


#*****************************ENCODER***********************************************************
    # method to call in get_post that structures the data into proper nested dict form
    def post_record_to_dict(self, row, description):
        post = None
        if row is not None:
            post = {}
            post_fields = [
                "posts_id",
                "post_created",
                "text",
                "postimg_url",
            ]
            for i, column in enumerate(description):
                if column.name in post_fields:
                    post[column.name] = row[i]
            post["id"] = post["posts_id"]

            produce = {}
            produce_fields = [
                "produce_id",
                "quantity",
                "weight",
                "description",
                "image_url",
                "exp_date",
                "is_decorative",
                "is_available",
            ]
            for i, column in enumerate(description):
                if column.name in produce_fields:
                    produce[column.name] = row[i]
            produce["id"] = produce["produce_id"]
            post["produce"] = produce

            user = {}
            user_fields = [
                "user_id",
                "username",
            ]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
            user["id"] = user["user_id"]
            post["user"] = user
        return post
