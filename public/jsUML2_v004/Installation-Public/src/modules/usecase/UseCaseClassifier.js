/**
 ** MODULE NAME: 
 **	  UseCaseClassifier.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the UseCaseClassifier element of the use case diagram of UML 2.
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
 **    Copyright (C) 2013 The authors
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
 * UseCaseClassifier class constructor, define the properties and methods of a UMLUseCaseClassifier in the activity diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @class UseCaseClassifier
 * @extends Rectangular
 *
 */

var UseCaseClassifier = function( params ) {

  params = params || {};
  UseCaseClassifier.baseConstructor.call(this,params);
}
JSFun.extend(UseCaseClassifier,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

UseCaseClassifier.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

UseCaseClassifier.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @method getStereotypes
 * @return Array with the stereotypes components of the element
 *
 */

UseCaseClassifier.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}



/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
UseCaseClassifier.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/05/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

UseCaseClassifier.prototype.getStereotype = function(){		
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
UseCaseClassifier.prototype.getNameAsComponent = function( ){
	return this._components[1];
}