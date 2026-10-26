import React from 'react';
import './progressbar.css';

export const ProgressBar = ({ percent = 0, className = '' }) => {
  const bounded = Math.min(100, Math.max(0, percent));
  return (
    <div className={`mirage-progress ${className}`} role="progressbar" aria-valuenow={bounded} aria-valuemin="0" aria-valuemax="100">
      <div className="mirage-progress__fill" style={{ width: `${bounded}%` }} />
    </div>
  );
};
