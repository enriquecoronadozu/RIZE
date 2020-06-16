// TODO: Do this variable a class.
var rizeBlocks = {

  do_action_robot: function (value_input, value_robots) {
    let json_action = bt_blocks.action(value_input, value_robots)
    return JSON.stringify(json_action) + "#..#"
  },
  

  do_action: function (value_input) {
    let json_action = bt_blocks.action(value_input, rize_robot)
    return JSON.stringify(json_action) + "#..#"
  },

  codeToList: function (code) {
    console.log(code)
    let branchlist = code.split("#..#");
    let json_list = [];
    console.log(branchlist)
    for (index = 0; index < branchlist.length - 1; ++index) {
      try {
        json_list.push(JSON.parse(branchlist[index]))
      }
      catch (e) {
        json_list.push(branchlist[index])
      }
    }

    return json_list
  },
  
  module: function (text_behavior_name, statements_behavior, dropdown_mode) {

    text_behavior_name = module_name
    let actions = rizeBlocks.codeToList(statements_behavior);
    if (dropdown_mode == "sequence") {
      let module = bt_blocks.sequence(actions)
      return '{"name":"module_' + text_behavior_name + '", "data":' + JSON.stringify(module) + "}" + "#...#";
    }
    else {
      let module = bt_blocks.random_selector(actions)
      return '{"name":"module_' + text_behavior_name + '", "data":' + JSON.stringify(module) + "}" + "#...#";
    }
  },


  do_module: function (text_name) {
    //let code =  JSON.stringify(main_program["module_"+text_name]()) + "#..#";
    string = "module_" + text_name
    let code = "**main_program['" + string + "']()**" + "#..#";
    return code;
  },


  reaction: function (text_name_reaction, conditions, statements_behavior_code, text_utility) {
    text_name_reaction = module_name
    let start_condition = bt_blocks.condition(conditions)
    let lista = rizeBlocks.codeToList(statements_behavior_code);
    let bt = bt_blocks.sequence(lista)
    let utility = 0
    if (text_utility == "high") {
      utility = 3
    }
    else if (text_utility == "normal") {
      utility = 2
    }
    else {
      utility = 1
    }
    let reaction = bt_blocks.reaction(text_name_reaction, start_condition, bt, utility) //Last is the utility
    return '{"name":"reaction_' + text_name_reaction + '", "data":' + JSON.stringify(reaction) + "}" + "#...#";
  },


  do_behavior: function (text_behavior) {
    let code = project_name + ".behavior_" + text_behavior + "()" + "#..#";
    project_modules.push(project_name + ".behavior_" + text_behavior + "()")
    return code;
  },

  logic_all: function (value_input) {
    var json_conditions = []
    var value_json = JSON.parse(value_input)
    
    value_json.forEach(element => {
      json_conditions.push(bt_blocks.condition(element))

    });

    var seq = bt_blocks.sequence(json_conditions)
    console.log(seq)
    return JSON.stringify(seq)
  },

  // Define the JSON value of a goal
  goal: function (text_goal_name, value_activated, statements_behavior, value_canceled, text_utility, delay) {

    // Set name
    text_goal_name = module_name
    // Set conditions
    let start_condition = bt_blocks.condition(value_activated)
    let stop_condition = bt_blocks.condition(value_canceled)
    // Set Behaviors
    let lista = rizeBlocks.codeToList(statements_behavior);
    let bt = bt_blocks.sequence(lista)
    // Set priority
    let utility = 0
    if (text_utility == "high") {
      utility = 3
    }
    else if (text_utility == "normal") {
      utility = 2
    }
    else {
      utility = 1
    }
    // Get JSON
    let goal = bt_blocks.goal(text_goal_name, start_condition, stop_condition, bt, {}, {}, utility, {}, delay)
    return '{"name":"goal_' + text_goal_name + '", "data":' + JSON.stringify(goal) + "}" + "#...#";
  },

  goal_advanced: function (text_goal_name, value_activated, statements_behavior, statements_stop_behavior, statements_return_behavior, value_canceled, text_utility, options) {
    text_goal_name = module_name
    let start_condition = value_activated
    let stop_condition = value_canceled
    let lista = rizeBlocks.codeToList(statements_behavior);

    let bt = bt_blocks.sequence(lista)
    lista = rizeBlocks.codeToList(statements_stop_behavior);
    let bt_stop = bt_blocks.sequence(lista)
    lista = rizeBlocks.codeToList(statements_return_behavior);
    let bt_return = bt_blocks.sequence(lista)

    let utility = 0
    if (text_utility == "high") {
      utility = 3
    }
    else if (text_utility == "normal") {
      utility = 2
    }
    else {
      utility = 1
    }


    let goal = bt_blocks.goal(text_goal_name, start_condition, stop_condition, bt, bt_stop, bt_return, utility, options)
    console.log(goal)
    return '{"name":"goal_' + text_goal_name + '", "data":' + JSON.stringify(goal) + "}" + "#...#";
  },

  
  two_options_question_wait_answer: function (text_name, statements_ask, number_time, text_option1, statements_yes, text_option2, statements_no, statements_other) {


    let lista_ask = rizeBlocks.codeToList(statements_ask);
    let lista_yes = rizeBlocks.codeToList(statements_yes);
    let lista_no = rizeBlocks.codeToList(statements_no);
    let lista_other = rizeBlocks.codeToList(statements_other);
    let act_wait = bt_blocks.action('{"primitive": "wait","input": "seconds","options": {"value":' + number_time.toString() + '}}', "pepper")

    let bt_ask = bt_blocks.sequence(lista_ask)
    let bt_yes = bt_blocks.sequence(lista_yes)
    let bt_no = bt_blocks.sequence(lista_no)
    let bt_ot = bt_blocks.sequence(lista_other)

    let p_yes = { "primitive": "word", "input": text_option1, "options": "none" }
    let p_no = { "primitive": "word", "input": text_option2, "options": "none" }

    let condition_yes = bt_blocks.condition(JSON.stringify(p_yes), "sharo")
    let condition_no = bt_blocks.condition(JSON.stringify(p_no), "sharo")

    let md_yes = bt_blocks.sequence([condition_yes, bt_yes])
    let md_no = bt_blocks.sequence([condition_no, bt_no])
    let md_init = bt_blocks.sequence([bt_ask, act_wait])
    let options = bt_blocks.selector([md_yes, md_no, bt_ot])
    let behavior = bt_blocks.sequence([md_init, options])

    return '{"name":"behavior_' + text_name + '", "data":' + JSON.stringify(behavior) + "}" + "#...#";;
  },

}


