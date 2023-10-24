function cellClickHandler(cell) {
    const matrix = cell.getAttribute('data-matrix');
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');
    const value = cell.getAttribute('data-value');

    // Отправляем координаты на сервер с помощью AJAX (XMLHttpRequest или Fetch API)
    fetch('/api/cell-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrix, i, j, value }),
    })
    .then((response) => response.json())
    .then((data) => {
            // В data должен быть ключ 'data_cell', который содержит список списков
        const dataList = data['data_cell'];

        // Проходим по списку списков и обновляем ячейки
        for (const item of dataList) {
            const row = item[0];
            const col = item[1];
            const cellValue = item[2];
        const targetMatrix = data['data_matrix'];

            // Получаем ссылку на ячейку
            const targetCell = document.querySelector(`[data-matrix="${targetMatrix}"][data-i="${row}"][data-j="${col}"]`);

            if (targetCell) {
                // Обновляем содержимое ячейки на основе значения cellValue
                if (cellValue === 1) {
                    targetCell.classList.add("bg-miss");
                    console.log("miss");
                    addBattleLog("Player", row, col, 1);
                } else if (cellValue === 2) {
                    targetCell.classList.add("bg-miss");
                    addBattleLog("Player", row, col, 1);
                } else if (cellValue === 8) {
                    targetCell.classList.add("bg-ship-front");
                    addBattleLog("Player", row, col, 1);
                } else if (cellValue === 9) {
                    targetCell.classList.add("bg-hit");
                    addBattleLog("Player", row, col, 9);
                } else {
                    // Если значение не равно 1, 2, 8 или 9, можете сделать другую обработку по вашему усмотрению
                    targetCell.textContent = cellValue;
                }
            }
        }

        // ход бота
    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
