export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  created_at: string;
  popularity_score: number;
}

export interface UserGraph {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  popularity_score: number;
}

export interface EdgeGraph {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: UserGraph[];
  edges: EdgeGraph[];
}

export interface UserCreate {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UserUpdate {
  username?: string;
  age?: number;
  hobbies?: string[];
}
