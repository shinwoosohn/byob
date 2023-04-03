from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, produce, posts
from authenticator import authenticator


app = FastAPI()
app.include_router(users.router)
# app.include_router(produce.router)
# app.include_router(posts.router)
app.include_router(authenticator.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
