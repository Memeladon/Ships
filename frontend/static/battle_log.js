function addPlacementLog(message) {
    const now = new Date();
    const formattedTime = now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString();

    const logContainer = document.querySelector('.log-message');
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${formattedTime}] ${message}`;
    logContainer.appendChild(logEntry);

    logContainer.scrollTop = logContainer.scrollHeight;  // автоматическая прокрутка вниз
}

function addBattleLog(playerName, x, y, status) {
    const now = new Date();
    const formattedTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    const logContainer = document.querySelector('.log-message');

    let message;
    switch (status) {
        case 8:
            message = `Клетка (${x}, ${y}). Корабль поврежден!`;
            break;
        case 7:
            message = `Клетка (${x}, ${y}). Корабль потоплен!`;
            break;
        case 1:
            message = `Клетка (${x}, ${y}). Промах!`;
            break;
        default:
            message = `Неизвестное действие на клетке (${x}, ${y}).`;
            break;
    }

    const logEntry = document.createElement('div');
    logEntry.textContent = `[${formattedTime}] ${playerName}: ${message}`;
    logContainer.appendChild(logEntry);

    logContainer.scrollTop = logContainer.scrollHeight;  // автоматическая прокрутка вниз
}