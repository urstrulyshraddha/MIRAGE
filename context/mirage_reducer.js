export const ACTION_TYPES = {
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  PROMOTE_IDEA_TO_PROJECT: 'PROMOTE_IDEA_TO_PROJECT',
  RESTORE_STATE: 'RESTORE_STATE',
  RESET_SAMPLE: 'RESET_SAMPLE',
  WIPE_STATE: 'WIPE_STATE'
};

export const mirageReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM: {
      const { collection, item } = action.payload;
      return {
        ...state,
        [collection]: [item, ...(state[collection] || [])]
      };
    }

    case ACTION_TYPES.UPDATE_ITEM: {
      const { collection, id, updates } = action.payload;
      return {
        ...state,
        [collection]: (state[collection] || []).map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      };
    }

    case ACTION_TYPES.DELETE_ITEM: {
      const { collection, id } = action.payload;
      return {
        ...state,
        [collection]: (state[collection] || []).filter(item => item.id !== id)
      };
    }

    case ACTION_TYPES.PROMOTE_IDEA_TO_PROJECT: {
      const { ideaId } = action.payload;
      const targetIdea = state.ideas.find(i => i.id === ideaId);
      if (!targetIdea) return state;

      const newProject = {
        id: `proj-${Date.now()}`,
        name: targetIdea.title,
        description: targetIdea.description,
        status: 'Planned',
        priority: 'Medium',
        repoUrl: '',
        liveUrl: '',
        techStack: targetIdea.possibleTech
          ? targetIdea.possibleTech.split(',').map(s => s.trim()).filter(Boolean)
          : [],
        linkedSkillIds: [],
        milestones: [],
        lessonsLearned: ''
      };

      return {
        ...state,
        projects: [newProject, ...state.projects],
        ideas: state.ideas.map(i =>
          i.id === ideaId ? { ...i, status: 'Promoted' } : i
        )
      };
    }

    case ACTION_TYPES.RESTORE_STATE: {
      return { ...action.payload };
    }

    case ACTION_TYPES.WIPE_STATE: {
      return {
        version: "1.0.0",
        lastModified: new Date().toISOString(),
        settings: { theme: 'dark', autoSave: true },
        learningPaths: [],
        skills: [],
        certifications: [],
        projects: [],
        research: [],
        ideas: [],
        notes: []
      };
    }

    default:
      return state;
  }
};
