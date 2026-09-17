import { useState, useEffect, useCallback } from 'react';

export interface SavedProject {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryLabel?: string;
  description: string;
  descriptionEn?: string;
  type: 'project' | 'article' | 'video' | 'academic' | 'live';
  url?: string;
  image?: string;
  pdfId?: string;
  pptxId?: string;
  docxId?: string;
  tags?: string[];
  duration?: string;
  savedAt: number;
}

const STORAGE_KEY = 'techno_saved_projects';
const EVENT_NAME = 'techno_saved_projects_updated';

function getStoredProjects(): SavedProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading saved projects:', e);
    return [];
  }
}

export function useSavedProjects() {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(getStoredProjects);

  const sync = useCallback(() => {
    setSavedProjects(getStoredProjects());
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  const isSaved = useCallback(
    (id: string) => {
      return savedProjects.some((p) => p.id === id);
    },
    [savedProjects]
  );

  const toggleSave = useCallback((project: Omit<SavedProject, 'savedAt'>) => {
    const current = getStoredProjects();
    const exists = current.some((p) => p.id === project.id);
    let updated: SavedProject[];

    if (exists) {
      updated = current.filter((p) => p.id !== project.id);
    } else {
      const newItem: SavedProject = {
        ...project,
        savedAt: Date.now()
      };
      updated = [newItem, ...current];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedProjects(updated);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }

    return !exists; // true if saved, false if removed
  }, []);

  const removeSaved = useCallback((id: string) => {
    const current = getStoredProjects();
    const updated = current.filter((p) => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedProjects(updated);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Error removing project:', e);
    }
  }, []);

  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedProjects([]);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Error clearing saved projects:', e);
    }
  }, []);

  return {
    savedProjects,
    count: savedProjects.length,
    isSaved,
    toggleSave,
    removeSaved,
    clearAll
  };
}

export default useSavedProjects;
