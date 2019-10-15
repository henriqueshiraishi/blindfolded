/**
 ** MODULE NAME: 
 **	  Rhombus.js
 **
 ** DESCRIPTION:
 **   Define a node with the behavior and shape of a rhombus.
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
//= require <Node>
//= require <JSGraphic>

//= require <Point>




/**
 * Constructor de la clase Rhombus
 * Define un nodo con el comportamiento y la forma de un rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class Rhombus
 * @extends Node
 */

var Rhombus = function( params ) {

  params = params || {};
  Rhombus.baseConstructor.call( this, params ); 
}

JSFun.extend( Rhombus, Node );



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la silueta del rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes del rombo
 */


Rhombus.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();
  
  var ax, ay, bx, by;
  
  ax = this.getX();
  ay = cp.getY();
  bx = cp.getX();
  by = this.getY();
  
  if( x < cpx ) {
    if( y < cpy ) {
    
    } else {
      by = this.getY() + this.getHeight();
    }
  } else {
    if( y < cpy ) {
      ax = this.getX() + this.getWidth();
    }else {
      ax = this.getX() + this.getWidth();
      by = this.getY() + this.getHeight();
    }
  }
  
  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );
  
}



/**
 * Calcula el tamaño mínimo del rombo en función de sus componentes
 * no permitiendo reducir el tamaño más allá de lo que ocupan
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method calculateSize
 * @protected
 */



Rhombus.prototype.calculateSize = function() {
  var comp;
  var maxWidth = 0;
  var maxHeight = 0;
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {
    comp = this._components[i];
    
    if( comp.getPosition() == Component.Float ) {
      maxHeight += comp.getHeight();

      if( comp.getWidth() > maxWidth )
        maxWidth = comp.getWidth();
    }
  }


  if( maxHeight > 0 )
    this.setMinHeight( maxHeight * 2 );
  
  if( maxWidth > 0 )
    this.setMinWidth( maxWidth * 2 );
}



/**
 * Actualiza la posición de los componentes del nodo rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method updateComponents
 * @private
 */


Rhombus.prototype.updateComponents = function() {
  if( this._components.length > 0 ) {
    this.calculateSize();
    
    var ax = this.getX();
    var ay = this.getY();
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var cx = ax + a;
    var cy = ay + b;
    
    var cp = this.getCentralPoint();
    
    var p = JSGraphic.lineIntersection( ax, ay + b, ax + a, ay, this.getX(), this.getY(), cp.getX(), cp.getY() );
    
    this.insertComponents( p.getX(),
                           p.getY(),
                           this.getWidth() - 2*( p.getX() - this.getX() ),
                           this.getHeight() - 2*( p.getY() - this.getHeight() )
                         );
    
    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }
    
  }
  
}


