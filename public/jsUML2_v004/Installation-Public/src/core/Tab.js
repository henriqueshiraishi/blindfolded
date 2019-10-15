/**
 ** MODULE NAME: 
 **	  Tab.js
 **
 ** DESCRIPTION:
 **   Represents a tab to hold the name of a package in UML 2.
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

//= require <TextBox>



/**
 * Constructor de la clase Tab
 * Representa una pestaña para contener el nombre de un paquete en UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @class Tab
 * @extends TextBox
 */
var Tab = function( params ) {
  params = params || {};
  Tab.baseConstructor.call( this, params );

}

JSFun.extend( Tab, TextBox );




/**
 * Dibuja el borde de la pestaña y su contenido
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Tab.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  Tab.base.draw.call( this, context );
  
  var x = this.getPixelX();
  var y = this.getPixelY();
  
  context.beginPath();
  context.moveTo( x, y + this.getHeight() );
  context.lineTo( x + this.getWidth() - 4, y + this.getHeight() );
  context.lineTo( x + this.getWidth(), y );
  context.stroke();
  
}
