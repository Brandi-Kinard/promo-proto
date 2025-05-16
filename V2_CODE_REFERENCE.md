# V2 Code Reference from Previous Implementation

## Visual Treatment Updates Applied

### Line Item Styling
```javascript
// From previous v2 implementation
style={{
  backgroundColor: '#fff',
  padding: '14px',
  marginBottom: '12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  border: 'none',  // No border
  boxShadow: 'none',  // No drop shadow
  ...(selectedLinesV2.includes(line.id) && {
    backgroundColor: '#f5f9ff'
  })
}}
```

### Thumbnail Styling
```javascript
// Updated thumbnail specs
style={{
  width: '32px',
  height: '32px',
  marginRight: '12px',
  objectFit: 'contain',
  border: 'none'  // No white border
}}
```

### Header Thumbnails
```javascript
// Thumbnails in collapsed header
{selectLinesCollapsed && selectedLinesV2.length > 0 && (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span>{selectedLinesV2.length} lines selected</span>
    <div style={{ display: 'flex', marginLeft: '8px' }}>
      {selectedLinesV2.slice(0, 3).map((lineId, idx) => (
        <img
          key={lineId}
          src={/* thumbnail URL */}
          alt=""
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '4px',
            marginLeft: idx > 0 ? '-10px' : '0',
            border: 'none',
            zIndex: selectedLinesV2.length - idx
          }}
        />
      ))}
    </div>
  </div>
)}
```

### Button Specifications
```javascript
// Primary button
style={{
  backgroundColor: '#0071dc',
  color: 'white',
  border: 'none',
  borderRadius: '25px',  // Rounded
  padding: '8px 20px',
  cursor: 'pointer',
  fontWeight: '500'
}}

// Form fields
style={{
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  height: '40px'
}}
```

## Accordion Behavior from Previous Implementation

### State Management
```javascript
const [selectLinesCollapsed, setSelectLinesCollapsed] = useState(false);
const [configPromoCollapsed, setConfigPromoCollapsed] = useState(true);  // Starts collapsed
```

### Continue to Step 2 Logic
```javascript
onClick={(e) => {
  e.stopPropagation();
  setConfigPromoCollapsed(false);  // Expand config section
  setTimeout(() => {
    // Scroll to config section
    document.querySelector('#config-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 300);
}}
```

### Dynamic Header Content
```javascript
// When collapsed, show count and thumbnails
// When expanded, only show caret
{selectLinesCollapsed ? (
  // Show thumbnails and count
) : (
  // Only show caret icon
)}
```

## Specific Fixes Applied

1. Removed `#f8f8f8` gray backgrounds → changed to `white`
2. Changed primary color from `#0058AB` → `#0071dc`
3. Fixed hover state: `backgroundColor: '#f5f9ff'`
4. Removed borders from line items
5. Set `boxShadow: 'none'` on line items
6. Updated thumbnail size to 32px in list, 28px in header

## Progressive Disclosure Pattern

1. Select Lines starts expanded
2. Configure Promotion starts collapsed
3. Header shows "Please select lines first" when no selection
4. Both sections can be expanded/collapsed independently
5. "Continue to Step 2" explicitly transitions between sections