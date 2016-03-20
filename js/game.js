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

  this.changed = false;
  this.networkID = -1;
}

GameObject.prototype.update = function(){
  //Do nothing right now
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

  var level = this;

  this.gameObjects.remove = function(gameObject){
    var index = level.gameObjects.indexOf(gameObject);
    if(index >= 0){
      level.gameObjects.splice(index, 1);
    }
  }

  this.viewX = 0;
  this.viewY = 0;

  this.tileset = new Sprite("res_img_tileset");
}

Level.prototype.addGameObject = function(object){
  this.gameObjects.push(object);
}

Level.prototype.removeGameObject = function(object){
  this.gameObjects.remove(object);
}

Level.prototype.getGameObjectByNetworkID = function(id){
  for(var i = 0; i < this.gameObjects.length; i++){
    if(this.gameObjects[i].networkID == id){
      return this.gameObjects[i];
    }
  }
  return null;
}

//Draws the level
Level.prototype.draw = function(){
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      Engine.graphics.drawSprite(this.tileset, x<<5, y<<5);
    }
  }

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
