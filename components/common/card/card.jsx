import React from 'react';
import './card.css';

export const Card = ({
  children,
  elevated = false,
  interactive = false,
  className = '',
  ...props
}) => {
  const classes = [
    'mirage-card',
    elevated ? 'mirage-card--elevated' : '',
    interactive ? 'mirage-card--interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
