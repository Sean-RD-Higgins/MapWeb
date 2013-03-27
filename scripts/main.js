// @author: Sean Higgins
// Initialize or restart the entire game 
console.log("Main Script Opened");

document.onload = gameInit();

function gameInit() {
	console.log("Main Script Initialized");

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
	var bgGob = new Gob('gfx/Shelly Tompkins - Into the Woods.jpg');
	bgGob.origin('topleft');
	bgGob.imgSize(800, 600);

	// Players and their sprite sheets
	players = [];
	var sean = new Player();
	sean.gob.png('gfx/Sean - 200px Sheet.png')
	sean.control = PLAYER_1;
	players.push( sean );

	var john = new Player();
	john.gob.png( 'gfx/John - 200px Sheet.png' );
	john.x = 56;
	john.y -= 45;
	players.push( john );
	
	//draw gui
	gui.hp_back = new Widget("gfx/hp_back.bmp", "top left");
	gui.hp_back.gob.imgSize(100,10);
	gui.hp_back.gob.resize(200,20);

	gui.hp = new Widget("gfx/hp.bmp", "top left");
	gui.hp.gob.imgSize(100,10);
	gui.hp.gob.resize(200,20);
	gui.hp.newAct( 0,0,200,20, "press", 
		function(relX, relY) {
			// Touch Action: Adjust the size of the gui
			gui.size = gui.size % 4 + 1;
			// The touch action width and height needs to change with the size
			gui.hp.acts[0].width = gui.size * 100;
			gui.hp.acts[0].height = gui.size * 10;
			// The actual graphic sizes also need to change
			gui.hp_back.gob.resize(gui.size * 100 , gui.size * 10);
			gui.hp.gob.resize(gui.size * players[0].hp , gui.size * 10);
		}
	);

	// Now to setup the main game loop to run every 50milliseconds, and clear the old one
	if( timer != null ) {
		clearInterval(timer);
	}
	mspf = 30;
	timer = setInterval( "mainLoop()", mspf );
	console.log("Main Script Completed");
}

// This is the main game loop
function mainLoop() {
	// Go through all player cycles
	for( var i = 0; i < players.length; i += 1 ) {
		players[i].cycle();
	}

	gui.hp.cycle();
	gui.hp_back.cycle();

	gui.hp.gob.resize(gui.size * players[0].hp , gui.size * 10);

	camera.x = players[0].x - camera.width / 2;
	camera.y = players[0].y - camera.height / 2;

	oam.draw();
}
