// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicTacToe {
  address public player1;
  address public player2;
  address public currentPlayer;
  uint8 public moves;

  // Game board
  uint8[3][3] public board;

  // Event to signal a move
  event Move(address indexed player, uint8 row, uint8 col);

  // Optional event to signal game over
  event GameOver(address winner);

  // Constructor function
  constructor() {
    player1 = msg.sender;
    currentPlayer = msg.sender;
  }

  // Function to make a move
  function makeMove(uint8 row, uint8 col) external {
    require(row < 3 && col < 3, "Invalid board position");
    require(board[row][col] == 0, "Position already taken");
    require(msg.sender == currentPlayer, "Not your turn");

    // Update the board with the player's move
    board[row][col] = moves % 2 == 0 ? 1 : 2;
    moves++;

    // Emit the move event
    emit Move(msg.sender, row, col);

    // Check for a winner or draw
    if (checkWinner(row, col)) {
      // Game over - declare winner
      currentPlayer = address(0); // Set current player to empty address
      emit GameOver(msg.sender); // Emit game over event with winner address
    } else if (moves == 9) {
      // Draw
      currentPlayer = address(0); // Set current player to empty address (optional)
    } else {
      // Switch players
      currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
  }

  // Function to check for a winner
  function checkWinner(uint8 row, uint8 col) internal view returns (bool) {
    // Check row
    if (board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
      return true;
    }
    // Check column
    if (board[0][col] == board[1][col] && board[0][col] == board[2][col]) {
      return true;
    }
    // Check diagonals
    if ((board[0][0] == board[1][1] && board[0][0] == board[2][2]) ||
      (board[0][2] == board[1][1] && board[0][2] == board[2][0])) {
      return true;
    }
    return false;
  }
}
