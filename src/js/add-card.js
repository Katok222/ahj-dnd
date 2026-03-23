export function initAddCard(state, rerender) {
  const columns = document.querySelectorAll('.column');

  columns.forEach((columnEl) => {
    const addBtn =
      columnEl.querySelector('.add-card-btn');

    const form =
      columnEl.querySelector('.add-card-form');

    const textarea =
      columnEl.querySelector('.add-card-input');

    const cancelBtn =
      columnEl.querySelector('.add-card-cancel');

    // показать форму
    addBtn.addEventListener('click', () => {
      addBtn.classList.add('hidden');
      form.classList.remove('hidden');
      textarea.focus();
    });

    // отмена
    cancelBtn.addEventListener('click', () => {
      form.classList.add('hidden');
      addBtn.classList.remove('hidden');
      textarea.value = '';
    });

    // submit формы
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = textarea.value.trim();

      if (!text) return;

      const columnId =
        columnEl.dataset.columnId;

      const column =
        state.columns.find(
          (item) => item.id === columnId
        );

      // 🔴 защита от ошибки
      if (!column) {
        console.error('Column not found');
        return;
      }

      column.cards.push({
        id: String(Date.now()) + Math.random(),
        text,
      });

      // очистка формы
      textarea.value = '';

      form.classList.add('hidden');
      addBtn.classList.remove('hidden');

      rerender();
    });
  });
}