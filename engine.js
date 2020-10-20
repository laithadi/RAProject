var weightSlider = document.getElementById("weight");
var angleSlider = document.getElementById("angle");
var frictionSlider = document.getElementById("friction");
var sliders = [weightSlider, angleSlider, frictionSlider]

var rampAngle = angleSlider.value;
var frictionInput = frictionSlider.value;
var massInput = weightSlider.value;

var weightLabel = document.getElementById("weightLabel");
var angleLabel = document.getElementById("angleLabel");
var frictionLabel = document.getElementById("frictionLabel");
var labels = [weightLabel, angleLabel, frictionLabel]
var boxSpawnX = (90 - rampAngle)/90 * 100;
for (var i = 0; i < sliders.length; i++) {
  labels[i].innerHTML = sliders[i].value;
}

sliders[0].oninput = function () {
  labels[0].innerHTML = (this.value);
  massInput = weightSlider.value;
}
sliders[1].oninput = function () {
  labels[1].innerHTML = (this.value);
  rampAngle = angleSlider.value;
}
sliders[2].oninput = function () {
  labels[2].innerHTML = (this.value);
  frictionInput = frictionSlider.value;
}

// setSlider();
function degrees_to_radians(degrees) {
var pi = Math.PI;
return degrees * (pi / 180);
}

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;
var engine, render, world, runner;
// create engine
function createWorld() {
  engine = Engine.create()
  world = engine.world;

  // create renderer
  render = Render.create({
      element: document.getElementById("engine"),
      engine: engine,
      options: {
          width: window.innerWidth,
          height: window.innerHeight,
          showVelocity: true,
          wireframes: false,
          background: 'rgb(255,255,255)'
      },
  });

  Render.run(render);

  // create runner
  runner = Runner.create();
  Runner.run(runner, engine);
}
createWorld();
function updateRamp() {
  World.clear(world);
  Engine.clear(engine);
  Render.stop(render);
  Runner.stop(runner);
  render.canvas.remove();
  render.canvas = null;
  render.context = null;
  render.textures = {};

  createWorld();
  console.log(rampAngle);
  console.log("friction", frictionInput);
  boxSpawnX = (rampAngle)/90 * 300;
  boxSpawnY = (90-rampAngle)/90 * 290;
  World.add(world, [
      Bodies.rectangle(400, 600, 850, 50,
      {
        isStatic: true
      }),
      Bodies.rectangle(800, 300, 50, 600,
      {
        isStatic: true
      }),
      Bodies.rectangle(300, 350, 750, 20,
      {
          isStatic: true,
          angle: degrees_to_radians(rampAngle),
          //angle: Math.PI / 6,
      }),
      Bodies.rectangle(boxSpawnX, boxSpawnY, 40, 40,
      {
          friction: frictionInput,
          angle: degrees_to_radians(rampAngle),
          //mass: massInput,
      })

  ]);
}

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

