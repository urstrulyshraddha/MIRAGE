import React, { useState } from 'react';
import { useMirage } from '../../../context/use_mirage';
import { Modal } from '../modal/modal';
import { Search } from 'lucide-react';
import './searchmodal.css';

export const SearchModal = () => {
  const { state, searchOpen, setSearchOpen, setActiveTab } = useMirage();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();
  const hits = [];

  if (q.length > 1) {
    state.learningPaths.forEach(lp => {
      if (lp.title.toLowerCase().includes(q)) hits.push({ type: 'Roadmap', title: lp.title, tab: 'roadmap' });
      lp.topics.forEach(t => {
        if (t.title.toLowerCase().includes(q)) hits.push({ type: 'Topic', title: `${lp.title} → ${t.title}`, tab: 'roadmap' });
      });
    });
    state.skills.forEach(s => {
      if (s.name.toLowerCase().includes(q)) hits.push({ type: 'Skill', title: s.name, tab: 'skills' });
    });
    state.certifications.forEach(c => {
      if (c.name.toLowerCase().includes(q)) hits.push({ type: 'Cert', title: c.name, tab: 'certifications' });
    });
    state.projects.forEach(p => {
      if (p.name.toLowerCase().includes(q)) hits.push({ type: 'Project', title: p.name, tab: 'projects' });
    });
    state.research.forEach(r => {
      if (r.title.toLowerCase().includes(q)) hits.push({ type: 'Research', title: r.title, tab: 'research' });
    });
    state.notes.forEach(n => {
      if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
        hits.push({ type: 'Note', title: n.title, tab: 'notes' });
      }
    });
  }

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setSearchOpen(false);
  };

  return (
    <Modal isOpen={searchOpen} onClose={() => setSearchOpen(false)} title="Search Workspace">
      <div className="mirage-search">
        <div className="mirage-search-bar">
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            className="mirage-search-input"
            placeholder="Search paths, certs, projects, topics, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mirage-search-results">
          {q.length <= 1 ? (
            <div className="mirage-search-empty">Type at least 2 characters to search across MIRAGE.</div>
          ) : hits.length === 0 ? (
            <div className="mirage-search-empty">No records matched your search query.</div>
          ) : (
            hits.map((hit, index) => (
              <div key={index} className="mirage-search-item" onClick={() => handleSelect(hit.tab)}>
                <span>{hit.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-sage-hover)' }}>
                  {hit.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
