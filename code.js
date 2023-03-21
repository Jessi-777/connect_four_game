player1Color = "red";
player2Color = "black";

const wrapper = document.querySelector(".buttons");
wrapper.addEventListener("click", dropPiece);
const playerTurn = document.querySelector(".playerturn");
let player1;
let player2;

let btn = document.createElement("button");
btn.id = "start";
btn.innerHTML = "Start";
btn.addEventListener("click", function () {
  btn.remove();

  while (!player1) {
    player1 = prompt("Player One: Enter your name. You are Red");
  }

  while (!player2) {
    player2 = prompt("Player Two: Enter your name. You are Black");
  }
  playerTurn.textContent = `${player1}'s turn`;
});
let currentPlayer = 1;
function dropPiece() {
  const isButton = event.target;
  let buttonCol = parseInt(isButton.getAttribute("data-column"));
  for (let i = 1; i <= 6; i++) {
    let row = i;
    if (cellSelector(buttonCol, row).style.backgroundColor === "") {
      let droppedPieceLoc = cellSelector(buttonCol, row);
      if (currentPlayer === 1) {
        droppedPieceLoc.style.backgroundColor = player1Color;
        playerTurn.textContent = `${player2}'s turn`;
        checkWin(row, buttonCol, player1, player1Color);
        return (currentPlayer = 2);
      } else {
        droppedPieceLoc.style.backgroundColor = player2Color;
        playerTurn.textContent = `${player1}'s turn`;
        checkWin(row, buttonCol, player2, player2Color);
        return (currentPlayer = 1);
      }
    }
  }
}

let cellSelector = function (x, y) {
  return document.querySelector(`tr[data-level='${y}'] td[data-column='${x}']`);
};

let instruction = document.querySelector(".instruction");
instruction.appendChild(btn);
//when a button is clicked a text appears that when the piece should be ie R and  B

function checkWin(level, cell, player, playerColor) {
  let matchedPieces = 0;

  // check row match
  let row = document.querySelector(`tr[data-level='${level}']`);
  for (let i = 1; i <= row.childElementCount; i++) {
    let currentCell = document.querySelector(
      `tr[data-level='${level}'] td[data-column='${i}']`
    );
    if (currentCell.style.backgroundColor === playerColor) {
      matchedPieces += 1;
      if (matchedPieces >= 4) {
        showWin(player);
        wrapper.removeEventListener("click", dropPiece);
        return;
      }
    } else {
      matchedPieces = 0;
    }
  }

  //check column match

  matchedPieces = 0;
  let column = document.querySelectorAll(`td[data-column='${cell}']`);
  for (let i = 1; i <= column.length; i++) {
    let currentCell = document.querySelector(
      `tr[data-level='${i}'] td[data-column='${cell}']`
    );
    if (currentCell.style.backgroundColor === playerColor) {
      matchedPieces += 1;
      if (matchedPieces >= 4) {
        showWin(player);
        wrapper.removeEventListener("click", dropPiece);
        return;
      }
    } else {
      matchedPieces = 0;
    }
  }

  //check down-diagonal match

  matchedPieces = 0;
  for (let i = 0; i < column.length; i++) {
    let currentCell = document.querySelector(
      `tr[data-level='${i + 1}'] td[data-column='${cell + (level - 1) - i}']`
    );
    if (currentCell !== null) {
      if (currentCell.style.backgroundColor === playerColor) {
        matchedPieces += 1;
        if (matchedPieces >= 4) {
          showWin(player);
          wrapper.removeEventListener("click", dropPiece);
          return;
        }
      } else {
        matchedPieces = 0;
      }
    }
  }

  //check up-diagonal match

  matchedPieces = 0;
  for (let i = 0; i < column.length; i++) {
    let currentCell = document.querySelector(
      `tr[data-level='${i + 1}'] td[data-column='${cell - (level - 1) + i}']`
    );
    if (currentCell !== null) {
      if (currentCell.style.backgroundColor === playerColor) {
        matchedPieces += 1;
        if (matchedPieces >= 4) {
          showWin(player);
          wrapper.removeEventListener("click", dropPiece);
          return;
        }
      } else {
        matchedPieces = 0;
      }
    }
  }
  checkTie();
}

function checkTie() {
  let rowCount = parseInt(document.querySelector(".table").childElementCount);
  let cellPerRow = parseInt(document.querySelector("tr").childElementCount);
  let filledSpace = 0;
  for (let j = 1; j <= rowCount; j++) {
    for (let i = 1; i <= cellPerRow; i++) {
      let currentCell = cellSelector(i, j);
      if (currentCell.style.backgroundColor !== "") {
        filledSpace += 1;
      }
    }
  }
  if (filledSpace === rowCount * cellPerRow) {
    showDraw();
    wrapper.removeEventListener("click", dropPiece);
  }
}

function showWin(player) {
  let winDiv = document.createElement("div");
  winDiv.id = "win-div";
  let winText = document.createElement("h1");
  winText.id = "win-text";
  winText.innerText = `${player} is the winner!!`;
  let restart = document.createElement("button");
  restart.id = "restart";
  restart.innerText = "Play Again";
  restart.addEventListener("click", function () {
    window.history.go(0);
  });

  winDiv.append(winText);
  winDiv.append(restart);
  document.body.appendChild(winDiv);
}

function showDraw() {
  let drawDiv = document.createElement("div");
  drawDiv.id = "draw-div";
  let drawText = document.createElement("h1");
  drawText.id = "draw-text";
  drawText.innerText = `It's a Draw`;
  let restart = document.createElement("button");
  restart.id = "restart";
  restart.innerText = "Play Again";
  restart.addEventListener("click", function () {
    window.history.go(0);
  });

  drawDiv.append(drawText);
  drawDiv.append(restart);
  document.body.appendChild(drawDiv);
}

function tieTest() {
  for (let j = 1; j <= 6; j++) {
    for (let i = 1; i <= 7; i++) {
      let currentCell = cellSelector(i, j);
      currentCell.style.backgroundColor = "blue";
    }
  }
  checkTie();
}

function winTest(orientation, disc1X, disc1Y) {
  let disc1 = cellSelector(disc1X, disc1Y);
  let disc2;
  let disc3;
  let disc4;

  disc1.style.backgroundColor = "blue";
  switch (orientation) {
    case "vertical":
      disc2 = cellSelector(disc1X, disc1Y + 1);
      disc2.style.backgroundColor = "blue";
      disc3 = cellSelector(disc1X, disc1Y + 2);
      disc3.style.backgroundColor = "blue";
      disc4 = cellSelector(disc1X, disc1Y + 3);
      disc4.style.backgroundColor = "blue";
      break;
    case "horizontal":
      disc2 = cellSelector(disc1X + 1, disc1Y);
      disc2.style.backgroundColor = "blue";
      disc3 = cellSelector(disc1X + 2, disc1Y);
      disc3.style.backgroundColor = "blue";
      disc4 = cellSelector(disc1X + 3, disc1Y);
      disc4.style.backgroundColor = "blue";
      break;
    case "up-diagonal":
      disc2 = cellSelector(disc1X + 1, disc1Y + 1);
      disc2.style.backgroundColor = "blue";
      disc3 = cellSelector(disc1X + 2, disc1Y + 2);
      disc3.style.backgroundColor = "blue";
      disc4 = cellSelector(disc1X + 3, disc1Y + 3);
      disc4.style.backgroundColor = "blue";
      break;
    case "down-diagonal":
      disc2 = cellSelector(disc1X - 1, disc1Y + 1);
      disc2.style.backgroundColor = "blue";
      disc3 = cellSelector(disc1X - 2, disc1Y + 2);
      disc3.style.backgroundColor = "blue";
      disc4 = cellSelector(disc1X - 3, disc1Y + 3);
      disc4.style.backgroundColor = "blue";
      break;
  }
  checkWin(disc1Y, disc1X, "winTest", "blue");
}

'use strict'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let width, height, lastNow
let snowflakes
const maxSnowflakes = 100

function init() {
  snowflakes = []
  resize()
  render(lastNow = performance.now())
}

function render(now) {
  requestAnimationFrame(render)
  
  const elapsed = now - lastNow
  lastNow = now
  
  ctx.clearRect(0, 0, width, height)
  if (snowflakes.length < maxSnowflakes)
    snowflakes.push(new Snowflake())
  
  ctx.fillStyle = ctx.strokeStyle = '#fff'

  snowflakes.forEach(snowflake => snowflake.update(elapsed, now))
}

function pause() {
  cancelAnimationFrame(render)
}
function resume() {
  lastNow = performance.now()
  requestAnimationFrame(render)
}


class Snowflake {
  constructor() {
    this.spawn()
  }
  
  spawn(anyY = false) {
    this.x = rand(0, width)
    this.y = anyY === true
      ? rand(-50, height + 50)
      : rand(-50, -10)
    this.xVel = rand(-.05, .05)
    this.yVel = rand(.02, .1)
    this.angle = rand(0, Math.PI * 2)
    this.angleVel = rand(-.001, .001)
    this.size = rand(7, 12)
    this.sizeOsc = rand(.01, .5)
  }
  
  update(elapsed, now) {
    const xForce = rand(-.001, .001);

    if (Math.abs(this.xVel + xForce) < .075) {
      this.xVel += xForce
    }
    
    this.x += this.xVel * elapsed
    this.y += this.yVel * elapsed
    this.angle += this.xVel * 0.05 * elapsed //this.angleVel * elapsed
    
    if (
      this.y - this.size > height ||
      this.x + this.size < 0 ||
      this.x - this.size > width
    ) {
      this.spawn()
    }
    
    this.render()
  }
  
  render() {
    ctx.save()
    const { x, y, angle, size } = this
    ctx.beginPath()
    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.restore()
  }
}

// Utils
const rand = (min, max) => min + Math.random() * (max - min)

function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

window.addEventListener('resize', resize)
window.addEventListener('blur', pause)
window.addEventListener('focus', resume)
init()

$('.container').on('mouseover', function(){
  $('.chip').addClass('light');
  $('.star').addClass('star-light');
})

$('.container').on('mouseout', function(){
  $('.chip').removeClass('light');
})