/**
 ** MODULE NAME: 
 **	  ComponentSymbol.js
 **
 ** DESCRIPTION:
 **   A pictorial representation of a component in UML 2
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **    001 - Ago 2012
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

//= require <Component>



/**
 * Constructor de la clase ComponentSymbol
 * Clase que dibuja la figura de un componente en UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class ComponentSymbol
 * @extends Component
 */
var ComponentSymbol = function( params ) {
  params = params || {};
  ComponentSymbol.baseConstructor.call( this, params );
  
  this.setWidth( 15 );
  this.setHeight( 15 );
}
JSFun.extend( ComponentSymbol, Component );



/**
 * Dibuja la figura de um componente de UML 2 en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
ComponentSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  var x = this.getPixelX() + this._getMargin();
  var y = this.getPixelY() + this._getMargin();
  
  context.save();
  context.strokeStyle = ComponentStyle.component_color;

  context.strokeRect( x + 1, y + 2, 8, 4 );
  context.strokeRect( x + 1, y + 9, 8, 4 );
  //context.strokeRect( x + 5, y, 10, 15 );
  context.beginPath();
  context.moveTo( x + 5, y + 2 );
  context.lineTo( x + 5, y );
  context.lineTo( x + 15, y );
  context.lineTo( x + 15, y + 15 );
  context.lineTo( x + 5, y + 15 );
  context.lineTo( x + 5, y + 13 );
  context.stroke();
  
  context.beginPath();
  context.moveTo( x + 5, y + 6 );
  context.lineTo( x + 5, y + 9 );
  context.stroke();
  
  context.restore();
}
