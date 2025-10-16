import axios from 'axios';
import { User, GraphData, UserCreate } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/users/');
    return response.data;
  },

  createUser: async (userData: UserCreate): Promise<User> => {
    const response = await api.post<User>('/api/users/', userData);
    return response.data;
  },

  updateUser: async (userId: string, userData: Partial<UserCreate>): Promise<User> => {
    const response = await api.put<User>(`/api/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/api/users/${userId}`);
  },

  linkUsers: async (userId: string, friendId: string): Promise<void> => {
    await api.post(`/api/users/${userId}/link`, { friend_id: friendId });
  },

  unlinkUsers: async (userId: string, friendId: string): Promise<void> => {
    await api.delete(`/api/users/${userId}/unlink`, { data: { friend_id: friendId } });
  },

  getGraphData: async (): Promise<GraphData> => {
    const response = await api.get<GraphData>('/api/graph');
    return response.data;
  },
};
