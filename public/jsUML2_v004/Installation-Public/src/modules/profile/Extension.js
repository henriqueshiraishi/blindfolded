/**
 ** MODULE NAME: 
 **	  Extension.js
 **
 ** DESCRIPTION:
 **   Defines a Extension element in the profile's diagram of UML 2.
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
 * Extension class constructor, creates a Extension element of profile's diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Extension
 * @extends Relation
 *
 */

var Extension = function( params ){
	params = params || {};
	Extension.baseConstructor.call(this,params);
}
JSFun.extend(Extension,Relation);



/**
 * Defines the elements that are parte of the extension.
 * It is used when this elements hasn't been indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElements
 * @param {Element} elemA First relation's element
 * @param {Element} elemB Second relation's element
 * @return {Boolean} If it is has produced the allocation of new elements
 */

Extension.prototype.setElements = function( elemA, elemB ) {

	//In the relation has to be a stereotype and a metaclass, but it leaves the method
	if(!((elemA instanceof Stereotype && elemB instanceof Metaclass) || (elemB instanceof Stereotype && elemA instanceof Metaclass)))
		return;

	//If both element are of 'Element' type
  if( elemA instanceof Element && elemB instanceof Element ) {
  
		//Both elements can't be of 'Relation' type
    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }
    
		//Before elements of relations are removed
    if( this._elemA ) {
      this._elemA.delRelation( this );
    }
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }
    
		/*
			The element A must forever be the stereotype object.
			The element B must forever be the metaclass object.
		*/	
    this._elemA = (elemA instanceof Stereotype) ? elemA : elemB;
    this._elemB = (elemB instanceof Metaclass)  ? elemB : elemA;

		//The element are added to the relation
    this._elemA.addRelation( this );
    this._elemB.addRelation( this );

    this.updateParent();
    this._calculateLineEnds();


 
    return true;
  
  } else { 
    return false;
  }
}


/**
 * Defines the first element that is part of the relation 
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 * @return {Boolean} If the allocation of the new element has been done
 */
Extension.prototype.setElementA = function( elem ) {

	//The element A must forever be a stereotype object
	if(elem.getType() == 'UMLStereotype')
		Extension.base.setElementA.call(this,elem);
}



/**
 * Defines the second element that is part of the relation
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElementB
 * @param {Element} elem Second element of the relation
 * @return {Boolean} If the allocation of the new element has been produced
 */
Extension.prototype.setElementB = function( elem ) {

	//The element B must forever be a metaclas object
	if(elem.getType() == 'UMLMetaclass')
		Extension.base.setElementB.call(this,elem);
}




