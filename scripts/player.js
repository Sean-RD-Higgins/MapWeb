// @author: Sean Higgins
function Player() {
	// Variables
	this.stats = new Stats();
	this.gfxId = oam.newGfxId();
	this.x = 40;
	this.y = 450;
	
	// assume the player is an ai and not human player
	this.control = AI;
	
	// Methods
	//this.cycle = PlayerCycle; // Callback Function
	// This is the player's main loop cycle.  It's run during every cycle (50milliseconds)
	this.cycle = function () {
		// If you're not an AI, control the player
		if(this.control != AI) {
			// 87 in ASCII is the 'W' on a keyboard, 83:'S', 68:'D', 65:'A'
			// This should be exchanged with a more dynamic method so users can change their controls
			if( key[87] ) {
				this.y -= 5;
			}
			else if( key[83] ) {
				this.y += 5;
			}
			if( key[68] ) {
				this.x += 5;
			}
			else if( key[65] ) {
				this.x -= 5;
			}
		}
		// otherwise; RUN AROUND SPAZTICALLY
		else {
			this.x += Math.floor(Math.random() * 10) - 5;
			this.y += Math.floor(Math.random() * 10) - 5;
		}
		
		// We use this.x and this.y to store where our player is, but the OAM doesn't know that...
		// Now to tell the OAM the new coordinates of the player.
		oam.pos(this.gfxId, this.x, this.y);
	}
}
