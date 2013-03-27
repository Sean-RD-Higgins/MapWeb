// @author: Sean Higgins
// Players
var players = null;

// our timer ID
var timer = null;

// Canvas tag and it's context.
var ctx = null;
var canvas = null;

// input devices
var key = new Array(512);
var touch = {
	pageX: -1,
	pageY: -1
};
var starttouch = {
	pageX: -1,
	pageY: -1
};

// background Graphic Object
var bgGob = null;

// milliseconds per frame
var mspf = null;

// The gui in general
var gui = {
	'size': 2,
	'hp_back': null,
	'hp': null
}

// which main menu the user is located in
var menu = null;

// The camera object, which contains 
var camera = {
	'x': null, 'y': null, 
	'width': null, 'height': null
};

// global constants

// Player.control
var AI = 0;
var PLAYER_1 = 1;
var PLAYER_2 = 2;
var PLAYER_3 = 3;
var PLAYER_4 = 4;
