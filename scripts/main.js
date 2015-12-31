// @author: Sean Higgins
// Initialize or restart the entire game 
/* ======================================================================== */
console.log("Main Script Opened");

document.onload = gameInit();

function gameInit() 
{

	console.log("Main Script Initialized");

	SetGlobalConfiguration();

	// Now to setup the main game loop to run every 50milliseconds, and clear the old one if it was set
	if( timer != null ) {
		clearInterval(timer);
	}
	timer = setInterval( "mainLoop()", mspf );
	console.log("Main Script Completed");
}

// This is the main game loop
/* ======================================================================== */
function mainLoop() 
{
	// Go through all player cycles
	for( var i = 0; i < players.length; i += 1 ) {
		players[i].cycle();
	}

	gui.hp.cycle();
	gui.hp_back.cycle();

	gui.hp.gob.resize(gui.size * 100 * (players[0].stats.hp / players[0].stats.maxHp) , gui.size * 10);
	gui.FoeHp.gob.resize(200 * (players[1].stats.hp / players[1].stats.maxHp) , 20);

	camera.x = 0; //players[0].x - camera.width / 2;
	camera.y = 0; //players[0].y - camera.height / 2;

	oam.draw();
}
