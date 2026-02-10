from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn 
from app.api.routers.products_r import router as products_router



app = FastAPI(title="Shop API")
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prefix = "/api/v1"
app.include_router(products_router, prefix=prefix)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)