// @author: Sean Higgins

// The player class.  Which can be the 
function Player() {

	// Variables
	this.stats = new Stats();
	this.gob = new Gob();
	this.gob.spriteSize( 200 );
	this.gob.gfx( 'idle' );
	this.x = 160;
	this.y = 510;
	this.spd = 8;
	
	// assume the player is an ai and not human player
	this.control = AI;
	
	// Methods

	// This is the player's main loop cycle.  It's run during every cycle (50milliseconds)
	this.cycle = function () {
		// If you're not an AI, control the player
		if(this.control != AI) {
			// 87 in ASCII is the 'W' on a keyboard, 83:'S', 68:'D', 65:'A'
			// TODO: This should be exchanged with a more dynamic method so users can change their controls
			if( key[87] ) {
				this.y -= this.spd;
			}
			else if( key[83] ) {
				this.y += this.spd;
			}
			if( key[68] ) {
				this.x += this.spd;
			}
			else if( key[65] ) {
				this.x -= this.spd;
			}
		}
		// otherwise; RUN AROUND SPAZTICALLY
		// TODO: make this... different
		else {
			this.x += Math.floor(Math.random() * 2 * this.spd) - this.spd;
			this.y += Math.floor(Math.random() * 2 * this.spd) - this.spd;
		}
		
		// We use this.x and this.y to store where our player is, but the OAM doesn't know that...
		// Now to tell the OAM the new coordinates of the player.
		this.gob.pos( this.x, this.y );
	}
}
