function cellClickHandler(cell) {
    const matrix = cell.getAttribute('data-matrix');
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');
    const value = cell.getAttribute('data-value');
    const side = cell.getAttribute('data-matrix');

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
        const configListPlayer = data['answer_list_player']; // игрок по боту

        console.log(configListBot, '   ', configListPlayer)

        // Проходим по списку списков и обновляем ячейки для бота
        for (const item of dataBot) {
            const row = item[0];
            const col = item[1];
            const cellValue = item[2];
            const targetMatrix = 'enemy';

            // Получаем ссылку на ячейку
            const targetCell = document.querySelector(`[data-matrix="${targetMatrix}"][data-i="${row}"][data-j="${col}"]`);
//            console.log(targetCell)

            const animationDuration = 300;

            if (targetCell) {
                // Обновляем содержимое ячейки на основе значения cellValue
                if (cellValue === 1) {
                    targetCell.classList.add("bg-miss");
                    console.log("miss");
//                    addBattleLog("Игрок", row, col, 1);
                    targetCell.style.animation = 'missAnimation 0.5s';
                } else if (cellValue === 7) {
                    targetCell.classList.add("bg-hit");
                    console.log("hit");
                    addBattleLog("Игрок", row, col, 7);
                    targetCell.style.animation = 'hitAnimation 0.5s';
                } else {
                    targetCell.textContent = cellValue;
                }
                targetCell.addEventListener('animationend', function() {
                    targetCell.style.animation = '';
                }, { once: true });
                setTimeout(() => {
                    // Весь код, который должен выполняться после анимации, поместите сюда
                }, animationDuration);
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

            const animationDuration = 300;

            if (targetCell) {
                // Обновляем содержимое ячейки на основе значения cellValue
                if (cellValue === 1) {
                    targetCell.classList.add("bg-miss");
                    console.log("miss");
//                    addBattleLog("Бот", row, col, 1);
                    targetCell.style.animation = 'missAnimation 0.5s';
                } else if (cellValue === 7) {
                    targetCell.classList.add("bg-hit");
                    console.log("hit");
                    addBattleLog("Бот", row, col, 7);
                    targetCell.style.animation = 'hitAnimation 0.5s';
                } else {
                    targetCell.textContent = cellValue;
                }
                targetCell.addEventListener('animationend', function() {
                    targetCell.style.animation = '';
                }, { once: true });
                setTimeout(() => {
                    // Весь код, который должен выполняться после анимации, поместите сюда
                }, animationDuration);
            }
        }

        // Обработка условия конца игры
        if (checkEof === 'bot') {
            console.log('bot');
            addPlacementLog('Вы победили! Congratulations!');
            // обработка проигрыша бота
            // ...
        } else if (checkEof === 'player') {
            console.log('player');
            addPlacementLog('Победил бот! Noob!');
            // обработка проигрыша игрока
            // ...
        }
        // Блокируем ячейки после победы/поражения
        if (checkEof === 'bot' || checkEof === 'player') {
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => {
                cell.style.pointerEvents = 'none'; // предотвращает клики
            });
        }

        // лог для ходов бота
        if (configListBot.length > 0) {
            for (const item of configListBot){
                if (item === 'miss'){}
                if (item === 'hit'){}
                if (item === 'break down'){
                    addPlacementLog("Корабль игрока потоплен!");
                }
            }
        }

        // лог для ходов игрока
        for (const item of configListPlayer){
            if (item === 'miss'){}
            if (item === 'hit'){}
            if (item === 'break down'){
                addPlacementLog("Корабль бота потоплен!");
            }
        }

    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}
