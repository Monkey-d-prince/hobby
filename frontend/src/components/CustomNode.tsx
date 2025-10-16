import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import '../styles/CustomNode.css';

interface CustomNodeData {
  username: string;
  age: number;
  popularity_score: number;
  hobbies: string[];
}

function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const isHighScore = data.popularity_score > 5;

  return (
    <div className={`custom-node ${isHighScore ? 'high-score' : 'low-score'} ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      
      <div className="node-header">
        <div className="node-username">{data.username}</div>
        <div className="node-age">Age: {data.age}</div>
      </div>
      
      <div className="node-score">
        Score: {data.popularity_score}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
}

export default memo(CustomNode);