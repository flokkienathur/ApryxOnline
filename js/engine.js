/*
Engine class for everything related to engine stuff.
*/

/**
Engine constructor
*/
var Engine = {

  /**
  Engine properties
  */
  game:null,
  graphics:null,
  network:null,
  fallback:false,

  fps:60,
  ups:60,

  time:0,
  previousTime:0,
  elapsed:0,
  elapsedSecond:0,
  frames:0,
  updates:0,

  /**
  Starts a game instance
  */
  start:function(){

    if(Engine.game == null){
        throw "Game is null";
    }
    if(Engine.graphics == null){
      throw "Graphics is null";
    }

    time = Date.now();
    previousTime = time;

    if(requestAnimationFrame != undefined && !Engine.fallback){
      function callback(){
        Engine.update();
        requestAnimationFrame(callback);
      }
      callback();
    }else{
      setInterval(function(){
        Engine.update();
      },16.66666666);
    }
  },

  update:function(){
    //calculate delta time
    time = Date.now();
    var d = (time - previousTime);
    previousTime = time;

    Engine.elapsed += d;
    Engine.elapsedSecond += d;

    //Update every 16.666667
    while(Engine.elapsed > 16.66666667){
      Engine.updates++;
      Engine.game.update();
      Engine.elapsed -= 16.66666667;
    }

    //update fps every second
    if(Engine.elapsedSecond > 1000){
      Engine.elapsedSecond -= 1000;
      Engine.fps = Engine.frames;
      Engine.frames = 0;
      Engine.ups = Engine.updates;
      Engine.updates = 0;

      console.log(Engine.fps + ", " + Engine.ups);
    }

    Engine.frames++;
    Engine.game.draw();
  }

}
