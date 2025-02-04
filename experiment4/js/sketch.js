// sketch.js - purpose and description here
// Author: Bolan Guan
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

let img;
let mosaicSize = 10; // variable
let mosaicTiles = []; 
let tilesToShow = []; 
let tilesToHide = []; 
let showSpeed = 10; 
let hideSpeed = 5; 
let isShowing = true; 


function preload() {
  img = loadImage('img/Capture805.PNG'); 
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  for (let y = 0; y < img.height; y += mosaicSize) {
    for (let x = 0; x < img.width; x += mosaicSize) {
      let c = getAverageColor(x, y, mosaicSize);
      mosaicTiles.push({ x, y, color: c, show: false });
    }
  }

  tilesToShow = shuffleArray(mosaicTiles.map((_, index) => index));
  tilesToHide = [...tilesToShow];
}


function draw() {
  background(255);

  if (isShowing) {
    for (let i = 0; i < showSpeed; i++) {
      if (tilesToShow.length > 0) {
        let tileIndex = tilesToShow.pop(); 
        mosaicTiles[tileIndex].show = true; 
      } else {
        isShowing = false;
        break;
      }
    }
  } else {
    for (let i = 0; i < hideSpeed; i++) {
      if (tilesToHide.length > 0) {
        let tileIndex = tilesToHide.pop(); 
        mosaicTiles[tileIndex].show = false; 
      } else {
        noLoop();
        break;
      }
    }
  }

  for (let tile of mosaicTiles) {
    if (tile.show) {
      fill(tile.color);
      rect(tile.x, tile.y, mosaicSize, mosaicSize);
    }
  }
}

function getAverageColor(x, y, size) {
  let r = 0, g = 0, b = 0;
  let count = 0;

  for (let i = y; i < y + size && i < img.height; i++) {
    for (let j = x; j < x + size && j < img.width; j++) {
      let pixelColor = img.get(j, i);
      r += red(pixelColor);
      g += green(pixelColor);
      b += blue(pixelColor);
      count++;
    }
  }

  r /= count;
  g /= count;
  b /= count;

  return color(r, g, b);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}