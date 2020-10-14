var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// --------------------------------------------------
// Starting point of the simulation
// set up timer and other initialization features
// --------------------------------------------------

function init() {
  setInterval(update, 1000 / 60); // 60 frames per second
}

// --------------------------------------------------
// This method will be ran once per frame to determine
// the position of the block
// --------------------------------------------------

function update() {
  draw(ctx, image);
};

// --------------------------------------------------
// Generic method to draw an image rotated on its
// midpoint.
// --------------------------------------------------

function drawRotatedImage(ctx, image, x, y, width, height, rotation) {

  // Cache calculation for half width and height
  var halfWidth = width;
  var halfHeight = height;

  // Save canvas context state
  ctx.save();

  // Input transformation: translate to midpoint of image
  ctx.translate(x + halfWidth, y + halfHeight);

  // Input transformation: rotate by desired rotation
  ctx.rotate(rotation);

  // Draw the image
  ctx.drawImage(image, -halfWidth, -halfHeight, width, height);

  // Restore previous context state
  ctx.restore();
}

// --------------------------------------------------
// Wrap drawing operation in a method
// --------------------------------------------------

function draw(ctx, image) {
  // If the image is not ready, wait and try again in
  // approx 50 milliseconds
  if (!image.complete) {
    setTimeout(function () {
      draw(ctx, image);
    }, 50);
    return;
  }
  // Basic image draw
  ctx.drawImage(image, 100, 520, 900, 120);
}

// --------------------------------------------------
// Create / load a new image object
// --------------------------------------------------





// // kinda displays the ramp with the updated angle

var angle = document.getElementById("angle-input").value;
var image2 = new Image();
image2.src = 'assets/small-block.png';
drawRotatedImage(ctx, image2, 100, 520, 900, 120, angle);


function positionRamp() {

  var angle = document.getElementById("angle-input").value;

  var image2 = new Image();

  image2.src = 'assets/small-block.png';

  drawRotatedImage(ctx, image2, 100, 520, 900, 120, angle);

  requestAnimationFrame(positionRamp);
}

positionRamp()