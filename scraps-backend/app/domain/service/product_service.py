
from app.domain.ports.iproduct_repo import IProductRepository
from app.domain.model.product import Product

class ProductService:
    def __init__(self, product_repository: IProductRepository):
        self.product_repository = product_repository

    async def get_product(self, product_id: int) -> Product | None:
        return await self.product_repository.get_by_id(product_id)
    
    async def get_all_products(self) -> list[Product]: 
        return await self.product_repository.get_all()
    

