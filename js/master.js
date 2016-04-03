window.onload = function(){

  //Find the canvas DOM element
  var canvas = document.getElementById('gamecontent');

  //init resources
  Resources.init();

  //init the input with for the canvas
  Input.init(canvas);

  //create the graphics, game and networking
  Engine.graphics = new Graphics(canvas);

  //Setting the viewport
  //Engine.graphics.width = 320;
  //Engine.graphics.height = 180;

  Engine.game = new Game();
  Engine.network = new Network();

  //now create the level and add the player (for now at least, this should happen after handshake probably) TODO
  Engine.game.level = new Level();
  Engine.game.level.addGameObject(new GameObjectPlayer());

  //start the game
  Engine.start();
};
