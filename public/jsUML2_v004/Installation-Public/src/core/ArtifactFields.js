/**
 ** MODULE NAME: 
 **	  ArtifactFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of artifact items with the restrictions required for
 **   an element of UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - May 2013 - AAH - Fourth version release
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
//= require <ArtifactItem>



/**
 * Constructor of the class PropertyFields
 * Represents a group of PropertyItems
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class PropertyFields
 * @extends CollapsibleFields
 */
var ArtifactFields = function( params ) {
  params = params || {};
  ArtifactFields.baseConstructor.call( this, params );
  
  this._default = params.text || 'new_artifact';
}
JSFun.extend(ArtifactFields, CollapsibleFields );




/**
 * Defines the kind of element to be contained by the super-component
 * in this case PropertyItem
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method newItem
 * @return {ArtifactItem} New object to be contained
 */
ArtifactFields.prototype.newItem = function() {
  return new ArtifactItem({ text: this._default });
}




/**
 * Draws the object in the canvas element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/03/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Canvas's context
 */
ArtifactFields.prototype.draw = function( context ) {
  
	if(!this._visible)
		return;  
  CollapsibleFields.base.draw.call( this, context );
}