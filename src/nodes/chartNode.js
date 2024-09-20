// chartNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa';

export const ChartNode = ({ id, data,onDelete }) => {
  const [chartType, setChartType] = useState(data?.chartType || 'Bar');

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
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
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        <span>Chart</span>
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
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Chart Type:
          <select value={chartType} onChange={handleChartTypeChange}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }}>
            <option value="Bar">Bar</option>
            <option value="Line">Line</option>
            <option value="Pie">Pie</option>
          </select>
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-chart`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
    </div>
  );
};
