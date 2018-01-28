
// Create a scene
var scene = new Scene();

// Create a new GameObject
var ball = new GameObject();

// Add a sprite 
ball.addComponent(new SpriteRenderer("ball.png"));

// Set position, rotation and scale
ball.transform.position = new p5.Vector(100,100);
ball.transform.rotation = 45;
ball.transform.scale.div(2);

// Create a body to apply physics to the GameObject
var body = ball.addComponent(new Body());	
body.useGravity = true;
body.addForce(new p5.Vector(4,-5)); 	// The ball is sent in the air 
body.addTorque(-1);						// And slowly rotate

// Add the GameObject in the scene
scene.addGameObject(ball);	


function setup() {
	createCanvas(400,400);
	angleMode(DEGREES);
	imageMode(CENTER);
}
function draw() {
	background(128);
	scene.update(); 	// Update every GameObject in the scene each frame
}

