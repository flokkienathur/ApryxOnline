//Player constructor!
var GameObjectPlayer = function(){
  //Call super class
  GameObject.call(this, 32, 32, 32, 32);

  this.currentAnimation = 0;
  this.currentSprite = 0;

  this.targetX = 0;
  this.targetY = 0;

  this.animations = [

    Resources.animations.playerIdle,
    Resources.animations.playerWalk

  ];
  this.name = "default_player";

  this.xPrevious = 0;
  this.yPrevious = 0;
  this.xDir = 0;
  this.yDir = 0;
};

GameObjectPlayer.ANIMATION_IDLE = 0;
GameObjectPlayer.ANIMATION_WALK = 1;

//Set the prototype to a copy of game object
GameObjectPlayer.prototype = Object.create(GameObject.prototype);

// Set the "constructor" property to refer to GameObjectPlayer
GameObjectPlayer.prototype.constructor = GameObjectPlayer;

GameObjectPlayer.prototype.update = function(){

  //if networkID < 0 we can controll this guy, otherwise its controlled by the network code :D
  if(this.networkID < 0){
    if(Input.down[Input.KEY_SPACE]){
      this.level.viewX = this.x - this.level.viewWidth / 2;
      this.level.viewY = this.y - this.level.viewHeight / 2;
    }

    if(Input.pressed[Input.MOUSE_RIGHT]){
      this.targetX = this.level.mouseX;
      this.targetY = this.level.mouseY;
    }

    this.moveToTarget(1);
  }
  //if its a network object
  else if(this.changed){
    //Do nothing currently

    this.changed = false;
  }

  this.animations[this.currentAnimation].update(0.1);

  this.depth = this.y + 32;

  this.x += this.xDir;
  this.y += this.yDir;

  //Send the update
  if(Engine.network.connected && this.networkID < 0){
    Engine.network.sendUpdate(this);
  }
};

GameObjectPlayer.prototype.moveToTarget = function(speed){

  var xDir = this.targetX - this.x;
  var yDir = this.targetY - this.y;

  var length = Math.sqrt(xDir * xDir + yDir * yDir);

  if(length > 1){
    xDir /= length;
    yDir /= length;

    this.x += xDir * speed;
    this.y += yDir * speed;
  }

};

GameObjectPlayer.prototype.draw = function(graphics){
  //call super
  GameObject.prototype.draw.call(this, graphics);

  var sprite = this.animations[this.currentAnimation].getCurrentSprite();

  //draw the game object
  graphics.setColor(Graphics.WHITE);
  graphics.drawSprite(sprite, this.x, this.y);
};
