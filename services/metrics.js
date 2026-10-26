export const metricsService = {
  computeRoadmapProgress(topics = []) {
    if (!topics || topics.length === 0) return 0;
    const completed = topics.filter(t => t.status === 'Completed').length;
    return Math.round((completed / topics.length) * 100);
  },

  computeCertProgress(objectives = []) {
    if (!objectives || objectives.length === 0) return 0;
    const completed = objectives.filter(o => o.completed).length;
    return Math.round((completed / objectives.length) * 100);
  },

  computeResearchProgress(sections = []) {
    if (!sections || sections.length === 0) return 0;
    const completed = sections.filter(s => s.completed).length;
    return Math.round((completed / sections.length) * 100);
  },

  computeProjectProgress(milestones = []) {
    if (!milestones || milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
  },

  getOverviewStats(state) {
    const activePaths = state.learningPaths.filter(p => p.status === 'In Progress').length;
    const inProgressProjects = state.projects.filter(p => p.status === 'In Progress').length;
    const activeCerts = state.certifications.filter(c => c.status === 'Studying' || c.status === 'Exam Ready').length;
    const papersToRead = state.research.reduce((acc, r) => {
      return acc + r.papers.filter(p => p.readingStatus === 'To Read' || p.readingStatus === 'Reading').length;
    }, 0);

    return {
      activePaths,
      inProgressProjects,
      activeCerts,
      papersToRead
    };
  }
};
