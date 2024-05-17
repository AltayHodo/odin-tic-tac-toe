const Game = (function () {
  const gameArray = Array(9).fill('');
  const getGameArray = () => gameArray;

  let currentPlayer = 'X';
  const getCurrentPlayer = () => currentPlayer;

  const updateCurrentPlayer = () => currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  let gameOver = false;
  const isGameOver = () => gameOver;

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
        // alert(`Player ${currentPlayer} wins!`);
        DOMController.updateWinDisplay(currentPlayer)
        gameOver = true;
      }
    });

    if (gameArray.every(item => item !== '')) {
      // alert('It\'s a tie');
      DOMController.updateWinDisplay();
      gameOver = true;
    }
  };

  return { getGameArray, getCurrentPlayer, playTurn, isGameOver };
})();

const DOMController = (function () {
  const render = () => {
    const boardContainer = document.querySelector('.board-container');
    boardContainer.innerHTML = '';
    Game.getGameArray().forEach((item, index) => {
      const boardItem = document.createElement('div');
      boardItem.textContent = item;
      boardItem.classList.add('board-item');
      boardItem.dataset.index = index;
      boardContainer.appendChild(boardItem);
    });
    bindEvents();
  };

  const bindEvents = () => {
    const boardItems = document.querySelectorAll('.board-item');
    boardItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!Game.isGameOver()) {
          const target = e.target;
          const index = target.dataset.index;
          if (Game.playTurn(index)) {
            render();
          }
        }
      });
    });
  };

  const updateWinDisplay = (result = 'tie') => {
    const winDisplay = document.querySelector('.winner-display');
    if (result === 'X' || result === 'O') {
      winDisplay.textContent = `Player ${result} wins!`;
    } else {
      winDisplay.textContent = 'It\'s a tie!';
    }
  };

  return { render, updateWinDisplay };
})();

const Main = (() => {
  const init = () => {
    DOMController.render();
  }

  return { init };
})();

Main.init();