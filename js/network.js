var Network = function(){
  this.username = "";
  this.loggedIn = false;
  this.connected = false;

  this.socket = new WebSocket("ws://localhost:8080");

  var net = this;

  this.socket.onopen = function(event){
    net.login("username1", "password1");
  }

  this.socket.onmessage = function(message){
    console.log(message.data);
  }
}

Network.prototype.login = function (username, password) {
  var message = {"username":username,"password":password};
  this.socket.send(JSON.stringify(message));
};
