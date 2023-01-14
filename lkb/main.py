from fastapi import FastAPI
from core import models
from core.database import engine
from endpoints import users, admin, items, buying
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI(docs_url="/api", redoc_url="/api/redoca", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=['POST', 'GET'],
    allow_credentials=True,
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/user")
app.include_router(items.router, prefix="/api")
app.include_router(admin.router, prefix="/api/admin")
app.include_router(buying.router, prefix="/api")
