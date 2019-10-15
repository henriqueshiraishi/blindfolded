/**
 ** MODULE NAME: 
 **	 NodeTextNotation.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the node element of the deployment diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Mar 2013 - AAH - Initial version release
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
 * NodeTextNotation class constructor, creates a NodeTextNotation in the deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @class NodeTextNotation
 * @extends Rectangular
 *
 */

var NodeTextNotation = function( params ) {

  params = params || {};
  NodeTextNotation.baseConstructor.call(this,params);
}
JSFun.extend(NodeTextNotation,Cube);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodeTextNotation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodeTextNotation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NodeTextNotation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NodeTextNotation.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodeTextNotation.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NodeTextNotation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Returns the artifact fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getArtifacts
 * @return {Component} Artifact fields component of the element UML
 *
 */
NodeTextNotation.prototype.getArtifacts = function( ){
	return this._components[2]._childs;
}



/**
 * Creates a new artifact item in artifact fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addArtifact
 * @param {String} String text for the artifact item
 *
 */
NodeTextNotation.prototype.addArtifact = function(text ){
	var text = text || '';
	this._components[2].addField( text );
}