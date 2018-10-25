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
 * copyright: Copyright (c) 2016 Graham McNicoll
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
        minSpeed: 5,
        maxSpeed: 10,
        maxLargeTurnDeg: 150,
        maxSmallTurnDeg: 10,
        maxWiggleDeg: 5,
        imageSprite: 'data:image/png;base64,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',
        bugWidth: 13,
        bugHeight: 14,
        num_frames: 5,
        zoom: 10, // random zoom variation from 1 to 10 - 10 being full size.
        canFly: true,
        canDie: true,
        numDeathTypes: 3,
        monitorMouseMovement: false,
        eventDistanceToBug: 40,
        minTimeBetweenMultipy: 1000,
        mouseOver: 'random' // can be 'fly', 'flyoff' (if the bug can fly), die', 'multiply', 'nothing' or 'random'
    },

    initialize: function(options) {

        this.options = mergeOptions(this.options, options);

        // sanity check:
        if (this.options.minBugs > this.options.maxBugs) {
            this.options.minBugs = this.options.maxBugs;
        }

        this.modes = ['multiply', 'nothing'];

        if (this.options.canFly) {
            this.modes.push('fly', 'flyoff');
        }
        if (this.options.canDie) {
            this.modes.push('die');
        }

        if (this.modes.indexOf(this.options.mouseOver) == -1) {
            // invalid mode: use random:
            this.options.mouseOver = 'random';
        }

        // can we transform?
        this.transform = null;

        this.transforms = {
            'Moz': function(s) {
                this.bug.style.MozTransform = s;
            },
            'webkit': function(s) {
                this.bug.style.webkitTransform = s;
            },
            'O': function(s) {
                this.bug.style.OTransform = s;
            },
            'ms': function(s) {
                this.bug.style.msTransform = s;
            },
            'Khtml': function(s) {
                this.bug.style.KhtmlTransform = s;
            },
            'w3c': function(s) {
                this.bug.style.transform = s;
            }
        };


        // check to see if it is a modern browser:

        if ('transform' in document.documentElement.style) {
            this.transform = this.transforms.w3c;
        } else {

            // feature detection for the other transforms:
            var vendors = ['Moz', 'webkit', 'O', 'ms', 'Khtml'],
                i = 0;

            for (i = 0; i < vendors.length; i++) {
                if (vendors[i] + 'Transform' in document.documentElement.style) {
                    this.transform = this.transforms[vendors[i]];
                    break;
                }
            }
        }

        // dont support transforms... quit
        if (!this.transform) return;

        // make bugs:
        this.bugs = [];
        var numBugs = (this.options.mouseOver === 'multiply') ? this.options.minBugs : this.random(this.options.minBugs, this.options.maxBugs, true),
            i = 0,
            that = this;

        for (i = 0; i < numBugs; i++) {
            var options = JSON.parse(JSON.stringify(this.options)),
                b = SpawnBug();

            options.wingsOpen = (this.options.canFly) ? ((Math.random() > 0.5) ? true : false) : true,
                options.walkSpeed = this.random(this.options.minSpeed, this.options.maxSpeed),

                b.initialize(this.transform, options);
            this.bugs.push(b);
        }

        // fly them in staggered:
        this.spawnDelay = [];
        for (i = 0; i < numBugs; i++) {
            var delay = this.random(this.options.minDelay, this.options.maxDelay, true),
                thebug = this.bugs[i];
            // fly the bug onto the page:
            this.spawnDelay[i] = setTimeout((function(thebug) {
                return function() {
                    if (that.options.canFly) {
                        thebug.flyIn();
                    } else {
                        thebug.walkIn();
                    }

                };
            }(thebug)), delay);

            // add mouse over events:
            that.add_events_to_bug(thebug);
        }

        // add window event if required:
        if (this.options.monitorMouseMovement) {
            window.onmousemove = function() {
                that.check_if_mouse_close_to_bug();
            };
        }

    },

    stop: function() {
        for (var i = 0; i < this.bugs.length; i++) {
            if(this.spawnDelay[i]) clearTimeout(this.spawnDelay[i]);
            this.bugs[i].stop();
        }
    },

    end: function() {
        for (var i = 0; i < this.bugs.length; i++) {
        	if(this.spawnDelay[i]) clearTimeout(this.spawnDelay[i]);
            this.bugs[i].stop();
            this.bugs[i].remove();
        }
    },

    reset: function() {
        this.stop();
        for (var i = 0; i < this.bugs.length; i++) {
            this.bugs[i].reset();
            this.bugs[i].walkIn();
        }
    },

    killAll: function() {
        for (var i = 0; i < this.bugs.length; i++) {
        	if(this.spawnDelay[i]) clearTimeout(this.spawnDelay[i]);
            this.bugs[i].die();
        }
    },

    add_events_to_bug: function(thebug) {
        var that = this;
        if (thebug.bug) {
            if (thebug.bug.addEventListener) {
                thebug.bug.addEventListener('mouseover', function(e) {
                    that.on_bug(thebug);
                });
            } else if (thebug.bug.attachEvent) {
                thebug.bug.attachEvent('onmouseover', function(e) {
                    that.on_bug(thebug);
                });
            }
        }
    },

    check_if_mouse_close_to_bug: function(e) {
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

    near_bug: function(bug) {
        this.on_bug(bug);
    },

    on_bug: function(bug) {
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
        } else if (mode === 'nothing') {
            return;
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
                    options = JSON.parse(JSON.stringify(this.options)),
                    pos = bug.getPos(),
                    that = this;

                options.wingsOpen = (this.options.canFly) ? ((Math.random() > 0.5) ? true : false) : true;
                options.walkSpeed = this.random(this.options.minSpeed, this.options.maxSpeed);

                b.initialize(this.transform, options);
                b.drawBug(pos.top, pos.left);
                // fly them both away:
                if (options.canFly) {
                    b.flyRand();
                    bug.flyRand();
                } else {
                    b.go();
                    bug.go();
                }
                // store new bug:
                this.bugs.push(b);
                // watch out for spawning too quickly:
                this.multiplyDelay = true;
                setTimeout(function() {
                    // add event to this bug:
                    that.add_events_to_bug(b);
                    that.multiplyDelay = false;
                }, this.options.minTimeBetweenMultipy);
            }

        }
    },

    random: function(min, max, round) {
        if (min == max) return ((round) ? Math.round(min) : min);

        var result = ((min - 0.5) + (Math.random() * (max - min + 1)));
        if (result > max) {
            result = max;
        } else if (result < min) {
            result = min;
        }
        return ((round) ? Math.round(result) : result);
    }


};

var BugController = function() {
    this.initialize.apply(this, arguments);
}
BugController.prototype = BugDispatch;

var SpiderController = function() {
    var spiderOptions = {
        imageSprite: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgEAAAC0CAYAAAANfv+OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjE0YTllMC0wYzk1LTQwOWEtOGNiMi01OTM0OGYxNDk4NzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM2NEExRkY0QUI3MTFFNDgwRTZGQzlCNTY0MTNDMEQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM2NEExRkU0QUI3MTFFNDgwRTZGQzlCNTY0MTNDMEQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyYWRiYWM3LTM2ZGYtNGE5Yi1hZjcwLTIyMTgzNDdkMDc0NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NGQ2NDhkNi05OGFiLTRjMzEtOTkzYS04NjA2OWRlODdlNWIiLz4gPC9y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',
        bugWidth: 69,
        bugHeight: 90,
        num_frames: 7,
        canFly: false,
        canDie: true,
        numDeathTypes: 2,
        zoom: 6,
        minDelay: 200,
        maxDelay: 3000,
        minSpeed: 6,
        maxSpeed: 13,
        minBugs: 3,
        maxBugs: 10
    };
    this.options = mergeOptions(this.options, spiderOptions);
    this.initialize.apply(this, arguments);

}
SpiderController.prototype = BugDispatch;

/***************/
/**    Bug    **/
/***************/

var Bug = {

    options: {
        wingsOpen: false,
        walkSpeed: 2,
        flySpeed: 40,
        edge_resistance: 50,
        zoom: 10

    },

    initialize: function(transform, options) {

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
        this.zoom = this.random(this.options.zoom, 10) / 10;

        this.stationary = false;
        this.bug = null;
        this.active = true;
        this.wingsOpen = this.options.wingsOpen;
        this.transform = transform;
        this.walkIndex = 0;
        this.flyIndex = 0;
        this.alive = true;
        this.twitchTimer = null;

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

            this.animating = true;

            this.going = requestAnimFrame(function(t) {
                that.animate(t);
            });
        }
    },

    stop: function() {
        this.animating = false;
        if (this.going) {
            clearTimeout(this.going);
            this.going = null;
        }
        if (this.flyperiodical) {
            clearTimeout(this.flyperiodical);
            this.flyperiodical = null;
        }
        if (this.twitchTimer) {
            clearTimeout(this.twitchTimer);
            this.twitchTimer = null;
        }
    },

    remove: function() {
    	this.active = false;
        if (this.inserted && this.bug.parentNode) {
            this.bug.parentNode.removeChild(this.bug);
            this.inserted = false;
        }
    },

    reset: function() {
        this.alive = true;
        this.active = true;
        this.bug.style.bottom = '';
        this.bug.style.top = 0;
        this.bug.style.left = 0;
    },

    animate: function(t) {

        if (!this.animating || !this.alive || !this.active) return;

        var that = this;
        this.going = requestAnimFrame(function(t) {
            that.animate(t);
        });

        if (!('_lastTimestamp' in this)) this._lastTimestamp = t;

        var delta = t - this._lastTimestamp;

        if (delta < 40) return; // don't animate too frequently

        // sometimes if the browser doesnt have focus, or the delta in request animation 
        // frame can be very large. We set a sensible max so that the bugs dont spaz out.

        if (delta > 200) delta = 200;

        this._lastTimestamp = t;

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
            this.large_turn_angle_deg = this.random(1, this.options.maxLargeTurnDeg, true);
            this.next_large_turn();
        }
        if (--this.small_turn_counter <= 0) {
            this.angle_deg += this.random(1, this.options.maxSmallTurnDeg);
            this.next_small_turn();
        } else {
            var dangle = this.random(1, this.options.maxWiggleDeg, true);
            if ((this.large_turn_angle_deg > 0 && dangle < 0) || (this.large_turn_angle_deg < 0 && dangle > 0)) {
                dangle = -dangle; // ensures both values either + or -
            }
            this.large_turn_angle_deg -= dangle;
            this.angle_deg += dangle;
        }

        this.angle_rad = this.deg2rad(this.angle_deg);

        var dx = Math.cos(this.angle_rad) * this.options.walkSpeed * (delta / 100);
        var dy = -Math.sin(this.angle_rad) * this.options.walkSpeed * (delta / 100);

        this.moveBug((this.bug.left + dx), (this.bug.top + dy), (90 - this.angle_deg));
        this.walkFrame();

    },

    makeBug: function() {
        if (!this.bug && this.active) {
            var row = (this.wingsOpen) ? '0' : '-' + this.options.bugHeight + 'px',
                bug = document.createElement('div');
            bug.className = 'bug';
            bug.style.background = 'transparent url(' + this.options.imageSprite + ') no-repeat 0 ' + row;
            bug.style.width = this.options.bugWidth + 'px';
            bug.style.height = this.options.bugHeight + 'px';
            bug.style.position = 'fixed';
            bug.style.top = 0;
            bug.style.left = 0;
            bug.style.zIndex = '9999999';

            this.bug = bug;
            this.setPos();

        }

    },

    setPos: function(top, left) {
        this.bug.top = top || this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);

        this.bug.left = left || this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);

        this.moveBug(this.bug.left, this.bug.top, (90 - this.angle_deg));
    },

    moveBug: function(x, y, deg) {
        // keep track of where we are:
        this.bug.left = x;
        this.bug.top = y;

        // transform:
        var trans = "translate(" + parseInt(x) + "px," + parseInt(y) + "px)";
        if (deg) {
            //console.log("translate("+(x)+"px, "+(y)+"px) rotate("+deg+"deg)");
            trans += " rotate(" + deg + "deg)";
        }
        trans += " scale(" + this.zoom + ")";

        this.transform(trans);

    },

    drawBug: function(top, left) {

        if (!this.bug) {
            this.makeBug();
        }
        if(!this.bug) return;

        if (top && left) {
            this.setPos(top, left);
        } else {
            this.setPos(this.bug.top, this.bug.left)
        }
        if (!this.inserted) {
            this.inserted = true;
            document.body.appendChild(this.bug);
        }
    },

    toggleStationary: function() {
        this.stationary = !this.stationary;
        this.next_stationary();
        var ypos = (this.wingsOpen) ? '0' : '-' + this.options.bugHeight + 'px';
        if (this.stationary) {

            this.bug.style.backgroundPosition = '0 ' + ypos;
        } else {
            this.bug.style.backgroundPosition = '-' + this.options.bugWidth + 'px ' + ypos;
        }
    },

    walkFrame: function() {
        var xpos = (-1 * (this.walkIndex * this.options.bugWidth)) + 'px',
            ypos = (this.wingsOpen) ? '0' : '-' + this.options.bugHeight + 'px';
        this.bug.style.backgroundPosition = xpos + ' ' + ypos;
        this.walkIndex++;
        if (this.walkIndex >= this.options.num_frames) this.walkIndex = 0;
    },

    fly: function(landingPosition) {
        var currentTop = this.bug.top,
            currentLeft = this.bug.left,
            diffx = (currentLeft - landingPosition.left),
            diffy = (currentTop - landingPosition.top),
            angle = Math.atan(diffy / diffx);

        if (Math.abs(diffx) + Math.abs(diffy) < 50) {
            this.bug.style.backgroundPosition = (-2 * this.options.bugWidth) + 'px -' + (2 * this.options.bugHeight) + 'px';
        }
        if (Math.abs(diffx) + Math.abs(diffy) < 30) {
            this.bug.style.backgroundPosition = (-1 * this.options.bugWidth) + 'px -' + (2 * this.options.bugHeight) + 'px';
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

        this.moveBug((currentLeft + dx), (currentTop + dy));

    },

    flyRand: function() {
        this.stop();
        var landingPosition = {};
        landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
        landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);

        this.startFlying(landingPosition);
    },

    startFlying: function(landingPosition) {

        var currentTop = this.bug.top,
            currentLeft = this.bug.left,
            diffx = (landingPosition.left - currentLeft),
            diffy = (landingPosition.top - currentTop);

        this.bug.left = landingPosition.left;
        this.bug.top = landingPosition.top;

        this.angle_rad = Math.atan(diffy / diffx);
        this.angle_deg = this.rad2deg(this.angle_rad);

        if (diffx > 0) {
            // going left: quadrant 1 or 2
            this.angle_deg = 90 + this.angle_deg;
        } else {
            // going right: quadrant 3 or 4
            this.angle_deg = 270 + this.angle_deg;
        }

        this.moveBug(currentLeft, currentTop, this.angle_deg);

        // start animation:
        var that = this;
        this.flyperiodical = setInterval(function() {
            that.fly(landingPosition);
        }, 10);
    },

    flyIn: function() {
        if (!this.bug) {
            this.makeBug();
        }
        
        if(!this.bug) return;

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
        var style = {},
            s;
        if (side === 0) {
            // top:
            style.top = (-2 * this.options.bugHeight);
            style.left = Math.random() * windowX;
        } else if (side === 1) {
            // right:
            style.top = Math.random() * windowY;
            style.left = windowX + (2 * this.options.bugWidth);
        } else if (side === 2) {
            // bottom:
            style.top = windowY + (2 * this.options.bugHeight);
            style.left = Math.random() * windowX;
        } else {
            // left: 
            style.top = Math.random() * windowY;
            style.left = (-3 * this.options.bugWidth);
        }
        var row = (this.wingsOpen) ? '0' : '-' + this.options.bugHeight + 'px';
        this.bug.style.backgroundPosition = (-3 * this.options.bugWidth) + 'px ' + row;
        this.bug.top = style.top
        this.bug.left = style.left

        this.drawBug();

        // landing position:
        var landingPosition = {};
        landingPosition.top = this.random(this.options.edge_resistance, document.documentElement.clientHeight - this.options.edge_resistance);
        landingPosition.left = this.random(this.options.edge_resistance, document.documentElement.clientWidth - this.options.edge_resistance);

        this.startFlying(landingPosition);
    },

    walkIn: function() {
        if (!this.bug) {
            this.makeBug();
        }
        
        if(!this.bug) return;

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
        var style = {},
            s;
        if (side === 0) {
            // top:
            style.top = (-1.3 * this.options.bugHeight);
            style.left = Math.random() * windowX;
        } else if (side === 1) {
            // right:
            style.top = Math.random() * windowY;
            style.left = windowX + (0.3 * this.options.bugWidth);
        } else if (side === 2) {
            // bottom:
            style.top = windowY + (0.3 * this.options.bugHeight);
            style.left = Math.random() * windowX;
        } else {
            // left: 
            style.top = Math.random() * windowY;
            style.left = (-1.3 * this.options.bugWidth);
        }
        var row = (this.wingsOpen) ? '0' : '-' + this.options.bugHeight + 'px';
        this.bug.style.backgroundPosition = (-3 * this.options.bugWidth) + 'px ' + row;
        this.bug.top = style.top
        this.bug.left = style.left

        this.drawBug();

        // start walking:
        this.go();

    },

    flyOff: function() {
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

    die: function() {
        this.stop();
        //pick death style:
        var deathType = this.random(0, this.options.numDeathTypes - 1);

        this.alive = false;
        this.drop(deathType);
    },

    drop: function(deathType) {
        var startPos = this.bug.top,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            finalPos = window.innerHeight || e.clientHeight || g.clientHeight,
            finalPos = finalPos - this.options.bugHeight,
            rotationRate = this.random(0, 20, true),
            startTime = Date.now(),
            that = this;

        this.dropTimer = requestAnimFrame(function(t) {
            that._lastTimestamp = t;
            that.dropping(t, startPos, finalPos, rotationRate, deathType);
        });

    },

    dropping: function(t, startPos, finalPos, rotationRate, deathType) {
        var elapsedTime = t - this._lastTimestamp,
            deltaPos = (0.002 * (elapsedTime * elapsedTime)),
            newPos = startPos + deltaPos;
        //console.log(t, elapsedTime, deltaPos, newPos);

        var that = this;


        if (newPos >= finalPos) {
            newPos = finalPos;
            clearTimeout(this.dropTimer);



            this.angle_deg = 0;
            this.angle_rad = this.deg2rad(this.angle_deg);
            this.transform("rotate(" + (90 - this.angle_deg) + "deg) scale(" + this.zoom + ")");
            this.bug.style.top = null;
            // because it is (or might be) zoomed and rotated, we cannot just just bottom = 0. Figure out real bottom position:
            var rotationOffset = ((this.options.bugWidth * this.zoom) - (this.options.bugHeight * this.zoom)) / 2;
            var zoomOffset = ((this.options.bugHeight) / 2) * (1 - this.zoom);
            this.bug.style.bottom = Math.ceil((rotationOffset - zoomOffset)) + 'px'; // because its rotated and zoomed.
            this.bug.style.left = this.bug.left + 'px';
            this.bug.style.backgroundPosition = '-' + ((deathType * 2) * this.options.bugWidth) + 'px 100%';


            this.twitch(deathType);

            return;
        }

        this.dropTimer = requestAnimFrame(function(t) {
            that.dropping(t, startPos, finalPos, rotationRate, deathType);
        });

        if (elapsedTime < 20) return;

        this.angle_deg = ((this.angle_deg + rotationRate) % 360);
        this.angle_rad = this.deg2rad(this.angle_deg);

        this.moveBug(this.bug.left, newPos, this.angle_deg);
    },

    twitch: function(deathType, legPos) {
        //this.bug.style.back
        if (!legPos) legPos = 0;
        var that = this;
        if (deathType === 0 || deathType === 1) {
            that.twitchTimer = setTimeout(function() {
                that.bug.style.backgroundPosition = '-' + ((deathType * 2 + (legPos % 2)) * that.options.bugWidth) + 'px 100%';
                that.twitchTimer = setTimeout(function() {
                    legPos++;
                    that.bug.style.backgroundPosition = '-' + ((deathType * 2 + (legPos % 2)) * that.options.bugWidth) + 'px 100%';
                    that.twitch(deathType, ++legPos);
                }, that.random(300, 800));
            }, this.random(1000, 10000));
        }
    },

    /* helper methods: */
    rad2deg: function(rad) {
        return rad * this.rad2deg_k;
    },
    deg2rad: function(deg) {
        return deg * this.deg2rad_k;
    },
    random: function(min, max, plusminus) {
        if (min == max) return min;
        var result = Math.round(min - 0.5 + (Math.random() * (max - min + 1)));
        if (plusminus) return Math.random() > 0.5 ? result : -result;
        return result;
    },

    next_small_turn: function() {
        this.small_turn_counter = Math.round(Math.random() * 10);
    },
    next_large_turn: function() {
        this.large_turn_counter = Math.round(Math.random() * 40);
    },
    next_stationary: function() {
        this.toggle_stationary_counter = this.random(50, 300);
    },

    bug_near_window_edge: function() {
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
        if (this.inserted && this.bug && this.bug.style) {
            return {
                'top': parseInt(this.bug.top, 10),
                'left': parseInt(this.bug.left, 10)
            };
        }
        return null;
    }

};

var SpawnBug = function() {
    var newBug = {},
        prop;
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

var mergeOptions = function(obj1, obj2, clone) {
    if (typeof(clone) == 'undefined') {
        clone = true;
    }
    var newobj = (clone) ? cloneOf(obj1) : obj1;
    for (var key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            newobj[key] = obj2[key];
        }
    }
    return newobj;
};

var cloneOf = function(obj) {
    if (obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = cloneOf(obj[key]);
        }
    }
    return temp;
}

/* Request animation frame polyfill */
/* http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame || function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

chrome.storage.sync.get({
    bugBugs: false,
    bugSpiders: true,
    bugMax: 3,
    bugMin: 1,
    bugDelay: 2.5,
    bugOdds: 100
  }, function(items) {

    var rand = Math.random()*100;

    if(items.bugOdds > rand) {
        if(items.bugMin > items.bugMax) items.bugMin = items.bugMax;

        if(items.bugBugs && items.bugSpiders) {
            // need to split:
            var splitPercentage = Math.random(); 
            var minSpiders = parseInt(splitPercentage*items.bugMin);
            var minBugs = items.bugMin - minSpiders;
            var maxSpiders = parseInt(splitPercentage*items.bugMax);
            var maxBugs = items.bugMax - maxSpiders;
            if(maxBugs > 0) {
                new BugController({'minBugs':minBugs, 'maxBugs':maxBugs, 'minDelay':items.bugDelay*1000});
            }
            if(maxSpiders > 0) {
                new SpiderController({'minBugs':minSpiders, 'maxBugs':maxSpiders, 'minDelay':items.bugDelay*1000});
            }
        } else if(items.bugBugs) {
            new BugController({'minBugs':items.bugMin, 'maxBugs':items.bugMax, 'minDelay':items.bugDelay*1000});
        } else if(items.bugSpiders) {
            new SpiderController({'minBugs':items.bugMin, 'maxBugs':items.bugMax, 'minDelay':items.bugDelay*1000});
        }
    }
  });