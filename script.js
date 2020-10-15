// const setSlider = () => {
var weightSlider = document.getElementById("weight");
var angleSlider = document.getElementById("angle");
var rampAngle = angleSlider.value;
var frictionSlider = document.getElementById("friction");
var sliders = [weightSlider, angleSlider, frictionSlider]




var weightLabel = document.getElementById("weightLabel");
var angleLabel = document.getElementById("angleLabel");
var frictionLabel = document.getElementById("frictionLabel");
var labels = [weightLabel, angleLabel, frictionLabel]

for (var i = 0; i < sliders.length; i++) {
  labels[i].innerHTML = sliders[i].value;
}

sliders[0].oninput = function () {
  labels[0].innerHTML = this.value;
}
sliders[1].oninput = function () {
  labels[1].innerHTML = (this.value);
  rampAngle = angleSlider.value;
  console.log(this.value)
  updateRamp();
}
sliders[2].oninput = function () {
  labels[2].innerHTML = (this.value);
}
// }

// setSlider();
function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = 720;
canvas.width = 1280;

//---------------------------
// Functions to draw shapes
// Useful to animate later
// Plan: draw a rectangle to represent
// the ramp and fill it with the image of wood
//---------------------------

const drawRect = (x, y, width, height, angle) => {
  var translateFactorX = 0.0625;
  var cx = x + translateFactorX * width;
  var cy = y + height;

  c.fillStyle = "#008080";

  c.translate(cx, cy);
  c.rotate(angle);
  c.translate(-cx, -cy);

  c.fillRect(x, y, width, height);
  c.restore();
  return (x, y);
}

const drawLine = (originX, originY, destX, destY) => {
  c.beginPath();
  c.moveTo(originX, originY);
  c.lineWidth = 10;
  c.lineTo(destX, destY);
  c.strokeStyle = "#008080"
  c.stroke();
}

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue';
  c.stroke();
}


//---------------------------
// Functions to draw the ramp
// Takes an input angle and rotates the
// ramp relative to that angle
//---------------------------

var bottomRightX = canvas.width;
var bottomRightY = canvas.height;
var jointX = 400;
var jointY = bottomRightY - 200;
var rampStandHeight = 0;
function updateRamp() {
  c.clearRect(0, 0, innerWidth, innerHeight);

  var topAngle = 90 - rampAngle;
  var topAngleRad = degrees_to_radians(topAngle);

  var rampAngleRad = degrees_to_radians(rampAngle);

  //var angleLineRatio = 1/(bottomRightX-300-jointX);
  var rampBase = 580;
  rampStandHeight = Math.tan(rampAngleRad) * rampBase;
  var rampLength = 580 / Math.cos(rampAngleRad);
  // if (rampAngle > 45)
  // rampBottom -= jointY;

  jointY = canvas.height - rampStandHeight;
  console.log(jointY);

  //ramp
  drawLine(bottomRightX - 300, bottomRightY, jointX, jointY);

  //ramp stand
  drawLine(jointX, jointY - 4.55, jointX, bottomRightY);
  c.save();

  // //Draw rectangle at the top of the stand
  var width = 100;
  var height = 100;
  drawRect(jointX, jointY - height, width, height, rampAngleRad)
}
updateRamp();


//ramp
drawLine(bottomRightX - 300, bottomRightY, jointX, jointY);

//ramp stand
//drawLine(jointX, jointY-4.55, 500, 10000);

// drawCircle(1000, bottomRightY-300,100);


//---------------------------
// Functions to animate shapes
//---------------------------
var x = 200;
var y = 300;
var dx = 3;
var dy = 3;

function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  // const rect = drawRect(x, y, 600, 100);

  if (x + 100 > innerWidth || x + 100 < 0)
    dx = -dx;

  x += dx;

  if (y + 600 > innerHeight || y + 600 < 0)
    dy = -dy;

  y += dy;
  requestAnimationFrame(animate);
}

function init() {
  animate();
}

// MOVING THE REC DOWN THE RAMP 

function moveObjectDownRamp() {

  // set the varibles
  var mass = document.getElementById("mass").value;
  var angle = document.getElementById("angle").value;
  var uk = document.getElementById("friction").value;

  var g = 9.8; //Acceleration of gravity
  var a = 0; //Acceleration of the block

  a = g * (Math.sin(angle) - uk * Math.cos(angle));

  Fg = mass * g * Math.sin(angle); // Parallel force acting on the block
  Fm = mass * g * Math.cos(angle); // Perpendicular force acting on the block

  var initialX = jointX;
  var initialY = jointY;

  const targetX = bottomRightX - 300;
  const targetY = bottomRightY;

  const thrust = 5;

  const tx = targetX - jointX;
  const ty = targetY - jointY;

  const dist = Math.sqrt(tx * tx + ty * ty);

  const valX = (tx / dist) * thrust;
  const valY = (ty / dist) * thrust;

  // if the object is not at the bottom of the ramp, move the object
  if ((Math.abs(initialX) >= (bottomRightX - 300)) || (Math.abs(initialY) >= (bottomRightY))) {
    // equation for the velocity of the object - to increment the speed
    initialX += valX;
    initialY += valY;
  }

  // loop this function to show animation
  requestAnimationFrame(moveObjectDownRamp)
}

moveObjectDownRamp();