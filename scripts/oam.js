// OBJECT ATTRIBUTE MANAGER
/*
This "class" imitates the concept of the Object Attiribute Manager used to control the ARM Architecture,.
*/
// @author: Sean Higgins

console.log("OAM Script Opened");

var oam = new OAM();

// The "Class" head function.
function OAM() {
	console.log("OAM Initialized");

	// Assume the context of the canvas.

	// The manager itself.  This is the OAM's main source of storage.  A basic array of objects.
	this.m = new Array(); 
	
	// Methods
	// Modify a single property of your graphic
	this.mod = function ( id, prop, data ) {

		// If we are modifying the z value, we expect it's depth placement will change.
		if( prop == "z" ) {
			this.depthSort();
		}

		// Modify the property of the image node
		(this.m[ id ]).s[ prop ] = data;
	}
	
	// Sort the array in the oam based on its z value
	this.depthSort = function () {
		// We want to only draw our objects in order from lowest layer [z] to highest layer.  Using Lamba makes this faster
		this.m.sort(function(a,b){ return ( a['z'] <= b['z'] ) });
	}

	// Returns your unique GFX ID to be used for modification
	this.newGfxId = function () {
		// Add the node
		this.m.push( new oamNode() );

		// Sort the array with the new
		this.depthSort();

		//Return the gfx Id.
		return this.m.length - 1;
	}
	
	// Returns the current quantity of active graphics
	this.count = function () {
		return this.m.length;
	}
	
	// Redraw all graphics onto the canvas.
	this.draw = function () {

		// Resize the canvas to draw at the size of the screen.
		ctx.canvas.width = camera.width;
		ctx.canvas.height = camera.height;

		// Draw a blank screen with a default color background.
		ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
		ctx.fillStyle = "#333333";
		ctx.fillRect(  0, 0, ctx.canvas.width, ctx.canvas.height );
 		
 		ctx.translate( -camera.x, -camera.y );

		// Nothing to draw?  Then there's no reason to waste additional cycles.
		if( this.m.length == 0 ) {
			return;
		}
		
		//  The array is sorted by which depth it is to be drawn in ascending order.  Therefore, we can jsut draw from index 0 to the max length.
		for( i = 0; i < this.m.length; i += 1) {

			// I simply hate having to write long names for huge functions....
			// This is programming after all.  We are supposed to make source easier for the author.
			var s = this.m[i].s;

			// Do not waste cycles on drawing hidden objects
			if( s.hide == "show" ){

				// If the graphic is docked, give it special conditions
				if( s.dock != 'none' ) {

					s.offsetX = 0.5;
					s.offsetY = 0.5;
					s.destX = camera.x + camera.width / 2;
					s.destY = camera.y + camera.height / 2;
					if( s.dock.indexOf('top') !== -1 ) {
						s.destY = camera.y;
						s.offsetY = 0;
					}
					else if( s.dock.indexOf('bottom') !== -1 ) {
						s.destY = camera.y + camera.height;
						s.offsetY = 1;
					}
					if( s.dock.indexOf('left') !== -1 ) {
						s.destX = camera.x;
						s.offsetX = 0;
					}
					else if( s.dock.indexOf('right') !== -1 ) {
						s.destX = camera.x + camera.width;
						s.offsetX = 1;
					}
				}

				// IF the graphic wishes to be reversed, perform a coordinate swap to display the image in reverse
				if ( s.dir == 'right' ) { 
					ctx.drawImage( 
						s.gfx, 
						s.srcX, s.srcY, 
						s.srcW, s.srcH, 
						s.destX - s.destW * s.offsetX, 
						s.destY - s.destH * s.offsetY, 
						s.destW * s.xscale , s.destH * s.yscale
					);
				}
				else {
					// To Revert the scale inline, simply save the context and revert it when done.
					ctx.save();
					ctx.scale(-1, 1);
					ctx.drawImage( 
						s.gfx, 
						s.srcX, s.srcY, 
						s.srcW, s.srcH, 
						- s.destX - s.destW * s.offsetX, 
						s.destY - s.destH * s.offsetY, 
						s.destW * s.xscale , s.destH * s.yscale
					);
					ctx.restore();
				}
			}
		}
	}

	// Change the current graphic based on a spritesheet's predetermined names for a frame.
	this.gfx = function (id, gfxName) {
		
		// The predetermined gfx name arrangement.
		var gfxArray = this.m[id].s['gfxArray'];

		// Search through the 2D array for the name of the frame.
		this.x = 0;
		this.y = 0;
		for( i = 0 ; i < gfxArray.length; i += 1 ) {
			for( j = 0 ; j < gfxArray[i].length ; j += 1 ) {
				if( gfxName == gfxArray[i][j] ) {
					this.x = j;
					this.y = i;
				}
			}
		}

		// Since the user is requesting a specific GFX Name, assume they are using the spritesheet convention.
		this.m[id].s['srcX'] = this.x * this.m[id].s['spriteW'];
		this.m[id].s['srcY'] = this.y * this.m[id].s['spriteH'];
		this.m[id].s['srcW'] = this.m[id].s['spriteW'];
		this.m[id].s['srcH'] = this.m[id].s['spriteH'];
		this.m[id].s['destW'] = this.m[id].s['srcW'];
		this.m[id].s['destH'] = this.m[id].s['srcH'];
	}

	// Source sold separately
	this.png = function (id, filename) {
		this.m[id].s['gfx'].src = filename;
	}

	// Change the object's screen position
	this.pos = function (id, x, y) {
		this.m[id].s['destX'] = x;
		this.m[id].s['destY'] = y;
	}

	// Change the object's size on the screen and on the spritesheet.
	this.resize = function (id, w, h) {
		this.m[id].s['destW'] = w;
		this.m[id].s['destH'] = h;
	}

	// Change the source frame that the image is taken from
	this.reframe = function (id, w, h) {
		this.m[id].s['srcW'] = w;
		this.m[id].s['srcH'] = h;
	}

	console.log("OAM Script Completed");
}

