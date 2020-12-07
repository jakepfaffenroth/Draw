var gridSize = 20;
var r = 100; // These
var g = 100; // set color
var b = 100; // to black
var color = 'rgb(' + r + ',' + g + ',' + b + ')';

const html = document.querySelector('HTML');
const container = document.querySelector('#container');
const textBox = document.querySelector('.textBox');
const gridBtn = document.querySelector('#gridButton');
const fillBtn = document.querySelector('#fillButton');
const randColorBtn = document.querySelector('#colorButton');
const pickColorBtn = document.querySelector('#customColor');
const tBox = document.querySelector('.textBox');

let fillMode = false;

// Stop drawing whenever cursor is lifted, no matter where cursor is located
let mousedown = false;
html.addEventListener('mouseup', function () {
  mousedown = false;
});

//Convert RGB to HEX and set picker color
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  color = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return color;
}
rgbToHex(r, g, b);
pickColorBtn.value = color;

createGrid();

// Button - CREATE GRID
gridBtn.addEventListener('click', function () {
  if (!parseInt(tBox.value)) {
    alert('Grid size must be a number');
    return;
  }
  var textEntry = '';
  textEntry = tBox.value;
  textEntry = checkForNum(textEntry);

  if (textEntry.length === 0) {
    gridSize = 20;
    console.log(gridSize + ' in btn listener (default size)');
  } else {
    gridSize = textEntry;
    tBox.placeholder = 'Grid size: ' + gridSize;
  }
  tBox.value = '';
  clearGrid();
  createGrid();
});

// Button - NEW RANDOM COLOR
randColorBtn.addEventListener('click', function () {
  getRandColor();
});

// Button - COLOR PICKER
pickColorBtn.addEventListener('click', function () {
  getCustomColor();
});

// Activate createGrid button from Enter key

tBox.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector('#gridButton').click();
  }
});

function checkForNum(entry) {
  entry = parseInt(entry);
  if (isNaN(entry)) {
    return '';
  } else {
    return entry;
  }
}

function getRandColor() {
  r = Math.floor(Math.random() * 256 + 1);
  g = Math.floor(Math.random() * 256 + 1);
  b = Math.floor(Math.random() * 256 + 1);
  color = 'rgb(' + r + ',' + g + ',' + b + ')';
  rgbToHex(r, g, b);
  pickColorBtn.value = color;
  console.log('new color: ' + color);
  console.log('colorPicker color: ' + pickColorBtn.value);
}

function getCustomColor() {
  pickColorBtn.addEventListener('input', function (e) {
    color = e.target.value;
    pickColorBtn.value = color;
  });

  console.log('custom color: ' + color);
}

function createGrid() {
  getRandColor();
  var squareSize = 75 / gridSize;
  // console.log('squaresize ' + squareSize);
  // console.log(gridSize + ' in createGrid (initial)');
  gridSize *= gridSize;
  // console.log(gridSize + ' in createGrid (squared)');
  for (let i = 0; i < gridSize; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('gridSquare');
    gridSquare.id = i.toString();
    gridSquare.style.width = squareSize + 'vmin';
    gridSquare.style.height = squareSize + 'vmin';
    gridSquare.classList.remove('filledBox');
    container.appendChild(gridSquare);
  }

  const allGridSquares = document.querySelectorAll('.gridSquare');
  // Hover effects

  document.querySelector('.gridSquare');

  allGridSquares.forEach((box) => {
    box.dataset.posY = Math.floor(parseInt(box.id) / Math.sqrt(gridSize));
    box.dataset.posX = Math.floor(parseInt(box.id) - Math.sqrt(gridSize) * box.dataset.posY);

    box.addEventListener('click', function () {
      if (fillMode) {
        fill({ x: box.dataset.posX, y: box.dataset.posY });
      }
    });
    box.addEventListener('mousedown', function () {
      mousedown = true;
      if (!fillMode) {
        box.style.backgroundColor = color;
      }
    });
    box.addEventListener('mouseover', function () {
      if (mousedown && !fillMode) {
        box.style.backgroundColor = color;
      }
    });
  });
}

// Fill mode
fillBtn.addEventListener('click', function () {
  fillMode = !fillMode;
  if (fillMode) {
    fillBtn.style.color = 'red';
  } else {
    fillBtn.style.color = null;
  }
});

function fill({ x, y }) {
  const allGridSquares = document.querySelectorAll('.gridSquare');
  const gridRoot = Math.sqrt(gridSize);
  const kernel = [
    { x, y },
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ].filter((box) => box.x >= 0 && box.x < gridRoot && box.y >= 0 && box.y < gridRoot);
  allGridSquares.forEach((box) => {
    if (box.style.backgroundColor) {
      return;
    }

    kernel.forEach((coord) => {
      if (parseInt(box.dataset.posX) === coord.x && parseInt(box.dataset.posY) === coord.y) {
        box.style.backgroundColor = color;
        fill({ x: coord.x, y: coord.y });
      }
    });
  });
}

function clearGrid() {
  const allGrid = document.querySelectorAll('.gridSquare');
  allGrid.forEach((box) => {
    box.parentNode.removeChild(box);
  });
  console.log(gridSize + ' in clearGrid');
}
// test
