/**
 ** MODULE NAME: 
 **	  CircleSymbol.js
 **
 ** DESCRIPTION:
 **   This class represents a circle in graphical form
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

//= require <Component>



/**
 * Constructor de la clase CircleSymbol
 * Representa una circunferencia de forma gráfica, es el símbolo
 * que define una clase de interfaz en UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @class CircleSymbol
 * @extends Component
 */
var CircleSymbol = function( params ) {
  params = params || {};
  CircleSymbol.baseConstructor.call( this, params );
  
  this.setWidth( 15 );
  this.setHeight( 15 );
}

JSFun.extend( CircleSymbol, Component );



/**
 * Dibuja una circunferencia en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez 
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
CircleSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = ComponentStyle.component_color;
  
  context.beginPath();
  context.arc(  this.getPixelX() + this._getMargin() + 7,
                this.getPixelY() + this._getMargin() + 7, 7, 0, Math.PI*2, true);
  context.stroke();
  
  context.restore();
}
