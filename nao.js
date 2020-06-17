
var session = "";
var tts;
var timerPerception;
var touchEvent;

var people_list = [];
var shirt_color;
var face_detected;
var people_visible;
var people_distance;
var people_emotions;
var current_emotion;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// -----------------------  Text2Speech  -----------------------
async function say(text) {
  tts.say(text)
  console.log("say")
}

function language(text) {
  tts.setLanguage(text)
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
}

function volume(value) {
  value = parseInt(value);
  if (value > 100) {
    value = 100
  }
  if (value < 0) {
    value = 0
  }
  var mapped_value = value
  audio_proxy.setOutputVolume(mapped_value)
  console.log("volume")
}


function pitch(value) {

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


async function leds(ledsg, r, g, b, time_to_change) {
  session.service("ALLeds").done(function (leds) {
    led_g = ledsg
    leds.fadeRGB(led_g, r * .1, g * .1, b * .1, time_to_change)
    // FaceLeds, AllLeds, BrainLeds, EarLeds
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
  await sleep(2000);
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

// ------------------------- Tablet ---------------------------

function showWeb(url) {
  session.service("ALTabletService").done(function (proxy) {
    proxy.hideImage()
    proxy.stopVideo()
    proxy.loadUrl(url)
    proxy.showWebview()
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


function showWebImage(url) {
  session.service("ALTabletService").done(function (proxy) {
    proxy.showImageNoCache(url)
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}

function showImage(input_) {
  session.service("ALTabletService").done(function (proxy) {
    proxy.showImage("http://198.18.0.1/apps/images/" + input_ + ".jpg")
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


function resetTablet(input_) {
  session.service("ALTabletService").done(function (proxy) {
    proxy.resetTablet()
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


function hideImage(input_) {
  session.service("ALTabletService").done(function (proxy) {
    proxy.hideImage()
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


// -------------------------- Video --------------------------
var image_robot;
var video_proxy;
var video_client;
var dataImage;
var context;
var imgData;



function startVideoStreaming() {
  session.service("ALVideoDevice").done(function (proxy) {
    var resolution = 1
    var colorSpace = 11
    video_proxy = proxy
    video_proxy.subscribe("video_pepper", resolution, colorSpace, 15).then(function (client) {
      // subscriber.signal is a signal associated to "FrontTactilTouched"
      video_client = client
    });
    // tts is a proxy to the ALTextToSpeech service
  }).fail(function (error) {
    console.log("An error occurred:", error);
  });
}


function getImageVideo() {
  video_proxy.getImageRemote(video_client).then(function (image) {
    if (image) {
      var imageWidth = image[0];
      var imageHeight = image[1];
      var imageBuf = image[6];

      if (!context) {
        context = document.getElementById("canvas").getContext("2d");
      }
      if (!imgData || imageWidth != imgData.width || imageHeight != imgData.height) {
        imgData = context.createImageData(imageWidth, imageHeight);
      }

      var arrayBuf = Base64_To_ArrayBuffer(image[6]);
      var tpx = 320 * 240;
      var uint8array = new Uint8Array(arrayBuf);
      for (var j = 0; j < tpx; j++) {
        imgData.data[j * 4] = uint8array[j * 3];
        imgData.data[j * 4 + 1] = uint8array[j * 3 + 1];
        imgData.data[j * 4 + 2] = uint8array[j * 3 + 2];
        imgData.data[j * 4 + 3] = 200;
      }
      context.putImageData(imgData, 0, 0);
    }
    // subscriber.signal is a signal associated to "FrontTactilTouched"
    dataImage = image
  });
}

function Base64_To_ArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}



var setImage = function (msg) {
  var url = "data:image/jpg;base64," + dataImage[6]
  document.getElementById("myImage").src = url;

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


function isTouched(value)
{
  if (value === "head" ) {

    if (head_touched_front === true || head_touched_middle === true || head_touched_rear === true) {
      return true
    }
    else{
      return false
    }

  }

}


function isEmotion(value)
{
  if (value === "head" ) {

    if (head_touched_front === true || head_touched_middle === true || head_touched_rear === true) {
      return true
    }
    else{
      return false
    }

  }

}


function isWord(value)
{
  if (value === "head" ) {

    if (head_touched_front === true || head_touched_middle === true || head_touched_rear === true) {
      return true
    }
    else{
      return false
    }

  }

}



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
        state == 1 ? head_touched_front = true : head_touched_front = false
      });
    });

    ALMemory.subscriber("MiddleTactilTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "MiddleTactilTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? head_touched_middle = true : head_touched_middle = false
      });
    });
    ALMemory.subscriber("RearTactilTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "RearTactilTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? head_touched_rear = true : head_touched_rear = false
      });
    });


    ALMemory.subscriber("HandRightBackTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "RearTactilTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? right_touched_back = true : right_touched_back = false
      });
    });
    ALMemory.subscriber("HandRightRightTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "HandRightRightTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? right_touched_r = true : right_touched_r = false
      });
    });
    ALMemory.subscriber("HandRightLeftTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "HandRightLeftTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? right_touched_l = true : right_touched_l = false
      });
    });



    ALMemory.subscriber("HandLeftBackTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "HandLeftBackTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? left_touched_back = true : left_touched_back = false
      });
    });
    ALMemory.subscriber("HandLeftRightTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "HandLeftRightTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? left_touched_r = true : left_touched_r = false
      });
    });
    ALMemory.subscriber("HandLeftLeftTouched").then(function (subscriber) {
      // subscriber.signal is a signal associated to "HandLeftLeftTouched"
      subscriber.signal.connect(function (state) {
        state == 1 ? left_touched_l = true : left_touched_l = false
      });
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
    ALMemory.getData("PeoplePerception/PeopleList").then(function (value) {
      people_list = value
    });
  });
}


function getPeopleInfo() {
  if (people_list.length > 0) {

    session.service("ALMemory").then(function (ALMemory) {
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/ShirtColor").then(function (value) {
        shirt_color = value
      });
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/NotSeenSince").then(function (value) {
        time_not_seen = value
      });
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/IsFaceDetected").then(function (value) {
        face_detected = value
      });
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/IsVisible").then(function (value) {
        people_visible = value
      });
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/Distance").then(function (value) {
        people_distance = value
      });
      ALMemory.getData("PeoplePerception/Person/" + String(people_list[0]) + "/ExpressionProperties").then(function (value) {
        people_emotions = value
        var index = indexOfMax(people_emotions)
        if (index === 0) {
          current_emotion = "neutral"
        }
        else if (index === 1) {
          current_emotion = "happy"
        }
        else if (index === 2) {
          current_emotion = "surprised"
        }
        else if (index === 3) {
          current_emotion = "angry"
        }
        else if (index === 4) {
          current_emotion = "sad"
        }
        console.log(current_emotion)
      });

    });
  }
}


function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}


var full_code = ""
function RunCode() {
  Blockly.JavaScript.addReservedWords('code');
  var code = Blockly.JavaScript.workspaceToCode(WORKSPACE);

  full_code = "async function program_code() { \n await sleep(1000); \n console.log('Starting code') \n" + code + "\n" + "} \n program_code()"

  console.log(full_code);
  RunAsync()
}

async function RunAsync() {

  try {
    eval(full_code);
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


function connectRobot(host) {

  function connected() {
    console.log("connected");
    AppVue.message = "Connected"
    AppVue.color = "indigo darken-1"
    AppVue.icon = "mdi-checkbox-marked-circle"
    session.service("ALTextToSpeech").done(function (proxy) {
      tts = proxy
      // tts is a proxy to the ALTextToSpeech service
    }).fail(function (error) {
      console.log("An error occurred:", error);
    });
    session.service("ALAudioDevice").done(function (proxy) {
      audio_proxy = proxy
    }).fail(function (error) {
      console.log("An error occurred:", error);
    });


    startTouched();
    console.log("Touched started")

    timerPerception = setInterval(PerceptionTimer, 300);
    touchEvent = setInterval(UpdateTouched, 100);
    console.log("Percpetion started")

    function PerceptionTimer() {
      ReadMemory();
      getPeopleInfo();
    }


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


