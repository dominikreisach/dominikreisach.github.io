/*
This file is licensed under the MIT License
See LICENSE-MIT for details
*/

let canvas;
let angle = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");

  noStroke();
}

function draw() {
  background("#000000");

  let circleX = windowWidth / 2;
  let circleY = windowHeight / 2;
  let circleDiameter;

  if (windowWidth < 760) {
    circleDiameter = windowWidth / 1.25;
  } else {
    circleDiameter = windowWidth / 3;
  }


  // Glow effect behind the circle
  let maxGlowSize = circleDiameter * 2.5;
  let minGlowSize = circleDiameter;
  let glowLayers = 120; // Number of glow layers

  for (let i = 0; i < glowLayers; i++) {
    let t = i / glowLayers;
    let glowSize = lerp(maxGlowSize, minGlowSize, t);

    let col;

    if (i < glowLayers / 4) {
      col = "#f92f8b";
    } else if (i >= glowLayers / 4 && i < glowLayers / 4 * 2) {
      col = "#fcbe37";
    } else if (i >= glowLayers / 4 * 2 && i < glowLayers / 4 * 3) {
      col = "#992d9b";
    } else {
      col = "#187caa";
    }
    
    let c = color(col);
    c.setAlpha(6); // Set transparency for the glow

    fill(c);
    ellipse(circleX, circleY, glowSize, glowSize);
  }

  // Draw the black circle on top of the glow
  fill("#000000");
  circle(circleX, circleY, circleDiameter);
}
