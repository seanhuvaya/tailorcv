from pydantic import BaseModel

class CertificationIn(BaseModel):
    title: str
    issuer: str
    date: str