/**
 * The graphics class, Engine makes an instance of this object.
 * @param {Element} canvas The canvas element
*/
var Graphics = function(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.context.imageSmoothingEnabled = false;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
};

Graphics.RED =    "#FF0000";
Graphics.BLUE=    "#0000FF";
Graphics.GREEN =  "#00FF00";
Graphics.YELLOW =  "#FFFF00";
Graphics.WHITE =    "#FFFFFF";
Graphics.BLACK =    "#000000";

/**
 * Clears the graphics for the screen.
*/
Graphics.prototype.clear = function(){
  this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
};

/**
 * Sets the font for the Graphics
 * @param {String} font The font string (ex. "Consolas")
*/
Graphics.prototype.setFont = function(font){
  this.context=font = font;
};

/**
 * Sets the text alignment.
 * Options are : center, right, left
 * @param {String} textAlign alignment
*/
Graphics.prototype.setTextAlign = function(textAlign){
  this.context.textAlign = textAlign;
};

Graphics.prototype.setLineWidth = function(width){
  this.context.lineWidth = width;
};

Graphics.prototype.setColor = function(color){
  this.context.fillStyle = color;
};

Graphics.prototype.setLineColor = function(color){
  this.context.strokeStyle = color;
};

Graphics.prototype.drawRectangle = function(x,y,width,height,fill){
  if(fill){
    this.context.fillRect(x,y,width,height);
  }else {
    this.context.strokeRect(x,y,width,height);
  }
};

Graphics.prototype.drawSprite = function(sprite,x,y, width, height){
  if(width === undefined){
    width = sprite.width;
  }
  if(height === undefined){
    height = sprite.height;
  }

  this.context.drawImage(sprite.raw,x - sprite.xOffset,y - sprite.yOffset, width, height);
};


/**
 * Sprite class for sprites and stuffs
 * @param {String} resource The image html id
*/
var Sprite = function(resource){
  this.raw = document.getElementById(resource);
  this.width = this.raw.width;
  this.height = this.raw.height;
  this.xOffset = 0;
  this.yOffset = 0;
};

/**
 * Sets the offset of the sprite and returns the sprite object
 * @param {Number} x  the X offset (in pixels)
 * @param {Number} y  the Y offset (in pixels)
 * @return {Sprite}   The current sprite with the new offset (useful for chaining)
*/
Sprite.prototype.setOffset = function(x, y){
  this.xOffset = x;
  this.yOffset = y;

  return this;
};




/**
 * Animation class for animation
*/
var Animation = function(){
  //Empty constructor for now
  this.currentFrame = 0;
  this.sprites = [];
};


/**
 * Adds a sprite to this animation (as a frame).
 * @param {Sprite} sprite The sprite to add to this animation
 * @return {Animation} the current animation with the new sprite, for chaining
*/
Animation.prototype.addSprite = function(sprite){
  this.sprites.push(sprite);
  return this;
};

/**
 * Adds a sprite to this animation (as a frame).
 * @param {Number} the speed to update this animation with. 1 = next sprite immidiatly
 * @return {Animation} the current animation with the new sprite, for chaining
*/
Animation.prototype.update = function(speed){
  this.currentFrame += speed;
  if(this.currentFrame >= this.sprites.length){
    this.currentFrame = 0;
  }

  return this;
};

/**
 * Returns the current sprite for drawing
 * @returns {Sprite} The current sprite
*/
Animation.prototype.getCurrentSprite = function(){
  return this.sprites[Math.floor(this.currentFrame)];
};
