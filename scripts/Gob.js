// A single instance of a graphic object, used as a wrapper.
function Gob( filename ) 
{

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
		oam.mod(this.gfxId, 'offsetX', 0.5);
		oam.mod(this.gfxId, 'offsetY', 0.5);

		if( place.indexOf('top') !== -1 ) {
			oam.mod(this.gfxId, 'offsetY', 0);
		}
		else if( place.indexOf('bottom') !== -1 ) {
			oam.mod(this.gfxId, 'offsetY', 1);
		}

		if( place.indexOf('left') !== -1 ) {
			oam.mod(this.gfxId, 'offsetX', 0);
		}
		else if( place.indexOf('right') !== -1 ) {
			oam.mod(this.gfxId, 'offsetX', 1);
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

	this.dock = function ( place ) {
		oam.mod(this.gfxId, 'dock', place);
	}

}
