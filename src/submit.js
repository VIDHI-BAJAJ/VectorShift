import React from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(); // Get nodes and edges from the store

    const handleSubmit = async () => {
      const pipelineData = { nodes, edges };
    
      try {
        const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
          method: 'POST',  // This ensures the request is sent as a POST
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pipelineData),  // Send nodes and edges data as JSON
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        alert(`Number of nodes: ${result.num_nodes}, Number of edges: ${result.num_edges}, Is DAG: ${result.is_dag}`);
      } catch (error) {
        console.error('Error submitting pipeline:', error);
      }
    };
    
  return (
    <div>
      <button
        type="button"
        onClick={handleSubmit}
        style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', marginRight: '20px' }}
      >
        Submit
      </button>
    </div>
  );
};
