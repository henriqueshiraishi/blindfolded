/**
 ** MODULE NAME: 
 **	  SwimlaneItem.js
 **
 ** DESCRIPTION:
 **   Represents a component that allows to create new region in a supernode
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


//= require <../modules/activity/Swimlane>



/**
 * SwimlaneItem Class Constructor
 * Create a component that when is clicked creates a region or swimlane
 *
 * @author Rafael Molina Linares
 * @update 14/09/2011
 *
 * @class SwimlaneItem
 * @extends RegionItem
 */
var SwimlaneItem = function( params ) {
  params = params || {};
  SwimlaneItem.baseConstructor.call( this, params );
}
JSFun.extend( SwimlaneItem, RegionItem );


/**
 * Create a node or region to the parent
 *
 * @author Rafael Molina Linares
 * @update 14/09/2011
 *
 * @method createRegion
 */
SwimlaneItem.prototype.createRegion = function( ) {

	//length of the components's array
	var lenComponents = this.getParent()._components.length;    


	//Adds a new region to the supernode
	if(this.getParent()._orientation) {//vertical orientation

		//Calculate the height of the component
		if(this._parent instanceof HierarchicalSwimlane)
			var heightComp = this.getParent()._components[0]._height + this.getParent()._components[1]._height; 
		else
			var heightComp = 0;

		//Adds swimlane(region) to the parent
		this.getParent().addRegion(new Swimlane({parent: this.getParent(), y: this.getParent().getY() + heightComp, x: this.getParent().getX()}));
	}
	else{
		//Calculate the width of the component
		if(this._parent instanceof HierarchicalSwimlane)
			var widthComp = this.getParent()._components[0]._width + this.getParent()._components[1]._width; 
		else
			var widthComp = 0;

		//Adds swimlane(region) to the parent
		this.getParent().addRegion(new Swimlane({parent: this.getParent(), y: this.getParent()._components[lenComponents -1 ]._getY(), x: this.getParent().getX()  + widthComp }));

	}
}





