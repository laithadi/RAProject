const physicsWorld = () => {
    var weightSlider = document.getElementById("weight");
    var angleSlider = document.getElementById("angle");
    var rampAngle = angleSlider.value;
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
    rampAngle = angleSlider.value;
    console.log(this.value)
    updateRamp();
    }
    sliders[2].oninput = function () {
    labels[2].innerHTML = (this.value);
    }
    // }

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

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
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
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
        // walls
        //Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        //Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    World.add(world, [
        Bodies.rectangle(0, 200, 1200, 20,
        {
            isStatic: true,
            angle: degrees_to_radians(rampAngle),
            //angle: Math.PI / 6,
        }),
        Bodies.rectangle(0, 0, 40, 40,
            {
                friction: 0.1,
                angle: degrees_to_radians(rampAngle),
            })
    ]);

    // World.add(world, [
    //     Bodies.rectangle(300, 350, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    //     Bodies.rectangle(300, 250, 40, 40, { friction: 0.0005 })
    // ]);

    // World.add(world, [
    //     Bodies.rectangle(300, 520, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }),
    //     Bodies.rectangle(300, 430, 40, 40, { friction: 0 })
    // ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });
}

physicsWorld();


