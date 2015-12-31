// @author: Sean Higgins
function Skill( name ) 
{
	// An associative array of all action changes in time.
	this.name = name;

	this.atts = new Array();
	
	this.loop = function ( time ) 
	{
		if( this.atts[i] != null ) 
		{
			return this.atts[i];
		}
	};

	this.gfxName = function ( time ) 
	{
		this.atts = this.loop( time );
		return this.atts.gfxName;
	}

	this.act = function ( time ) 
	{
		this.atts = this.loop( time );
		return this.atts.act;
	}
	this.GetTotalTime = function()
	{
		return this.atts[this.atts.length - 1];
	}
}

function SkillList() 
{
	this.ChargeAttack = function() 
	{
		var newSkill = new Skill("ChargeAttack");
		newSkill.atts.push( new SkillNode(0, GraphicAction.Idle, null, 9) );
		newSkill.atts.push( new SkillNode(15, null, "idle") );
		return newSkill;
	}
}

// A node denoting one instance of time for a skill
function SkillNode(time, gfxName, act) 
{
	return SkillNode( time, gfxName, act, 0, 0);
}
function SkillNode(time, gfxName, act, xChange ) 
{
	return SkillNode( time, gfxName, act, xChange, 0);
}
function SkillNode(time, gfxName, act, xChange, yChange ) 
{
	this.time = time;
	this.gfxName = gfxName;
	this.act = act;
	this.xChange = xChange;
	this.yChange = yChange;
}