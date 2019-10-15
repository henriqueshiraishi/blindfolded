/**
 ** MODULE NAME: 
 **	  SwimlaneLine.js
 **
 ** DESCRIPTION:
 **   Component that draws a region line of separation in a supernode.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Sep 2011 - RML - Second version release
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
 * SwimlaneLine Class Constructor
 * Components that draws a line between two region.
 *
 * @author Rafael Molina Linares
 * @update 17/09/2011
 *
 * @class SwimlaneLine
 * @extends RegionLine
 */
var SwimlaneLine = function( params ) {

  params = params || {};
  SwimlaneLine.baseConstructor.call( this, params );
}
JSFun.extend( SwimlaneLine, RegionLine );



/**
 * Draws a horizontal or vertical region line 
 *
 * @author Rafael Molina Linares
 * @update 17/09/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SwimlaneLine.prototype.draw = function( context ) {

		context.save();
		context.beginPath();

		//Draws a horizontal o vertical line 
		if(this._orientation){
		  context.lineWidth = this._width;
		  context.moveTo( this.getPixelX(), this.getPixelY() );
		  context.lineTo( this.getPixelX(), this.getPixelY() + this.getHeight() );
		} else {
		  context.lineWidth = this._height;
		  context.moveTo( this.getPixelX(), this.getPixelY() );
		  context.lineTo( this.getPixelX() + this.getWidth(), this.getPixelY() );
		}
		context.stroke();
		context.restore();
}



/**
 * Draws the shape of a horizontal or vertical region line 
 *
 * @author Rafael Molina Linares
 * @update 17/09/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
SwimlaneLine.prototype.drawShape = function( context ) {

	var heightComp;
	var widthComp;


	/*
		Draws the shape of a rectangle around of the component
		according to the orientation of this
	*/
  context.save();
  context.strokeStyle = "#aaaaaa";

	//vertical orientation
  if(this._parent.getParent()._orientation)
	  context.strokeRect( this.getPixelX() - 2 , this.getPixelY(), this.getWidth() + 4 , this.getHeight() );
  else//horizontal orientation
	  context.strokeRect( this.getPixelX() , this.getPixelY() - 4, this.getWidth() ,  this.getHeight() + 6 );

  context.restore();

	/*
		Draws the red circles that allows to delete a region of a supernode
	*/

	//First red circle to remove this region
  context.save();
  
  context.fillStyle = '#ff0000';
  context.beginPath();

	//vertical orientation	
  if(this._parent.getParent()._orientation){
		context.arc( this._parent.getX() + this._parent.getWidth() - 10, this._parent.getY() +  this._parent._heightComp + 7, 4, 0, Math.PI*2, true );
	} else { //Horizontal orientation
		context.arc( this._parent.getX() + this._parent._widthComp + 7 , this._parent.getY() + this._parent.getHeight() - 10, 4, 0, Math.PI*2, true );
	}

  context.closePath();
  context.fill();
  
  context.restore();


	//Locates the next region of supernode and is kept in the 'i' variable
  var nodes = this._parent.getParent()._nodeChilds;
  for(var i=0; i< nodes.length; i++)
		if(nodes[i] == this._parent)
		  break;

	//Second red circle to remove this node (if current region isn't the last)		
  context.save();

  context.fillStyle = '#ff0000';
  context.beginPath();

	//vertical orientation
  if(this._parent.getParent()._orientation){
		context.arc( nodes[i+1].getX() + nodes[i+1].getWidth() - 10 , nodes[i+1].getY() + nodes[i+1]._heightComp + 7, 4, 0, Math.PI*2, true );
	} else{ //horizontal orientation
		context.arc( nodes[i+1].getX() + nodes[i+1]._widthComp + 7 , nodes[i+1].getY() + nodes[i+1].getHeight() - 10, 4, 0, Math.PI*2, true );
	}

  context.closePath();
  context.fill();
  
  context.restore();

}
