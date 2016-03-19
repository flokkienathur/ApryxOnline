var Input = {
  //keys boolean array
  keys:new Array(),

}

//Flushes the current frame pressed keys
Input.flush = function(){

}

Input.KEY_W = 87;
Input.KEY_S = 83;
Input.KEY_A = 65;
Input.KEY_D = 68;

//on key down
window.onkeydown = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  Input.keys[key] = true;
}
window.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  Input.keys[key] = false;
}
