from fastapi import Depends
from sqlalchemy.orm import Session

from app.infrastructure.database import get_db


from app.domain.ports.iproduct_repo import IProductRepository
from app.data.repo.product_repo import ProductRepository
from app.domain.service.product_service import ProductService

from app.domain.ports.inewsletter_repo import INewsletterRepository
from app.data.repo.newsletter_repo import NewsletterRepository
from app.domain.service.newsletter_service import NewsletterService


def get_products_repo(db: Session = Depends(get_db)) -> IProductRepository:
    return ProductRepository(db)
def get_products_service(
    products_repo: IProductRepository = Depends(get_products_repo),
) -> ProductService:
    return ProductService(products_repo)



def get_newsletter_repo(db: Session = Depends(get_db)) -> INewsletterRepository:
    return NewsletterRepository(db)

def get_newsletter_service(repo: INewsletterRepository = Depends(get_newsletter_repo)) -> NewsletterService:
    return NewsletterService(repo)
