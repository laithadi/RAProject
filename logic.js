var object = document.getElementById('block');
var script = require('./script');

script.drawRect;

function moveObjectDownRamp() {

    // set the varibles
    var mass = document.getElementById("mass-input").value;
    var angle = document.getElementById("angle-input").value;
    var uk = document.getElementById("coeeficient-input").value;

    object.style.left = currentPos + "px";

    var g = 9.8; //Acceleration of gravity
    var a = 0; //Acceleration of the block

    a = g * (Math.sin(angle) - uk * Math.cos(angle));

    paraForce = mass * g * Math.sin(angle); // Parallel force acting on the block
    perpForce = mass * g * Math.cos(angle); // Perpendicular force acting on the block

    // if the object is not at the bottom of the ramp, move the object
    if (Math.abs(currentPos) >= 900) {
        // equation for the velocity of the object - to increment the speed
        currentPos += -100;
    }


    // loop this function to show animation
    requestAnimationFrame(moveObjectDownRamp)
}