from datetime import datetime
from sqlalchemy import String, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from app.infrastructure.base import Base

class NewsletterSubscriptionDto(Base):
    __tablename__ = "newsletter_subscriptions"
    __table_args__ = (UniqueConstraint("email", name="uq_newsletter_email"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="pending")
    confirm_token: Mapped[str] = mapped_column(String(64), nullable=True, unique=True)
    confirmed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    unsubscribe_token: Mapped[str] = mapped_column(String(64), nullable=True, unique=True)