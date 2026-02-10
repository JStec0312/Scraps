
from fastapi import APIRouter, Depends
from app.deps import get_products_service
from app.domain.service.product_service import ProductService
from app.api.schemas.product_schema import ProductOut

router = APIRouter(prefix="/products", tags=["products"])



@router.get("/", response_model=list[ProductOut])
async def get_products(
    product_service: ProductService = Depends(get_products_service)
):
    return await product_service.get_all_products()

@router.get("/{product_id}", response_model=ProductOut)
async def get_by_id(
    product_id: int,
      product_service: ProductService = Depends(get_products_service
      )):
    return await product_service.get_product(product_id)