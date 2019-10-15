/**
 ** MODULE NAME: 
 **	  StereotypeNameItem.js
 **
 ** DESCRIPTION:
 **   Define the name of the a stereotype's object of UML 2.
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
 * StereotypeNameItem class constructor, creates a component to the name of the a stereotype's object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class StereotypeNameItem
 * @extends StereotypeItem
 *
 */

var StereotypeNameItem = function( params ) {

  params = params || {};
  StereotypeNameItem.baseConstructor.call(this,params);
}
JSFun.extend(StereotypeNameItem,TextBox);




/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setText
 * @param {String} newText New text that contains the object
 */
StereotypeNameItem.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {

		/*
			If the text has changed, it is called to the changeStereotype method of all nodes 
			and if this stereotype tag has been added to the node by existence of
			a stereotype object, the stereotype tag modify your text
		*/

		if(this._text != newText){
			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];
			for(var i in diagrams){
				nodes = diagrams[i]._nodes;
				for(var j=0;j<nodes.length;j++){
					if(nodes[j]._stereotypeProperties && this._parent){

						/*
							If the node has the same type than some of the metaclasses of the '_metaclass' array
							of the stereotype, the changeNameStereotype method is called
						*/

						if(this._parent._validMetaclass(nodes[j].getType()))
							nodes[j]._stereotypeProperties.changeNameStereotype(this._parent,'\xAB' + newText + '\xBB');
					}
				}
			}
		}
			
		//Call to the base method 
		StereotypeNameItem.base.setText.call(this, newText);
  }
}

