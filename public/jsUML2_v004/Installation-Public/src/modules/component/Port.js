/**
 ** MODULE NAME: 
 **	  Component.js
 **
 ** DESCRIPTION:
 **   Contains the objects of the component diagrams of UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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

//= require <../modules/generic/UMLStereotype>
//= require <../modules/generic/StereotypeTagList>



/**
 * Port class constructor, creates a port in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @class Port
 * @extends Rectangular
 *
 */

var Port = function( params ) {
  params = params || {};
  Port.baseConstructor.call( this, params );
  
  //this.setType( 'Port' );
  
  this.setAlone();
  
  this.setWidth(14);
  this.setHeight(14);

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(this,params.stereotypes || []);
  
  this.addFigure( new RectangleFigure({ color: '#eeeeee' }) );
  this.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  this.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
  
  //this._node = null;
  
}
JSFun.extend( Port, Rectangular );



/**
 * Performs the necessary actions when the user
 * releases the mouse's button that had pressed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Port.prototype.drop = function( x, y ) {

  this.correctPosition();
  Port.base.drop.call( this, x, y ); 
}


/**
 * Colocates the node in the position correct on the parent node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Port.prototype.correctPosition = function() {
	
	//If this node isn't an associated action, exit the method
	if(!this._parent)
		return;

  var x = this._parent.getX();
  var y = this._parent.getY();
  var w = this._parent.getWidth();
  var h = this._parent.getHeight();
  
  var np = this._parent.getLinkCentered( this.getX() + 7, this.getY() + 7);
  var nx = np.getX();
  var ny = np.getY();
    
  this.setPosition( nx - 7, ny - 7 );
 	this.updatePositionComponents(nx,ny); 
}



/**
 * Updates the components's position regarding
 * the point indicated by the parameters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method updatePositionComponents
 */

Port.prototype.updatePositionComponents = function(nx,ny){
	var position = -1;
	if(nx == this._parent.getX())
		position = Component.Left;
	else if(nx == this._parent.getX() + this._parent.getWidth())
		position = Component.Right;
	else if(ny == this._parent.getY())
		position = Component.Top;
	else if(ny == this._parent.getY() + this._parent.getHeight())
		position = Component.Bottom;

	for(var i=0;i<this._components.length;i++)
		this._components[i]._setPosition(position);

	this.updateComponents();
}



/**
 * Notify to the node that a change has been produced,
 * some relationed element has changed and can affect it
 *
 * @author Martín Vega-leal Ordóñez         
 * @update 2/12/2010
 *
 * @method notifyChange
 */

Port.prototype.notifyChange = function() {
  var i;
  
  for( i in this._relations ) {
    this._relations[i].notifyChange();
  }

	this.correctPosition();
}



/**
 * Deletes the element and all elements that have relation with him, and
 * meaningless without the existence, as child nodes or relations
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method remove
 */

Port.prototype.remove = function() {
  Port.base.remove.call( this );
  
  this._parent.notifyDeleted( this );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Port.prototype.setName = function( text ){
	this._components[1].setValue( text );
}

/**
 * Get the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getName
 * @return {String} The element name
 *
 */

Port.prototype.getName = function(){
	return this._components[1].getValue();
}

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Port.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Port.prototype.getStereotype = function(){		
	return this._components[0];
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
Port.prototype.getNameAsComponent = function( ){
	return this._components[1];
}