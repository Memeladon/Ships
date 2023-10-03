// Функция для обработки клика на ячейке
function cellClickHandler(cell) {
    const i = cell.getAttribute('data-i');
    const j = cell.getAttribute('data-j');

    // Отправляем координаты на сервер с помощью AJAX (XMLHttpRequest или Fetch API)
    fetch('/game/api/cell-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ i, j }),
    })
    .then((response) => {
        // Обработка ответа от сервера (если необходимо)
        console.log(0)
    })
    .catch((error) => {
        console.error('Ошибка при отправке данных на сервер:', error);
    });
}