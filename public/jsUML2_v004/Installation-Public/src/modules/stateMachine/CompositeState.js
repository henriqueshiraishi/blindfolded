/**
 ** MODULE NAME: 
 **	  CompositeState.js
 **
 ** DESCRIPTION:
 **   Defines how is a composite state element of the state Machine diagram of UML 2.
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
 * CompositeState class constructor, creates a composite state in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class CompositeState
 * @extends SuperNode
 * @param {Number} heightSmallRectangle Height of the small rectangle draws in the upper side of the element
 * @param {Number} widthSmallRectangle Width of the small rectangle draws in the upper side of the element
 * @param {Number} Xmovement Movement of the small rectangle on the top left x coordinate of the element
 */
var CompositeState = function( params ){

	params = params || {};
	CompositeState.baseConstructor.call(this,params); 

	//Height and width of the small rectangle
	this.setHeightSmallRectangle( params.heightSmallRectangle || 15);
	this.setWidthSmallRectangle( params.widthSmallRectangle || 75);

	//Movement of the small rectangle to the right
	this.setXmovement(params.Xmovement || 15);
}
JSFun.extend(CompositeState,SuperNode);


/**
 * Set the height of the small rectangle of the element
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @class setHeightSmallRectangle
 * @param {Number} height Height of the small rectangle drawn in the upper side of the element
 *
 */
CompositeState.prototype.setHeightSmallRectangle = function( height ) {
	this._heightSmallRectangle = height;
}



/**
 * Set the width of the small rectangle of the element
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setWidthSmallRectangle
 * @param {Number} width Width of the small rectangle drawn in the upper side of the element
 *
 */
CompositeState.prototype.setWidthSmallRectangle = function( width ) {
	this._widthSmallRectangle = width;
}


/**
 * Set the displacement to the right of the small rectangle on the top left x coordinate of the element
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setXmovement
 * @param {Number} x Movement of the small rectangle on the top left x coordinate of the element
 *
 */
CompositeState.prototype.setXmovement = function( x ) {
	this._Xmovement = x;
}



/**
 * If the node that call to this method, is container, check your minimal size
 * according to the contained elements within it and its components
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateContainer
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 *
 */
CompositeState.prototype.updateContainer = function(recall) {
 
	//initialize parameter if your value is undefined
  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {
    var i;

    var lx = this._x;
    var ly = this._y + this._heightSmallRectangle;
    
    var rx = this._x;
    var ry = this._y + this._heightSmallRectangle;

    var elem;
    var elemRigthX, elemeRigthY, elemLeftX, elemeLeftY;
    var len = this._nodeChilds.length;

    for( i=0; i<len;i++ ) {

			//Region of the composite state
      elem = this._nodeChilds[i];

			/*
				If the region is a visible node, the container node
				calculates your minimal size taking in account this region 
			*/
			if(elem._visible){  
		    
				//Vertical orientation
		    if(this._orientation){

					elemLeftX = elem._x;
					elemLeftY = elem._y;

					/*
						If this is the last region of composite state, just is 
						taken the minimal width of the region.In other case, 
						the width of the region is taken into account.
					*/
	
					if(i == (len -1))
						elemRigthX = elem._x + elem._minWidth;
					else   
						elemRigthX = elem._x + elem._width;

					elemRigthY = elem._y + elem._minHeight;
				}	else {
					//horizontal orientation

					elemLeftX = elem._x;
					elemLeftY = elem._y;
					elemRigthX = elem._x + elem._minWidth;

					/*
						If this is the last region of composite state, just is 
						taken the minimal height of the region.In other case, 
						the height of the region is taken into account.
					*/

					if(i == (len -1))
						elemRigthY = elem._y + elem._minHeight;
					else
						 elemRigthY = elem._y + elem._height;

					elemRigthX = elem._x + elem._minWidth;
		    }

		    //Coordinates of all sides of the composite state are updated
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
			If the size of the regions contained in the composite state are greater
			than the size of the composite state is updated 
		*/
    if( lx < this._x || ly < (this._y + this._heightSmallRectangle) ) {    

      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y + this._heightSmallRectangle - ly + this._height );
      
      this._x = lx;
      this._y = ly - this._heightSmallRectangle;
      
      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - this._y );

      
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
 * Notify to the supernode that a change has been produced 
 * by some relationed element with the supernode. 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method notifyChange
 * @param {Boolean} recall If the call to the parent method is done or not
 * @param {Boolean} resize If the call of this method is triggered when the supernode has been resizing 
 */
CompositeState.prototype.notifyChange = function(recall,resize,movementLine) {

	//initialize parameters if its value is undefined
  recall = recall || false;
	resize = resize || false;
	movementLine = movementLine || false;

	//Saves the height of the small rectangle
  var beforeHeight = this._heightSmallRectangle;


  //Sets the height of the small rectangle and calculates the height difference between the new and old
  this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());  
  var movHeight = this._heightSmallRectangle - beforeHeight;


  //Update the supernode's height if the height of small rectangle has changed
  if( movHeight ){
		this._y = this._y - movHeight
		this.setHeight(this._height + movHeight);
  }


  //Set the width of the small rectangle
  if(this._components[0].getWidth() > this._components[1].getWidth())
		this.setWidthSmallRectangle(this._components[0].getWidth());
  else
		this.setWidthSmallRectangle(this._components[1].getWidth());


	//Call to 'notifyChange' method of base class
	CompositeState.base.notifyChange.call(this,recall,resize,movementLine);
}


/**
 * Get a Xml node with the information of supernode
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method getElementXML
 * @param {DOMNode} parent Node parent of the xml tree that is generated
 * @return {DOMNode} Xml node with the information of the object
 */
CompositeState.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );

	//Saves the attributes of the composite state in the xml node
  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() + this._components[0]._height - 1);
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() - this._components[0]._height + 1);
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  xmlnode.setAttribute( 'orientation', this._orientation );
  xmlnode.setAttribute( 'includeComponentByRegion', this._includeComponentByRegion );  


	//Saves the information of the components in the xml node
  var i;
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }

	//Saves the information of the child nodes in the xml node     
  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }

	//Saves the information of the child relations in the xml node
  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }
  
  return xmlnode;
}



/**
 * Receives a XML node with information of supernode and get this information back 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 */
CompositeState.prototype.setElementXML = function( xmlnode ) {
  
	//Get the information back about the attributes of the composite state
  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();
  
  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  this._orientation = parseInt(xmlnode.getAttribute( 'orientation' ) );
  this._includeComponentByRegion = xmlnode.getAttribute( 'includeComponentByRegion' );  
  this._includeComponentByRegion = (this._includeComponentByRegion == 'true') ? true : false;


	//Get the information back about the components of the composite state
  var i;
  var childs = xmlnode.childNodes;
  
  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {

			//If the child node is a 'SpecificationItem' component
			if(   childs[i].getAttribute( 'behaviors' )!= null 
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

	this.notifyChange();
}



/**
 * Returns the point's intersection between the given point by parameters and 
 * and the shape of composite state.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the  border of the composite state shape 
 */
CompositeState.prototype.getLinkCentered = function( x, y ) {

	//If the figure that is drawn isn't the figure associated by default to the node, it is called to base method
	if(this._selectedFigure)
		return CompositeState.base.getLinkCentered.call(this,x,y);

	//If the x,y coordinates are passed in form of point
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
	//Central point of the composite State
  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();
  

  var ax, ay, bx, by;
  ax = this.getX();
  ay = this.getY();
  bx = cp.getX();
  by = this.getY();

	//Slope of the rect
  var m;

  if( x < cpx ) {

		//Second quadrant
    if( y < cpy ) {

      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else { 

				//First half of quadrant
	      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() + this._Xmovement - cpx);

				//Top side of bigger rectangle(area between left upper x coordinate and Xmovement)
	      if( Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

					ay = this.getY() + this._heightSmallRectangle;
					bx = this.getX() + this.getWidth();
					by = this.getY() + this._heightSmallRectangle;
				} else {

		      m = (this.getY() - cpy)/(this.getX() + this._Xmovement - cpx);

					//Left side of small rectangle
		      if(  Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){  

						ax = this.getX() + this._Xmovement;
						ay = this.getY();
						bx = this.getX() + this._Xmovement;
						by = this.getY() + this._heightSmallRectangle;
					} else {

						var xRight = this.getX() + this._Xmovement + this._widthSmallRectangle;

			      m = (this.getY() - cpy)/(xRight - cpx);

						//Top side of small rectangle
			      if(  Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){  
						
							ax = this.getX();
							ay = this.getY();
							bx = this.getX() + this.getWidth();
							by = this.getY();
						} else { 

							//Top side of bigger rectangle
							ax = this.getX();
							ay = this.getY() + this._heightSmallRectangle;
							bx = this.getX() + this.getWidth();
							by = this.getY() + this._heightSmallRectangle;
						}
					}
				}
      }
    } else {
			//Third quadrant

      m = (this.getY() + this.getHeight() - cpy)/(this.getX() - cpx);

			//First half of quadrant
      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else { 

				//Second half of quadrant
				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }
  } else {

		//First quadrant
    if( y < cpy ) {

			var xRight = this.getX() + this._Xmovement + this._widthSmallRectangle;
      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() + this.getWidth() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 


	      m = (this.getY() - cpy)/(this.getX() + this._Xmovement + this._widthSmallRectangle - cpx);

				//top side of small rectangle
	      if( (xRight > (this.getX() + this.getWidth()/2)) && Math.abs( (y - cpy)/(x - cpx) ) > Math.abs( m ) ){

					bx = this.getX() + this.getWidth();
					by = this.getY();
				} else {

		      m = (this.getY() + this._heightSmallRectangle - cpy)/( xRight - cpx);

					//top side of bigger rectangle
		      if( (xRight < (this.getX() + this.getWidth()/2)) || //small rectangle contained fully in the second quadrant
							 Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

						ax = this.getX();
						ay = this.getY() + this._heightSmallRectangle;
						bx = this.getX() + this.getWidth();
						by = this.getY() + this._heightSmallRectangle;
					} else {	

						//right side of small rectangle
						ax = this.getX() + this._Xmovement + this._widthSmallRectangle;
						ay = this.getY();
						bx = this.getX() + this._Xmovement + this._widthSmallRectangle;
						by = this.getY() + this._heightSmallRectangle;
					}
				}

      } else {	
				//first half of quadrant

				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }else { 

			//fourth quadrant

      m = (this.getY() + this.getHeight() - cpy)/(this.getX() + this.getWidth() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 

				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();

      } else { //first half of quadrant

				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }

    }
  }
  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );
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
CompositeState.prototype.setVisibility = function( bool ){

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
			- in the case that the node shows a image associated to a stereotype object, if the component specify the node's name 
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
 * Check if the given point is over the lifeline 
 * or some of your components 
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the lifeline
 */

CompositeState.prototype.isOver = function( x, y ) {

	//If the figure that is drawn isn't the figure associated by default to the node, it is called to base method
	if(this._selectedFigure)
		return CompositeState.base.isOver.call(this,x,y);

	//If the x,y coordinates are passed in form of point	
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }


  if(  (x >= this._x + this._Xmovement && x <= this._x + this._Xmovement + this._widthSmallRectangle && 
				y >= this._y && y <= this._y + this._heightSmallRectangle) ||
       ( x >= this._x && x <= (this._x + this._width) && 
				y >= (this._y + this._heightSmallRectangle) && y <= (this._y + this._height) ) ) {
    return true;
  }
  return false;
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

CompositeState.prototype.setValue = function( id, value , behaviors, visible) {
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
 * Draws the figures that the node has
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

CompositeState.prototype.drawFigures = function( context ) {

  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {

		if(i == this._selectedFigure){
			this._figures[i].draw( context, this._x, this._y, this._width, this._height, this._heightSmallRectangle, this._widthSmallRectangle, this._Xmovement );
		}
  }
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
CompositeState.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Set the text of the specification component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method setSpecifications
 * @param {String} text Text to establish to the specification component
 *
 */
CompositeState.prototype.setSpecification = function( text ){

	//Set the component as visible
	this._components[2].setVisibility( true );

	//Replace the '\n' by ';'
	text = text.replace( /\n/gi, ';' );

	//Set the component's text 
	this._components[2].setText( text );
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
CompositeState.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
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

CompositeState.prototype.getStereotypes = function( ){
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
CompositeState.prototype.getName = function( ){
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
CompositeState.prototype.getSpecification = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
CompositeState.prototype.getStereotype = function(){		
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
CompositeState.prototype.getNameAsComponent = function( ){
	return this._components[1];
}