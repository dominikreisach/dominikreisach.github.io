/*
This file is licensed under the MIT License
See LICENSE-MIT for details
*/

let canvas;
var points = [];
// var mult = 0.001; // Controls the speed of the movement
let circleDiameter;
let thickness;

var r_1;
var g_1;
var b_1;
var r_2;
var g_2;
var b_2;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background("#000000");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    canvas.style("position", "fixed");

    background("#000000");

    angleMode(DEGREES);
    noiseDetail(1);
    
    var density = 200;
    var space = windowWidth / density;
    
    for (var x = 0; x < windowWidth; x += space) { // corrected condition
        for (var y = 0; y < windowHeight; y += space) { // corrected condition
            var p = createVector(x + random(-50, 50), y + random(-50, 50));
            points.push(p);
        }
    }

    shuffle(points, true);

    r_1 = random(255);
    g_1 = random(255);
    b_1 = random(255);
    r_2 = random(255);
    g_2 = random(255);
    b_2 = random(255);

    mult = random(0.001, 0.005);
}

function draw() {    
    noStroke();

    if (windowWidth < 600) {
        circleDiameter = windowWidth / 2;
        thickness = 1.5;
      } else if (windowWidth < 900) {
        circleDiameter = windowWidth / 3;
        thickness = 2.0;
      } else {
        circleDiameter = windowWidth / 4;
        thickness = 2.5;
      }

    if (frameCount * 20 <= points.length) {
        var max = frameCount * 20;
    } else {
        var max = points.length;
    }

    for (var i = 0; i < max; i++) {
    // for (var i = 0; i < points.length; i++) {
        // var r = map(points[i].x, 0, windowWidth, 50, 255);
        // var g = map(points[i].y, 0, windowHeight, 50, 255);
        // var b = map(points[i].x, 0, windowWidth, 255, 50);
        var r = map(points[i].x, 0, windowWidth, r_1, r_2);
        var g = map(points[i].y, 0, windowHeight, g_1, g_2);
        var b = map(points[i].x, 0, windowWidth, b_1, b_2);
        var alpha = map(dist(windowWidth / 2, windowHeight / 2, points[i].x, points[i].y), 0, circleDiameter, 255, 0);
    
        fill(r, g, b, alpha);

        var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
        points[i].add(createVector(cos(angle), sin(angle)));

        if (dist(windowWidth / 2, windowHeight / 2, points[i].x, points[i].y) < circleDiameter) {
            ellipse(points[i].x, points[i].y, thickness);
        }
    }
}
