/**
 ** MODULE NAME: 
 **	  RegionAlternative.js
 **
 ** DESCRIPTION:
 **   This class represents a region of a alternative block of UML 2.
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
 * RegionAlternative class constructor, creates a region in the diagram
 *
 * @author Rafael Molina Liares
 * @update 16/10/2011
 *
 * @class RegionAlternative
 * @extends Region
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
var RegionAlternative = function( params ) {

  params = params || {};  
  RegionAlternative.baseConstructor.call(this,params);
}
JSFun.extend( RegionAlternative, Region );



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
RegionAlternative.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the text of guard component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setGuard
 * @param {String} text Text to establish the new name
 *
 */
RegionAlternative.prototype.setGuard = function( text ){
	if(this._components[1])
		this._components[1].setValue( '[' + text + ']' );
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
RegionAlternative.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
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
RegionAlternative.prototype.getGuard = function( ){
	var text = this._components[1].getValue();
	var value = (this._components[1]) ? text.substring(1,text.length -1) : null;
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
RegionAlternative.prototype.getStereotype = function(){		
	return this._components[0];
}



