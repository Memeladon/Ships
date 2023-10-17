// Функция для обработки клика на кнопку 'Random Placement'
function generateClickHandler(side) {
    console.log(side)
    clearMatrix(side);
    // Отправляем запрос на сервер для получения сгенерированной матрицы
    fetch('/game/api/initialize_matrix', {
        method: 'POST', 
    })
    .then((response) => response.json())
    .then((data) => {
        const generatedMatrix = data.generated_matrix;
        // Маппинг значений на изображения
        const valueToImage = {
            0: 'empty.png',
            1: 'miss.png',
            8: 'ship.png',
            7: 'hit.png'
        };

        // Обновляем ячейки в текущей матрице на основе полученных данных
        generatedMatrix.forEach((row, i) => {
            row.forEach((value, j) => {
                const cell = document.querySelector(`[data-matrix="${side}"][data-i="${i}"][data-j="${j}"]`);
                if (cell) {
                    // Обновляем значение ячейки
                    cell.setAttribute('data-value', value);
                    // Обновляем изображение игроку
                    if (side !== "enemy" && value == 8) {
                        cell.classList.add('ship-cell');
                        }
                    // if (side != "enemy") {
                    //     cell.innerHTML = `<img src="${valueToImage[value]}" />`;
                    //     }
                }
            });
        });
    })
    .catch((error) => {
        console.error('Ошибка при отправке запроса на сервер:', error);
    });
}

// Функция для сделать матрицу нулевой
function clearMatrix(side) {
    const cells = document.querySelectorAll(`[data-matrix="${side}"]`);
    cells.forEach((cell) => {
        cell.setAttribute('data-value', 0); // Устанавливаем значение в 0
        cell.classList.remove('ship-cell');

        // Проверяем наличие изображения
        const img = cell.querySelector('img');
        if (img) {
            img.remove();
        }
    });
}
