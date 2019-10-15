/**
 ** MODULE NAME: 
 **	  Region.js
 **
 ** DESCRIPTION:
 **   This class represents a region of a supernode of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Sep 2011 - RML - Initial version release
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



//= require <JSFun>
//= require <JSGraphic>
//= require <Node>
//= require <StereotypeFields>
//= require <Point>
//= require <Element>
//= require <Component>
//= require <SuperComponent>
//= require <NodeFigure>



/**
 * Region Class Constructor, creates a region of a supernode
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class Region
 * @extends Node
 *
 */
var Region = function( params ) {

  params = params || {};  
  Region.baseConstructor.call(this,params);
  this.setType('Region');

	//Sets the parent of the region
  this._parent = params.parent || null;

	//Sets the region as container
	this.setContainer();

	//Adds components to the region
  if(params.addComponent != false)
    this.addComponents();
}
JSFun.extend( Region, Node );



/**
 * Adds the components to the region according to 
 * the orientation of the supernode that 
 * contains that region
 *
 * @author Rafael Molina Linares
 * @update 20/08/2011
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

Region.prototype.addComponents = function( changeablePosition ){

	//initialize parameter if your value is undefined
  var changeablePosition = (JSFun.isBoolean( changeablePosition )) ? changeablePosition : true;	

	var nodeChilds = this._parent._nodeChilds;
	var len = nodeChilds.length;
  var index;

	/*
		If the region is the first added to the supernode, the width/height 
		is the same that the width/height of the supernode
	*/
  if(len == 0){
		//if the supernode is a vertical orientation
    if(this._parent._orientation)
      this.setWidth(this._parent._width);	
    else//horizontal orientation
      this.setHeight(this._parent._height);
  }  

	//If the parent is a vertical orientation
	if(this._parent._orientation){

		/*
		  If the last added region hasn't been the first of the supernode, 
			the width of the second last node is halved and the last node is 
			posicionated in the second half. When the position and size of 
			the before region not want to be modified, the 
			'changeablePosition' parameter is used  
		*/	
		if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setWidth( nodeChilds[len - 1].getWidth()/2);
			this._x = nodeChilds[len - 1].getX() + nodeChilds[len - 1].getWidth();  
			this.setWidth(this._parent.getX() + this._parent.getWidth() - this._x); 
		}

		//The name of region is added 
		if(!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane ) && this._parent._includeComponentByRegion ){
			this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true}) );  
			this.addComponent( new TextBox({ id: 'name_node', text: 'region', margin: 3, centered: true }) ); 
	  }

		//Adding the region line to the second last region of the supernode
		if(len > 0) {

			var width = 1;
			var height = this._parent.getHeight() - this._parent._components[0]._height - this._parent._components[1]._height;

			var heightSmallRectangle = this._parent._heightSmallRectangle || 15;
			nodeChilds[ len - 1].addComponent( new RegionLine({ id: 'region', margin: 0 ,width: width, height: height, position: Component.TopRight, orientation: 1}) );	
		  }
	}
	else{//horizontal orientation

		/*
		  If the last added region hasn't been the first of the supernode, 
			the width of the second last node is halved and the last node is 
			posicionated in the second half. When the position and size of 
			the before region not want to be modified, the 
			'changeablePosition' parameter is used  
		*/
	  if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setHeight( nodeChilds[len - 1].getHeight()/2);
			this._y = nodeChilds[len - 1].getY() + nodeChilds[len - 1].getHeight(); 
		  this.setHeight(this._parent.getY() + this._parent.getHeight() - this._y); 
	  }

	  //The guard of region is added 
	  if(this._parent instanceof Alternative){
			this.addComponent( new StereotypeFields({ id: 'stereotypes'}) );  
			this.addComponent( new GuardItem({ id: 'description', text: '[]', margin: 1}) );
	  }

		//The name of region is added 
	  if(!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane ) && this._parent._includeComponentByRegion ){
			this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true}) );  
			this.addComponent( new TextBox({ id: 'name_node', text: 'region', margin: 3, centered: true }) ); 
	  }

	  //Adding the region line to the second last node
	  if(len > 0) {
			var height = 1;
			var width = this._parent.getWidth();

			nodeChilds[ len - 1].addComponent( new RegionLine({ id: 'region', margin: 0 , width: width, height: height, position: Component.BottomLeft, orientation: 0}) );
	  }
	}
}



/**
 * If the node that call to the function, is container, checks 
 * your minimal size taking in account the element and
 * components that contains 
 *
 * @author Rafael Molina Linares
 * @update 20/08/2011
 *
 * @method updateContainer
 * @param {boolean} recall If the parent's method is called 
 */
Region.prototype.updateContainer = function(recall) {
 
	//If the value of the parameter isn't correct, this is initialized to true
  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {

    var i;

    var lx = this._x;
    var ly = this._y;
    
    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemLeftY;
    
		/*    
			Store the coordinates of the extreme right, 
			left, bottom and top of the child nodes
		*/
    for( i in this._nodeChilds ) {

      elem = this._nodeChilds[i];
      
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

			//Get the indices of the upper and lower region to the current region
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

		//Sets the size and minimal size of the region
    if( lx < this._x || ly < this._y ) {    
      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y - ly + this._height );
      
      this._x = lx;
      this._y = ly;
      
      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - ly );
    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y ); 
    }

    //reset the movement
    this._prex = this._x;
    this._prey = this._y;
    
    this.updateComponents();
	
		//Updates container of the node parent    
    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}  
}



/**
 * Checks if the given point is over a region line of region
 *
 * @author Rafael Molina Linares
 * @update 19/09/2011
 *
 * @method isOverRegionLine
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the region line
 */
Region.prototype.isOverRegionLine = function( x, y ) {

  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i] instanceof RegionLine && this._components[i].isOver( x, y ) ) {
      return true;
    }
  }
  
  return false;
}


