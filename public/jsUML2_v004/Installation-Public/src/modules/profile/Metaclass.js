/**
 ** MODULE NAME: 
 **	  Metaclass.js
 **
 ** DESCRIPTION:
 **   Defines a transition in the state Machine diagram of UML 2.
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
 * Metaclass class constructor, creates a Metaclass object of profile diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Metaclass
 * @extends Rectangular
 * @param {Number} diagrams Array of diagrams in which a change of the Metaclass object is propagated
 * @param {Array} validMetaclass  Bidimensional array with a list of pairs that relates the given name to the objects 
 * 																in the application with the given name in the library
 */


var Metaclass = function( params ){
	params = params || {};
	Metaclass.baseConstructor.call(this,params);

	//Set the UML element types that can be set like name of the metaclass
	this.setValidMetaclass(params.validMetaclass || [])

	//stereotypes's array of the metaclass
	this._stereotypes = [];

	//Set the diagrams in which the changes of the metaclass will be propagated 
	this.setDiagrams(params.diagrams || []);
}
JSFun.extend(Metaclass,Rectangular);



/**
 * Compares each pairs of the nameMetaclass array (passed as parameter) with all names of 
 * the _validMetaclassLibrary, and the pairs that find a match will be saved 
 * in an array of valid metaclasses to the application
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setValidMetaclass
 * @param {Array} nameMetaclass Array of pairs that relates the given name to a element UML by the application with the given name by the library
 */

Metaclass.prototype.setValidMetaclass = function( nameMetaclass ){

	//It is checked that nameMetaclass is an array
	if(!JSFun.isArray(nameMetaclass))
		return;

	//Objects's name in the library that can be stereptyped
	this._validMetaclassLibrary = [  'UMLActor', 'UMLUseCase', 'UMLUseCaseExtended', 'UMLSystem', 'UMLSubSystem', 'UMLLine',
																	 'UMLClass', 'UMLComponent', 'UMLInterfaceExtended','UMLPackage', 'UMLPackageContainer',
																	 'UMLComComponent','UMLInterface','UMLLifeline', 'UMLOption', 'UMLAlternative',
																	 'UMLLoop', 'UMLBreak','UMLAcceptEventAction','UMLTimeEvent', 'UMLSendSignalAction', 
																	 'UMLAction','UMLObject', 'UMLActivity',  'UMLDataStore', 'UMLConnectorActivity' , 
																	 'UMLHorizontalHierarchicalSwimlane','UMLVerticalHierarchicalSwimlane',
																	 'UMLSimpleState', 'UMLCompositeState', 'UMLVerticalRegion', 'UMLPin', 'UMLParameterNode',
																	 'UMLExpansionNode', 'UMLHorizontalRegion', 'UMLPort', 'UMLTerminate', 'UMLEntryPoint', 
																	 'UMLExitPoint', 'UMLJunction', 'UMLFlowFinal', 'UMLDataType'  ];


	//Array that consists of pairs [object's name in the library, object's name in the application]
	this._validMetaclassApp = [];

	/*
		For each pair (object's name in the library, object's name in the application) 
		of the 'nameMetaclass' array, It is searched a match between the name of the object 
		in the library of each pair and one of the valid metaclass names established by the 
		library(they are found in the '_validMetaclassLibrary' array). If the match is found, 
		the pair gets into the '_validMetaclassApp' array.
	*/

	for(var i=0;i<nameMetaclass.length;i++)
		if(JSFun.isArray(nameMetaclass[i]) && nameMetaclass[i].length == 2)
			if(this.foundInArray(this._validMetaclassLibrary, nameMetaclass[i][1]))
				this._validMetaclassApp.push(nameMetaclass[i]);
				
	this._validMetaclassApp = this._sortNamesMetaclass(this._validMetaclassApp);
}


/**
 * It is sorted the two-bidimensional array passed as parameter
 *
 *
 * @author Rafael Molina Linares
 * @update 3/12/2011
 *
 * @method sortNamesMetaclass
 * @param {Array} array Array that contains the possible names of the metaclass
 */

Metaclass.prototype._sortNamesMetaclass = function( array ){

	array.sort(
		function( a, b ) {

			if( a[0] < b[0] ){
				return -1;
			}	else if( a[0] > b[0]){
				return 1;
			}	else {
				return 0;
			}			
	});

	return array;
}



/**
 * It is searched a match between the 'elem' parameter and some position of the array
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method foundInArray
 * @param {Array} array Array where searchs the elem parameter
 * @param {Array} elem  Element to search in the array 
 * @return{Boolean} If the element has been found in the array
 */

Metaclass.prototype.foundInArray = function(array, elem){

	for(var i=0;i<array.length;i++)
		if(elem == array[i])
			return true;

	return false;
}


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

Metaclass.prototype.setDiagrams = function( diagrams ){
	this._diagrams = diagrams;
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

Metaclass.prototype.setName = function( text ) {
	this._components[1].setValue( text);
}



/**
 * A relation is added to the node, this means that the node has started 
 * to be part of a relation and stores a reference to propagate changes
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */

Metaclass.prototype.addRelation = function( rel ) {

	Metaclass.base.addRelation.call(this,rel);
	this._stereotypes.push(rel._elemA);
	rel._elemA._metaclass.push(this);
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

Metaclass.prototype.delRelation = function( rel ){

	Metaclass.base.delRelation.call(this,rel);

	rel._elemA.delMetaclass(this);
	this.delStereotype(rel._elemA);
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

Metaclass.prototype.remove = function() {

	var rel = this._relations;
	for(var i=0;i<rel.length;i++)
		rel[i]._elemA.delMetaclass(this);

	Metaclass.base.remove.call(this);
}


/**
 * Deletes the relation that is passed as parameter
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method notifyDeleted
 *
 */

Metaclass.prototype.notifyDeleted = function( rel ) {
  var i;

	//Searchs a match in the relations array  
  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
			//delete the information of each relation's element to the another element
			this.delStereotype(rel._elemA);			
			rel._elemA.delMetaclass(this);			
		
			//Delete the rel of the relations's array
      this._relations.splice( i, 1 );
    }
  }
  
}



/**
 * It is removed the stereotype passed as parameter of the '_stereotype' array of the object(if exist inside of the array).
 * So this, it is searched inside of the '_stereotype' array, and if is found, it is removed.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delStereotype
 * @param {Metaclass} stereotype Stereotype to remove of the '_stereotype' array 
 */

Metaclass.prototype.delStereotype = function( stereotype ) {
  var i;
  
  for( i in this._stereotypes ) {
    if( this._stereotypes[i] == stereotype ) {
      this._stereotypes.splice( i, 1 );
      break;
    }
  }
  
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

Metaclass.prototype.getName = function() {
	for(var i=0;i<this._validMetaclassApp.length;i++)
		if(this._validMetaclassApp[i][0] == this._components[1].getValue())
		 return	this._validMetaclassApp[i][1];
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
Metaclass.prototype.getNameAsComponent = function( ){
	for(var i=0;i<this._validMetaclassApp.length;i++)
		if(this._validMetaclassApp[i][0] == this._components[1])
			return this._components[1];
}