from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate, UserUpdate
from exceptions import *
from typing import List

class UserService:
    
    @staticmethod
    def calculate_popularity_score(user: User, db: Session) -> float:
        unique_friends_count = len(user.friends)
        
        shared_hobbies_count = 0
        user_hobbies_set = set(user.hobbies)
        
        for friend in user.friends:
            friend_hobbies_set = set(friend.hobbies)
            shared_hobbies_count += len(user_hobbies_set & friend_hobbies_set)
        
        popularity_score = unique_friends_count + (shared_hobbies_count * 0.5)
        return round(popularity_score, 2)
    
    @staticmethod
    def get_all_users(db: Session) -> List[User]:
        return db.query(User).all()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise UserNotFoundException(user_id)
        return user
    
    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> User:
        existing_user = db.query(User).filter(User.username == user_data.username).first()
        if existing_user:
            raise UserAlreadyExistsException(user_data.username)
        
        new_user = User(
            username=user_data.username,
            age=user_data.age,
            hobbies=user_data.hobbies
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
    @staticmethod
    def update_user(db: Session, user_id: str, user_data: UserUpdate) -> User:
        user = UserService.get_user_by_id(db, user_id)
        
        if user_data.username and user_data.username != user.username:
            existing = db.query(User).filter(User.username == user_data.username).first()
            if existing:
                raise UserAlreadyExistsException(user_data.username)
            user.username = user_data.username
        
        if user_data.age is not None:
            user.age = user_data.age
        
        if user_data.hobbies is not None:
            user.hobbies = user_data.hobbies
        
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def delete_user(db: Session, user_id: str):
        user = UserService.get_user_by_id(db, user_id)
        
        if len(user.friends) > 0:
            raise CannotDeleteUserException()
        
        db.delete(user)
        db.commit()
    
    @staticmethod
    def link_users(db: Session, user_id: str, friend_id: str):
        if user_id == friend_id:
            raise SelfLinkException()
        
        user = UserService.get_user_by_id(db, user_id)
        friend = UserService.get_user_by_id(db, friend_id)
        
        if friend in user.friends:
            raise RelationshipExistsException()
        
        user.friends.append(friend)
        friend.friends.append(user)
        
        db.commit()
    
    @staticmethod
    def unlink_users(db: Session, user_id: str, friend_id: str):
        user = UserService.get_user_by_id(db, user_id)
        friend = UserService.get_user_by_id(db, friend_id)
        
        if friend in user.friends:
            user.friends.remove(friend)
        if user in friend.friends:
            friend.friends.remove(user)
        
        db.commit()
