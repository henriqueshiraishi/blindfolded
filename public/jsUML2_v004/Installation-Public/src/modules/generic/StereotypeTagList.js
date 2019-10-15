/**
 ** MODULE NAME: 
 **	  StereotypeTagList.js
 **
 ** DESCRIPTION:
 **   Represents a set of editable text fields by the user with the representation
 **   of a group of stereotypes of UML 2.
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


//= require <../modules/generic/StereotypeTag>


/**
 * StereotypeTagList class constructor, define a composite component consists of stereotype tags
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @StereotypeTagList StereotypeTagList
 * @extends StereotypeFields
 *
 */

var StereotypeTagList = function( params ) {

  params = params || {};
  StereotypeTagList.baseConstructor.call(this,params);
}
JSFun.extend(StereotypeTagList,StereotypeFields);



/**
 * Receives the delete's notification of a child component and it is removed
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be remove
 */


StereotypeTagList.prototype.notifyDelete = function( dcomp ) {		

/*
	if(this._parent._stereotypeProperties)
		this._parent._stereotypeProperties.removeStereotype(dcomp);
*/
	var i;
	//Properties of stereotype
	var stereotypeProperties = this._parent._stereotypeProperties;

	if(stereotypeProperties){

		/*
			Is searched if the tag value has been added to the node by existence
			of a stereotype object. If is found some match, the tag stereotype, 
			the figure and the tag values related with this stereotype 
			are removed of the node
		*/
		for(i=0;i<stereotypeProperties._appliedStereotypes.length;i++){
			if('\xAB' + stereotypeProperties._appliedStereotypes[i].getName() + '\xBB' == dcomp._text ){
				stereotypeProperties.removeStereotype(stereotypeProperties._appliedStereotypes[i]);
				break;
			}
		}
	}

  this.delSubComponent( dcomp );

  this.updateComponents();
}




/**
 * Delete a child of super-componet, if exists
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delSubComponent
 * @param {Component} dcom Component that will be remove
 */
StereotypeTagList.prototype.delSubComponent = function( dcom ) {
  var i;
  
  for( i in this._childs ) {
    if( this._childs[i] == dcom ) {
      this._childs.splice( i, 1 );
      break;
    }
  }
}




/**
 * Defines the element's type that will contain in the super-component.
 * In this case, will be a object of StereotypeTag type.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method newItem
 * @return {StereotypeTag} New object of component
 */
StereotypeTagList.prototype.newItem = function() {
  return new StereotypeTag({ text: '\xABstereotype\xBB', orientation : this._orientation || 0 });
}



/**
 * Receives a xml node with the information of 
 * the super-component and get it back
 *
 * @author Rafael Molina Linares
 * @update 5/12/2011
 *
 * @method setComponentXML
 * @param {DOMNode} xmlnode Xml node with the super-component's information
 */

StereotypeTagList.prototype.setComponentXML = function( xmlnode ) {

  var i;
  var childs = xmlnode.childNodes;
  
  if( xmlnode.getAttribute( 'visibleSubComponents' ) == 'true' ) {
    this._visibleSubComponents = true;
  } else {
    this._visibleSubComponents = false;
  }

	var value;
	var i;
  
  for( i = 0; i < childs.length; i++ ) {
		if(childs[i].getAttribute( 'stereotypeObject' ) == 'true'){

			value = childs[i].getAttribute( 'value' );
			this.applyStereotype(value);
		} else {
	    this.addField( childs[i].getAttribute( 'value' ) );
		}
  } 
}



/**
 * Apply a stereotype object to the object that contains the component StereotypetagList
 * and add a stereotype tag that contains the name of the stereotype object
 *
 * @author Rafael Molina Linares
 * @update 5/12/2011
 *
 * @method applyStereotype
 * @param {DOMNode} value Name of the stereotype object that wanna be applied
 */

StereotypeTagList.prototype.applyStereotype = function( value ) {

	var stereotypes = this._parent._stereotypeProperties._stereotypes;
	var metaclass;
	var value;
	var j,k;

	//Saves the Stereotype objects that have between its metaclasses to the element UML
	for(k=0;k<stereotypes.length;k++){

		//Metaclasses related with the stereotype object because of a extension's relation
		metaclass = stereotypes[k]._metaclass;

		//For each metaclass
		for(j=0;j<metaclass.length;j++){

			//If the metaclass's name match with the element's type of the current node
			if(metaclass[j].getName() == this._parent.getType()){

				//If the stereotype hasn't yet been in the 'fields' array
				if('\xAB' + stereotypes[k].getName() + '\xBB' == value)
						this._parent._stereotypeProperties.applyStereotype( stereotypes[k] );
			}
		}
	}
}

