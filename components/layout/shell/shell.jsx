import React, { useState, useEffect } from 'react';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { SearchModal } from '../../common/searchmodal/searchmodal';
import { useMirage } from '../../../context/use_mirage';
import './shell.css';

export const Shell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setSearchOpen } = useMirage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  return (
    <div className="mirage-shell">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="mirage-shell-main">
        <Header onOpenMobileMenu={() => setMobileOpen(true)} />
        <main className="mirage-shell-content">
          <div className="mirage-shell-container">{children}</div>
        </main>
      </div>
      <SearchModal />
    </div>
  );
};
