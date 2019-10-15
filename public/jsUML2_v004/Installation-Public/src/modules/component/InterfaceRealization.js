/**
 ** MODULE NAME: 
 **	  InterfaceRealization.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the InterfaceRealization element of the class diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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
 * InterfaceRealization class constructor, creates a relation InterfaceRealization in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class InterfaceRealization
 * @extends Relation
 *
 */

var InterfaceRealization = function( params ) {

  params = params || {};
  InterfaceRealization.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceRealization,Relation);



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
InterfaceRealization.prototype.setName = function( text ){
	this._components[0].setValue( text );
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
InterfaceRealization.prototype.getName = function( ){
	return this._components[0].getValue();
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
InterfaceRealization.prototype.getNameAsComponent = function( ){
	return this._components[0];
}