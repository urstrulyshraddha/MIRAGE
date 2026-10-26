import React, { useState } from 'react';
import { ProgressBar } from '../../components/common/progressbar/progressbar';
import { Badge } from '../../components/common/badge/badge';
import { Button } from '../../components/common/button/button';
import { Checkbox } from '../../components/common/checkbox/checkbox';
import { metricsService } from '../../services/metrics';
import { Trash2, Plus, ExternalLink } from 'lucide-react';
import './cert_card.css';

export const CertCard = ({ cert, onUpdate, onDelete }) => {
  const [newObjTitle, setNewObjTitle] = useState('');
  const progress = metricsService.computeCertProgress(cert.objectives);

  const handleToggleObj = (objId) => {
    const updated = cert.objectives.map((o) => (o.id === objId ? { ...o, completed: !o.completed } : o));
    onUpdate(cert.id, { objectives: updated });
  };

  const handleAddObj = (e) => {
    e.preventDefault();
    if (!newObjTitle.trim()) return;

    const newObj = {
      id: `obj-${Date.now()}`,
      title: newObjTitle.trim(),
      completed: false
    };
    onUpdate(cert.id, { objectives: [...cert.objectives, newObj] });
    setNewObjTitle('');
  };

  return (
    <div className="mirage-cert-card">
      <div className="mirage-cert-top">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 className="mirage-cert-name">{cert.name}</h3>
            <Badge variant="accent">{cert.status}</Badge>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Issuer: {cert.issuer}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {cert.officialUrl && (
            <a
              href={cert.officialUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-muted)' }}
              title="Official Link"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <button
            onClick={() => onDelete(cert.id)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <ProgressBar percent={progress} />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
        <span style={{ color: 'var(--text-muted)' }}>Target: {cert.targetDate || 'None'}</span>
        <span style={{ color: 'var(--accent-sage-hover)' }}>{progress}% Readiness</span>
      </div>

      <div className="mirage-cert-objectives">
        {cert.objectives.map((obj) => (
          <div key={obj.id} className="mirage-cert-obj-item">
            <Checkbox
              checked={obj.completed}
              onChange={() => handleToggleObj(obj.id)}
              label={<span style={obj.completed ? { textDecoration: 'line-through', color: 'var(--text-muted)' } : {}}>{obj.title}</span>}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleAddObj} style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <input
          type="text"
          className="mirage-input-compact"
          placeholder="Add official domain objective..."
          value={newObjTitle}
          onChange={(e) => setNewObjTitle(e.target.value)}
        />
        <Button size="sm" type="submit" variant="secondary">
          <Plus size={14} /> Objective
        </Button>
      </form>
    </div>
  );
};
