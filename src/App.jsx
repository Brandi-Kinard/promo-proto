// src/App.jsx
import React, { useState } from 'react';
import LineSelection from './pages/LineSelection';
import ConfigurePromo from './pages/ConfigurePromo';

function App() {
  const [step, setStep] = useState('select');

  return (
    <div className="App">
      {step === 'select' && <LineSelection onNext={() => setStep('configure')} />}
      {step === 'configure' && <ConfigurePromo onBack={() => setStep('select')} />}
    </div>
  );
}

export default App;

