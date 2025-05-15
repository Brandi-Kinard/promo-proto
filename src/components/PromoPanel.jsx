// src/components/PromoPanel.jsx
import React from 'react';
import './PromoPanel.css';

export default function PromoPanel({ title, onClose, children, footer }) {
  return (
    <div className="promo-panel-container">
      <div className="promo-panel-scrim" onClick={onClose}></div>
      <div className="promo-panel">
        <div className="promo-panel-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="promo-panel-body">
          {children}
        </div>

        {footer && (
          <div className="promo-panel-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}