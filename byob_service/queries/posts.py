from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from queries.pool import pool
from queries.produce import ProduceOut


class PostsIn(BaseModel):
    post_created: datetime
    text: str
    poster_id: int
    postimg_url: str
    produce_id: int


class PostsOut(BaseModel):
    posts_id: int
    produce: ProduceOut
    post_created: datetime
    text: str
    poster_id: int
    postimg_url: str


class PostsRepo:
    pass
