import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { ProjectCard } from './project_card';
import { Button } from '../../components/common/button/button';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus } from 'lucide-react';
import './projects_page.css';

export const ProjectsPage = () => {
  const { state, addItem, deleteItem } = useMirage();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [techStr, setTechStr] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      description: desc.trim(),
      status: 'In Progress',
      priority: 'Medium',
      repoUrl: '',
      liveUrl: '',
      techStack: techStr ? techStr.split(',').map((s) => s.trim()).filter(Boolean) : [],
      milestones: []
    };

    addItem('projects', newProject);
    setName('');
    setDesc('');
    setTechStr('');
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          PROJECTS & TOOLS
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Practical utility construction, security tools, and open-source implementations.
        </p>
      </div>

      <div style={{ background: 'var(--surface-primary)', border: '1px solid var(--surface-border)', padding: 16, borderRadius: 'var(--radius-sm)' }}>
        <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="text"
            className="mirage-input-compact"
            placeholder="Project title (e.g., Forensic Triage Collector)..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="mirage-input-compact"
            placeholder="Purpose and scope description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 1 }}
              placeholder="Tech stack, comma separated (e.g. Python, Docker, SQLite)..."
              value={techStr}
              onChange={(e) => setTechStr(e.target.value)}
            />
            <Button size="sm" variant="primary" type="submit">
              <Plus size={14} /> New Project
            </Button>
          </div>
        </form>
      </div>

      {state.projects.length === 0 ? (
        <EmptyState title="No Active Projects" description="Document utilities, tools, and technical applications you are building." />
      ) : (
        <div className="mirage-projects-grid">
          {state.projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} onDelete={() => deleteItem('projects', proj.id)} />
          ))}
        </div>
      )}
    </div>
  );
};
