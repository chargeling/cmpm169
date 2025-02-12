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
let angle = 0;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(800, 600, WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(30);
  
  pointLight(255, 255, 255, 0, 0, 100);
  ambientLight(100);
  
  // rotate
  rotateX(angle);
  rotateY(angle * 0.4);
  rotateZ(angle * 0.2);
  
  draw3D();
  
  angle += 0.01;
}

function draw3D() {

  fill(200);
  stroke(255);
  strokeWeight(1);
  

  for (let i = 0; i < 6; i++) {
    push();
    rotateZ(TWO_PI / 6 * i); 
    draw3DArm();
    pop();
  }
}

function draw3DArm() {

  push();
  translate(50, 0, 0); 
  rotateY(PI / 4); 
  box(100, 10, 10); 
  
  // branch
  drawBranch(30, -20, 0, 10, 40, 10); 
  drawBranch(30, 20, 0, 10, 40, 10);  
  drawBranch(60, -30, 0, 10, 20, 10); 
  drawBranch(60, 30, 0, 10, 20, 10);  
  drawBranch(80, -15, 0, 10, 10, 10); 
  drawBranch(80, 15, 0, 10, 10, 10);  
  
  push();
  translate(100, 0, 0);
  sphere(8);
  pop();
  
  pop();
}

function drawBranch(x, y, z, w, h, d) {
  push();
  translate(x, y, z);
  rotateY(PI / 4); 
  box(w, h, d); 
  pop();
}