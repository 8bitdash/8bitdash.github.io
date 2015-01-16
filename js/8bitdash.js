var Dash = function() {

  var credits = {
    "mockup.gif":"http://bitslap.se/",
    "bitslap.gif":"http://bitslap.se/",
    "asylumgate.gif":"http://bitslap.se/",
    "nightcycle.gif":"http://bitslap.se/",
    "fireflyreboot.gif":"http://bitslap.se/",
    "town.png":"http://www.serebiiforums.com/showthread.php?379701-Another-Sprite-Showcase",
    "ironberg.png":"http://www.serebiiforums.com/showthread.php?379701-Another-Sprite-Showcase",
    "forrest.png":"http://www.serebiiforums.com/showthread.php?379701-Another-Sprite-Showcase",
    "leonard.png":"http://opengameart.org/content/whispers-of-avalon-grassland-tileset",
    "arkanos.png":"http://opengameart.org/content/mage-city-arcanos",
    "dungeon.gif":"http://opengameart.org/content/a-blocky-dungeon",
    "bridge.gif":"Mark Ferrari",
    "falls.gif":"Mark Ferrari",
    "coast.gif":"Mark Ferrari",
    "dawn.gif":"Mark Ferrari",
    "northlights.gif":"Mark Ferrari",
    "lake.gif":"Mark Ferrari",
    "snow.gif":"Mark Ferrari",
    "bridge_raining.gif":"Mark Ferrari",
    "nature.gif": "Mark Ferrari",
    "castle.gif": "Mark Ferrari",
    "grandcanyon.gif": "Mark Ferrari",
    "sea.gif": "Mark Ferrari",
    "cyber.gif": "http://flexroman.tumblr.com/"
  }

  var modes = {"landscapes": 
    ["bridge.gif",
     "coast.gif",
     "dawn.gif", 
     "grandcanyon.gif",
     "northlights.gif",
     "lake.gif",
     "falls.gif", 
     "castle.gif",
     "bridge_raining.gif",
     "snow.gif", 
     "nature.gif",
     "sea.gif"],
     "other": 
    ["nightcycle.gif", 
    "fireflyreboot.gif", 
    "mockup.gif", 
    "asylumgate.gif", 
    "bitslap.gif",
    "town.png", 
    "ironberg.png", 
    "forrest.png", 
    "leonard.png", 
    "dungeon.gif"]
  }
  
  this.curMode = "landscapes";
  this.curIndex = 0;

  // controllable via Dat.GUI
  this.showClock = true;
  this.showGreeter = true;
  this.name = "jendrik";
  this.theme = "landscapes"

  this.changeBackground = function(background) {
    console.log("Changing to " + background);
    var rule = document.styleSheets[0].cssRules[0];
    var postfix = "no-repeat center center fixed";
    var s = "url(images/" + background + ") " + postfix;
    rule.style.background = s 
    rule.style.backgroundSize = "cover"
  }

  this.changeCredit = function(name) {
    console.log("Changing credit to " + name);
    var s = name;
    document.getElementById("footer").firstChild.nodeValue = s; 
  }

  this.updateBackground = function() {
    var file = modes[this.curMode][this.curIndex]
    var folder = this.curMode + "/"
    this.changeBackground(folder + file);
    if(file in credits) {
      this.changeCredit(credits[file]);
    } else {
      this.changeCredit("Mention me @madewithtea to take credit for your art.")
    }
  } 

  this.nextBackground = function() {
    this.curIndex += 1;
    if(this.curIndex + 1 > modes[this.curMode].length) {
      this.curIndex = 0;
    }
    this.updateBackground();
  }

  this.previousBackground = function() {
    this.curIndex -= 1; 
    if(this.curIndex < 0) {
      this.curIndex = modes[this.curMode].length - 1;
    }
    this.updateBackground();
  }

  this.initialize = function(basil) {
    // read the configuration
    this.basil = basil;
    
    var keys = basil.keys()
    if(keys.indexOf("mode2") != -1) {
      this.curMode = basil.get("mode2");
      console.log("loaded mode from saved settings")
    }

    // random background
    var x = Math.random() * modes[this.curMode].length;
    this.curIndex = Math.floor(x);

    this.updateBackground();
  }

  this.changeMode = function(mode) {
    this.curMode = mode 
    this.curIndex = 0
    this.updateBackground();

    this.basil.set("mode2", mode);
    this.basil.set("done-tutorial", true);
    alertify.log("Saved settings")
  } 
}

var updateClock = function() {
    var currentTime = new Date();
  
    var currentHours = currentTime.getHours ( );
    
    var greeting = ""
    if((0 <= currentHours) && (currentHours < 6)) {
      greeting = "Good Night"
    }
    else if((6 <= currentHours) && (currentHours < 12)) {
      greeting = "Good Morning"
    }
    else if((12 <= currentHours) && (currentHours < 18)) {
      greeting = "Good Afternoon"
    }
    else if((18 <= currentHours) && (currentHours < 22)) {
      greeting = "Good Evening"
    }
    else((22 <= currentHours) && (currentHours < 24)) {
      greeting = "Sleep Well"
    }
    
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds ( );
  
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  
    var timeOfDay = ( currentHours < 12 ) ? "am" : "pm";
  
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
    currentHours = ( currentHours == 0 ) ? 12 : currentHours;
  
    var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
  
    document.getElementById("clock").firstChild.nodeValue = currentTimeString;

    document.getElementById("greeting").firstChild.nodeValue = greeting 
  }

window.onload = function() {
  var dash = new Dash()
  var basil = new window.Basil(); 

  dash.initialize(basil) 
  var gui = new dat.GUI();
  dat.GUI.toggleHide();

  var themes = gui.add(dash, "theme", ["landscapes", "other"])

  themes.onChange(function(value) {
    dash.changeMode(value);
  })

  if(basil.keys().indexOf('done-tutorial') == -1) {
    alertify.log("Press H for settings");
  }

  updateClock();
  setInterval('updateClock()', 10000 )

  Mousetrap.bind("right", function() {
    dash.nextBackground()});
  Mousetrap.bind("left", function() {
    dash.previousBackground()});
  Mousetrap.bind("g", function() {
    window.location.href = "https://www.github.com"
  });
  Mousetrap.bind("r", function() {
    window.location.href = "https://www.reddit.com"
  });
  Mousetrap.bind("f", function() {
    window.location.href = "https://www.facebook.com"
  });
  Mousetrap.bind("y", function() {
    window.location.href = "https://www.youtube.com"
  });
  Mousetrap.bind("m", function() {
    window.location.href = "https://maps.google.com"
  });
  Mousetrap.bind("s", function() {
    window.location.href = "https://www.openstreetmap.org/"
  });
  Mousetrap.bind("w", function() {
    window.location.href = "https://www.wikipedia.com"
  });
  Mousetrap.bind("b", function() {
    window.location.href = "https://www.bing.com"
  });
  Mousetrap.bind("t", function() {
    window.location.href = "https://www.twitter.com"
  });
  Mousetrap.bind("d", function() {
    window.location.href = "https://www.digg.com"
  });
  Mousetrap.bind("e", function() {
    window.location.href = "https://www.ebay.com"
  });
  Mousetrap.bind("a", function() {
    window.location.href = "https://www.amazon.com"
  });
  Mousetrap.bind("o", function() {
    window.location.href = "https://www.google.com"
  });
  Mousetrap.bind("p", function() {
    window.location.href = "https://www.google.com/images"
  });

}

