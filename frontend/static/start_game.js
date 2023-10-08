function is_ships_placed(Selector) {

    let sum = 0;
    const matrix = document.querySelector(Selector);
    const rows = matrix.querySelectorAll('tr');
    for(let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');

        for (let j = 0; j < cells.length; j++) {
            sum += Number(cells[j].getAttribute('data-value'));
        }
    }
    console.log(`Сумма: ${sum}`);
    return sum === 160;
}

function start_game() {
    const player =  is_ships_placed('.player-board .battlefield');
    // const enemy = is_ships_placed('.enemy-board .battlefield'); // it may be needed later
    const logElement = document.querySelector('.log-board .log-message');

    if (!player) {
        addPlacementLog('Сначала расставьте корабли.');
    }
    else {
        addPlacementLog('Начало игры.');
        const player_cells = document.querySelectorAll('.player-board .cell');
        for (let i = 0; i < player_cells.length; i++) {
            player_cells[i].removeAttribute('onclick');
        }
        const enemy_cells = document.querySelectorAll('.enemy-board .cell');
        for (let i = 0; i < enemy_cells.length; i++) {
            enemy_cells[i].setAttribute('onclick','cellClickHandler(this)');
//        generateClickHandler('enemy') - эта штука не робит
        }
    }
}