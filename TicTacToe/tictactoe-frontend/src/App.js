import React, { useState, useEffect } from 'react';
import './style.css';
import { provider, contract, getAccounts, getBalance } from './eth';

const Cell = ({ value, onClick, disabled }) => {
  return (
    <div className="cell" onClick={onClick} disabled={disabled}>
      {value}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const initialize = async () => {
      try {
        await provider.send('eth_requestAccounts', []);
        const accounts = await getAccounts();
        setAccounts(accounts);

        const balances = {};
        for (const account of accounts) {
          const balance = await getBalance(account);
          balances[account] = balance;
        }
        setBalances(balances);

        setAccount(accounts[0]);

        const contractBoard = await fetchBoard();
        setBoard(contractBoard);
        const currentPlayer = await contract.currentPlayer();
        setCurrentPlayer(currentPlayer === accounts[0] ? 'X' : 'O');
      } catch (error) {
        console.error('Error connecting to Ethereum network:', error);
      }
    };

    initialize();
  }, []);

  const fetchBoard = async () => {
    const boardData = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = await contract.board(i, j);
        boardData.push(cell.toNumber() === 1 ? 'X' : cell.toNumber() === 2 ? 'O' : null);
      }
    }
    return boardData;
  };

  const handleCellClick = async (cellIndex) => {
    if (gameOver || board[cellIndex]) return;

    const newBoard = [...board];
    newBoard[cellIndex] = currentPlayer;
    setBoard(newBoard);

    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;

    try {
      const tx = await contract.makeMove(row, col);
      await tx.wait();

      const winningPlayer = checkWinner(newBoard);
      if (winningPlayer) {
        setWinner(winningPlayer);
        setGameOver(true);
      } else if (isBoardFull(newBoard)) {
        setWinner('Draw');
        setGameOver(true);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const checkWinner = (board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const handleResetGame = async () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);

    try {
      const tx = await contract.resetGame();
      await tx.wait();
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  useEffect(() => {
    if (winner && gameOver) {
      const timer = setTimeout(() => {
        handleResetGame();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [winner, gameOver]);

  return (
    <div className="App">
      {accounts.length > 0 ? (
        <div>
          <p>Connected Account: {account}</p>
          <ul>
            {accounts.map((acc, idx) => (
              <li key={idx}>
                {acc} - Balance: {balances[acc]} ETH
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please connect your MetaMask wallet.</p>
      )}
      {winner ? (
        <h1>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h1>
      ) : (
        <p>Current Player: {currentPlayer}</p>
      )}
      <div className="tic-tac-toe-board">
        {board.map((cellValue, cellIndex) => (
          <Cell
            key={cellIndex}
            value={cellValue}
            onClick={() => handleCellClick(cellIndex)}
            disabled={gameOver}
          />
        ))}
      </div>
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
}

export default App;
