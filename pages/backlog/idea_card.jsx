import React from 'react';
import { Badge } from '../../components/common/badge/badge';
import { Button } from '../../components/common/button/button';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import './idea_card.css';

export const IdeaCard = ({ idea, onPromote, onDelete }) => {
  return (
    <div className="mirage-idea-card">
      <div>
        <div className="mirage-idea-header">
          <h3 className="mirage-idea-title">{idea.title}</h3>
          <Badge variant={idea.status === 'Promoted' ? 'accent' : 'subtle'}>{idea.status}</Badge>
        </div>
        <p className="mirage-idea-desc">{idea.description}</p>
        {idea.possibleTech && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: 8 }}>
            Tech: {idea.possibleTech}
          </div>
        )}
      </div>

      <div className="mirage-idea-footer">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
          {idea.dateAdded}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {idea.status !== 'Promoted' && (
            <Button size="sm" variant="secondary" onClick={onPromote} style={{ fontSize: '10px' }}>
              <ArrowUpRight size={12} /> Promote
            </Button>
          )}
          <button
            onClick={onDelete}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
