import React from 'react';
import './checkbox.css';

export const Checkbox = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`mirage-checkbox-label ${className}`}>
      <input
        type="checkbox"
        className="mirage-checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label && <span>{label}</span>}
    </label>
  );
};
