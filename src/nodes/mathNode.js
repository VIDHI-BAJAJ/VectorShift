import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa';

export const MathNode = ({ id, data, onDelete }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');
  const [value1, setValue1] = useState(data?.value1 || 0);
  const [value2, setValue2] = useState(data?.value2 || 0);

  const handleOperationChange = (e) => setOperation(e.target.value);
  const handleValue1Change = (e) => setValue1(Number(e.target.value));
  const handleValue2Change = (e) => setValue2(Number(e.target.value));

  const handleDelete = () => onDelete(id);

  return (
    <div style={{ width: 200, border: '3px solid #a466d2', borderRadius: '8px', padding: '10px' }}>
      <button onClick={handleDelete} style={{ position: 'absolute', top: '5px', right: '5px', border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}>
        <FaTimes />
      </button>
      <div>Math Operation</div>
      <select value={operation} onChange={handleOperationChange}   style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #a466d2'
            }}>
        <option value="Add" >Add</option>
        <option value="Subtract">Subtract</option>
        <option value="Multiply">Multiply</option>
        <option value="Divide">Divide</option>
      </select>
      <input type="number" value={value1} onChange={handleValue1Change}   style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              marginTop:'5px',
              border: '1px solid #a466d2'
            }} />
      <input type="number" value={value2} onChange={handleValue2Change}    style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              marginTop:'5px',
              border: '1px solid #a466d2'
            }}/>
      <Handle type="source" position={Position.Right} style={{ top: '50%', background: '#a466d2' }} />
    </div>
  );
};
