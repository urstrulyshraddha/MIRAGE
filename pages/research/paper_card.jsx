import React from 'react';
import { Badge } from '../../components/common/badge/badge';
import { ExternalLink, Trash2 } from 'lucide-react';
import './paper_card.css';

export const PaperCard = ({ paper, onDelete, onCycleStatus }) => {
  return (
    <div className="mirage-paper-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <h4 className="mirage-paper-title">{paper.title}</h4>
        <div style={{ cursor: 'pointer' }} onClick={onCycleStatus}>
          <Badge variant="accent">{paper.readingStatus}</Badge>
        </div>
      </div>

      <div className="mirage-paper-meta">
        {paper.authors} ({paper.year}) — {paper.venue}
      </div>

      {paper.summaryNotes && (
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: 4 }}>
          {paper.summaryNotes}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        {paper.url ? (
          <a href={paper.url} target="_blank" rel="noreferrer" style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>Source / DOI</span>
            <ExternalLink size={10} />
          </a>
        ) : <span />}
        <button onClick={onDelete} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};
