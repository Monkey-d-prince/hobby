from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from schemas.user import UserCreate, UserUpdate, UserResponse, LinkRequest
from services.user_service import UserService

router = APIRouter(prefix="/api/users", tags=["users"])

@router.get("/", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = UserService.get_all_users(db)
    return [
        UserResponse(
            id=user.id,
            username=user.username,
            age=user.age,
            hobbies=user.hobbies,
            friends=[f.id for f in user.friends],
            created_at=user.created_at,
            popularity_score=UserService.calculate_popularity_score(user, db)
        )
        for user in users
    ]

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = UserService.create_user(db, user_data)
    return UserResponse(
        id=user.id,
        username=user.username,
        age=user.age,
        hobbies=user.hobbies,
        friends=[],
        created_at=user.created_at,
        popularity_score=0.0
    )

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: str, user_data: UserUpdate, db: Session = Depends(get_db)):
    user = UserService.update_user(db, user_id, user_data)
    return UserResponse(
        id=user.id,
        username=user.username,
        age=user.age,
        hobbies=user.hobbies,
        friends=[f.id for f in user.friends],
        created_at=user.created_at,
        popularity_score=UserService.calculate_popularity_score(user, db)
    )

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    UserService.delete_user(db, user_id)
    return None

@router.post("/{user_id}/link", status_code=status.HTTP_200_OK)
def link_users(user_id: str, link_data: LinkRequest, db: Session = Depends(get_db)):
    UserService.link_users(db, user_id, link_data.friend_id)
    return {"message": "Users linked successfully"}

@router.delete("/{user_id}/unlink", status_code=status.HTTP_200_OK)
def unlink_users(user_id: str, link_data: LinkRequest, db: Session = Depends(get_db)):
    UserService.unlink_users(db, user_id, link_data.friend_id)
    return {"message": "Users unlinked successfully"}
