
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

// Create a body to apply physics to the GameObject
var body = ball.addComponent(new Body());	
body.useGravity = false;


// Add the GameObject in the scene
scene.addGameObject(ball);	


function setup() {
	createCanvas(WIDTH,HEIGHT);
	angleMode(DEGREES);
	imageMode(CENTER);
}
function draw() {
	translate(0,0);
	rect(20,20,50,50);
	background(128);
	scene.update(); 	// Update every GameObject in the scene each frame
}

