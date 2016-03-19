/**
Game class, for game updates and stuff
*/
var Game = function(){
  this.level = null;
}

Game.prototype.draw = function(){
  if(this.level != null){
    Engine.graphics.clear();
    this.level.draw();
  }
}
Game.prototype.update = function(){
  if(this.level != null){
    this.level.update();
  }
}
Game.prototype.setLevel = function(level){
  this.level = level;
}

/**
GameObject class, for game objects
*/
var GameObject = function(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.depth = 0;

  this.networkID = 0;
}

GameObject.prototype.update = function(){
  //do nothing
  this.x += 1;
}

GameObject.prototype.draw = function(graphics){
  //draw the game object
  graphics.setColor("#FF0000");
  graphics.drawRectangle(this.x, this.y, this.width, this.height, true);
}

/**
Level class for storing game objects
*/
var Level = function(){
  this.gameObjects = new Array();
}

Level.prototype.addGameObject = function(object){
  this.gameObjects.push(object);
}

Level.prototype.removeGameObject = function(object){
  this.gameObjects.remove(object);
}

//Draws the level
Level.prototype.draw = function(){
  for(var i = 0; i < this.gameObjects.length; i++){
    this.gameObjects[i].draw(Engine.graphics);
  }
}

//Updates the level
Level.prototype.update = function(){
  //update all game objects
  for(var i = 0; i < this.gameObjects.length; i++){
    this.gameObjects[i].update();
  }
  //depth sort the game objects
  this.gameObjects.sort(function(a, b){
    return a.depth - b.depth;
  });
}
