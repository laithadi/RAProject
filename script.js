const setSlider = () => {
  var weightSlider = document.getElementById("weight");
  var angleSlider = document.getElementById("angle");
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
  }
  sliders[2].oninput = function() {
    labels[2].innerHTML = (this.value);
  }
}
setSlider();

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

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
const drawRect = (x, y, width, height) => {
  c.fillStyle = "#fa34a3"
  c.fillRect(x, y, width, height);
}

const drawLine = (originX, originY, destX, destY) => {
  c.beginPath();
  c.moveTo(originX, originY);
  c.lineWidth = 10;
  c.lineTo(destX, destY);
  c.strokeStyle = "#fa34a3"
  c.stroke();
}

const drawCircle = (x, y, r) => {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue';
  c.stroke();
}

drawLine(200, 300, 300, 400);

//---------------------------
// Functions to animate shapes
//---------------------------
var x = 200;
var y = 300;
var dx = 3;
var dy = 3;
function animate () {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  drawRect(x, y, 600, 100);

  if (x + 100 > innerWidth || x + 100 < 0)
    dx = -dx;

  x += dx;

  if (y + 600 > innerHeight || y + 600 < 0)
    dy = -dy;

  y += dy;
  requestAnimationFrame(animate);
}

animate();

