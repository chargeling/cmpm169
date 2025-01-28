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
var centerHorz, centerVert;
let angle;
let len = 150; 
let growthRate = 0.5; 

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
  angle = radians(20); 
  stroke(50, 100, 50); 
}


function draw() {
  background(240); 
  translate(width / 2, height); 
  branch(len, 15); 
  if (len < 300) {
    len += growthRate; 
  }
}

function branch(len, weight) {

  strokeWeight(weight);

  line(0, 0, 0, -len); 
  translate(0, -len); 

  if (len > 5) { 

    for (let i = 0; i < 2; i++) {

      let randomAngle = angle + radians(random(-10, 10)); 
      push();
      if (i === 0) {
        rotate(randomAngle); 
      } else {
        rotate(-randomAngle); 
      }
      branch(len * 0.7, weight * 0.8); 
      pop();
    }
  }
}