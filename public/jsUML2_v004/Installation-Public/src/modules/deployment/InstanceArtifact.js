/**
 ** MODULE NAME: 
 **	  InstanceArtifact.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the InstanceArtifact element of the class diagram of UML 2.
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
 * InstanceArtifact InstanceArtifact constructor, creates a InstanceArtifact in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class InstanceArtifact
 * @extends Rectangular
 *
 */

var InstanceArtifact = function( params ) {

  params = params || {};
  InstanceArtifact.baseConstructor.call(this,params);
}
JSFun.extend(InstanceArtifact,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

InstanceArtifact.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

InstanceArtifact.prototype.setName = function( text ){
	this._components[2].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

InstanceArtifact.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

InstanceArtifact.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InstanceArtifact.prototype.getName = function( ){
	return this._components[2].decode(this._components[2].getValue())[0];
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

InstanceArtifact.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

InstanceArtifact.prototype.getStereotype = function(){		
	return this._components[1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InstanceArtifact.prototype.getNameAsComponent = function( ){
	return this._components[2];
}
