Bug
===========

Adds bugs to your page. 



Features
--------

* Creates multiple fruit flies which fly and walk around the page.
* Flys are responsive to mouse movements (optional) and mouse overs events.

Dependancies
------------

* None, all native js code

Demo
----

http://jsfiddle.net/snfmn/


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
See example.html 

BugController constructor can optionally take an object of options. To make this js more async friendly, you can adjust the default options at the top of bug.js, and then instantiate at the bottom of the file as above. This will allow one to wrap the entire script in a closure to prevent any global window name space overlaps.


Options
-------


* minDelay - Minimum delay before a bug will appear on the page. (default: 500)
* maxDelay - Maximum delay before a bug will appear on the page. (default: 10000)
* minBugs - Minumum number of bugs to show. (default: 1)
* maxBugs - Maximum number of bugs to show. (default: 20)
* minSpeed - Minimum speed of a bug, in no particular units. (default: 1)
* maxSpeed - Maximum speed of a bug, in no particular units. (default: 3)
* imageSprite - Location of the fly sprite sheet. (default: 'fly-sprite.png')
* fly_width - The width of the fly sprite cell, and also div width. (default: 13)
* fly_height - The height of the fly sprite cell, and also div height. (default: 14)
* num_frames - The number of frames in the sprite walk animation. (default: 5)
* monitorMouseMovement - If enabled, a mousemove event will be added to the window, and used to detect if the cursor is near a fly. Probably best to leave this one off. (default: false)
* eventDistanceToBug - If monitorMouseMovemenet is enabled, this is the distance from the bug in pixels which will trigger the near bug event. (default: 40)
* minTimeBetweenMultipy - When in 'multiply' mode, this is the minimum time in ms between a multiply event. (default: 1000)
* mouseOver - What to do when the mouse is over (or near) a fly. Can be 'fly', 'flyoff', 'die', 'multiply', or 'random'. See Modes. (default: random)


Modes
-----

* random: Randomly pick one of the other modes on each mouse over/near event
* fly: The bug will fly away to another random point on the page
* flyoff: The bug will fly off the screen... and slowly work its way back
* multiply: The bug will spawn a new bug and both will fly away to other parts of the page
* die: The bug will be struck dead, and fall to the bottom of the page

Credits
-------

Original Screen Bug http://screen-bug.googlecode.com/git/index.html

Released under WTFPL license.
