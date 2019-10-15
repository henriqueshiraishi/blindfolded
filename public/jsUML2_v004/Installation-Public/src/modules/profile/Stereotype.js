/**
 ** MODULE NAME: 
 **	  Stereotype.js
 **
 ** DESCRIPTION:
 **   Defines a transition in the profile's diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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
 * Stereotype class constructor, creates a Stereotype element of a profile diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Stereotype
 * @extends Rectangular
 * @param {Array} diagrams Array of diagrams that the application has
 *
 */

var Stereotype = function( params ){
	params = params || {};
	Stereotype.baseConstructor.call(this,params);

	//Metaclass's array
	this._metaclass = [];
	
	//Set the array of diagrams of the extern application
	this.setDiagrams(params.diagrams || []);
}
JSFun.extend(Stereotype,Rectangular);



/**
 * Set the diagrams related with the Stereotype. When a change 
 * is done to the Stereotype object, this change will be propagate to this diagrams
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Array} diagrams Array of diagrams that will be notified of changes in the Stereotype object
 */

Stereotype.prototype.setDiagrams = function( diagrams ){
	this._diagrams = diagrams;
}


/**
 * A relation is added to the node, this means that the node has started 
 * to be part of a relationship and stores a reference to propagate changes
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */

Stereotype.prototype.addRelation = function( rel ) {

	Stereotype.base.addRelation.call(this,rel);
}



/**
 * Relation is removed from the node, the node has ceased 
 * to be part of the relation and does not need to store more information
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delRelation
 * @param {Relation} rel Relation to be remove
 */

Stereotype.prototype.delRelation = function( rel ){
	Stereotype.base.delRelation.call(this,rel);

	//The element B (object metaclass) of the relation delete this object stereotype of its '_stereotype' array
	rel._elemB.delStereotype(this);

	//The element B (object metaclass) of the relation is remove of the '_metaclass' array of this object stereotype
	this.delMetaclass(rel._elemB);
}



/**
 * Removes the item and all items that relate to it and make no sense 
 * without its existence as child nodes or relations to which it belongs
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method remove
 */
Stereotype.prototype.remove = function() {

	var rel = this._relations;

	//The element B (object metaclass) of the relation delete this object stereotype of its '_stereotype' array
	for(var i=0;i<rel.length;i++)
		rel[i]._elemB.delStereotype(this);

	//Call to base method
	Stereotype.base.remove.call(this);
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Stereotype.prototype.setName = function( text ) {
	this._components[1].setValue( text);
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addTagValue
 * @param {String} text Text that will contain the new field of the component
 *
 */

Stereotype.prototype.addTagValue = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Adds the route of the image associated to the object Stereotype
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method setPath
 * @param {String} text Text that will contain the route of the image
 *
 */

Stereotype.prototype.setPath = function(text){
	this._components[4].setValue( 'path:/' + text);
}



/**
 * Return the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getName
 * @return {String} name of the node
 *
 */
Stereotype.prototype.getName = function() {
// return	this._components[0].getValue();
 return	this._components[1].getValue();
}



/**
 * Return an array with all tag values associated to the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getTagValues
 * @return {Array} tag values contained in the node
 */

Stereotype.prototype.getTagValues = function() {

	var childs = this._components[3]._childs;
	var childsValues = [];
	
	for(var i=0;i<childs.length;i++)
		childsValues.push(childs[i].getValue());

	return childsValues;

}


/**
 * Return the image's route of the component that stored it.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getPath
 * @return {String} Image's route of the image associated to a Stereotype object
 */
Stereotype.prototype.getPath = function() {
 return	this._components[4].getValue().substring(5);
}



/**
 * Checks if a name of metaclass passed as parameter match with 
 * the name of the some metaclass contained in the _metaclass array of the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method _validMetaclass
 * @return {Boolean} If the passed parameter match with the name of some metaclas of the 'metaclass' array
 */

Stereotype.prototype._validMetaclass = function( metaclass ) {
	for(var i=this._metaclass.length;i--;)
		if(this._metaclass[i].getName() == metaclass)
			return true;
	return false;
}

/**
 * It is removed the metaclass passed as parameter of the '_metaclass' array of the object(if exist inside of the array).
 * Also, it is removed all element UML contained in the array of the node's diagrams 
 * that are of the type given by the name of the metaclass  to be removed
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delMetaclass
 * @param {Metaclass} metaclass Metaclass to remove of the 'metaclass' array 
 */

Stereotype.prototype.delMetaclass = function( metaclass ) {
  var i,j;

	/*
		remove all element UML contained in the array of the node's diagrams 
		that are of the type given by the name of the metaclass to be removed
	*/
	for(i in this._diagrams){

		for(var j=0;j<this._diagrams[i]._nodes.length;j++)
			if(this._diagrams[i]._nodes[j].getType() == metaclass.getName() && this._diagrams[i]._nodes[j]._stereotypeProperties){
				this._diagrams[i]._nodes[j]._stereotypeProperties.removeStereotype(this);
//				this._diagrams[i]._nodes[j]._stereotypeProperties.removeStereotype(this._components[1]);
			}				
	}

	//Remove the metaclass of the 'metaclass' array
  for( i in this._metaclass ) {
    if( this._metaclass[i] == metaclass ) {
      this._metaclass.splice( i, 1 );
      break;
    }
  }
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
Stereotype.prototype.getNameAsComponent = function( ){
	return this._components[1];
}