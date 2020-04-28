var gridSize = 16;
var r = 100; // These
var g = 100; // set color
var b = 100; // to black
var color = 'rgb(' + r + ',' + g + ',' + b + ')';

console.log('default color: ' + color);

const container = document.querySelector('#container');
const textBox = document.querySelector('.textBox');
const gridBtn = document.querySelector('#gridButton');
const randColorBtn = document.querySelector('#colorButton');
const pickColorBtn = document.querySelector('#customColor');

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
  var textEntry = '';
  textEntry = document.querySelector('.textBox').value;
  textEntry = checkForNum(textEntry);
  console.log(textEntry + ' in btn listener - got text');
  if (textEntry.length === 0) {
    gridSize = 16;
    console.log(gridSize + ' in btn listener (default size)');
  } else {
    gridSize = textEntry;
  }
  document.querySelector('.textBox').value = '';
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
var tBox = document.querySelector('.textBox');
tBox.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector('#button').click();
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
  console.log('squaresize ' + squareSize);
  console.log(gridSize + ' in createGrid (initial)');
  gridSize *= gridSize;
  console.log(gridSize + ' in createGrid (squared)');
  for (let i = 0; i < gridSize; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('gridSquare');
    gridSquare.style.width = squareSize + 'vmin';
    gridSquare.style.height = squareSize + 'vmin';
    gridSquare.classList.remove('filledBox');
    container.appendChild(gridSquare);
  }

  // Hover effects
  const allGridSquares = document.querySelectorAll('.gridSquare');
  document.querySelector('.gridSquare');

  allGridSquares.forEach((box) => {
    box.addEventListener('mouseover', function () {
      box.style.backgroundColor = color;
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