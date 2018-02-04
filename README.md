# P5ysics

A lightweight game engine for p5js. Please advise this is a work-in-progress project.

## Scenes
The scene allows you to display all the objects of the game
Use Scene.Instanciate() to add new objects


## GameObjects
Each object in the scene is a GameObject. GameObjects are just containers for Components. They always have at least one component : the Transform component.

## Components

Here the list of all the components that can be added to a GameObject :

### Transform (added by default) :
Accessor for position, rotation, scale and parent transform.

### SpriteRenderer :
Set a sprite for the GameObject

### Body :
Apply forces and torques to the GameObject.

### Camera
The Camera component is usually used alone (with Transform) and its gameobject is set to Scene.camera

In the future :
 - Global space for children transform
 - Collider components (Circle, Line, etc.) for collision 

## Changelog

* Now a gameobject can have other gameobjects as children
* Added Camera support
* Bug fixes