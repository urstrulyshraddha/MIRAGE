import React from 'react';
import './badge.css';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  return (
    <span className={`mirage-badge mirage-badge--${variant} ${className}`}>
      {children}
    </span>
  );
};
