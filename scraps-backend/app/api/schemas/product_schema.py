
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ProductSpecificationOut(BaseModel):
    name: str
    value: str

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str
    long_description: Optional[str]
    price: float
    category: str
    stock: int
    images: List[str]
    specifications: List[ProductSpecificationOut]
