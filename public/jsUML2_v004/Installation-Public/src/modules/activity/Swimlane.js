/**
 ** MODULE NAME: 
 **	  Swimlane.js
 **
 ** DESCRIPTION:
 **   Represents a the properties and method of a swimlane in the activity diagram
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



//= require <../modules/activity/SwimlaneLine>



/**
 * Swimlane class Constructor, creates a swimlane in the diagram
 *
 * @author Rafael Molina Linares
 * @update 14/09/2011
 *
 * @class Swimlane
 * @extends Region
 *
 */
var Swimlane = function( params ) {

  params = params || {};  
  Swimlane.baseConstructor.call(this,params);
  this._type = 'Swimlane';
}
JSFun.extend( Swimlane, Region );



/**
 * Adds the components to the Swimlane according to the orientation of the supernode that contains that Swimlane
 * 
 * @author Rafael Molina Linares
 * @update 14/09/2011
 *
 * @method addComponents
 * @params {Boolean} changeablePosition Indicates that the size and position of the current 
 *																		  region and the before region can't be changed. It is 
 *																		  used when the method is called from importation method 
 *																		  that don't want to modify the position and size pass 
 *																		  like parameters. A value 'false' not allow to modify the
 *																		  position.
 *
 */
Swimlane.prototype.addComponents = function( changeablePosition ){

	//initialize parameter if your value is undefined
//  notModifyPosition = notModifyPosition || false;
  var changeablePosition = (JSFun.isBoolean( changeablePosition )) ? changeablePosition : true;	


	var nodeChilds = this._parent._nodeChilds;
	var len = nodeChilds.length;
  var index;


	/*
		If the region is the first added to the supernode, the width/height 
		is the same that the width/height of the supernode
	*/
  if(len == 0){
		//If supernode has vertical orientation
    if(this._parent._orientation)
      this.setWidth(this._parent._width);
    else//horizontal orientation
      this.setHeight(this._parent._height);
  }  


	//If the parent has a vertical orientation
	if(this._parent._orientation){

		/*
		  If the last added region hasn't been the first of the supernode, 
			the width of the second last region is halved and the last region 
			is posicionated in the second half. When the position and size of 
			the before region not want to be modified, the 
			'changeablePosition' parameter is used  
		*/
		if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setWidth( nodeChilds[len - 1].getWidth()/2);
			this._x = nodeChilds[len - 1].getX() + nodeChilds[len - 1].getWidth();  
			this.setWidth(this._parent.getX() + this._parent.getWidth() - this._x); 
		}


    //Adding the name of the swimlane			
		this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true}) );  
	  this.addComponent( new TextBox({ id: 'name', centered: true, margin: 4 }) );


		//Adding the region line to the second last node
		if(len > 0) {

			var width = 2.5;

			/*
				Calculates the height of the swimlane line according to whether 
				the supernode is a hierarchical or unhierarchical swimlane
			*/
			if(this._parent instanceof HierarchicalSwimlane)
				var height = this._parent.getHeight() - this._parent._components[0]._height - this._parent._components[1]._height;
			else
				var height = this._parent.getHeight();

			//Adds swimlane lane to the before swimlane (region)
			nodeChilds[ len - 1].addComponent( new SwimlaneLine({ id: 'region', margin: 0 ,width: width, height: height, position: Component.TopRight, orientation: 1}) );	
		}
	}
	else{//horizontal orientation


		/*
			If the last added region hasn't been the first of the supernode, 
			the width of the second last region is halved and the last region 
			is posicionated in the second half. When the position and size of 
			the before region not want to be modified, the 
			'changeablePosition' parameter is used  
		*/
	  if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setHeight( nodeChilds[len - 1].getHeight()/2);
			this._y = nodeChilds[len - 1].getY() + nodeChilds[len - 1].getHeight(); 
		  this.setHeight(this._parent.getY() + this._parent.getHeight() - this._y); 
	  }


    //Adding the name of the swimlane
		this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true, orientation: 1 }) );  
	  this.addComponent( new TextBox({ id: 'name', centered: true, margin: 4, orientation: 1 }) );

	  //Adding the region line to the second last node
	  if(len > 0) {

			var height = 2.5;

			/*
				Calculates the width of the swimlane line according to whether 
				the supernode is a hierarchical or unhierarchical swimlane
			*/
			if(this._parent instanceof HierarchicalSwimlane)
				var width = this._parent.getWidth() - this._parent._components[0]._width - this._parent._components[1]._width;
			else 
				var width = this._parent.getWidth();

			//Adds swimlane lane to the before swimlane (region)
			nodeChilds[ len - 1].addComponent( new SwimlaneLine({ id: 'region', margin: 0 , width: width, height: height, position: Component.BottomLeft, orientation: 0}) );
	  }
	}
}


/**
 * Notify to the node that a change has been produced 
 * by some relationed element
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @method notifyChange
 */
Swimlane.prototype.notifyChange = function() {

	//Updates the height and width of the components according to the orientation of the supernode
	if(this._parent._orientation){
		this._heightComp = this._components[0]._height + this._components[1]._height;
		this._widthComp = 0;
	}	else {
		this._heightComp = 0;
		this._widthComp = this._components[0]._width + this._components[1]._width;
	}

	//Update the position of the straight line that separates the swimlane's components of the rest of the element
	this._parent.updateSizeComponentSwimlane();

	//Call to base class
	Swimlane.base.notifyChange.call(this);
}



/**
 * If the node that call to this method, is container, check your minimal size
 * according to the contained elements within it and your components
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @method updateContainer
 * @param {boolean} recall If the parent method is called 
 */
Swimlane.prototype.updateContainer = function(recall) {
 
	//initialize parameter if your value is undefined
  if(!(recall == false || recall == true))
	  recall = true;

	//If is a container node
  if( this._container ) {

    var i;

		this._widthComp = this._widthComp || 0;
		this._heightComp = this._heightComp || 0;

    var lx = this._x + this._widthComp;
    var ly = this._y + this._heightComp; 
    
    var rx = this._x + this._widthComp;
    var ry = this._y + this._heightComp;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemLeftY;
    

		/*    
			Store the coordinates of the extreme right, 
			left, bottom and top of the child nodes
		*/
    for( i in this._nodeChilds ) {

			//Region of the supernode
      elem = this._nodeChilds[i];
      
			/*
				If the region is a visible node, the container node
				calculates your minimal size taking in account this region 
			*/
			if(elem._visible){  
		
		    elemLeftX = elem._x;
		    elemLeftY = elem._y;
		    elemRigthX = elem._x + elem._width;
		    elemRigthY = elem._y + elem._height;

		    
		    if( elemRigthX > rx )
		      rx = elemRigthX;
		    if( elemRigthY > ry )
		      ry = elemRigthY;
		      
		    if( elemLeftX < lx )
		      lx = elemLeftX;
		    if( elemLeftY < ly )
		      ly =elemLeftY;
			}
    }

    /*
			Is added a separation's space between the region line 
			component and the region.
		*/

		//Is searched if the region contains a region line
		for(i=this._components.length; i--;)
			if(this._components[i] instanceof RegionLine)
				break;

		//if the region contains a region Line
		if(i != -1){
			//if the parent is a vertical orientation
	    if(this.getParent()._orientation)
				rx += this._components[i]._width + 2;
	    else//horizontal orientation
				ry += this._components[i]._height + 2;
		}

    var beforeNodeIndex = -1
    var nextNodeIndex = -1	

		//Vertical orientation of the supernode
    if(this.getParent()._orientation){  


      if( (lx < this._x) || (rx > (this._x + this._width)) ) {

				var newWidth;

				//Get the index of the upper and lower region to the current region
				for(i = 0; i<this.getParent()._nodeChilds.length; i++){
					var nod = this.getParent()._nodeChilds[i];

					//Saves the index of the before region
					if((nod.getX() + nod.getWidth()) > lx){
						if(beforeNodeIndex == -1)
							beforeNodeIndex = i;
					}
					//Saves the index of the next region
					if( (nod.getX() ) < rx)
						nextNodeIndex = i;
				}


				/*
					Update the width of the supernode and the left upper x coordinate 
					of this region if some child node has its left x 
					coordinate out the region
				*/
				if( (beforeNodeIndex != -1) && (lx < this._x)){
					newWidth = this._x - lx + this.getParent().getWidth();
					this.getParent()._x = this.getParent()._x - (this._x - lx);
					this.getParent().setWidth(newWidth);
				}

				/*
					Update the width of the supernode if some child 
					node has its right x coordinate out the region
				*/
				if(rx > (this._x + this._width)) {
					newWidth = rx - this._x - this._width + this.getParent().getWidth();
					this.getParent().setWidth(newWidth);
				}
			}
		}
		else { //horizontal orientation of the Region line

			//Get the index of the upper and lower region to the current region
			if( (ly < this._y) || (ry > (this._y + this._height)) ) 	{
				for(i = 0; i<this.getParent()._nodeChilds.length; i++){
					var nod = this.getParent()._nodeChilds[i];

					//Saves the index of the before region
					if((nod.getY() + nod.getHeight()) > ly){
						if(beforeNodeIndex == -1)
							beforeNodeIndex = i;
					}
					//Saves the index of the next region
					if( (nod.getY() ) < ry)
						nextNodeIndex = i;
				}

				/*
					Update the height of the supernode and the left upper 
					y position of this region if some child node has 
					its top y coordinate out the region
				*/
				var newHeight;
				if( (beforeNodeIndex != -1) && (ly < this._y)){
					newHeight = this._y - ly + this.getParent().getHeight();
					this.getParent()._y = this.getParent()._y - (this._y - ly);
					this.getParent().setHeight(newHeight);
				}

				/*
					Update the height of the supernode if some child 
					node has its bottom y coordinate out the region
				*/
				if(ry > (this._y + this._height)) {
					newHeight = ry - this._y - this._height + this.getParent().getHeight();
					this.getParent().setHeight(newHeight);
				}
    	}
		}

		//Sets the size and minimal size of the swimlane(region)
    if( lx < (this._x + this._widthComp) || ly < (this._y + this._heightComp) ) {    
      this.setWidth( this._x  + this._widthComp  - lx + this._width );
      this.setHeight( this._y + this._heightComp - ly + this._height );
      
      this._x = lx - this._widthComp;
      this._y = ly - this._heightComp;
      
      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y );
      
    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y ); 
    }

    //reset the movement
    this._prex = this._x;
    this._prey = this._y;
    
    this.updateComponents();

		//Updates container of the node's parent    
    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}  
}


/**
 * Draws totally the supernode on the canvas element,
 * calls to the sub-methods of draw to draw
 * components and shapes of supernode
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element 
 */
Swimlane.prototype.draw = function( context ) {


	//If the node isn't visible, this isn't drawn
	if(!this._visible)
		return;

	//Calls to base method
	Swimlane.base.draw.call(this,context);

  context.save();
  context.lineWidth = 2.5;
  context.strokeStyle = ComponentStyle.component_color;

	//Draws the straight line that separates the components of the rest of the node
	context.beginPath();
	if(this._parent._orientation){
		context.moveTo(this._x, this._y + this._heightComp );
		context.lineTo(this._x + this._width, this._y + this._heightComp);
	} else {
		context.moveTo(this._x + this._widthComp, this._y);
		context.lineTo(this._x + this._widthComp, this._y + this._height);
	}
	context.closePath();
	context.stroke();	

  context.restore();
}



/**
 * Generates a xml node with information of node
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @method getElementXML
 * @param {DOMNode} parent Node parent of xml tree that is generated
 * @return {DOMNode} Xml node with information of object
 */

Swimlane.prototype.getElementXML = function( parent ) {

	var xmlnode = Swimlane.base.getElementXML.call(this,parent);

	/*
		Attributes that give information about the position that the straight 
		line must have that separates the components of the rest of node 
	*/
  xmlnode.setAttribute( 'widthComp',  this._widthComp );
  xmlnode.setAttribute( 'heightComp', this._heightComp );

  return xmlnode;
}



/**
 * Receives a xml node with information of node and get it back
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Xml node with the information of the node
 */
Swimlane.prototype.setElementXML = function( xmlnode ) {
  
	Swimlane.base.setElementXML.call(this, xmlnode);

	/*
		Attributes that give information about the position that the straight line 
		must have that separates the components of the rest of node 
	*/
  this._widthComp  = parseInt( xmlnode.getAttribute( 'widthComp' ) );
  this._heightComp = parseInt( xmlnode.getAttribute( 'heightComp' ) );  
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

Swimlane.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the text of component name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Swimlane.prototype.setName = function( text ){
	if(this._components[1])
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

Swimlane.prototype.getStereotypes = function( ){
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
Swimlane.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Swimlane.prototype.getStereotype = function(){		
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
Swimlane.prototype.getNameAsComponent = function( ){
	return this._components[1];
}