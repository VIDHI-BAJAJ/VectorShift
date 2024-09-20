// ui.js

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { ChartNode } from './nodes/chartNode';
import { DataNode } from './nodes/dataNode';
import { ApiNode } from './nodes/apiNode';
import { LogicalNode } from './nodes/logicalNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: (props) => <InputNode {...props} onDelete={props.onDelete} />,
  llm: (props) => <LLMNode {...props} onDelete={props.onDelete} />,
  customOutput: (props) => <OutputNode {...props} onDelete={props.onDelete} />,
  text: (props) => <TextNode {...props} onDelete={props.onDelete} />,
  customMath: (props) => <MathNode {...props} onDelete={props.onDelete} />,
  customData: (props) => <DataNode {...props} onDelete={props.onDelete} />,
  customChart: (props) => <ChartNode {...props} onDelete={props.onDelete} />,
  customApi: (props) => <ApiNode {...props} onDelete={props.onDelete} />,
  customLogical: (props) => <LogicalNode {...props} onDelete={props.onDelete} />,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onDelete: state.onDelete,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      onDelete
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    };

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;

            if (typeof type === 'undefined' || !type) {
              return;
            }

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const position = reactFlowInstance.screenToFlowPosition({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};
