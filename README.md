# Cybernauts User Network

Interactive User Relationship & Hobby Management System built with FastAPI and React.

## 📋 Project Overview

A full-stack application for managing users, their relationships, and hobbies with an interactive graph visualization. The system calculates popularity scores based on friendships and shared hobbies.

**Assignment:** Cybernauts Development Assignment  
**Tech Stack:** FastAPI + PostgreSQL + React + TypeScript + React Flow

## ✨ Features

- 👥 **User Management**: Create, edit, and delete users with validation
- 🎨 **Hobby Management**: Add hobbies via drag-and-drop interface
- 🔗 **Relationship System**: Connect users as friends with visual graph
- 📊 **Popularity Score**: Auto-calculated as `friends + (shared_hobbies × 0.5)`
- 🎯 **Interactive Graph**: React Flow visualization with custom nodes
- 🔔 **Toast Notifications**: Beautiful non-intrusive notifications
- 🎨 **Color-Coded Nodes**: Blue (≤5 score), Orange (>5 score)
- 🔓 **Unlink Feature**: Click edges or use buttons to unlink friends

## 🏗️ Project Structure

cybernauts-user-network/
├── backend/
│ ├── main.py
│ ├── config.py
│ ├── database.py
│ ├── exceptions.py
│ ├── models/
│ │ └── user.py
│ ├── schemas/
│ │ └── user.py
│ ├── routers/
│ │ ├── users.py
│ │ └── graph.py
│ ├── services/
│ │ └── user_service.py
│ ├── tests/
│ │ └── test_users.py
│ ├── .env
│ └── README.md
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── styles/
│ ├── package.json
│ └── README.md
└── README.md

text

## 🚀 Quick Start

### Prerequisites

- Python 3.13+
- Node.js 18+
- uv package manager
- PostgreSQL (NeonDB)

### Backend Setup

cd backend
uv sync
uv run ./main.py

text

Backend runs on: `http://localhost:8000`

### Frontend Setup

cd frontend
npm install
npm run dev

text

Frontend runs on: `http://localhost:5173`

## 🎯 Business Rules

1. **Popularity Score Formula**: `friends + (shared_hobbies × 0.5)`
2. **Deletion Protection**: Users with friends cannot be deleted
3. **Circular Friendship Prevention**: Mutual connections stored once
4. **Duplicate Prevention**: Cannot create duplicate friendships
5. **Self-Link Prevention**: Users cannot link to themselves

## 🧪 Testing

cd backend
uv add pytest httpx --dev
uv run pytest tests/ -v

text

## 📦 Tech Stack

### Backend
- FastAPI 0.110+
- SQLAlchemy (ORM)
- PostgreSQL (NeonDB)
- Pydantic (Validation)
- uv (Package Manager)

### Frontend
- React 18.3+
- TypeScript 5.5+
- Vite 7.0+
- React Flow 12.0+
- Axios 1.7+

## 🎨 Features Walkthrough

### Create Users
1. Click "Create New User" in right sidebar
2. Enter username, age, and hobbies (comma-separated)
3. User appears in graph with calculated score

### Manage Relationships
1. Drag from one node to another to create friendship
2. Click on edge/connection line to unlink users
3. Use unlink button in friends list

### Edit Users
1. Click ✏️ icon on user card
2. Edit modal opens with validation
3. Save changes to update graph

### Manage Hobbies
1. Create hobbies in left sidebar
2. Drag hobby to user's drop zone
3. Remove hobbies using × button

## 🐛 Troubleshooting

**Backend not starting:**
Check .env file exists with DATABASE_URL
Verify NeonDB connection string
text

**Frontend CORS error:**
Backend has CORS middleware enabled
Check API_BASE_URL in frontend/src/services/api.ts
text

**Graph not rendering:**
Ensure @xyflow/react is installed
npm install @xyflow/react

text

## 📖 Documentation

See individual README files:
- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🚀 Deployment

### Backend
- Render
- Railway
- Heroku
- AWS EC2/Lambda

### Frontend
- Vercel
- Netlify
- AWS S3 + CloudFront

## 👨‍💻 Author

Built for Cybernauts Development Assignment

## 📄 License

This project is for assignment purposes.