{/* Selected lines summary (when lines are selected) */}
{selectedLines.length > 0 && (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '16px',
    padding: '12px 16px',
    backgroundColor: '#f5f9ff',
    borderRadius: '8px',
    border: '1px solid #e6f0ff'
  }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Show thumbnails of selected lines */}
      <div style={{ 
        display: 'flex',
        position: 'relative',
        height: '28px',
        minWidth: '90px',
        cursor: 'help',
        marginRight: '16px'
      }}>
        <div style={{ position: 'relative', display: 'flex' }}>
          {selectedLines.slice(0, 3).map((lineId, idx) => {
            const oz = lineId.split('-')[1];
            // Calculate position differently based on number of selected items
            let rightOffset;
            if (selectedLines.length === 1) {
              rightOffset = 0; // Single item - align to right edge
            } else if (selectedLines.length === 2) {
              rightOffset = idx === 0 ? 22 : 0; // Two items - special case
            } else if (selectedLines.length > 3) {
              rightOffset = (2 - idx) * 22 + 24; // 4+ items - space for +N indicator
            } else {
              rightOffset = (2 - idx) * 22; // 3 items - standard spacing
            }

            return (
              <img 
                key={lineId}
                src={`https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/${oz}.png`}
                alt={`${oz}oz`}
                style={{
                  position: 'absolute',
                  width: '28px',
                  height: '28px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  border: 'none',
                  right: `${rightOffset}px`, 
                  zIndex: 10 - idx
                }}
              />
            );
          })}
          {selectedLines.length > 3 && (
            <span style={{ 
              position: 'absolute',
              right: 0,
              fontSize: '14px',
              fontWeight: '500',
              color: '#555',
              display: 'flex',
              alignItems: 'center',
              height: '28px'
            }}>
              +{selectedLines.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div style={{ fontSize: '14px', fontWeight: '600' }}>
        {selectedLines.length} line{selectedLines.length > 1 ? 's' : ''} selected
      </div>
    </div>
    
    {/* Clear button */}
    <button 
      onClick={() => setSelectedLines([])} 
      style={{
        background: 'none',
        border: 'none',
        color: '#0071dc',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        padding: '4px 8px'
      }}
    >
      Clear
    </button>
  </div>
)}