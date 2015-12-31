// @author: Sean Higgins

// For now I guess this is a touchable widget intended to make the gui.
/* ======================================================================== */
function Widget( png, place ) {

	// Variables
	this.gob = new Gob( png );
	this.gob.dock( place );
	this.gob.origin( place );
	this.acts = [];

	this.cycle = function() {
		for( var i = 0; i < this.acts.length; i += 1 ) {
			var act = this.acts[i];
			if( act.type == "press" ) {
				if( startTouchIn(act.x, act.y, act.width, act.height) ) {
					starttouch = {
						'pageX': -1,
						'pageY': -1
					}
					act.action();
				}
			}
			else {
				if( touchIn(act.x, act.y, act.width, act.height) ) {
					act.action();
				}
			}
		}
	}

	this.newAct = function(x, y, w, h, type, callback) {
		var act = new WidgetAct();
		act.x = x;
		act.y = y;
		act.width = w;
		act.height = h;
		act.type = type;
		act.action = callback;
		this.acts.push( act );
	}
}

// Action
/* ======================================================================== */
function WidgetAct() {

	// The location of the touch action.
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;

	// This is intended to be the callback function to this action.  YOU CAN DO ANYTHING!  
	// The arguments are the X and Y relative to the action x and y on a ratio.  Between 0.0 and 1.0
	this.action = function(){};
}