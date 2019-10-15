/**
 ** MODULE NAME: 
 **	  NodeInterface.js
 **
 ** DESCRIPTION:
 **   Contains the objects of the component diagrams of UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
 ** 	001 - Sep 2011 - RML - Second version release
 ** 	000 - Feb 2011 - MVL - First version release
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
 * NodeInterface class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @class NodeInterface
 * @extends Elliptical
 *
 */
var NodeInterface = function( params ) {
  params = params || {};
  this._abstract=false;
  NodeInterface.baseConstructor.call( this, params );

}
JSFun.extend( NodeInterface, Elliptical );



/**
 * Draws the node on the canvas element
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element
 *
 */
NodeInterface.prototype.draw = function( context ) {
  var no = false;
  var realization = false;
  
  if( this._relations.length <= 0 ) {
    no = true;
  }
  
  var i;
  for( i in this._relations ) {
    if( this._relations[i].getType() == 'UMLInterfaceRealization' || this._relations[i].getType() == 'UMLInterfaceUsage' ) {
      realization = true;
      break;
    }
  }
  
    NodeInterface.base.draw.call( this, context );
    
    if( this._selected ) {
      this.drawComponentsShape( context );
    }

}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodeInterface.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodeInterface.prototype.setName = function( text ){
	this._components[1].setValue( text );
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

NodeInterface.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
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
NodeInterface.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodeInterface.prototype.getStereotype = function(){		
	return this._components[0];
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
NodeInterface.prototype.getNameAsComponent = function( ){
	return this._components[1];
}

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
NodeInterface.prototype.getElementXML = function( parent ) {
	  var xmlnode = NodeInterface.base.getElementXML.call( this, parent );
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
NodeInterface.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  NodeInterface.base.setElementXML.call( this, xmlcomponent );
	}



/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
NodeInterface.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
NodeInterface.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}