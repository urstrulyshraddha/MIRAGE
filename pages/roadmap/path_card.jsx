import React, { useState } from 'react';
import { ProgressBar } from '../../components/common/progressbar/progressbar';
import { Badge } from '../../components/common/badge/badge';
import { Button } from '../../components/common/button/button';
import { TopicItem } from './topicitem';
import { metricsService } from '../../services/metrics';
import { Trash2, Plus } from 'lucide-react';
import './path_card.css';

export const PathCard = ({ path, onUpdatePath, onDeletePath }) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const progress = metricsService.computeRoadmapProgress(path.topics);

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const newTopic = {
      id: `top-${Date.now()}`,
      title: newTopicTitle.trim(),
      status: 'In Progress',
      theoryRead: true,
      practiced: false,
      evidence: '',
      notes: ''
    };

    onUpdatePath(path.id, {
      topics: [...path.topics, newTopic]
    });
    setNewTopicTitle('');
  };

  const handleToggleStatus = (topicId) => {
    const nextTopics = path.topics.map((t) => {
      if (t.id === topicId) {
        return {
          ...t,
          status: t.status === 'Completed' ? 'In Progress' : 'Completed'
        };
      }
      return t;
    });
    onUpdatePath(path.id, { topics: nextTopics });
  };

  const handleToggleLab = (topicId) => {
    const nextTopics = path.topics.map((t) => {
      if (t.id === topicId) {
        return { ...t, practiced: !t.practiced };
      }
      return t;
    });
    onUpdatePath(path.id, { topics: nextTopics });
  };

  const handleDeleteTopic = (topicId) => {
    const nextTopics = path.topics.filter((t) => t.id !== topicId);
    onUpdatePath(path.id, { topics: nextTopics });
  };

  return (
    <div className="mirage-path-card">
      <div className="mirage-path-header">
        <div className="mirage-path-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 className="mirage-path-title">{path.title}</h2>
            <Badge variant="accent">{path.category}</Badge>
            <Badge variant="subtle">{path.priority}</Badge>
          </div>
          {path.description && <p className="mirage-path-desc">{path.description}</p>}
        </div>

        <div className="mirage-path-meta">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
            {progress}% Completed
          </span>
          <button
            onClick={() => onDeletePath(path.id)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            title="Delete learning path"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <ProgressBar percent={progress} />

      <div className="mirage-path-topics">
        {path.topics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            onToggleStatus={() => handleToggleStatus(topic.id)}
            onToggleLab={() => handleToggleLab(topic.id)}
            onDelete={() => handleDeleteTopic(topic.id)}
          />
        ))}
      </div>

      <form onSubmit={handleAddTopic} className="mirage-add-topic-form">
        <input
          type="text"
          className="mirage-input-compact"
          placeholder="Add module or topic to checklist..."
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
        />
        <Button size="sm" type="submit" variant="secondary">
          <Plus size={14} /> Add Topic
        </Button>
      </form>
    </div>
  );
};
