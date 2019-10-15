/**
 ** MODULE NAME: 
 **	  ParameterNode.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the ParameterNode element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Feb 2011 - RML - Second version release
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



//= require <../modules/activity/Pin>


/**
 * ParameterNode class constructor
 * Creates a  node parameter of the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @class ParameterNode
 * @extends Pin
 */
var ParameterNode = function( params ) {
  params = params || {};
  ParameterNode.baseConstructor.call( this, params );
     
	//Sets properties of the node
  this.setWidth(60);
  this.setHeight(30);  
}
JSFun.extend( ParameterNode, Pin );




/**
 * Colocates the node in the position correct on the parent node
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @class correctPosition
 *
 */
ParameterNode.prototype.correctPosition = function() {

	//If this node isn't parent, exit the method
	if(!this._parent)
		return;

	//Coordinates and size of the action associated to this node
  var x = this._parent.getX();
  var y = this._parent.getY();
  var w = this._parent.getWidth();
  var h = this._parent.getHeight();
  
	//Calculates the intersection's point between the parameter node and the node that constains to this
  var np = this._parent.getLinkCentered( this.getX() + this._width/2, this.getY() + this._height/2);
  var nx = np.getX();
  var ny = np.getY();
  
	//Set the position
  this.setPosition( nx - this._width/2, ny - this._height/2);
}



