import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa';

export const InputNode = ({ id, data, onDelete }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

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
      fontFamily: 'Arial, sans-serif',
      position: 'relative' // Positioning for the delete button
    }}>
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
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Input
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }}
          />
        </label>
        <label>
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
    </div>
  );
};
