// src/pages/LineSelection.jsx
import React from 'react';
import './LineSelection.css';

export default function LineSelection({ lines = [], selectedLines = [], toggleLine = () => {} }) {
  return (
    <div className="line-selection">
      <h2>Select lines</h2>
      <p className="selection-description">Choose the lines to apply a promotion to.</p>

      <ul className="line-list">
        {lines?.map((line) => (
          <li key={line.id} className="line-item">
            <label className="line-wrapper">
              <div className="line-content-wrapper">
                <input
                  type="checkbox"
                  checked={selectedLines.includes(line.id)}
                  onChange={() => toggleLine(line.id)}
                  className="line-checkbox"
                />
                <img src={line.thumbnail} alt="" className="line-thumbnail" />
                <div className="line-info">
                  <span className="line-name">{line.name}</span>
                  <span className="line-subtext">ID #{line.lineId} • {line.itemCount} items</span>
                </div>
                {line.promoApplied && (
                  <span className="promo-chip">
                    Promo applied
                    <div className="tooltip-box">
                      A promotion is already applied to this line. You can add another if it doesn't conflict in time or type. Any conflicts will be flagged during setup.
                    </div>
                  </span>
                )}
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}