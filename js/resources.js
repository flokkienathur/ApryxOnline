var Resources = {};

Resources.init = function(){

  Resources.sprites = {
    playerIdle : new Sprite("res_img_player").setOffset(16,32),
    playerStep1 : new Sprite("res_img_playerstep1").setOffset(16,32),
    playerStep2 : new Sprite("res_img_playerstep2").setOffset(16,32),

    target : new Sprite("res_img_target").setOffset(2.5,2.5)
  };

  Resources. animations = {
    playerIdle : new Animation().addSprite(Resources.sprites.playerIdle),
    playerWalk : new Animation().addSprite(Resources.sprites.playerStep1).addSprite(Resources.sprites.playerStep2),
  };

};
