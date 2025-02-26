// sketch.js - purpose and description here
// Author: Your Name
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

let countries = [];
let maxGDP = 0;
let colors = {};
let tip = "";

function preload() {
  countries = [
    { country: "USA", gdp: 21354100, continent: "North America" },
    { country: "China", gdp: 14687744, continent: "Asia" },
    { country: "Japan", gdp: 5054068, continent: "Asia" },
    { country: "Germany", gdp: 3940143, continent: "Europe" },
    { country: "India", gdp: 2679381, continent: "Asia" },
    { country: "UK", gdp: 2696778, continent: "Europe" },
    { country: "FRA", gdp: 2647926, continent: "Europe" },
    { country: "ITA", gdp: 1907481, continent: "Europe" },
    { country: "CAN", gdp: 1655685, continent: "North America" },
    { country: "KOR", gdp: 1644610, continent: "Asia" },
    { country: "RUS", gdp: 1483498, continent: "Europe" },
    { country: "BRA", gdp: 1476104, continent: "South America" },
    { country: "AUS", gdp: 1435444, continent: "Oceania" },
    { country: "SPA", gdp: 1289784, continent: "Europe" },
    { country: "Mexico", gdp: 1121065, continent: "North America" },
    { country: "Indonesia", gdp: 1059055, continent: "Asia" },
    { country: "Netherland", gdp: 932561, continent: "Europe" },
    { country: "Switzerland", gdp: 741902, continent: "Europe" },
    { country: "Saudi Arabia", gdp: 734271, continent: "Asia" },
    { country: "Turkey", gdp: 720338, continent: "Asia" },
    
    // more
  ];
}

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

    maxGDP = max(countries.map(c => c.gdp));
  
    const continents = [...new Set(countries.map(c => c.continent))];
    const palette = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];
    continents.forEach((c, i) => colors[c] = palette[i % palette.length]);
  
    countries.forEach(country => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 1000) {
        attempts++;
        const diameter = map(country.gdp, 0, maxGDP, 20, 400);
        
        const x = random(diameter/2 + 20, width - diameter/2 - 20);
        const y = random(diameter/2 + 20, height - diameter/2 - 20);
        
        let collision = false;
        for (let other of countries) {
          if (other.x && other.diameter) {
            const d = dist(x, y, other.x, other.y);
            if (d < (diameter/2 + other.diameter/2 + 5)) {
              collision = true;
              break;
            }
          }
        }
        
        if (!collision) {
          country.x = x;
          country.y = y;
          country.diameter = diameter;
          placed = true;
        }
      }
    });
}

function draw() {
  background(240);
  
  countries.forEach(c => {
    if (!c.x) return; 
    
    fill(colors[c.continent]);
    ellipse(c.x, c.y, c.diameter);

    fill(0);
    textSize(c.diameter/6);
    textAlign(CENTER, CENTER);
    text(c.country.slice(0,3), c.x, c.y);
  });

  if (tip) {
    drawTooltip();
  }
  
  drawLegend();
}

function mouseMoved() {
  tip = "";
  countries.forEach(c => {
    if (!c.x) return;
    const d = dist(mouseX, mouseY, c.x, c.y);
    if (d < c.diameter/2) {
      tip = `${c.country}\nGDP: $${c.gdp.toLocaleString()}M`;
    }
  });
}

function drawTooltip() {
  fill(255);
  stroke(0);
  rect(mouseX + 15, mouseY - 20, 120, 40);
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(tip, mouseX + 20, mouseY - 15);
}

function drawLegend() {
  const legendX = width - 180;
  let legendY = 30;
  
  textSize(14);
  fill(0);
  text("Continents:", legendX, legendY);
  
  Object.entries(colors).forEach(([continent, color]) => {
    legendY += 30;
    fill(color);
    rect(legendX, legendY, 20, 20);
    fill(0);
    text(continent, legendX + 30, legendY + 15);
  });
}
