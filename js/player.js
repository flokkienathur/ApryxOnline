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
    this.moveCamera(4);

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

GameObjectPlayer.prototype.moveCamera = function(speed){

  //prevent shittonnes of lookups
  var mx = this.level.mouseX, my = this.level.mouseY, vx = this.level.viewX, vy = this.level.viewY, vw = this.level.viewWidth, vh = this.level.viewHeight;

  //Move with the player
  if(Input.down[Input.KEY_SPACE]){
    vx = this.x - this.level.viewWidth / 2;
    vy = this.y - this.level.viewHeight / 2;
  }

  //Move with the mouse X stuff
  else{

    //if the mouse is to the left of the screen
    if(mx - vx < 16){
      vx -= speed;
    }
    //if the mouse is to the right of the screen
    if(mx - vx > vw - 16){
      vx += speed;
    }

    //if the mouse is above
    if(my - vy < 16){
      vy -= speed;
    }

    //if the mouse is below the screen
    if(my - vy > vh - 16){
      vy += speed;
    }

  }

  //lock
  if(vx < 0){
    vx = 0;
  }
  if(vy < 0){
    vy = 0;
  }
  //TODO add level size
  if(vx + vw > this.level.width){
    vx = this.level.width - vw;
  }
  if(vy + vh > this.level.height){
    vy = this.level.height - vh;
  }

  this.level.viewX = vx;
  this.level.viewY = vy;
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

  if(this.networkID < 0){
    graphics.drawSprite(Resources.sprites.target, this.targetX, this.targetY);
  }

  var sprite = this.animations[this.currentAnimation].getCurrentSprite();

  //draw the game object
  graphics.setColor(Graphics.WHITE);
  graphics.drawSprite(sprite, this.x, this.y);
};
