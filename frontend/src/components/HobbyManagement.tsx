import { useState } from 'react';
import '../styles/HobbyManagement.css';

interface HobbyManagementProps {
  hobbies: string[];
  onAddHobby: (hobby: string) => void;
  onRemoveHobby: (hobby: string) => void;
}

export default function HobbyManagement({ hobbies, onAddHobby, onRemoveHobby }: HobbyManagementProps) {
  const [newHobby, setNewHobby] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      onAddHobby(newHobby.trim());
      setNewHobby('');
    }
  };

  const filteredHobbies = hobbies.filter(hobby =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hobby-management">
      <div className="hobby-header">
        <span className="hobby-icon">🎨</span>
        <h2>Hobby Management</h2>
      </div>

      <input
        type="text"
        placeholder="Search hobbies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="hobby-search"
      />

      <div className="create-hobby">
        <h3>Create New Hobby</h3>
        <div className="hobby-input-group">
          <input
            type="text"
            placeholder="Enter hobby name"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddHobby()}
          />
          <button onClick={handleAddHobby} className="add-button">+</button>
        </div>
      </div>

      <div className="hobby-list-section">
        <h3>All Hobbies ({filteredHobbies.length})</h3>
        <div className="hobby-list">
          {filteredHobbies.length === 0 ? (
            <p className="no-hobbies">No hobbies available</p>
          ) : (
            filteredHobbies.map((hobby, index) => (
              <div
                key={index}
                className="hobby-item"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('hobby', hobby)}
              >
                <span>{hobby}</span>
                <button
                  onClick={() => onRemoveHobby(hobby)}
                  className="remove-hobby-btn"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="hobby-instructions">
        <p>• Click on hobbies to add/remove from selected user</p>
        <p>• Connect users by dragging nodes in the graph</p>
        <p>• Popularity score = friends + (shared hobbies × 0.5)</p>
        <p>• Users with friends cannot be deleted</p>
      </div>
    </div>
  );
}
