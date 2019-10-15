/**
 ** MODULE NAME: 
 **	  TimeEvent.js
 **
 ** DESCRIPTION:
 **   Contains the define of the time event of the activity diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Second version release
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
 * TimeEvent class constructor, creates a TimeEvent in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class TimeEvent
 * @extends Rectangular
 *
 */
var TimeEvent = function( params ) {

  params = params || {};
  TimeEvent.baseConstructor.call(this,params);
}
JSFun.extend(TimeEvent,Rectangular);




/**
 * Returns the intersection point between the given point by parameters 
 * and the node's shape
 *
 * @author Rafael Molina Linares
 * @update 17/9/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the rhombus's border
 */
TimeEvent.prototype.getLinkCentered = function( x, y ) {

	//If the figure that is drawn isn't the figure associated by default to the node, it is called to base method
	if(this._selectedFigure)
		return TimeEvent.base.getLinkCentered.call(this,x,y);

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
	//Get the central point of the node
  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();
  
  var ax, ay, bx, by;
	
	//Slope of the rect
	var m;
  
	//Initializes the value by default
  ax = this.getX();
  ay = this.getY();
  bx = cp.getX();
  by = this.getY();


  if( x < cpx ) {
    if( y < cpy ) {
			/* Second quadrant */

      m = (this.getY() - cpy)/(this.getX() - cpx);

      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

				//second half of quadrant
				bx = this.getX() + this.getWidth()/2 - 2;
				by = this.getY() + this.getHeight()/2;
      } else {

				//first half of quadrant
				bx = this.getX() + this.getWidth();
				by = this.getY();
      }
    } else { 

			/* Third quadrant */

      m = (this.getY() + this.getHeight() - cpy)/(this.getX() - cpx);

      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

				//first half of quadrant
				ax = this.getX() + this.getWidth()/2 - 2;
				ay = this.getY() + this.getHeight()/2;
				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else { 
	
				//second half of quadrant
				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }

  } else {
    if( y < cpy ) {

			/* First quadrant */

      m = (this.getY() - cpy)/(this.getX() + this.getWidth() - cpx);

      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 

				//second half of quadrant
				bx = this.getX() + this.getWidth();
				by = this.getY();
      } else { 

				//first half of quadrant
				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth()/2 + 2;
				by = this.getY() + this.getHeight()/2;
      }

    }else { 

			/* fourth quadrant */

      m = (this.getY() + this.getHeight() - cpy)/(this.getX() + this.getWidth() - cpx);

      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 

				//second half of quadrant
				ax = this.getX() + this.getWidth()/2 + 2;
				ay = this.getY() + this.getHeight()/2;
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();

      } else { 
	
				//first half of quadrant
				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }

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
TimeEvent.prototype.addStereotype = function(text){
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
TimeEvent.prototype.setName = function( text ){
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

TimeEvent.prototype.getStereotypes = function( ){
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
TimeEvent.prototype.getName = function( ){
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
TimeEvent.prototype.getStereotype = function(){		
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
TimeEvent.prototype.getNameAsComponent = function( ){
	return this._components[1];
}


