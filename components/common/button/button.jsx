import React from 'react';
import './button.css';

export const Button = ({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`mirage-btn mirage-btn--${variant} mirage-btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
