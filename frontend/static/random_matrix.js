// Функция для обработки клика на кнопку 'Random Placement'
function generateClickHandler(side) {
    // Отправляем запрос на сервер для получения сгенерированной матрицы
    fetch('/game/api/random_matrix', {
        method: 'GET', // GET запрос
    })
    .then((response) => response.json())
    .then((data) => {
        const generatedMatrix = data.generated_matrix;
//        if (side === "player")
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
                    // Обновляем изображение
                    cell.innerHTML = `<img src="${valueToImage[value]}" />`;
                }
            });
        });
    })
    .catch((error) => {
        console.error('Ошибка при отправке запроса на сервер:', error);
    });
}
