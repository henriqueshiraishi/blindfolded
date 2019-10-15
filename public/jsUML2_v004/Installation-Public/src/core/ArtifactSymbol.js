/**
 ** MODULE NAME: 
 **	  ArtifactSymbol.js
 **
 ** DESCRIPTION:
 **   A pictorial representation of an artifact in UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - MAY 2013 - AAH - Fourth version release
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

//= require <Component>



/**
 * ArtifactSymbol class Constructor 
 * Class that represents a pictogram of an  UML artifact
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 11/03/2013
 *
 * @class ArtifactSymbol
 * @extends Component
 */
var ArtifactSymbol = function( params ) {
  params = params || {};
  ArtifactSymbol.baseConstructor.call( this, params );
  
  this.setWidth( 15 );
  this.setHeight( 15 );
}
JSFun.extend( ArtifactSymbol, Component );



/**
 * Draw an UML 2 Artifact symbol
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 11/03/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
 ArtifactSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  var x = this.getPixelX() + this._getMargin();
  var y = this.getPixelY() + this._getMargin();
  
  context.save();
  context.strokeStyle = ComponentStyle.component_color;

  //drawing the shape
  context.beginPath();
  context.moveTo( x + 5, y);
  context.lineTo( x + 10, y );
  context.lineTo( x + 15, y + 5 );
  context.lineTo( x + 15, y + 10 );
  context.lineTo( x +5, y + 10 );
  context.lineTo( x + 5, y);
  context.stroke();
  
  context.beginPath();
  context.moveTo( x + 10, y );
  context.lineTo( x + 10, y + 5 );
  context.lineTo( x + 15, y + 5 );
  context.stroke();
  
  context.restore();
}
