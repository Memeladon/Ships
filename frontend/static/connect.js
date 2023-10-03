// Размеры матрицы
const numRows = 5;
const numCols = 5;

// Создаем матрицу на основе HTML-таблицы
const gameBoard = document.getElementById("game-board");
const table = document.createElement("table");
for (let row = 0; row < numRows; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < numCols; col++) {
        const td = document.createElement("td");
        td.className = "cell";
        td.dataset.row = row;
        td.dataset.col = col;
        td.addEventListener("click", handleCellClick);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
gameBoard.appendChild(table);

function handleCellClick(event) {
            const cell = event.target;
            const row = cell.dataset.row;
            const col = cell.dataset.col;

            // Здесь можно добавить логику для определения, попал ли выстрел в корабль
            const isHit = Math.random() < 0.5; // Пример: 50% шанс попадания

            // Обновляем стиль ячейки в зависимости от результата
            if (isHit) {
                cell.classList.add("hit");
                cell.textContent = "X"; // Отобразить X для попадания
            } else {
                cell.classList.add("miss");
                cell.textContent = "O"; // Отобразить O для промаха
            }

            // Здесь можно отправить данные на сервер или выполнить другие действия

            // Удалить обработчик события клика после первого нажатия, чтобы нельзя было сделать еще один выстрел в эту ячейку
            cell.removeEventListener("click", handleCellClick);
        }