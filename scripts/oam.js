// OBJECT ATTRIBUTE MANAGER
/*
This "class" imitates the concept of the Object Attiribute Manager used to control the ARM Architecture,.
*/
// @author: Sean Higgins

var oam = new OAM();

// The "Class" head function.
function OAM() {

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
		// We want to only draw our objects in order from lowest layer [z] to highest layer.
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

			if ( (this.m[i]).s['dir'] == 'left' ) { 
				console.log(i + ":" + (this.m[i]).s['dir']);
				ctx.scale(-1, 1);
				ctx.drawImage( 
					(this.m[i]).s['gfx'], 
					(this.m[i]).s['srcX'], (this.m[i]).s['srcY'], 
					(this.m[i]).s['srcW'], (this.m[i]).s['srcH'], 
					- (this.m[i]).s['destX'] - (this.m[i]).s['destW'] * (this.m[i]).s['offsetX'], 
					(this.m[i]).s['destY'] - (this.m[i]).s['destH'] * (this.m[i]).s['offsetY'], 
					(this.m[i]).s['destW'], (this.m[i]).s['destH'] 
				);
				ctx.scale(1, 1);
			}
			else {
				ctx.scale(1, 1);
				ctx.drawImage( 
					(this.m[i]).s['gfx'], 
					(this.m[i]).s['srcX'], (this.m[i]).s['srcY'], 
					(this.m[i]).s['srcW'], (this.m[i]).s['srcH'], 
					(this.m[i]).s['destX'] - (this.m[i]).s['destW'] * (this.m[i]).s['offsetX'], 
					(this.m[i]).s['destY'] - (this.m[i]).s['destH'] * (this.m[i]).s['offsetY'], 
					(this.m[i]).s['destW'], (this.m[i]).s['destH'] 
				);
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

	// Change the direction of the gfx face
	this.scale = function (id, skewX, skewY ) {
		this.m[id].s['xscale'] = skewX;
		this.m[id].s['yscale'] = skewY;
		this.m[id].s['srcW'] = this.s['spriteW'] * this.s['xscale'];
		this.m[id].s['srcH'] = this.s['spriteH'] * this.s['yscale'];
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

}

// A single instance of a graphic node used only by the oam.
function oamNode() {
	this.s = {}; // Create a new dictionary/associative array.
	this.s['gfx'] = new Image(); // HTML5 defined class

	// The horizontal offset of the image to be used. (Not the location & length drawn on the canvas.)  An alternative to this is oam.gfx( id, predeterminedName );
	this.s['srcX'] = 0; 
	this.s['srcY'] = 0;
	this.s['srcW'] = 100;
	this.s['srcH'] = 100;

	// The location (and length) of where the image is drawn onto the canvas: An offset from the origin of the canvas.
	this.s['destX'] = 0; 
	this.s['destY'] = 0; 
	this.s['destW'] = 100;
	this.s['destH'] = 100;

	// The origin of the image when drawn on the screen in relation to it's width and height.
	this.s['offsetX'] = 0.5; 
	this.s['offsetY'] = 0.5;

	// The vertical length of a single frame from a whole image.  This is not mandatory unless using predetermined graphic names.
	this.s['spriteH'] = 100; 
	this.s['spriteW'] = 100;

	// The multiple of stretching an object.  Default of 1 indicates no stretch.  0.5 indicates squished  at half the length.  2 indicates double the length.
	this.s['xscale'] = 1; 
	this.s['yscale'] = 1; 

	// The depth/layer at which the image will be drawn.  The Higher the number, the closer to the screen.
	this.s['z'] = 0; 

	// The assumed array with the graphic choices
	this.s['gfxArray'] = [
		['up1', 'up2', 'up3', 'up4', 'up5'],
		['right1', 'right2', 'right3', 'right4', 'right5'],
		['down1', 'down2', 'down3', 'down4', 'down5'],
		['left1', 'left2' , 'left3', 'left4', 'left5'],
		['alt1', 'alt2' , 'alt3', 'alt4', 'alt5']
	];

	this.s['dir'] = "right"; 
}

// A single instance of a graphic object, used as a wrapper.
function Gob( filename ) {

	this.gfxId = oam.newGfxId();
	if( filename != null)
		oam.png(this.gfxId, filename);

	// Change the filename of the image to be used.
	this.png = function ( newFilename ) {
		oam.png(this.gfxId, newFilename);
	}

	// Change the size the source frame
	this.srcSize = function ( w, h ) {
		oam.mod(this.gfxId, 'srcW', w );
		oam.mod(this.gfxId, 'srcH', h );
	}

	// Change the size of the sprite frame
	this.spriteSize = function ( size ) {
		oam.mod(this.gfxId, 'spriteH', size );
		oam.mod(this.gfxId, 'spriteW', size );
	}

	// Change the destination size of the image
	this.resize = function ( w, h ) {
		oam.resize(this.gfxId, w, h );
	}

	// Place the position origin of the image relative to the width/height
	this.origin = function( place ) {
		switch( place ) {
			case 'top':
				oam.mod(this.gfxId, 'offsetX', 0.5);
				oam.mod(this.gfxId, 'offsetY', 0);
			break;
			case 'topleft':
				oam.mod(this.gfxId, 'offsetX', 0);
				oam.mod(this.gfxId, 'offsetY', 0);
			break;
			case 'center':
				oam.mod(this.gfxId, 'offsetX', 0.5);
				oam.mod(this.gfxId, 'offsetY', 0.5);
			break;
			case 'bottom':
				oam.mod(this.gfxId, 'offsetX', 0.5);
				oam.mod(this.gfxId, 'offsetY', 1);
			break;
		}
	}

	// Alter the sprite graphic
	this.gfx = function( gfx ) {
		oam.gfx(this.gfxId, gfx);
	}

	// Change the gob's position
	this.pos = function( x,  y ) {
		oam.mod(this.gfxId, 'destX', x);
		oam.mod(this.gfxId, 'destY', y);
	}

	// Change both the source and destination width/height
	this.imgSize = function ( w , h ) {
		this.srcSize(w, h);
		this.resize(w, h);
	}

	this.gfxArray = function ( gfxArray ) {
		oam.mod(this.gfxId, 'gfxArray', gfxArray);
	}

	this.dir = function ( direction ) {
		oam.mod(this.gfxId, 'dir', direction);
	}
}
