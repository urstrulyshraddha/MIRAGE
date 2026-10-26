import React, { useRef } from 'react';
import { useMirage } from '../../context/use_mirage';
import { storageService } from '../../services/storage';
import { initialData } from '../../data/sampledata';
import { Button } from '../../components/common/button/button';
import { Download, Upload, RotateCcw, AlertTriangle } from 'lucide-react';
import './settings_page.css';

export const SettingsPage = () => {
  const { state, restoreState, wipeAll } = useMirage();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    storageService.exportJSON(state);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await storageService.importJSON(file);
      restoreState(parsed);
      alert('Backup imported successfully.');
    } catch (err) {
      alert(`Import error: ${err.message}`);
    }
  };

  const handleResetSample = () => {
    if (confirm('Restore default sample dataset? Any unsaved changes will be replaced.')) {
      restoreState(initialData);
    }
  };

  const handleWipe = () => {
    if (confirm('WIPE ALL DATA? This resets all roadmaps, tasks, projects, and notes.')) {
      wipeAll();
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          SETTINGS & DATA MANAGEMENT
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Local persistence operations, JSON archive exports, and maintenance actions.
        </p>
      </div>

      <div className="mirage-settings-box">
        <div className="mirage-settings-section-title">Data Backup & Migration</div>
        <p className="mirage-settings-desc">
          MIRAGE persists everything inside browser local storage. Download a JSON backup to keep your learning archive safe or transfer it to another browser.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="primary" size="sm" onClick={handleExport}>
            <Download size={14} /> Export Backup (JSON)
          </Button>
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload size={14} /> Restore from File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleImport}
          />
        </div>
      </div>

      <div className="mirage-settings-box">
        <div className="mirage-settings-section-title">Maintenance & State Restoration</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--surface-border-subtle)', paddingBottom: 12 }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Reset to Sample Dataset</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reload standard cybersecurity paths and skills.</div>
            </div>
            <Button size="sm" variant="outline" onClick={handleResetSample}>
              <RotateCcw size={13} /> Reset Sample
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Wipe All Local Storage</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Clears all stored entries for a fresh workspace.</div>
            </div>
            <Button size="sm" variant="danger" onClick={handleWipe}>
              <AlertTriangle size={13} /> Wipe State
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
