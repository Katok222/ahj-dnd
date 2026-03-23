import '../css/style.css';
import { loadState, saveState } from './storage';
import { renderBoard } from './render';
import { initAddCard } from './add-card';
import { initDeleteCard } from './delete-card';
import { initDragAndDrop } from './dragndrop';

const state = loadState();

function rerender() {
  renderBoard(state);

  // после каждого render нужно заново навесить события
  initAddCard(state, rerenderWithSave);
  initDeleteCard(state, rerenderWithSave);
  initDragAndDrop(state, rerenderWithSave);
}

function rerenderWithSave() {
  saveState(state);
  rerender();
}

function init() {
  rerender();
}

document.addEventListener('DOMContentLoaded', init);