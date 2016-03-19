var ServerPlayer = function(ws, id){
  this.socket = ws;

  this.username = null;

  //player id
  this.id = id;

  //more info
  this.x = 0;
  this.y = 0;
}

exports.ServerPlayer = ServerPlayer;
