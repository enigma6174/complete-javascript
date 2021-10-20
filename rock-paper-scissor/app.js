const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = "DRAW";
const RESULT_PLAYER = "PLAYER_WIN";
const RESULT_COMPUTER = "COMPUTER_WIN";

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt("Rock\nPaper\nScissor").toUpperCase();
  if (
    selection.toUpperCase() !== ROCK &&
    selection.toUpperCase() !== PAPER &&
    selection.toUpperCase() !== SCISSOR
  ) {
    alert(
      `[ERR] INVALID SELECTION! REVERTING TO DEFAULT ${DEFAULT_USER_CHOICE} `
    );
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSOR;
  }
};

const getWinner = function (computerChoice, playerChoice) {
  if (computerChoice === playerChoice) {
    return RESULT_DRAW;
  } else if (
    (computerChoice === ROCK && playerChoice === PAPER) ||
    (computerChoice === SCISSOR && playerChoice === ROCK) ||
    (computerChoice === PAPER && playerChoice === SCISSOR)
  ) {
    return RESULT_PLAYER;
  } else {
    return RESULT_COMPUTER;
  }
};

const start = function () {
  if (gameIsRunning) {
    return;
  }

  gameIsRunning = true;
  console.log("[INFO] GAME STARTED!");

  const playerChoice = getPlayerChoice();
  console.log(`[INFO] PLAYER CHOICE: ${playerChoice}`);

  const computerChoice = getComputerChoice();
  console.log(`[INFO] COMPUTER CHOICE: ${computerChoice}`);

  const winner = getWinner(computerChoice, playerChoice);
  console.log(`[INFO] ${winner}`);
};

startGameBtn.addEventListener("click", start);
