// // textNode.js
import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { FaTimes } from 'react-icons/fa'; 

export const TextNode = ({ id, data, onDelete }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; 
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; 
    }
  }, [currText]);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    extractVariables(text);
  };

  const extractVariables = (text) => {
    const variablePattern = /{{\s*([\w]+)\s*}}/g;
    const foundVariables = [];
    let match;
    while ((match = variablePattern.exec(text)) !== null) {
      foundVariables.push(match[1]);
    }
    setVariables(foundVariables);
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
      width: 'auto', 
      height: 'auto', 
      border: '3px solid #a466d2', 
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Text
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
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Text:
          <textarea 
            ref={textAreaRef}
            value={currText} 
            onChange={handleTextChange} 
            style={{ 
              width: '100%',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #0000',
              boxSizing: 'border-box',
              minHeight: '50px',
              overflow: 'auto', 
            }}
          />
        </label>
      </div>
      {variables.map((variable, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Left}
          id={`${id}-handle-${variable}`}
          style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%', background: '#a466d2', borderRadius: '50%' }}
      />
    </div>
  );
}
