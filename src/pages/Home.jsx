// src/pages/Home.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import PromoPanel from '../components/PromoPanel';
import SuccessModal from '../components/SuccessModal';
import Toast from '../components/Toast';
import LineSelection from './LineSelection';
import ConfigurePromo from './ConfigurePromo';
import '../styles/Home.css';

// Define jifLines directly in the Home component
const jifLines = [
  {
    id: 'line-16oz',
    name: 'JIF-Core Stabilized Peanut Butter 16 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448120',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/16oz.png',
  },
  {
    id: 'line-28oz',
    name: 'JIF-Core Stabilized Peanut Butter 28 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448121',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/28oz.png',
  },
  {
    id: 'line-40oz',
    name: 'JIF-Core Stabilized Peanut Butter 40 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448122',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/40oz.png',
  },
  {
    id: 'line-64oz',
    name: 'JIF-Core Stabilized Peanut Butter 64 oz',
    itemCount: 5,
    promoApplied: true,
    lineId: '551448123',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/64oz.png',
  },
  {
    id: 'line-80oz',
    name: 'JIF-Core Stabilized Peanut Butter 80 oz',
    itemCount: 5,
    promoApplied: false,
    lineId: '551448124',
    thumbnail: 'https://raw.githubusercontent.com/Brandi-Kinard/imageSamples/main/JIF%20peanut%20butter/80oz.png',
  },
];

const Home = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState('select');
  const [selectedLines, setSelectedLines] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [formState, setFormState] = useState({
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
    hasConflict: false,
  });

  const defaultForm = {
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
    hasConflict: false,
  };

  const handleTriggerClick = () => {
    setIsPanelOpen(true);
    setStep('select');
    setSelectedLines([]);
    setFormState(defaultForm);
    setHasFormChanged(false);
  };

  const toggleLine = (id) => {
    setSelectedLines((prev) =>
      prev.includes(id) ? prev.filter((line) => line !== id) : [...prev, id]
    );
  };

  const handleFormChange = (field, value) => {
    // Set the hasFormChanged flag to true when any field changes
    if (!hasFormChanged) {
      setHasFormChanged(true);
    }
    
    const newForm = {
      ...formState,
      [field]: value,
      hasConflict:
        // Only show conflict if the 64oz line is selected and start date is 2024-01-01
        (field === 'startDate' && value === '2024-01-01' && selectedLines.includes('line-64oz')) ||
        (formState.hasConflict && field !== 'startDate' && field !== 'hasConflict' && selectedLines.includes('line-64oz')),
    };

    setFormState(newForm);
  };

  const isFormComplete = () => {
    const {
      promoType,
      badgeType,
      discount,
      event,
      startDate,
      startTime,
      endDate,
      endTime,
      holdPeriod,
      hasConflict,
    } = formState;

    return (
      promoType &&
      badgeType &&
      discount &&
      event &&
      startDate &&
      startTime &&
      endDate &&
      endTime &&
      holdPeriod &&
      !hasConflict
    );
  };

  const handleCancel = () => {
    setIsPanelOpen(false);
    setStep('select');
    setSelectedLines([]);
    setFormState(defaultForm);
    setHasFormChanged(false);
  };

  const handleRevert = () => {
    setFormState(defaultForm);
    setHasFormChanged(false);
  };

  const handleApplyPromo = () => {
    // Show success modal
    setShowSuccessModal(true);
    
    // After modal closes, show toast and close panel
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsPanelOpen(false);
      setShowToast(true);
    }, 2200);
  };

  const renderPanelContent = () => {
    if (step === 'select') {
      return (
        <LineSelection
          lines={jifLines}
          selectedLines={selectedLines}
          toggleLine={toggleLine}
        />
      );
    }

    if (step === 'configure') {
      return (
        <ConfigurePromo
          selectedLines={selectedLines}
          formState={formState}
          onFormChange={handleFormChange}
          onBack={() => setStep('select')}
          onCancel={handleCancel}
          onApplyPromo={handleApplyPromo}
          onRevert={handleRevert}
        />
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (step === 'select') {
      return (
        <div className="footer-actions">
          <span>{selectedLines.length} selected</span>
          <button 
            onClick={() => setStep('configure')} 
            disabled={selectedLines.length === 0}
            className="apply-btn"
          >
            Next
          </button>
        </div>
      );
    }

    if (step === 'configure') {
      return (
        <div className="footer-actions">
          <button 
            className="revert-btn" 
            onClick={handleRevert}
            disabled={!hasFormChanged}
          >
            Revert
          </button>
          <div className="right-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="apply-btn"
              disabled={!isFormComplete()}
              onClick={handleApplyPromo}
            >
              Apply promo
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <h1>eComm Promo Creating/Conflict Management in OPT - v4 Prototype</h1>
        
        <button
          onClick={handleTriggerClick}
          style={{
            padding: '8px 16px',
            backgroundColor: '#0058AB',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px',
            marginBottom: '30px'
          }}
        >
          Create eComm Promo
        </button>
        
        <div className="prototype-overview">
          <h2>Welcome! 👋</h2>
          <p>This prototype demonstrates the new promotion management flow in OPT.</p>
          <p className="creator-info">Created by: <strong>Brandi Kinard</strong> - Senior UX Designer, Pricing Team</p>
          
          <div className="overview-section">
            <h3>What you'll test:</h3>
            <ul>
              <li>Two-step flow: Select lines → Configure promo</li>
              <li>Conflict detection and resolution workflow</li>
              <li>Cross-tool experience between OPT and PDP</li>
            </ul>
          </div>
          
          <div className="overview-section">
            <h3>Test scenarios:</h3>
            <ol>
              <li><strong>Simple promo:</strong> Use dates 03/01/2024 - 04/30/2024</li>
              <li><strong>Conflict flow:</strong> Use dates 01/01/2024 - 03/31/2024 (must include 64 oz)</li>
            </ol>
          </div>
          
          <div className="conflict-trigger-note">
            <strong>⚠️ Note:</strong> Select the <strong>64 oz line</strong> (with "Promo applied" chip) to trigger conflicts.
          </div>
          
          <div className="feedback-section">
            <h3>Your feedback needed on:</h3>
            <ul>
              <li>Flow intuitiveness</li>
              <li>Conflict resolution clarity</li>
              <li>Cross-tool experience</li>
              <li>Any pain points</li>
            </ul>
          </div>
        </div>
        
        {/* Add space at bottom for scrolling */}
        <div style={{ height: '60px' }}></div>
      </div>

      {isPanelOpen && (
        <PromoPanel
          title="Create eComm Promo"
          onClose={handleCancel}
          footer={renderFooter()}
        >
          {renderPanelContent()}
        </PromoPanel>
      )}
      
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      
      {showToast && (
        <Toast 
          message="Promotion successfully applied!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </Layout>
  );
};

export default Home;