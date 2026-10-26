import React from 'react';
import { useMirage } from '../../../context/use_mirage';
import {
  LayoutDashboard,
  Compass,
  Cpu,
  Award,
  Terminal,
  BookOpen,
  Lightbulb,
  FileText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import './sidebar.css';

export const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab } = useMirage();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Compass },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'projects', label: 'Projects', icon: Terminal },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'backlog', label: 'Idea Backlog', icon: Lightbulb },
    { id: 'notes', label: 'Notes & Cheats', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Sliders }
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div className="mirage-sidebar-backdrop" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`mirage-sidebar ${collapsed ? 'mirage-sidebar--collapsed' : ''} ${
          mobileOpen ? 'mirage-sidebar--mobile-open' : ''
        }`}
      >
        <div className="mirage-sidebar-top">
          <div className="mirage-brand-text mirage-sidebar-brand">
            {(!collapsed || mobileOpen) && (
              <div>
                <div className="mirage-brand-title">MIRAGE</div>
                <div className="mirage-brand-tagline">BECOMING</div>
              </div>
            )}

            {/* Desktop collapse toggle */}
            <button
              className="mirage-toggle-btn desktop-only"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle navigation drawer"
              style={collapsed ? { margin: '0 auto' } : {}}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Mobile close button */}
            <button
              className="mirage-toggle-btn mobile-only"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="mirage-sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  title={collapsed && !mobileOpen ? item.label : undefined}
                  className={`mirage-nav-item ${isActive ? 'mirage-nav-item--active' : ''}`}
                >
                  <Icon size={16} color={isActive ? 'var(--accent-sage-hover)' : 'var(--text-secondary)'} />
                  {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {(!collapsed || mobileOpen) && (
          <div className="mirage-sidebar-footer">
            The person I’m yet to become.
          </div>
        )}
      </aside>
    </>
  );
};
