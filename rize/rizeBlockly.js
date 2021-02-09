// ---------------------- Main RIZE functions -------------------------------
var rizeBlockly = {

  // ----------- Set current block_name when created in WOKKSPACE -------------------
  onCreate: function (json) {
    block_selected = WORKSPACE.getBlockById(json["blockId"]) //  Select block json from id
    let type_selected = block_selected.type
    if (type_selected == "reaction" || type_selected == "goal" || type_selected == "goal_advanced" || type_selected == "module" || type_selected == "behavior") {
      block_selected.setFieldValue(AppVue.block_name, "module_name")
    }
  },

  // ---------------------- Set default options --------------------------
  formatOptions: function (options_dic) {
    if (options_dic == "edit") { options_dic = "{}" }
    if (options_dic == "") { options_dic = "{}" }
    return options_dic
  },

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

  // ------------------------onBuildReactions --------------------------
  // Build BTs of Reactions
  onBuildReactions: function () {

    let source_code = ""
    var source = Blockly.Python.workspaceToCode(WORKSPACE_reactions);
    var json_list = source.split("#...#")

    json_list.forEach(function (element) {
      try {
        json_element = JSON.parse(element)
        string_data = JSON.stringify(json_element["data"], null, 4)
        source_code = source_code + json_element["name"] + " : " + "function() { return " + string_data + "}, \n"
      }
      catch (err) {
        console.log("error building reaction")
      }
    });
    source_code = "var " + project_name + " = " + "{" + source_code + "}";
    source_reactions = source_code;
    return source_code;
  },

  // ------------------------ onwWorkspacToJavascriptFunctions  --------------------------
  // Build JS files
  onwWorkspacToJavascriptFunctions: function (workspace) {
    // Save goals
    let source_code = "";
    let source = Blockly.Python.workspaceToCode(workspace);
    var json_list = source.split("#...#");

    json_list.forEach(function (element) {
      if (element == "") {
        console.log("No elements")
      }
      else {
        json_element = JSON.parse(element)
        string_data = JSON.stringify(json_element["data"], null, 4)
        source_code = source_code + json_element["name"] + " : " + "function() { return " + string_data + "}, \n"
      }
    });
    return source_code
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






