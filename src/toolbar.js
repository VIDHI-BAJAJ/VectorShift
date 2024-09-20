// toolbar.js

import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import inputImage from './Images/Input.png';
import outputImage from './Images/output.png';
import textImage from './Images/Files.png';
import llmImage from './Images/llm.png';
import mathImage from './Images/maths.webp';
import dataImage from './Images/data.png';
import chartImage from './Images/chart.png'
import apiImage  from './Images/api.jpg';
import logicalImage from './Images/logical.jpg'

export const PipelineToolbar = () => {
  return (
    <div style={{ 
        padding: '10px', 
        borderRadius: '2px', 
        border: '1px solid #d0d0d0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <DraggableNode type='customInput' label='Input' image={inputImage} />
        <DraggableNode type='customOutput' label='Output' image={outputImage} />
        <DraggableNode type='text' label='Text' image={textImage} />
        <DraggableNode type='llm' label='LLM' image={llmImage}/>
        <DraggableNode type='customMath' label='Math' image={mathImage} />
        <DraggableNode type='customData' label='Data' image={dataImage}/>
        <DraggableNode type='customChart' label='Cart' image={chartImage}/>
        <DraggableNode type='customApi' label='Api' image={apiImage}/>
        <DraggableNode type='customLogical' label='Logical' image={logicalImage} />
      </div>

      
      <SubmitButton/>

    </div>
  );
};
