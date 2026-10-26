import React from 'react';
import { MirageProvider } from './context/mirage_context';
import { useMirage } from './context/use_mirage';
import { Shell } from './components/layout/shell/shell';

// View Pages
import { OverviewPage } from './pages/overview/overview_page';
import { RoadmapPage } from './pages/roadmap/roadmap_page';
import { SkillsPage } from './pages/skills/skills_page';
import { CertsPage } from './pages/certifications/certs_page';
import { ProjectsPage } from './pages/projects/projects_page';
import { ResearchPage } from './pages/research/research_page';
import { BacklogPage } from './pages/backlog/backlog_page';
import { NotesPage } from './pages/notes/notes_page';
import { SettingsPage } from './pages/settings/settings_page';

const ViewRouter = () => {
  const { activeTab } = useMirage();

  switch (activeTab) {
    case 'overview':
      return <OverviewPage />;
    case 'roadmap':
      return <RoadmapPage />;
    case 'skills':
      return <SkillsPage />;
    case 'certifications':
      return <CertsPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'research':
      return <ResearchPage />;
    case 'backlog':
      return <BacklogPage />;
    case 'notes':
      return <NotesPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <OverviewPage />;
  }
};

export default function App() {
  return (
    <MirageProvider>
      <Shell>
        <ViewRouter />
      </Shell>
    </MirageProvider>
  );
}
