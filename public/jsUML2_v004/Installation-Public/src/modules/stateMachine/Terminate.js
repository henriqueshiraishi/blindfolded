/**
 ** MODULE NAME: 
 **	  Terminate.js
 **
 ** DESCRIPTION:
 **   Defines how is a terminate element of the state Machine diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares  (RML)
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
 * Terminate class constructor, creates a terminate element in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class Terminate
 * @extends Elliptical
 *
 */
var Terminate = function( params ){
	params = params || {};
	Terminate.baseConstructor.call(this,params);
}
JSFun.extend(Terminate,Elliptical);




/**
 * Returns the point's intersection between the given point by parameters and 
 * and the element's shape.
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the rhombus's border
 */
Terminate.prototype.getLinkCentered = function( x, y ) {
	
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
	//Central point of the node
  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();
  
  var ax, ay, bx, by;


  if( x < cpx ) {
		//Second quadrant
    if( y < cpy ) {

				ax = this.getX();
				ay = this.getY();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();

    } else {
				//Third quadrant
				ax = this.getX() + this.getWidth();
				ay = this.getY();
				bx = this.getX();
				by = this.getY() + this.getHeight();

    }
  } else {
		//First quadrant
    if( y < cpy ) {

				ax = this.getX() + this.getWidth();
				ay = this.getY();
				bx = this.getX();
				by = this.getY() + this.getHeight();
    }else { 
				//Fourth quadrant
				ax = this.getX();
				ay = this.getY();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
    }
  }

  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );
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
Terminate.prototype.addStereotype = function(text){
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
Terminate.prototype.setName = function( text ){
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

Terminate.prototype.getStereotypes = function( ){
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
Terminate.prototype.getName = function( ){
	return this._components[1].getValue();
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
Terminate.prototype.getStereotype = function(){		
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
Terminate.prototype.getNameAsComponent = function( ){
	return this._components[1];
}