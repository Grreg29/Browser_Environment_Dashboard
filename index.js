// script.js

const words = ["apple", "banana", "grape", "orange", "peach", "kiwi"];
const secretWord = words[Math.floor(Math.random() * words.length)];
let attemptsLeft = 5;

const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

console.log("Secret word for testing:", secretWord); // for testing

submitBtn.addEventListener('click', handleGuess);
restartBtn.addEventListener('click', restartGame);

function handleGuess() {
  let guess = guessInput.value.trim().toLowerCase();

  if (!guess) {
    message.textContent = `Incorrect guess. You have ${attemptsLeft - 1} attempts left. Try again!`;
    reduceAttempt();
    return;
  }

  if (guess === secretWord) {
    message.textContent = "🎉 Congratulations! You guessed the secret word!";
    document.body.classList.add('win');
    endGame();
  } else {
    reduceAttempt();
    if (attemptsLeft > 0) {
      message.textContent = `Incorrect guess. You have ${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''} left. Try again!`;
    } else {
      message.textContent = `💀 Game over! The secret word was '${secretWord}'.`;
      document.body.classList.add('lose');
      endGame();
    }
  }

  guessInput.value = '';
  guessInput.focus();
}

function reduceAttempt() {
  attemptsLeft--;
}

function endGame() {
  guessInput.disabled = true;
  submitBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
}

function restartGame() {
  window.location.reload(); // quick refresh reset
}
