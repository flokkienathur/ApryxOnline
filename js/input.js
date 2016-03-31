var Input = {
  //keys boolean array
  keys:[],
  pressed:[],
  released:[],
  text:"",
};

//Flushes the current frame pressed keys
Input.flush = function(){
  Input.pressed = [];
  Input.released = [];
  Input.text = "";
};

Input.KEY_W = 87;
Input.KEY_S = 83;
Input.KEY_A = 65;
Input.KEY_D = 68;

//on key down
window.onkeydown = function(e){
  var key = e.keyCode ? e.keyCode : e.which;

  //Prevent autorepeat
  if(!Input.keys[key]){
    Input.keys[key] = true;
    Input.pressed[key] = true;
  }
  //Adding it to the current text string
  //Also, fix this typing stuff ;p
  Input.text += String.fromCharCode(key);
};

window.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  Input.keys[key] = false;
  Input.released[key] = true;
};
