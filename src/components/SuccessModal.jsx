// src/components/SuccessModal.jsx
import React, { useEffect, useState } from 'react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onClose, 200);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [onClose]);
  
  return (
    <div className="success-modal-container">
      <div className="success-modal-scrim"></div>
      <div className="success-modal">
        <div className="success-modal-content">
          <img 
            src="https://github.com/Brandi-Kinard/imageSamples/blob/main/JIF%20peanut%20butter/ShippingBoxOpen_Blue_Angle.png?raw=true" 
            alt="Shipping box" 
            className="success-image" 
          />
          <h3>Updating...</h3>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;