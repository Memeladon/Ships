const SIZE = 10;
let board = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));

function initializeBoard() {
    let localBoard = Array(SIZE).fill(0).map(() => Array(SIZE).fill(0));
    const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    ships.forEach(ship => randomPlaceShip(ship, localBoard));
    return localBoard;
}

function initializeBoardAndRender() {
    board = initializeBoard();
    const cells = document.querySelectorAll('.player-board .cell');
    cells.forEach(cell => {
        const i = cell.getAttribute('data-i');
        const j = cell.getAttribute('data-j');
        if (board[i][j] === 1) {
            cell.classList.add('ship-cell');
        } else {
            cell.classList.remove('ship-cell');
        }
    });
}

function canPlace(x, y, length, horizontal, localBoard) {
    for (let i = 0; i < length; i++) {
        if (horizontal) {
            if (x + i >= SIZE || localBoard[y][x + i] !== 0) return false;

            // Проверка соседних клеток вокруг горизонтального корабля
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + i + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE && localBoard[ny][nx] !== 0) {
                        return false;
                    }
                }
            }

        } else {
            if (y + i >= SIZE || localBoard[y + i][x] !== 0) return false;

            // Проверка соседних клеток вокруг вертикального корабля
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx;
                    const ny = y + i + dy;

                    if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE && localBoard[ny][nx] !== 0) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}


function placeShip(x, y, length, horizontal, localBoard) {
    for (let i = 0; i < length; i++) {
        if (horizontal) {
            localBoard[y][x + i] = 1;
        } else {
            localBoard[y + i][x] = 1;
        }
    }
}

function randomPlaceShip(length, localBoard) {
    let placed = false;
    while (!placed) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);
        const horizontal = Math.random() > 0.5;

        if (canPlace(x, y, length, horizontal, localBoard)) {
            placeShip(x, y, length, horizontal, localBoard);
            placed = true;
        }
    }
}

const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
ships.forEach(ship => randomPlaceShip(ship));

console.log(board);
