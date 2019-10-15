/**
 ** MODULE NAME: 
 **	  ComponentElement.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the AcceptEventAction element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Initial version release
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
 * ComponentElement ComponentElement constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @ComponentElement ComponentElement
 * @extends Rectangular
 *
 */

var ComponentElement = function( params ) {

  params = params || {};
  this._abstract=false;
  ComponentElement.baseConstructor.call(this,params);
}
JSFun.extend(ComponentElement,Rectangular);




/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
ComponentElement.prototype.getElementXML = function( parent ) {
	  var xmlnode = ComponentElement.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
ComponentElement.prototype.setElementXML = function( xmlcomponent ) {
	  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
	  ComponentElement.base.setElementXML.call( this, xmlcomponent );
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

ComponentElement.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

ComponentElement.prototype.setName = function( text ){
	this._components[3].setValue( text );
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

ComponentElement.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[4].addField( text );
}


/**
 * Adds new item to the operation fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

ComponentElement.prototype.addOperation = function(text){
	var text = text || '';
	this._components[5].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

ComponentElement.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
ComponentElement.prototype.getName = function( ){
	return this._components[3].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

ComponentElement.prototype.getAttributes = function( ){
	return	this._components[4]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

ComponentElement.prototype.getOperations = function( ){
	return	this._components[5]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

ComponentElement.prototype.getStereotype = function(){
	return this._components[1];
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
ComponentElement.prototype.getNameAsComponent = function( ){
	return this._components[3];
}




/**
 * Returns the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the component is abstract
 *
 */
ComponentElement.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the component
 *
 */
ComponentElement.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}