// Найдите все ячейки матрицы (может потребоваться более сложный селектор, в зависимости от структуры HTML)
const cells = document.querySelectorAll('td');

// Добавьте обработчик клика для каждой ячейки
cells.forEach((cell) => {
  cell.addEventListener('click', () => {
    // Извлеките индексы (i, j) из атрибутов 'data-i' и 'data-j' ячейки
    const i = parseInt(cell.getAttribute('data-i'));
    const j = parseInt(cell.getAttribute('data-j'));

    // Теперь у вас есть индексы (i, j), которые можно отправить на сервер или использовать в вашем коде
    console.log(`Clicked on cell (${i}, ${j})`);

    // Здесь вы можете отправить индексы на сервер, если это необходимо
    // fetch('/your-api-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ i, j }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Обработайте ответ от сервера, если необходимо
    //   })
    //   .catch((error) => {
    //     console.error('Ошибка:', error);
    //   });
  });
});
