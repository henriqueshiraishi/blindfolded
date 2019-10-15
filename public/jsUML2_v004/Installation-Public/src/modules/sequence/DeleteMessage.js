/**
 ** MODULE NAME: 
 **	  DeleteMessage.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the delete message of the sequence diagrams of UML 2.
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


//= require <../modules/sequence/Message>



/**
 * DeleteMessage class constructor, creates a delete message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class DeleteMessage
 * @extends Message
 *
 */
var DeleteMessage = function( params ) {
  params = params || {};
  DeleteMessage.baseConstructor.call( this, params );
}
JSFun.extend( DeleteMessage, Message );




/**
 * Check if exists some element in the given point ,and if it is so, 
 * the element is added to the relation, removing the old element before
 *
 * @author Rafael Molina Linares
 * @update 2/10/2011
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of the posible element
 * @param {Number} y Coordinate y of the posible element
 */
DeleteMessage.prototype._checkForNewNodes = function( x, y ) {

	//If has been selected some end point of the delete message
  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

		//Is calculated the new element via its coordinates
    var newElem = this._diagram.reassignRelationTo( this, x, y );

		//Is a new element has been found in the x,y coordinates
    if( newElem ) {

      if( this._selected == 0 ) {

				//The new element is set if isn't the same that the B element or your object A, and hasn't your delete attribute to true
				if( newElem != this._elemB && newElem != this._objA &&
					  ((newElem.getType() == 'UMLLifeline'  && !newElem.getDelete()) || newElem.getType() == 'TimeInterval'))
	        this.setElementA( newElem );       
      } else {

				//The new element is set if isn't the same that the A element and hasn't your delete attribute to true
				if(newElem != this._elemA && newElem.getType() == 'UMLLifeline' && !newElem.getDelete())
	        this.setElementB( newElem );    
      }

			//Nofify that changes has been done in the delete message 
      this.notifyChange();

    }
  }
  
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

DeleteMessage.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
DeleteMessage.prototype.setName = function( text ){
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

DeleteMessage.prototype.getStereotypes = function( ){
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
DeleteMessage.prototype.getName = function( ){
	return this._components[1].getValue();
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
DeleteMessage.prototype.getNameAsComponent = function( ){
	return this._components[1];
}