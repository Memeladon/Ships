function save_player_matrix() {
// Получите матрицу 'player' из HTML
    const playerMatrix = getMatrixFromHTML('player');
    
    // Отправьте матрицу на сервер с использованием fetch
    fetch('/game/api/save_matrix', {
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
        } else {
            console.error('Ошибка при отправке матрицы на сервер.');
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
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