'use client';

import { useState, useEffect, useCallback } from 'react';
import { getLoggedInUser, requireAuth, apiRequest, AUTH_EVENT } from '@/lib/auth';

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

type ItemType = 'project' | 'video' | 'article';

interface ServerItem {
  itemType: ItemType;
  itemSlug: string;
  createdAt: number;
  meta: Record<string, string>;
}

// Saved items live in D1 (/api/saved). One module-level store is shared by every
// component using the hook, so the list is fetched once per session, not per card.
let store: SavedProject[] = [];
let loadedFor: string | null = null;
let loading: Promise<void> | null = null;
const listeners = new Set<(items: SavedProject[]) => void>();
let authListenerBound = false;

const emit = () => listeners.forEach((fn) => fn(store));

const toItemType = (type: SavedProject['type']): ItemType =>
  type === 'article' ? 'article' : type === 'video' ? 'video' : 'project';

function fromServer(it: ServerItem): SavedProject {
  const m = it.meta || {};
  const subtype = m.subtype as SavedProject['type'] | undefined;
  return {
    id: it.itemSlug,
    title: m.title || it.itemSlug,
    titleEn: m.titleEn,
    category: m.category || '',
    categoryLabel: m.categoryLabel,
    description: m.description || '',
    descriptionEn: m.descriptionEn,
    type: it.itemType === 'project' && subtype && subtype !== 'article' && subtype !== 'video' ? subtype : it.itemType,
    url: m.url,
    image: m.image,
    duration: m.duration,
    savedAt: it.createdAt
  };
}

function load(force = false): Promise<void> {
  const user = getLoggedInUser();
  if (!user) {
    store = [];
    loadedFor = null;
    emit();
    return Promise.resolve();
  }
  if (!force && loadedFor === user.name) return loading ?? Promise.resolve();
  loadedFor = user.name;
  loading = apiRequest<{ items: ServerItem[] }>('/api/saved').then((res) => {
    if (res.ok) store = res.items.map(fromServer);
    else if (res.status === 401) store = [];
    emit();
  });
  return loading;
}

async function persist(item: SavedProject, save: boolean): Promise<boolean> {
  const payload = { item_type: toItemType(item.type), item_slug: item.id };
  const res = save
    ? await apiRequest('/api/saved', {
        method: 'POST',
        body: {
          ...payload,
          meta: {
            title: item.title,
            titleEn: item.titleEn,
            description: item.description,
            descriptionEn: item.descriptionEn,
            category: item.category,
            categoryLabel: item.categoryLabel,
            image: item.image,
            url: item.url,
            duration: item.duration,
            subtype: item.type
          }
        }
      })
    : await apiRequest('/api/saved', { method: 'DELETE', body: payload });
  if (!res.ok && res.status === 401) requireAuth();
  return res.ok;
}

export function useSavedProjects() {
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>(store);

  useEffect(() => {
    listeners.add(setSavedProjects);
    setSavedProjects(store);
    if (!authListenerBound) {
      // Bound once for the whole store, not per hook instance (avoids N refetches).
      authListenerBound = true;
      window.addEventListener(AUTH_EVENT, () => load(true));
    }
    load();
    return () => {
      listeners.delete(setSavedProjects);
    };
  }, []);

  const isSaved = useCallback((id: string) => savedProjects.some((p) => p.id === id), [savedProjects]);

  const toggleSave = useCallback((project: Omit<SavedProject, 'savedAt'>) => {
    // If not authenticated, open login and abort saving
    if (!requireAuth()) return false;

    const existing = store.find((p) => p.id === project.id);
    const before = store;
    const item: SavedProject = existing ?? { ...project, savedAt: Date.now() };
    // Optimistic update, rolled back if the server refuses.
    store = existing ? store.filter((p) => p.id !== project.id) : [item, ...store];
    emit();
    persist(item, !existing).then((ok) => {
      if (!ok) {
        store = before;
        emit();
      }
    });
    return !existing; // true if saved, false if removed
  }, []);

  const removeSaved = useCallback((id: string) => {
    const existing = store.find((p) => p.id === id);
    if (!existing) return;
    const before = store;
    store = store.filter((p) => p.id !== id);
    emit();
    persist(existing, false).then((ok) => {
      if (!ok) {
        store = before;
        emit();
      }
    });
  }, []);

  const clearAll = useCallback(() => {
    const items = store;
    store = [];
    emit();
    Promise.all(items.map((it) => persist(it, false))).then(() => load(true));
  }, []);

  return {
    savedProjects,
    count: savedProjects.length,
    isSaved,
    toggleSave,
    removeSaved,
    clearAll,
    reload: () => load(true)
  };
}

export default useSavedProjects;
