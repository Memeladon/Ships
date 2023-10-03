// Функция для обработки клика на ячейке
function cellClickHandler(cell) {
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');
    const value = cell.getAttribute('data-value');

    // Отправляем координаты на сервер с помощью AJAX (XMLHttpRequest или Fetch API)
    fetch('/game/api/cell-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ i, j, value }),
    })
    .then((response) => {
        // Обработка ответа от сервера (если необходимо)
    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}