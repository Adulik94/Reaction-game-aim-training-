//query selectors
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeLeft = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  'red',
  'salmon',
  'green',
  'yellow',
  'purple',
  'maroon',
  'navy',
  'sandybrown',
];

//time and score  default is 0
let time = 0;
let score = 0;

//add listener on btn, add class on screen
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

//check if event has time-btn get atribut data-time and add up screen
//time we parse becouse we get value in string we neen number
timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');

    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    //removing circle
    event.target.remove();
    //add new circle
    creatRandomCircle();
  }
});

//decrement  time every 1 secon
function startGame() {
  setInterval(decreaseTime, 1000);
  creatRandomCircle();
  setTime(time);
}

//time functional
function decreaseTime() {
  //if time  = 0 we are finishh game
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
//helper for not dublicate code
function setTime(value) {
  timeLeft.innerHTML = `00:${value}`;
}

//restart  game
const restart = `<a href="#" class="start" onclick="reload_interval(100); return false;">Restart</a>`;

function reload_interval(time) {
  setTimeout(function () {
    location.reload();
  }, time);
}

//finish game
function finishGame() {
  //delet time with his parent element
  timeLeft.parentNode.classList.add('hide');

  //add on board "score" element
  board.innerHTML = `<h1>Score:<span class="primary"> ${score}</span> ${restart} </h1>`;
}

//creat random circle
function creatRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const colors = randomColor();

  circle.classList.add('circle');

  //add random color
  circle.style.background = colors;

  //add circle size
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  //circle position
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

//creat function for random circle sizes
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//add random color on circle
function randomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
