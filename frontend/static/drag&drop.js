document.addEventListener('DOMContentLoaded', function() {

    let matrix = Array(10).fill(null).map(() => Array(10).fill(0));
    let draggedShip = null;  // корабль, который перетаскивают
    let shipLength = 0;      // длина корабля, который перетаскивают
    let shipOrientation = "horizontal";

    // Обработчик начала перетаскивания корабля
    document.addEventListener('dragstart', function(event) {
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.dropEffect='move';

        event.dataTransfer.setDragImage(event.target, 10, 10);
        draggedShip = event.target;
        shipLength = Number(draggedShip.getAttribute('data-length'));
        shipOrientation = String(draggedShip.getAttribute('ship-orientation'));
    });

    // Обработчик перетаскивания над ячейкой
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    // Обработчик отпускания корабля на ячейку
    document.addEventListener('drop', function(event) {
        event.preventDefault();
        const cell = event.target;

        // Проверяем, является ли цель ячейкой
        if (cell.classList.contains('cell')) {
            const i = Number(cell.getAttribute('data-i'));
            const j = Number(cell.getAttribute('data-j'));

            // Проверка, можно ли разместить корабль на поле с учетом его длины
            if (canPlaceShip(i, j, shipLength)) {
                placeShip(i, j, shipLength);
            }
        }
    });


    // Проверяет, можно ли разместить корабль на данной позиции
    function canPlaceShip(i, j, length) {
        // Проверка выхода за границы поля и наличия других кораблей
        for (let l = 0; l < length; l++) {
            if (j + l >= 10 || document.querySelector(`[data-i='${i}'][data-j='${j + l}']`).classList.contains('ship-cell')) {
                return false;
            }
            // if ()
        }
        return true;
    }


    // Размещает корабль на поле
    function placeShip(i, j, length) {
        for (let l = 0; l < length; l++) {
            const cell = document.querySelector(`[data-i='${i}'][data-j='${j + l}']`);
            cell.classList.add('ship-cell');

            // Обновление значения в матрице
            cell.setAttribute('data-value', '8');
        }
        draggedShip.remove();
    }

    function enableShipInteractions() {
        const shipCells = document.querySelectorAll('.ship-cell');
        shipCells.forEach(cell => cell.style.pointerEvents = 'auto');
        console.log("enableShipInteractions")
    }

    function disableShipInteractions() {
        const shipCells = document.querySelectorAll('.ship-cell');
        shipCells.forEach(cell => cell.style.pointerEvents = 'none');
        console.log("disableShipInteractions")
    }

    enableShipInteractions();

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Предотвращаем появление контекстного меню
        console.log("contextmenu")

        const cell = event.target;
        if (!cell.classList.contains('ship-cell')) return;

        const i = Number(cell.getAttribute('data-i'));
        const j = Number(cell.getAttribute('data-j'));

        // Определяем ориентацию корабля
        const isHorizontal = matrix[i][j + 1] === 8 || matrix[i][j - 1] === 8;

        let startJ = j, startI = i, endJ = j, endI = i;
        if (isHorizontal) {
            while (startJ > 0 && matrix[i][startJ - 1] === 8) startJ--;
            while (endJ < 9 && matrix[i][endJ + 1] === 8) endJ++;
        } else {
            while (startI > 0 && matrix[startI - 1][j] === 8) startI--;
            while (endI < 9 && matrix[endI + 1][j] === 8) endI++;
        }

        const shipLength = isHorizontal ? endJ - startJ + 1 : endI - startI + 1;

        // Убираем корабль с доски
        for (let l = 0; l < shipLength; l++) {
            const x = isHorizontal ? i : startI + l;
            const y = isHorizontal ? startJ + l : j;
            const cell = document.querySelector(`[data-i='${x}'][data-j='${y}']`);
            cell.classList.remove('ship-cell');
            cell.setAttribute('data-value', '0');
            matrix[x][y] = 0;
        }

        // Пытаемся разместить корабль в новой ориентации
        if (isHorizontal) {
            if (canPlaceShipVertical(startI, j, shipLength)) {
                placeShipVertical(startI, j, shipLength);
            } else {
                // если не можем разместить на том же месте, пытаемся найти другое место
                for (let x = 0; x < 10; x++) {
                    if (canPlaceShipVertical(x, j, shipLength)) {
                        placeShipVertical(x, j, shipLength);
                        return;
                    }
                }
                // если нигде нельзя разместить, возвращаем корабль на прежнее место
                placeShip(i, startJ, shipLength);
            }
        } else {
            if (canPlaceShip(startI, startJ, shipLength)) {
                placeShip(startI, startJ, shipLength);
            } else {
                // если не можем разместить на том же месте, пытаемся найти другое место
                for (let y = 0; y < 10; y++) {
                    if (canPlaceShip(startI, y, shipLength)) {
                        placeShip(startI, y, shipLength);
                        return;
                    }
                }
                // если нигде нельзя разместить, возвращаем корабль на прежнее место
                placeShipVertical(startI, j, shipLength);
            }
        }
    });


    function canPlaceShipVertical(i, j, length) {
        for (let l = 0; l < length; l++) {
            if (i + l >= 10 || document.querySelector(`[data-i='${i + l}'][data-j='${j}']`).classList.contains('ship-cell')) {
                return false;
            }
        }
        return true;
    }

    function placeShipVertical(i, j, length) {
        for (let l = 0; l < length; l++) {
            const cell = document.querySelector(`[data-i='${i + l}'][data-j='${j}']`);
            cell.classList.add('ship-cell');
            cell.setAttribute('data-value', '8');
            matrix[i + l][j] = 8;
        }
    }

    document.getElementById("startGameButton").addEventListener('click', function() {
        disableShipInteractions();
    });

});