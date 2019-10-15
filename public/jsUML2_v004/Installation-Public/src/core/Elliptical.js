/**
 ** MODULE NAME: 
 **	  Elliptical.js
 **
 ** DESCRIPTION:
 **   Define a node with the behavior and shape of an ellipse
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
//= require <JSGraphic>

//= require <Point>
//= require <Node>
//= require <Component>



/**
 * Constructor de la clase Elliptical
 * Define un nodo con el comportamiento y la forma de una elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Elliptical
 * @extends Node
 */
var Elliptical = function( params ) {
  params = params || {};
  Elliptical.baseConstructor.call( this, params );
}

JSFun.extend( Elliptical, Node );



/**
 * Comprueba si el punto indicado está sonbre la elipse o alguno de
 * sus componentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
 * @return {Boolean} Si el punto está sobre el nodo
 */
Elliptical.prototype.isOver = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
  var haxis = this.getWidth() / 2;
  var vaxis = this.getHeight() / 2;
  
  var dx = Math.abs(x - this.getX() - haxis );
  var dy = Math.abs(y - this.getY() - vaxis);
  
  if( dx <= haxis ) {
    if( Math.abs(Math.sqrt( (1 - (dx*dx) / (haxis*haxis) ) * vaxis*vaxis )) >= dy ) {
      return true;
    }
  }
  
}



/**
 * Recibe un coordenada 'y' y el nodo devuelve los límites horizontales
 * de la figura en esa posición.
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getParticularWidth
 * @param {Number} y Posición y donde se comprobará el ancho
 * @return {Array} Límites de la figura en la altura indicada
 */
Elliptical.prototype.getParticularWidth = function( y ) {
  if( y >= this.getY() && y <= this.getY() + this.getHeight() ) {
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var ny = this.getY() + b - y;
    var cx = this.getX() + a;
    
    var incx = a * Math.sqrt( 1 - ( ny * ny ) / ( b * b ) );
    var aux = 1 - ( y * y ) / ( b * b );
    
    return [ cx - incx, 2 * incx ];
  }
  
  return [ 0, 0 ];
}



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la silueta de la elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes de la elipse
 */
Elliptical.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
  var a = this.getWidth() / 2;
  var b = this.getHeight() / 2;
  
  var px = this.getX() + a;
  var py = this.getY() + b;
  
  return JSGraphic.ellipseIntersection( px, py, a, b, x, y );
}



/**
 * Calcula el tamaño mínimo de la elipse en función de sus componentes
 * no permitiendo reducir el tamaño más allá de lo que ocupan
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method calculateSize
 * @protected
 */
Elliptical.prototype.calculateSize = function() {
  var comp;
  var maxWidth = 0;
  var maxHeight = 0;
  var i;

	var foundInvisibleComp = false;

  for( i = 0; i < this._components.length; i++ ) {
    comp = this._components[i];

		//If the components is visible    
		if( comp._visible ){

		  if( comp.getPosition() == Component.Float ) {
		    maxHeight += comp.getHeight();

		    if( comp.getWidth() > maxWidth )
		      maxWidth = comp.getWidth();
		  }
		} else if(!comp._visible){
			//If some component isn't visible, it is indicated in a variable
			foundInvisibleComp = true;
		}
  }

	/*
		If not found any visible component, and therefore 
		the maximum height is 0, the maximum height is 
		put to 20
	*/
	if(maxHeight == 0 && foundInvisibleComp == true)
		maxHeight = 20;

	/*
		If not found any visible component, and therefore 
		the maximum width is 0, the maximum height is 
		put to 20
	*/
	if(maxWidth == 0 && foundInvisibleComp == true)
		maxWidth = 20;

  if( maxHeight > 0 )
    this.setMinHeight( maxHeight * 1.447716 );
  
  if( maxWidth > 0 )
    this.setMinWidth( maxWidth * 1.447716 );
}



/**
 * Actualiza la posición de los componentes del nodo elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method updateComponents
 * @private
 */
Elliptical.prototype.updateComponents = function() {
  if( this._components.length > 0 ) {
    this.calculateSize();
    
    var ax = this.getX();
    var ay = this.getY();
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var cx = ax + a;
    var cy = ay + b;
    
    var p = JSGraphic.ellipseIntersection( cx, cy, a, b, ax, ay );
    
    this.insertComponents( p.getX(), 
                           p.getY(), 
                           this.getWidth() - 2 *( p.getX() - this.getX() ),
                           this.getHeight() - 2 *( p.getY() - this.getHeight() )
                         );

    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }
    
  }
  
}


