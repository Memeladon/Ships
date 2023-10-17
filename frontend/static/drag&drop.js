const ships = document.querySelectorAll('.ship');

ships.forEach(ship => {
    ship.setAttribute('draggable', 'true')
    ship.addEventListener('dragstart', dragStart);
});

const cells = document.querySelectorAll('.cell')

cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
});

function dragStart(e) {
    e.dataTransfer.setData('shipLength', e.target.getAttribute('data-length'));

}

function dragOver(e) {
    e.preventDefault();

}

function dragEnter(e) {
    e.preventDefault();
    // Добавьте стиль при наведении, если хотите
}

function dragLeave() {
    // Удалите стиль при выходе из зоны, если добавили
}

function dragDrop(e) {
    const shipLength = e.dataTransfer.getData('shipLength');
    // Теперь вы можете расставлять корабль на игровом поле, основываясь на его длине
}