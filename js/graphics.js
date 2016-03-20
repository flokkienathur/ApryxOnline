var Graphics = function(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.context.imageSmoothingEnabled = false;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
}

Graphics.RED =    "#FF0000";
Graphics.BLUE=    "#0000FF";
Graphics.GREEN =  "#00FF00";
Graphics.YELLOW =  "#FFFF00";
Graphics.WHITE =    "#FFFFFF";
Graphics.BLACK =    "#000000";

Graphics.prototype.clear = function(){
  this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
}

Graphics.prototype.setFont = function(font){
  this.context=font = font;
}

Graphics.prototype.setTextAlign = function(textAlign){
  this.context.textAlign = textAlign;
}

Graphics.prototype.setLineWidth = function(width){
  this.context.lineWidth = width;
}

Graphics.prototype.setColor = function(color){
  this.context.fillStyle = color;
}

Graphics.prototype.setLineColor = function(color){
  this.context.strokeStyle = color;
}

Graphics.prototype.drawRectangle = function(x,y,width,height,fill){
  if(fill){
    this.context.fillRect(x,y,width,height);
  }else {
    this.context.strokeRect(x,y,width,height);
  }
}

Graphics.prototype.drawSprite = function(sprite,x,y, width, height){
  if(width == undefined){
    width = sprite.width;
  }
  if(height == undefined){
    height = sprite.height;
  }

  this.context.drawImage(sprite.raw,x,y,width,height);
}

/**
Sprite class for sprites and stuffs
*/
var Sprite = function(resource){
  this.raw = document.getElementById(resource);
  this.width = this.raw.width;
  this.height = this.raw.height;
}

/**
Animation class for animation
*/
var Animation = function(){
  this.currentFrame = 0;
  this.sprites = new Array();
}

Animation.prototype.addSprite = function(sprite){
  this.sprites.push(sprite);
  return this;
}

Animation.prototype.update = function(speed){
  this.currentFrame += speed;
  if(this.currentFrame >= this.sprites.length){
    this.currentFrame = 0;
  }
}

Animation.prototype.getCurrentSprite = function(){
  return this.sprites[Math.floor(this.currentFrame)];
}
