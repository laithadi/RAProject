
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

sliders[0].oninput = function () {
  labels[0].innerHTML = this.value;
}
sliders[1].oninput = function () {
  labels[1].innerHTML = (this.value);
}
sliders[2].oninput = function () {
  labels[2].innerHTML = (this.value);
}

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