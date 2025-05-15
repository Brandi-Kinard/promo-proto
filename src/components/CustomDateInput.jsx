// src/components/CustomDateInput.jsx
import React from 'react';
import './CustomDateInput.css';

const CustomDateInput = ({ 
  value, 
  onChange, 
  placeholder = "mm/dd/yyyy",
  className = "",
  hasError = false
}) => {
  return (
    <div className={`custom-date-input ${className} ${hasError ? 'error' : ''}`}>
      <input
        type="date"
        value={value || ''}
        onChange={onChange}
        className={!value ? 'empty' : ''}
        placeholder={placeholder}
      />
      <img 
        src="https://raw.githubusercontent.com/Brandi-Kinard/SVGs/refs/heads/main/calendar.svg" 
        alt="" 
        className="calendar-icon" 
      />
    </div>
  );
};

export default CustomDateInput;