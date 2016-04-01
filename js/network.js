var Network = function(){
  this.username = "";
  this.loggedIn = false;
  this.connected = false;

  this.socket = new WebSocket("ws://localhost:8080");

  var net = this;

  this.socket.onopen = function(event){
    net.login("username1", "password1");
    net.connected = true;
  };

  this.socket.onclose = function(event){
    net.connected = false;
  };

  this.socket.onmessage = function(message){
    var m = JSON.parse(message.data);
    var g;

    //create object
    if(m.type == 'create'){
      g = new GameObjectPlayer();
      g.name = m.name;
      g.networkID = m.id;
      g.x = m.x;
      g.y = m.y;
      Engine.game.level.addGameObject(g);
    }

    //destroy object
    else if(m.type == 'destroy'){
      g = Engine.game.level.getGameObjectByNetworkID(m.id);
      Engine.game.level.removeGameObject(g);
    }

    //update object
    else if(m.type == 'update'){
      g = Engine.game.level.getGameObjectByNetworkID(m.id);
      g.x = m.x;
      g.y = m.y;
      g.changed = true;
    }
  };
};

Network.prototype.login = function (username, password) {
  //login message
  var message = {"type":"login", "username":username,"password":password};
  this.socket.send(JSON.stringify(message));
};

Network.prototype.sendUpdate = function(gameObject){
  var message = {
    type:'update',
    x:gameObject.x,
    y:gameObject.y
  };

  this.socket.send(JSON.stringify(message));
};
