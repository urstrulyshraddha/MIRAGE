import React from 'react';
import './pillars_widget.css';

const PILLARS = [
  { letter: 'M', title: 'Milestones', desc: 'Tangible targets & exam ready dates.' },
  { letter: 'I', title: 'Intentions', desc: 'Focus directives over passive consuming.' },
  { letter: 'R', title: 'Research', desc: 'Literature breakdowns, papers, deep investigations.' },
  { letter: 'A', title: 'Acquisition', desc: 'Skills proven via real-world practical evidence.' },
  { letter: 'G', title: 'Growth', desc: 'Derived progress based on completed items.' },
  { letter: 'E', title: 'Exploration', desc: 'Low-friction backlog of future project concepts.' }
];

export const PillarsWidget = () => {
  return (
    <div className="mirage-pillars-grid">
      {PILLARS.map((p) => (
        <div key={p.letter} className="mirage-pillar-card">
          <div className="mirage-pillar-badge">{p.letter}</div>
          <div>
            <div className="mirage-pillar-title">{p.title}</div>
            <div className="mirage-pillar-desc">{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
