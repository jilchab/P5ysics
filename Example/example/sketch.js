
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
ball.transform.position = new p5.Vector(150,150);
ball.transform.scale.div(2);

// Create a new GameObject
var ball2 = new GameObject();
ball2.addComponent(new SpriteRenderer("ball.png"));
ball2.transform.position = new p5.Vector(100,100);
ball2.transform.scale.div(2);
ball2.transform.parent = ball.transform;

var ball3 = new GameObject();
ball3.addComponent(new SpriteRenderer("ball.png"));
ball3.transform.position = new p5.Vector(100,100);
ball3.transform.parent = ball2.transform;

var origin = new GameObject();
origin.addComponent(new SpriteRenderer("ball.png"));
origin.transform.scale.div(3);

// Create a camera
var cam = new GameObject();
cam.addComponent(new Camera());

// The camera is ball's child
cam.transform.parent = ball2.transform;

// Set the camera to the scene
//scene.camera = cam;

// Add the GameObject in the scene
scene.addGameObject(ball,ball2,ball3,origin);



function setup() {
	createCanvas(WIDTH,HEIGHT);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(30);
}
function draw() {
	background(128);
	//ball.transform.Translate(0,-1);
	//ball.transform.Rotate(1);
	//ball2.transform.Rotate(2);
	scene.update(); 	// Update every GameObject in the scene each frame
	
}

