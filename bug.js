// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name bug-min.js
// ==/ClosureCompiler==

/**
 * @preserve Bug.js - https://github.com/Auz/Bug
 * Released under MIT-style license.
 * Original Screen Bug http://screen-bug.googlecode.com/git/index.html
 */

/**
* Bug.js - Add bugs to your page
*
* https://github.com/Auz/Bug
*
* license: MIT-style license.
* copyright: Copyright (c) 2013 Graham McNicoll
* 
* 
* Created for an aprils fool joke at Education.com 2013. I knew there was probably a script 
* that did it already, and there was: http://screen-bug.googlecode.com/git/index.html. 
* I used this as the starting point and heavily modified it, used sprite image animation, 
* and added many new features. 
* 
* 
* Original Screen Bug http://screen-bug.googlecode.com/git/index.html
* Copyright ©2011 Kernc (kerncece ^_^ gmail)
* Released under WTFPL license.
* 
*/
"use strict";


var BugDispatch = {

  options: {
    minDelay: 500,
    maxDelay: 10000,
    minBugs: 2,
    maxBugs: 20,
    minSpeed: 1,
    maxSpeed: 3,
    imageSprite: 'fly-sprite.png',
    fly_width: 13,
    fly_height: 14,
    num_frames: 5,
    monitorMouseMovement: false,
    eventDistanceToBug: 40,
    minTimeBetweenMultipy: 1000,
    mouseOver: 'random' // can be 'fly', 'flyoff', die', 'multiply', or 'random'
  },

  initialize: function (options) {
    this.options = mergeOptions(this.options, options);

    // sanity check:
    if(this.options.minBugs > this.options.maxBugs) {
      this.options.minBugs = this.options.maxBugs;
    }

    this.modes = ['die', 'multiply', 'fly', 'flyoff'];

    // can we transform?
    this.transform = null;

    this.transformFns = {
      'MozTransform': function (s) {
        this.bug.style.MozTransform = s;
      },
      'WebkitTransform': function (s) {
        this.bug.style.WebkitTransform = s;
      },
      'OTransform': function (s) {
        this.bug.style.OTransform = s;
      },
      'MsTransform': function (s) {
        this.bug.style.msTransform = s;
      },
      'KhtmlTransform': function (s) {
        this.bug.style.KhtmlTransform = s;
      },
      'W3Ctransform': function (s) {
        this.bug.style.transform = s;
      }
    };

    this.transforms = {
      'Moz': this.transformFns.MozTransform,
      'Webkit': this.transformFns.WebkitTransform,
      'O': this.transformFns.OTransform,
      'Ms': this.transformFns.MsTransform,
      'Khtml': this.transformFns.KhtmlTransform,
      'w3c': this.transformFns.W3Ctransform
    };

    if ('transform' in document.documentElement.style) {
      this.transform = this.transforms.w3c;
    }
    var vendors = ['Moz', 'Webkit', 'O', 'Ms', 'Khtml'],
      i = 0,
      that = this;
    for (i = 0; i < vendors.length; i++) {
      if (vendors[i] + 'Transform' in document.documentElement.style) {
        this.transform = this.transforms[vendors[i]];
        break;
      }
    }

    // make bugs:
    this.bugs = [];
    var numBugs = (this.options.mouseOver === 'multiply') ? this.options.minBugs : this.random(this.options.minBugs, this.options.maxBugs, true),
      i = 0;
    for (i = 0; i < numBugs; i++) {
      var options = {
          imageSprite: this.options.imageSprite,
          fly_width: this.options.fly_width,
          fly_height: this.options.fly_height,
          num_frames: this.options.num_frames,
          wingsOpen: (Math.random() > 0.5) ? true : false,
          walkSpeed: this.random(this.options.minSpeed, this.options.maxSpeed)
      	},
        b = SpawnBug();
      b.initialize(this.transform, options);
      this.bugs.push(b);
    }

    // fly them in staggered:
    for (i = 0; i < numBugs; i++) {
      var delay = this.random(this.options.minDelay, this.options.maxDelay, true),
        thebug = this.bugs[i];
      // fly the bug onto the page:
      setTimeout((function (thebug) {
        return function () {
          thebug.flyIn();
        };
      }(thebug)), delay);

      // add mouse over events:
      that.add_events_to_bug(thebug);
    }

    // add window event if required:
    if (this.options.monitorMouseMovement) {
      window.onmousemove = function () {
        that.check_if_mouse_close_to_bug();
      };
    }

  },

  add_events_to_bug: function (thebug) {
    var that = this;
    if (thebug.bug) {
      thebug.bug.addEventListener('mouseover', function (e) {
        that.on_bug(thebug);
      });
    }
  },

  check_if_mouse_close_to_bug: function (e) {
    e = e || window.event;
    if (!e) {
      return;
    }

    var posx = 0,
      posy = 0;
    if (e.client && e.client.x) {
      posx = e.client.x;
      posy = e.client.y;
    } else if (e.clientX) {
      posx = e.clientX;
      posy = e.clientY;
    } else if (e.page && e.page.x) {
      posx = e.page.x - (document.body.scrollLeft + document.documentElement.scrollLeft);
      posy = e.page.y - (document.body.scrollTop + document.documentElement.scrollTop);
    } else if (e.pageX) {
      posx = e.pageX - (document.body.scrollLeft + document.documentElement.scrollLeft);
      posy = e.pageY - (document.body.scrollTop + document.documentElement.scrollTop);
    }
    var numBugs = this.bugs.length,
      i = 0;
    for (i = 0; i < numBugs; i++) {
      var pos = this.bugs[i].getPos();
      if (pos) {
        if (Math.abs(pos.top - posy) + Math.abs(pos.left - posx) < this.options.eventDistanceToBug && !this.bugs[i].flyperiodical) {
          this.near_bug(this.bugs[i]);
        }
      }
    }

  },

  near_bug: function (bug) {
    this.on_bug(bug);
  },

  on_bug: function (bug) {
    if (!bug.alive) {
      return;
    }

    var mode = this.options.mouseOver;
    if (mode === 'random') {
      mode = this.modes[(this.random(0, (this.modes.length - 1), true))];
    }
    if (mode === 'fly') {
      // fly away!
      bug.stop();
      bug.flyRand();
    } else if (mode === 'flyoff') {
    	// fly away and off the page
      bug.stop();
      bug.flyOff();
    } else if (mode === 'die') {
    	// drop dead!
      bug.die();
    } else if (mode === 'multiply') {
      if (!this.multiplyDelay && this.bugs.length < this.options.maxBugs) {
        // spawn another: 
        // create new bug:
        var b = SpawnBug(),
          options = {
            imageSprite: this.options.imageSprite,
            fly_width: this.options.fly_width,
            fly_height: this.options.fly_height,
            num_frames: this.options.num_frames,
            wingsOpen: (Math.random() > 0.5) ? true : false,
            walkSpeed: this.random(this.options.minSpeed, this.options.maxSpeed)
          },
          pos = bug.getPos,
          that = this;

        b.initialize(this.transform, options);
        b.drawBug(pos.top, pos.left);
        // fly them both away:
        b.flyRand();
        bug.flyRand();
        // store new bug:
        this.bugs.push(b);
        // watch out for spawning too quickly:
        this.multiplyDelay = true;
        setTimeout(function () {
          // add event to this bug:
          that.add_events_to_bug(b);
          that.multiplyDelay = false;
        }, this.options.minTimeBetweenMultipy);
      }

    }
  },

  random: function (min, max, round) {
    var result = ((min - 0.5) + (Math.random() * (max - min + 1)));
    if (result > max) {
      result = max;
    } else if (result < min) {
      result = min;
    }
    return ((round) ? Math.round(result) : result);
  }


};

var BugController = function () {
  this.initialize.apply(this, arguments);
}
BugController.prototype = BugDispatch;


/***************/
/**    Bug    **/
/***************/

var Bug = {

  options: {
    wingsOpen: false,
    walkSpeed: 2,
    flySpeed: 40,
    edge_resistance: 50
  },

  initialize: function (transform, options) {


    this.options = mergeOptions(this.options, options);
    this.NEAR_TOP_EDGE = 1;
    this.NEAR_BOTTOM_EDGE = 2;
    this.NEAR_LEFT_EDGE = 4;
    this.NEAR_RIGHT_EDGE = 8;
    this.directions = {}; // 0 degrees starts on the East
    this.directions[this.NEAR_TOP_EDGE] = 270;
    this.directions[this.NEAR_BOTTOM_EDGE] = 90;
    this.directions[this.NEAR_LEFT_EDGE] = 0;
    this.directions[this.NEAR_RIGHT_EDGE] = 180;
    this.directions[this.NEAR_TOP_EDGE + this.NEAR_LEFT_EDGE] = 315;
    this.directions[this.NEAR_TOP_EDGE + this.NEAR_RIGHT_EDGE] = 225;
    this.directions[this.NEAR_BOTTOM_EDGE + this.NEAR_LEFT_EDGE] = 45;
    this.directions[this.NEAR_BOTTOM_EDGE + this.NEAR_RIGHT_EDGE] = 135;

    this.angle_deg = 0;
    this.angle_rad = 0;
    this.large_turn_angle_deg = 0;
    this.near_edge = false;
    this.edge_test_counter = 10;
    this.small_turn_counter = 0;
    this.large_turn_counter = 0;
    this.fly_counter = 0;
    this.toggle_stationary_counter = Math.random() * 50;

    this.stationary = false;
    this.bug = null;
    this.wingsOpen = this.options.wingsOpen;
    this.transform = transform;
    this.walkIndex = 0;
    this.flyIndex = 0;
    this.alive = true;

    this.rad2deg_k = 180 / Math.PI;
    this.deg2rad_k = Math.PI / 180;

    this.makeBug();

    this.angle_rad = this.deg2rad(this.angle_deg);

    this.angle_deg = this.random(0, 360, true);

  },

  go: function () {
    if (this.transform) {
      this.drawBug();
      var that = this;

      this.going = setInterval(function () {
        that.animate();
      }, 40);
      //this.going = requestAnimFrame(function(t){ that.animate(t); });
    }
  },

  stop: function () {
    if (this.going) {
      clearTimeout(this.going);
      this.going = null;
    }
    if (this.flyperiodical) {
      clearTimeout(this.flyperiodical);
      this.flyperiodical = null;
    }
  },

  animate: function () {

    if (--this.toggle_stationary_counter <= 0) {
      this.toggleStationary();
    }
    if (this.stationary) {
      return;
    }


    if (--this.edge_test_counter <= 0 && this.bug_near_window_edge()) {
      // if near edge, go away from edge
      this.angle_deg %= 360;
      if (this.angle_deg < 0) this.angle_deg += 360;

      if (Math.abs(this.directions[this.near_edge] - this.angle_deg) > 15) {
        var angle1 = this.directions[this.near_edge] - this.angle_deg;
        var angle2 = (360 - this.angle_deg) + this.directions[this.near_edge];
        this.large_turn_angle_deg = (Math.abs(angle1) < Math.abs(angle2) ? angle1 : angle2);

        this.edge_test_counter = 10;
        this.large_turn_counter = 100;
        this.small_turn_counter = 30;
      }
    }
    if (--this.large_turn_counter <= 0) {
      this.large_turn_angle_deg = this.random(1, 150, true);
      this.next_large_turn();
    }
    if (--this.small_turn_counter <= 0) {
      this.angle_deg += this.random(1, 10);
      this.next_small_turn();
    } else {
      var dangle = this.random(1, 5, true);
      if ((this.large_turn_angle_deg > 0 && dangle < 0) || (this.large_turn_angle_deg < 0 && dangle > 0)) {
        dangle = -dangle; // ensures both values either + or -
      }
      this.large_turn_angle_deg -= dangle;
      this.angle_deg += dangle;
    }

    this.angle_rad = this.deg2rad(this.angle_deg);

    var dx = Math.cos(this.angle_rad) * this.options.walkSpeed;
    var dy = -Math.sin(this.angle_rad) * this.options.walkSpeed;

    this.moveBug(dx, dy);
    this.walkFrame();
    this.transform("rotate(" + (90 - this.angle_deg) + "deg)");
  },

  makeBug: function () {
    if (!this.bug) {
      var row = (this.wingsOpen) ? '0' : '-' + this.options.fly_height + 'px',
        bug = document.createElement('div');
      bug['class'] = 'bug';
      bug.style.background = 'transparent url(' + this.options.imageSprite + ') no-repeat 0 ' + row;
      bug.style.width = this.options.fly_width + 'px';
      bug.style.height = this.options.fly_height + 'px';
      bug.style.position = 'fixed';
      bug.style.zIndex = '9999999';

      this.bug = bug;
      this.setPos();

    }

  },

  setPos: function (top, left) {
    this.bug.top = top || this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
    //bug.top = bug.top < 0 ? -bug.top : bug.top;
    this.bug.left = left || this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);
    //bug.left = bug.left < 0 ? -bug.left : bug.left;
    this.bug.style.top = this.bug.top + 'px';
    this.bug.style.left = this.bug.left + 'px';
  },

  drawBug: function (top, left) {

    if (!this.bug) {
      this.makeBug();
    }
    if (top && left) {
      this.setPos(top, left);
    }
    if (!this.inserted) {
      this.inserted = true;
      document.body.appendChild(this.bug);
    }
  },

  toggleStationary: function () {
    this.stationary = !this.stationary;
    this.next_stationary();
    var ypos = (this.options.wingsOpen) ? '0' : '-' + this.options.fly_height + 'px';
    if (this.stationary) {
      this.bug.style.backgroundPosition = '0 ' + ypos;
    } else {
      this.bug.style.backgroundPosition = '-' + this.options.fly_width + 'px ' + ypos;
    }
  },

  walkFrame: function () {
    var xpos = (-1 * (this.walkIndex * this.options.fly_width)) + 'px',
      ypos = (this.options.wingsOpen) ? '0' : '-' + this.options.fly_height + 'px';
    this.bug.style.backgroundPosition = xpos + ' ' + ypos;
    this.walkIndex++;
    if (this.walkIndex >= this.options.num_frames) this.walkIndex = 0;
  },

  moveBug: function (dx, dy) {
    this.bug.style.top = (this.bug.top += dy) + 'px';
    this.bug.style.left = (this.bug.left += dx) + 'px';
  },

  fly: function (landingPosition) {
    var currentTop = parseInt(this.bug.style.top, 10),
      currentLeft = parseInt(this.bug.style.left, 10),
      diffx = (currentLeft - landingPosition.left),
      diffy = (currentTop - landingPosition.top),
      angle = Math.atan(diffy / diffx);

    if (Math.abs(diffx) + Math.abs(diffy) < 50) {
      this.bug.style.backgroundPosition = (-2 * this.options.fly_width) + 'px -' + (2 * this.options.fly_height) + 'px';
    }
    if (Math.abs(diffx) + Math.abs(diffy) < 30) {
      this.bug.style.backgroundPosition = (-1 * this.options.fly_width) + 'px -' + (2 * this.options.fly_height) + 'px';
    }
    if (Math.abs(diffx) + Math.abs(diffy) < 10) {
      // close enough:
      this.bug.style.backgroundPosition = '0 0'; //+row+'px'));

      this.stop();
      this.go();
      //this.go.delay(100, this);

      return;

    }
    
    // make it wiggle: disabled becuase its just too fast to see... better would be to make its path wiggly.
    //angle = angle - (this.deg2rad(this.random(0,10)));
    //console.log('angle: ',this.rad2deg(angle));

    var dx = Math.cos(angle) * this.options.flySpeed,
      dy = Math.sin(angle) * this.options.flySpeed;

    if ((currentLeft > landingPosition.left && dx > 0) || (currentLeft > landingPosition.left && dx < 0)) {
      // make sure angle is right way
      dx = -1 * dx;
      if (Math.abs(diffx) < Math.abs(dx)) {
        dx = dx / 4;
      }
    }
    if ((currentTop < landingPosition.top && dy < 0) || (currentTop > landingPosition.top && dy > 0)) {
      dy = -1 * dy;
      if (Math.abs(diffy) < Math.abs(dy)) {
        dy = dy / 4;
      }
    }

    this.bug.style.top = (currentTop + dy) + 'px';
    this.bug.style.left = (currentLeft + dx) + 'px';

  },

  flyRand: function () {
    this.stop();
    var landingPosition = {};
    landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
    landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);

    this.startFlying(landingPosition);
  },

  startFlying: function (landingPosition) {
    this.bug.left = landingPosition.left;
    this.bug.top = landingPosition.top;

    var currentTop = parseInt(this.bug.style.top, 10),
      currentLeft = parseInt(this.bug.style.left, 10),
      diffx = (landingPosition.left - currentLeft),
      diffy = (landingPosition.top - currentTop);

    this.angle_rad = Math.atan(diffy / diffx);
    this.angle_deg = this.rad2deg(this.angle_rad);

    if (diffx > 0) {
      // going left: quadrant 1 or 2
      this.angle_deg = 90 + this.angle_deg;
    } else {
      // going right: quadrant 3 or 4
      this.angle_deg = 270 + this.angle_deg;
    }
    this.angle_rad = this.deg2rad(this.angle_deg);
    this.transform("rotate(" + (90 - this.angle_deg) + "deg)");

    // start animation:
    var that = this;
    this.flyperiodical = setInterval(function () {
      that.fly(landingPosition);
    }, 10); //this.fly.periodical(10, this, [landingPosition]);
  },

  flyIn: function () {
    if (!this.bug) {
      this.makeBug();
    }
    this.stop();
    // pick a random side:
    var side = Math.round(Math.random() * 4 - 0.5),
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowX = window.innerWidth || e.clientWidth || g.clientWidth,
      windowY = window.innerHeight || e.clientHeight || g.clientHeight;
    if (side > 3) side = 3;
    if (side < 0) side = 0;
    var style = {}, s;
    if (side === 0) {
      // top:
      style.top = -20;
      style.left = Math.random() * windowX;
    } else if (side === 1) {
    	// right:
      style.top = Math.random() * windowY;
      style.left = windowX + 50;
    } else if (side === 2) {
      // bottom:
      style.top = windowY + 50;
      style.left = Math.random() * windowX;
    } else {
      // left: 
      style.top = Math.random() * windowY;
      style.left = -40;
    }
    style['background-position'] = (-3 * this.options.fly_width) + 'px -' + (2 * this.options.fly_height) + 'px';
    for (s in style) {
      this.bug.style[s] = style[s];
    }

    this.drawBug();
    
    // landing position:
    var landingPosition = {};
    landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
    landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);

    this.startFlying(landingPosition);
  },

  flyOff: function () {
    this.stop();
    // pick a random side to fly off to, where 0 is top and continuing clockwise.
    var side = this.random(0, 3),
      style = {},
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowX = window.innerWidth || e.clientWidth || g.clientWidth,
      windowY = window.innerHeight || e.clientHeight || g.clientHeight;

    if (side === 0) {
      // top:
      style.top = -200;
      style.left = Math.random() * windowX;
    } else if (side === 1) {
      // right:
      style.top = Math.random() * windowY;
      style.left = windowX + 200;
    } else if (side === 2) {
      //bottom:
      style.top = windowY + 200;
      style.left = Math.random() * windowX;
    } else {
      // left: 
      style.top = Math.random() * windowY;
      style.left = -200;
    }
    this.startFlying(style);
  },

  die: function () {
    this.stop();
    //pick death style:
    var deathType = this.random(0, 2);
    this.bug.style.backgroundPosition = '-' + ((deathType * 2) * this.options.fly_width) + 'px -' + (3 * this.options.fly_height) + 'px';
    this.alive = false;
    this.drop(deathType);
  },

  drop: function (deathType) {
    var startPos = this.getPos().top,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      finalPos = window.innerHeight || e.clientHeight || g.clientHeight,
      finalPos = finalPos - this.options.fly_height,
      rotationRate = this.random(0, 20, true),
      startTime = Date.now(),
      that = this;

    this.dropTimer = setInterval(function () {
      that.dropping(startTime, startPos, finalPos, rotationRate, deathType);
    }, 20);

  },

  dropping: function (startTime, startPos, finalPos, rotationRate, deathType) {
    var currentTime = Date.now(),
      elapsedTime = currentTime - startTime,
      deltaPos = (0.002 * (elapsedTime * elapsedTime)),
      newPos = startPos + deltaPos;
    //console.log(elapsedTime, deltaPos, newPos);
    if (newPos >= finalPos) {
      newPos = finalPos;
      clearTimeout(this.dropTimer);
      this.angle_deg = 0;
      this.angle_rad = this.deg2rad(this.angle_deg);
      this.transform("rotate(" + (90 - this.angle_deg) + "deg)");
      this.bug.style.top = null;
      this.bug.style.bottom = '-1px';


      this.twitch(deathType);

      return;
    }

    this.angle_deg = ((this.angle_deg + rotationRate) % 360);
    this.angle_rad = this.deg2rad(this.angle_deg);
    this.transform("rotate(" + (90 - this.angle_deg) + "deg)");
    this.bug.style.top = newPos + 'px';
  },

  twitch: function (deathType, legPos) {
    //this.bug.style.back
    if (!legPos) legPos = 0;
    var that = this;
    if (deathType === 0 || deathType === 1) {
      setTimeout(function () {
        that.bug.style.backgroundPosition = '-' + ((deathType * 2 + (legPos % 2)) * that.options.fly_width) + 'px -' + (3 * that.options.fly_height) + 'px';
        that.twitch(deathType, ++legPos);
      }, this.random(100, 1000));
    }
  },

  /* helper methods: */
  rad2deg: function (rad) {
    return rad * this.rad2deg_k;
  },
  deg2rad: function (deg) {
    return deg * this.deg2rad_k;
  },
  random: function (min, max, plusminus) {
    var result = Math.round(min - 0.5 + (Math.random() * (max - min + 1)));
    if (plusminus) return Math.random() > 0.5 ? result : -result;
    return result;
  },

  next_small_turn: function () {
    this.small_turn_counter = Math.round(Math.random() * 10);
  },
  next_large_turn: function () {
    this.large_turn_counter = Math.round(Math.random() * 40);
  },
  next_stationary: function () {
    this.toggle_stationary_counter = this.random(50, 300);
  },

  bug_near_window_edge: function () {
    this.near_edge = 0;
    if (this.bug.top < this.options.edge_resistance)
      this.near_edge |= this.NEAR_TOP_EDGE;
    else if (this.bug.top > document.documentElement.clientHeight - this.options.edge_resistance)
      this.near_edge |= this.NEAR_BOTTOM_EDGE;
    if (this.bug.left < this.options.edge_resistance)
      this.near_edge |= this.NEAR_LEFT_EDGE;
    else if (this.bug.left > document.documentElement.clientWidth - this.options.edge_resistance)
      this.near_edge |= this.NEAR_RIGHT_EDGE;
    return this.near_edge;
  },

  getPos: function () {
    if (this.inserted && this.bug && this.bug.style) {
      return {
        'top': parseInt(this.bug.style.top, 10),
        'left': parseInt(this.bug.style.left, 10)
      };
    }
    return null;
  }

};

var SpawnBug = function () {
  var newBug = {}, prop;
  for (prop in Bug) {
    if (Bug.hasOwnProperty(prop)) {
      newBug[prop] = Bug[prop];
    }
  }
  return newBug;
};

// debated about which pattern to use to instantiate each bug...
// see http://jsperf.com/obj-vs-prototype-vs-other



/**
 * Helper methods:
 **/

var mergeOptions = function (obj1, obj2, clone) {
  if(typeof(clone) == 'undefined') { clone = true; }
  var newobj = (clone) ? cloneOf(obj1) : obj1;
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      newobj[key] = obj2[key];
    }
  }
  return newobj;
};

var cloneOf = function(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp[key] = cloneOf(obj[key]);
      }
    }
    return temp;
}

/* Request animation frame polyfill */
/* http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();