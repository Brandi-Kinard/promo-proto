// src/components/Toast.jsx
import React, { useEffect, useState } from 'react';
import './Toast.css';

const Toast = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div className={`toast ${visible ? 'visible' : 'hidden'}`}>
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;