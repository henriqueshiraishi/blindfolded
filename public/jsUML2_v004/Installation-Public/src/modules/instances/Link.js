/**
 ** MODULE NAME: 
 **	  Link.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the association's link of the instance diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Apr 2013 - AAH - Fourth version release
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2012 The authors
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
 * Association class constructor, creates a relation of link in the instances diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @class instances
 * @extends Relation
 *
 */

var Link = function( params ) {

  params = params || {};
  Link.baseConstructor.call(this,params);
}
JSFun.extend(Link,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Link.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Link.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Set the Multiplicity A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Link.prototype.setMultiplicityA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Link.prototype.setMultiplicityB = function(text){
	this._components[3].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Link.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Link.prototype.getName = function( ){
	return this._components[1].decode(this._components[1].getValue())[0];
}




/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Link.prototype.getMultiplicityA = function( ){
	return this._components[2].getValue( );
}




/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Link.prototype.getMultiplicityB = function( ){
	return this._components[3].getValue( );
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Link.prototype.getNameAsComponent = function( ){
	return this._components[1];
}