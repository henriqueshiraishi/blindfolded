/**
 ** MODULE NAME: 
 **	  TagValueFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of tag values to the stereotype's object with the restrictions required for
 **   an element of UML 2
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


//= require <../modules/profile/TagValueItem>


/**
 * TagValueFields Class Constructor.
 * Represents a set of tag value's fields with the restrictions UML for a element
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class TagValueFields
 * @extends CollapsibleFields
 */
var TagValueFields = function( params ) {
  params = params || {};
  TagValueFields.baseConstructor.call( this, params );
  
  this._default = params.text || 'new_attribute';
}
JSFun.extend( TagValueFields, CollapsibleFields );



/**
 * Defines the element's type that contains the super-component.
 * In this case, the object will be of type TagValueItem.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method newItem
 * @return {AttributeItem} New component's object
 */

TagValueFields.prototype.newItem = function() {
  return new TagValueItem({ text: this._default });
}



