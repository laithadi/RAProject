var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// --------------------------------------------------
// Starting point of the simulation
// set up timer and other initialization features
// --------------------------------------------------

function init() {
  setInterval(update, 1000/60); // 60 frames per second
}

// --------------------------------------------------
// This method will be ran once per frame to determine
// the position of the block
// --------------------------------------------------

function update() {

};

// --------------------------------------------------
// Generic method to draw an image rotated on its
// midpoint.
// --------------------------------------------------

function drawRotatedImage(ctx, image, x, y, width, height, rotation){

  // Cache calculation for half width and height
  var halfWidth  = width  / 2;
  var halfHeight = height / 2;

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

function draw(ctx, image){
  // If the image is not ready, wait and try again in
  // approx 50 milliseconds
  if (!image.complete){
    setTimeout(function(){
      draw(ctx, image);
    }, 50);
    return;
  }
  drawRotatedImage(ctx, image, 100, 520, 900, 120, angle);
  // Basic image draw
  ctx.drawImage(image, 100, 520, 900, 120);
}

// --------------------------------------------------
// Create / load a new image object
// --------------------------------------------------

// Create a new image object
var image = new Image();

// Set the image source and start loading
image.src = 'assets/big-block.png';

// Attempt to draw the image
draw(ctx, image);