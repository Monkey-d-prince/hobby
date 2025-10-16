from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.user import GraphResponse, UserGraph, EdgeGraph
from services.user_service import UserService

router = APIRouter(prefix="/api", tags=["graph"])

@router.get("/graph", response_model=GraphResponse)
def get_graph_data(db: Session = Depends(get_db)):
    users = UserService.get_all_users(db)
    
    nodes = [
        UserGraph(
            id=user.id,
            username=user.username,
            age=user.age,
            hobbies=user.hobbies,
            popularity_score=UserService.calculate_popularity_score(user, db)
        )
        for user in users
    ]
    
    edges = []
    processed = set()
    
    for user in users:
        for friend in user.friends:
            edge_id = tuple(sorted([user.id, friend.id]))
            if edge_id not in processed:
                edges.append(
                    EdgeGraph(
                        id=f"{user.id}-{friend.id}",
                        source=user.id,
                        target=friend.id
                    )
                )
                processed.add(edge_id)
    
    return GraphResponse(nodes=nodes, edges=edges)
