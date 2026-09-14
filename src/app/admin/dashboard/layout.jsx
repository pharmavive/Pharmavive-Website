// src/app/admin/dashboard/layout.jsx
'use client';

import React, { Suspense } from 'react';

export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={
      <div className="loading-wrapper">
        <div className="spinner loading-spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    }>
      {children}
    </Suspense>
  );
}