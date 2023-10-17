document.addEventListener('DOMContentLoaded', function() {

    let matrix = Array(10).fill(null).map(() => Array(10).fill(0));
    let draggedShip = null;  // корабль, который перетаскивают
    let shipLength = 0;      // длина корабля, который перетаскивают

    // Обработчик начала перетаскивания корабля
    document.addEventListener('dragstart', function(event) {
        draggedShip = event.target;
        shipLength = Number(draggedShip.getAttribute('data-length'));
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
        // Проверка выхода за границы поля и наличия других кораблей (простая версия без учета соседних клеток)
        for (let l = 0; l < length; l++) {
            if (j + l >= 10 || document.querySelector(`[data-i='${i}'][data-j='${j + l}']`).classList.contains('ship-cell')) {
                return false;
            }
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

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        console.log("Right click detected!");

        const cell = event.target.closest('.ship-cell'); // Изменена строка
        console.log(event.target);
        if (cell) {
            console.log("Found ship cell!");
            toggleShipDirection(cell);
        }
    });


    function toggleShipDirection(cell) {

        console.log("Toggling ship direction...");

        const i = Number(cell.getAttribute('data-i'));
        const j = Number(cell.getAttribute('data-j'));
        let horizontal = cell.getAttribute('data-horizontal') === 'true';

        // Удаление существующего корабля
        removeExistingShip(i, j, shipLength, horizontal);

        if (horizontal) {
            if (canPlaceShipVertically(i, j, shipLength)) {
                placeShipVertically(i, j, shipLength);
                cell.setAttribute('data-horizontal', 'false');
            } else {
                // Если невозможно разместить вертикально, верните корабль на место
                placeShip(i, j, shipLength);
            }
        } else {
            if (canPlaceShip(i, j, shipLength)) {
                placeShip(i, j, shipLength);
                cell.setAttribute('data-horizontal', 'true');
            } else {
                // Если невозможно разместить горизонтально, верните корабль на место
                placeShipVertically(i, j, shipLength);
            }
        }
    }


    function canPlaceShipVertically(i, j, length) {
        for (let l = 0; l < length; l++) {
            if (i + l >= 10 || document.querySelector(`[data-i='${i + l}'][data-j='${j}']`).classList.contains('ship-cell')) {
                return false;
            }
        }
        return true;
    }

    function placeShipVertically(i, j, length) {
        for (let l = 0; l < length; l++) {
            const cell = document.querySelector(`[data-i='${i + l}'][data-j='${j}']`);
            cell.classList.add('ship-cell');

            // Обновление значения в матрице
            cell.setAttribute('data-value', '8');
        }
    }

    function removeExistingShip(i, j, length, horizontal) {
        if (horizontal) {
            for (let l = 0; l < length; l++) {
                const cell = document.querySelector(`[data-i='${i}'][data-j='${j + l}']`);
                cell.classList.remove('ship-cell');
                cell.setAttribute('data-value', '0');
            }
        } else {
            for (let l = 0; l < length; l++) {
                const cell = document.querySelector(`[data-i='${i + l}'][data-j='${j}']`);
                cell.classList.remove('ship-cell');
                cell.setAttribute('data-value', '0');
            }
        }
    }






});