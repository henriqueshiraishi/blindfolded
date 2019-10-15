/**
 ** MODULE NAME: 
 **	  Association.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the association's relation of the class diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Initial version release
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
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
 * Association class constructor, creates a relation of association in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Association
 * @extends Relation
 *
 */

var Association = function( params ) {

  params = params || {};
  Association.baseConstructor.call(this,params);
}
JSFun.extend(Association,Relation);


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

Association.prototype.addStereotype = function(text){
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
Association.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A 
 *
 */

Association.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role B 
 *
 */

Association.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
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

Association.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
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

Association.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
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

Association.prototype.getStereotypes = function( ){
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
Association.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Association.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Association.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
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

Association.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
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

Association.prototype.getMultiplicityB = function( ){
	return this._components[5].getValue( );
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
Association.prototype.getNameAsComponent = function( ){
	return this._components[1];
}