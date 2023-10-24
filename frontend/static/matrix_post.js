function save_player_matrix() {
    return new Promise((resolve, reject) => {
        // Получите матрицу 'player' из HTML
        const playerMatrix = getMatrixFromHTML('player');

        // Отправьте матрицу на сервер с использованием fetch
        fetch('/api/save_matrix', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix: playerMatrix }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Матрица успешно отправлена на сервер.');
                // Можете выполнить дополнительные действия после отправки матрицы.
                resolve(); // Разрешаем Promise при успешной отправке
            } else {
                console.error('Ошибка при отправке матрицы на сервер.');
                reject('Ошибка при отправке матрицы на сервер'); // Отклоняем Promise при ошибке
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            reject(error); // Отклоняем Promise при ошибке
        });
    });
}


// Функция для получения матрицы из HTML
function getMatrixFromHTML(matrixName) {
    const matrix = [];
    const cells = document.querySelectorAll(`[data-matrix="${matrixName}"]`);

    cells.forEach(cell => {
        const row = parseInt(cell.getAttribute('data-i'));
        const col = parseInt(cell.getAttribute('data-j'));
        const value = parseInt(cell.getAttribute('data-value'));

        if (!matrix[row]) {
            matrix[row] = [];
        }
        matrix[row][col] = value;
    });

    return matrix;
}