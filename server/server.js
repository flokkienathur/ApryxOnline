var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port:8080});

var tickrate = 20; //20 ticks per second


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

//on a new connection
wss.on('connection', function(ws){

  console.log("Client connected!");

  ws.on('message', function(message){
    console.log("received : %s", message);
  });

  ws.on('close', function(code, message){
    console.log("Client disconnected!")
  })

});
