function cellClickHandler(cell) {
    if (cell.classList.contains('bg-miss') || cell.classList.contains('bg-hit') || cell.classList.contains('ship-cell')) {
        return;
    }
    if (cell.getAttribute('data-matrix') === 'player') {
        return;
    }
    const matrix = cell.getAttribute('data-matrix');
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');
    const value = cell.getAttribute('data-value');

    // Отправляем координаты на сервер с помощью AJAX (XMLHttpRequest или Fetch API)
    fetch('/game/api/cell-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrix, i, j, value }),
    })
    .then((response) => response.json())
    .then((data) => {
        // Получаем ссылку на ячейку
        const cell = document.querySelector(`[data-matrix="${data.matrix}"][data-i="${data.i}"][data-j="${data.j}"]`);

        if (cell) {
            // Обновляем содержимое ячейки на основе значения data.value
            if (data.value === 1) {
                cell.classList.add("bg-miss");
                console.log("miss");
                addBattleLog("Player", data.i, data.j, 1);
            } else if (data.value === 2) {
                cell.classList.add("bg-miss");
                addBattleLog("Player", data.i, data.j, 1);
            } else if (data.value === 8) {
                cell.classList.add("bg-ship-front");
                addBattleLog("Player", data.i, data.j, 1);
            } else if (data.value === 9) {
                cell.classList.add("bg-hit");
                addBattleLog("Player", data.i, data.j, 9);
            } else {

                // Если значение не равно 1 или 2, можете сделать другую обработку по вашему усмотрению
                cell.textContent = data.value;
            }
        }
        // ход бота
    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
