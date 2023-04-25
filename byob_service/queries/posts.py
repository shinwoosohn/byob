from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from queries.pool import pool


class Error(BaseModel):
    message: str


class PostsIn(BaseModel):
    text: str
    postimg_url: str
    produce_id: Optional[int]
    poster_id: Optional[int]


class PostOut(BaseModel):
    posts_id: int
    post_created: Optional[datetime]
    text: str
    postimg_url: str
    produce_id: Optional[int]
    poster_id: Optional[int]


class PostProduce(BaseModel):
    produce_id: Optional[int]
    name: Optional[str]
    quantity: Optional[int]
    weight: Optional[int]
    description: Optional[str]
    image_url: Optional[str]
    exp_date: Optional[date]
    is_decorative: Optional[bool]
    is_available: Optional[bool]
    price: Optional[float]

class PostUser(BaseModel):
    user_id: int
    username: str
    avatar_url: str


class PostsOut(BaseModel):
    posts_id: int
    post_created: Optional[datetime]
    text: str
    postimg_url: str
    poster_id: Optional[int]
    produce: Optional[PostProduce]
    user: PostUser


class PostsRepo:
    ####################################################################
    # CREATE posts/listings method
    def create(
        self, posts: PostsIn, account_data: dict
    ) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
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
                        ],
                    )
                    posts_id = cur.fetchone()[0]
                    old_data = posts.dict()
                    old_data["poster_id"] = account_data["user_id"]
                    return PostOut(
                        posts_id=posts_id,
                        **old_data,
                    )
        except Exception:
            raise ValueError("Could not create post")

    ##############################################################################
    # GET post by id not caring about the user
    def get_post(self, posts_id: int) -> Union[PostsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT p.id AS posts_id
                            , p.post_created
                            , p.text
                            , p.postimg_url
                            , p.poster_id
                            , pr.id AS produce_id
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id AS user_id
                            , u.username
                            , u.avatar_url
                        FROM posts p
                        LEFT JOIN produce pr
                        ON p.produce_id = pr.id
                        LEFT JOIN users u
                        ON p.poster_id = u.id
                        WHERE p.id = %s
                        """,
                        [posts_id],
                    )
                    row = cur.fetchone()
                    return self.post_record_to_dict(row, cur.description)
        except Exception:
            return {"message": "Could not get that post"}

    ##############################################################################
    # GET ALL posts for main public feed
    def get_all_post(self) -> Union[List[PostsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT p.id AS posts_id
                            , p.post_created
                            , p.text
                            , p.postimg_url
                            , p.poster_id
                            , pr.id AS produce_id
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id AS user_id
                            , u.username
                            , u.avatar_url
                        FROM posts p
                        LEFT JOIN produce pr
                        ON p.produce_id = pr.id
                        LEFT JOIN users u
                        ON p.poster_id = u.id
                        GROUP BY p.id
                            , p.post_created
                            , p.text
                            , p.postimg_url
                            , p.poster_id
                            , pr.id
                            , pr.name
                            , pr.quantity
                            , pr.weight
                            , pr.description
                            , pr.image_url
                            , pr.exp_date
                            , pr.is_decorative
                            , pr.is_available
                            , pr.price
                            , u.id
                            , u.username
                            , u.avatar_url
                        ORDER BY pr.exp_date DESC
                        """
                    )
                    rows = cur.fetchall()
                    return [
                        self.post_record_to_dict(row, cur.description)
                        for row in rows
                    ]

        except Exception:
            return {"message": "Could not get posts"}

    ##############################################################################
    # UPDATE post by posts_id
    def update_post(
        self, posts: PostsIn, posts_id: int, account_data: dict
    ) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        # INSERT SQL statement to create posts
                        """
                        UPDATE posts
                        SET text = %s
                            , postimg_url = %s
                            , produce_id = %s
                        WHERE id = %s
                        """,
                        [
                            posts.text,
                            posts.postimg_url,
                            posts.produce_id,
                            posts_id,
                        ],
                    )
                    posts_id = posts_id
                    old_data = posts.dict()
                    old_data["poster_id"] = account_data["user_id"]
                    return PostOut(
                        posts_id=posts_id,
                        **old_data,
                    )
        except Exception:
            raise ValueError("Could not create post")

    ##############################################################################
    # DELETE post by posts_id

    def delete_post(self, posts_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM posts
                        WHERE id = %s
                        """,
                        [posts_id],
                    )
                    return True
        except Exception:
            return {"message": "Could not delete post"}

    # *****************************ENCODER***********************************************************
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
                "poster_id",
            ]
            for i, column in enumerate(description):
                if column.name in post_fields:
                    post[column.name] = row[i]

            produce = {}
            produce_fields = [
                "produce_id",
                "name",
                "quantity",
                "weight",
                "description",
                "image_url",
                "exp_date",
                "is_decorative",
                "is_available",
                "price",
            ]
            for i, column in enumerate(description):
                if column.name in produce_fields:
                    produce[column.name] = row[i]
            post["produce"] = produce

            user = {}
            user_fields = [
                "user_id",
                "username",
                "avatar_url",
            ]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
            post["user"] = user
        return post
