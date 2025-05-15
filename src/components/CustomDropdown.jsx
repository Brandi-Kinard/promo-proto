// src/components/CustomDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Find the selected option's label
  const selectedOption = options.find(option => option.value === value);
  
  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Function to handle option selection
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <div 
      className={`custom-dropdown ${isOpen ? 'open' : ''} ${className}`}
      ref={dropdownRef}
    >
      <div 
        className={`selected-option ${!value ? 'empty' : ''}`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="dropdown-caret"></span>
      </div>
      
      {isOpen && (
        <div className="dropdown-items-container">
          {options
            .filter(option => option.value !== '') // Filter out the empty option
            .map((option) => (
              <div
                key={option.value}
                className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;