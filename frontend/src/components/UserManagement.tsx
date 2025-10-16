import { useState } from 'react';
import { User } from '../types';
import EditUserModal from './EditUserModal';
import '../styles/UserManagement.css';

interface UserManagementProps {
  users: User[];
  selectedUser: User | null;
  onCreateUser: (username: string, age: number, hobbies: string[]) => void;
  onUpdateUser: (userId: string, username: string, age: number, hobbies: string[]) => void;
  onDeleteUser: (userId: string) => void;
  onUnlinkUsers: (userId: string, friendId: string) => void;
  onSelectUser: (user: User | null) => void;
}

export default function UserManagement({
  users,
  selectedUser,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
  onUnlinkUsers,
  onSelectUser,
}: UserManagementProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    if (username && age && hobbies) {
      const hobbyList = hobbies.split(',').map(h => h.trim()).filter(h => h);
      onCreateUser(username, parseInt(age), hobbyList);
      setUsername('');
      setAge('');
      setHobbies('');
      setShowCreateForm(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveEdit = (userId: string, username: string, age: number, hobbies: string[]) => {
    onUpdateUser(userId, username, age, hobbies);
    setEditingUser(null);
  };

  const handleAddHobbyToUser = (hobby: string) => {
    if (selectedUser && !selectedUser.hobbies.includes(hobby)) {
      onUpdateUser(
        selectedUser.id,
        selectedUser.username,
        selectedUser.age,
        [...selectedUser.hobbies, hobby]
      );
    }
  };

  const handleRemoveHobbyFromUser = (hobby: string) => {
    if (selectedUser) {
      onUpdateUser(
        selectedUser.id,
        selectedUser.username,
        selectedUser.age,
        selectedUser.hobbies.filter(h => h !== hobby)
      );
    }
  };

  const getFriendDetails = (friendId: string) => {
    return users.find(u => u.id === friendId);
  };

  return (
    <>
      <div className="user-management">
        <div className="user-header">
          <span className="user-icon">👥</span>
          <h2>User Management</h2>
        </div>

        <button
          className="create-user-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : 'Create New User'}
        </button>

        {showCreateForm && (
          <div className="create-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hobbies (comma separated)"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
            <button onClick={handleCreateUser} className="submit-btn">
              Create User
            </button>
          </div>
        )}

        <div className="users-section">
          <h3>All Users ({users.length})</h3>
          <div className="user-list">
            {users.map((user) => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => onSelectUser(user)}
              >
                <div className="user-info">
                  <div className="user-name">{user.username}</div>
                  <div className="user-details">
                    Age: {user.age} | Score: {user.popularity_score}
                  </div>
                  <div className="user-friends">Friends: {user.friends.length}</div>
                </div>
                <div className="user-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditUser(user);
                    }}
                    className="edit-btn"
                    title="Edit user"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteUser(user.id);
                    }}
                    className="delete-btn"
                    title="Delete user"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedUser && (
          <div className="selected-user-details">
            <h3>Selected: {selectedUser.username}</h3>
            
            <div className="user-hobbies">
              <h4>Hobbies:</h4>
              <div className="hobby-tags">
                {selectedUser.hobbies.map((hobby, idx) => (
                  <div key={idx} className="hobby-tag">
                    {hobby}
                    <button onClick={() => handleRemoveHobbyFromUser(hobby)}>×</button>
                  </div>
                ))}
              </div>
            </div>

            {selectedUser.friends.length > 0 && (
              <div className="user-friends-list">
                <h4>Friends:</h4>
                {selectedUser.friends.map((friendId, idx) => {
                  const friend = getFriendDetails(friendId);
                  return (
                    <div key={idx} className="friend-item">
                      <span>{friend?.username || 'Unknown'}</span>
                      <button
                        onClick={() => onUnlinkUsers(selectedUser.id, friendId)}
                        className="unlink-btn"
                        title="Unlink friend"
                      >
                        🔗✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const hobby = e.dataTransfer.getData('hobby');
                if (hobby) handleAddHobbyToUser(hobby);
              }}
            >
              Drop hobby here to add
            </div>
          </div>
        )}
      </div>

      <EditUserModal
        user={editingUser}
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveEdit}
      />
    </>
  );
}
