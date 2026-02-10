from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.data.models.product import ProductDto
from app.domain.ports.iproduct_repo import IProductRepository
from app.domain.model.product import Product
from app.data.mappers.product_mapper import product_dto_to_domain as dto_to_domain

class ProductRepository(IProductRepository):
    def __init__(self, db):
        self.db = db

    async def get_by_id(self, product_id: int) -> Optional[Product]:
        stmt = (
            select(ProductDto)
            .where(ProductDto.id == product_id)
            .options(
                selectinload(ProductDto.images),
                selectinload(ProductDto.specifications),
            )
        )
        result = await self.db.execute(stmt)
        dto = result.scalars().first()
        return dto_to_domain(dto) if dto else None

    async def get_all(self) -> List[Product]:
        stmt = select(ProductDto).options(
            selectinload(ProductDto.images),
            selectinload(ProductDto.specifications),
        )
        result = await self.db.execute(stmt)
        return [dto_to_domain(dto) for dto in result.scalars().all()]
