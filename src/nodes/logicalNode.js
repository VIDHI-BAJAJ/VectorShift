// // logicalNode.js


import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes, FaTrash } from 'react-icons/fa';

export const LogicalNode = ({ id, data, onDelete }) => {
  const [conditions, setConditions] = useState([{ condition: '', input: '' }]); 
  const [elseInput, setElseInput] = useState(''); 

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = conditions.map((cond, idx) => {
      if (index === idx) {
        return { ...cond, [field]: value };
      }
      return cond;
    });
    setConditions(updatedConditions);
  };
  const handleDelete = () => {
    console.log('Deleting node with ID:', id);
    if (onDelete) {
      onDelete(id); 
    } else {
      console.error('onDelete is not defined');
    }
  };
  const addCondition = () => {
    setConditions([...conditions, { condition: '', input: '' }]); // Add a new else-if condition
  };

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, idx) => idx !== index);
    setConditions(updatedConditions);
  };

  const handleElseInputChange = (e) => {
    setElseInput(e.target.value);
  };

  return (
    <div style={{
      width: 250, 
      border: '2px solid #a466d2', 
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 8px rgba(0, 0, 0.5, 0.1)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        <span>Condition</span>
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

      {conditions.map((cond, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          {index === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>If</span>
              <span  style={{marginRight:'100px'}}>Then</span>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Else If</span>
              <span style={{marginRight:'100px'}}>Then</span>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
            <input 
              type="text" 
              placeholder="condition" 
              value={cond.condition}
              onChange={(e) => handleConditionChange(index, 'condition', e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #a466d2',
                width: '35%',
              }} 
            />
            <input 
              type="text" 
              placeholder="input"
              value={cond.input}
              onChange={(e) => handleConditionChange(index, 'input', e.target.value)}
              style={{
                padding: '5px',
                borderRadius: '4px',
                border: '1px solid #a466d2',
                width: '40%',
              }} 
            />
            <button
              onClick={() => removeCondition(index)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#a466d2',
                cursor: 'pointer'
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Else Condition */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Else</span>
        </div>
        <input 
          type="text" 
          placeholder="input"
          value={elseInput}
          onChange={handleElseInputChange}
          style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #a466d2',
            width: '90%',
          }} 
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button
          onClick={addCondition}
          style={{
            backgroundColor: '#7269ef',
            color: '#fff',
            padding: '8px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            flex: 1,
            marginRight: '5px'
          }}
        >
          Add Else If
        </button>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-condition-input`}
        style={{ top: '40%', background: '#a466d2', borderRadius: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-condition-output`}
        style={{ top: '40%', background: '#a466d2', borderRadius: '50%' }}
      />
    </div>
  );
};
