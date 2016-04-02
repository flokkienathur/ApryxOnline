//Player constructor!
var GameObjectPlayer = function(){
  //Call super class
  GameObject.call(this, 0, 0, 32, 32);

  this.currentAnimation = 0;
  this.currentSprite = 0;

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

  if(Input.pressed[Input.MOUSE_RIGHT]){
    console.log("Walk here pls!");
  }

  //if networkID < 0 we can controll this guy, otherwise its controlled by the network code :D
  if(this.networkID < 0){
    this.xDir = 0;
    this.yDir = 0;
    if(Input.down[Input.KEY_W]){
      this.yDir -= 1;
    }
    if(Input.down[Input.KEY_S]){
      this.yDir += 1;
    }
    if(Input.down[Input.KEY_A]){
      this.xDir -= 1;
    }
    if(Input.down[Input.KEY_D]){
      this.xDir += 1;
    }

    var length = Math.sqrt(this.xDir*this.xDir + this.yDir*this.yDir);
    if(length > 0){
      this.xDir /= length;
      this.yDir /= length;
    }
  }
  //if its a network object
  else if(this.changed){
    this.xDir = this.x - this.xPrevious;
    this.yDir = this.y - this.yPrevious;

    var l = Math.sqrt(this.xDir*this.xDir + this.yDir*this.yDir);
    if(l > 0){
      this.xDir /= l;
      this.yDir /= l;
    }

    //save the old x and y (in case of network change)
    this.xPrevious = this.x;
    this.yPrevious = this.y;
    this.changed = false;
  }

  if(this.xDir !== 0 || this.yDir !== 0){
    this.currentAnimation = GameObjectPlayer.ANIMATION_WALK;
  }else{
    this.currentAnimation = GameObjectPlayer.ANIMATION_IDLE;
  }

  this.animations[this.currentAnimation].update(0.1);

  this.depth = this.y + 32;

  this.x += this.xDir;
  this.y += this.yDir;


  if(Engine.network.connected && this.networkID < 0){
    Engine.network.sendUpdate(this);
  }
};

GameObject.prototype.draw = function(graphics){
  //draw the game object
  graphics.setColor(Graphics.WHITE);
  graphics.drawSprite(this.animations[this.currentAnimation].getCurrentSprite(), this.x, this.y);
};
