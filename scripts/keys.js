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

// @author: http://backtothecode.blogspot.com/2009/10/javascript-touch-and-gesture-events.html
// Touch Support
document.addEventListener('touchstart', function(event) {
    touch = event.touches[0];
    console.log("Begin Touch x:" + touch.pageX + ", y:" + touch.pageY);
}, false);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
    touch = event.touches[0];
    console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
}, false);

document.addEventListener('touchend', function(event) {
	console.log("End Touch x:" + touch.pageX + ", y:" + touch.pageY);
	touch = {pageX: -1, pageY: -1};
}, false);
