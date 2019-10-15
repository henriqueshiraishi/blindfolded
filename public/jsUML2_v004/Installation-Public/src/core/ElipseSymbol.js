/**
 ** MODULE NAME: 
 **	  ElipseSymbol.js
 **
 ** DESCRIPTION:
 **   This class represents a Elipse in graphical form
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Apr 2013 - AAH - Fourth version release
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
 * Constructor of the class ElipseSymbol
 * Represents a graphical elipse
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 07/04/2013
 *
 * @class ElipseSymbol
 * @extends Component
 */
var ElipseSymbol = function( params ) {
  params = params || {};
  ElipseSymbol.baseConstructor.call( this, params );
  
  this.setWidth( 15 );
  this.setHeight( 15 );
}

JSFun.extend( ElipseSymbol, Component );



/**
 * Dibuja una circunferencia en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez 
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
ElipseSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = ComponentStyle.component_color;
  
  context.beginPath();
  
  context.translate(this.getPixelX() + this._getMargin() -11.5, this.getPixelY() + this._getMargin());
  context.scale(11.5, 7);
  context.arc(  1,
                1, 1, 0, Math.PI*2, true);
  context.restore();
  context.stroke();
  
  context.restore();
}
