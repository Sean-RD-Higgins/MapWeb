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
var mouse = {
	x: -1,
	y: -1
}

// background Graphic Object
var bgGob = null;

// milliseconds per frame
var mspf = null;

// The gui in general
var gui = {
	'size': 2
	,'hp_back': null
	,'hp': null
	,'pad': null
	,'button': null
	, FoeHp_back: null
	, FoeHp: null
}

// which main menu the user is located in
var menu = null;
var GROUND_Y = 510;

// The camera object, which contains 
var camera = {
	'x': null, 'y': null, 
	'width': null, 'height': null
};

// global constants

// GFX constants
var Graphic = 
{
	WoodsBg: 'gfx/Shelly Tompkins - Into the Woods.jpg'
	, NaesSheet: 'gfx/Sean - 200px Sheet.png'
	, NohjSheet: 'gfx/John - 200px Sheet.png'
	, SemajSprite: 'gfx/Moon James.png'
	, HpSprite: "gfx/hp_back.bmp"
	, HpBackSprite: "gfx/hp.bmp"
};
var GraphicAction =
{
	Idle: 'idle'
	, Guard: 'guard'
	, Evade: 'evade'
	, Jump: 'jump'
	, Item: 'item'
	, Hurt: 'hurt'
	, Fall: 'fall'
	, Run1: 'run1'
	, Run2: 'run2'
	, Run3: 'run3'
	, Slash1: 'slash1'
	, Slash2: 'slash2'
	, Slash3: 'slash3'
	, Slash4: 'slash4'
	, Slash5: 'slash5'
	, Thrust1: 'thrust1'
	, Thrust2: 'thrust2'
	, Thrust3: 'thrust3'
	, Thrust4: 'thrust4'
	, Thrust5: 'thrust5'
	, Vstrike1: 'vstrike1'
	, Vstrike2: 'vstrike2'
	, Vstrike3: 'vstrike3'
	, Vstrike4: 'vstrike4'
	, Vstrike5: 'vstrike5'
	, Asmash1: 'asmash1'
	, Asmash2: 'asmash2'
	, Asmash3: 'asmash3'
	, Asmash4: 'asmash4'
	, Asmash5: 'asmash5'
	, Cast1: 'cast1'
	, Cast2: 'cast2'
	, Cast3: 'cast3'
};

// Player.control
var AI = 0;
var PLAYER_1 = 1;
var PLAYER_2 = 2;
var PLAYER_3 = 3;
var PLAYER_4 = 4;

// Global Configuration Set
function SetGlobalConfiguration()
{

	// Adjust the canvas size to match the window
	if( ctx == null ) {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
	}
 	camera.width = getWindowSize().width;
	camera.height = getWindowSize().height;
	ctx.canvas.width = camera.width;
	ctx.canvas.height = camera.height;
	
	// Background Gob: Graphic Object
	var bgGob = new Gob(Graphic.WoodsBg);
	bgGob.origin('topleft');
	bgGob.imgSize(800, 600);


	// Players and their sprite sheets
	players = [];
	var sean = new Player();
	sean.gob.png(Graphic.NaesSheet)
	sean.control = PLAYER_1;
	players.push( sean );

	/*
	var john = new Player();
	john.gob.png( Graphic.NohjSheet );
	john.x = 56;
	john.y -= 45;
	players.push( john );
	*/

	var james = new Foe();
	james.gob.png( Graphic.SemajSprite );
	james.x = 600;
	james.y = 150;
	james.gob.imgSize(618, 621);
	james.gob.resize(250, 250);
	players.push( james );
	
	//draw gui
	gui.hp_back = new Widget(Graphic.HpSprite, "top left");
	gui.hp_back.gob.imgSize(100,10);
	gui.hp_back.gob.resize(200,20);

	// the expandable HP Bar widget
	gui.hp = new Widget(Graphic.HpBackSprite, "top left");
	gui.hp.gob.imgSize(100,10);
	gui.hp.gob.resize(200,20);
	gui.hp.newAct( 0,0,600,60, "press", 
		function() {
			// Touch Action: Adjust the size of the gui
			gui.size = gui.size % 6 + 1 + 1*(gui.size >= 6);

			// The touch action width and height needs to change with the size
			gui.hp.acts[0].width = gui.size * 100;
			gui.hp.acts[0].height = gui.size * 10;

			// The actual graphic sizes also need to change
			gui.hp_back.gob.resize(gui.size * 100 , gui.size * 10);
			gui.hp.gob.resize(gui.size * players[0].hp , gui.size * 10);
		}
	);

	gui.FoeHp_back = new Widget(Graphic.HpSprite, "top right");
	gui.FoeHp_back.gob.imgSize(100,10);
	gui.FoeHp_back.gob.resize(200,20);

	gui.FoeHp = new Widget(Graphic.HpBackSprite, "top right");
	gui.FoeHp.gob.imgSize(100,10);
	gui.FoeHp.gob.resize(200,20);
	gui.FoeHp.newAct( 0,0,200,20);
	mspf = 40;

}