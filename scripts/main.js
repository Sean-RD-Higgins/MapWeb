// @author: Sean Higgins
// Initialize or restart the entire game 
console.log("Main Script Opened");

document.onload = gameInit();

function gameInit() {
	
	console.log("Main Script Initialized");

	camera.width = getWindowSize().width;
	camera.height = getWindowSize().height;

	// We draw a gray background with the context (after clearing the canvas), but the canvas stores it.
	if( ctx == null ) {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
	}
	
	ctx.canvas.width = camera.width;
	ctx.canvas.height = camera.height;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.fillStyle = "#333333";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	// OAM initialization
	oam = new OAM();

	// Background Gob: Graphic Object
	//var bgGob = oam.newGob('gfx/Shelly Tompkins - Into the Woods.jpg');
	//bgGob.src(0, 0, 800, 600);

	bgGfxId = oam.newGfxId();
	oam.png(bgGfxId, 'gfx/Shelly Tompkins - Into the Woods.jpg');
	oam.pos(bgGfxId, 0, 0);
	oam.mod(bgGfxId, 'srcW', 800);
	oam.mod(bgGfxId, 'srcH', 600);
	oam.resize(bgGfxId, camera.width, camera.height);

	// Players and their sprite sheets
	sean = new Player();
	oam.png(sean.gfxId, 'gfx/Sean - 200px Sheet.png');
	oam.mod(sean.gfxId, 'spriteW', 200);
	oam.mod(sean.gfxId, 'spriteH', 200);
	oam.gfx(sean.gfxId, 'idle');
	sean.control = PLAYER_1;

	john = new Player();
	oam.png(john.gfxId, 'gfx/John - 200px Sheet.png');
	oam.mod(john.gfxId, 'spriteW', 200);
	oam.mod(john.gfxId, 'spriteH', 200);
	oam.gfx(john.gfxId, 'idle');
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

	camera.x = sean.x;
	camera.y = sean.y;

	oam.draw();
}
