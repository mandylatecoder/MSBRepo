import { STORAGE_KEY } from './constants';

export const loadActions = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveActions = (actions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
};
