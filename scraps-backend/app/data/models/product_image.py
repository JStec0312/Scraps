from __future__ import annotations

from typing import TYPE_CHECKING 

from sqlalchemy import ForeignKey,  Text
from sqlalchemy.orm import  Mapped, mapped_column, relationship
from app.infrastructure.base import Base

if TYPE_CHECKING:
    from app.data.models.product import ProductDto
    
class ProductImageDto(Base):
    __tablename__ = "product_images"

    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(Text, nullable=False)

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    product: Mapped["ProductDto"] = relationship(back_populates="images")
