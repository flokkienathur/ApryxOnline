var Input = {
  //keys boolean array
  down:[],
  pressed:[],
  released:[],
  mouse:[],
  mouseX:0,
  mouseY:0,
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

Input.KEY_SPACE = 32;

Input.MOUSE_LEFT = "mouse1";
Input.MOUSE_RIGHT = "mouse3";

//on key down
window.onkeydown = function(e){
  var key = e.keyCode ? e.keyCode : e.which;

  //Prevent autorepeat
  if(!Input.down[key]){
    Input.down[key] = true;
    Input.pressed[key] = true;
  }
  //Adding it to the current text string
  //Also, fix this typing stuff ;p
  Input.text += String.fromCharCode(key);
};

window.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  Input.down[key] = false;
  Input.released[key] = true;
};

window.oncontextmenu = function(e){
  var mb = e.which;

  //TODO
  return false;
};

Input.init = function(element){

  //This was element based, now its window based (so if the cursor is outside the screen, we can still capture stuff)

  window.onmousedown = function(e){
    var mb = e.which;
    var rect = element.getBoundingClientRect();

    Input.down["mouse"+mb] = true;
    Input.pressed["mouse"+mb] = true;

    Input.setMouse(e, element);
    //Consume the event
    return false;
  };

  window.onmouseup = function(e){
    var mb = e.which;
    var rect = element.getBoundingClientRect();

    Input.down["mouse"+mb] = false;
    Input.released["mouse"+mb] = true;

    Input.setMouse(e, element);

    //Consume the event
    return false;
  };
  window.onmousemove = function(e){
    Input.setMouse(e, element);
  };
};

Input.setMouse = function(e, element) {
  var offsetX = 0, offsetY = 0;

  var rect = element.getBoundingClientRect();

  Input.mouseX = (e.pageX - rect.left) / rect.width;
  Input.mouseY = (e.pageY - rect.top) / rect.height;
};
