'use strict';
// Selecting the Elements..
const reset = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const dice = document.querySelector('.dice');
// initialzing the random number in randScore

// Usual way of selecting an ID
const score0El = document.querySelector('#score--0');
// Faster way of selecting an ID
const score1El = document.getElementById('score--1');

// variable declearation!!
let currentScore, activePlayer, playing, mainScores;

// function to start the game
const start = function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // Array of Main Score
  mainScores = [0, 0];
  // ### Starting Codition of Game..
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add('hidden');

  //remove winner
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
start();

// function to swictch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

roll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random number..
    const randScore = Math.trunc(Math.random() * 6) + 1;

    // 2. display the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${randScore}.png`;

    // 3. check for rolled 1
    if (randScore !== 1) {
      // Add dice to current score
      currentScore += randScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players main score
    mainScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      mainScores[activePlayer];

    // 2. Check if player's main score is >= 100
    if (mainScores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

// restarting the game
reset.addEventListener('click', start);
