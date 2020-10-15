var object = document.getElementById('block');
var script = require('./script');

var coordinates = script.drawRect;

function moveObjectDownRamp() {

    // set the varibles
    var mass = document.getElementById("mass").value;
    var angle = document.getElementById("angle").value;
    var uk = document.getElementById("friction").value;

    object.style.left = currentPos + "px";

    var g = 9.8; //Acceleration of gravity
    var a = 0; //Acceleration of the block

    a = g * (Math.sin(angle) - uk * Math.cos(angle));

    Fg = mass * g * Math.sin(angle); // Parallel force acting on the block
    perpForce = mass * g * Math.cos(angle); // Perpendicular force acting on the block

    // if the object is not at the bottom of the ramp, move the object
    if (Math.abs(currentPos) >= 900) {
        // equation for the velocity of the object - to increment the speed
        currentPos += -100;
    }


    // loop this function to show animation
    requestAnimationFrame(moveObjectDownRamp)
}
