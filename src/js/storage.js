import { defaultState } from './state';

const STORAGE_KEY = 'trello-board-state';

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return structuredClone(defaultState);
  }

  try {
    return JSON.parse(raw);
  } catch (e) {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}