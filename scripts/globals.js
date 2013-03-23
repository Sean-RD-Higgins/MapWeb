// @author: Sean Higgins
// Players
var sean = null;
var john = null;
var dan = null;
var ad = null;

// our timer ID
var timer = null;

var touch = {
	pageX: -1,
	pageY: -1
};

// Canvas tag and it's context.
var ctx = null;
var canvas = null;

// keyboard input
var key = new Array(512);

// background Graphic Object
var bgGob = null;

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
