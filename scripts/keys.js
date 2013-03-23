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
    for( var i = 0; i < touch.length ; i += 1 ){
    	console.log("Start " + i + " Touch x:" + touch[i].pageX + ", y:" + touch[i].pageY);
    }
}, false);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    touch = event.touches;
    for( var i = 0; i < touch.length ; i += 1 ){
    	console.log("Move " + i + " Touch x:" + touch[i].pageX + ", y:" + touch[i].pageY);
    }
}, false);

document.addEventListener('touchend', function(event) {
    for( var i = 0; i < touch.length ; i += 1 ){
    	console.log("End " + i + " Touch x:" + touch[i].pageX + ", y:" + touch[i].pageY);
    }
	touch = {pageX: -1, pageY: -1};
}, false);

function isTouchY( condition , value ) {
	if(touch.pageX == -1) {
		return false;
	}
	switch( condition ){
		case '<':
			for( var i = 0; i < touch.length ; i += 1 ){
				if( touch[i].pageY < value ) {
					return true;
				}
				return false;
			}
		break;
		case '>':
			for( var i = 0; i < touch.length ; i += 1 ){
				if( touch[i].pageY > value ) {
					return true;
				}
				return false;
			}
		break;
	}
	return false;
}