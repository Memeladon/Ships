import React, { useState } from 'react';

// Константы для размера игровой доски
const BOARD_SIZE = 5;

function App() {
  const [player1Board, setPlayer1Board] = useState(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false)));
  const [player2Board, setPlayer2Board] = useState(Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false)));

  const handleCellClick = (row, col, board, setBoard) => {
    if (!board[row][col]) {
      const newBoard = [...board];
      newBoard[row][col] = true;
      setBoard(newBoard);
    }
  };

  return (
    <div className="App">
      <div className="board">
        <h2>Игрок 1</h2>
        {player1Board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? 'cell-active' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex, player1Board, setPlayer1Board)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="board">
        <h2>Игрок 2</h2>
        {player2Board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell ? 'cell-active' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex, player2Board, setPlayer2Board)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
