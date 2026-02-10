from dataclasses import dataclass
from decimal import Decimal
from typing import List

@dataclass
class Product:
    id: int
    name: str
    price: Decimal
    description: str
    long_description: str | None
    category: str
    stock: int
    images: list[str]
    specifications: list[dict]
    
