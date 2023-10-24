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
        const dataListB = data['data_bot']; // Куда стрелял Игрок
        const dataListP = data['data_player']; // Куда стрелял Бот
        const check_eof = data['check_eof'];

        if (dataListP != []) {
            for (const item of dataListP) {
                const row = item[0];
                const col = item[1];
                const cellValue = item[2];
                const targetMatrix = 'player';

                // Получаем ссылку на ячейку
                const targetCell = document.querySelector(`[data-matrix="${targetMatrix}"][data-i="${row}"][data-j="${col}"]`);

                if (targetCell) {
                    // Обновляем содержимое ячейки на основе значения cellValue
                    if (cellValue === 1) {
                        targetCell.classList.add("bg-miss");
                        console.log("miss");
                        addBattleLog("Player", row, col, 1);
                    } else if (cellValue === 7) {
                        targetCell.classList.add("bg-hit");
                        console.log("hit");
                        addBattleLog("Player", row, col, 7);
                    } else {
                        // Если значение не равно 1, 2, 8 или 9, можете сделать другую обработку по вашему усмотрению
                        targetCell.textContent = cellValue;
                    }
                }
            }
        }

        // Проходим по списку списков и обновляем ячейки
        for (const item of dataListB) {
            const row = item[0];
            const col = item[1];
            const cellValue = item[2];
            const targetMatrix = 'bot';

            // Получаем ссылку на ячейку
            const targetCell = document.querySelector(`[data-matrix="${targetMatrix}"][data-i="${row}"][data-j="${col}"]`);

            if (targetCell) {
                // Обновляем содержимое ячейки на основе значения cellValue
                if (cellValue === 1) {
                    targetCell.classList.add("bg-miss");
                    console.log("miss");
                    addBattleLog("Player", row, col, 1);
                } else if (cellValue === 7) {
                    targetCell.classList.add("bg-hit");
                    console.log("hit");
                    addBattleLog("Player", row, col, 7);
                } else {
                    // Если значение не равно 1, 2, 8 или 9, можете сделать другую обработку по вашему усмотрению
                    targetCell.textContent = cellValue;
                }
            }
        }

        if (check_eof == 'bot') {
        // обработка проигрыша бота
        }
        else if (check_eof == 'player'){
        // обработка проигрыша Игрока
        }
        // иначе False  ничего не происходит


    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
