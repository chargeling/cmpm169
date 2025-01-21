// sketch.js - purpose and description here
// Author: Bolan Guan
// Date: 1/20/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let canvas;
let echoes = 9;
let numPoints = 500;
let field;
let rotationAngle = 0; // Global variable to keep track of the rotation angle
let scaleFactor = 1; // Global variable to keep track of the scaling factor

console.log("← → Decrease/Increase x complexity");
console.log("↑ ↓ Decrease/Increase y complexity");
console.log("- + Decrease/Increase echoes");
console.log("0-9 Set echoes");

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

class Line {
  constructor(xNoiseFreq, yNoiseFreq, xIncrement) {
    this.xNoiseFreq = xNoiseFreq;
    this.yNoiseFreq = yNoiseFreq;
    this.xIncrement = xIncrement;
    // save the current framecount for later
    this.frameCount = frameCount;
    this.noiseValues = Array();
    // create this line
    for (let x = 0; x <= width; x += this.xIncrement) {
      this.noiseValues.push(noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * height);
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.noiseValues.length; i++) {
      curveVertex(i * this.xIncrement, this.noiseValues[i]);
    }
    endShape();
  }
}

class VerticalLine {
  constructor(xNoiseFreq, yNoiseFreq, yIncrement) {
    this.xNoiseFreq = xNoiseFreq;
    this.yNoiseFreq = yNoiseFreq;
    this.yIncrement = yIncrement;
    // save the current framecount for later
    this.frameCount = frameCount;
    this.noiseValues = Array();
    // create this line
    for (let y = 0; y <= height; y += this.yIncrement) {
      this.noiseValues.push(noise(this.frameCount * this.xNoiseFreq, y * this.yNoiseFreq) * width);
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.noiseValues.length; i++) {
      curveVertex(this.noiseValues[i], i * this.yIncrement);
    }
    endShape();
  }
}

class Field {
  constructor(numPoints, echoes) {
    this.xNoiseFreq = 0.01;
    this.yNoiseFreq = 0.01;
    this.xNoiseStep = 1.1;
    this.yNoiseStep = 1.1;
    this.numPoints = numPoints;
    this.echoes = echoes;
    this.echoArray1 = Array();
    this.echoArray2 = Array();
    this.echoArray3 = Array();
    this.verticalLines = Array();
  }
  
  setup() {
    stroke(255);
    noFill();
  }
  
  draw() {
    background(0, 140, 0); // Set background color to green (RGB: 0, 255, 0)
    // calculate the xIncrement based on the width of the
    // screen, the desired number of points and echoes value
    // in order to keep a constant number of points/speed
    let xIncrement = width * this.echoes / numPoints;
    // create new lines
    let newLine1 = new Line(this.xNoiseFreq, this.yNoiseFreq + 0.01, xIncrement);
    let newLine2 = new Line(this.xNoiseFreq + 0.01, this.yNoiseFreq, xIncrement);
    let newLine3 = new Line(this.xNoiseFreq + 0.02, this.yNoiseFreq + 0.01, xIncrement);
    // add them to the arrays of echoes
    this.echoArray1.push(newLine1);
    this.echoArray2.push(newLine2);
    this.echoArray3.push(newLine3);
    // remove any unneeded lines
    let numElementsToRemove = Math.max(
      this.echoArray1.length - this.echoes, 0);
    for(let i=0; i < numElementsToRemove; i++) {
      this.echoArray1.shift();
      this.echoArray2.shift();
      this.echoArray3.shift();
    }
    let sum = 0;
    // draw all the lines in the echo arrays
    for(let i=0;i < this.echoArray1.length;i++) {
      this.echoArray1[i].draw();
      this.echoArray2[i].draw();
      this.echoArray3[i].draw();
      sum += this.echoArray1[i].noiseValues.length;
      sum += this.echoArray2[i].noiseValues.length;
      sum += this.echoArray3[i].noiseValues.length;
    }
    // draw all the vertical lines
    for(let i=0; i < this.verticalLines.length; i++) {
      this.verticalLines[i].draw();
    }
    // console.log("Total points being drawn:", sum, "xIncrement:", xIncrement);
  }
  
  changeParams(key) {
    if (key === 'ArrowUp') {
      this.yNoiseFreq = this.yNoiseFreq * this.yNoiseStep;
    } else if (key === 'ArrowDown') {
      this.yNoiseFreq = this.yNoiseFreq / this.yNoiseStep;
    } else if (key === 'ArrowLeft') {
      this.xNoiseFreq = this.xNoiseFreq / this.xNoiseStep;
    } else if (key === 'ArrowRight') {
      this.xNoiseFreq = this.xNoiseFreq * this.xNoiseStep;
    } else if (key >= '0' && key <= 9) {
      this.echoes = parseInt(key);
    } else if (key === '+' || key === '=') {
      this.echoes += 1;
    } else if (key === '-' || key === '_') {
      if (this.echoes > 1) {
        this.echoes -= 1;
      }
    }
  }

  addVerticalLine() {
    let yIncrement = height * this.echoes / numPoints;
    let newVerticalLine = new VerticalLine(this.xNoiseFreq, this.yNoiseFreq, yIncrement);
    this.verticalLines.push(newVerticalLine);
    // Keep only the latest 5 vertical lines
    if (this.verticalLines.length > 5) {
      this.verticalLines.shift();
    }
  }
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
  canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  background(0);

  field = new Field(numPoints, echoes);
  field.setup();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  field.draw();
  drawLineOfStars(20); // Draw stars at the top
  drawLineOfStars(height - 20); // Draw stars at the bottom
  rotationAngle += radians(1); // Increment the rotation angle by 1 degree

  // Calculate the scaling factor based on the frame count
  scaleFactor = 1 + 0.5 * sin(frameCount * 0.05); // Oscillates between 1 and 1.5
}

function keyPressed() {
  field.changeParams(key);
}

function mousePressed() {
  field.addVerticalLine();
}

function resizeIt() {
  // set the width and height variables to match the container size
  w = document.getElementById("container").offsetWidth;
  h = document.getElementById("container").offsetHeight;
  // set the canvas size to match the container size
  resizeCanvas(w, h);
}

function windowResized() {
  // call the resize function when the window is resized
  resizeIt();
}

// Function to draw a star
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  push(); // Save the current transformation matrix
  translate(x, y); // Move the origin to the star's position
  rotate(rotationAngle); // Rotate by the current rotation angle
  scale(scaleFactor); // Apply the scaling factor
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * radius2;
    let sy = sin(a) * radius2;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * radius1;
    sy = sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop(); // Restore the previous transformation matrix
}

// Function to draw a line of stars
function drawLineOfStars(y) {
  let starSpacing = 30; // Space between stars
  for (let x = 0; x < width; x += starSpacing) {
    drawStar(x, y, 5, 10, 5);
  }
}