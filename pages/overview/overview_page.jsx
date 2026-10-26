import React from 'react';
import { useMirage } from '../../context/use_mirage';
import { metricsService } from '../../services/metrics';
import { PillarsWidget } from './pillars_widget';
import { ProgressBar } from '../../components/common/progressbar/progressbar';
import { Badge } from '../../components/common/badge/badge';
import { Button } from '../../components/common/button/button';
import './overview_page.css';

export const OverviewPage = () => {
  const { state, setActiveTab } = useMirage();
  const stats = metricsService.getOverviewStats(state);

  return (
    <div>
      <div className="mirage-overview-header">
        <h1 className="mirage-overview-title">OVERVIEW</h1>
        <p className="mirage-overview-subtitle">Real-time indicators & active operational tracks</p>
      </div>

      <PillarsWidget />

      <div className="mirage-overview-stats">
        <div className="mirage-stat-card">
          <span className="mirage-stat-label">Active Learning Paths</span>
          <span className="mirage-stat-val">{stats.activePaths}</span>
        </div>
        <div className="mirage-stat-card">
          <span className="mirage-stat-label">Active Certifications</span>
          <span className="mirage-stat-val">{stats.activeCerts}</span>
        </div>
        <div className="mirage-stat-card">
          <span className="mirage-stat-label">Projects In Flight</span>
          <span className="mirage-stat-val">{stats.inProgressProjects}</span>
        </div>
        <div className="mirage-stat-card">
          <span className="mirage-stat-label">Research Papers to Review</span>
          <span className="mirage-stat-val">{stats.papersToRead}</span>
        </div>
      </div>

      <div className="mirage-overview-grid">
        {/* Learning Paths Card */}
        <div className="mirage-section-card">
          <div>
            <div className="mirage-section-header">
              <span className="mirage-section-heading">Active Roadmap Tracks</span>
              <Badge variant="accent">{state.learningPaths.length}</Badge>
            </div>
            <div className="mirage-card-list">
              {state.learningPaths.slice(0, 3).map((lp) => {
                const prog = metricsService.computeRoadmapProgress(lp.topics);
                return (
                  <div key={lp.id} className="mirage-list-row">
                    <div className="mirage-list-row-top">
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lp.title}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                        {prog}%
                      </span>
                    </div>
                    <ProgressBar percent={prog} />
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('roadmap')} style={{ width: '100%' }}>
              Open Full Roadmap →
            </Button>
          </div>
        </div>

        {/* Certifications Card */}
        <div className="mirage-section-card">
          <div>
            <div className="mirage-section-header">
              <span className="mirage-section-heading">Certification Objectives</span>
              <Badge variant="subtle">{state.certifications.length}</Badge>
            </div>
            <div className="mirage-card-list">
              {state.certifications.slice(0, 2).map((cert) => {
                const prog = metricsService.computeCertProgress(cert.objectives);
                return (
                  <div key={cert.id} className="mirage-list-row">
                    <div className="mirage-list-row-top">
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{cert.name}</span>
                      <Badge variant="accent">{cert.status}</Badge>
                    </div>
                    <ProgressBar percent={prog} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      Target: {cert.targetDate || 'None set'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('certifications')} style={{ width: '100%' }}>
              Manage Certifications →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
