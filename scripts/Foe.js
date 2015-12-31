// @author: Sean Higgins
function Foe() 
{
	this.gob = new Gob();	
	this.stats = new Stats();
	this.action = 'idle';
	this.isDormant = false;
	this.dir = "right";
	this.x = 0;
	this.y = 0;
	this.currentSkill = null;
	this.time = 0;
	this.cycle = function()
	{
		if(this.isDormant == false)
		{
			this.currentSkill = new SkillList().ChargeAttack();
		}
		


		// We use this.x and this.y to store where our foe is, but the OAM doesn't know that...
		// Now to tell the OAM the new coordinates of the foe.
		this.gob.pos( this.x, this.y );
		this.gob.dir( this.dir );
	}
}