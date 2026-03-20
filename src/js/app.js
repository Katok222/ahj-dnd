import '../css/style.css';
import { loadState, saveState } from './storage';
import { renderBoard } from './render';
import { initAddCard } from './add-card';

const state = loadState();

function rerender() {
  renderBoard(state);
  initAddCard(state, rerenderWithSave);
}

function rerenderWithSave() {
  saveState(state);
  rerender();
}

rerender();