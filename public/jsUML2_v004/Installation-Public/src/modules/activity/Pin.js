/**
 ** MODULE NAME: 
 **	  Pin.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the Pin element of the activity diagram of UML 2.
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
 ** 	000 - Feb 2011 - RML - Second version release
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
 * Pin class constructor
 * Creates a  pin of the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @class Pin
 * @extends Rectangular
 */
var Pin = function( params ) {
  params = params || {};
  Pin.baseConstructor.call( this, params );
  
  //Sets properties of the node
  this.setAlone();
  this.setWidth(7);
  this.setHeight(14);  
}
JSFun.extend( Pin, Rectangular );



/**
 * Associates to the pin a parent node. This method is used if the parent node isn't a container,
 * and then, the _parent attribute can't be used for this purpose.
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @class setAction
 *
 */
Pin.prototype.setAction = function( action ){
  if(action instanceof Node)
    this._action = action;
}

/**
 * Performs the necessary actions when the user releases the mouse's buttom that had pressed
 * 
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of position
 * @param {Number} y Coordinate y of position
 *
 */
Pin.prototype.drop = function( x, y ) {

	//Puts the pin in your correct position
  this.correctPosition();

	//Call to the base method 
  Pin.base.drop.call( this, x, y );
}




/**
 * Colocates the node in the position correct on the parent node
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @class correctPosition
 *
 */
Pin.prototype.correctPosition = function() {

	//If this node isn't parent, exit the method
	if(!this._action)
		return;

	//Coordinates and size of the action associated to this node
  var x = this._action.getX();
  var y = this._action.getY();
  var w = this._action.getWidth();
  var h = this._action.getHeight();
  
	/*
		Calculates the point of intersection between the node and the expansion node 
	*/

	//Horizontal position
  if(this.getHeight() > this.getWidth())
	  var np = this._action.getLinkCentered( this.getX() + this._width, this.getY() + this._height/2);
	else //Vertical position
	  var np = this._action.getLinkCentered( this.getX() + this._width/2, this.getY() + this._height);

  var nx = np.getX();
  var ny = np.getY();

  
	/*
		Exchanges the height and width of the expansion node 
		according to the orientation of the action associated
	*/

	//Horizontal position
  if(this.getHeight() > this.getWidth()){

	  /*
			if the ExpansionNode is placed at the top or bottom 
			of the node, the height and width must be exchanged
		*/
    if((this._action.getY() == ny) || ((this._action.getY() + this._action.getHeight()) == ny) ){
      var height = this.getHeight();
      this.setHeight(this.getWidth());
      this.setWidth(height);
    }
  }  else if(this.getWidth() > this.getHeight()){ //Vertical position

	  /*
			if the ExpansionNode is placed at the left or right 
			of the node, the height and width must be exchanged
		*/
    if((this._action.getX() == nx) || ((this._action.getX() + this._action.getWidth()) == nx) ){
      var height = this.getHeight();
      this.setHeight(this.getWidth());
      this.setWidth(height);
    }
  }


	/*
		Sets the position of the expansion node so that this is beside the associated action
	*/

  if(this._action.getX() == nx ){
		//If the expansion node is in the left side of the node
    this.setPosition( nx - this._width , ny - this._height/2);
	} else if(this._action.getY() == ny ){
		 //If is in the top side of the node
    this.setPosition( nx - this._width/2 , ny - this._height);
	}	else if((this._action.getX() + this._action.getWidth()) == nx){
		//If is in the right side of the node
    this.setPosition( nx , ny - this._height/2);
	}	else if((this._action.getY() + this._action.getHeight()) == ny){
		//If is in the bottom side of the node
    this.setPosition( nx - this._width/2 , ny);
	}

	//Updates the position of component according to the new position established
 	this.updatePositionComponents(nx,ny); 
  
}


/**
 * Updates the components's position regarding 
 * the point indicated by the parameters 
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method updatePositionComponents
 */
Pin.prototype.updatePositionComponents = function(nx,ny){
	var position = -1;
	if(nx == this._action.getX())
		position = Component.Left;
	else if(nx == this._action.getX() + this._action.getWidth())
		position = Component.Right;
	else if(ny == this._action.getY())
		position = Component.Top;
	else if(ny == this._action.getY() + this._action.getHeight())
		position = Component.Bottom;

	for(var i=0;i<this._components.length;i++)
		this._components[i]._setPosition(position);

	this.updateComponents();
	this.resetMovement();
}


/**
 * Notify to the node that a change has been produced, 
 * some of your related elements has changed 
 * and can affect it
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method notifyChange
 */
Pin.prototype.notifyChange = function() {

	//Update position and puts the pin in your correct position
  this.updatePosition();
  this.correctPosition();


  if( this._container ) {
    this.updateContainer();
  } else {
    this.updateComponents();
  }
}


/**
 * Removes the element and all elements that keep relation with
 * him and meaningless without the existence
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method notifyChange
 */
Pin.prototype.remove = function() {

	//Calls to the base method
  Pin.base.remove.call( this );
  
	//Notify change
  if(this._parent)
    this._parent.notifyDeleted( this );
  else
    this._action.notifyDeleted( this );
}



/**
 * Updates the elememt's position regarding the movement indicated 
 * by the parameters and transmits it to its elements
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method updatePosition
 * @param {Number} movx Movement in the x axis
 * @param {Number} movy Movement in the y axis
 * @param {Boolean} displacementRegion Indicates that this method has been called because of a region's displacement 
 *
 */
Pin.prototype.updatePosition = function( movx, movy, displacementRegion ) {	
  var i, comp;

	//Initializes the parameter if hasn't been passed to the method
	displacementRegion = displacementRegion || false;

  if( movx == undefined || movy == undefined ) {

		//If the coordinates has been indicated in form of point, the coordinates are calculated
    var mov = this.getMovement();
    var movx = mov.getX();
    var movy = mov.getY();

		//Updates position of the relations
    for( i in this._relations ) {
      this._relations[i].updatePosition();
    }
  } else {
    this._x += movx;
    this._y += movy;    
  }

	//Resets the movement
  this.resetMovement();

  //Updates components's position
  for( i in this._components ) {
    this._components[i].updatePosition( movx, movy );
  }

	//Updates relations's position
  for( i in this._relations ) {
		/*
			If the parent of the pin and the relation's parent are different 
			or the call to the method has been produced by the displacement 
			of the a region of a super-node
		*/
    if( (this._relations[i].getParent() !== this._parent) || 	displacementRegion  ) {
      this._relations[i].notifyChange();
    }
  }
  
	//If is a node container
  if( this._container ) {
		//Updates position of child nodes
    for( i in this._nodeChilds ) {
      this._nodeChilds[i].updatePosition( movx, movy );

    }
    //Updates position of child relations
    for( i in this._relationChilds ) {
      this._relationChilds[i].updatePosition( movx, movy );
    }
  }  
}


/**
 * Calculate the minimum size of node according to the size of your components,
 * do not reduce the size beyond which occupy
 *
 * @author Rafael Molina Linares
 * @update 18/10/2011
 *
 * @method calculateSize
 * @protected
 */

Pin.prototype.calculateSize = function() {

  if( this._components.length > 0 ) {
    var comp;
    var maxWidth = 0;
    var maxHeight = 0;
		var widthComp;
		var foundInvisibleComp = false;
   
    var i;
     
		//All components of the node are saw to set the minimal size of this
    for( i in this._components ) {
      comp = this._components[i];
      
			//If the components is visible and belongs to one of the following types
			if( comp._visible && !(comp instanceof RegionLine) && (comp.getPosition() == Component.Float || (comp.getPosition() == Component.BottomLeft && comp._visible) || comp.getPosition() == Component.BottomRight || comp.getPosition() == Component.Xmovement) ) {

				//If the component has a vertical orientation
				if(comp._orientation){	
				
					//Adds component's width to the maximum width
					maxWidth += comp.getWidth();

					//if the component's height is greater than the maximum height
					if( comp.getHeight() > maxHeight ){
					  maxHeight = comp.getHeight();
					}
				} else {//If the component has a horizontal orientation

					//Adds component's height to the maximum height
					maxHeight += comp.getHeight();

					widthComp = (comp.getPosition() == Component.Xmovement) ? (comp.getWidth() + 2* comp._parent._Xmovement) : comp.getWidth(); 

					//if the component's height is greater than the maximum height
					if( widthComp > maxWidth ){
					  maxWidth = widthComp;
					}
				}
			} else if(!comp._visible){	//If there are some component that isn't visible, it is indicated in a variable
				foundInvisibleComp = true;
			}
    }

		//If not found any visible component, and therefore the maximum height is 0, the maximum height is put to 7
		if(maxHeight == 0 && foundInvisibleComp == true)
			maxHeight = 7;

		//If not found any visible component, and therefore the maximum width is 0, the maximum height is put to 7	
		if(maxWidth == 0 && foundInvisibleComp == true)
			maxWidth = 7;
    
		//If is a container node and the figure to draw the node is the figure by default
    if( this._container && !this._selectedFigure ) {

      if( maxHeight > this._minHeight )
        this.setMinHeight( maxHeight );
        
      if( maxWidth > this._minWidth )
        this.setMinWidth( maxWidth );
       
    } else {//If isn't a container node or uses a another figure than the default figure
      if( maxHeight > 0 )
        this.setMinHeight( maxHeight );
      
      if( maxWidth > 0 )
        this.setMinWidth( maxWidth );
    }     
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
Pin.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
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
Pin.prototype.setName = function( text ){
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

Pin.prototype.getStereotypes = function( ){
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

Pin.prototype.getName = function( ){
	return this._components[1].getValue();
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
Pin.prototype.getStereotype = function(){		
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
Pin.prototype.getNameAsComponent = function( ){
	return this._components[1];
}