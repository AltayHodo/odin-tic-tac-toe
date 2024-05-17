const Game = (function () {
  const gameArray = Array(9).fill('');
  const getGameArray = () => gameArray;

  let currentPlayer = 'X';
  const getCurrentPlayer = () => currentPlayer;

  const updateCurrentPlayer = () => currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  const playTurn = (index) => {
    if (gameArray[index] === '') {
      gameArray[index] = currentPlayer;
      checkForWin();
      updateCurrentPlayer();
      return true;
    }
    return false;
  };

  const checkForWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.forEach(combination => {
      const [a, b, c] = combination;
      if (gameArray[a] && gameArray[a] === gameArray[b] && gameArray[a] === gameArray[c]) {
        alert(`Player ${currentPlayer} wins!`);
      }
      if (gameArray.every(item => item !== '')) {
        alert('It\'s a tie');
      }
    });
  }

  return { getGameArray, getCurrentPlayer, playTurn }
})();