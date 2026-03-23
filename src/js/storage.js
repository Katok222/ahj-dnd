import { defaultState } from './state';

const STORAGE_KEY = 'trello-board-state';

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return structuredClone(defaultState);
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse saved state:', error);

    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}