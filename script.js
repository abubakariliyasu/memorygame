const cardsArray = ["🐒", "🥚", "🥯", "🥖", "🧆", "🥗", "🍚", "🍪", "🎂"];
let moves = 0;
let timer = 0;
let flippedCards = [];
let matchedPairs = 0;

const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");
const restartBtn = document.getElementById("restart-btn");

function shuffle(array) {
  return array.concat(array).sort(() => 0.5 - Math.random());
}

function startGame() {
  moves = 0;
  timer = 0;
  flippedCards = [];
  matchedPairs = 0;
  movesDisplay.textContent = moves;
  timerDisplay.textContent = "0s";

  // Clear the board
  gameBoard.innerHTML = "";

  // Generate shuffled cards
  const shuffledCards = shuffle(cardsArray);
  shuffledCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card, emoji));
    gameBoard.appendChild(card);
  });

  // Start timer
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = '${timer}s'.replace ('${timer}',timer) ;
  }, 1000);
}

let timerInterval;

function flipCard(card, emoji) {
  if (flippedCards.length < 2 && !card.querySelector(".card-inner").classList.contains("is-flipped")) {
    card.querySelector(".card-inner").classList.add("is-flipped");
    flippedCards.push({ card, emoji });

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;

      // Check for match
      if (flippedCards[0].emoji === flippedCards[1].emoji) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardsArray.length) {
          setTimeout(() => alert("You won!"), 500);
          clearInterval(timerInterval);
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach((flipped) => {
            flipped.card.querySelector(".card-inner").classList.remove("is-flipped");
          });
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

restartBtn.addEventListener("click", startGame);

// Start the game initially
startGame();