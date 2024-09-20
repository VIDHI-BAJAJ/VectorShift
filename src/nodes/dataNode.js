// dataNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa';
import Papa from 'papaparse'; // Library to parse CSV files

export const DataNode = ({ id, data, onDelete }) => {
  const [dataSource, setDataSource] = useState(data?.dataSource || '');
  const [csvData, setCsvData] = useState(null); // Store parsed CSV data

  const handleDataSourceChange = (e) => {
    setDataSource(e.target.value);
  };

  const handleDelete = () => {
    console.log('Deleting node with ID:', id);
    if (onDelete) {
      onDelete(id);
    } else {
      console.error('onDelete is not defined');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log('Parsed CSV data:', result.data);
          setCsvData(result.data); 
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  return (
    <div style={{
      width: 300,
      height: 150, 
      border: '3px solid #a466d2',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 8px rgba(0, 0, 0.5, 0.1)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        <span>Data</span>
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
          Data Source:
          <input 
            type="text" 
            value={dataSource} 
            onChange={handleDataSourceChange} 
            style={{ 
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }} 
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Upload CSV:
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
            style={{ 
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }} 
          />
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-data`}
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
