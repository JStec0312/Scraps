from app.domain.model.product import Product
from app.data.models.product import ProductDto

def product_dto_to_domain(dto: ProductDto) -> Product:
    return Product(
    id=dto.id,
    name=dto.name,
    price=dto.price,
    description=dto.description,
    long_description=dto.long_description,
    category=dto.category,
    stock=dto.stock,
    images=[img.url for img in dto.images],
    specifications=[{"name": s.name, "value": s.value} for s in dto.specifications],
)
