// src/pages/ConfigurePromo.jsx
import React, { useRef, useState, useEffect } from 'react';
import '../styles/ConfigurePromo.css';
import CustomDropdown from '../components/CustomDropdown';
import CustomDateInput from '../components/CustomDateInput';

const TooltipIcon = ({ label }) => (
<span className="tooltip-icon" role="img" aria-label="info">
<span className="tooltip-text">{label}</span>
<img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/tooltip.svg" alt="" />
</span>
);

export default function ConfigurePromo({
onBack = () => {},
selectedLines = [],
formState = {
  promoType: '',
  badgeType: '',
  discount: '',
  event: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  holdPeriod: '',
  forceSitePrice: false,
  hasConflict: false
},
onFormChange = () => {},
onCancel = () => {},
onApplyPromo = () => {},
onRevert = () => {},
jifLines = [],
}) {
const conflictRef = useRef(null);
const [conflictsExpanded, setConflictsExpanded] = useState(false);
const [conflictResolved, setConflictResolved] = useState(false);

const handleChange = (field) => (e) => {
const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
onFormChange(field, value);
};

const handleScrollToConflict = () => {
setConflictsExpanded(true);
setTimeout(() => {
  conflictRef.current?.scrollIntoView({ behavior: 'smooth' });
}, 10);
};

const handleRefreshConflicts = () => {
setConflictResolved(true);
// Simulate removing conflicts
onFormChange('hasConflict', false);

// Ensure Apply Promo button becomes enabled
setTimeout(() => {
  // This ensures state updates properly
  onFormChange('hasConflict', false);
}, 0);
};

const handleResolveClick = (e) => {
e.preventDefault();
// Open the conflict resolution page in a new tab
window.open('/resolve-conflict.html', '_blank');
};

const times = Array.from({ length: 24 }, (_, i) => {
const hour = i % 12 === 0 ? 12 : i % 12;
const suffix = i < 12 ? 'am' : 'pm';
return `${hour}:00 ${suffix} CST`;
});

const thumbnails = selectedLines.slice(0, 3).map((lineId, idx) => {
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
    className="line-thumb"
    style={{ right: `${rightOffset}px`, zIndex: 10 - idx }}
  />
);
});

const isFormValid = [
'promoType',
'badgeType',
'discount',
'event',
'startDate',
'startTime',
'endDate',
'endTime',
'holdPeriod',
].every((field) => formState[field]) && (!formState.hasConflict || conflictResolved);

return (
<div className="configure-promo">
  <div className="sticky-wrapper">
    <div className="line-summary-bar">
      <div className="line-back-section">
        <button className="back-button" onClick={onBack}>
          <img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/left-caret.svg" alt="Back" />
        </button>
        <span className="line-count">{selectedLines.length} line{selectedLines.length !== 1 ? 's' : ''} selected</span>
      </div>
      <div className="line-thumbnails" title="Selected lines">
        <div className="thumbnails-wrapper">
          {thumbnails}
          {selectedLines.length > 3 && (
            <span className="extra-thumbnails">
              +{selectedLines.length - 3}
            </span>
          )}
          <div className="thumbnails-tooltip">
            <div className="tooltip-header">Selected lines:</div>
            {jifLines && jifLines
              .filter(line => selectedLines.includes(line.id))
              .map(line => (
                <div key={line.id} className="tooltip-line-item">
                  {line.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    
    {formState.hasConflict && !conflictResolved && (
      <div className="banner-error" onClick={() => handleScrollToConflict()}>
        <img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/error-outlined.svg" alt="Error" className="error-icon" />
        <div className="banner-error-text">
          This promo conflicts with other promotions. To proceed, you can:
          <ul className="banner-error-list">
            <li>Update this promo's dates</li>
            <li>Edit conflicting promo dates</li>
            <li>Delete the conflicting promos</li>
          </ul>
          <a href="#" onClick={(e) => { e.stopPropagation(); handleScrollToConflict(); }} className="banner-error-link">
            View conflicting promo
          </a>
        </div>
      </div>
    )}
  </div>

  <p className="section-description">Define promotion details for the selected items.</p>

  <div className="form-section">
    <h3>Choose promo criteria</h3>
    <div className="form-grid">
      <div className="form-group">
        <label>
          Promo type <TooltipIcon label="This is a tooltip about Promo Type." />
        </label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select a promo type' },
              { value: 'Standard', label: 'Standard' },
              { value: 'Follow competition', label: 'Follow competition' }
            ]}
            value={formState.promoType || ''}
            onChange={(value) => handleChange('promoType')({ target: { value } })}
            placeholder="Select a promo type"
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          Badge type <TooltipIcon label="This is a tooltip about Badge Type." />
        </label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select badge type' },
              { value: 'None', label: 'None' },
              { value: 'Reduced price', label: 'Reduced price' },
              { value: 'Normal', label: 'Normal' }
            ]}
            value={formState.badgeType || ''}
            onChange={(value) => handleChange('badgeType')({ target: { value } })}
            placeholder="Select badge type"
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          Discount <TooltipIcon label="This is a tooltip about Discount." />
        </label>
        <input
          type="text"
          value={formState.discount || ''}
          placeholder="Min. 10% for strikethrough"
          onChange={handleChange('discount')}
        />
      </div>

      <div className="form-group">
        <label>
          Events <TooltipIcon label="This is a tooltip about Events." />
        </label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select event' },
              { value: 'Event 1', label: 'Event 1' },
              { value: 'Event 2', label: 'Event 2' },
              { value: 'Event 3', label: 'Event 3' }
            ]}
            value={formState.event || ''}
            onChange={(value) => handleChange('event')({ target: { value } })}
            placeholder="Select event"
          />
        </div>
      </div>
    </div>
    
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formState.forceSitePrice || false}
          onChange={handleChange('forceSitePrice')}
        />
        <span>Force site price</span>
      </label>
      <TooltipIcon label="This is a tooltip about Force Site Price." />
    </div>
  </div>

  <div className="form-section">
    <h3>Set promo timeframe</h3>
    <div className="form-grid date-grid">
      <div className="form-group">
        <label>Start date</label>
        <CustomDateInput
          value={formState.startDate || ''}
          onChange={handleChange('startDate')}
          hasError={formState.hasConflict && !conflictResolved}
          placeholder="mm/dd/yyyy"
        />
        {formState.hasConflict && !conflictResolved && (
          <div className="helper-error">
            <div className="error-message">
              <img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/error-filled.svg" alt="Error" className="inline-error-icon" />
              Start date overlaps with an existing promo.
              <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToConflict(); }} className="error-link">View conflicting promo</a>
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <label>End date</label>
        <CustomDateInput
          value={formState.endDate || ''}
          onChange={handleChange('endDate')}
          placeholder="mm/dd/yyyy"
        />
      </div>

      <div className="form-group">
        <label>Start time</label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select start time' },
              ...times.map(time => ({ value: time, label: time }))
            ]}
            value={formState.startTime || ''}
            onChange={(value) => handleChange('startTime')({ target: { value } })}
            placeholder="Select start time"
          />
        </div>
      </div>

      <div className="form-group">
        <label>End time</label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select end time' },
              ...times.map(time => ({ value: time, label: time }))
            ]}
            value={formState.endTime || ''}
            onChange={(value) => handleChange('endTime')({ target: { value } })}
            placeholder="Select end time"
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          Promo hold period <TooltipIcon label="This is a tooltip about Promo Hold Period." />
        </label>
        <div className="select-wrapper">
          <CustomDropdown
            options={[
              { value: '', label: 'Select' },
              { value: '24 hrs', label: '24 hrs' },
              { value: '48 hrs', label: '48 hrs' },
              { value: '72 hrs', label: '72 hrs' },
              { value: 'None', label: 'None' }
            ]}
            value={formState.holdPeriod || ''}
            onChange={(value) => handleChange('holdPeriod')({ target: { value } })}
            placeholder="Select"
          />
        </div>
      </div>
    </div>
  </div>

  {formState.hasConflict && !conflictResolved && (
    <div className="conflict-card" ref={conflictRef}>
      <div className="conflict-header">
        <div className="conflict-header-left">
          <span>Conflicting promos (1)</span>
          <button className="refresh-button" onClick={handleRefreshConflicts}>Refresh list</button>
        </div>
        <img 
          src={conflictsExpanded 
            ? "https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/up-caret.svg" 
            : "https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/down-caret.svg"} 
          alt={conflictsExpanded ? "Collapse" : "Expand"} 
          className="conflict-caret"
          onClick={() => setConflictsExpanded(!conflictsExpanded)}
        />
      </div>
      {conflictsExpanded && (
        <div className="conflict-content">
          <div className="conflict-header-row">
            <div>Promo type</div>
            <div>Campaign</div>
            <div>Items</div>
            <div>Start</div>
            <div>End</div>
            <div></div>
          </div>
          <div className="conflict-row">
            <div className="conflict-cell">
              <div className="promo-type-cell">
                <img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/error-outlined.svg" alt="Error" className="error-icon-small" />
                <span>Non-Clearance</span>
              </div>
            </div>
            <div className="conflict-cell">Spring Sale</div>
            <div className="conflict-cell">4 items</div>
            <div className="conflict-cell conflict-date">
              2024-01-01
              <div className="conflict-tooltip">
                This date conflicts with your selected start date.
              </div>
            </div>
            <div className="conflict-cell">2024-02-01</div>
            <div className="conflict-cell">
              <a href="#" onClick={handleResolveClick} className="resolve-link">
                Resolve <img src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/link.svg" alt="External link" className="link-icon" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )}
</div>
);
}