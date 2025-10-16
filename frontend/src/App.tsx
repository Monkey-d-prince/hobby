import { useState, useEffect, useCallback } from 'react';
import HobbyManagement from './components/HobbyManagement';
import UserManagement from './components/UserManagement';
import GraphCanvas from './components/GraphCanvas';
import ToastContainer from './components/ToastContainer';
import { userApi } from './services/api';
import { User, UserGraph, EdgeGraph } from './types';
import { useToast } from './hooks/useToast';
import './styles/App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [graphNodes, setGraphNodes] = useState<UserGraph[]>([]);
  const [graphEdges, setGraphEdges] = useState<EdgeGraph[]>([]);
  const [allHobbies, setAllHobbies] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toasts, removeToast, success, error, warning, info } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await userApi.getAllUsers();
      setUsers(data);
      
      const hobbiesSet = new Set<string>();
      data.forEach(user => user.hobbies.forEach(hobby => hobbiesSet.add(hobby)));
      setAllHobbies(Array.from(hobbiesSet));
    } catch (err) {
      console.error('Error fetching users:', err);
      error('Failed to fetch users');
    }
  }, [error]);

  const fetchGraphData = useCallback(async () => {
    try {
      const data = await userApi.getGraphData();
      setGraphNodes(data.nodes);
      setGraphEdges(data.edges);
    } catch (err) {
      console.error('Error fetching graph data:', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchGraphData();
  }, [fetchUsers, fetchGraphData]);

  const handleCreateUser = async (username: string, age: number, hobbies: string[]) => {
    try {
      await userApi.createUser({ username, age, hobbies });
      await fetchUsers();
      await fetchGraphData();
      success(`User "${username}" created successfully!`);
    } catch (err: any) {
      console.error('Error creating user:', err);
      error(err.response?.data?.detail || 'Failed to create user');
    }
  };

  const handleUpdateUser = async (userId: string, username: string, age: number, hobbies: string[]) => {
    try {
      await userApi.updateUser(userId, { username, age, hobbies });
      await fetchUsers();
      await fetchGraphData();
      
      if (selectedUser?.id === userId) {
        const updatedUsers = await userApi.getAllUsers();
        const updated = updatedUsers.find(u => u.id === userId);
        if (updated) setSelectedUser(updated);
      }
      success(`User "${username}" updated successfully!`);
    } catch (err: any) {
      console.error('Error updating user:', err);
      error(err.response?.data?.detail || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    try {
      await userApi.deleteUser(userId);
      await fetchUsers();
      await fetchGraphData();
      if (selectedUser?.id === userId) setSelectedUser(null);
      success(`User "${user.username}" deleted successfully!`);
    } catch (err: any) {
      console.error('Error deleting user:', err);
      error(err.response?.data?.detail || 'Cannot delete user with existing friendships. Unlink all friends first');
    }
  };

  const handleConnect = async (sourceId: string, targetId: string) => {
    try {
      await userApi.linkUsers(sourceId, targetId);
      await fetchUsers();
      await fetchGraphData();
      const source = users.find(u => u.id === sourceId);
      const target = users.find(u => u.id === targetId);
      success(`${source?.username} and ${target?.username} are now friends!`);
    } catch (err: any) {
      console.error('Error linking users:', err);
      const errorMsg = err.response?.data?.detail || 'Failed to link users';
      if (errorMsg.includes('already exists')) {
        warning('These users are already friends!');
      } else {
        error(errorMsg);
      }
    }
  };

  const handleDisconnect = async (sourceId: string, targetId: string) => {
    try {
      await userApi.unlinkUsers(sourceId, targetId);
      await fetchUsers();
      await fetchGraphData();
      
      if (selectedUser?.id === sourceId || selectedUser?.id === targetId) {
        const updatedUsers = await userApi.getAllUsers();
        const updated = updatedUsers.find(u => u.id === selectedUser.id);
        if (updated) setSelectedUser(updated);
      }
      
      const source = users.find(u => u.id === sourceId);
      const target = users.find(u => u.id === targetId);
      success(`${source?.username} and ${target?.username} are no longer friends`);
    } catch (err: any) {
      console.error('Error unlinking users:', err);
      error(err.response?.data?.detail || 'Failed to unlink users');
    }
  };

  const handleNodeClick = (nodeId: string) => {
    const user = users.find(u => u.id === nodeId);
    setSelectedUser(user || null);
  };

  const handleAddHobby = (hobby: string) => {
    if (!allHobbies.includes(hobby)) {
      setAllHobbies([...allHobbies, hobby]);
      info(`Hobby "${hobby}" added!`);
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setAllHobbies(allHobbies.filter(h => h !== hobby));
    info(`Hobby "${hobby}" removed!`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hobby Management Dashboard</h1>
        <p className="subtitle">Interactive User Relationship & Hobby Management System</p>
        <div className="score-legend">
          <span className="legend-badge low">Low Score (≤5)</span>
          <span className="legend-badge high">High Score (&gt;5)</span>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar left">
          <HobbyManagement
            hobbies={allHobbies}
            onAddHobby={handleAddHobby}
            onRemoveHobby={handleRemoveHobby}
          />
        </aside>

        <main className="main-content">
          <GraphCanvas
            nodes={graphNodes}
            edges={graphEdges}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onNodeClick={handleNodeClick}
          />
        </main>

        <aside className="sidebar right">
          <UserManagement
            users={users}
            selectedUser={selectedUser}
            onCreateUser={handleCreateUser}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onUnlinkUsers={handleDisconnect}
            onSelectUser={setSelectedUser}
          />
        </aside>
      </div>

      <footer className="app-footer">
        Built with FastAPI + React + React Flow
      </footer>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
