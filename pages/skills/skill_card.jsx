import React from 'react';
import { Badge } from '../../components/common/badge/badge';
import { Trash2 } from 'lucide-react';
import './skill_card.css';

export const SkillCard = ({ skill, onDelete }) => {
  return (
    <div className="mirage-skill-card">
      <div>
        <div className="mirage-skill-top">
          <div>
            <h3 className="mirage-skill-name">{skill.name}</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {skill.category}
            </span>
          </div>
          <Badge variant="accent">{skill.status}</Badge>
        </div>

        {skill.evidence ? (
          <div className="mirage-skill-evidence">
            <strong style={{ color: 'var(--text-muted)' }}>Evidence: </strong>
            {skill.evidence}
          </div>
        ) : (
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 8 }}>
            No practical proof linked yet.
          </div>
        )}
      </div>

      <div className="mirage-skill-footer">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
          Level: {skill.proficiencyLevel || 'Developing'}
        </span>
        <button
          onClick={onDelete}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          title="Delete skill"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};
