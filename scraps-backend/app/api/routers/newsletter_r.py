from fastapi import APIRouter, Depends, HTTPException, status
from app.api.schemas.newsletter_schema import NewsletterSubscribeIn, NewsletterSubscribeOut
from app.domain.service.newsletter_service import NewsletterService
from app.deps import get_newsletter_service


router = APIRouter(prefix="/newsletter", tags=["newsletter"]),

@router.post("/subscribe", response_model=NewsletterSubscribeOut, status_code=status.HTTP_201_CREATED)
async def subscribe_to_newsletter(
    payload: NewsletterSubscribeIn,
    service: NewsletterService = Depends(get_newsletter_service),
):
    try:
        await service.subscribe(payload.email)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Subscription failed") 

    return {"message": "Subscribed successfully"}



@router.get("/confirm", status_code=status.HTTP_200_OK)
async def confirm_newsletter(token: str, service: NewsletterService = Depends(get_newsletter_service)):
    success = await service.confirm(token)
    if not success:
        raise HTTPException(400, "Invalid or expired token")

    return {"message": "Newsletter confirmed"}


@router.get("/unsubscribe", status_code=status.HTTP_200_OK)
async def unsubscribe_newsletter(
    token: str,
    service: NewsletterService = Depends(get_newsletter_service),
):
    success = await service.unsubscribe(token)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid or expired unsubscribe token")

    return {"message": "You have been unsubscribed from the newsletter"}