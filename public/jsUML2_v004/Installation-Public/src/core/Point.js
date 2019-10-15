/**
 ** MODULE NAME: 
 **	  Point.js
 **
 ** DESCRIPTION:
 **   represents a point in two dimensions.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Feb 2011 - MVL - First version release
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



//= require <JSFun>



/**
 * Constructor de la clase Point
 * Define un objeto que representa un punto en dos dimensiones
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class Point
 */
var Point = function( x, y ) {
  //this._x = x;
  //this._y = y;
  
  this.setPoint( x, y );
}



/**
 * Modifica las coordenadas del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setPoint
 * @param {Number} x Nueva coordenada X del punto
 * @param {Number} y Nueva coordenada Y del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setPoint = function( x, y ) {
  if( x instanceof Point ) {
    this.setX( x._x );
    this.setY( x._y );
  } else {
    this.setX( x );
    this.setY( y );
  }
  
  return this;
}



/**
 * Modifica la coordenada X del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setX
 * @param {Number} x Nueva coordenada X del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setX = function( x ) {
  if( JSFun.isNumber( x ) ) {
    this._x = x;
  }
  
  return this;
}



/**
 * Modifica la coordenada Y del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setY
 * @param {Number} y Nueva coordenada Y del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setY = function( y ) {
  if( JSFun.isNumber( y ) ) {
    this._y = y;
  }
  
  return this;
}



/**
 * Devuelve la coordenada X del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getX
 * @return {Number} La coordenada x del punto
 */
Point.prototype.getX = function() {
  return this._x;
}



/**
 * Devuelve la coordenada Y del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getY
 * @return {Number} La coordenada y del punto
 */
Point.prototype.getY = function() { 
  return this._y;
}



/**
 * Comprueba si dos puntos tienen las mismas coordenadas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method equals
 * @param {Point} p Punto para comparar
 * @return {Boolean} Si los dos puntos son iguales
 */
Point.prototype.equals = function( p ) {
  if( p instanceof Point && this._x == p.x && this.y == p._y )
    return true;
  else
    return false;
}



/**
 * Devuelve la coordenada X del punto adaptada al centro de un píxel
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method pixelX
 * @return {Number} La coordenada x del punto dentro el píxel más cercano
 */
Point.prototype.pixelX = function() {
  return parseInt( this._x ) + 0.5;
}



/**
 * Devuelve la coordenada Y del punto adaptada al centro de un píxel
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method pixelY
 * @return {Number} La coordenada y del punto dentro el píxel más cercano
 */
Point.prototype.pixelY = function() {
  return parseInt( this._y ) + 0.5;
}



