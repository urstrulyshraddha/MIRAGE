import React, { useState } from 'react';
import { useMirage } from '../../context/use_mirage';
import { SkillCard } from './skill_card';
import { Button } from '../../components/common/button/button';
import { EmptyState } from '../../components/common/emptystate/emptystate';
import { Plus } from 'lucide-react';
import './skills_page.css';

export const SkillsPage = () => {
  const { state, addItem, deleteItem } = useMirage();
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Cybersecurity');
  const [evidence, setEvidence] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const newSkill = {
      id: `sk-${Date.now()}`,
      name: skillName.trim(),
      category,
      proficiencyLevel: 'Intermediate',
      status: 'Practicing',
      evidence: evidence.trim(),
      linkedProjectIds: [],
      linkedPathIds: []
    };

    addItem('skills', newSkill);
    setSkillName('');
    setEvidence('');
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          SKILLS ACQUISITION
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
          Demonstrated technical proficiencies backed by real lab evidence.
        </p>
      </div>

      <div style={{ background: 'var(--surface-primary)', border: '1px solid var(--surface-border)', padding: 16, borderRadius: 'var(--radius-sm)' }}>
        <form onSubmit={handleAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 2 }}
              placeholder="Skill name (e.g., Network Traffic Analysis)..."
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mirage-input-compact"
              style={{ flex: 1 }}
            >
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Digital Forensics">Digital Forensics</option>
              <option value="Systems Programming">Systems Programming</option>
              <option value="Networking">Networking</option>
              <option value="Research & GRC">Research & GRC</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="mirage-input-compact"
              style={{ flex: 1 }}
              placeholder="Practical evidence (e.g., Carved malware artifacts from PCAP in Wireshark)..."
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
            <Button size="sm" variant="primary" type="submit">
              <Plus size={14} /> Add Skill
            </Button>
          </div>
        </form>
      </div>

      {state.skills.length === 0 ? (
        <EmptyState title="No Skills Logged" description="Record technical skills and anchor them with concrete proof." />
      ) : (
        <div className="mirage-skills-grid">
          {state.skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} onDelete={() => deleteItem('skills', skill.id)} />
          ))}
        </div>
      )}
    </div>
  );
};
