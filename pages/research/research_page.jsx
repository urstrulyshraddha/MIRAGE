import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { PaperCard } from './paper_card';
import { Button } from '../../components/common/button/button';
import { Badge } from '../../components/common/badge/badge';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus, Trash2 } from 'lucide-react';
import './research_page.css';

export const ResearchPage = () => {
  const { state, addItem, updateItem, deleteItem } = useMirage();
  const [topicTitle, setTopicTitle] = useState('');
  const [question, setQuestion] = useState('');

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!topicTitle.trim()) return;

    const newTopic = {
      id: `res-${Date.now()}`,
      title: topicTitle.trim(),
      researchQuestion: question.trim(),
      status: 'Reading',
      papers: [],
      draftSections: []
    };

    addItem('research', newTopic);
    setTopicTitle('');
    setQuestion('');
  };

  const cycleStatus = (researchId, paperId) => {
    const statuses = ['To Read', 'Reading', 'Read', 'Reviewed'];
    const rItem = state.research.find((r) => r.id === researchId);
    if (!rItem) return;

    const updated = rItem.papers.map((p) => {
      if (p.id === paperId) {
        const nextIdx = (statuses.indexOf(p.readingStatus) + 1) % statuses.length;
        return { ...p, readingStatus: statuses[nextIdx] };
      }
      return p;
    });

    updateItem('research', researchId, { papers: updated });
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          RESEARCH & LITERATURE
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Academic paper reading lists, citation metadata, and manuscript drafting tracks.
        </p>
      </div>

      <div style={{ background: 'var(--surface-primary)', border: '1px solid var(--surface-border)', padding: 16, borderRadius: 'var(--radius-sm)', marginBottom: 20 }}>
        <form onSubmit={handleCreateTopic} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="text"
            className="mirage-input-compact"
            placeholder="Research topic / paper title..."
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 1 }}
              placeholder="Core investigative research question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button size="sm" variant="primary" type="submit">
              <Plus size={14} /> New Research Item
            </Button>
          </div>
        </form>
      </div>

      {state.research.length === 0 ? (
        <EmptyState title="No Research Tracks Active" description="Organize literature reviews, papers to read, and drafting outlines." />
      ) : (
        state.research.map((item) => (
          <div key={item.id} className="mirage-research-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</h3>
                {item.researchQuestion && (
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 4 }}>
                    <strong>Question:</strong> {item.researchQuestion}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge variant="accent">{item.status}</Badge>
                <button
                  onClick={() => deleteItem('research', item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {item.papers.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  onCycleStatus={() => cycleStatus(item.id, paper.id)}
                  onDelete={() => {
                    const nextPapers = item.papers.filter((p) => p.id !== paper.id);
                    updateItem('research', item.id, { papers: nextPapers });
                  }}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
