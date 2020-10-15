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

  sliders[0].oninput = function() {
    labels[0].innerHTML = this.value;
  }
  sliders[1].oninput = function() {
    labels[1].innerHTML = (this.value);
    rampAngle = angleSlider.value;
    console.log(this.value)
    updateRamp();
  }
  sliders[2].oninput = function() {
    labels[2].innerHTML = (this.value);
  }
// }

// setSlider();
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = 720;
canvas.width = 1280;

// // placing the base block in the canvas
// var BBImg = new Image();
// BBImg.src = 'assets/big-block.png';
// c.drawImage(BBImg, 50, 600);

// // placing the moving ramp
// var SBImg = new Image();
// SBImg.src = 'assets/small-block.png';
// c.drawImage(SBImg, 50, 300);

//---------------------------
// Functions to draw shapes
// Useful to animate later
// Plan: draw a rectangle to represent
// the ramp and fill it with the image of wood
//---------------------------


const drawRect = (x, y, width, height, angle) => {
  var cx = x + 0.0625 * width;
  var cy = y + height;

  c.fillStyle = "#008080";
  c.translate(cx, cy);
  //c.translate( x, y );
  c.rotate(angle);
  c.translate(-cx, -cy);
  c.fillRect(x, y, width, height);
  c.restore();
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


var bottomRightX = canvas.width;
var bottomRightY = canvas.height;
console.log("h",canvas.width-300);
var jointX = 400;
var jointY = bottomRightY-200;
var rampStandHeight = 0;
function updateRamp(){
    c.clearRect(0, 0, innerWidth, innerHeight);

    var topAngle = 90 - rampAngle;
    var topAngleRad = degrees_to_radians(topAngle);

    var rampAngleRad = degrees_to_radians(rampAngle);

    var angleLineRatio = 1/(bottomRightX-300-jointX);
    rampStandHeight = Math.tan(rampAngleRad) * 580;
    var rampLength = 580/Math.cos(rampAngleRad);

    console.log("ramp stand height", rampStandHeight)
    console.log("ramp length", rampLength)

    jointY = canvas.height - rampStandHeight;

    //ramp
    drawLine(bottomRightX-300, bottomRightY, jointX, jointY);

    //ramp stand
    drawLine(jointX, jointY-4.55, 400, 10000);
    c.save();

    drawRect(jointX, jointY-100, 100, 100, rampAngleRad)
  }
updateRamp();


//ramp
drawLine(bottomRightX-300, bottomRightY, jointX, jointY);

//ramp stand
drawLine(jointX, jointY-4.55, 500, 10000);

// drawCircle(1000, bottomRightY-300,100);


//---------------------------
// Functions to animate shapes
//---------------------------
var x = 200;
var y = 300;
var dx = 3;
var dy = 3;

function animate () {
  c.clearRect(0, 0, innerWidth, innerHeight);
  drawRect(x, y, 600, 100);

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
