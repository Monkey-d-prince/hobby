import { Connection, Edge, Node, Position, XYPosition } from '@xyflow/react';

export interface Hobby {
  id: string;
  name: string;
}

export interface BaseNodeData extends Record<string, unknown> {
  username: string;
  age: number;
  popularity_score: number;
  hobbies: Hobby[];
}

export interface NodeProps extends Record<string, unknown> {
  id: string;
  position: XYPosition;
  type?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
}

export type NodeData = BaseNodeData & NodeProps;

export type FlowNode = Node<BaseNodeData>;
export type FlowEdge = Edge;
export type FlowConnection = Connection;

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
  popularity_score: number;
  hobbies: Hobby[];
  x: number;
  y: number;
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
