import { useState, useEffect, useCallback } from 'react';
import { getLoggedInUser, requireAuth } from '../utils/authUtils';

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

const LEGACY_STORAGE_KEY = 'techno_saved_projects';
const EVENT_NAME = 'techno_saved_projects_updated';

function getStorageKey(): string | null {
  const user = getLoggedInUser();
  if (!user) return null;
  const userKey = (user.email || user.name || 'user')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_');
  return `techno_saved_projects_${userKey}`;
}

function getStoredProjects(): SavedProject[] {
  if (typeof window === 'undefined') return [];
  const user = getLoggedInUser();
  // Unauthenticated guests have no permission and zero saved items
  if (!user) return [];

  const key = getStorageKey();
  if (!key) return [];

  try {
    let raw = localStorage.getItem(key);
    // Auto-migrate from legacy key if user-specific key is empty
    if (!raw) {
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        localStorage.setItem(key, legacyRaw);
      }
    }

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
    window.addEventListener('techno_auth_updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('techno_auth_updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  const isSaved = useCallback(
    (id: string) => {
      const user = getLoggedInUser();
      if (!user) return false;
      return savedProjects.some((p) => p.id === id);
    },
    [savedProjects]
  );

  const toggleSave = useCallback((project: Omit<SavedProject, 'savedAt'>) => {
    // If not authenticated, open login and abort saving
    if (!requireAuth()) {
      return false;
    }

    const key = getStorageKey();
    if (!key) return false;

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
      localStorage.setItem(key, JSON.stringify(updated));
      setSavedProjects(updated);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }

    return !exists; // true if saved, false if removed
  }, []);

  const removeSaved = useCallback((id: string) => {
    const user = getLoggedInUser();
    if (!user) return;

    const key = getStorageKey();
    if (!key) return;

    const current = getStoredProjects();
    const updated = current.filter((p) => p.id !== id);
    try {
      localStorage.setItem(key, JSON.stringify(updated));
      setSavedProjects(updated);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Error removing project:', e);
    }
  }, []);

  const clearAll = useCallback(() => {
    const user = getLoggedInUser();
    if (!user) return;

    const key = getStorageKey();
    if (!key) return;

    try {
      localStorage.removeItem(key);
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
