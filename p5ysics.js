/**
 * Name : P5YSICS - A lightweight game engine for p5 
 * Author : Jil Chabaro
 * 
 */

function getUUID() {
    return parseInt(Math.ceil(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER)));
}

function deltaTime() {
    return float(1.0/float(frameRate()));
}

var GRAVITY = new p5.Vector(0,0.3);
var ASSETS_PATH = "/Example/example/assets/";
var WIDTH = 400;
var HEIGHT = 400;

var ComponentType =  {
    Transform : 0,
    SpriteRenderer : 1,
    Body : 2,
    Camera : 3,
};

function Component(type) {
    this.id = getUUID();
	this.gameObject = undefined;
	this.type = type;
}
Component.prototype = {
    constructor : Component,
    update : function() {
    },
};

function Transform() {
	Component.call(this,ComponentType.Transform);
	this._position = new p5.Vector(0, 0);
    this._rotation = 0.0;
	this._scale = new p5.Vector(1, 1);
	this._parent = undefined;
	this.children = [];
}
Transform.prototype = {
	constructor : Transform,
	update : function() {
	},
	Translate: function(vectorX, Y) {
		if(arguments.length === 1) {
			this.position = new p5.Vector.add(this.position,vectorX);
		} else {
			this.position = new p5.Vector(this.position.x + vectorX, this.position.y + Y);
		}
	},
	Rotate: function(angle) {
		this.rotation += angle;
	},
	get position(){
		return this._position;
	},
	set position(value){
		this._position = value;
	},
	get rotation(){
		return this._rotation;
	},
	set rotation(value){
		this._rotation = value;
	},
	get scale(){
		return this._scale;
	},
	set scale(value){
		this._scale = value;
	},
	addChild : function(child) {
		this.children.push(child);
		return child;
	},
	removeChild : function(child) {
		var i = this.children.findIndex(function(c) {
			return c == child;
		});
		
		if(i < 0)
		{
			return false;
		}
		this.children.splice(i,1);
		return true;
	},
    get parent() {
        return this._parent;
    },
    set parent(newParent) {
        if(this._parent != undefined) {
            this._parent.removeChild(this);
        }
        this._parent = newParent;
        newParent.addChild(this);
	}
};

function Rectangle() {
	Component.call(this,ComponentType.Rectangle);
	this.sprite = 0;
}
Rectangle.prototype = {
	constructor : Rectangle,
	display : function() {
		if(this.gameObject.transform.parent === undefined) {
			push();
			translate(this.gameObject.transform.position.x,this.gameObject.transform.position.y);
			rotate(this.gameObject.transform.rotation);
			rect(0, 0, this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);
			pop();
		} else {
			push();
			rotate(this.gameObject.transform.rotation + this.gameObject.transform.rotation);
			translate(this.gameObject.transform.position.x,this.gameObject.transform.position.y);
			rect(0, 0, this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);
			pop();
		}
	},
	update : function() {
		this.display();
	}
};

function SpriteRenderer (path) {
	Component.call(this, ComponentType.SpriteRenderer);
	this.sprite = undefined;
	this.setImage(ASSETS_PATH + path);
}
SpriteRenderer.prototype = {
    constructor : SpriteRenderer,
    update : function() {
        this.display();
    },
    display :  function() {
		var t = this.gameObject.transform;
		if(t.parent === undefined) {
			push();
			translate(t.position.x,t.position.y);
			rotate(-t.rotation);
			ellipse(
				0,
				0,
				100 * t.scale.x,
				100 * t.scale.y);
			image(
				this.sprite,
				0,
				0,
				this.sprite.width * t.scale.x,
				this.sprite.height * t.scale.y);
			pop();
		}
		else
		{
			push();
			translate(
				t.parent.position.x,
				t.parent.position.y);
			rotate(-t.parent.rotation);
			translate(
				t.position.x,
				t.position.y );
			rotate(-t.rotation);
			
			ellipse(
				0,
				0,
				100 * t.scale.x * t.parent.scale.x,
				100 * t.scale.y * t.parent.scale.y);
			image(
				this.sprite,
				0,
				0,
				this.sprite.width * t.scale.x * t.parent.scale.x,
				this.sprite.height * t.scale.y * t.parent.scale.y);
			pop();
		}
	},
	setImage: function(path)
	{

		var img = new Image();
		var pImg = new p5.Image(1, 1, this);
		
		img.onload = function() {
			pImg.width = pImg.canvas.width = img.width;
			pImg.height = pImg.canvas.height = img.height;
		
			// Draw the image into the backing canvas of the p5.Image
			pImg.drawingContext.drawImage(img, 0, 0);
			pImg.modified = true;
		
		};
		img.src = path;

		this.sprite =  pImg;
	}
};

function Body () {
	Component.call(this, ComponentType.Body);
    this.linearVelocity = new p5.Vector(0,0);
    this.angularVelocity = 0.0;
    this.isKinematic = false;
    this.useGravity = true;
}
Body.prototype =  {
    constructor : Body,
    update : function() {
        if(this.useGravity) {
            this.addForce(this.gameObject.scene.gravity);
        }
        //this.gameObject.transform.position.add(this.linearVelocity);
        //this.gameObject.transform.rotation += this.angularVelocity;
    },
    addForce : function(force) {
        this.linearVelocity.add(force);
    },
    addTorque : function(torque){
        this.angularVelocity += torque;
    },
};

function Camera () {
    Component.call(this, ComponentType.Camera);
}
Camera.prototype = {
    constructor : Camera,
    update : function() {
		if (this.gameObject.transform.parent === undefined) {
			translate(
				this.gameObject.transform.position.x,
				this.gameObject.transform.position.y);
			rotate(-this.gameObject.transform.rotation);
		} else {
			translate(
				-this.gameObject.transform.parent.position.x,
				-this.gameObject.transform.parent.position.y);
			rotate(-this.gameObject.transform.parent.rotation);
		}
    }
};


function GameObject() {
	this.id = getUUID();
	this.scene = undefined;
	this._components = [];
	this.transform = this.addComponent(new Transform());
}

GameObject.prototype = {
    constructor : GameObject,
	update : function() {
		for (var i = 0; i < this._components.length; i++) {
			this._components[i].update();
		}
		for (i = 0; i < this.transform.children.length; i++) {
			this.transform.children[i].update();
		}
	},
	addComponent : function(component) {
		component.gameObject = this;
		this._components.push(component);
		return component;
	},
	removeComponent : function(component) {
		var i = this._components.findIndex(function(c) {
			return c.id == component.id;
		});
		
		if(i < 0)
		{
			return false;
		}
		this._components.splice(i,1);
		return true;
	},
	getComponent : function(type) {
		var i = this._components.findIndex(function(c) {
			return c.id == component.id;
		});
		
		if(i < 0)
		{
			return false;
		}
		return this_component[i];
    }
};

function Scene()
{
	this._gameObjects = [];
	this.gravity = GRAVITY;
	this.camera = undefined;
}
Scene.prototype = {
	update : function() {
		if(this.camera != undefined) {
			this.camera.update();
		}
		for (var i = 0; i < this._gameObjects.length; i++) {
			this._gameObjects[i].update();
		}
	},
	addGameObject : function() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].scene = this;
            this._gameObjects.push(arguments[i]);
        }
	},
	deleteGameObject : function(go) {
		var i = this._gameObjects.findIndex(function(g) {
			return g.id == go.id;
		});
		
		if(i < 0)
		{
			return false;
		}
		this._gameObjects.splice(i,1);
		return true;
	}
};
