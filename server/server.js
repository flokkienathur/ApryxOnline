var WebSocketServer = require('ws').Server;
var ServerPlayer = require('./server_player.js').ServerPlayer;
var wss = new WebSocketServer({port:8080});

var currentID = 0;

var tickrate = 30; //20 ticks per second

//list of players
var players = new Array();

//give it a remove function
players.remove = function(player){
  var index = players.indexOf(player);
  if(index >= 0){
    players.splice(index, 1);
  }
}


function broadcast(message, exclude){
  players.forEach(function(player){
    if(player != exclude){
      try{
        player.socket.send(message);
      }catch(err){
        console.log(err);
      }
    }
  });
}

function update(){
  players.forEach(function(player){
    sendUpdate(player);
  });
}

function sendUpdate(player){
  var message = {
    type:"update",
    id:player.id,
    x:player.x,
    y:player.y
  };

  //broadcast the message, exclude the player
  broadcast(JSON.stringify(message), player);
}

function sendCreate(player){
  var message = {
    type:"create",
    name:player.name,
    id:player.id,
    x:player.x,
    y:player.y
  };

  //broadcast the message, exclude the player
  broadcast(JSON.stringify(message), player);
}

function sendDestroy(player){
  var message = {
    type:"destroy",
    id:player.id
  };

  //broadcast the message, exclude the player
  broadcast(JSON.stringify(message), player);
}

setInterval(update, 1000/tickrate);

//on a new connection
wss.on('connection', function(ws){

  console.log("Client connected!");

  //create the player server object
  var player = new ServerPlayer(ws, currentID++);
  var added = false;

  ws.on('message', function(message){
    var object = JSON.parse(message);

    if(object.type == 'login'){
      player.username = object.username;
      //TODO send him all players that are currently already there
      players.forEach(function(player){
        var message = {
          type:"create",
          name:player.name,
          id:player.id,
          x:player.x,
          y:player.y
        };
        ws.send(JSON.stringify(message));
      });

      players.push(player);
      added = true;

      //send the connect message
      sendCreate(player);
    }
    if(object.type == 'update'){
      player.x = object.x;
      player.y = object.y;
      //do not send update message, the update function will send that
    }
  });

  ws.on('close', function(code, message){
    console.log("Client disconnected!");
    if(added){
      players.remove(player);

      //Send the disconnect message
      sendDestroy(player);
    }
  })

});
