# Backend - User Relationship Network API

FastAPI backend for managing users, relationships, and hobbies with PostgreSQL database.

## 🛠️ Tech Stack

- **Framework**: FastAPI 0.110+
- **Database**: PostgreSQL (NeonDB)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Package Manager**: uv (Python 3.13.2)

## 📁 Project Structure

backend/
├── main.py # FastAPI application entry point
├── config.py # Environment configuration
├── database.py # Database connection & session
├── exceptions.py # Custom exception classes
├── models/
│ ├── init.py
│ └── user.py # SQLAlchemy User model
├── schemas/
│ ├── init.py
│ └── user.py # Pydantic schemas
├── routers/
│ ├── init.py
│ ├── users.py # User CRUD endpoints
│ └── graph.py # Graph data endpoint
├── services/
│ ├── init.py
│ └── user_service.py # Business logic
├── tests/
│ ├── init.py
│ └── test_users.py # API tests
├── .env # Environment variables
├── .env.example # Environment template
└── README.md

text

## 🚀 Installation & Setup

### 1. Install uv Package Manager

curl -LsSf https://astral.sh/uv/install.sh | sh

text

### 2. Install Dependencies

Install all dependencies
uv sync

text

### 3. Environment Configuration

Create `.env` like `.env.example`:

DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
PORT=8000
ENVIRONMENT=development

text

### 4. Run the Server

Development mode with auto-reload
uv run fastapi dev main.py

Production mode
uv run fastapi run main.py

text

Server runs on: `http://localhost:8000`

## 📡 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/` | Get all users |
| POST | `/api/users/` | Create new user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |
| POST | `/api/users/{id}/link` | Link two users as friends |
| DELETE | `/api/users/{id}/unlink` | Unlink friendship |

### Graph

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/graph` | Get graph data (nodes + edges) |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/health` | Health status |

## 📝 Request/Response Examples

### Create User

curl -X POST "http://localhost:8000/api/users/"
-H "Content-Type: application/json"
-d '{
"username": "alice",
"age": 25,
"hobbies": ["reading", "gaming", "cooking"]
}'

text

**Response:**
{
"id": "550e8400-e29b-41d4-a716-446655440000",
"username": "alice",
"age": 25,
"hobbies": ["reading", "gaming", "cooking"],
"friends": [],
"created_at": "2025-10-16T07:30:00Z",
"popularity_score": 0.0
}

text

### Update User

curl -X PUT "http://localhost:8000/api/users/{user_id}"
-H "Content-Type: application/json"
-d '{
"username": "alice_updated",
"age": 26,
"hobbies": ["reading", "gaming", "cooking", "hiking"]
}'

text

### Link Users

curl -X POST "http://localhost:8000/api/users/{user_id}/link"
-H "Content-Type: application/json"
-d '{"friend_id": "{friend_id}"}'

text

### Unlink Users

curl -X DELETE "http://localhost:8000/api/users/{user_id}/unlink"
-H "Content-Type: application/json"
-d '{"friend_id": "{friend_id}"}'

text

### Get Graph Data

curl http://localhost:8000/api/graph

text

**Response:**
{
"nodes": [
{
"id": "uuid-here",
"username": "alice",
"age": 25,
"hobbies": ["reading", "gaming"],
"popularity_score": 2.5
}
],
"edges": [
{
"id": "user1-user2",
"source": "user1_id",
"target": "user2_id"
}
]
}

text

## 🧪 Testing

Install test dependencies
uv add pytest httpx pytest-cov --dev

Run tests
uv run pytest tests/ -v

With coverage
uv run pytest tests/ --cov=. --cov-report=term-missing

text

## 🔒 Error Handling

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 409 | Conflict (duplicate/constraint violation) |
| 500 | Internal Server Error |

### Error Response Example

{
"detail": "Cannot delete user with existing friendships. Unlink all friends first"
}

text

## 🎯 Business Logic

### Popularity Score Calculation

def calculate_popularity_score(user: User, db: Session) -> float:
unique_friends_count = len(user.friends)

text
shared_hobbies_count = 0
user_hobbies_set = set(user.hobbies)

for friend in user.friends:
    friend_hobbies_set = set(friend.hobbies)
    shared_hobbies_count += len(user_hobbies_set & friend_hobbies_set)

popularity_score = unique_friends_count + (shared_hobbies_count * 0.5)
return round(popularity_score, 2)
text

### Validation Rules

- **Username**: 1-50 characters, alphanumeric (including _ and -)
- **Age**: 1-150
- **Hobbies**: At least 1 required
- **Deletion**: Cannot delete users with existing friendships
- **Friendship**: Cannot create duplicate friendships
- **Self-Link**: Users cannot link to themselves

## 📊 Database Schema

### Users Table

CREATE TABLE users (
id VARCHAR PRIMARY KEY,
username VARCHAR UNIQUE NOT NULL,
age INTEGER NOT NULL,
hobbies VARCHAR[] NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);

text

### User Friends Table (Many-to-Many)

CREATE TABLE user_friends (
user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
friend_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
PRIMARY KEY (user_id, friend_id)
);

text

## 🔧 Development

### Add New Dependencies

uv add package-name

text

### Database Migrations

Database tables are auto-created on startup using SQLAlchemy's `Base.metadata.create_all()`.

## 📖 API Documentation

Access interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🐛 Troubleshooting

**Database Connection Error:**
Verify DATABASE_URL in .env
Check NeonDB connection pooler status
Ensure SSL mode is set correctly
text

**Port Already in Use:**
Change PORT in .env or kill the process
lsof -ti:8000 | xargs kill -9

text

**Import Errors:**
Make sure all init.py files exist
Run from backend directory
cd backend
uv run fastapi dev main.py

text

## 📦 Dependencies

- **fastapi[standard]** - Web framework with uvicorn
- **sqlalchemy** - ORM for database operations
- **psycopg2-binary** - PostgreSQL adapter
- **pydantic-settings** - Settings management
- **python-dotenv** - Environment variables

## 🚀 Deployment

Ready for deployment on:
- **Render** - Easy deployment with PostgreSQL
- **Railway** - Supports PostgreSQL databases
- **Heroku** - Classic PaaS
- **AWS** - EC2/Lambda with RDS
- **Google Cloud Run** - Serverless containers

### Environment Variables for Production

DATABASE_URL=your-production-db-url
PORT=8000
ENVIRONMENT=production