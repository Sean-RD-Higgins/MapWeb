// @author: Sean Higgins

// The player class.  Which can be the 
function Player() {

	// Variables
	this.stats = new Stats();

	this.gob = new Gob();
	this.gob.spriteSize( 200 );
	this.gob.gfx( 'idle' );
	this.gob.gfxArray([
		['idle', 'guard', 'evade', 'jump', 'item'],
		['hurt', 'fall', 'run1', 'run2', 'run3'],
		['slash1', 'slash2', 'slash3', 'slash4', 'slash5'],
		['thrust1', 'thrust2' , 'thrust3', 'thrust4', 'thrust5'],
		['vstrike1', 'vstrike2' , 'vstrike3', 'vstrike4', 'vstrike5'],
		['asmash1', 'asmash2' , 'asmash3', 'asmash4', 'asmash5'],
		['cast1', 'cast2' , 'cast3', '', '']
	]);

	this.action = 'idle';
	this.subaction = 'idle';
	this.gfxTimer = 0;
	this.x = 160;
	this.y = 510;
	this.spd = 8;
	this.dir = "right";
	
	// assume the player is an ai and not human player
	this.control = AI;
	
	// Methods

	// Gets the current gfx index from the maximum number
	this.max = function( maxFrames ) {
		return "" + ( 1 + Math.floor( (this.gfxTimer / 3) % maxFrames ) );
	}

	// This is the player's main loop cycle.  It's run during every cycle (50milliseconds)
	this.cycle = function () {
		this.gfxTimer = this.gfxTimer % 1000 + 1;
		switch( this.action ) {
			case 'idle': this.idle(); break;
			case 'run': this.run(); break;
			case 'attack': this.attack(); break;
		}
		
		// We use this.x and this.y to store where our player is, but the OAM doesn't know that...
		// Now to tell the OAM the new coordinates of the player.
		this.gob.pos( this.x, this.y );
	}

	this.idle = function() {
		this.gob.gfx('idle');
		this.run();
	}

	this.run = function() {
		// If you're not an AI, control the player
		if(this.control != AI) {
			// 87 in ASCII is the 'W' on a keyboard, 83:'S', 68:'D', 65:'A'
			// TODO: This should be exchanged with a more dynamic method so users can change their controls
			if( ! (key[87] || key[83] || key[68] || key[65] || touch.pageX != -1) ) {
				this.action = "idle";
			}
			else {
				if( key[87] || touch.pageY < camera.height * 1/3 && touch.pageX != -1 ) {
					this.y -= this.spd;
					this.action = "run";
					this.gob.gfx('run' + this.max(3) );
				}
				else if( key[83] || touch.pageY > camera.height * 2/3 && touch.pageX != -1 ) {
					this.y += this.spd;
					this.action = "run";
					this.gob.gfx('run' + this.max(3) );
				}
				if( key[68] || touch.pageX > camera.width * 2/3 && touch.pageX != -1 ) {
					this.x += this.spd;
					this.action = "run";
					this.dir = "right";
					this.gob.dir( this.dir );
					this.gob.gfx('run' + this.max(3) );
				}
				else if( key[65]  || touch.pageX < camera.width * 1/3 && touch.pageX != -1 ) {
					this.x -= this.spd;
					this.action = "run";
					this.dir = "left";
					this.gob.dir( this.dir );
					this.gob.gfx('run' + this.max(3) );
				}
			}
		}
		// otherwise; RUN AROUND SPAZTICALLY
		// TODO: make this... different
		else {
			this.action = "run";
			this.gob.dir( this.dir );
			this.gob.gfx('run' + this.max(3) );
			//this.x += Math.floor(Math.random() * 2 - 1) * this.spd;
			//this.y += Math.floor(Math.random() * 2 - 1) * this.spd;
		}
	}

	this.attack = function() {

	}
}
