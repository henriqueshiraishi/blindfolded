/**
 ** MODULE NAME: 
 **	  NodeAction.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the NodeAction element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
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


//= require <../modules/component/Port>



/**
 * NodeAction class constructor, creates a action element in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class NodeAction
 * @extends Node
 *
 */
var NodeAction = function( params ) {
  params = params || {};
  NodeAction.baseConstructor.call( this, params );
 
  this._ports = [];
}
JSFun.extend( NodeAction, Node );



/**
 * Adds a port to the node
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method addPort
 * @param {CanvasRenderingContext2D} xmlnode XML node with the node's information
 */
NodeAction.prototype.addPort = function( port ) {
  
	//Only adds a element in the ports's array if this element is of type Pin
  if( port instanceof Pin){ 

		//Adds to ports's array
    this._ports.push( port );
		
		//adds pin to the diagram
    this._diagram._addNode( port );

		//Sets parent of the port
    if(this._container)
      port.setParent( this );
    else
      port.setAction( this );

		//Updates position of port        
    port.correctPosition();
  }
}


/**
 * Set the figure that will be drawn and if the figure to draw is a image, the components of the node are hidden
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setSelectedFigure
 * @param {Number} numFig Position of the figure's array that will be drawn
 *
 */
NodeAction.prototype.setSelectedFigure = function( numFig ){

	//Call to the base method
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
NodeAction.prototype.setVisibility = function( bool ){

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



/**
 * Updates the element's position according to the given movement by parameters and 
 * and transmits to your soon elements
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method updatePosition
 * @param {Number}  movx Desplazamiento en el eje x
 * @param {Number}  movy Desplazamiento en el eje y
 * @param {Boolean} displacementRegion Indicates that this method has been called because of a region's displacement 
 */
NodeAction.prototype.updatePosition = function( movx, movy, displacementRegion ) {

	//Initializes the value of the parameter 'displacementRegion'
  displacementRegion = displacementRegion || false;  

  if( movx == undefined && movy == undefined ) {
		/* If the coordinates has been given as a point */
    var mov = this.getMovement();
    var mx = mov.getX();
    var my = mov.getY();
  } else {
    var mx = movx;
    var my = movy;
  }

  var i;
	
	//Update position of your ports
  for( i in this._ports ) {
    this._ports[i].updatePosition( mx, my, displacementRegion );
  }
   
	//Call to base method
  NodeAction.base.updatePosition.call( this, movx, movy, displacementRegion );
}


/**
 * Notify to the node that a change has been produced, some of the 
 * related elements has changed and it can affect
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method notifyChange
 *
 */
NodeAction.prototype.notifyChange = function() {
	
	//Calls to the base method
  NodeAction.base.notifyChange.call( this );
  
  var i;
  
	//Notifies changes in the ports of the action
  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }
}


/**
 * If the node that calls to this method, is container, check your minimal size
 * according to the contained elements within it and your components
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method updateContainer
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 *
 */
NodeAction.prototype.updateContainer = function(recall) {

	//Calls to the base method
  NodeAction.base.updateContainer.call( this, recall );
  
	//notifies change in the pins of the action
  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }
}


/**
 * Removes the element and all elements that keep relation with
 * him and meaningless without the existence
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method remove
 */
NodeAction.prototype.remove = function() {
	//Calls to base method
  NodeAction.base.remove.call( this );
  
	//Delete all pin contained in the ports's array
  var i;
  for( i in this._ports ) {
    this._ports[i].remove();
  }
}


/**
 * Get a Xml node with the information of supernode
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method getElementXML
 * @param {DOMNode} parent Node parent of the xml tree that is generated
 * @return {DOMNode} Xml node with the information of the object
 */
NodeAction.prototype.getElementXML = function( parent ) {
	
	//Calls to the base method
  var xmlnode = NodeAction.base.getElementXML.call( this, parent );
  
	//Adds pins of the action to the xml node
  var i;
  for( i in this._ports ) {
    xmlnode.appendChild( this._ports[i].getElementXML( parent ) );
  }
  
  return xmlnode;
}

/**
 * Adds a child to the current node, a reference is kept to 
 * propagate changes in the node
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method addChild
 * @param {Element} elem New soon of the node
 */
NodeAction.prototype.addChild = function( child ) {
  if( child instanceof Pin ) {
   
		//Adds child
    this._ports.push( child );

		//Sets parent of the port
    if(this._container)
      child.setParent( this );
    else
      child.setAction( this );    

    //Put to the child in your correct position
    child.correctPosition();
    return;
  } else {
  
    NodeAction.base.addChild.call( this, child );
  }  
  
}


/**
 * Receives the notification of delete of a child's component and it is removed
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method notifyDelete
 * @param {Component} elem Element that will be removed
 */
NodeAction.prototype.notifyDeleted = function( elem ) {
  
	//If the element is a port, then this is remove
  if( elem instanceof Pin ) {
    var i;
		
		//If the pin is found, this is remove
    for( i in this._ports ) {
      if( this._ports[i] == elem ) {
        this._ports.splice( i, 1 )
      }  
    }
  } else {
    NodeAction.base.notifyDeleted.call( this, elem );
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
NodeAction.prototype.addStereotype = function(text){
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
NodeAction.prototype.setName = function( text ){
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

NodeAction.prototype.getStereotypes = function( ){
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
NodeAction.prototype.getName = function( ){
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
NodeAction.prototype.getStereotype = function(){		
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
NodeAction.prototype.getNameAsComponent = function( ){
	return this._components[1];
}