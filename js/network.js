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
    var m = JSON.parse(message.data);

    //create object
    if(m.type == 'create'){

    }

    //destroy object
    else if(m.type == 'destroy'){

    }

    //update object
    else if(m.type == 'update'){

    }
  }
}

Network.prototype.login = function (username, password) {
  //login message
  var message = {"type":"login", "username":username,"password":password};
  this.socket.send(JSON.stringify(message));
};
