from sqlalchemy import func, func, insert, update, select
from sqlalchemy.exc import IntegrityError
from app.data.models.newsletter import NewsletterSubscriptionDto
from app.domain.ports.inewsletter_repo import INewsletterRepository
from app.data.mappers.newsletter_sub_mapper import newsletter_sub_dto_to_domain

class NewsletterRepository(INewsletterRepository):
    def __init__(self, db):
        self.db = db

    async def add_email(self, email: str, token: str, unsubscribe_token: str) -> None:
        stmt = insert(NewsletterSubscriptionDto).values(email=email, confirm_token=token, unsubscribe_token=unsubscribe_token)
        try:
            await self.db.execute(stmt)
            await self.db.commit()
        except IntegrityError:
            await self.db.rollback()
            raise ValueError("Email already subscribed")
        
    async def get_by_token(self, token: str):
        stmt = select(NewsletterSubscriptionDto).where(NewsletterSubscriptionDto.confirm_token == token)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    
    async def confirm_subscription(self, token: str) -> bool:
        stmt = (
            update(NewsletterSubscriptionDto)
            .where(NewsletterSubscriptionDto.confirm_token == token)
            .values(
                status="confirmed",
                confirm_token=None,
                confirmed_at=func.now(),
            )
            .returning(NewsletterSubscriptionDto.id)
        )

        result = await self.db.execute(stmt)
        await self.db.commit()

        return result.scalar_one_or_none() is not None

        
    async def unsubscribe_by_token(self, token: str) -> bool:
        stmt = (
            update(NewsletterSubscriptionDto)
            .where(NewsletterSubscriptionDto.unsubscribe_token == token)
            .values(
                status="unsubscribed",
                unsubscribed_at=func.now(),   # jeśli masz taką kolumnę
            )
            .returning(NewsletterSubscriptionDto.id)
        )
        result = await self.db.execute(stmt)
        await self.db.commit()

        return result.scalar_one_or_none() is not None