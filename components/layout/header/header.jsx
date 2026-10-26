import React from 'react';
import { useMirage } from '../../../context/use_mirage';
import { Search, Menu } from 'lucide-react';
import './header.css';

export const Header = ({ onOpenMobileMenu }) => {
  const { setSearchOpen } = useMirage();
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="mirage-header">
      <div className="mirage-header-left">
        <button
          className="mirage-menu-toggle mobile-only"
          onClick={onOpenMobileMenu}
          aria-label="Open mobile navigation menu"
        >
          <Menu size={16} />
        </button>
        <div className="mirage-header-time">{dateStr}</div>
      </div>

      <div className="mirage-header-actions">
        <button className="mirage-search-btn" onClick={() => setSearchOpen(true)}>
          <Search size={14} color="var(--text-muted)" />
          <span>Quick search...</span>
          <kbd className="mirage-kbd">Ctrl K</kbd>
        </button>
      </div>
    </header>
  );
};
