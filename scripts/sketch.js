var flowfield;
var vehicles = [];
let startTime;
let elapsedTime;
var firstColor;
var secondColor;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");
  startTime = millis();
  flowfield = new FlowField(200);

  for (var i = 0; i < 4000; i++) {
    vehicles.push(
      new Vehicle(random(width), random(height), random(0.5, 3), random(0.1, 0.5))
    );
  }
}

function draw() {
  background("#96bfe6");

  elapsedTime = millis() - startTime;
  if (elapsedTime >= 5000) {
    flowfield.init();
    startTime = millis();
  }

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }
}

function mousePressed() {
  flowfield.init();
}

function Vehicle(x, y, ms, mf) {
  this.position = createVector(x, y);
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.r = 4;
  this.maxspeed = ms;
  this.maxforce = mf;

  this.run = function () {
    this.update();
    this.borders();
    this.display();
  };

  this.follow = function (flow) {
    var desired = flow.lookup(this.position);
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.borders = function () {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  };

  var teamColor = random(0, 1);
  if (teamColor < 0.0125) {
    this.objectColor = color("rgba(255,255,255, 0.75)");
  } else if (teamColor > 0.0125 && teamColor < 0.5) {
    this.objectColor = color("rgba(0,8,49, 0.5)");
  } else if (teamColor > 0.25 && teamColor < 0.5) {
    this.objectColor = color("rgba(0,8,49, 0.75)");
  } else if (teamColor > 0.5 && teamColor < 0.75) {
    this.objectColor = color("rgba(255,97,107, 0.5)");
  } else if (teamColor > 0.75 && teamColor < 0.9875) {
    this.objectColor = color("rgba(255,97,107, 0.75)");
  } else {
    this.objectColor = color("rgba(255,255,255, 0.75)");
  }

  this.display = function () {
    var theta = this.velocity.heading() + PI / 2;
    stroke(this.objectColor);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    line(0, 0, 0, 2);
    pop();
  };
}

function FlowField(r) {
  // How large is each "cell" of the flow field
  this.resolution = r;
  // Determine the number of columns and rows based on sketch's width and height
  this.cols = width / this.resolution;
  this.rows = height / this.resolution;
  // A flow field is a two dimensional array of p5.Vectors
  // We can't make 2D arrays, but this is sort of faking it
  this.make2Darray = function (n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  };
  this.field = this.make2Darray(this.cols);

  this.init = function () {
    // Reseed noise so we get a new flow field every time
    // Need to get noise working
    noiseSeed(Math.floor(random(9999)));
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        var theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        //var theta = map(sin(xoff)+cos(yoff),-2,2,0,TWO_PI);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  };
  this.init();

  // Draw every vector
  this.display = function () {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        drawVector(
          this.field[i][j],
          i * this.resolution,
          j * this.resolution,
          this.resolution - 2
        );
      }
    }
  };

  this.lookup = function (lookup) {
    var column = Math.floor(
      constrain(lookup.x / this.resolution, 0, this.cols - 1)
    );
    var row = Math.floor(
      constrain(lookup.y / this.resolution, 0, this.rows - 1)
    );
    return this.field[column][row].copy();
  };

  var drawVector = function (v, x, y, scayl) {
    push();
    var arrowsize = 1;
    // Translate to location to render vector
    translate(x, y);
    stroke("#96bfe6");
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  };
}
