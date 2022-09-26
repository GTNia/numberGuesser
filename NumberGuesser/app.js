/*Game functions:
- player must gues a number between a min and a max
- player gets a certain amount of guesses
- notify player of guesses left
- notify player of the correct answer if lose
- let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI elements

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// assign min and max

minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// listen for guess

guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  console.log(guess);
  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!!`);
  } else {
    // wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //game over - lost
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // game continues - answer wrong
      guessInput.style.borderColor = 'red';

      //clear input
      guessInput.value = '';

      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  //disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  message.style.color = color;
  //set message
  setMessage(msg);

  //play again

  guessBtn.value = 'Play again?';
  guessBtn.className += 'play-again';
}
// get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
