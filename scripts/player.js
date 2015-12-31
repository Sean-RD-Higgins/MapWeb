// @author: Sean Higgins

// The player class.  Which can be the object that the user controls.
function Player() {

	// Variables
	this.stats = new Stats();

	this.gob = new Gob();
	this.gob.spriteSize( 200 );
	this.gob.gfx( GraphicAction.Idle );
	this.gob.gfxArray([
		['idle', 'guard', 'evade', 'jump', 'item'],
		['hurt', 'fall', 'run1', 'run2', 'run3'],
		['slash1', 'slash2', 'slash3', 'slash4', 'slash5'],
		['thrust1', 'thrust2' , 'thrust3', 'thrust4', 'thrust5'],
		['vstrike1', 'vstrike2' , 'vstrike3', 'vstrike4', 'vstrike5'],
		['asmash1', 'asmash2' , 'asmash3', 'asmash4', 'asmash5'],
		['cast1', 'cast2' , 'cast3', '', '']
	]);

	this.action = 'ground';
	this.subaction = 'ground';
	this.actionTimer = 0;
	this.gfxTimer = 0;
	this.x = 160;
	this.y = 510;
	this.dir = "right";
	this.jumpTimer = 0;

	this.skill = new Skill( "Slash" );

	// assume the player is an ai and not human player
	this.control = AI;
	
	// Methods

	// Gets the current gfx index from the maximum number
	this.max = function( maxFrames ) {
		return "" + ( 1 + Math.floor( (this.gfxTimer / 3) % maxFrames ) );
	}

	// This is the player's main loop cycle.  It's run during every cycle (50milliseconds)
	this.cycle = function () {
		this.sharedPreCycle();
		switch( this.action ) {
			case "ground": this.ground(); break;
			case "attack": this.attack(); break;
			case "jump": this.jump(); break;
		}
		this.sharedPostCycle();
	}

	this.sharedPreCycle = function() {
		this.gfxTimer = this.gfxTimer % 1000 + 1;
	}

	this.sharedPostCycle = function() {
		if(this.x < 20)
		{
			this.x = 20;
		}
		if(this.x > 780)
		{
			this.x = 780;
		}

		// We use this.x and this.y to store where our player is, but the OAM doesn't know that...
		// Now to tell the OAM the new coordinates of the player.
		this.gob.pos( this.x, this.y );
	}

	this.ground = function() {

		// 87 in ASCII is the 'W' on a keyboard, 83:'S', 68:'D', 65:'A'
		// TODO: This should be exchanged with a more dynamic method so users can change their controls
		this.gob.gfx(GraphicAction.Idle);
		if( key[68] || isTouchX('>', camera.width * 2/3) ) {
			this.x += this.stats.speed;
			this.dir = "right";
			this.gob.dir( this.dir );
			this.gob.gfx('run' + this.max(3) );
		}
		else if( key[65]  || isTouchX('<', camera.width * 1/3) ) {
			this.x -= this.stats.speed;
			this.dir = "left";
			this.gob.dir( this.dir );
			this.gob.gfx('run' + this.max(3) );
		}
		if( key[87] || isTouchY('<', camera.height * 1/3) ) {
			this.action = "jump";
			this.gob.gfx(GraphicAction.Jump);
		}
		if( key[ 48 ] ) {
			console.log("Attack Initiated");
			this.action = "attack";
		}
	}

	this.attack = function() {
		this.skill.atts = {
			  '0': new SkillNode( GraphicAction.Slash1 , null, +5 ),
			 '50': new SkillNode( GraphicAction.Slash2 , null, +10 ),
			'100': new SkillNode( GraphicAction.Slash3 , null, +20 ),
			'150': new SkillNode( GraphicAction.Slash4 , null ),
			'200': new SkillNode( GraphicAction.Slash5 , null ),
 			'250': new SkillNode( null , null )
		};

		// the global variable milliseconds per frame (mspf) indicates the amount of real time that has passed
		this.gfxName = this.skill.gfxName( this.actionTimer );

		// If our time within the skill's time frame?
		if( this.gfxName != null ) {
			// use it's gfxName
			this.gob.gfx( this.gfxName );

			// Increase the action timer for next time
			this.actionTimer += mspf; 
		}
		else {
			this.action = "ground";
			this.actionTimer = 0;
		}
	}

	this.jump = function() {
		// horizontally direct the player
		if( key[68] || isTouchX('>', camera.width * 2/3) ) {
			this.x += this.stats.speed;
			this.dir = "right";
			this.gob.dir( this.dir );
		}
		else if( key[65]  || isTouchX('<', camera.width * 1/3) ) {
			this.x -= this.stats.speed;
			this.dir = "left";
			this.gob.dir( this.dir );
		}

		// Verticall direct the player
		if( key[83] || isTouchY('>', camera.height * 2/3) ) {
			if(this.jumpTimer < 10)
			{
				this.jumpTimer = 10;
			}
		}
		this.gob.gfx( GraphicAction.Jump );
		this.jumpTimer += 1;
		changeInY = - (0.5 * this.jumpTimer) * (0.5 * this.jumpTimer) + 25;
		if(this.jumpTimer < 10)
		{
			this.y -= changeInY;
		}
		else
		{
			this.y -= changeInY;
			if(this.y >= GROUND_Y)
			{
				this.y = GROUND_Y;
				this.jumpTimer = 0;
				this.action = "ground";
			}
		} 
	}

}
