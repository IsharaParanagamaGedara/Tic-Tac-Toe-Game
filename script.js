// Get references to HTML elements
const board = document.getElementById('game-board');
const statusMessage = document.getElementById('status-message');

// Initialize game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

// Handle click on a cell
function handleCellClick(index) {
  // Check if the cell is empty and the game is still active
  if (gameBoard[index] === '' && gameActive) {
    // Update the game board, check for a winner, and toggle player turn
    gameBoard[index] = currentPlayer;
    updateBoard();
    checkWinner();
    togglePlayer();
  }
}

// Update the game board in the HTML
function updateBoard() {
  // Clear the existing board
  board.innerHTML = '';

  // Create and append cells based on the current game board
  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
  });
}

// Toggle between players X and O
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a winner or a draw
function checkWinner() {
  // Define winning patterns for rows, columns, and diagonals
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check each winning pattern
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      // If a player has won, update the status message and scores
      gameActive = false;
      statusMessage.textContent = `${currentPlayer} wins!`;
      updateScore();
    }
  }

  // If the board is full and no winner, declare a draw
  if (!gameBoard.includes('') && gameActive) {
    gameActive = false;
    statusMessage.textContent = 'It\'s a draw!';
  }
}

// Reset the game to initial state
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusMessage.textContent = '';
  updateBoard();
}

// Update the scores based on the current player
function updateScore() {
  const scoreXElement = document.getElementById('score-x');
  const scoreOElement = document.getElementById('score-o');
  if (currentPlayer === 'X') {
    scoreX++;
  } else {
    scoreO++;
  }
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
}

// Clear the game board
function clearBoard() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusMessage.textContent = 'Board cleared. Continue playing.';
  updateBoard();
}

// Confirm and clear the board on button click
function confirmClear() {
  const isConfirmed = confirm('Are you sure you want to clear the board?');
  if (isConfirmed) {
    clearBoard();
  }
}

// Initial setup
updateBoard();
