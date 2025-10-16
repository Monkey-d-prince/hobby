import { Node } from '@xyflow/react';

export interface NodeData extends Record<string, any> {
  username: string;
  age: number;
  popularity_score: number;
  hobbies: string[];
}

export type FlowNode = Node<NodeData>;