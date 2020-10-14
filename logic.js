function logic() {

    // set the varibles
    var mass = document.getElementById("mass-input").value;
    var angle = document.getElementById("angle-input").value;
    var coefficient = document.getElementById("coeeficient-input").value;

    var g = 9.8; //Acceleration of gravity
    var uk = 0.08; //Coefficient of kinetic friction (It's a value the user will have to enter)

    var a = 0; //Acceleration of the block

    a = g * (Math.sin(angle) - uk * Math.cos(angle));

    paraForce = mass * g * Math.sin(angle); // Parallel force acting on the block
    perpForce = mass * g * Math.cos(angle); // Perpendicular force acting on the block
    // the position of inlcine at the BOTTOM
    // the position of inlcine at the TOP
    // mass
    // angle of incline
    // coefficient of friction
    // starting position of object

    // if the object is not at the bottom of the ramp, move the object
    if (true) {
        // equation for the velocity of the object - to increment the speed
    }


    // loop this function to show animation
    requestAnimationFrame(logic)
}