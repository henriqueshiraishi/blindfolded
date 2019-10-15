/**
 ** MODULE NAME: 
 **	  Interaction.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the interaction block of the sequence diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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



/**
 * Interaction class constructor, creates a interaction block in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class Interaction
 * @extends Rectangular
 *
 */
var Interaction = function( params ) {

  params = params || {};
  Interaction.baseConstructor.call( this, params );
}
JSFun.extend( Interaction, Rectangular );





/**
 * Performs the actions necessaries when the user 
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

Interaction.prototype.drop = function( x, y ) {

	var i,j;

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }


    var rel = this._diagram._relations;
		var containedRel = [];
		var centralPointRel = [];
		var createMessages = [];

		/*
			if rel[i] is found on this node when click event is actived, 
			and the containedRel[i]'s x central coordinate is found on this node 
			when bottom is released, this is added to the containedRel array, and after,
			will be moved with the movement of the node.
		*/
    for( i=0; i< rel.length;i++){		
			if(this.isOverBeforePosition(rel[i].getCentralPoint() ) && rel[i] instanceof Message){
				centralPointRel.push(rel[i].getCentralPoint());
				containedRel.push(rel[i]);
			}
		}

		/*
			Sorts the relations so that the messages with the distance between the y 
			coordinate and the upper y limit lower are in the first array's position 
		*/
		if(containedRel.length)
			containedRel = containedRel[0]._sortRelByDistanceToLimitY(containedRel);


		//Moving the messages previously added to the containedRel array
    for( i=0; i< containedRel.length;i++){
	
			//If the relation hasn't yet been moved
			if(!containedRel[i]._moved){

				//Update the y coordinate of the relation
				containedRel[i]._y = containedRel[i]._y +  (y - this._rely - this._prey);
				if(containedRel[i]._y < containedRel[i]._limitY)
					containedRel[i]._y = containedRel[i]._limitY;

				//Sets a true the movement of the relation to not be moved more than once
				containedRel[i]._moved = true;

				//Calculates the end points of the relation
				containedRel[i]._calculateLineEnds(2);
			}
    } 

		
		//Resets movement and updates y limit of messages contained(so such related messages) on this node
    for( j=0; j< containedRel.length;j++){
			var descendant_messages = containedRel[j]._sortAscendant(containedRel[j].descendantMessages());
			for(i=0;i<descendant_messages.length;i++){

				//Set to false the movement for each descendant message
				descendant_messages[i]._moved = false;
	
				//Initializes the _prex,_prey atributtes to the x,y value of the relation's objects
				if(descendant_messages[i]._objA)
					descendant_messages[i]._objA.resetMovement();
				if(descendant_messages[i]._objB)
					descendant_messages[i]._objB.resetMovement();

				//Notify changes of the messages contained on this node, and then, update y limit
				descendant_messages[i].notifyChange();
			}

		}

		//Updates the position of the life lines related with messages that are on this node
    for( i=0; i< containedRel.length;i++){
			containedRel[i].updateRelatedLifeline();
		}

		//Update the position of the messages delete 
		if(containedRel.length) {
			containedRel[0].updateDeleteMessages();
		}
	}

	//Call to the base method
	Interaction.base.drop.call(this, x, y);

  //Update length of all lifeline
  var nodes = this._diagram._nodes;
  for( i=0; i< nodes.length; i++){
		if(nodes[i] instanceof Lifeline)
		  nodes[i].updateLength();
  }
  
  this._moved = false;
  this._resizing = false;
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Interaction.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Interaction.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the text of the guard component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setGuard
 * @param {String} text Text to establish the guard
 *
 */

Interaction.prototype.setGuard = function( text ){
	if(this._components[2])
		this._components[2].setValue( '[' + text + ']' );
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

Interaction.prototype.getStereotypes = function( ){
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
Interaction.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Returns the guard's text of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Interaction.prototype.getGuard = function( ){
	var text = this._components[2].getValue();
	var value = (this._components[2]) ? text.substring(1,text.length -1) : null;
	return value;
}


/**
 * Returns the stereotype fields component of the element UML
 * 
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Interaction.prototype.getStereotype = function(){		
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
Interaction.prototype.getNameAsComponent = function( ){
	return this._components[1];
}