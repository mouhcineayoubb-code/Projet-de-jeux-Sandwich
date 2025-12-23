// --- VARIABLES DU JEU ---
const ingredients = [
  {
    name: "cheese",
    img: "https://cdn-icons-png.flaticon.com/512/184/184567.png",
  },
  {
    name: "lettuce",
    img: "https://cdn-icons-png.flaticon.com/512/184/184554.png",
  },
  {
    name: "tomato",
    img: "https://cdn-icons-png.flaticon.com/512/1202/1202125.png",
  },
  {
    name: "bacon",
    img: "https://cdn-icons-png.flaticon.com/512/7293/7293268.png",
  },
  {
    name: "bread",
    img: "https://cdn-icons-png.flaticon.com/512/3014/3014502.png",
  },
  {
    name: "onion",
    img: "https://cdn-icons-png.flaticon.com/512/7230/7230847.png",
  },
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairsFound = 0;

// --- FONCTIONS ---

function startMemoryGame() {
  // Affiche l'écran du jeu
  goToScreen("memory-game-screen");
  initializeBoard();
}

function initializeBoard() {
  const board = document.getElementById("memory-board");
  board.innerHTML = ""; // Vide le plateau
  pairsFound = 0;

  // Crée les paires et mélange
  let gameDeck = [...ingredients, ...ingredients];
  gameDeck.sort(() => 0.5 - Math.random());

  // Génère le HTML des cartes
  gameDeck.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.name = item.name;

    card.innerHTML = `
            <div class="front-face"><img src="${item.img}"></div>
            <div class="back-face">?</div>
        `;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoardState();
  pairsFound++;
  if (pairsFound === ingredients.length)
    setTimeout(() => alert("Gagné !"), 500);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoardState();
  }, 1000);
}

function resetBoardState() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function showMenu() {
  // Sélectionne les éléments
  const landing = document.getElementById("landing-screen");
  const menu = document.getElementById("menu-screen");

  // Cache l'écran d'accueil
  landing.style.display = "none";

  // Affiche le menu avec un style flex pour l'alignement
  menu.style.display = "block";
}
