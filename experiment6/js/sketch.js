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
let keywords = [
  "sketch", "canvas", "brush", "palette", 
  "color", "design", "form", "line",
  "shape", "texture", "stroke", "shade",
  "hue", "gradient", "abstract"
];
let chars = [];
let baseSize = 20; 

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
  textFont('monospace');
  
 
  for (let x = 0; x < width; x += baseSize) {
    for (let y = 0; y < height; y += baseSize) {
      chars.push({
        x: x,
        y: y,
        char: random(keywords).charAt(0),
        color: color(random(100,255), random(100,255), random(100,255)),
        scale: random(0.5, 2), 
        speed: random(0.02, 0.1) 
      });
    }
  }
}




function draw() {
  background(30);
  
  chars.forEach(c => {
    let wave1 = sin(frameCount * c.speed + c.x * 0.1) * 8;
    let wave2 = cos(frameCount * c.speed * 0.8 + c.y * 0.1) * 6;
    let dynamicSize = baseSize * c.scale + wave1 + wave2;
    
    dynamicSize = max(dynamicSize, baseSize * 0.8);
    
    fill(c.color);
    textSize(dynamicSize);
    text(c.char, 
         c.x + wave1 * 0.5, 
         c.y + wave2 * 0.5  
    );


    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < 30) {
      c.char = random(keywords).substr(0, 3); 
      textSize(dynamicSize * 1.5); 
    }
  });

  if(frameCount % 30 == 0) {
    stroke(random(150,200), 50);
    line(random(width), 0, random(width), height);
  }
}