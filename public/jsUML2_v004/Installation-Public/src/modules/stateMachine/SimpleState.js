/**
 ** MODULE NAME: 
 **	  SimpleState.js
 **
 ** DESCRIPTION:
 **   Defines how is a simple state element of the state Machine diagrams of UML 2.
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
 * SimpleState class constructor, creates a simple state in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class SimpleState
 * @extends Rectangular
 *
 */
var SimpleState = function( params ){
	params = params || {};
	SimpleState.baseConstructor.call(this,params);
}
JSFun.extend(SimpleState, Rectangular);



/**
 * Receives a XML node with information of supernode and get this information back 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 *
 */
SimpleState.prototype.setElementXML = function( xmlnode ) {
  
	//Get the information back about the attributes of the simple state
  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();
  
  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );


  var i;
  var childs = xmlnode.childNodes;
  
	//Get the information back about the components of the simple state
  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {

			//If the child node is a 'SpecificationItem' component
			if(   childs[i].getAttribute( 'behaviors' ) != null 
				&& (childs[i].getAttribute( 'visible' ) == "true" || childs[i].getAttribute( 'visible' ) == "false")  ){

	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ), childs[i].getAttribute( 'behaviors' ), childs[i].getAttribute( 'visible' )  );
			}
			else
	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );

    } else if( childs[i].nodeName == 'superitem' ) {
    
      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }
    
  }
  
}



/**
 * Modifies the value of a node's component, if exists
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setValue
 * @param {String} id Id of the component 
 * @param {String} value Text tha will be assigned to the component
 * @param {Array} behaviors array that keeps the selected option of a 'select' form element(is used in the 'SpecificationItem' components)
 */

SimpleState.prototype.setValue = function( id, value , behaviors, visible) {
  var i;

  for( i in this._components ) {

    if( !( this._components[i] instanceof SuperComponent ) && this._components[i].getId() == id ) {

      this._components[i].setValue( value, behaviors, visible );
      this.updateComponents();
      return true;    
    }
  }

  return false;
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

SimpleState.prototype.setVisibility = function( bool ){

	this._visible = bool;
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object, 
		and the node going to be made visible, should be taken in account that only 
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	//Set the visibility of node's components
	for(var i=0;i<this._components.length;i++){
		/*
			if the component:
			- isn't a specification item or 
			- is a specifications item and hasn't a empty text or
			- in the case that the node show a image associated to a stereotype object, if the component specify the node's name 
		*/
		if( (_setVisibility || ( !_setVisibility && this._components[i]._id == 'name')) &&
				( !(this._components[i] instanceof SpecificationItem) ||										
				   this._components[i] instanceof SpecificationItem && this._components[i].getValue() != '')){ 
			this._components[i].setVisibility(bool);
		}
	}
	
	//Set the visibility of child nodes
	if(this._container && _setVisibility){
		for(i=0;i<this._nodeChilds.length;i++){
			this._nodeChilds[i].setVisibility( bool );
		}
	}
}


/**
 * Draws fully the simple state in the canvas element, 
 * calls to the drawing sub-functions to draw 
 * all components and figures of the node
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SimpleState.prototype.draw = function( context ) {

	//If the node isn't visible, this isn't drawn
	if(!this._visible)
		return;

	//Call to the base method
	SimpleState.base.draw.call(this, context);

	/*
		Draws the horizontal line that appears in 
		the simple state when the 'specification' 
		component is visible  
	*/
	if(this._components[2]._visible){
		context.save();
		context.fillStyle = '#000000';
		context.beginPath();
		
		context.moveTo( JSGraphic.toPixel( this.getX()), 
										JSGraphic.toPixel( this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());
		context.lineTo( JSGraphic.toPixel( this.getX() + this.getWidth()), 
										JSGraphic.toPixel( this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());

		context.closePath();
		context.fill();
		context.stroke();
		context.restore();  
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
SimpleState.prototype.addStereotype = function(text){
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
SimpleState.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the specification component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setSpecifications
 * @param {String} text Text to establish to the specification component
 *
 */

SimpleState.prototype.setSpecification = function( text ){
	
	//Set the component as visible
	this._components[2].setVisibility( true );

	//Replace the '\n' by ';'
	text = text.replace( /\n/gi, ';' );
	
	//Set the component's text 
	this._components[2].setText( text );
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

SimpleState.prototype.getStereotypes = function( ){
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
SimpleState.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the specifications of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getSpecifications
 * @return {String} Text of the element's specification
 *
 */
SimpleState.prototype.getSpecification = function( ){
	return this._components[2].getValue();
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
SimpleState.prototype.getStereotype = function(){		
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
SimpleState.prototype.getNameAsComponent = function( ){
	return this._components[1];
}