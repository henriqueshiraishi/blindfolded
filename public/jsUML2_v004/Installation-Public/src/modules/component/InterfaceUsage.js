/**
 ** MODULE NAME: 
 **	  InterfaceUsage.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the InterfaceUsage element of the class diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Initial version release
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
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
 * InterfaceUsage class constructor, creates a relation InterfaceUsage in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class InterfaceUsage
 * @extends Relation
 *
 */

var InterfaceUsage = function( params ) {

  params = params || {};
  InterfaceUsage.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceUsage,Relation);



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
InterfaceUsage.prototype.setName = function( text ){
	this._components[0].setValue( text );
}



/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceUsage.prototype.getName = function( ){
	return this._components[0].getValue();
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceUsage.prototype.getNameAsComponent = function( ){
	return this._components[0];
}





/**
 * The relation and its components are drawn with the defined style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/06/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas 
 */
InterfaceUsage.prototype.draw = function( context ) {
  var npoints = this._points.length;
  //Draw the line with his defined styles
  if( this._line ) {
	var ax = this._points[ npoints - 2 ].getX();
	var ay = this._points[ npoints - 2 ].getY();
	var bx = this._points[ npoints - 1 ].getX();
	var by = this._points[ npoints - 1 ].getY();   
	var angle = Math.atan2( by - ay , bx - ax );
	this._points[ npoints - 1 ].setX(this._points[ npoints - 1 ].getX()-(4*Math.cos(angle)));
	this._points[ npoints - 1 ].setY(this._points[ npoints - 1 ].getY()-(4*Math.sin(angle)));
	this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );
    this._points[ npoints - 1 ].setX(this._points[ npoints - 1 ].getX()+(4*Math.cos(angle)));
    this._points[ npoints - 1 ].setY(this._points[ npoints - 1 ].getY()+(4*Math.sin(angle)));

  }
  
  //Draw the style tip of link
  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();   
    var angle = Math.atan2( by - ay , bx - ax );

    this._end.draw( context, bx, by, angle, this.getLineColor() );  
  }
  
  //Draw the style end of link
  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    
    this._start.draw( context, bx, by, angle, this.getLineColor() );  
  
  }
  
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