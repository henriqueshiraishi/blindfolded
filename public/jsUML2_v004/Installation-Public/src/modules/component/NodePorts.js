/**
 ** MODULE NAME: 
 **	  Component.js
 **
 ** DESCRIPTION:
 **   Contains the objects of the component diagrams of UML 2
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Third version release
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


//= require <../modules/component/Port>



/**
 * NodePort class constructor, creates a node that can container port
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @class Port
 * @extends Rectangular
 *
 */

var NodePorts = function( params ) {
  params = params || {};
  this._abstract=false;
  NodePorts.baseConstructor.call( this, params );
 
  this._ports = [];
}
JSFun.extend( NodePorts, Node );


/**
 * Adds a port to the node
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @method addPort
 * @param {Node} port Port that will be added to the nodePort
 */

NodePorts.prototype.addPort = function( port ) {
  
  if( port instanceof Node && port.getType() == 'UMLPort' ) {  
    this._ports.push( port );
    this._diagram._addNode( port );
    port.setParent( this );    
    port.correctPosition();
  }
}



/**
 * Set the figure that will be drawn and if the figure 
 * to draw is a image, the components of the node are hidden
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setSelectedFigure
 * @param {Number} numFig Position of the figure's array that will be drawn
 *
 */

NodePorts.prototype.setSelectedFigure = function( numFig ){

	var selectedFigure = NodePorts.base.setSelectedFigure.call(this,numFig);

	/*
		If the call of the 'setSelectedFigure' has selected a new figure, the method returns true. 
		If this method receives a number of figure not valid, or already selected, the method 
		returns false and the method doesn't change the visibility of the ports
	*/
	if(selectedFigure){

		//If the figure selected for drawing is a image
		if(this._figures[numFig] instanceof FromImageFigure){

			//Set visibility of ports to false
			for(i in this._ports){
				this._ports[i].setVisibility( false );
			}
		} else {//If the figure selected for drawing isn't a image

			//Set visibility of ports to true
			for(i in this._ports){
				this._ports[i].setVisibility( true );
			}
		}
	}
		
}

/**
 * Set the node's visibility, so such to its components and its child nodes
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @private
 * @param {Boolean} bool Visibility to apply to the node
 */

NodePorts.prototype.setVisibility = function( bool ){

	NodePorts.base.setVisibility.call(this,bool);
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object, 
		and the node going to be made visible, should be taken in account that only 
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	//Set the visibility of child nodes
	if(this._container && _setVisibility){
		for(i in this._ports){
			this._ports[i].setVisibility( bool );
		}
	}
}


NodePorts.prototype.updatePosition = function( movx, movy ) {
  
  if( movx == undefined && movy == undefined ) {
    var mov = this.getMovement();
    var mx = mov.getX();
    var my = mov.getY();
  } else {
    var mx = movx;
    var my = movy;
  }
  
  var i;
  for( i in this._ports ) {
    this._ports[i].updatePosition( mx, my );
  }
  
  NodePorts.base.updatePosition.call( this, movx, movy );
}



NodePorts.prototype.notifyChange = function() {
  NodePorts.base.notifyChange.call( this );
  
  var i;
  
  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }
}

NodePorts.prototype.updateContainer = function() {
  NodePorts.base.updateContainer.call( this );
  
  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }

}


NodePorts.prototype.remove = function() {
  NodePorts.base.remove.call( this );
  
  var i;
  for( i in this._ports ) {
    this._ports[i].remove();
  }
}





/**
 * Generates a XML node with the information of the node
 *
 * @author Rafael Molina Linares	Alejandro Arrabal Hidalgo
 * @update 17/10/2011 	30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
NodePorts.prototype.getElementXML = function( parent ) {
  var xmlnode = NodePorts.base.getElementXML.call( this, parent );
  xmlnode.setAttribute( 'abstract', this.isAbstract() );
  var i;
  for( i in this._ports ) {
    xmlnode.appendChild( this._ports[i].getElementXML( parent ) );
  }
  
  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back 
 *
 * @author Rafael Molina Linares	Alejandro Arrabal Hidalgo
 * @update 17/10/2011 	30/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
NodePorts.prototype.setElementXML = function( xmlcomponent ) {
	  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
	  NodePorts.base.setElementXML.call( this, xmlcomponent );
}


NodePorts.prototype.addChild = function( child ) {
  if( child instanceof Port ) {
   
    this._ports.push( child );
    //child.setNode( this );
    child.setParent( this );
    
    child.correctPosition();
    return;
  } else {
  
    NodePorts.base.addChild.call( this, child );
  }  
  
}

NodePorts.prototype.notifyDeleted = function( elem ) {
  
  if( elem instanceof Port ) {
    var i;
    for( i in this._ports ) {
      if( this._ports[i] == elem ) {
        this._ports.splice( i, 1 )
      }  
    }
  } else {
    NodePorts.base.notifyDeleted.call( this, elem );
  }
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

NodePorts.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[2].addField( '\xAB' + text + '\xBB' );
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

NodePorts.prototype.setName = function( text ){
	this._components[3].setValue( text );
}



/**
 * Adds new item to the attribute fields component of interfaces of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addInterface
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addInterface = function(text){
	var text = text || '';
	this._components[4].addField( text );
}


/**
 * Adds new item to the attribute fields component of realizations of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addRealization
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addRealization = function(text){
	var text = text || '';
	this._components[5].addField( text );
}


/**
 * Adds new item to the attribute fields component of artifacts of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/10/2011
 *
 * @method addArtifact
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addArtifact = function(text){
	var text = text || '';
	this._components[6].addField( text );
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

NodePorts.prototype.getStereotypes = function( ){
	return	this._components[2]._childs;
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
NodePorts.prototype.getName = function( ){
	return this._components[3].getValue();
}



/**
 * Return the interfaces of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getInterfaces
 * @return {Array} Array with the interface components of the element
 *
 */

NodePorts.prototype.getInterfaces = function( ){
	return	this._components[4]._childs;
}



/**
 * Return the realizations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRealizations
 * @return {Array} Array with the realization components of the element
 *
 */

NodePorts.prototype.getRealizations = function( ){
	return	this._components[5]._childs;
}



/**
 * Return the artefacts of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getArtefacts
 * @return {Array} Array with the artefact components of the element
 *
 */

NodePorts.prototype.getArtifacts = function( ){
	return	this._components[6]._childs;
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

NodePorts.prototype.getStereotype = function(){		
	return this._components[2];
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
NodePorts.prototype.getNameAsComponent = function( ){
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
NodePorts.prototype.isAbstract  = function(){
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
NodePorts.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}


/**
 * Returns the ports of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/08/2013
 *
 * @method getPorts
 * @return {Array} the component ports
 *
 */
NodePorts.prototype.getPorts  = function(){
	return this._ports;
}