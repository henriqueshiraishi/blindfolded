/**
 ** MODULE NAME: 
 **	  ArtifactItem.js
 **
 ** DESCRIPTION:
 **   Represents an object that controls an artifact of UML 2
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
//= require <JSGraphic>

//= require <Point>
//= require <Element>
//= require <TextBox>



/**
 * Constructor of class ArtifactItem
 * Item than represents an artifact of a node
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class ArtifactItem
 * @extends TextBox
 */
var ArtifactItem = function( params ) {

  params = params || {};
  ArtifactItem.baseConstructor.call( this, params );
  
  this.setMinWidth( 40 );

}
JSFun.extend( ArtifactItem, TextBox );



/**
 * Checks if one part of artifact has been clicked and performs the
 *  adequate action
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method select
 * @param {Number} x Coordinate
 * @param {Number} y Coordinate
 * @return {Boolean} if one some part of the artifact item has been cliked
 */
ArtifactItem.prototype.select = function( x, y ) {  
	//checks if the up arrow has been clicked and then perform the related action
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;
  }
  	//checks if the down arrow has been clicked and then perform the related action
  	else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;
  
  }
  
  return ArtifactItem.base.select.call( this, x, y );

}



/**
 * Draws the property's shape
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
ArtifactItem.prototype.drawShape = function( context ) {

	if(!this._visible)
	return;
 
  var x = this.getPixelX() + this.getSuperWidth() - 35;
  var y = this.getPixelY() + 3;
  
  context.save();
  
  context.fillStyle = "#0000aa";
  
  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + 10, y );
  context.lineTo( x + 5, y + 7 );
  context.closePath();
  context.fill();
  
  
  x = x + 10;  
  context.beginPath();
  context.moveTo( x + 5, y );
  context.lineTo( x, y + 7 );
  context.lineTo( x + 10, y + 7 );
  context.closePath();
  context.fill();
 

  context.restore();
}