from sqlalchemy import Column, String, Integer, ARRAY, DateTime, Table, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from database import Base

user_friends = Table(
    'user_friends',
    Base.metadata,
    Column('user_id', String, ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
    Column('friend_id', String, ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, nullable=False, index=True)
    age = Column(Integer, nullable=False)
    hobbies = Column(ARRAY(String), nullable=False, default=[])
    created_at = Column(DateTime, default=datetime.utcnow)
    
    friends = relationship(
        'User',
        secondary=user_friends,
        primaryjoin=id == user_friends.c.user_id,
        secondaryjoin=id == user_friends.c.friend_id,
        backref='friend_of'
    )
