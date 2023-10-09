function updateMatrix(matrixName, matrixData) {
    // Отправляем матрицу на сервер с помощью POST-запроса
    fetch('/api/update_matrix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `matrix=${JSON.stringify(matrixData)}&matrix_name=${matrixName}`,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message); // Выводим сообщение от сервера в консоль
    })
    .catch((error) => {
        console.error('Ошибка при отправке матрицы на сервер:', error);
    });
}
