window.onload = function(){

  var canvas = document.getElementById('gamecontent');
  canvas.width = 320;
  canvas.height = canvas.width * 9 / 16;


  Engine.graphics = new Graphics(canvas);
  Engine.game = new Game();
  Engine.network = new Network();

  Engine.game.level = new Level();
  Engine.game.level.addGameObject(new GameObject(2,2,16,16));

  Engine.start();
}
