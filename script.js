const boxes = document.querySelectorAll(".box");
const player = document.querySelector("p");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent.trim() !== "" || gameOver) return;

    box.textContent = currentPlayer;
    checkWinner();

    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      player.textContent = `Player ${currentPlayer} turn`;
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].textContent;
    const valB = boxes[b].textContent;
    const valC = boxes[c].textContent;

    if (valA && valA === valB && valB === valC) {
      gameOver = true;
      player.textContent = `Player ${valA} won!`;

      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      return;
    }
  }
}

restartBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
  });
  currentPlayer = "X";
  gameOver = false;
  player.textContent = "Player X turn";
});
