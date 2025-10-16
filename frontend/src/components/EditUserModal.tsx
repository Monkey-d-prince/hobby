import { useState, useEffect } from 'react';
import { User } from '../types';
import '../styles/EditUserModal.css';

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: string, username: string, age: number, hobbies: string[]) => void;
}

export default function EditUserModal({ user, isOpen, onClose, onSave }: EditUserModalProps) {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [errors, setErrors] = useState<{ username?: string; age?: string; hobbies?: string }>({});

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAge(user.age.toString());
      setHobbies(user.hobbies.join(', '));
      setErrors({});
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { username?: string; age?: string; hobbies?: string } = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum)) {
      newErrors.age = 'Age is required';
    } else if (ageNum < 1 || ageNum > 150) {
      newErrors.age = 'Age must be between 1 and 150';
    }

    if (!hobbies.trim()) {
      newErrors.hobbies = 'At least one hobby is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!user || !validate()) return;

    const hobbyList = hobbies
      .split(',')
      .map(h => h.trim())
      .filter(h => h);

    onSave(user.id, username.trim(), parseInt(age), hobbyList);
    onClose();
  };

  const handleCancel = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit User</h2>
          <button className="modal-close-btn" onClick={handleCancel}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              min="1"
              max="150"
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hobbies">Hobbies (comma separated)</label>
            <textarea
              id="hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="e.g., reading, gaming, cooking"
              rows={3}
              className={errors.hobbies ? 'error' : ''}
            />
            {errors.hobbies && <span className="error-message">{errors.hobbies}</span>}
          </div>

          <div className="current-info">
            <h4>Current Friends: {user.friends.length}</h4>
            <p className="info-text">Popularity Score: {user.popularity_score}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
