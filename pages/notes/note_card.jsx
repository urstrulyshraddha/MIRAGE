import React, { useState } from 'react';
import { Badge } from '../../components/common/badge/badge';
import { Copy, Check, Trash2 } from 'lucide-react';
import './note_card.css';

export const NoteCard = ({ note, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mirage-note-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{note.title}</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            {note.category}
          </span>
        </div>
        <Badge variant="subtle">{note.lastUpdated}</Badge>
      </div>

      <pre className="mirage-note-content">{note.content}</pre>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--surface-border-subtle)', paddingTop: 8 }}>
        <button
          onClick={handleCopy}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '11px', fontFamily: 'var(--font-mono)' }}
        >
          {copied ? <Check size={13} color="var(--accent-sage-hover)" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
        <button
          onClick={onDelete}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};
