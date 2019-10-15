/**
 ** MODULE NAME: 
 **	  SuperNode.js
 **
 ** DESCRIPTION:
 **   Represents a supernode element with properties and relationships in the diagram
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
//= require <Point>
//= require <Element>
//= require <Component>
//= require <SuperComponent>
//= require <NodeFigure>
//= require <RegionLine>
//= require <Dialog>



/**
 * SuperNode class Constructor , creates a supernode of a diagram
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @class SuperNode
 * @extends Node
 * @param {Number} _orientation Represents the orientation of the regions of supernode. This orientation can be horizontal(value 0) or vertical(value 1)
 * @param {Number} _includeComponentByRegion  Represents the existence(true) or nonexistence(false) of a component to the name of the each region
 *
 */
var SuperNode = function( params ) {

  params = params || {};  
  SuperNode.baseConstructor.call( this, params );


  this._orientation = params.orientation || 0;// 0: horizontal, 1:vertical
	this._includeComponentByRegion = (params.includeComponentByRegion == false) ? false : true;
  this.setContainer();
}
JSFun.extend( SuperNode, Node );



/**
 * Adding a region or child node to the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method addNode
 * @param {Number} node Represents the node to add
 *
 */
SuperNode.prototype.addRegion = function( node ) {
  
  if(node instanceof Node){

	node.setContainer();

	//Adding node to the child nodes array 
	this.addChild(node);

	//Notify that changes have been produced into supernode
	this.notifyChange(true);
  }
}



/**
 * Delete a region or child node to the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @add deleteRegion
 * @param {Number} node Represents the region of supernode to be remove
 *
 */
SuperNode.prototype.deleteRegion = function( node ) {

  var i;
  var j;

  if(this._orientation)
		var mov = node.getWidth();
  else
		var mov = node.getHeight();

	//Gets the position of the region inside the supernode that will be removed and is stored in 'i' variable
  for( i=0; i < this._nodeChilds.length;i++ ) {
    if( this._nodeChilds[i] == node )
      break;
  }

	//Removes the region and all elements that make not sense without your existence
  node.remove();  

  var index = i;

	// if the last region has been removed, the region line of the previously region is removed

  if(index == (this._nodeChilds.length)){

		if(this._nodeChilds[index -1]._components[2])
		  this._nodeChilds[index - 1]._components[2].notifyDelete();
  }

	//supernode reduces the size(width or height according to the orientation) of the supernode after remove the region
  if(this._orientation){
		this._minWidth = this.getWidth() - mov;
		this.setWidth(this.getWidth() - mov);
  }
  else {
    this._minHeight = this.getHeight() - mov;
	  this.setHeight(this.getHeight() - mov);
  }

	this.notifyChange(true);

	//notify that the diagram must re-draw
  this.notifyDraw();
}



/**
 * Notify to the supernode that a change has been produced by some relationed element
 * with the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method notifyChange
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 * @param {Boolean} resize If your value is true, this parameter tells us that the call of this 
 *												 method is triggered when the supernode has been resizing 
 */
SuperNode.prototype.notifyChange = function(recall,resize, movementLine) {

	//initialize parameters if its value is undefined
  recall = recall || false;
	resize = resize || false;
	movementLine = movementLine || false;

	//It is set to true so that necessary operations can be performed if the node resizing (this operations is related with relations to self of node)
  this._resizing = true;

  //Update position of all regions of supernode before of update container so that the he height and width of supernode is rigth
  this.updateRegions(resize,movementLine);

  if( this._container ) {
    var i;

		//if the 'recall' parameter is true, the container of all regions and supernode are updated, in other case just is updated the supernode 
    if(recall){

			var nod = this._nodeChilds;
			for(i=0; i< nod.length;i++)
	   	  if(nod.length -1 != i)
	       nod[i].updateContainer(false);
			  else
	       nod[i].updateContainer();
		} else {
    	this.updateContainer();
    }

		//If this superNode is contained in a region of a supernode, the regions must be updated, and after of this, the supernode will be update
    if( this._parent ) {
   
			var superNode = this._parent.getParent(); 
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
		}

  } else {	

    this.updateComponents();
    if( this._parent ) {
      this._parent.updateContainer();
    }
  }

  //Update position of all regions of supernode 
  this.updateRegions(resize,movementLine);

  //Set the diagram of the child nodes
  for(var i=0 ; i<this._nodeChilds.length;i++)
	 	this._nodeChilds[i].setDiagram(this._diagram);

	//Once operations are performed, it is desactivated
  this._resizing = false;
}


/**
 * If the node that call to this method, is container, check your minimal size
 * according to the contained elements within it and your components
 *
 * @author Rafael Molina Linares
 * @update 18/07/2011
 *
 * @method updateContainer
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 *
 */
SuperNode.prototype.updateContainer = function(recall) {
 
	//initialize parameter if your value is undefined
  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {
    var i;

    var lx = this._x;
    var ly = this._y;
    
    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemeLeftY;
    var len = this._nodeChilds.length;

    for( i=0; i<len;i++ ) {

      elem = this._nodeChilds[i];

			if(elem._visible){  
		    
		    if(this._orientation){//vertical orientation

					elemLeftX = elem._x;
					elemLeftY = elem._y;

					//If it is the last region of supernode, just is taken the minimal width of the region. 
					//In other case, the width of the region is taken into account
					if(i == (len -1))
						elemRigthX = elem._x + elem._minWidth;
					else   
						 elemRigthX = elem._x + elem._width;

					elemRigthY = elem._y + elem._minHeight;
				}
				else {//horizontal orientation

					elemLeftX = elem._x;
					elemLeftY = elem._y;
					elemRigthX = elem._x + elem._minWidth;

					//If it is the last region of supernode, just is taken the minimal height of the region. 
					//In other case, the height of the region is taken into account

					if(i == (len -1))
						elemRigthY = elem._y + elem._minHeight;
					else
						 elemRigthY = elem._y + elem._height;

					elemRigthX = elem._x + elem._minWidth;
		    }
		    
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

		//if the 'recall' parameter is true and this supernode has parent, the parent method is called
    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}
}



/**
 * Update width and height of all regions of the supernode. 
 * This method works differently depending on whether the 
 * supernode uses horizontal or vertical regions.
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method updateRegions
 * @param {Boolean} resize If your value is true, this parameter tells us that the 
 *												 call of this method is triggered when the supernode has been resizing
 *
 */
SuperNode.prototype.updateRegions = function( resize, movementLine ) {

	//initialize parameter if your value is undefined
	resize = resize || false;
	movementLine = movementLine || false;

	var len = this._nodeChilds.length;

	if(this._orientation){//vertical orientation
		var width = 0;
		var x = this.getX();

		//Update the height of all the region and region line of the supernode

		for(var j=0 ; j< len; j++){

			var nod = this._nodeChilds[j];

			//Updates the minimal height of the regions according to the supernode's height
			nod.setMinHeight(this._minHeight - this._components[0].getHeight() - this._components[1].getHeight());
			nod.setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());
			if(nod._components[2] instanceof RegionLine) 
				nod._components[2].setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());	
		}

		//Update the x,y coordinates of the all regions
		for(j = 0; j<len ; j++){

			this._nodeChilds[j]._x = x;
			this._nodeChilds[j]._y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();

			//ensure that the last region isn't out of the supernode
			if(j == len - 1) {
				if( resize || (x + this._nodeChilds[j]._width) < (this.getWidth() + this.getX()))
					this._nodeChilds[j].setWidth(this.getWidth() + this.getX() - x);
				else 
					this.setWidth(x + this._nodeChilds[j]._width - this.getX());
			}

			x += this._nodeChilds[j].getWidth();

		}

		//Update position of elements contained by regions
		for(j = 0; j<len ; j++){
			var mov = this._nodeChilds[j]._x - this._nodeChilds[j]._prex;

			if(mov > 0 || (mov < 0 && !movementLine)){
				for(var i=0;i<this._nodeChilds[j]._nodeChilds.length;i++)
					this._nodeChilds[j]._nodeChilds[i].updatePosition(mov,0,true);
			}
			this._nodeChilds[j].resetMovement();
		}

	} else {//horizontal orientation

		var height = 0;
		var y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();


		//Update the width of all the region and region line of the supernode

		for(var j=0 ; j< len; j++){

			var nod = this._nodeChilds[j];

			//Updates the width of the regions according to the supernode's width
			nod.setMinWidth(this._minWidth);
			nod.setWidth(this.getWidth());
			if(nod._components[2] instanceof RegionLine)
				nod._components[2].setWidth(this.getWidth());	
		}

		//Update the x,y coordinates of the all regions
		for(j = 0; j<len ; j++){

			this._nodeChilds[j]._x = this.getX();
			this._nodeChilds[j]._y = y;

			//ensure that the last region isn't out of the supernode
			if(j == len - 1) {
				if( resize || (y + this._nodeChilds[j]._height) < (this.getHeight() + this.getY()))
					this._nodeChilds[j].setHeight(this.getHeight() + this.getY() - y);
				else 
					this.setHeight(y + this._nodeChilds[j]._height - this.getY());
			}

			y += this._nodeChilds[j].getHeight();
		}


		//Update position of elements contained by regions
		for(j = 0; j<len ; j++){
			var mov = this._nodeChilds[j]._y - this._nodeChilds[j]._prey;


			if(mov > 0 || (mov < 0 && !movementLine)){
				for(var i=0;i<this._nodeChilds[j]._nodeChilds.length;i++)
					this._nodeChilds[j]._nodeChilds[i].updatePosition(0,mov,true);
			}
			this._nodeChilds[j].resetMovement();
		}

	
	}


  //Update components of the own supernode
  this.updateComponents();

  //Update components of the regions of supernode
  for(j=0 ; j<this._nodeChilds.length; j++)
     this._nodeChilds[j].updateComponents();
}



/**
 * Check if the supernode, your regions or some components of them has been pressed,  
 * and in affirmative case, is activated different flags
 *
 * @author Rafael Molina Linares
 * @update 09/09/2011
 *
 * @method select
 * @param {Number} x coordinate x
 * @param {Number} y coordinate y
 * @return {Boolean} If the point is on the supernode, your regions or some of your components
 */
SuperNode.prototype.select = function( x, y ) {

	//If the node isn't visible, this isn't drawn
	if(!this._visible)
		return;

	var i;
	var selectedNode = -1;
	var that = this;


	this.deselectComponent();

	//Keep the last region selected before that be removed
	for(i=0;i<this._nodeChilds.length;i++){
		if( this._nodeChilds[i]._selected )
			selectedNode = i;
		this._nodeChilds[i].deselect();
	}

	//Remove the contextual menu when the select event is triggered
	if(this._diagram._activeMenu){
		this.removeContextualMenu();
	}

  //If left bottom is clicked
  if(this._diagram._pressMouse == true){

	  if( this._selected ) {
	    if( this._moveable 
	        && Math.abs( x - ( this._x + this._width + 2.5 ) ) <= 5 
	        && Math.abs( y - ( this._y + this._height + 2.5 ) ) <= 5 )
	    {
	      this._resizing = true;
	      return true;
	    }	     
	  }
	


		if( this._selected ) {

	    //When red circle is visible and has been clicked 
	    var nodes = this._nodeChilds;

	    for(i=0;i < nodes.length - 1;i++){

				if( i == selectedNode ){

					if(this._orientation){
						var compX1 = nodes[i].getX() + nodes[i].getWidth() - 7;
						var compY1 = nodes[i].getY() +  7;
						var compX2 = nodes[i+1].getX() + nodes[i+1].getWidth() - 7;
						var compY2 = nodes[i+1].getY() +  7;
					} else  {
						var compX1 = nodes[i].getX() + 7;
						var compY1 = nodes[i].getY() + nodes[i].getHeight() - 7;
						var compX2 = nodes[i+1].getX() + 7;
						var compY2 = nodes[i+1].getY() + nodes[i+1].getHeight() - 7;
					}

					var confirmDialog = new Dialog({ text: 'Do you want to delete the region?',cancelable: true});
					//If red circle of region upper to the region line has been pressed
					if( Math.abs( x - ( compX1 ) ) <= 8 &&
						  Math.abs( y - ( compY1 ) ) <= 8 ) {

						this._diagram._pressMouse = false;
						confirmDialog.show(function(){ that.deleteRegion( nodes[i] );});
						return true;
					} 

					//If red circle of region bottom to the region line has been pressed
					if( Math.abs( x - ( compX2 ) ) <= 8 &&
						  Math.abs( y - ( compY2 ) ) <= 8 ){

						this._diagram._pressMouse = false;
						confirmDialog.show(function(){ that.deleteRegion( nodes[i+1] );});
						return true;
					}  
				}
			}


	    // you have clicked on one component of a region of supernode
	    for(i=0; i<this._nodeChilds.length; i++){

				var nod = this._nodeChilds[i];

				if(nod.isOverComponent(x, y)){

					if(nod.isOverRegionLine(x, y)){
			      nod.selectComponent(x,y);						
					} else {
				    this._relx = x - this._x;
				    this._rely = y - this._y;
						this._selectedBefore = true;
					}
		      return true;
				}
	    }

	    // you have clicked on one component of the supernode
	    if( this.isOverComponent( x, y ) ) {

	      this._relx = x - this._x;
	      this._rely = y - this._y;
	      this._selectedBefore = true;  
  
	      return true;
	    }
	  }

	  // you have clicked on the supernode
	  if( this.isOver( x, y ) ) {

	    this._relx = x - this._x;
	    this._rely = y - this._y;

	    this._selectedBefore = this._selected;
	    this._selected = true;
		    
	    return true;
	  } else {
	    return false;
	  }
  } 
  else if(this._diagram._pressMouseRight == true){

		//If right bottom is clicked (corresponding with the activation of the contextual menu)
		if( this.isOver( x, y ) ) {

		  document.oncontextmenu = function (){return false;};
				  
			//capture the movement of the scroll bar making into account that Chrome and Opera browsers support the document.documentElement element and Firefox and IE browsers support the document.body element.
			var scroll = document.documentElement.scrollTop || document.body.scrollTop;

	    x = x + this._diagram._div.offsetLeft;
	    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

	    //Shows the contextual menu
	    this.showContextualMenu(x,y);

		  return true;
	  } else {

	    return false;
	  }	  
  }
}



/**
 * Performs the necessary actions when the user release 
 * the button of the mouse that had pressed
 *
 * @author Rafael Molina Linares
 * @update 22/08/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */
SuperNode.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }
 
    this.updatePosition();

    if( this._parent ) {

  		this._parent.updateContainer();

			//if the node is contained within a supernode, all regions of the supernode and the own supernode must be updated
			var superNode = this._parent.getParent(); 
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }
    
  } else if( this._resizing ) { 

		//Notify that a change has been produced
		if(this instanceof SuperNode){
			var recall = true;
			var resize = true;
	    this.notifyChange(recall, resize);
		}
		else
	    this.notifyChange();


    if( this._parent ) {
  		this._parent.updateContainer();

			//if the node is contained within a supernode, all regions of the supernode and the own supernode must be updated
			var superNode = this._parent.getParent(); 
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true,true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }

  } else if( this._selectedBefore ) {
    this.selectComponent( x, y );
  }
  
  this._moved = false;
  this._resizing = false;
}



/**
 * Checks if the given point is over a component of the node and, 
 * in affirmative case, selects it
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method selectComponent
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
SuperNode.prototype.selectComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  }

	// you have clicked on one component of a region of supernode
	for(i=0; i<this._nodeChilds.length; i++){

		var nod = this._nodeChilds[i];

		if(nod.isOverComponent(x, y)){

      nod.selectComponent(x,y);
		  nod._selectedBefore = true;  
		  return true;
		}
	}  
}



/**
 * Draws totally the supernode on the canvas element,
 * call to the sub-methods of draw to draw all regions,
 * components and shapes of supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
SuperNode.prototype.draw = function( context ) {

	//If the node isn't visible, this isn't drawn
	if(!this._visible)
		return;

  context.save();
  context.fillStyle = NodeStyle.shape_color;

  if( this._moveable && this._selected ) {
    context.fillRect( parseInt( this._x + this._width ), parseInt( this._y + this._height ), 5, 5 );
  }
  context.restore();
  
  this.drawFigures( context );
  
  this.drawComponents( context );
  
  if( this._selected ) {
    this.drawComponentsShape( context );
  }
  
  //Draw the child nodes of supernode
  for(var i=0;i<this._nodeChilds.length;i++)
		this._nodeChilds[i].draw(context);

	if(this._selected){
		for(var i=0; i<this._nodeChilds.length;i++){
			if(this._nodeChilds[i]._components[0])
			  this._nodeChilds[i]._components[0].drawShape( context );		
			if(this._nodeChilds[i]._components[1])
		  this._nodeChilds[i]._components[1].drawShape( context );		
		}
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
SuperNode.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );

	//If the selected figure is another than 0, the figure 0 is established to recover the size(width/height) that the node had before 
	if(this._selectedFigure){ 
	 	this.setSelectedFigure( 0 );
	}
  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() );
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() );
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  xmlnode.setAttribute( 'orientation', this._orientation );
  xmlnode.setAttribute( 'includeComponentByRegion', this._includeComponentByRegion );  
 
  var i;
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }
     
  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }
  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }
  
  return xmlnode;
}



/**
 * Receives a XML node with information of supernode and get this information back 
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 */
SuperNode.prototype.setElementXML = function( xmlnode ) {
  
  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();
  
  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  this._orientation = parseInt(xmlnode.getAttribute( 'orientation' ));
  this._includeComponentByRegion = xmlnode.getAttribute( 'includeComponentByRegion' );  
  this._includeComponentByRegion = (this._includeComponentByRegion == 'true') ? true : false;

  var i;
  var childs = xmlnode.childNodes;
  
  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {
      
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




