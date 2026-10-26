import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { PathCard } from './path_card';
import { Button } from '../../components/common/button/button';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus } from 'lucide-react';
import './roadmap_page.css';

export const RoadmapPage = () => {
  const { state, addItem, updateItem, deleteItem } = useMirage();
  const [newPathTitle, setNewPathTitle] = useState('');
  const [category, setCategory] = useState('Cybersecurity');
  const [priority, setPriority] = useState('High');

  const handleCreatePath = (e) => {
    e.preventDefault();
    if (!newPathTitle.trim()) return;

    const newPath = {
      id: `lp-${Date.now()}`,
      title: newPathTitle.trim(),
      category,
      priority,
      status: 'In Progress',
      targetDate: '',
      description: '',
      topics: []
    };

    addItem('learningPaths', newPath);
    setNewPathTitle('');
  };

  return (
    <div>
      <div className="mirage-roadmap-header">
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          LEARNING ROADMAP
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Structured tracks combining theoretical knowledge with verifiable lab evidence.
        </p>
      </div>

      <div className="mirage-path-creation-box">
        <form onSubmit={handleCreatePath} className="mirage-creation-form-row">
          <input
            type="text"
            className="mirage-input-compact"
            style={{ minWidth: '240px' }}
            placeholder="New learning path name (e.g., Linux Kernel Internals)..."
            value={newPathTitle}
            onChange={(e) => setNewPathTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mirage-input-compact"
            style={{ width: 'auto' }}
          >
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Systems & Networking">Systems & Networking</option>
            <option value="General">General</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mirage-input-compact"
            style={{ width: 'auto' }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <Button size="sm" variant="primary" type="submit">
            <Plus size={14} /> Create Path
          </Button>
        </form>
      </div>

      {state.learningPaths.length === 0 ? (
        <EmptyState
          title="No Learning Paths Established"
          description="Build your first roadmap track to organize topics, checklists, and hands-on lab proof."
        />
      ) : (
        state.learningPaths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            onUpdatePath={(id, updates) => updateItem('learningPaths', id, updates)}
            onDeletePath={(id) => deleteItem('learningPaths', id)}
          />
        ))
      )}
    </div>
  );
};
