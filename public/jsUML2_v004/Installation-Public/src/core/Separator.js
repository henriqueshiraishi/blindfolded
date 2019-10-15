/**
 ** MODULE NAME: 
 **	  Separator.js
 **
 ** DESCRIPTION:
 **   Component that draws a line of separation in a node.
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
 * Constructor de la clase Separator
 * Componente que dibuja una linea de separación entre otros componentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Separator
 * @extends Component
 */
var Separator = function( params ) {
  params = params || {};
  Separator.baseConstructor.call( this, params );

  this._setPosition( Component.Static );

  if(this._orientation)
    this.setWidth( params.width || 1 );
  else
    this.setHeight( params.height || 1 );


}
JSFun.extend( Separator, Component );



/**
 * Dibuja una linea de separación horizontal
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Separator.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();

  context.lineWidth = (this._orientation) ? (this._width - 2*this._margin) : (this._height - 2*this._margin);
  context.strokeStyle = ComponentStyle.component_color;
  
  context.beginPath();
  if(this._orientation){
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX(), this.getPixelY() + this.getHeight() );
  } else {
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX() + this.getWidth(), this.getPixelY() );
  }
  context.stroke();
  
  context.restore();
}



