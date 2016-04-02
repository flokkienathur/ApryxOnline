/**
 * Game class, for game updates and stuff
*/
var Game = function(){
  this.level = null;
};

/**
 * Draws the game
 */
Game.prototype.draw = function(){
  if(this.level !== null){
    Engine.graphics.clear();
    this.level.draw();
  }
};
/**
 * Update the game
 */
Game.prototype.update = function(){
  if(this.level !== null){
    this.level.update();
  }
};
/**
 * Set the current level for the game
 * @param {Level} level the new level
 */
Game.prototype.setLevel = function(level){
  this.level = level;
};

/**
 * GameObject class, for game objects
*/
var GameObject = function(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.depth = 0;

  this.changed = false;
  this.networkID = -1;
};

/**
 * Update this game object
 */
GameObject.prototype.update = function(){
  //Do nothing right now
};

/**
 * Draw the game object. Defaulty draws border outline
 * @param {Graphics} graphics The graphics object, usually just Engine.graphics.
 */
GameObject.prototype.draw = function(graphics){
  //draw the game object
  graphics.setColor("#FF0000");
  graphics.drawRectangle(this.x, this.y, this.width, this.height, true);
};

/**
 * Level class for storing game objects
*/
var Level = function(){
  this.gameObjects = [];

  var level = this;

  this.gameObjects.remove = function(gameObject){
    var index = level.gameObjects.indexOf(gameObject);
    if(index >= 0){
      level.gameObjects.splice(index, 1);
    }
  };

  this.viewX = 0;
  this.viewY = 0;

  this.tileset = new Sprite("res_img_tileset");
};

/**
 * Adds a gameobject to the level.
 * @param {GameObjectPlayer} object The game object to add
 */
Level.prototype.addGameObject = function(object){
  this.gameObjects.push(object);
};

/**
 * Remove a gameobject to the level.
 * @param {GameObjectPlayer} object The game object to remove
 */
Level.prototype.removeGameObject = function(object){
  this.gameObjects.remove(object);
};

/**
 * Get a gameobject by its networkID.
 * @param {Number} id The networkID
 */
Level.prototype.getGameObjectByNetworkID = function(id){
  for(var i = 0; i < this.gameObjects.length; i++){
    if(this.gameObjects[i].networkID === id){
      return this.gameObjects[i];
    }
  }
  return null;
};

/**
 * Draw the level, with all its game objects
 */
Level.prototype.draw = function(){
  for(var x = 0; x < 10; x++){
    for(var y = 0; y < 10; y++){
      Engine.graphics.drawSprite(this.tileset, x<<5, y<<5);
    }
  }

  for(var i = 0; i < this.gameObjects.length; i++){
    this.gameObjects[i].draw(Engine.graphics);
  }
};

/**
 * Update the level, including all its gameobjects. The update also sorts the game objects by their depth
 */
Level.prototype.update = function(){
  //update all game objects
  for(var i = 0; i < this.gameObjects.length; i++){
    this.gameObjects[i].update();
  }
  //depth sort the game objects
  this.gameObjects.sort(function(a, b){
    return a.depth - b.depth;
  });
};
