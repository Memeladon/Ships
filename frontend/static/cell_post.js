function cellClickHandler(cell) {
    const matrix = cell.getAttribute('data-matrix');
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');
    const value = cell.getAttribute('data-value');
    const side = cell.getAttribute('data-matrix');
    console.log(side);

    // Хз можно так или нет. Если что исправить тут
    // Это для того, чтобы при нажатии на клетку игра на стадии расстановки кораблей не обрабатывались клетки бота
    if (side === 'player') return;

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
        const dataBot = data['data_bot'];
        const dataPlayer = data['data_player'];
        const checkEof = data['check_eof'];
        // 'miss', 'hit', 'break down'
        const configListBot = data['answer_list_bot']; // бот по игроку
        const configListBot = data['answer_list_player']; // игрок по боту

        // Проходим по списку списков и обновляем ячейки для бота
        for (const item of dataBot) {
            const row = item[0];
            const col = item[1];
            const cellValue = item[2];
            const targetMatrix = 'enemy';

            // Получаем ссылку на ячейку
            const targetCell = document.querySelector(`[data-matrix="${targetMatrix}"][data-i="${row}"][data-j="${col}"]`);
            console.log(targetCell)

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
                    targetCell.textContent = cellValue;
                }
            }
        }

        // Проходим по списку списков и обновляем ячейки для игрока
        for (const item of dataPlayer) {
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
                    targetCell.textContent = cellValue;
                }
            }
        }

        // Обработка условия конца игры
        if (checkEof === 'bot') {
            // обработка проигрыша бота
            // ...
        } else if (checkEof === 'player') {
            // обработка проигрыша игрока
            // ...
        }


    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
