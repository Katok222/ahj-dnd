export function initDeleteCard(state, rerender) {
  const deleteButtons =
    document.querySelectorAll('.card__delete');

  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const cardEl =
        btn.closest('.card');

      const columnEl =
        btn.closest('.column');

      // 🔴 защита DOM
      if (!cardEl || !columnEl) {
        console.error('Card or column not found');
        return;
      }

      const cardId =
        cardEl.dataset.cardId;

      const columnId =
        columnEl.dataset.columnId;

      const column =
        state.columns.find(
          (col) => col.id === columnId
        );

      // 🔴 защита состояния
      if (!column) {
        console.error('Column not found');
        return;
      }

      column.cards =
        column.cards.filter(
          (card) => card.id !== cardId
        );

      rerender();
    });
  });
}