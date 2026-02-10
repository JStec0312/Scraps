
import datetime
from dataclasses import dataclass


@dataclass
class NewsletterSubscription:
    id: int
    email: str
    status: bool
    confirm_token: str | None
    confirmed_at: any
    created_at: any       