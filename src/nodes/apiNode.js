//apinode.js
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa';

export const ApiNode = ({ id, data, onDelete }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || '');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [params, setParams] = useState([{ type: 'query', key: '', value: '' }]);

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
  };

  const handleDelete = () => {
    console.log('Deleting node with ID:', id);
    if (onDelete) {
      onDelete(id); 
    } else {
      console.error('onDelete is not defined');
    }
  };
  const handleHeaderChange = (index, field, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const handleParamChange = (index, field, value) => {
    const updatedParams = [...params];
    updatedParams[index][field] = value;
    setParams(updatedParams);
  };

  const addHeaderRow = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const addParamRow = () => {
    setParams([...params, { type: 'query', key: '', value: '' }]);
  };

  const removeHeaderRow = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const removeParamRow = (index) => {
    setParams(params.filter((_, i) => i !== index));
  };

  return (
    <div style={{
        width: 350, 
        border: '3px solid #a466d2', 
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 8px rgba(0, 0, 0.5, 0.1)',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
      }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        <span>API Node</span>
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
        <label>
          Method:
          <select 
            value={method} 
            onChange={handleMethodChange} 
            style={{ 
              marginLeft: '10px', 
              padding: '5px', 
              borderRadius: '4px', 
              border: '1px solid #a466d2' 
            }}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          URL:
          <input 
            type="text" 
            value={endpoint} 
            onChange={handleEndpointChange} 
            style={{ 
              marginLeft: '10px', 
              padding: '5px', 
              borderRadius: '4px', 
              border: '1px solid #a466d2', 
              width: '90%' 
            }} 
          />
        </label>
      </div>

      <div>
        <span style={{ fontWeight: 'bold' }}>Headers</span>
        <table style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>KEY</th>
              <th style={{ textAlign: 'left' }}>VALUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Key"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #a466d2',
                      width: '90%'
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Value"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #a466d2',
                     
                      width: '90%'
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => removeHeaderRow(index)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <FaTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addHeaderRow} style={{ background: 'transparent', color: '#a466d2', cursor: 'pointer', border: 'none', marginTop: '5px' }}>
          <FaPlus /> Add Header
        </button>
      </div>
      <div style={{ marginBottom: '10px', fontWeight:'bold' }}>
        <label>
          Params:
          <select 
            value={method} 
            onChange={handleMethodChange} 
            style={{ 
              marginLeft: '10px', 
              padding: '5px', 
              borderRadius: '4px', 
              marginTop:'10px',
              border: '1px solid #a466d2' 
            }}
          >
            <option value="BODY">BODY</option>
            <option value="QUERY">QUERY</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <table style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>KEY</th>
              <th style={{ textAlign: 'left' }}>VALUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {params.map((param, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Key"
                    value={param.key}
                    onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #a466d2',
                      width: '90%'
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Value"
                    value={param.value}
                    onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: '1px solid #a466d2',
                      width: '90%'
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => removeParamRow(index)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <FaTrash color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addParamRow} style={{ background: 'transparent', color: '#a466d2', cursor: 'pointer', border: 'none', marginTop: '5px' }}>
          <FaPlus /> Add Params
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-api`}
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
