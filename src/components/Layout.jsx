// src/components/Layout.jsx
import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
      </header>
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
