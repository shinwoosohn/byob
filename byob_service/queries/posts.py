from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool
# from queries.produce import ProduceOut


class PostsIn(BaseModel):
    text: str
    poster_id: int
    postimg_url: str
    produce_id: Optional[int]


class PostsOut(BaseModel):
    posts_id: int
    post_created: Optional[datetime]
    text: str
    poster_id: int
    postimg_url: str
    produce_id: Optional[int]


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
                                poster_id,
                                postimg_url,
                                produce_id
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id AS posts_id;
                        """,
                        [
                            posts.text,
                            account_data["user_id"],
                            posts.postimg_url,
                            posts.produce_id
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
                            , u.id AS user_id
                            , u.username
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
                    record = result.fetchone()
                    if record is None:
                        return None
                    return



    # method to call in get_post that structures the data into proper nested dict form
    def post_record_to_dict(self, row, description):
        post = None
        if row is not None:
            post = {}
            post_fields = [

            ]
