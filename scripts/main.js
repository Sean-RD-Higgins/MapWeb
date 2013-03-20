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
	sean = new Player();
	sean.gob.png('gfx/Sean - 200px Sheet.png')
	sean.control = PLAYER_1;

	john = new Player();
	john.gob.png( 'gfx/John - 200px Sheet.png' );
	john.x = 560;
	
	// Now to setup the main game loop to run every 50milliseconds, and clear the old one
	if( timer != null ) {
		clearInterval(timer);
	}
	timer = setInterval( "mainLoop()", 50 );
	console.log("Main Script Completed");
}

// This is the main game loop
function mainLoop() {
	sean.cycle();
	john.cycle();

	camera.x = sean.x - camera.width / 2;
	camera.y = sean.y - camera.height / 2;

	oam.draw();
}
