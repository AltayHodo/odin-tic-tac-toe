const Game = (function () {
  const gameArray = Array(9).fill('');
  const getGameArray = () => gameArray;

  let currentPlayer = 'X';
  const getCurrentPlayer = () => currentPlayer;

  const updateCurrentPlayer = () => currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  let gameOver = false;
  const isGameOver = () => gameOver;

  const playTurn = (index) => {
    if (gameArray[index] === '' && !gameOver) {
      gameArray[index] = currentPlayer;
      if (checkForWin()) {
        DOMController.updateWinDisplay(currentPlayer);
        gameOver = true;
      } else if (checkForTie()) {
        DOMController.updateWinDisplay();
        gameOver = true;
      } else {
        updateCurrentPlayer();
        DOMController.updateCurrentTurn();
      }
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

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return gameArray[a] && gameArray[a] === gameArray[b] && gameArray[a] === gameArray[c];
    });
  };

  const checkForTie = () => {
    return gameArray.every(item => item !== '');
  }

  const reset = () => {
    gameOver = false;
    currentPlayer = 'X';
    gameArray.fill('');
  }

  return { getGameArray, getCurrentPlayer, playTurn, isGameOver, reset };
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

      item.addEventListener('mouseover', (e) => {
        if (!Game.isGameOver()) {
          const target = e.target;
          const index = target.dataset.index;
          if (Game.getGameArray()[index] === '') {
            const currentPlayer = Game.getCurrentPlayer();
            target.style.opacity = '0.5';
            target.textContent = currentPlayer;
          }
        }
      });

      item.addEventListener('mouseout', (e) => {
        if(!Game.isGameOver()) {
          const target = e.target;
          const index = target.dataset.index;
          if (Game.getGameArray()[index] === ''){
            target.style.opacity = '1';
            target.textContent = '';
          }
        }
      })
    });
  };

  const updateCurrentTurn = () => {
    console.log('currentDis')
    const currentTurn = document.querySelector('.current-turn');
    currentTurn.textContent = `Player ${Game.getCurrentPlayer()}'s turn`;
  };

  const updateWinDisplay = (result = 'tie') => {
    console.log('winDis')
    const winDisplay = document.querySelector('.current-turn');
    if (result === 'X' || result === 'O') {
      winDisplay.textContent = `Player ${result} wins!`;
    } else {
      winDisplay.textContent = 'It\'s a tie!';
    }
  };

  const reset = () => {
    Game.reset();
    render();
    updateCurrentTurn();
  };

  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', reset);


  return { render, updateWinDisplay, updateCurrentTurn };
})();

const Main = (() => {
  const init = () => {
    DOMController.render();
    DOMController.updateCurrentTurn();
  }

  return { init };
})();

Main.init();