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
	this._position = new p5.Vector(0, 0);
    this._rotation = 0.0;
    this._scale = new p5.Vector(1, 1);
}
Transform.prototype = {
	constructor : Transform,
	update : function() {
	},
	get position(){
		return this._position;
	},
	set position(value){
		var i;
		for(i = 0 ; i < this.gameObject.children.length ; i++) {
			var child = this.gameObject.children[i];
			child.transform.position = p5.Vector.sub(child.transform.position,this._position).add(value);
		}
		while(i<this.gameObject.children.length);
		this._position = value;
	},
	get rotation(){
		return this._rotation;
	},
	set rotation(value){
		for(var i = 0 ; i < this.gameObject.children.length ; i++) {
			var child = this.gameObject.children[i];
			child.transform.rotation = child.transform.rotation - this.rotation + value;
		}
		this._rotation = value;
	},
	get scale(){
		return this._scale;
	},
	set scale(value){
		for(var i = 0 ; i < this.gameObject.children.length ; i++) {
			var child = this.gameObject.children[i];
			child.transform.scale = p5.Vector.sub(this.scale).add(value);
		}
		this._scale = value;
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
	this.sprite = undefined;
	this.loadRessource(path);
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
		ellipse(0,
            0,
            100 * this.gameObject.transform.scale.x,
            100 * this.gameObject.transform.scale.y);
        image(this.sprite,
            0,
            0,
            this.sprite.width * this.gameObject.transform.scale.x,
            this.sprite.height * this.gameObject.transform.scale.y);
        pop();
	},
	loadRessource: function(path)
	{
		this.sprite = loadImage(ASSETS_PATH+path) ;
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
}
Camera.prototype = {
    constructor : Camera,
    update : function() {
		if (this.gameObject.parent === undefined) {
			translate(-this.gameObject.transform.position.x,
				-this.gameObject.transform.position.y);
			rotate(-this.gameObject.transform.rotation);
		}
		else {
			translate(-this.gameObject.parent.transform.position.x + width/2,
				-this.gameObject.parent.transform.position.y + height/2);
			rotate(-this.gameObject.parent.transform.rotation);
		}
    }
};


function GameObject() {
	this.id = getUUID();
	this.scene = undefined;
	this._components = [];
	this.transform = this.addComponent(new Transform());
	this._parent = undefined;
    this.children = [];
}

GameObject.prototype = {
    constructor : GameObject,
	update : function() {
		for (var i = 0; i < this._components.length; i++) {
			this._components[i].update();
		}
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].update();
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
//Object.defineProperty(GameObject.prototype,"parent", )

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
