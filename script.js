const balls = document.querySelectorAll(".ball");
const colorReference = document.querySelector("#rgb-color");
const score = document.querySelector("#score");
const changeColors = document.querySelector("#btn-change-colors");
const resetScore = document.querySelector("#btn-reset-score");
const colors = [];
let pointCount = 0;

if(localStorage.getItem("score")) {
  score.textContent = `Pontos: ${localStorage.getItem("score")}`;
  pointCount = Number(localStorage.getItem("score"));
}

function randomNumber(multiply) {
  let number =  Math.floor(Math.random() * multiply);
  return number;
}

function randomColor(multiply) {
  let r = randomNumber(multiply);
  let g = randomNumber(multiply);
  let b = randomNumber(multiply);
  return `(${r}, ${g}, ${b})`;  
}

function addRandomColor() {
  colorReference.textContent = colors[randomNumber(6)];  
}

function colorBalls() {
  for(let ball = 0; ball < balls.length; ball++) {
    let color = randomColor(256);
    balls[ball].style.backgroundColor = `rgb${color}`;
    colors[ball] = `rgb${color}`;
    balls[ball].addEventListener('click', clickBall);
  }
}

let repeatedClickRight = true;
function clickBall(event) {
  let colorSelection = event.target.style.backgroundColor;
  if(colorSelection === colorReference.textContent && repeatedClickRight === true) {
    pointCount += 3;
    repeatedClickRight = false; 
  }else if(colorSelection !== colorReference.textContent) {
    pointCount -= 1;
  }
  localStorage.setItem("score", pointCount);
  score.textContent = `Pontos: ${pointCount}`;
}

colorBalls();
addRandomColor();

function resetGame() {
  repeatedClickRight = true;
  colorBalls();
  addRandomColor();
}
changeColors.addEventListener("click", resetGame);

function eraseScore() {
  localStorage.removeItem("score");
  pointCount = 0;
  score.textContent = `Pontos: ${pointCount}`;
}
resetScore.addEventListener("click", eraseScore);

let tmp = setInterval(resetGame, 4000);

