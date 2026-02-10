from app.domain.ports.inewsletter_repo import INewsletterRepository
import secrets

class NewsletterService:
    def __init__(self, repo: INewsletterRepository):
        self.repo = repo

    async def subscribe(self, email: str) -> None:
        email = email.strip().lower() # Normalize email
        BLOCKED_DOMAINS = {"test.com", "example.com", "mailinator.com", "tempmail.com"}
        domain = email.split("@")[-1]
        if domain in BLOCKED_DOMAINS:
            return  
        token = secrets.token_hex(32)
        unsubscribe_token = secrets.token_hex(32)
        from app.config.config import DOMAIN
        confirm_link = f"{DOMAIN}/newsletter/confirm?token={token}"
         
        try:
            await self.repo.add_email(email, token, unsubscribe_token)
            #await self.mailer.send_confirmation_mail(email, confirm_link) # Implement this method in your mailer

            
        except Exception as e: # Unique constraint violation or other db error
            return 
        

    async def confirm(self, token: str) -> bool:
        sub = await self.repo.get_by_token(token)
        if not sub:
            raise ValueError("Invalid token")
        if sub.status == "confirmed":
            raise ValueError("Already confirmed")
        if sub.confirm_token != token:
            raise ValueError("Invalid token")
        
        result = await self.repo.confirm_subscription(token)
        return result
    
    
    async def unsubscribe(self, token: str) -> bool:
        return await self.repo.unsubscribe_by_token(token)