from fastapi import APIRouter

router = APIRouter(
    prefix="/personal-info",
    tags=["Profile"]
)

@router.get("/")