import React from 'react';
import './emptystate.css';
import { Button } from '../button/button';

export const EmptyState = ({ title, description, actionText, onAction }) => {
  return (
    <div className="mirage-empty">
      <div className="mirage-empty__title">{title}</div>
      <p className="mirage-empty__desc">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
