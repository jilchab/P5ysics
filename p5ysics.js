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

var ComponentType =  {
    Transform : 0,
    SpriteRenderer : 1,
    Body : 2,
    Rectangle : 3,
};

function Component(type) {
    this.id = getUUID();
	this.gameObject = undefined;
	this.type = type;
}
Component.prototype = {
    constructor : Component,
    update : function() {
        print("should not go there");
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

function SpriteRenderer () {
    Component.call(this, ComponentType.SpriteRenderer);
    this.sprite = new Image(); // ???
}
SpriteRenderer.prototype = {
    constructor : SpriteRenderer,
    update : function(deltaTime) {
        push();
        translate(this.gameObject.transform.position.x,this.gameObject.transform.position.y);
        image(this.sprite,0,0);
        pop();
    }
};

function Body () {
    Component.call(this, ComponentType.BodyComponent);
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
        this.gameObject.transform.rotation += this.angularVelocity*deltaTime;
    },
    addForce : function(force) {
        this.linearVelocity.add(force);
    },
    addTorque : function(torque){
        this.angularVelocity.add(torque);
    },
};
/*
function Mesh (go) {
    Component.call(go, ComponentType.MeshComponent);
    this.vertices = [];
    this.angle = 0.0;
}
Mesh.prototype = Object.create(Component.prototype);
Mesh.prototype.constructor = Mesh;
Mesh.prototype.update = function(delaTime) {
    stroke(0);
    strokeWeight(1);
    this.draw();
};
Mesh.prototype.setVertices = function(verts) {
    this.vertices = verts;
};
Mesh.prototype.draw = function() {
    for (var i = 0; i < this.vertices.length; i++) {
        if (i > 0) {
            line(this.vertices[i - 1].x, this.vertices[i - 1].y, this.vertices[i].x, this.vertices[i].y);
        } else {
            line(this.vertices[this.vertices.length - 1].x, this.vertices[this.vertices.length - 1].y, this.vertices[i].x, this.vertices[i].y);
        }
    }
};
Mesh.prototype.position = function(dir) {
    var deltaPosition = Vector2.delta(dir, this.centroid);
    for (var i = 0; i < this.vertices.length; i++) {
        this.vertices[i].add(deltaPosition);
    }
};
Mesh.prototype.rotation = function(a) {
    var deltaAngle = a - this.angle;
    var center = new Vector2(this.centroid.x, this.centroid.y);
    for (var i = 0; i < this.vertices.length; i++) {
        var vLocal = Vector2.delta(this.vertices[i], center);
        var rLocal = vLocal.magnitude;
        var aLocal = Math.acos(vLocal.x / rLocal);
        if (vLocal.y < 0) {
            aLocal = -aLocal;
        }

        this.vertices[i].x = rLocal * Math.cos(aLocal + deltaAngle * Math.PI / 180) + center.x;
        this.vertices[i].y = rLocal * Math.sin(aLocal + deltaAngle * Math.PI / 180) + center.y;
    }
    this.angle = a;
};
Mesh.prototype.getCentroid = function() {
    var A = 0;
    var Cx = 0;
    var Cy = 0;
    var n;
    for (var i = 0; i < this.vertices.length - 1; i++) {
        n = this.vertices[i].x * this.vertices[i + 1].y - this.vertices[i + 1].x * this.vertices[i].y;
        A += n;
        Cx += (this.vertices[i].x + this.vertices[i + 1].x) * n;
        Cy += (this.vertices[i].y + this.vertices[i + 1].y) * n;
    }
    n = this.vertices[this.vertices.length - 1].x * this.vertices[0].y - this.vertices[0].x * this.vertices[this.vertices.length - 1].y;
    A += n;
    Cx += (this.vertices[this.vertices.length - 1].x + this.vertices[0].x) * n;
    Cy += (this.vertices[this.vertices.length - 1].y + this.vertices[0].y) * n;

    A /= 2;
    Cx /= 6 * A;
    Cy /= 6 * A;
    return new Vector2(Cx, Cy);
}; */

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
			this._gameObjects[i].update(deltaTime());
		}
	},
	addGameObject : function(go) {
		go.scene = this;
		this._gameObjects.push(go);
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
