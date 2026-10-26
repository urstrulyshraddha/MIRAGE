import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { NoteCard } from './note_card';
import { Button } from '../../components/common/button/button';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus } from 'lucide-react';
import './notes_page.css';

export const NotesPage = () => {
  const { state, addItem, deleteItem } = useMirage();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cheatsheet');
  const [content, setContent] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
      tags: [],
      lastUpdated: new Date().toISOString().slice(0, 10)
    };

    addItem('notes', newNote);
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          NOTES & COMMAND CHEATS
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          CLI syntax snippets, quick recipes, and technical reference material.
        </p>
      </div>

      <div style={{ background: 'var(--surface-primary)', border: '1px solid var(--surface-border)', padding: 16, borderRadius: 'var(--radius-sm)' }}>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 2 }}
              placeholder="Note title (e.g., Linux Memory Acquisition Reference)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 1 }}
              placeholder="Category (e.g., Forensics Cheatsheet)..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <textarea
            className="mirage-input-compact"
            rows={3}
            placeholder="CLI commands or technical notes..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="sm" variant="primary" type="submit">
              <Plus size={14} /> Add Note
            </Button>
          </div>
        </form>
      </div>

      {state.notes.length === 0 ? (
        <EmptyState title="No Notes Stored" description="Save command lines, cheat sheets, and reference notes." />
      ) : (
        <div className="mirage-notes-grid">
          {state.notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={() => deleteItem('notes', note.id)} />
          ))}
        </div>
      )}
    </div>
  );
};
