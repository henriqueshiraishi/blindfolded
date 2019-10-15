/**
 ** MODULE NAME: 
 **	  ExpansionNode.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the ExpansionNode element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Second version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2011 The authors
 **
 **    This program is free software: you can redistribute it and/or modify
 **    it under the terms of the GNU General Public License as published by
 **    the Free Software Foundation, either version 3 of the License, or
 **    (at your option) any later version.
 **
 **    This program is distributed in the hope that it will be useful,
 **    but WITHOUT ANY WARRANTY; without even the implied warranty of
 **    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 **    GNU General Public License for more details.
 **
 **    You should have received a copy of the GNU General Public License
 **    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **
**/



//= require <../modules/activity/Pin>



/**
 * ExpansionNode class constructor, creates a ExpansionNode element in a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class ExpansionNode
 * @extends Relation
 *
 */
var ExpansionNode = function( params ) {
  params = params || {};
  ExpansionNode.baseConstructor.call( this, params );
     
	//Set the size of the node
  this.setWidth(7);
  this.setHeight(18); 
}
JSFun.extend( ExpansionNode, Pin );




/**
 * Colocates the node in the position correct on the parent node
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class correctPosition
 *
 */
ExpansionNode.prototype.correctPosition = function() {

	//If this node isn't an associated action, exit the method
	if(!this._action)
		return;

	//Coordinates and size of the action associated to this node
  var x = this._action.getX();
  var y = this._action.getY();
  var w = this._action.getWidth();
  var h = this._action.getHeight();
  
	/*
		Calculates the point of intersection between the node and the expansion node 
	*/

	//Horizontal position
  if(this.getHeight() > this.getWidth())
	  var np = this._action.getLinkCentered( this.getX() + this._width, this.getY() + this._height/2);
	else //Vertical position
	  var np = this._action.getLinkCentered( this.getX() + this._width/2, this.getY() + this._height);

  var nx = np.getX();
  var ny = np.getY();
  

	/*
		Exchanges the height and width of the expansion node 
		according to the orientation of the action associated
	*/

	//Horizontal position
  if(this.getHeight() > this.getWidth()){

	  /*
			if the ExpansionNode is placed at the top or bottom 
			of the node, the height and width must be exchanged
		*/
    if((this._action.getY() == ny) || ((this._action.getY() + this._action.getHeight()) == ny) ){
      var height = this.getHeight();
      this.setHeight(this.getWidth());
      this.setWidth(height);
    }
  }  else if(this.getWidth() > this.getHeight()){  //Vertical position

	  /*
			if the ExpansionNode is placed at the left or right 
			of the node, the height and width must be exchanged
		*/
    if((this._action.getX() == nx) || ((this._action.getX() + this._action.getWidth()) == nx) ){
      var height = this.getHeight();
      this.setHeight(this.getWidth());
      this.setWidth(height);
    }
  }

	/*
		Sets the position of the expansion node so that this is beside the associated action
	*/


  if(this._action.getX() == nx ){																
		//If the expansion node is in the left side of the node
    this.setPosition( nx - this._width , ny - this._height/2);
	} else if(this._action.getY() == ny ){
		//If is in the top side of the node
    this.setPosition( nx - this._width/2 , ny - this._height);
	}	else if((this._action.getX() + this._action.getWidth()) == nx){
		//If is in the right side of the node
    this.setPosition( nx , ny - this._height/2);
	}	else if((this._action.getY() + this._action.getHeight()) == ny){
		//If is in the bottom side of the node
    this.setPosition( nx - this._width/2 , ny);
	}

	//Updates the position of component according to the new position established
 	this.updatePositionComponents(nx,ny); 
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
ExpansionNode.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
ExpansionNode.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

ExpansionNode.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */

ExpansionNode.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
ExpansionNode.prototype.getStereotype = function(){		
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
ExpansionNode.prototype.getNameAsComponent = function( ){
	return this._components[1];
}