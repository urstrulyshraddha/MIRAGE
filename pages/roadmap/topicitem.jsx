import React from 'react';
import { Checkbox } from '../../components/common/checkbox/checkbox';
import { Button } from '../../components/common/button/button';
import { Trash2 } from 'lucide-react';
import './topicitem.css';

export const TopicItem = ({ topic, onToggleStatus, onToggleLab, onDelete }) => {
  const isDone = topic.status === 'Completed';

  return (
    <div className="mirage-topic-item">
      <div className="mirage-topic-main">
        <div className="mirage-topic-left">
          <Checkbox checked={isDone} onChange={onToggleStatus} />
          <span className={`mirage-topic-title ${isDone ? 'mirage-topic-title--done' : ''}`}>
            {topic.title}
          </span>
        </div>

        <div className="mirage-topic-right">
          <Button
            size="sm"
            variant={topic.practiced ? 'primary' : 'outline'}
            onClick={onToggleLab}
            style={{ fontSize: '10px' }}
          >
            {topic.practiced ? '✓ Lab Verified' : '○ Lab Pending'}
          </Button>
          <button
            onClick={onDelete}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}
            title="Delete topic"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {topic.evidence && (
        <div className="mirage-topic-evidence">
          <strong>Proof:</strong> {topic.evidence}
        </div>
      )}
    </div>
  );
};
