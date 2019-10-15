/**
 ** MODULE NAME: 
 **	  Cube.js
 **
 ** DESCRIPTION:
 **   Define a node with the behavior and the shape of a cube.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrbal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - May 2013 - AAH - Fourth version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
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



//= require <JSFun>

//= require <Node>



/**
 * Constructor of the class Cube
 * Defines a node whit the behaviour and form of a cube
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @class Cube
 * @extends Node
 */
var Cube = function( params ) {
  params = params || {};
  Cube.baseConstructor.call( this, params );
}

JSFun.extend( Cube, Node );


Cube.prototype.setElementXML = function( xmlnode ) {
	Cube.base.setElementXML.call(this ,xmlnode);
}



/**
 * Returns the intersection point between the given by x,y parameters 
 * and the node's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of the point
 * @param {Number} y Coordinate y of the point
 * @return {Point} Intersection's point with the edges of the Cube
 */
Cube.prototype.getLinkCentered = function( x, y ) {
  //if the first parameter is a point the x and y coordinades will taken from this
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
  var incx = 0;
  var incy = 0;

  //Calculate the shapes of the Cube
  var width = (this._width + 10) / 2;
  var height = (this._height + 10) /2;
  
//Calculate the central point of the Cube 
  var cx = this._x + width;
  var cy = this._y-10 + height;
  
  //Calculate the angle with respect to the central point
  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );
    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }
    
  if( incx > width ) incx = width;
  if( incy > height ) incy = height;
    
  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}


/**
 * Returns the intersection point between the given by x,y parameters 
 * and the cx,cy parameters
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method getLink
 * @param {Number} x Coordinate x of first point
 * @param {Number} y Coordinate y of first point
 * @param {Number} x Coordinate x of second point
 * @param {Number} y Coordinate y of second point
 * @return {Point} Intersection point with the cube's borders 
 */
Cube.prototype.getLink = function( x, y, cx, cy ) {
	//if the second point is not propertly defined calculate the intersection point
	//with respect to the central point
	if(!cx || !cy)
		return this.getLinkCentered(x, y);
	
 
  var incx = 0;
  var incy = 0;
  
  var width = cx - this._x; 
  var height = cy - this._y -10; 
 
  if(x > cx) width =  (this._width + 10) - width;
  if(y > cy) height = (this._height + 10) - height;
  
  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );

    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }
    
  if( incx > width ) incx = width;
  if( incy > height ) incy = height;
    
  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}
