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

    if(requestAnimationFrame != undefined && !Engine.fallback){
      function callback(){
        Engine.game.update();
        Engine.game.draw();
        requestAnimationFrame(callback);
      }
      callback();
    }else{
      setInterval(function(){
        Engine.game.update();
        Engine.game.draw();
      },16);
    }
  }

}
