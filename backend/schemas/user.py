from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    age: int = Field(..., gt=0, lt=150)
    hobbies: List[str] = Field(..., min_length=1)
    
    @field_validator('username')
    def username_alphanumeric(cls, v):
        if not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Username must be alphanumeric')
        return v

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=1, max_length=50)
    age: Optional[int] = Field(None, gt=0, lt=150)
    hobbies: Optional[List[str]] = None

class UserResponse(BaseModel):
    id: str
    username: str
    age: int
    hobbies: List[str]
    friends: List[str]
    created_at: datetime
    popularity_score: float
    
    class Config:
        from_attributes = True

class LinkRequest(BaseModel):
    friend_id: str

class UserGraph(BaseModel):
    id: str
    username: str
    age: int
    hobbies: List[str]
    popularity_score: float

class EdgeGraph(BaseModel):
    id: str
    source: str
    target: str

class GraphResponse(BaseModel):
    nodes: List[UserGraph]
    edges: List[EdgeGraph]
