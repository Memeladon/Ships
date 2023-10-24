function resetShips() {
    const player_cells = document.querySelectorAll('.player-board .cell');
    for (let i = 0; i < player_cells.length; i++) {
        player_cells[i].classList.remove('ship-cell');
        player_cells[i].setAttribute('data-value', '0');
    }

    const shipGroups = {
        'group1': [
            { id: "fourdeck1", length: 4 },
            { id: "tripledeck1", length: 3 },
            { id: "tripledeck2", length: 3 }
        ],
        'group2': [
            { id: "doubledeck1", length: 2 },
            { id: "doubledeck2", length: 2 },
            { id: "doubledeck3", length: 2 }
        ],
        'group3': [
            { id: "singledeck1", length: 1 },
            { id: "singledeck2", length: 1 },
            { id: "singledeck3", length: 1 },
            { id: "singledeck4", length: 1 }
        ]
    };

    const shipsContainer = document.getElementById('ships-container');

    // Очистка текущего содержимого shipsContainer
    shipsContainer.innerHTML = '';

    Object.values(shipGroups).forEach(shipGroup => {
        const li = document.createElement('li');
        shipGroup.forEach(ship => {
            const shipElement = document.createElement('div');
            shipElement.id = ship.id;
            shipElement.className = 'ship';
            shipElement.draggable = true;
            shipElement.setAttribute('data-length', ship.length);
            shipElement.setAttribute('data-ship-orientation', "horizontal");
            li.appendChild(shipElement);
        });
        shipsContainer.appendChild(li);
    });
}
