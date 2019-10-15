/**
 ** MODULE NAME: 
 **	  DeploymentItem.js
 **
 ** DESCRIPTION:
 **   Represents a object that controls an attribute of UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - APR 2013 - AAH - Fourth version release
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
 * Constructor of class DeploymentItem
 * Item than represents a property of an artifact
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class DeploymentItem
 * @extends TextBox
 */
var DeploymentItem = function( params ) {

  params = params || {};
  this._pos=' ';
  DeploymentItem.baseConstructor.call( this, params );
  
  this.setMinWidth( 40 );

}
JSFun.extend( DeploymentItem, TextBox );



/**
 * Checks if one part of property has been clicked and performs the adequate action
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method select
 * @param {Number} x Coordinate
 * @param {Number} y Coordinate
 * @return {Boolean} if one some part of property has been cliked
 */
DeploymentItem.prototype.select = function( x, y ) {  
	//checks if the up arrow has been clicked and then perform the related action
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;

    //checks if the down arrow has been clicked and then perform the related action
  } else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;
  
  }
  
  //in other cases checks if has been selected as a normal textbox
  return DeploymentItem.base.select.call( this, x, y );

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
DeploymentItem.prototype.drawShape = function( context ) {

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


/**
 * Draws the property item in the canvas element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
DeploymentItem.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();
  //set font style to draw as has been defined in the element
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();
  
  // set text on depends of property item position
  if(this._text)switch(this._pos){
  	//if the property item was alone, draw the text with open and close brackets
  	case 'alone':
  		var text= '{' + this._text + '}';
  		break;
  	//if the property item was the first, draw the text with open bracket and ","
  	case 'first':
  		var text= '{' + this._text + ',';
  		break;
  	//if the property item was the last, draw the text with close bracket
  	case 'last':
  		var text = this._text + '}';
  		break;
  	//if the property item don't have any specific position, draw the text with the separator(",")
  	default :
  		var text = this._text + ',';
  };

  //finally draw the text depending on his orientation
  if(this._orientation){
    context.translate(this._getMX() + this._line_height / 2, this._getMY() +4 );
    context.rotate((-90 * Math.PI)/180 );
    if(text)context.fillText( text, this._margin*2 - this.getHeight(), 0 );  
  } else {
      if(text){
      context.fillText( text, this._getMX() + 4,this._getMY() + this._line_height / 2 ); 
    }
  }
  context.restore();
}