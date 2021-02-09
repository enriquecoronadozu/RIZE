
// ******************************  Global variables *******************************************


// -- Blockly variables -- 
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var WORKSPACE = Blockly.inject('blocklyDiv', options);
var configuration_image = "images/edit.png"



// *************************** Function: Resize Blockly ****************************************
// Enable to adapt blockly space to the screen and windows size
var onResizeBlockly = function (e) {
  // Get absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);

  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = 100 + 'px';

  var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight || docElem.clientHeight || body.clientHeight;


  x  =  x + 100
  y = y - 100

  blocklyDiv.style.width = x + 'px';
  blocklyDiv.style.height = y + 'px';

};

// ----------------------------- Event: Resize --------------------------------
// Resize  blockly area in base the initial windows size and if this changes
document.getElementById("blocklyArea").style.marginRight = "0px"
onResizeBlockly();
