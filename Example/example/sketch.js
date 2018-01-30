
// Create a scene
var scene = new Scene();

var cam = new GameObject();
cam.addComponent(new Camera());
//scene.addGameObject(cam);


// Create a new GameObject
var ball = new GameObject();

// Add a sprite 
ball.addComponent(new SpriteRenderer("ball.png"));

// Set position, rotation and scale
ball.transform.position = new p5.Vector(100,100);
ball.transform.rotation = 45;
ball.transform.scale.div(2);

// Create a new GameObject
var ball2 = new GameObject();

// Add a sprite 
ball2.addComponent(new SpriteRenderer("ball.png"));

// Set position, rotation and scale
ball2.transform.position = new p5.Vector(200,200);
ball2.transform.scale.div(3);

// Create a body to apply physics to the GameObject
var body = ball.addComponent(new Body());	
body.useGravity = false;

var cam = new GameObject();
cam.addComponent(new Camera());
//cam.parent = ball;

// Add the GameObject in the scene
scene.addGameObject(ball);	
scene.addGameObject(ball2);
scene.addGameObject(cam);

function setup() {
	createCanvas(WIDTH,HEIGHT);
	angleMode(DEGREES);
	imageMode(CENTER);
}
function draw() {
	background(128);
	ball.transform.position.x += 1;
	cam.transform.position.x +=1;
	scene.update(); 	// Update every GameObject in the scene each frame
}

