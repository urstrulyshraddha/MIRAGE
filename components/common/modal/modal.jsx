import React, { useEffect } from 'react';
import './modal.css';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mirage-modal-backdrop" onClick={onClose}>
      <div className="mirage-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="mirage-modal-header">
          <span className="mirage-modal-title">{title}</span>
          <button className="mirage-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>
        <div className="mirage-modal-body">{children}</div>
      </div>
    </div>
  );
};
