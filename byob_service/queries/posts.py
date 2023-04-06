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
