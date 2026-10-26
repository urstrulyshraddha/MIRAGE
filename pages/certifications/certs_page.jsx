import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { CertCard } from './cert_card';
import { Button } from '../../components/common/button/button';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus } from 'lucide-react';
import './certs_page.css';

export const CertsPage = () => {
  const { state, addItem, updateItem, deleteItem } = useMirage();
  const [certName, setCertName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!certName.trim()) return;

    const newCert = {
      id: `cert-${Date.now()}`,
      name: certName.trim(),
      issuer: issuer.trim() || 'Official Provider',
      status: 'Studying',
      targetDate: targetDate || '',
      officialUrl: '',
      objectives: []
    };

    addItem('certifications', newCert);
    setCertName('');
    setIssuer('');
    setTargetDate('');
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          CERTIFICATIONS ROADMAP
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Objective domain checklists with calculated exam readiness.
        </p>
      </div>

      <div style={{ background: 'var(--surface-primary)', border: '1px solid var(--surface-border)', padding: 16, borderRadius: 'var(--radius-sm)' }}>
        <form onSubmit={handleAddCert} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="text"
            className="mirage-input-compact"
            style={{ flex: 2 }}
            placeholder="Certification name (e.g., CompTIA CySA+)..."
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
          />
          <input
            type="text"
            className="mirage-input-compact"
            style={{ flex: 1 }}
            placeholder="Issuer (e.g., CompTIA)..."
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
          />
          <input
            type="date"
            className="mirage-input-compact"
            style={{ width: 'auto' }}
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
          <Button size="sm" variant="primary" type="submit">
            <Plus size={14} /> Track Certification
          </Button>
        </form>
      </div>

      {state.certifications.length === 0 ? (
        <EmptyState title="No Active Certifications" description="Track official credentials and check off exam domains." />
      ) : (
        <div className="mirage-certs-grid">
          {state.certifications.map((cert) => (
            <CertCard
              key={cert.id}
              cert={cert}
              onUpdate={(id, updates) => updateItem('certifications', id, updates)}
              onDelete={(id) => deleteItem('certifications', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
