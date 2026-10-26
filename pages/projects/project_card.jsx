import React from 'react';
import { Badge } from '../../components/common/badge/badge';
import { Trash2, Github, ExternalLink } from 'lucide-react';
import './project_card.css';

export const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="mirage-project-card">
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.name}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 4 }}>{project.description}</p>
          </div>
          <Badge variant="accent">{project.status}</Badge>
        </div>

        <div className="mirage-project-tags">
          {project.techStack.map((tech) => (
            <span key={tech} className="mirage-tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {project.lessonsLearned && (
          <div style={{ marginTop: 12, padding: 8, background: 'var(--surface-secondary)', border: '1px solid var(--surface-border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: 'var(--text-muted)' }}>
            <strong>Retrospective:</strong> {project.lessonsLearned}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--surface-border-subtle)', paddingTop: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }} title="Code Repository">
              <Github size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)' }} title="Live Deployment">
              <ExternalLink size={15} />
            </a>
          )}
        </div>
        <button onClick={onDelete} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
