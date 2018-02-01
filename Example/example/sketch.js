
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


// Create a new GameObject
var ball2 = new GameObject();
ball2.addComponent(new SpriteRenderer("ball.png"));
ball2.transform.position = new p5.Vector(200,200);
ball2.transform.scale.div(3);

// Create a camera
var cam = new GameObject();
cam.addComponent(new Camera());

// The camera is ball's child
//cam.parent = ball;

// Set the camera to the scene
//scene.camera = cam;

// Add the GameObject in the scene
scene.addGameObject(ball,ball2);

ball2.parent = ball;


function setup() {
	createCanvas(WIDTH,HEIGHT);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(30);
}
function draw() {
	background(128);
	var v = p5.Vector.add(ball.transform.position,new p5.Vector(1,0));
	ball.transform.position = v;
	scene.update(); 	// Update every GameObject in the scene each frame
	
}

