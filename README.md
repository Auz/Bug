Bug
===========

Add bugs to your page.



Features
--------

* Creates multiple fruit flys which fly and walk around the browser window.
* Creates multiple spiders which walk around the browser window.
* Flys are responsive to mouse movements (optional) and mouseover events.


Demo
----

See project page: http://auz.github.io/Bug/


Dependencies
------------

None, all native js code


Compatibility
-------------

Works on all browsers that support CSS3 transforms, even mobile (that I've tested).

See http://caniuse.com/transforms2d


How to use
----------

Include the JS somewhere, and then initialize with
```js
  new BugController();
```
or
```js
  new BugController({'minBugs':10, 'maxBugs':50, 'mouseOver':'die'});
```
You can use SpiderController() as a shortcut for loading options and the sprite for the spiders.

```
  new SpiderController({'minBugs':2, 'maxBugs':6});
```

See example.html

BugController constructor can optionally take an object of options. To make this js more async friendly, you can adjust the default options at the top of bug.js, and then instantiate at the bottom of the file as above. This will allow one to wrap the entire script in a closure to prevent any global window name space overlaps.

Async code:
```
  var targethead = window.document.getElementsByTagName("head")[0],
    loadedSpiders = false,
    jst = window.document.createElement("script");
  jst.async = true;
  jst.type = "text/javascript";
  jst.src = "/path/to/bug-min.js";
  jst.onload = jst.onreadystatechange = function() {
    if (!loadedSpiders && (!this.readyState || this.readyState == 'complete')) {
      loadedSpiders = true;
      // start fire the JS.
      new BugController();
    }
  };
  targethead.appendChild(jst);
```

Options
-------

* minDelay - Minimum delay before a bug will appear on the page. (default: 500)
* maxDelay - Maximum delay before a bug will appear on the page. (default: 10000)
* minBugs - Minumum number of bugs to show. (default: 1)
* maxBugs - Maximum number of bugs to show. (default: 20)
* minSpeed - Minimum speed of a bug, in no particular units. (default: 1)
* maxSpeed - Maximum speed of a bug, in no particular units. (default: 3)
* imageSprite - Location of the fly sprite sheet. (default: 'fly-sprite.png')
* bugWidth - The width of the fly sprite cell, and also div width. (default: 13)
* bugHeight - The height of the fly sprite cell, and also div height. (default: 14)
* num_frames - The number of frames in the sprite walk animation. (default: 5)
* monitorMouseMovement - If enabled, a mousemove event will be added to the window, and used to detect if the cursor is near a fly. Probably best to leave this one off. (default: false)
* eventDistanceToBug - If monitorMouseMovemenet is enabled, this is the distance from the bug in pixels which will trigger the near bug event. (default: 40)
* minTimeBetweenMultipy - When in 'multiply' mode, this is the minimum time in ms between a multiply event. (default: 1000)
* mouseOver - What to do when the mouse is over (or near) a fly. Can be 'fly', 'flyoff' (if we the bug canFly), 'die', 'multiply', or 'random'. See Modes. (default: random)
* canFly - Whether or not to allow fly modes, and to use wings open animation (second row of sprite, default: true).
* canDie - Whether or not to allow the bug to 'die' - need bottom row of sprite with dead version. (default: true)
* zoom - Minimum amount to scale the bug, out of 10. So a zoom of 5 would randomly choose a zoom (css scale) value between 1/2 and 1 for each bug size.   (default: 10 - no zooming)
* maxLargeTurnDeg - When making a large turn, the maximum number of degrees to turn. (default: 150)
* maxSmallTurnDeg - When making a smaller turn, the maximum number of degrees to turn. (default: 10)
* maxWiggleDeg - When wiggling around the screen, this is the maximum number of degrees to turn. (default: 5),

Modes
-----

* random: Randomly pick one of the other modes on each mouse over/near event
* fly: The bug will fly away to another random point on the page (if 'canFly' is true)
* flyoff: The bug will fly off the screen... and slowly work its way back (if 'canFly' is true)
* multiply: The bug will spawn a new bug and both will fly away to other parts of the page
* nothing: Do nothing
* die: The bug will be struck dead, and fall to the bottom of the page

Credits
-------

Original Screen Bug http://screen-bug.googlecode.com/git/index.html

Released under WTFPL license.
