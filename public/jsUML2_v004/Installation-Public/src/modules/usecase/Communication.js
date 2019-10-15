/**
 ** MODULE NAME: 
 **	  Communication.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the Communication element of the class diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Sep 2011 - RML - Initial version release
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
 * Communication class constructor, creates a relation of communication in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Communication
 * @extends Relation
 *
 */

var Communication = function( params ) {

  params = params || {};
  Communication.baseConstructor.call(this,params);
}
JSFun.extend(Communication,Relation);

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

Communication.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Communication.prototype.setMultiplicityA = function(text){
	this._components[1].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Communication.prototype.setMultiplicityB = function(text){
	this._components[2].setValue( text );
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

Communication.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Communication.prototype.getMultiplicityA = function( ){
	return this._components[1].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Communication.prototype.getMultiplicityB = function( ){
	return this._components[2].getValue( );
}


