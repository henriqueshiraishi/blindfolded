/**
 ** MODULE NAME: 
 **	  NAssociation.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the n-ary association's relation of the class diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidago (AAH)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Agu - AAH - 
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
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
 * NAssociation class constructor, creates a relation of n-ary association in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/09/2012
 *
 * @class NAssociation
 * @extends Relation
 *
 */

var NAssociation = function( params ) {
  params=params || {};
 
  NAssociation.baseConstructor.call(this,params);
}
JSFun.extend(NAssociation,Rhombus);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NAssociation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
NAssociation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method setRole
 * @param {Element} element  Element witch role is gone be set. 
 * @param {String} text New value of element's role. 
 *
 */

NAssociation.prototype.setRole = function(element,text){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentRoleA(text);
	}
}


/**
 * Set the multiplicity of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method Multiplicity
 * @param {Element} element  Element witch multiplicity is gone be set. 
 * @param {String} multi New value of element's multiplicity. 
 *
 */

NAssociation.prototype.setMultiplicity = function(element,multipicity){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentMultiplicityA(multipicity);
	}
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NAssociation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NAssociation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getRole
 * @param {Element} element  Element witch role is gone be get. 
 * @return {String} Text of the associated element  role component
 *
 */

NAssociation.prototype.getRole = function(element ){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._roleA)
			return this._relations[i]._roleA.getValue();
	}
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getMultiplicity
  * @param {Element} element  Element witch multiplicity is gone be get. 
 * @return {String} Text of the associated  element multiplicity component.
 *
 */

NAssociation.prototype.getMultiplicity = function(element){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._multiA)
			return this._relations[i]._multiA.getValue();
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
NAssociation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
NAssociation.prototype.getRelations=function() {
	return this._relations;
}



/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
NAssociation.prototype.setElements = function( elem,elem2) {
	//comprobamos si se busca llamar a la funcion setElements con 2 parametros
	if(!(elem instanceof Array)){
		if(elem instanceof Node &&elem2 instanceof Node)
		{
			relation=new AssociationN({a:elem,b:this});  
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	relation=new AssociationN({a:elem2,b:this});  
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	this.notifyChange();
			return true;
		}
		return false;
	}
	//comprobamos que todos los elementos sean nodos
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	//comprobamos que sean al menos dos elementos
	 if(elem[0]&&elem[1])
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.notifyChange();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method getElement
 * @param {Element} elem  Element witch associated relation is gone be get. 
 * @return {Relation}  The relation associated to the element.
 */
NAssociation.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA==elem)return this._relations[i];
	 }
}




/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
NAssociation.prototype.addElement = function( elem) {
	//check if the elem is a node
	  if(!(elem instanceof Node) )return false;
	  
    //check if the node was part of the relation
  for(i in this._relations ) if(this._relations[i]._elemA==elem )return false;
 
   //add the new relation
 	relation=new AssociationN({a:elem,b:this});  
    relation._calculateLineEnds();
    relation.updateParent();
    this.notifyChange();
    return true;
}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
NAssociation.prototype.delElement = function( elem) {
	//comprobamos que el elemento sea un nodo
  if(!(elem instanceof Node) )return false;
	  

  for(i in this._relations ){
	  if(this._relations[i]._elemA==elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }     
  return false;
}



/**
 * Constructor de la clase AssociationN
 * Representa una relación n-aria
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 03/10/2012
 *
 * @class AssociationN
 * @extends Relation
 */
var AssociationN = function( params ) {
	//Initializes the 'params' value if hasn't
	var params = params || {};
  var f = new Relation( params );

  f.setType( 'AssociationN' );
  
  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentMultiplicityA();
  
	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);
 
  f.setLine( new SolidLine() );
  
  return f;
}

