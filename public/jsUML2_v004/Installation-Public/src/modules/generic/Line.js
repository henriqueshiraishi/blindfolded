/**
 ** MODULE NAME: 
 **	  Relation.js
 **
 ** DESCRIPTION:
 **   Class that represents a relationship between two elements in the diagram.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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



/**
 * Clase que representa una relación entre dos elementos del diagrama
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Line
 * @extends Element
 * @param {Element} a Primer elemento de la relación
 * @param {Element} b Segundo elemento de la relación
 */
var Line = function( params ) {
  params = params || {};
  Line.baseConstructor.call(this,params);

}
JSFun.extend( Line, Relation );





/**
 * Se dibuja la relación con el estilo definido y todos sus componentes
 *
 * @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 13/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del liendo de dibujo
 */

Line.prototype.draw = function( context ) {
  var npoints = this._points.length;

  //Draw the style line
  if( this._line ) {
    this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );//3b3b3b
  }
/*  
  //Draw the style tip of link
  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();   
    var angle = Math.atan2( by - ay , bx - ax );
 
    this._end.draw( context, bx, by, angle, RelationStyle.line_color );  
  }
  
  //Draw the style end of link
  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    
    this._start.draw( context, bx, by, angle, RelationStyle.line_color );  
  
  }
 */ 
  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;
    
    for( i = 0; i < this._points.length; i++ ) {
      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }
  }
  
  if( this._selected > -1 ) {
    this._drawComponentsShape( context );
  }
  this._drawComponents( context );

}


