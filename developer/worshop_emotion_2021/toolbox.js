var toolbox = '<xml id="toolbox" style="display: none">';

toolbox += '<sep></sep>';
toolbox += '<category name="Action builder" colour="#3373CC">'
toolbox += '<block type="reaction"></block>';
toolbox += '<block type="do_action"></block>';
toolbox += '</category>';
toolbox += '<sep></sep>';

toolbox += '<category name="Set event triggers" colour="#009688">'
toolbox +='    <block type="human_emotion"></block>';
toolbox +='    <block type="object_detected"></block>';
toolbox +='    <block type="robot_emotion"></block>';
toolbox +='    <block type="touched"></block>';
toolbox +='    <block type="word"></block>';
toolbox += '  </category>';

toolbox += '<category name="Set robot actions" colour="#2196f3">'
toolbox +='    <block type="animation"></block>';
toolbox +='    <block type="close_hand"></block>';
toolbox +='    <block type="open_hand"></block>';
toolbox +='    <block type="say"></block>';
toolbox +='    <block type="change_leds"></block>';
toolbox +='    <block type="track_people_with"></block>';
toolbox +='    <block type="turn"></block>';
toolbox +='    <block type="wait"></block>';
toolbox +='    <block type="walk"></block>';
toolbox +='    <block type="walk_toward"></block>';
toolbox += '  </category>';


toolbox += '<sep></sep>';
toolbox += '<category name="Select behaviors"  colour="#424242">'
toolbox += '<block type="selector"></block>';
toolbox += '<block type="check_perception"></block>';
toolbox += '</category>';

toolbox += '<sep></sep>';
toolbox += '</xml>';