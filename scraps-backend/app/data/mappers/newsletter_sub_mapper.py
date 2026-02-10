from app.data.models.newsletter import NewsletterSubscriptionDto
from app.domain.model.newsletter_sub import NewsletterSubscription


def newsletter_sub_dto_to_domain(dto: NewsletterSubscriptionDto) -> NewsletterSubscription:
    return NewsletterSubscription(
        id=dto.id,
        email=dto.email,
        status=dto.status,
        confirm_token=dto.confirm_token,
        confirmed_at=dto.confirmed_at,
        created_at=dto.created_at
    )