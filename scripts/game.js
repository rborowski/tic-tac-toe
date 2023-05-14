function startNewGame() {
  if (players[0].name && players[1].name) {
    gameAreaElement.style.display = "block";
    errorsOutputPlayersElement.textContent = "";
  } else {
    errorsOutputPlayersElement.textContent = "Please enter valid players name!";
    return;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
  //checking rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] == gameData[i][1] &&
      gameData[i][1] == gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //checking rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] == gameData[1][i] &&
      gameData[1][i] == gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  //checking board diagonally for equality: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] == gameData[1][1] &&
    gameData[1][1] == gameData[2][2]
  ) {
    return gameData[0][0];
  }
  //checking board diagonally for equality: bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] == gameData[1][1] &&
    gameData[1][1] == gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function switchPlayer() {
  if (!activePlayer) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  const selectedField = event.target;

  if (selectedField.tagName != "LI") {
    return;
  }
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  endGame(winnerId);
  currentRound++
  switchPlayer();
}

function endGame(winnerId) {
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    winnerNameElement.textContent = players[winnerId].name;
  } else if (winnerId < 0) {
    gameOverElement.firstElementChild.textContent = "It's a tie!";
  } else {
    return;
  }
}
