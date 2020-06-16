// ---------------------- Main RIZE functions -------------------------------
var rizeBlockly = {

  // TODO: delete
  primitive_openNav: function () {
    modal_p.style.display = "block";
    //document.getElementById("primitive_sidenav").style.width = "250px";
    //document.getElementById("blocklyArea").style.marginRight = "250px";
  },

  onCloseAll: function () {
    modal_p.style.display = "none";
  },

  // -------------------------- onXML2Workspace --------------------------
  // Description: Clear the workspace and add the blocks from an XML file
  onXML2Workspace: function (path) {

    $.ajax({
      'url': path,
      'dataType': 'text',
      'cache': false,
      'success': function (xml) {
        xml = Blockly.Xml.textToDom(xml);
        WORKSPACE.clear();
        Blockly.Xml.domToWorkspace(xml, WORKSPACE);
        WORKSPACE.clearUndo();
        WORKSPACE.undo(false);
        WORKSPACE.undo(true);
      },
      'error': function (XMLHttpRequest, textStatus, errorThrown) {
        if (project_type == "reaction") {
          Blockly.Xml.domToWorkspace(xml_reaction, WORKSPACE);
        }
      }
    });
  },



  // --------------------- Replace all ocurrences of a string  ------------------------

  escapeRegExp: function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  },

  replaceAll: function (str, find, replace) {
    return str.replace(new RegExp(rizeBlockly.escapeRegExp(find), 'g'), replace);
  },


  realoadCache: function (str) {
    location.reload(true)
  },

}






