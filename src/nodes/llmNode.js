// llmNode.js

import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa';

export const LLMNode = ({ id ,onDelete}) => {
  const handleDelete = () => {
    console.log('Deleting node with ID:', id); 
    if (onDelete) {
      onDelete(id);
    } else {
      console.error('onDelete is not defined');
    }
  };
  return (
    <div style={{
      width: 200, 
      height: 100, 
      border: '3px solid #a466d2', 
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 8px rgba(0, 0, 0.5, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        LLM
      </div>
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          border: 'none',
          background: 'transparent',
          color: 'red',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        <FaTimes />
      </button>
      <div style={{ display: 'block', marginBottom: '5px' }}>
        <span>This is an LLM node.</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
    </div>
  );
}
