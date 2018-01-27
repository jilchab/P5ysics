
// Create a scene
var scene = new Scene();

// Create a new GameObject
var rect = new GameObject();

// Set position and scale
rect.transform.position = new p5.Vector(50,50);
rect.transform.scale.mult(30);

rect.addComponent(new Rectangle()); // Placeholder (will be replaced by Sprite)

// Create a body to apply physics to the GameObject
var body = new Body();	
body.useGravity = true;	
rect.addComponent(body);

// Add the GameObject in the scene
scene.addGameObject(rect);	


function setup() {
	createCanvas(400,400);
	angleMode(DEGREES);
	rectMode(CENTER); 	//Place holder
}
function draw() {
	background(128);
	scene.update(); 	// Update every GameObject in the scene each frame
}

