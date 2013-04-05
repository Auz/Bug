

var BugDispatch = {
	
	options: {
		minDelay: 500,
		maxDelay: 10000,
		minBugs: 1,
		maxBugs: 30,
		minSpeed: 1,
		maxSpeed: 3,
		imageSprite: 'fly-sprite.png',
    	fly_width: 13,
	 	fly_height: 14,
	 	num_frames: 5,
		monitorMouseMovement: false,
		eventDistanceToBug: 40,
		minTimeBetweenMultipy: 1000, 
		mouseOver: 'multiply' // can be 'fly' or 'multiply'
	},

	initialize: function(options){
		this.options = merge_options(this.options, options);

		// can we transform?
		this.transform = null;
		
		this.transformFns = {
			        'MozTransform' : function(s) { this.bug.style.MozTransform = s; },
			        'WebkitTransform' : function(s) { this.bug.style.WebkitTransform = s; },
			        'OTransform' : function(s) { this.bug.style.OTransform = s; },
			        'MsTransform' : function(s) { this.bug.style.msTransform = s; },
			        'KhtmlTransform' : function(s) { this.bug.style.KhtmlTransform = s; },
			        'W3Ctransform' : function(s) { this.bug.style.transform = s; }
		 };
			      
		this.transforms = {
			        'Moz': this.transformFns.MozTransform,
			        'Webkit': this.transformFns.WebkitTransform,
			        'O': this.transformFns.OTransform,
			        'Ms': this.transformFns.MsTransform,
			        'Khtml': this.transformFns.KhtmlTransform,
			        'w3c': this.transformFns.W3Ctransform
		};
			    
		if ('transform' in document.documentElement.style) this.transform = this.transforms['w3c'];
		var vendors = 'Moz Webkit O Ms Khtml'.split(' ');
		for (var i in vendors) {
			if (vendors[i] + 'Transform' in document.documentElement.style) {
				this.transform = this.transforms[vendors[i]];
		        break;
			}
		}

		var that = this;
		

		// make bugs:
		this.bugs = [];
		var numBugs = (this.options.mouseOver == 'multiply') ? this.options.minBugs : this.random(this.options.minBugs, this.options.maxBugs, true);
		for(var i = 0; i<numBugs; i++) {
			var options = {
				imageSprite: this.options.imageSprite,
			    fly_width: this.options.fly_width,
			    fly_height: this.options.fly_height,
			    num_frames: this.options.num_frames,
				wingsOpen: (Math.random() > 0.5) ? true : false,
				walkSpeed: this.random(this.options.minSpeed, this.options.maxSpeed)
			};
			var b = SpawnBug(); 
			b.initialize(this.transform, options);
			this.bugs.push(b);
		}

		// fly them in staggered:
		for(var i = 0; i< numBugs; i++) {
			var delay = this.random(this.options.minDelay, this.options.maxDelay, true),
				thebug = this.bugs[i];
			// fly the bug onto the page:
			setTimeout((function(thebug){
				return function() {
					thebug.flyIn();
				};
			})(thebug), delay);

			// add mouse over events:
			that.add_events_to_bug(thebug);
		}
		
		// add window event if required:
		if(this.options.monitorMouseMovement) {
			window.onmousemove = function(){
				that.check_if_mouse_close_to_bug();
			};
		}
		
	},

	add_events_to_bug: function(thebug) {
		var that = this;
		if(thebug.bug) {
			thebug.bug.addEventListener('mouseover', function(e){
				that.on_bug(thebug);
			});
		}
	},
	
	check_if_mouse_close_to_bug: function(e) {
		e = e || window.event;
		if(!e) return;

	    var posx = 0, posy = 0;
	    if(e.client && e.client.x) {
	    	posx = e.client.x;
	    	posy = e.client.y;
	    } else if (e.clientX) {
	      posx = e.clientX;
	      posy = e.clientY;
	    } else if(e.page && e.page.x) {
	    	posx = e.page.x - (document.body.scrollLeft + document.documentElement.scrollLeft);
	        posy = e.page.y - (document.body.scrollTop + document.documentElement.scrollTop);
	    } else if (e.pageX) {
	      posx = e.pageX - (document.body.scrollLeft + document.documentElement.scrollLeft);
	      posy = e.pageY - (document.body.scrollTop + document.documentElement.scrollTop);
	    }
	    var numBugs = this.bugs.length;
	    for(var i = 0; i< numBugs; i++) {
			var pos = this.bugs[i].getPos();
			if(pos) {
				if(Math.abs(pos.top - posy) + Math.abs(pos.left - posx) < this.options.eventDistanceToBug && !this.bugs[i].flyperiodical) {
					this.near_bug(this.bugs[i]);
				}
			}
		}
	    
	},
	
	near_bug: function(bug){
		this.on_bug(bug);
	},

	on_bug: function(bug) {
		if(this.options.mouseOver == 'fly') {
			// fly away!
			bug.stop();
			bug.flyRand();
		} else if(this.options.mouseOver == 'multiply') {
			if(!this.multiplyDelay && this.bugs.length < this.options.maxBugs) {
				// spawn another: 
				// create new bug:
				var b = SpawnBug(); //new Bug(this.transform, options);
				var options = {
					imageSprite: this.options.imageSprite,
				    fly_width: this.options.fly_width,
				    fly_height: this.options.fly_height,
				    num_frames: this.options.num_frames,
					wingsOpen: (Math.random() > 0.5) ? true : false,
					walkSpeed: this.random(this.options.minSpeed, this.options.maxSpeed)
				};
				b.initialize(this.transform, options);
				var pos = bug.getPos();
				b.drawBug(pos.top, pos.left);
				// fly them both away:
				b.flyRand();
				bug.flyRand();
				// store new bug:
				this.bugs.push(b);
				// watch out for spawning too quickly:
				this.multiplyDelay = true;
				var that = this;
				setTimeout(function(){
					// add event to this bug:
					that.add_events_to_bug(b);
					that.multiplyDelay = false;
				}, this.options.minTimeBetweenMultipy);
			}
			
		}
	},

	random : function(min, max, round) {
	    var result = ((min-0.5) + (Math.random() * (max - min + 1)));
	    if(result > max) result = max;
	    if(result < min) result = min;
	    return (round) ? Math.round(result) : result;
	}

	
};

var BugController = function() {
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
  
  initialize: function(transform, options){


  	this.options = merge_options(this.options, options);

    this.NEAR_TOP_EDGE = 1;
    this.NEAR_BOTTOM_EDGE = 2;
    this.NEAR_LEFT_EDGE = 4;
    this.NEAR_RIGHT_EDGE = 8;
    this.directions = {};  // 0 degrees starts on the East
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

    this.rad2deg_k = 180 / Math.PI;
    this.deg2rad_k = Math.PI / 180;

    this.makeBug();
    
    this.angle_rad = this.deg2rad(this.angle_deg);

    this.angle_deg = this.random(0, 360, true);

  },

  go: function() {
	if (this.transform) {
		this.drawBug();
		var that = this;
		
		this.going = setInterval(function(){ that.animate(); }, 40);
		//this.going = requestAnimFrame(function(t){ that.animate(t); });
    }
  },
  
  stop: function() {
	  if(this.going) {
		  clearTimeout(this.going);
		  this.going = null;
	  }
	  if(this.flyperiodical) {
		  clearTimeout(this.flyperiodical);
		  this.flyperiodical = null;
	  }
  },
  
  animate : function() {

    
    if (--this.toggle_stationary_counter <= 0){
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
      if (this.large_turn_angle_deg > 0 && dangle < 0 || this.large_turn_angle_deg < 0 && dangle > 0)
        dangle = -dangle;  // ensures both values either + or -
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

  makeBug : function() {
    if(!this.bug) {
      var row = (this.wingsOpen) ? '0' : '-'+this.options.fly_height+'px';
      var bug = document.createElement('div');
      bug['class'] ='bug';
      bug.style.background = 'transparent url('+this.options.imageSprite+') no-repeat 0 '+row;
      bug.style.width = this.options.fly_width+'px';
      bug.style.height = this.options.fly_height+'px';
      bug.style.position = 'fixed';
      bug.style.zIndex = '9999999';

      this.bug = bug;
      this.setPos();

    }

  },

  setPos: function(top, left) {
  	this.bug.top = top || this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
	//bug.top = bug.top < 0 ? -bug.top : bug.top;
	this.bug.left = left || this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);
	//bug.left = bug.left < 0 ? -bug.left : bug.left;
	this.bug.style.top = this.bug.top + 'px';
	this.bug.style.left = this.bug.left + 'px';
  },

  drawBug : function(top, left) {
  	
    if(!this.bug) {
      this.makeBug();
    }
    if(top && left) {
    	this.setPos(top, left);
    }
    if(!this.inserted) {
    	this.inserted = true;
    	document.body.appendChild(this.bug);
    }
  },

  toggleStationary : function() {
    this.stationary = ! this.stationary;
    this.next_stationary();
    var ypos = (this.options.wingsOpen) ? '0' : '-' + this.options.fly_height + 'px';
    if (this.stationary) {
      this.bug.style.backgroundPosition = '0 ' + ypos;
    } else {
      this.bug.style.backgroundPosition = '-' + this.options.fly_width + 'px ' + ypos;
    }
  },

  walkFrame : function() {
    var xpos = (-1 * (this.walkIndex * this.options.fly_width)) + 'px',
    	ypos = (this.wingsOpen) ? '0' : '-' + this.options.fly_height + 'px';
    this.bug.style.backgroundPosition = xpos + ' ' + ypos;
    this.walkIndex++;
    if(this.walkIndex >= this.options.num_frames) this.walkIndex = 0;
  },

  moveBug : function(dx, dy) {
    this.bug.style.top = (this.bug.top += dy) + 'px';
    this.bug.style.left = (this.bug.left += dx) + 'px';
  },

  fly : function(landingPosition) {
	  var currentTop = parseInt(this.bug.style.top),
	  	currentLeft = parseInt(this.bug.style.left),
	  	diffx = (currentLeft - landingPosition.left),
	  	diffy = (currentTop - landingPosition.top),
	  	angle = Math.atan(diffy/diffx),
	  	that = this;
	  
	  if(Math.abs(diffx) + Math.abs(diffy) < 50) {
		  this.bug.style.backgroundPosition = (-2 * this.options.fly_width) + 'px 100%';
	  }
	  if(Math.abs(diffx) + Math.abs(diffy) < 30) {
		  this.bug.style.backgroundPosition = (-1 * this.options.fly_width) + 'px 100%';
	  }
	  if(Math.abs(diffx) + Math.abs(diffy) < 10) {
		  // close enough:
		  this.bug.style.backgroundPosition = '0 0';//+row+'px'));
		  
		  this.stop();
		  this.go();
		  //this.go.delay(100, this);
		 
		 return;
		
	  }
	  //this.options.flySpeed = .2;
	  // make it wiggle:
	  //angle = angle - (this.deg2rad(this.random(0,10)));
	  //console.log('angle: ',this.rad2deg(angle));
	 
	  var dx = Math.cos(angle) * this.options.flySpeed,
	  	dy = Math.sin(angle) * this.options.flySpeed;
	  
	  if((currentLeft > landingPosition.left && dx > 0) || (currentLeft > landingPosition.left && dx < 0)) {
		  // make sure angle is right way
		  dx = -1 * dx;
		  if(Math.abs(diffx) < Math.abs(dx)) {
			  dx = dx / 4;
		  }
	  }
	  if((currentTop < landingPosition.top && dy < 0) || (currentTop > landingPosition.top && dy > 0)) {
		  dy = -1 * dy;
		  if(Math.abs(diffy) < Math.abs(dy)) {
			  dy = dy / 4;
		  }
	  }
	  
	  //console.log('aiming for: (left, top) ', landingPosition.left, landingPosition.top,' current pos (left,top):', currentLeft,currentTop,  ' setting dx, dy : ', dx, dy, ' angle:', this.rad2deg(angle));
	  this.bug.style.top = (currentTop + dy) + 'px';
	  this.bug.style.left = (currentLeft + dx) + 'px';
	  
  },

  flyRand: function() {
	  this.stop();
	  var landingPosition = {};
	  landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
	  //landingPosition.top = landingPosition.top > 0 ? landingPosition.top : -landingPosition.top;
	  landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);
	  //landingPosition.left = landingPosition.left > 0 ? landingPosition.left : -landingPosition.left;
      
	  this.startFlying(landingPosition);
  },
  
  startFlying: function(landingPosition) {
	  this.bug.left = landingPosition.left;
	  this.bug.top = landingPosition.top;
	  
	  var currentTop = parseInt(this.bug.style.top),
	  	currentLeft = parseInt(this.bug.style.left),
	  	diffx = (landingPosition.left - currentLeft),
	  	diffy = (landingPosition.top - currentTop);

	  this.angle_rad = Math.atan(diffy/diffx);
	  this.angle_deg = this.rad2deg(this.angle_rad);

	  if(diffx > 0 ) {
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
	  this.flyperiodical = setInterval(function(){
	  	that.fly(landingPosition);
	  }, 10); //this.fly.periodical(10, this, [landingPosition]);
  },
  
  flyIn: function() {
	  if(!this.bug) {
	    this.makeBug();
	  }
	  this.stop();
	  // pick a random side:
	  var side = Math.round(Math.random()*4 - .5),
	  	d = document,
		e = d.documentElement,
    	g = d.getElementsByTagName('body')[0],
	 	windowX = window.innerWidth || e.clientWidth || g.clientWidth,
    	windowY = window.innerHeight|| e.clientHeight|| g.clientHeight;
	  if(side > 3) side = 3;
	  if(side < 0) side = 0;
	  var style = {};
	  if(side == 0) { 
		  // top:
		  style.top = -20;
		  style.left = Math.random() * windowX;
	  } else if(side == 1) {
		  style.top = Math.random() * windowY;
		  style.left = windowX + 50;
	  } else if(side == 2) {
		  //bottom:
		  style.top = windowY + 50;
		  style.left = Math.random() * windowX;
	  } else {
		  // left: 
		  style.top = Math.random() * windowY;
		  style.left = -40;
	  }
	  style['background-position'] = (-3 * this.options.fly_width) + 'px 100%';
	  for(var s in style) {
		this.bug.style[s] = style[s];
	  }

	  this.drawBug();
	  /*
	  if(!this.inserted) {
		  document.body.appendChild(this.bug);
		  this.inserted = true;
	  }
	  */
	  // landing position:
	  var landingPosition = {};
	  landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
	  //landingPosition.top = landingPosition.top > 0 ? landingPosition.top : -landingPosition.top;
	  landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);
	  //landingPosition.left = landingPosition.left > 0 ? landingPosition.left : -landingPosition.left;
	  
	 this.startFlying(landingPosition);
  },
 
  flyOff: function() {
	  this.stop();
	  var side = Math.round(Math.random()*5 - .5);
	  if(side > 3) side = 3;
	  if(side < 0) side = 0;
	  var style = {},
	  	d = document,
	 	e = d.documentElement,
    	g = d.getElementsByTagName('body')[0],
    	windowX = window.innerWidth || e.clientWidth || g.clientWidth,
    	windowY = window.innerHeight|| e.clientHeight|| g.clientHeight;

	  if(side == 0) { 
		  // top:
		  style.top = -200;
		  style.left = Math.random() * windowX;
	  } else if(side == 1) {
		  style.top = Math.random() * windowY;
		  style.left = windowX + 200;
	  } else if(side == 2) {
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

  /* helper methods: */
  rad2deg : function(rad) { return rad * this.rad2deg_k; },
  deg2rad : function(deg) { return deg * this.deg2rad_k; },
  random : function(min, max, plusminus) {
    var result = Math.round(min - 0.5 + (Math.random() * (max - min + 1)));
    if(plusminus) return Math.random() > 0.5 ? result : -result;
    return result;
  },
  
  next_small_turn : function() { this.small_turn_counter = Math.round(Math.random() * 10); },
  next_large_turn : function() { this.large_turn_counter = Math.round(Math.random() * 40); },
  next_stationary : function() { this.toggle_stationary_counter = this.random(50, 300); },
  
  bug_near_window_edge : function() {
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
  
  getPos: function() {
  	if(this.inserted && this.bug && this.bug.style) {
	  return {'top': parseInt(this.bug.style.top), 'left': parseInt(this.bug.style.left)};
	}
	return null;
  }

};

var SpawnBug = function(){
	var newBug = {};
	for(var prop in Bug) {
        if(Bug.hasOwnProperty(prop)) {
            newBug[prop] = Bug[prop];
        }
    }
    return newBug;
};

// debated about which pattern to use to instanciate each bug...
// see http://jsperf.com/obj-vs-prototype-vs-other





/**
 * Helper methods:
**/

var merge_options = function(obj1, obj2) {
	for(var key in obj2) { 
		if(obj2.hasOwnProperty(key)) {
			obj1[key] = obj2[key];
		}
	}
	return obj1;
};


/* Request animation frame polyfill */
/* http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
	window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
