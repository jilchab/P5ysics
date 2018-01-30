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
        console.log("should not go there");
    },
};

function Transform() {
	Component.call(this,ComponentType.Transform);
	this.position = new p5.Vector(0, 0);
    this.rotation = 0.0;
    this.scale = new p5.Vector(1, 1);
}
Transform.prototype = {
	constructor : Transform,
	update : function() {
	}
};

function Rectangle() {
	Component.call(this,ComponentType.Rectangle);
	this.sprite = 0;
}
Rectangle.prototype = {
	constructor : Rectangle,
	display : function() {
		push();
		translate(this.gameObject.transform.position.x,this.gameObject.transform.position.y);
		rotate(this.gameObject.transform.rotation);
		rect(0, 0, this.gameObject.transform.scale.x, this.gameObject.transform.scale.y);
		pop();
	},
	update : function() {
		this.display();
	}
};

function SpriteRenderer (path) {
    Component.call(this, ComponentType.SpriteRenderer);
    new p5();
    this.sprite = loadImage(ASSETS_PATH+path) ;
}
SpriteRenderer.prototype = {
    constructor : SpriteRenderer,
    update : function() {
        this.display();
    },
    display :  function() {
        push();
        translate(this.gameObject.transform.position.x,this.gameObject.transform.position.y);
        rotate(this.gameObject.transform.rotation);
        image(this.sprite,
            0,
            0,
            this.sprite.width * this.gameObject.transform.scale.x,
            this.sprite.height * this.gameObject.transform.scale.y);
        pop();
    },

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
        this.gameObject.transform.position.add(this.linearVelocity);
        this.gameObject.transform.rotation += this.angularVelocity;
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
    this.currentPosition = new p5.Vector(WIDTH/2,HEIGHT/2);
    this.currentRotation = 0;
    this.currentScale = new p5.Vector(0,0);
}
Camera.prototype = {
    constructor : Camera,
    update : function() {
        translate(this.gameObject.transform.position.x - width/2 - this.currentPosition.x,
            this.gameObject.transform.position.y - height/2 - this.currentPosition.y);
        rotate(this.gameObject.transform.rotation - this.currentRotation);
        scale(this.gameObject.transform.scale.x - this.currentScale.x,
             this.gameObject.transform.scale.y - this.currentScale.y);
        this.currentPosition = this.gameObject.transform.position.copy();
        this.currentPosition.add(width/2,height/2);
        this.currentRotation = this.gameObject.transform.rotation;
        this.currentScale = this.gameObject.transform.scale;
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
	},
	addComponent : function(component) {
		component.gameObject = this;
		this._components.push(component);
		return component;
	},
	deleteComponent : function(component) {
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
		this._components.splice(i,1);
		return true;
	}
};


function Scene()
{
	this._gameObjects = [];
	this.gravity = GRAVITY;
}
Scene.prototype = {
	update : function() {
		for (var i = 0; i < this._gameObjects.length; i++) {
			this._gameObjects[i].update();
		}
	},
	addGameObject : function(go) {
		go.scene = this;
        this._gameObjects.push(go);
        return go;
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
