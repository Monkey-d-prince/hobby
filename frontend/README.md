# Frontend - User Relationship Network UI

React + TypeScript frontend with interactive graph visualization using React Flow.

## 🛠️ Tech Stack

- **Framework**: React 18.3+
- **Language**: TypeScript 5.5+
- **Build Tool**: Vite 7.0+
- **Graph Visualization**: React Flow 12.0+
- **HTTP Client**: Axios 1.7+
- **Styling**: External CSS files

## 📁 Project Structure

frontend/
├── src/
│ ├── components/
│ │ ├── HobbyManagement.tsx # Left sidebar - hobby CRUD
│ │ ├── UserManagement.tsx # Right sidebar - user CRUD
│ │ ├── GraphCanvas.tsx # Center - graph visualization
│ │ ├── CustomNode.tsx # Custom node component
│ │ ├── EditUserModal.tsx # Edit user modal
│ │ ├── Toast.tsx # Toast notification
│ │ └── ToastContainer.tsx # Toast container
│ ├── services/
│ │ └── api.ts # API client
│ ├── hooks/
│ │ └── useToast.ts # Toast hook
│ ├── types/
│ │ └── index.ts # TypeScript interfaces
│ ├── styles/
│ │ ├── App.css
│ │ ├── HobbyManagement.css
│ │ ├── UserManagement.css
│ │ ├── GraphCanvas.css
│ │ ├── CustomNode.css
│ │ ├── EditUserModal.css
│ │ ├── Toast.css
│ │ └── index.css
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── index.css # Global styles
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

text

## 🚀 Installation & Setup

### 1. Create Project (if starting fresh)

npm create vite@latest frontend -- --template react-ts
cd frontend

text

### 2. Install Dependencies

npm install

text

### 3. Run Development Server

npm run dev

text

Application runs on: `http://localhost:5173`

## 🎨 Features

### Hobby Management (Left Sidebar)
- ✅ Search hobbies with filter
- ✅ Create new hobbies
- ✅ Drag-and-drop to add to users
- ✅ Delete hobbies with confirmation
- ✅ Visual instructions panel

### Graph Canvas (Center)
- ✅ Interactive node visualization
- ✅ Drag nodes to connect users
- ✅ Click nodes to select
- ✅ Click edges to unlink users
- ✅ Color-coded by popularity score
- ✅ Animated connections
- ✅ Zoom & pan controls
- ✅ Minimap navigation
- ✅ Legend display

### User Management (Right Sidebar)
- ✅ Create new users with validation
- ✅ Edit user details via modal
- ✅ Delete users (with protection)
- ✅ View selected user details
- ✅ Manage user hobbies
- ✅ Unlink friends
- ✅ Friend list view

### Toast Notifications
- ✅ Success (green) - Create, update, link
- ✅ Error (red) - Failed operations
- ✅ Warning (orange) - Duplicate attempts
- ✅ Info (blue) - General notifications
- ✅ Auto-dismiss (3 seconds)
- ✅ Manual close button

## 📦 Key Dependencies

{
"dependencies": {
"react": "^18.3.1",
"react-dom": "^18.3.1",
"@xyflow/react": "^12.0.0",
"axios": "^1.7.0"
},
"devDependencies": {
"@types/react": "^18.3.0",
"@types/react-dom": "^18.3.0",
"@vitejs/plugin-react": "^4.3.0",
"typescript": "^5.5.0",
"vite": "^7.0.0"
}
}

text

## 🔌 API Integration

### API Service (`src/services/api.ts`)

const API_BASE_URL = 'http://localhost:8000';

export const userApi = {
getAllUsers: () => Promise<User[]>,
createUser: (userData: UserCreate) => Promise<User>,
updateUser: (userId: string, userData: Partial<UserCreate>) => Promise<User>,
deleteUser: (userId: string) => Promise<void>,
linkUsers: (userId: string, friendId: string) => Promise<void>,
unlinkUsers: (userId: string, friendId: string) => Promise<void>,
getGraphData: () => Promise<GraphData>
}

text

## 🎯 Component Overview

### HobbyManagement
- Search and filter hobbies
- Create new hobbies
- Draggable hobby items
- Delete functionality
- Instructions panel

### UserManagement
- User list with selection
- Create user form
- Edit button (opens modal)
- Delete button
- Selected user details
- Friends list with unlink

### GraphCanvas
- React Flow integration
- Custom node types
- Edge click handling
- Connection validation
- Prevent duplicates
- Legend and instructions

### CustomNode
- Color-coded border (blue/orange)
- Display username and age
- Show popularity score
- Hover and selection states
- Connection handles

### EditUserModal
- Form validation
- Edit username, age, hobbies
- Current stats display
- Keyboard shortcuts (Esc to close)
- Error messages

### Toast System
- Custom hook: `useToast()`
- Methods: `success()`, `error()`, `warning()`, `info()`
- Auto-dismiss with animations
- Slide-in effect
- Close button

## 🎨 Styling

### Color Palette

/* Node Colors /
--blue: #3b82f6; / Low score nodes (≤5) /
--orange: #f59e0b; / High score nodes (>5) */

/* UI Colors /
--green: #10b981; / Success /
--red: #ef4444; / Error /
--dark: #1a1a1a; / Text/buttons /
--light: #fafafa; / Background /
--border: #e5e5e5; / Borders */

text

### Component Sizes

- Sidebars: 260px width
- Header: Compact (1rem padding)
- Footer: Minimal (0.6rem padding)
- Font sizes: 0.72rem - 1.5rem
- Spacing: 0.3rem - 1.5rem

## 🧪 Development

### Build for Production

npm run build

text

Output in `dist/` directory.

### Preview Production Build

npm run preview

text

### Type Checking

npx tsc --noEmit

text

## 📱 Responsive Design

- Three-panel layout
- Fixed sidebars (260px each)
- Flexible center canvas
- Compact spacing
- Optimized font sizes
- Scrollable sections

## 🔧 Configuration

### Vite Config (`vite.config.ts`)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],
server: {
port: 5173
}
})

text

### TypeScript Config (`tsconfig.json`)

{
"compilerOptions": {
"target": "ES2020",
"lib": ["ES2020", "DOM", "DOM.Iterable"],
"module": "ESNext",
"jsx": "react-jsx",
"strict": true,
"moduleResolution": "bundler"
},
"include": ["src"]
}

text

## 🐛 Troubleshooting

**CORS Issues:**
// Backend has CORS middleware enabled
// Verify API_BASE_URL in src/services/api.ts

text

**Graph Not Rendering:**
Ensure @xyflow/react is installed
npm install @xyflow/react

text

**Toast Not Working:**
// Check ToastContainer is in App.tsx
// Verify useToast hook import

text

**TypeScript Errors:**
Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

text

## 🚀 Deployment

### Vercel (Recommended)

npm run build

Connect GitHub repo to Vercel
Auto-deploy on push
text

### Netlify

npm run build

Drag dist/ folder to Netlify
text

### Environment Variables

Create `.env.production`:
VITE_API_URL=https://your-api-domain.com

text

Update `src/services/api.ts`:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

text

## 📖 Usage Guide

1. **Create Users**: Click "Create New User" button, fill form
2. **Add Hobbies**: Create hobbies in left sidebar
3. **Connect Users**: Drag from one node to another in graph
4. **Edit Users**: Click ✏️ icon on user card
5. **Manage Hobbies**: Drag hobbies to user drop zone
6. **Unlink Friends**: Click edge or use unlink button in friends list
7. **Delete Users**: Unlink all friends first, then click 🗑️

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Flow Docs](https://reactflow.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)