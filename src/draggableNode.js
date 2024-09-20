export const DraggableNode = ({ type, label, image }) => {
  const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
  };

  return (
      <div
          className={type}
          onDragStart={(event) => onDragStart(event, type)}
          onDragEnd={(event) => (event.target.style.cursor = 'grab')}
          style={{ 
              cursor: 'grab', 
              minWidth: '80px', 
              height: '60px',
              display: 'flex', 
              alignItems: 'center', 
              borderRadius: '8px',
              backgroundColor: '#fff', 
              border: '1px solid #d0d0d0', 
              justifyContent: 'center', 
              flexDirection: 'column'
          }} 
          draggable
      >
          {image && <img src={image} alt={label} style={{ width: '30px', height: '30px'}} />}
          <span style={{ color: '#000' }}>{label}</span>
      </div>
  );
};
