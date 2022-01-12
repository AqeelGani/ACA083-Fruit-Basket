const Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

var engine = Engine.create(),
  world = engine.world;


var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1550,
    height: 800,
    wireframes: false,
    background: "#B5EAEA",
  },
});

Render.run(render);


var runner = Runner.create();
Runner.run(runner, engine);

// create stacks

var orangeStack = Composites.stack(400, 0, 15, 4, 0, 0, function (x, y) {
  return Bodies.polygon(x, y, 4, 30, {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      sprite: {
        texture: 'images/orange.png',
        xScale: 0.12,
        yScale: 0.12

      }
    }
  });
});
var pineappleStack = Composites.stack(400, 0, 15, 4, 0, 0, function (x, y) {
  return Bodies.polygon(x, y, 4, 30, {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      sprite: {
        texture: 'images/pineapple.png',
        xScale: 0.15,
        yScale: 0.15

      }
    }
  });
});
var strawberryStack = Composites.stack(400, 0, 15, 4, 0, 0, function (x, y) {
  return Bodies.polygon(x, y, 4, 30, {
    friction: 0.00001,
    restitution: 0.5,
    density: 0.001,
    render: {
      sprite: {
        texture: 'images/strawberry.png',
        xScale: 0.12,
        yScale: 0.12

      }
    }
  });
});

//   Create first container 

var orangeBottomWall = Bodies.rectangle(200, 500, 300, 20, { isStatic: true });
var orangeLeftWall = Bodies.rectangle(50, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });
var orangeRightWall = Bodies.rectangle(350, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });

// Create second container

var pineappleBottomWall = Bodies.rectangle(750, 500, 300, 20, { isStatic: true });
var pineappleLeftWall = Bodies.rectangle(600, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });
var pineappleRightWall = Bodies.rectangle(900, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });

//   Create third container

var strawberryBottomWall = Bodies.rectangle(1300, 500, 300, 20, { isStatic: true });
var strawberryLeftWall = Bodies.rectangle(1150, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });
var strawberryRightWall = Bodies.rectangle(1450, 360, 300, 20, { isStatic: true, angle: Math.PI / 2 });

// add bodies to world
Composite.add(world, [orangeBottomWall, orangeLeftWall, orangeRightWall, pineappleBottomWall, pineappleLeftWall, pineappleRightWall, strawberryBottomWall, strawberryLeftWall, strawberryRightWall, orangeStack, pineappleStack, strawberryStack]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
