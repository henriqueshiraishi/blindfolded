/**
 ** MODULE NAME: 
 **	  RegionLine.js
 **
 ** DESCRIPTION:
 **   Component that draws a region line of separation between different region of a supernode.
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
//= require <Component>
//= require <JSGraphic>


/**
 * RegionLine Class Constructor
 * Components that draws a line between two region.
 *
 * @author Rafael Molina Linares
 * @update 19/9/2011
 *
 * @class RegionLine
 * @extends Component
 */

var RegionLine = function( params ) {

  params = params || {};
  RegionLine.baseConstructor.call( this, params );

	//Establishes the position of the component if not specified
  this._setPosition( params.position || Component.BottomLeft );

	/*
		Set the position of the component 
		according to your orientation
	*/

	//vertical orientation
  if(params.orientation){

		this.setHeight( params.height || 100 );
		this.setWidth(params.width || 1);
  } else { 

		//horizontal orientation
		this.setHeight( params.height || 1 );
		this.setWidth(params.width || 100);
  }
}
JSFun.extend( RegionLine, Component );



/**
 * Check if the region line has been pressed,  
 * and in affirmative case, is activated different flags
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @class select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is on the region line
 */

RegionLine.prototype.select = function( x, y ) {


	var beforeX = this._getX();
	var beforeY = this._getY();
	var NodeNextIndex = -1;
	var NodeBeforeIndex = -1;


  if( !this.selected && this.isOver( x, y ) ) {

		var that = this;


		/**
		 * Catch the region before and next to the region of the current 
		 * region, and later, will this information will be used by 
		 * the dragComponent and dropComponent functions
		 *
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
		 *
		 * @method _selectComponent
		 * @private
		 * @param {Event} event Javascript event
		 */

		this._selectComponent = function( event ) {


			//Stop the interaction via the events of the diagram 
			that.getParent()._diagram.interaction(false);

			//SuperNode that contains to the region that contains the region line
			var superNode = that.getParent().getParent();

			/*
				Get the indices of the upper and lower 
				nodes to the current node according to 
				the orientation of the superNode
			*/
			
			//Vertical orientation
			if(superNode._orientation){

				//Searching the before and next region between the regions of the supernode
				for(var i=0; i< superNode._nodeChilds.length;i++){

					//Before region
				  if(superNode._nodeChilds[i].getX() < that.getParent().getX()){
						NodeBeforeIndex = i;
				  }

					//Next region
				  if(superNode._nodeChilds[i].getX() > that._getX()){
						if(NodeNextIndex == -1)
							NodeNextIndex = i;
				  }
				}
			} else { //Horizontal orientation

				//Searching the before and next region between the regions of the supernode
				for(var i=0; i< superNode._nodeChilds.length;i++){

					//Before region
				  if(superNode._nodeChilds[i].getY() < that.getParent().getY()){
						NodeBeforeIndex = i;
				  }

					//Next region 
				  if(superNode._nodeChilds[i].getY() > that._getY()){
						if(NodeNextIndex == -1)
							NodeNextIndex = i;
				  }
				}
			}
		}


		/**
		 * If a region line has been selected and the mouse 
     * is being moving, this method captures the x and y 
		 * coordinates of the component and act on the 
     * produced movement. 
		 * 
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
 		 *
		 * @method _dragComponent
		 * @private   
		 * @param {Event} event Javascript event
     *
		 */

		this._dragComponent = function( event ) {

			/*
				Avoid that actions be performed if the mouse's 
				drag isn't done with the rigth button 
			*/
			if( !( event.button == 0 && that.getParent()._diagram._pressMouse )){
		    return;
		  }

			//Catch the x,y coordinates
		  var mousex = event.pageX - that.getParent()._diagram._div.offsetLeft;
		  var mousey = event.pageY - that.getParent()._diagram._div.offsetTop;

			//It is checked that the x,y coordinates isn't out of the canvas
		  if( mousex < 0 )
				mousex = 0;
		  if( mousey < 0 )
				mousey = 0;
		  if( mousex >= that.getParent()._diagram._width )
				mousex = that.getParent()._diagram._width; 
		  if( mousey >= that.getParent()._diagram._height )
				mousey = that.getParent()._diagram._height;

			//Change cursor's style
		  that.getParent()._diagram._div.style.cursor = 'pointer';

			//Calculates the left upper coordinates of the component
		  var px = mousex - that.getParent()._relx;
		  var py = mousey - that.getParent()._rely;	    

			//Supernode of the region that contains the region line
		  var superNode = that.getParent().getParent();

			/* 
				Sets the new position of the component 
				according to the orientation of the supernode			
			 */

			//Vertical orientation
		  if(superNode._orientation){

		    //Set the left and right limits of the coordinate x
		    var rightLimitX = that.getParent()._diagram._width;
		    var leftLimitX = that.getParent()._x + that.getParent()._minWidth;

				//Sets the new position of the component if is inside the limits
		    if( (mousex > leftLimitX ) && ( mousex < rightLimitX) )
			    that._x = mousex;
	
	    } else {	//Horizontal orientation

		    //Set the upper and lower limits of the y coordinate
		    var bottomLimitY = that.getParent()._diagram._height;
				var topLimitY = that.getParent()._y + that.getParent()._minHeight;

				//Sets the new position of the component if is inside the limits
		    if( (mousey > topLimitY ) && ( mousey < bottomLimitY) )
			    that._y = mousey;
	    }

	    //Draws interaction on the diagram
	    that.getParent()._diagram._drawMotion( that );
		}

		/**
		 * If a region line has been selected and the 
		 * mouse has been released, this method update 
		 * the position of supernode and childs nodes 
		 * 
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
		 *
		 * @method _dropComponent
		 * @private   
		 * @param {Event} event Javascript event
 		 *
		 */

		this._dropComponent = function( event ) {

			/*
				Avoid that actions be performed if the mouse's 
				drop isn't done with the rigth button 
			*/
			if( !( event.button == 0 && that.getParent()._diagram._pressMouse ) )
		    return;

			/*
				Calculate the new height and width of the 
				region that contains the region line
			*/
		  var finalX = that._getX() - beforeX;
		  var finalY = that._getY() - beforeY;

			/*
		  	Update width of the region that contains the 
				region line and the position of the before 
				and next region(if neccesary) according to the 
				orientation of the supernode
			*/

			//Vertical orientation 
			if(that.getParent().getParent()._orientation){

				//Next region of the supernode
			  var nextNode = that.getParent().getParent()._nodeChilds[NodeNextIndex];

				/*
					Set the position x of the component to the 
					value before to the movement of the component
				*/
			  that._x  = that._x - finalX;

				//If the region line has been moved to right				  
			  if(finalX > 0){    
					that.getParent().setWidth(that.getParent().getWidth() + finalX);	
			  }
	 	    else{           
			
				  //If the region line has been moved to left

					var currentNode = that.getParent();
					var beforeWidth = that.getParent().getWidth() + finalX;
					that.getParent().setWidth(that.getParent().getWidth() + finalX);

					//Updates the position of the next region
					if(NodeNextIndex != -1){	
						nextNode._x = nextNode._x + finalX;
						nextNode.setWidth(nextNode.getWidth() - finalX);
					}
			  }
			}
		  else {//horizontal orientation

				//Next region of the supernode
			  var nextNode = that.getParent().getParent()._nodeChilds[NodeNextIndex];

				/*
					Set the position of the component to the 
					value before to the movement of the component
				*/
			  that._y  = that._y - finalY;

				//If the region line has been moved to down
			  if(finalY > 0){	

					that.getParent().setHeight(that.getParent().getHeight() + finalY);	
			  }
		    else{ //If the region line has been moved to up

					var currentNode = that.getParent();
					var beforeHeight = that.getParent().getHeight() + finalY;
					that.getParent().setHeight(that.getParent().getHeight() + finalY);	

					//Updates the position of the next region
					if( NodeNextIndex != -1 ){

						nextNode._y = nextNode._y + finalY;
						nextNode.setHeight(nextNode.getHeight() - finalY);
					}
			  }
		  }

			//Set again the cursor's style by default
		  that.getParent()._diagram._div.style.cursor = 'default';

			//Clear the motion canvas
		  that.getParent()._diagram._clearMotion();  
			
			that.getParent()._resizing = false;
			that.getParent()._selected = true;
		  that.getParent().getParent()._selected = true;


			//Notify changes in the superNode
			var	resize = false;
			var recall = true;
			var	movementLine = true;

			//Notify changes in the supernode
		  that.getParent().getParent().notifyChange(recall,resize, movementLine);

			//Draw the diagram again to show changes
		  that.getParent()._diagram.draw();


		  //Remove the event drag and drop of the component
		  window.removeEventListener('mousedown', that._selectComponent, false);
		  window.removeEventListener('mousemove', that._dragComponent, false);
		  window.removeEventListener('mouseup', that._dropComponent, false);

		  //Return the select, drag and drop event on the diagram
		  that.getParent()._diagram.interaction(true);

			//Update the last elements with which the user has had interaction
      that.getParent()._diagram._lastElement = that.getParent()._diagram._element;
      that.getParent()._diagram._element = null;


		  //Initialize the variables
		  NodeNextIndex = -1;
		  NodeBeforeIndex = -1;

			//Initilizes the value 
		  that.getParent()._diagram._pressMouse = false;
		}

		//Adds the events to the control of the movement of the component
		window.addEventListener('mousedown', this._selectComponent, false);
		window.addEventListener('mousemove', this._dragComponent, false);
		window.addEventListener('mouseup', this._dropComponent, false);

		return true;
  } else {
    return false;
  }
}


/**
 * Check if the given point is over the component 
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method isOver
 * @param {Number} x Represents the x coordinate of the point to check
 * @param {Number} y Represents the y coordinate of the point to check
 * @return {Boolean} If the point is over the component
 */

RegionLine.prototype.isOver = function( x, y ) {

  if( this._visible && 
			x >= this._x -5
      && x <= this._x + this._width + 5
      && y >= this._y - 5
      && y <= this._y + this._height + 5 ) 
  {
    return true;
  } else {
    return false;
  }
}



/**
 * Draws a horizontal or vertical region line 
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

RegionLine.prototype.draw = function( context ) {

	//Ensures that the component isn't drawn if isn't visible
	if(!this._visible)
		return;

	//vertical orientation
	if(this._parent.getParent()._orientation){ 
		JSGraphic.dashedLine( context, this.getPixelX(), this.getPixelY(), this.getPixelX(), this.getPixelY() + this.getHeight(),  10 );
	}
	else {//horizontal orientation
		JSGraphic.dashedLine( context, this.getPixelX(), this.getPixelY(), this.getPixelX() + this.getWidth(), this.getPixelY(), 10 );
	}
}


/**
 * Draws the shape of a horizontal or vertical region line 
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

RegionLine.prototype.drawShape = function( context ) {

	//Ensures that the component isn't drawn if isn't visible
	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = "#aaaaaa";

	//Draw the shape of the line
  if(this._parent.getParent()._orientation)//vertical orientation
	  context.strokeRect( this.getPixelX() - 2 , this.getPixelY(), this.getWidth() + 4 , this.getHeight() );
  else//horizontal orientation
	  context.strokeRect( this.getPixelX() , this.getPixelY() - 4, this.getWidth() ,  this.getHeight() + 6 );

  context.restore();

	/*
		First red circle to remove the region that 
		contains the region line
	*/
  context.save();
  
  context.fillStyle = '#ff0000';

  context.beginPath();

	//vertical orientation
  if(this._parent.getParent()._orientation)
		context.arc( this._parent.getX() + this._parent.getWidth() - 7 , this._parent.getY() +  7, 4, 0, Math.PI*2, true );
  else
		context.arc( this._parent.getX() + 7 , this._parent.getY() + this._parent.getHeight() - 7, 4, 0, Math.PI*2, true );

  context.closePath();
  context.fill();
  
  context.restore();

	//Locates the next region of supernode
  var nodes = this._parent.getParent()._nodeChilds;
  for(var i=0; i< nodes.length; i++)
		if(nodes[i] == this._parent)
  		break;

	/*
		Second red circle to remove the next region to 
		the region that contains the region line 
		(if current region isn't the last)		
	*/
  context.save();

  context.fillStyle = '#ff0000';
  context.beginPath();

	//vertical orientation 
  if(this._parent.getParent()._orientation) 
		context.arc( nodes[i+1].getX() + nodes[i+1].getWidth() - 7 , nodes[i+1].getY() +  7, 4, 0, Math.PI*2, true );
  else
		context.arc( nodes[i+1].getX() + 7 , nodes[i+1].getY() + nodes[i+1].getHeight() - 7, 4, 0, Math.PI*2, true );

  context.closePath();
  context.fill();
  
  context.restore();
}
