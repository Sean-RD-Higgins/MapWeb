// @author: Sean Higgins
document.onkeydown=function(e) {
	e = window.event || e;
	if(e.which != undefined) {
		key[e.which] = true;
	}
	else {
		key[e.keyCode] = true;
	}
}
document.onkeyup=function(e) {
	e = window.event || e;
	if(e.which != undefined) {
		key[e.which] = false;
	}
	else {
		key[e.keyCode] = false;
	}
}

function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchstart", preventBehavior, false);
document.addEventListener("touchmove", preventBehavior, false);
document.addEventListener("touchend", preventBehavior, false);

// @author: http://backtothecode.blogspot.com/2009/10/javascript-touch-and-gesture-events.html
// Touch Support
document.addEventListener('touchstart', function(event) {
    touch = event.touches;
    starttouch = event.touches;
}, false);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    touch = event.touches;
}, false);

document.addEventListener('touchend', function(event) {
	touch = {pageX: -1, pageY: -1};
	starttouch = touch;
}, false);


function isStartTouchX( condition , value ) {
	return isTouch('pageX', condition, value, starttouch );
}
function isStartTouchY( condition , value ) {
	return isTouch('pageY', condition, value, starttouch );
}

function isTouchX( condition , value ) {
	return isTouch('pageX', condition, value, touch );
}
function isTouchY( condition , value ) {
	return isTouch('pageY', condition, value, touch );
}

function isTouch( prevalue, condition, value, touchchoice ) {
	
	if(touchchoice.pageX == -1) {
		return false;
	}
	switch( condition ){
		case '<':
			for( var i = 0; i < touchchoice.length ; i += 1 ){
				if( (touchchoice[i])[prevalue] < value ) {
					return true;
				}
			}
			return false;
		break;
		case '>':
			for( var i = 0; i < touchchoice.length ; i += 1 ){
				if( (touchchoice[i])[prevalue] > value ) {
					return true;
				}
			}
			return false;
		break;
	}
	return false;
}