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

// canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// placing the base block in the canvas
var BBImg = new Image();
BBImg.src = 'assets/big-block.png';
c.drawImage(BBImg, 50, 600);

// placing the moving ramp
var SBImg = new Image();
SBImg.src = 'assets/small-block.png';
c.drawImage(SBImg, 50, 300);

//---------------------------
// Functions to draw shapes
// Useful to animate later
// Plan: draw a rectangle to represent
// the ramp and fill it with the image of wood
//---------------------------
const drawRect = (x, y, width, height) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
  ctx.fillRect(x, y, width, height);
}

const drawLine = (originX, originY, destX, destY) => {
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(destX, destY);
  ctx.strokeStyle = "#fa34a3"
  ctx.stroke();
}

const drawCircle = (x, y, r) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}

// //---------------------------
// // Functions to animate shapes
// //---------------------------
// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 3;
// var dy = (Math.random() - 0.5) * 3;
// const animate = () => {
//   ctx.clearRect(0, 0, innerWidth, innerHeight);
//   drawRect(x, y, 100, 100);

//   if (x + 100 > innerWidth || x + 600 < 0)
//     dx = -dx;

//   x += dx;

//   if (y + 100 > innerHeight || y + 100 < 0)
//     dy = -dy;

//   y += dy;
//   requestAnimationFrame(animate);
// }

// animate();

