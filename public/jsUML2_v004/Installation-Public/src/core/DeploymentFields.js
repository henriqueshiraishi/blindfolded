/**
 ** MODULE NAME: 
 **	  DeploymentFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of proprety fields with the restrictions required for
 **   an element of UML 2
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

//= require <CollapsibleFields>
//= require <DeploymentItem>



/**
 * Constructor of the class DeploymentFields
 * Represents a group of PropertyItems
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class DeploymentFields
 * @extends CollapsibleFields
 */
var DeploymentFields = function( params ) {
  params = params || {};
  DeploymentFields.baseConstructor.call( this, params );
  
  this._default = params.text || 'new_deploymentproperty';
}
JSFun.extend(DeploymentFields, CollapsibleFields );



/**
 * Defines the kind of element to be contained by the super-component
 * in this case PropertyItem
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method newItem
 * @return {PropertyItem} New object to be contained
 */
DeploymentFields.prototype.newItem = function() {
  return new DeploymentItem({ text: this._default });
}



/**
 * Updates the position of childs contained by the super-component
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method _updatePos
 * @private
*/
DeploymentFields.prototype._updatePos = function() {
	 //check if  the childs is alone 
	 if(this._childs.length==1){
		  this._childs[0]._pos='alone';
		  return;
	  }
	 //Set the child position
	  for(i=0; i <this._childs.length;i++){
		  if(i == 0){this._childs[i]._pos='first';}
		  else if(i==this._childs.length-1){this._childs[i]._pos='last';}
		  else{this._childs[i]._pos=' ';}
	  }
}


/**
 * Adds a component to the super-component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update  12/03/2013
 *
 * @method addSubComponent
 * @param {Component} ncom New component of the element
 */
DeploymentFields.prototype.addSubComponent = function( ncom ) {
	DeploymentFields.base.addSubComponent.call( this, ncom);
	//when a sub component was added their position was updated
	if( ncom instanceof Component ) {
	  this._updatePos();
  }
  
}



/**
 * Deletes a component of the super-component, if exists
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method delSubComponent
 * @param {Component} dcom Component that will be remove
 */
DeploymentFields.prototype.delSubComponent = function( dcom ) {
	DeploymentFields.base.delSubComponent.call( this, dcom);
	//when a sub component was remove their position was updated
	this._updatePos();
}




/**
 * Receives the notification to raise the component a position and moves it to its new location
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method notifyToUp
 * @param {Component} ucom Component to move to the new position
 */
DeploymentFields.prototype.notifyToUp= function( ucom ) {
	DeploymentFields.base.notifyToUp.call( this, ucom);
	//when a sub component change his position this need to be updated
	this._updatePos();
}




/**
 * Receives the notification of go down the component a position and moves it to its new location
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method notifyToDown
 * @param {Component} dcom Component to move to the new location
 */
DeploymentFields.prototype.notifyToDown= function( dcom ) {
	DeploymentFields.base.notifyToDown.call( this, dcom);
	//when a sub component change his position this need to be updated
	this._updatePos();
}




/**
 * Draws the object in the canvas element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 13/03/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Canvas's context
 */
DeploymentFields.prototype.draw = function( context ) {
  
	if(!this._visible)
		return;  
  CollapsibleFields.base.draw.call( this, context );
}