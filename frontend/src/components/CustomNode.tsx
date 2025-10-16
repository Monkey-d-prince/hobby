import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import '../styles/CustomNode.css';
import type { BaseNodeData } from '../types';

type CustomNodeProps = {
  data: BaseNodeData;
  selected?: boolean;
};

function CustomNode({ data, selected }: CustomNodeProps) {
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