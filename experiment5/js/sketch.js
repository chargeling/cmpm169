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
  
  // 设置光照
  pointLight(255, 255, 255, 0, 0, 100);
  ambientLight(100);
  
  // 旋转雪花
  rotateX(angle);
  rotateY(angle * 0.4);
  rotateZ(angle * 0.2);
  
  // 绘制雪花
  drawSnowflake();
  
  // 更新旋转角度
  angle += 0.01;
}

function drawSnowflake() {
  // 设置雪花的材质
  fill(200);
  stroke(255);
  strokeWeight(2);
  
  // 绘制雪花的主体
  for (let i = 0; i < 6; i++) {
    push();
    rotateZ(TWO_PI / 6 * i);
    drawArm();
    pop();
  }
}

function drawArm() {
  // 绘制雪花的一个臂
  beginShape();
  vertex(0, 0, 0);
  vertex(50, 0, 0);
  vertex(50, 10, 0);
  vertex(70, 10, 0);
  vertex(70, 20, 0);
  vertex(50, 20, 0);
  vertex(50, 30, 0);
  vertex(70, 30, 0);
  vertex(70, 40, 0);
  vertex(50, 40, 0);
  vertex(50, 50, 0);
  vertex(0, 50, 0);
  endShape(CLOSE);
}
