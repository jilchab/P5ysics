
// Create a scene
var scene = new Scene();

// Create a new GameObject
var ball = new GameObject();

// Add a sprite 
ball.addComponent(new SpriteRenderer("ball.png"));

// Set position, rotation and scale
ball.transform.position = new p5.Vector(10,10);
ball.transform.rotation = 45;
ball.transform.scale.div(2);

// Add a CircleCollider to the ball
var cc = ball.addComponent(new CircleCollider());
cc.size = new p5.Vector(100,100);

// Add a script to the ball
var ballController = ball.addComponent(new Script());

// This function is called one time, when the GameObject is instancied to the scene
ballController.Start = function() {
	this.gameObject.transform.position = new p5.Vector(10,10);
};

// This function is called each frame
ballController.Update = function() {
	this.gameObject.transform.Translate(1,0);	// Translate 1 pixel to left each frame
};

ballController.OnTriggerStay = function() {
	this.gameObject.transform.Rotate(10);
}

// Create a second GameObject
var ball2 = new GameObject();
ball2.addComponent(new SpriteRenderer("ball.png"));

// This means that its transform is relative to its parent's one
ball2.transform.position = new p5.Vector(100,0);
ball2.transform.scale.div(2);

var cc2 = ball2.addComponent(new CircleCollider());
cc2.size = new p5.Vector(100,100);

// Create a third ball
var ball3 = new GameObject();
ball3.addComponent(new SpriteRenderer("ball.png"));
ball3.transform.position = new p5.Vector(200,200);

// Create a camera
var cam = new GameObject();
cam.addComponent(new Camera());

// Set the scene camera
scene.camera = cam;

// Add cam a script to follow ball2
var camController = cam.addComponent(new Script());

camController.Update = function() {
	this.gameObject.transform.position = ball2.transform.toWorldSpace.position;
};

// Instanciate the gameobjects in the scene
scene.Instanciate(ball,ball2,ball3);

function setup() {
	createCanvas(WIDTH,HEIGHT);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(60);
}
function draw() {
	background(128);
	scene.update(); 	// Update every GameObject in the scene each frame
}

