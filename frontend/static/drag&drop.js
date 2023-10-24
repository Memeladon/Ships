document.addEventListener('DOMContentLoaded', function() {

    let draggedShip = null;  // корабль, который перетаскивают
    let shipLength = 0;      // длина корабля, который перетаскивают

    const getNextElement = (cursorPosition, currentElement) => {
        // Получаем объект с размерами и координатами
        const currentElementCoord = currentElement.getBoundingClientRect();
        // Находим вертикальную координату центра текущего элемента
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        // Если курсор выше центра элемента, возвращаем текущий элемент
        // В ином случае — следующий DOM-элемент
        return nextElement;
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
    }

    document.addEventListener('dblclick', function(event) {
        const target = event.target;

        if (target.classList.contains('ship')) {
            const currentOrientation = target.getAttribute('data-ship-orientation');

            if (currentOrientation === "horizontal") {
                target.setAttribute('data-ship-orientation', 'vertical');

                // Переключение всех других кораблей на горизонтальное положение
                const allShips = document.querySelectorAll('.ship');
                allShips.forEach(ship => {
                    if(ship !== target && ship.getAttribute('data-ship-orientation') === 'vertical') {
                        ship.setAttribute('data-ship-orientation', 'horizontal');
                        // Обновите стили или классы, чтобы отразить горизонтальное положение
                    }
                });
            } else {
                target.setAttribute('data-ship-orientation', 'horizontal');
                // Верните стили для горизонтального положения
            }
        }
    });



    // Обработчик начала перетаскивания корабля
    document.addEventListener('dragstart', function(event) {
        event.target.classList.add('selected');
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.dropEffect='move';


        event.dataTransfer.setDragImage(event.target, 10, 10);
        draggedShip = event.target;
        shipLength = Number(draggedShip.getAttribute('data-length'));
        shipOrientation = String(draggedShip.getAttribute('data-ship-orientation'));
    });

    document.addEventListener('dragend', function (event) {
        event.target.classList.remove('selected');
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
        if (cell.classList.contains('cell') && cell.getAttribute('data-matrix') === 'player') {
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
        if (shipOrientation === "horizontal") {
            // Проверка выхода за границы поля и наличия других кораблей
            for (let l = 0; l < length; l++) {
                if (j + l >= 10) {
                    console.log('not Canplaceship');
                    return false;
                }
                const targetCell = document.querySelector(`[data-i='${i}'][data-j='${j + l}']`);

                // Проверка на значения 6 и 8 для ячеек корабля
                if (targetCell.getAttribute('data-value') == '8' || targetCell.getAttribute('data-value') == '6') {
                    console.log('not Canplaceship');
                    return false;
                }
            }
        } else {
            // Логика для вертикальной ориентации
            for (let l = 0; l < length; l++) {
                if (i + l >= 10) {
                    console.log('not Canplaceship');
                    return false;
                }
                const targetCell = document.querySelector(`[data-i='${i + l}'][data-j='${j}']`);
                if (targetCell.getAttribute('data-value') == '8' || targetCell.getAttribute('data-value') == '6') {
                    console.log('not Canplaceship');
                    return false;
                }
            }
        }
        console.log('Canplaceship');
        return true;
    }




    // Размещает корабль на поле
    function placeShip(i, j, length) {
        console.log('placeship');

        if (shipOrientation === 'horizontal') {
            for (let l = 0; l < length; l++) {
                const cell = document.querySelector(`[data-i='${i}'][data-j='${j + l}']`);
                cell.classList.add('ship-cell');
                cell.setAttribute('data-value', '8');

                // Обновление ячеек вокруг корабля
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const aroundCell = document.querySelector(`[data-i='${i + x}'][data-j='${j + l + y}']`);
                        if (aroundCell && aroundCell.getAttribute('data-value') !== '8') {
                            aroundCell.setAttribute('data-value', '6');
                        }
                    }
                }
            }
        } else { // вертикальная ориентация
            for (let l = 0; l < length; l++) {
                const cell = document.querySelector(`[data-i='${i + l}'][data-j='${j}']`);
                cell.classList.add('ship-cell');
                cell.setAttribute('data-value', '8');

                // Обновление ячеек вокруг корабля
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const aroundCell = document.querySelector(`[data-i='${i + l + x}'][data-j='${j + y}']`);
                        if (aroundCell && aroundCell.getAttribute('data-value') !== '8') {
                            aroundCell.setAttribute('data-value', '6');
                        }
                    }
                }
            }
        }
        draggedShip.remove();
    }


    function enableShipInteractions() {
        const shipCells = document.querySelectorAll('.ship-cell');
        shipCells.forEach(cell => cell.style.pointerEvents = 'auto');
        console.log("enableShipInteractions");
    }

    function disableShipInteractions() {
        const shipCells = document.querySelectorAll('.ship-cell');
        shipCells.forEach(cell => cell.style.pointerEvents = 'none');
        console.log("disableShipInteractions")
    }

    enableShipInteractions();

    document.getElementById("startGameButton").addEventListener('click', function() {
        disableShipInteractions();
    });

});