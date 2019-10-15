/**
 ** MODULE NAME: 
 **	  RegionAlternativeItem.js
 **
 ** DESCRIPTION:
 **   Represents a component that allows to create new region in a alternative block of UML 2
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
  ** 	000 - Sep 2011 - RML - First version release
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
 * RegionAlternativeItem Class Constructor
 * Create a component that when is clicked creates a region
 *
 * @author Rafael Molina Linares
 * @update 9/7/2011
 *
 * @class RegionAlternativeItem
 * @extends RegionItem
 */
var RegionAlternativeItem = function( params ) {
  params = params || {};
  RegionAlternativeItem.baseConstructor.call( this, params );
}
JSFun.extend( RegionAlternativeItem, RegionItem );



/**
 * Create a node or region to the parent
 * 
 *
 * @author Rafael Molina Linares
 * @update 5/07/2011
 *
 * @method createRegion
 *
 */

RegionAlternativeItem.prototype.createRegion = function( ) {

	var lenComponents = this.getParent()._components.length;    


	//Adds a new region to the supernode
	if(this.getParent()._orientation) {//vertical orientation
		this.getParent().addRegion(new RegionAlternative({parent: this.getParent()}));
	} else {
		this.getParent().addRegion(new RegionAlternative({parent: this.getParent()}));
	}

}





