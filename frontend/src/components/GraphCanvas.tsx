import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import '../styles/GraphCanvas.css';
import { EdgeGraph, UserGraph } from '../types';
import CustomNode from './CustomNode';

export interface NodeData extends Record<string, unknown> {
  username: string;
  age: number;
  popularity_score: number;
  hobbies: string[];
}

const nodeTypes = {
  custom: CustomNode,
} satisfies NodeTypes;

interface GraphCanvasProps {
  nodes: UserGraph[];
  edges: EdgeGraph[];
  onConnect: (sourceId: string, targetId: string) => void;
  onDisconnect: (sourceId: string, targetId: string) => void;
  onNodeClick: (nodeId: string) => void;
}

type FlowNode = Node<NodeData>;
type FlowEdge = Edge;

export default function GraphCanvas({
  nodes: graphNodes,
  edges: graphEdges,
  onConnect,
  onDisconnect,
  onNodeClick,
}: GraphCanvasProps) {
  const [nodes, setNodes] = useState<Node<NodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as FlowNode[]);
  }, [setNodes]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds) as FlowEdge[]);
  }, [setEdges]);

  useEffect(() => {
    const flowNodes = graphNodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: { x: (index % 4) * 250, y: Math.floor(index / 4) * 200 },
      data: {
        username: node.username,
        age: node.age,
        popularity_score: node.popularity_score,
        hobbies: node.hobbies.map(h => h.id),
      },
    })) as Node<NodeData>[];

    const flowEdges: FlowEdge[] = graphEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [graphNodes, graphEdges, setNodes, setEdges]);

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        // Check if connection already exists
        const existingEdge = edges.find(
          (edge) =>
            (edge.source === connection.source && edge.target === connection.target) ||
            (edge.source === connection.target && edge.target === connection.source)
        );

        if (existingEdge) {
          return; // Don't create duplicate connection
        }

        onConnect(connection.source, connection.target);
      }
    },
    [onConnect, edges]
  );

  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      if (confirm('Do you want to unlink these users?')) {
        onDisconnect(edge.source, edge.target);
      }
    },
    [onDisconnect]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick(node.id);
    },
    [onNodeClick]
  );

  return (
    <div className="graph-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const score = (node.data as unknown as NodeData).popularity_score || 0;
            return score > 5 ? '#f59e0b' : '#3b82f6';
          }}
        />
      </ReactFlow>
      <div className="graph-legend">
        <div className="legend-item">
          <span className="legend-color low-score"></span>
          <span>Low Score (≤5)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color high-score"></span>
          <span>High Score (&gt;5)</span>
        </div>
      </div>
      <div className="graph-instructions">
        Drag nodes to connect users • Click nodes to select • Click edges to unlink • Manage hobbies in sidebar
      </div>
    </div>
  );
}