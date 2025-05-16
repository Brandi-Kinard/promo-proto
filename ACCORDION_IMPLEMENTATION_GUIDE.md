# Accordion Implementation Guide for v2

## Overview
This guide contains all the details needed to implement the accordion pattern from the previous v2 prototype.

## State Setup
Add these states to Home.jsx:
```javascript
const [selectLinesCollapsed, setSelectLinesCollapsed] = useState(false);
const [configPromoCollapsed, setConfigPromoCollapsed] = useState(true);
```

## Accordion Card Structure
Replace the v2 panel content with this structure:

```javascript
{version === 'v2' && (
  <>
    {/* Select Lines Card */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    }}>
      {/* Header */}
      <div 
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setSelectLinesCollapsed(!selectLinesCollapsed)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#0071dc',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            1
          </div>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Select Lines</h3>
        </div>
        
        {/* Dynamic header content */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {selectLinesCollapsed && selectedLinesV2.length > 0 && (
            <>
              <span>{selectedLinesV2.length} lines selected</span>
              {/* Thumbnails here */}
            </>
          )}
          <img 
            src={`https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/${selectLinesCollapsed ? 'down' : 'up'}-caret.svg`}
            alt=""
            style={{ width: '20px', height: '20px' }}
          />
        </div>
      </div>

      {/* Content */}
      {!selectLinesCollapsed && (
        <div style={{ padding: '20px', backgroundColor: 'white' }}>
          {/* Line selection content */}
        </div>
      )}
    </div>

    {/* Configure Promotion Card */}
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Similar structure as above */}
    </div>
  </>
)}
```

## Key Visual Styles

### Colors
- Primary blue: `#0071dc`
- Hover background: `#f5f9ff`
- White backgrounds (not gray)
- Error color: `#DC2626`

### Dimensions
- Card header padding: `12px 20px`
- Content padding: `20px`
- Number badge: `24px × 24px`
- Thumbnail size in header: `28px × 28px`
- Button height: `40px`
- Form field height: `40px`
- Border radius: `6px` for inputs, `25px` for primary buttons

### Spacing
- Between cards: `24px`
- Between form sections: `16px`
- Gap between elements: `12px`

## Line Selection Specifics

```javascript
// Selected lines summary (when expanded)
{selectedLinesV2.length > 0 && (
  <div style={{
    backgroundColor: '#f0f7ff',
    borderRadius: '6px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  }}>
    <span style={{ fontWeight: '500' }}>
      {selectedLinesV2.length} lines selected
    </span>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        setSelectedLinesV2([]);
      }}
      style={{
        background: 'none',
        border: 'none',
        color: '#0071dc',
        cursor: 'pointer',
        textDecoration: 'underline'
      }}
    >
      Clear
    </button>
  </div>
)}

// Continue button
{selectedLinesV2.length > 0 && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setConfigPromoCollapsed(false);
      // Scroll to config section
      setTimeout(() => {
        const configSection = document.querySelector('#config-section');
        configSection?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }}
    style={{
      backgroundColor: '#0071dc',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '8px 20px',
      cursor: 'pointer',
      fontWeight: '500',
      marginTop: '16px'
    }}
  >
    Continue to Step 2
  </button>
)}
```

## Configuration Section Details

### Header Message
```javascript
{configPromoCollapsed && (
  <span style={{ color: selectedLinesV2.length === 0 ? '#666' : '#333' }}>
    {selectedLinesV2.length === 0 ? 'Please select lines first' : 'Configure promotion details'}
  </span>
)}
```

### Form Validation
Keep existing validation logic but display inline instead of disabling buttons.

## Event Handling
- Use `e.stopPropagation()` on all interactive elements inside headers
- Smooth transitions for expand/collapse
- Scroll to config section when "Continue to Step 2" is clicked

## Footer Updates
```javascript
const renderFooter = () => {
  if (version === 'v2') {
    const getActiveSection = () => {
      if (!selectLinesCollapsed) return 'lines';
      if (!configPromoCollapsed) return 'config';
      return null;
    };

    const activeSection = getActiveSection();
    
    // Show appropriate buttons based on active section
    // Similar logic to existing footer but context-aware
  }
  // ... existing v1 logic
};
```

## Important Notes
1. Remove all gray backgrounds - use white
2. Keep all form functionality from v1
3. Maintain conflict detection flow
4. Preserve success modals and toasts
5. Use exact color values specified
6. Add proper hover states
7. Ensure keyboard navigation works

This implementation creates the exact accordion pattern from the previous v2 attempt.