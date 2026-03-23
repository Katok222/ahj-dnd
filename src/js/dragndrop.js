const DRAG_Z_INDEX = 1000;
const DRAG_OPACITY = 0.8;

export function initDragAndDrop(state, rerender) {
  const cards = document.querySelectorAll('.card');

  cards.forEach((cardEl) => {
    cardEl.addEventListener('mousedown', (e) => {
      if (e.target.closest('.card__delete')) return;

      e.preventDefault();

      const startColumnEl = cardEl.closest('.column');
      const startColumnId = startColumnEl.dataset.columnId;
      const cardId = cardEl.dataset.cardId;

      const startColumn = state.columns.find(
        col => col.id === startColumnId
      );

      const startIndex = startColumn.cards.findIndex(
        c => c.id === cardId
      );

      const draggedCard = startColumn.cards[startIndex];

      const rect = cardEl.getBoundingClientRect();

      const shiftX = e.clientX - rect.left;
      const shiftY = e.clientY - rect.top;

      // ghost
      const ghost = cardEl.cloneNode(true);

      ghost.style.width = `${rect.width}px`;
      ghost.style.height = `${rect.height}px`;
      ghost.style.position = 'fixed';
      ghost.style.left = `${e.clientX - shiftX}px`;
      ghost.style.top = `${e.clientY - shiftY}px`;
      ghost.style.pointerEvents = 'none';
      ghost.style.zIndex = DRAG_Z_INDEX;
      ghost.style.cursor = 'grabbing';
      ghost.style.opacity = DRAG_OPACITY;

      document.body.append(ghost);

      // placeholder
      const placeholder = document.createElement('div');

      placeholder.className = 'card-placeholder';
      placeholder.style.height = `${rect.height}px`;

      cardEl.replaceWith(placeholder);

      document.body.style.cursor = 'grabbing';

      function onMouseMove(event) {
        ghost.style.left = `${event.clientX - shiftX}px`;
        ghost.style.top = `${event.clientY - shiftY}px`;

        const columns = [
          ...document.querySelectorAll('.column')
        ];

        const targetColumnEl = columns.find(col => {
          const rect = col.getBoundingClientRect();

          return (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          );
        });

        if (!targetColumnEl) return;

        const container =
          targetColumnEl.querySelector('.column__cards');

        const cards = [
          ...container.querySelectorAll('.card')
        ];

        let inserted = false;

        for (const card of cards) {
          const rect = card.getBoundingClientRect();

          const middle =
            rect.top + rect.height / 2;

          if (event.clientY < middle) {
            container.insertBefore(
              placeholder,
              card
            );

            inserted = true;
            break;
          }
        }

        if (!inserted) {
          container.append(placeholder);
        }
      }

      function onMouseUp() {
        document.removeEventListener(
          'mousemove',
          onMouseMove
        );

        document.removeEventListener(
          'mouseup',
          onMouseUp
        );

        document.body.style.cursor = '';

        ghost.remove();

        const targetColumnEl =
          placeholder.closest('.column');

        if (!targetColumnEl) {
          console.error('Target column not found');
          return;
        }

        const targetColumnId =
          targetColumnEl.dataset.columnId;

        const targetColumn =
          state.columns.find(
            col => col.id === targetColumnId
          );

        const placeholderIndex =
          [...placeholder.parentElement.children]
            .indexOf(placeholder);

        // 🔴 ВАЖНАЯ ПРОВЕРКА
        if (placeholderIndex === -1) {
          console.error('Placeholder not found');
          return;
        }

        // удаляем из старого места
        startColumn.cards.splice(
          startIndex,
          1
        );

        let insertIndex = placeholderIndex;

        // фикс при перемещении вниз внутри той же колонки
        if (
          startColumnId === targetColumnId &&
          startIndex < placeholderIndex
        ) {
          insertIndex -= 1;
        }

        // вставляем
        targetColumn.cards.splice(
          insertIndex,
          0,
          draggedCard
        );

        rerender();
      }

      document.addEventListener(
        'mousemove',
        onMouseMove
      );

      document.addEventListener(
        'mouseup',
        onMouseUp
      );
    });
  });
}