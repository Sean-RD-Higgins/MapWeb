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

	var ad = new Player();
	ad.gob.png( 'gfx/John - 200px Sheet.png' );
	ad.x = 56;
	ad.y -= 25;
	players.push( ad );
	
	var dan = new Player();
	dan.gob.png( 'gfx/John - 200px Sheet.png' );
	dan.x = 56;
	dan.y -= 35;
	players.push( dan );
	
	var john = new Player();
	john.gob.png( 'gfx/John - 200px Sheet.png' );
	john.x = 56;
	john.y -= 45;
	players.push( john );
	
	// Now to setup the main game loop to run every 50milliseconds, and clear the old one
	if( timer != null ) {
		clearInterval(timer);
	}
	timer = setInterval( "mainLoop()", 30 );
	console.log("Main Script Completed");
}

// This is the main game loop
function mainLoop() {
	// Go through all player cycles
	for( var i = 0; i < players.length; i += 1 ) {
		players[i].cycle();
	}

	camera.x = players[0].x - camera.width / 2;
	camera.y = players[0].y - camera.height / 2;

	oam.draw();
}
