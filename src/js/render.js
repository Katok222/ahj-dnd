export function renderBoard(state) {
  const app = document.querySelector('#app');

  if (!app) {
    console.error('#app element not found');
    return;
  }

  app.innerHTML = `
    <div class="board">
      ${state.columns
        .map((column) => renderColumn(column))
        .join('')}
    </div>
  `;
}

function renderColumn(column) {
  return `
    <div class="column" data-column-id="${column.id}">
      <div class="column__header">
        ${escapeHtml(column.title)}
      </div>

      <div class="column__cards">
        ${column.cards
          .map((card) => renderCard(card))
          .join('')}
      </div>

      <button class="add-card-btn" type="button">
        + Add another card
      </button>

      <form class="add-card-form hidden">
        <textarea
          class="add-card-input"
          placeholder="Enter a title for this card..."
        ></textarea>

        <div class="add-card-actions">
          <button
            class="add-card-submit"
            type="submit"
          >
            Add Card
          </button>

          <button
            class="add-card-cancel"
            type="button"
          >
            ✕
          </button>
        </div>
      </form>
    </div>
  `;
}

function renderCard(card) {
  return `
    <div class="card" data-card-id="${card.id}">
      <div class="card__text">
        ${escapeHtml(card.text)}
      </div>

      <button
        class="card__delete"
        type="button"
      >
        ✕
      </button>
    </div>
  `;
}

function escapeHtml(value) {
  const div = document.createElement('div');

  div.textContent = value;

  return div.innerHTML;
}