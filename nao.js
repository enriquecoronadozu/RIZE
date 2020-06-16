
var session = "";

function connectRobot(host) {

  function connected() {
    console.log("connected");
    AppVue.message = "Connected"
    AppVue.color = "indigo darken-1"
    AppVue.icon = "mdi-checkbox-marked-circle"
  }

  function disconnected() {
    console.log("disconnected");
    AppVue.message = "No connected"
    AppVue.color = "blue darken-2"
    AppVue.icon = "mdi-alert-circle-outline"
  }

  session = new QiSession(host);
  session.socket().on("connect", connected);
  session.socket().on("disconnect", disconnected);

};

// -----------------------  Text2Speech  -----------------------
function say(text) {
  session.service("ALTextToSpeech").done(function (tts) {
    tts.say(text)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function language(text) {
  session.service("ALTextToSpeech").done(function (tts) {
    tts.setLanguage(text)
    // language("English"), language("Japanese")
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function animated_say(value) {
  session.service("ALAnimatedSpeech").done(function (proxy) {
    proxy.say(value, { "bodyLanguageMode": "contextual" })
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function speed(value) {
  session.service("ALTextToSpeech").done(function (tts) {
    value = parseInt(value);
    if (value > 350) {
      value = 350
    }
    if (value < 0) {
      value = 0
    }
    var mapped_value = 50 + value
    tts.setParameter("speed", mapped_value)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function volume(value) {
  session.service("ALAudioDevice").done(function (tts) {
    value = parseInt(value);
    if (value > 100) {
      value = 100
    }
    if (value < 0) {
      value = 0
    }
    var mapped_value = value
    tts.setOutputVolume(mapped_value)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


function pitch(value) {
  session.service("ALTextToSpeech").done(function (tts) {
    value = parseInt(value);
    if (value > 100) {
      value = 100
    }
    if (value < 40) {
      value = 40
    }
    var mapped_value = .5 + value * 1.26 / 100.0  //default = 1.3
    console.log(mapped_value)
    tts.setParameter("pitchShift", mapped_value)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function stopSay(value) {
  session.service("ALTextToSpeech").done(function (tts) {
    tts.stopAll()
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

// -----------------------  Behaviors  -----------------------

function stopAutonomusLife(value) {
  session.service("ALAutonomousLife").done(function (proxy) {
    proxy.setState("disabled")
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function stopAllBehaviors(value) {
  session.service("ALBehaviorManager").done(function (proxy) {
    proxy.stopAllBehaviors()
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

// -----------------------  Leds  -----------------------


function leds(ledsg, r, g, b, time_to_change) {
  session.service("ALLeds").done(function (leds) {
    led_g = ledsg
    leds.fadeRGB(led_g, r * .1, g * .1, b * .1, time_to_change)
    // FaceLeds, AllLeds, BrainLeds, EarLeds
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function rasta(timeDuration) {
  session.service("ALLeds").done(function (leds) {
    leds.rasta(timeDuration)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function rotateEyes(color, time_to_change, timeDuration) {
  session.service("ALLeds").done(function (leds) {
    var value = 0x001a1aff
    if (color === "blue") {
      value = 0x001a1aff
    }
    if (color === "red") {
      value = 0x00ff0000
    }
    if (color === "green") {
      value = 0x00009933
    }
    if (color === "yellow") {
      value = 0x00ffff00
    }
    if (color === "pink") {
      value = 0x00ff3399
    }
    if (color === "white") {
      value = 0x00ffffff
    }

    leds.rotateEyes(value, time_to_change, timeDuration)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function randomEyes(timeDuration) {
  session.service("ALLeds").done(function (leds) {
    leds.randomEyes(timeDuration)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

// -----------------------  Mode  -----------------------

function mode(value) {
  session.service("ALMotion").done(function (motion) {
    if (value === "rest") {
      motion.rest()
    }
    else {
      motion.wakeUp()
    }
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

// -------------------------- Events ---------------------------
var head_touched_front = false
var head_touched_middle = false
var head_touched_rear = false

var right_touched_back = false
var right_touched_r = false
var right_touched_l = false

var left_touched_back = false
var left_touched_r = false
var left_touched_l = false

var head_touched = false
var rigth_hand_touched = false
var left_hand_touched = false

var TouchEvent = setInterval(UpdateTouched, 100);

function UpdateTouched() {
  if (head_touched_front === true || head_touched_middle === true || head_touched_rear === true) {
    head_touched = true
  }
  else {
    head_touched = false
  }
  if (right_touched_back === true || right_touched_r === true || right_touched_l === true) {
    rigth_hand_touched = true
  }
  else {
    rigth_hand_touched = false
  }
  if (left_touched_back === true || left_touched_r === true || left_touched_l === true) {
    left_hand_touched = true
  }
  else {
    left_hand_touched = false
  }

}



function startTouched(text) {
  session.service("ALMemory").then(function (ALMemory) {
    ALMemory.subscriber("FrontTactilTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "FrontTactilTouched"
      subscriber.signal.connect(function (state) {
        console.log(state == 1 ? head_touched_front = true : head_touched_front = false);
      });
    });
  });
  ALMemory.subscriber("MiddleTactilTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "MiddleTactilTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? head_touched_middle = true : head_touched_middle = false);
    });
  });
  ALMemory.subscriber("RearTactilTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "RearTactilTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? head_touched_rear = true : head_touched_rear = false);
    });
  });


  ALMemory.subscriber("HandRightBackTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "RearTactilTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? right_touched_back = true : right_touched_back = false);
    });
  });
  ALMemory.subscriber("HandRightRightTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "HandRightRightTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? right_touched_r = true : right_touched_r = false);
    });
  });
  ALMemory.subscriber("HandRightLeftTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "HandRightLeftTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? right_touched_l = true : right_touched_l = false);
    });
  });



  ALMemory.subscriber("HandLeftBackTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "HandLeftBackTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? left_touched_back = true : left_touched_back = false);
    });
  });
  ALMemory.subscriber("HandLeftRightTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "HandLeftRightTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? left_touched_r = true : left_touched_r = false);
    });
  });
  ALMemory.subscriber("HandLeftLeftTouched").then(function (subscriber) {
    // subscriber.signal is a signal associated to "HandLeftLeftTouched"
    subscriber.signal.connect(function (state) {
      console.log(state == 1 ? left_touched_l = true : left_touched_l = false);
    });
  });
}


// ----------------------- Speech --------------------------------
var speech_proxy;
var speech_event_active = false

function speechStart(vocabulary, visual, audio) {
  session.service("ALSpeechRecognition").done(function (proxy) {
    speech_proxy = proxy

    var visualExpression = visual
    var audioExpression = audio
    var wordSpotting = true
    var sensitivity = 0.45

    speech_proxy.setAudioExpression(visualExpression)
    speech_proxy.setVisualExpression(audioExpression)
    speech_proxy.pushContexts()
    speech_proxy.setVocabulary(vocabulary, wordSpotting)


    speech_proxy.subscribe("Test_ASR")


    if (speech_event_active === false) {
      speech_event_active = true
      session.service("ALMemory").then(function (ALMemory) {
        ALMemory.subscriber("WordRecognized").then(function (subscriber) {
          // subscriber.signal is a signal associated to "FrontTactilTouched"
          subscriber.signal.connect(function (state) {
            console.log(state);
            if (state[1] > sensitivity) {
              if (wordSpotting) {
                var values_rest = state[0].split("<...> ")
                var values_final = values_rest[1].split(" <...>")
                var word = values_final[0]
                console.log("Recognized " + word)
              }
            }
          });
        });
      });
    }
    //speech_proxy.setLanguage("English")
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function stopSpeech(vocabulary) {
  try {
    speech_proxy.unsubscribe("Test_ASR")
  } catch (error) {

  }
}


function ReadMemory(text) {
  session.service("ALMemory").then(function (ALMemory) {
    ALMemory.getData("Device/SubDeviceList/LHand/Touch/Back/Sensor/Value").then(function(text0) {
      console.log(text0)
    });
    
  });
}


function RunCode() {
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(WORKSPACE);
  console.log(code);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
}


function onSaveBlocklyXML() {

  // Transform the block in a xml format
  var xml = Blockly.Xml.workspaceToDom(WORKSPACE);
  // Tranform a xml text in a more redeable xml text
  xml = Blockly.Xml.domToPrettyText(xml);
  console.log(xml);
  // Save a file
  download(xml, "blocks.xml", 'text/plain');
}


function readXML() {
  const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
}