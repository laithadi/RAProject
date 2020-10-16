// call on the canvas 
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

function setup() {
    canvas.height = 800;
    canvas.width = 1700;
    c.translate(1500, 790);
}
setup();

// getting all the input variabels from user (mass, friction, weight)
var weightSlider = document.getElementById("weight");
var weight = weightSlider.value;
var angleSlider = document.getElementById("angle");
var angle = angleSlider.value;
var frictionSlider = document.getElementById("friction");
var friction = frictionSlider.value;
var sliders = [weightSlider, angleSlider, frictionSlider]

// labels for the inputs 
var weightLabel = document.getElementById("weightLabel");
var angleLabel = document.getElementById("angleLabel");
var frictionLabel = document.getElementById("frictionLabel");
var labels = [weightLabel, angleLabel, frictionLabel]

// changing the values of the sliders in real time 
sliders[0].oninput = function () {
    labels[0].innerHTML = this.value;
}
sliders[1].oninput = function () {
    labels[1].innerHTML = (this.value);
    angle = angleSlider.value;
}
sliders[2].oninput = function () {
    labels[2].innerHTML = (this.value);
}

// drawing the ramp 
const drawRamp = (angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);
    c.moveTo(-750, 0);
    c.lineWidth = 5;
    c.lineTo(0, 0);
    c.stroke();
    c.restore();
}

// drawing the base -- this should stay fixed 
function drawBase() {
    c.save()
    c.beginPath();
    c.rotate(0 * Math.PI / 180);
    c.moveTo(-1000, 0);
    c.lineWidth = 10;
    c.lineTo(0, 0);
    c.stroke();
    c.restore();
}
drawBase();

// the rectangle that will be sliding down the ramp -- starting point is ontop of the ramp 
const rectangle = (posX, posY, angle) => {
    c.save();
    c.beginPath();
    c.rotate(angle * Math.PI / 180);
    c.rect(posX, posY, 80, 50);
    c.stroke();
    c.restore();
}

function animateAngle() {
    c.clearRect(55, 0, -1500, -790); // clear the canvas 
    const currAngle = angle; // grab the current angle on the slider 
    drawRamp(currAngle); // draw the ramp with the respective angle
    rectangle(-750, -52, currAngle); // draw the rectangle 

    requestAnimationFrame(animateAngle); // call the animateframe to display 

}
animateAngle();

var currX = -750; // set the initial X pos of the rectangle 
var currY = -52; // set the initial Y pos of the rectangle

// moving the actual rectangle down the ramp 
function downRamp() {
    c.clearRect(55, 0, -1500, -790); // clear the canvas 
    const currAngle = angle; // grab the current angle
    drawRamp(currAngle); // draw the ramp with the respective angle
    currX = currX + 5; // increment x pos 
    if (currX <= -80) {
        rectangle(currX, currY, currAngle); // redraw the rec 
    }
    else {
        rectangle(-80, -52, currAngle); // when its to the bottom, draw the rect at the bottom
    }

    requestAnimationFrame(downRamp); // call the animateframe to display 


}