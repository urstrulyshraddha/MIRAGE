import { initialData } from '../data/sampledata';

const STORAGE_KEY = 'mirage_tracker_state_v1';

export const storageService = {
  load() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        this.save(initialData);
        return initialData;
      }
      const parsed = JSON.parse(serialized);
      // Validate schema root presence
      if (!parsed.learningPaths || !parsed.skills || !parsed.certifications) {
        console.warn('Malformed storage state detected. Re-seeding defaults.');
        return initialData;
      }
      return parsed;
    } catch (err) {
      console.error('Error reading localStorage:', err);
      return initialData;
    }
  },

  save(state) {
    try {
      const stateToSave = {
        ...state,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Error writing to localStorage:', err);
    }
  },

  exportJSON(state) {
    const jsonString = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `mirage_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
  },

  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!parsed.learningPaths || !parsed.projects) {
            reject(new Error('Invalid MIRAGE backup schema: missing core collections.'));
            return;
          }
          resolve(parsed);
        } catch (e) {
          reject(new Error('JSON parse error: file is corrupted or not valid JSON.'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read backup file from filesystem.'));
      reader.readAsText(file);
    });
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  }
};
