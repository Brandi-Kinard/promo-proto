// src/components/LineCard.jsx
import React from 'react';
import './LineCard.css';

export default function LineCard({ line, isSelected, onToggle }) {
  return (
    <label className={`line-card ${isSelected ? 'selected' : ''}`}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
      />
      <div className="line-info">
        <span className="line-name">{line.name}</span>
        <span className="line-items">{line.itemCount} items</span>
      </div>
      {line.promoApplied && <span className="promo-chip">Promo applied ✎</span>}
    </label>
  );
}

