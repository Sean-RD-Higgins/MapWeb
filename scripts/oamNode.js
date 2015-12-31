
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

	this.s['dock'] = "none"; 

	this.s['hide'] = "show"; 
}
