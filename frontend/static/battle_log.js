function addPlacementLog(message) {
    const now = new Date();
    const formattedTime = now.getHours().toString() + ':' + now.getMinutes().toString() + ':' + now.getSeconds().toString();

    const logContainer = document.querySelector('.log-message');
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${formattedTime}] ${message}`;
    logContainer.appendChild(logEntry);

    logContainer.scrollTop = logContainer.scrollHeight;  // автоматическая прокрутка вниз #must-have
}

function addBattleLog(playerName, x, y, status) {
    const now = new Date();
    const formattedTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    const logContainer = document.querySelector('.log-message');

    let message;
    switch (status) {
        case 9:
            message = `Клетка (${x}, ${y}). Корабль потоплен!`;
            break;
        case 7:
            message = `Клетка (${x}, ${y}). Корабль поврежден!`;
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

function showCongratulations(winner) {
    let gifPath;
    let message;
    if (winner === 'player') {
        gifPath = 'frontend/static/emotes/peepoSmash.gif';
        message = 'Поздравляем! Вы выиграли!';
    } else if (winner === 'bot') {
        gifPath = 'frontend/static/emotes/PeepoNoob.gif';
        message = 'Бот выиграл. Попробуйте снова!';
    }

    const gifElement = document.getElementById('congratulations-gif');
    const messageElement = document.getElementById('congratulations-message');

    gifElement.src = gifPath;
    messageElement.textContent = message;

    // Показываем блок с поздравлениями
    document.getElementById('congratulations').style.display = 'block';
}
