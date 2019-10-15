/**
 ** MODULE NAME: 
 **	  Lifeline.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the lifeline element of the sequence diagrams of UML 2.
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
 * LifeLine class constructor, creates a lifeline element in a diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class LifeLine
 * @extends Rectangular
 * @param {Number} heightSmallRectangle Height of the small rectangle of the lifeline
 *
 */
var Lifeline = function( params ) {
  params = params || {};
  Lifeline.baseConstructor.call( this, params );
  
  this._delete = 0;
  this._create = 0;
  this._limitY = -1;

	//Set the height of the lifeline's rectangle 
  this.setHeightSmallRectangle( params.heightSmallRectangle || 25);
}
JSFun.extend( Lifeline, Rectangular );




/**
 * Set the height of the rectangle of the life line
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setHeightSmallRectangle
 * @param {Number} height Height of the small rectangle drawn in the upper side of the lifeline
 *
 */
Lifeline.prototype.setHeightSmallRectangle = function( height ) {
	this._heightSmallRectangle = height;
}


/**
 * Checks if the given point is over the lifeline 
 * or some of its components 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the lifeline
 */
Lifeline.prototype.isOver = function( x, y ) {

	//If coordinates has been given as a point
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

	//If the coordinates are foun in the lifeline's rectangle or in your line
  if(  (x >= this._x && x <= this._x + this._width && 
				y >= this._y && y <= this._y + this._heightSmallRectangle) ||
       (x >= (this.getLineX() - 5) && x <= (this.getLineX() + 5) &&
			  y >= (this._y + this._heightSmallRectangle) && y <= (this._y + this._height) ) ) {
    return true;
  }
  return false;
}



/**
 * Notify to the lifeline that a change has been produced by 
 * some relationed element with the lifeline
 *
 * @author Rafael Molina Linares
 * @update 26/09/2011
 *
 * @method notifyChange
 */


Lifeline.prototype.notifyChange = function() {

	var createMessages;
	var descendantTimeIntervals = [];
  var i,j;

  //Sets the height of the small rectangle and calculates the height difference between the new and old
  var beforeHeight = this._heightSmallRectangle;
  this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());  
  var mov = this._heightSmallRectangle - beforeHeight;



  //Updates the position of all messages that is relationed with this lifeline
  for(i=0; i< this._relations.length;i++) {
  	if(!(this._relations[i] instanceof CreateMessage) || ( (this._relations[i] instanceof CreateMessage) && (this._relations[i]._elemA == this))){

		  //If the height of the lifeline rectangle has increased or decremented
		  if(mov){

		    //Updates the limit upper that can be reached by the relations
		    if(!(this._relations[i] instanceof CreateMessage)){ //If is not a create message 

					//If the element A of the relation is this life line
			    if(this._relations[i]._elemA == this){
				
						//Sets the y limit to the this._relations[i]
						if( (this._relations[i]._elemB._y + this._relations[i]._elemB._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5) )
			        this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
						else
			        this._relations[i].setLimitY(this._relations[i]._elemB._y + this._relations[i]._elemB._heightSmallRectangle + 5);
			    } else {
						if( (this._relations[i]._elemA._y + this._relations[i]._elemA._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5) )
		        	this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
						else
		      	  this._relations[i].setLimitY(this._relations[i]._elemA._y + this._relations[i]._elemA._heightSmallRectangle + 5);
					}
		    } else {
						//If the relation is a create message
		        this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
		    }
		  }

		  //Update the y coordinate of the relation if is above of the bottom side of the small rectangle of lifeline 
		  if( this._relations[i]._y < (this._y + this._heightSmallRectangle + 5) ){

				this._relations[i]._y += mov;
				this._relations[i].notifyChange();
	
				if(this._relations[i] instanceof CreateMessage){
					this._relations[i]._elemB.updatePosition();
					//Updates position of all B element of each createmessage moves
					createMessages = this._relations[i].descendantsCreateMessages();
					for(j=0;j<createMessages.length;j++)
						createMessages[j].updatePosition();
				} else {

					this._relations[i].updateRelatedLifeline();
				}
		  }
		}

		//Notify changes in the create message of life line
		if(mov && this._relations[i] instanceof CreateMessage && (this._relations[i]._elemB == this))
		  this._relations[i].notifyChange();

		//If the lifeline rectangle size is changed, then the before coordinates are reseted
		if(mov)
		  this.resetMovement(); 
  }
	if(mov && this._relations.length)
		this._relations[0].updateDeleteMessages();


  if( this._container ) {
    this.updateContainer();
  } else {
    this.updateComponents();
    if( this._parent ) {
  	this._parent.updateContainer();
    }
  }

	//Update the width of life line to your minimum size
	this.setWidth((this._minWidth > 60) ? this._minWidth : 60);
	this.updateComponents();
}




/**
 * Return the x coordenate that coincides with the dashed line of the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getLineX
 *
 * @return {Number} x coordinate of the dashed line. 
 */
Lifeline.prototype.getLineX = function() {
  return this.getX() + this.getWidth() / 2;
}


/**
 * Performs the corresponding actions when the user drag the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class drag
 *
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
Lifeline.prototype.drag = function( x, y ) {

  if ( !this.resizing && this._selected ) {

    var px = x - this._relx;
         
    this.setPosition( px, this.getY() );    
    this._moved = true;
  } else {    
    Lifeline.base.drag.call( this, x, y );
  }
}



/**
 * Update the position of the deletemessage and the delete attribute of the lifeline
 * if exists any message below of the deletemessage
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateDelete
 */

Lifeline.prototype.updateDelete = function(){		

	//If the node hasn't a delete message, isn't necessary performs the actions of this method
	if(!this._delete)
		return;

	var heightObjA, heightObjB;
	var height;
	var yRel;
	var additionalSpace = 20;
	var i, j;
	var rel = this._relations;
	var max = 0;
	var deleteMessage;


	//Searchs the maximum y coordinate to checks that the delete message is under it
	for(i=0; i< rel.length; i++){
		if(rel[i] instanceof Message) { 

			//If rel[i] isn't a delete message, or is a delete message whose element A is this node
			if( !(rel[i] instanceof DeleteMessage) || (rel[i] instanceof DeleteMessage && rel[i]._elemB != this)) {


				yRel = rel[i].getY();

				//If the message is a message to self
				if(rel[i]._elemA == rel[i]._elemB){

					yRel += (rel[i]._objA) ? (rel[i]._objA.getHeight() + 20) : 50;
				  height = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;
				} else {

					//Calculates the height of the objetcs
					heightObjA = (rel[i]._objA) ? rel[i]._objA.getHeight() : 0;
					heightObjB = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;

					//choose the maximun height between its objects
					if( heightObjA > heightObjB)
						height = heightObjA;
					else
						height = heightObjB;
				}

				//Updates the maximum if necessary
			  if( (yRel + height + additionalSpace) > max ) 
					max = yRel + height + additionalSpace; 
			  
				//searchs a maximum in the relations of the object A of the rel[i](if has)
				if(rel[i]._objA){

					//Relations of the object A
					var relObjA = rel[i]._objA._relations;

					for(j=0; j < relObjA.length; j++){

						yRel = relObjA[j].getY();

						//Calculates the height of the objetcs
						heightObjA = (relObjA[j]._objA) ? relObjA[j]._objA.getHeight() : 0;
						heightObjB = (relObjA[j]._objB) ? relObjA[j]._objB.getHeight() : 0;

						//choose the maximun height between its objects
						if( heightObjA > heightObjB)
							height = heightObjA;
						else
							height = heightObjB;

						//Updates the maximum if necessary
						if( (yRel + height + additionalSpace) > max ) 
							max = yRel + height + additionalSpace; 
					}
				}

				//Searchs a maximum in the relations of the object B of the rel[i](if has)
				if(rel[i]._objB){

					//Relations of the object B
					var relObjB = rel[i]._objB._relations;
					for(j=0; j < relObjB.length; j++){

						yRel = relObjB[j].getY();

						//Calculates the height of the objetcs
						heightObjA = (relObjB[j]._objA) ? relObjB[j]._objA.getHeight() : 0;
						heightObjB = (relObjB[j]._objB) ? relObjB[j]._objB.getHeight() : 0;

						//choose the maximun height between its objects
						if( heightObjA > heightObjB)
							height = heightObjA;
						else
							height = heightObjB;

						//Updates the maximum if necessary
						if( (yRel + height + additionalSpace) > max ) 
							max = yRel + height + additionalSpace; 
					}
				}

			} else {
				//If the relations is the delete message, this is saved to update after your position if necessary
				deleteMessage = rel[i];
			}
		}		
	}



	//Update the position of the delete message if there are relations below this
	if(deleteMessage._y < max)
		this._delete = max;
	else
		this._delete = deleteMessage._y;

	//Updates the position of the delete message and notifies its changes
	deleteMessage._y = this._delete;
	deleteMessage.notifyChange();		

}


/**
 * Updates the height of the node(if necessary) takes in 
 * account the greater y coordinate between all relations
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateLength
 */
Lifeline.prototype.updateLength = function() {

  var i;
  var max = 0;

  /*
	 If the lifeline has a delete message whose element B is this lifeline,
	 it just is taken in account the lifeline's relations to calculate the maximun length
	*/

  if( this._delete ){
	  for( i in this._relations ) {

	    if( (this._relations[i] instanceof Message) && this._relations[i].getY() > max ) {
	      max = this._relations[i].getY();
	    }
	  }
  } else {

		/*
		 If the lifeline hasn't a delete message whose element B is this lifeline,
		 it is taken in account the lifeline's relations to calculate the maximun length
		*/

	  var rel = this._diagram._relations;
	  var nodes = this._diagram._nodes;
	  var heightObjA, heightObjB;
		var yRel;
	  var height = 0;
	  var maxRel;

		//Searchs the maximun between the diagram's relations
	  for( i=0; i< rel.length; i++ ) {

			if(rel[i] instanceof Message){
				yRel = rel[i].getY();

				//If the message is a message to self
				if(rel[i]._elemA == rel[i]._elemB){

					yRel += (rel[i]._objA) ? (rel[i]._objA.getHeight() + 20) : 50;
				  height = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;
				} else {

					//Calculates the height of the objetcs
					heightObjA = (rel[i]._objA) ? rel[i]._objA.getHeight() : 0;
					heightObjB = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;

					//choose the maximun height between its objects
					if( heightObjA > heightObjB)
						height = heightObjA;
					else
						height = heightObjB;
				}

				//Updates the maximum if necessary
			  if( (yRel + height) > max ) { 
					max = yRel + height; 
					maxRel = rel[i];
			  }
			}
	  } 

		//Searchs between the iteration blocks to find the maximun 
		for( i=0; i< nodes.length; i++){

		  if( (nodes[i] instanceof Alternative) || (nodes[i] instanceof Interaction))

				//Updates the maximum if necessary
		    if( (nodes[i].getY() + nodes[i]._height) > max ) {
 	        max = nodes[i].getY() + nodes[i]._height;
					maxRel = null;
		    }
			}
	  }


		//updates the maximum if necessary
	  max = max - this.getY();

	  if( max <= 0 ) {
	    max = 200;
	  }

	  if(max < this._heightSmallRectangle + 60 && !this._delete){
	    max = this._heightSmallRectangle + 60;
	  }

		/*
	  	If the element that gives the maximum height to the lifeline
			is a create message, the height of the A element( A lifeline) 
			of the create message is modify so that the bottom Y coordinate 
			of the A element coincides with the bottom Y coordinate of the 
			B element (in the case that the bottom Y coordinate of A element
			is less than the bottom Y coordinate of B element).
		*/
	  if(maxRel && maxRel instanceof CreateMessage){
			if(maxRel._elemB == this){
    		if(!maxRel._elemA.getDelete()){

				/*
	      	Modify the height of the A element so that the bottom 
					Y coordinate of the A element coincides with the 
					bottom Y coordinate of the B element(if necessary)
				*/
		      if( (maxRel._elemA.getY() + maxRel._elemA.getHeight()) < (this.getY() + max + 60))
  	      	maxRel._elemA.setHeight(this.getY() + max + 60 - maxRel._elemA.getY());
  		  }
			} else {
				/*
	      	Ensure that the B element of create message has updated 
					your height before update the height of the A element
				*/
	      maxRel._elemB.updateLength();

				/*
	      	Modify the height of the A element so that the bottom Y
					coordinate of the A element coincides with the bottom Y
					coordinate of the B element(if necessary)
				*/
	      if( (maxRel._elemB.getY() + maxRel._elemB.getHeight()) > (this.getY() + max + 60))
	        max = maxRel._elemB.getY() + maxRel._elemB.getHeight() - this.getY() - 60;
			}
		}

		//The height is updated according to the maximum value
		if( this._delete ) {
			this.setHeight( max  ); 
		} else {
			this.setHeight( max + 60 );
		}
}


/**
 * Set the _delete attribute to value of 'y'.
 * When the delete attribute has a value different to 0, this means that
 * the lifeline has a delete message (being the element B of the delete message)
 * and your value indicates the y coordinate where this delete message is.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setDelete
 * @param {number} y value that contains the y coordinate of the delete message and will assigned to the attribute '_delete'
 *
 */
Lifeline.prototype.setDelete = function( y ) {
  this._delete = y;
}

/**
 * Return the _delete attribute 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getDelete
 * @return {boolean}  value that contains the y coordinate of the delete message
 *
 */
Lifeline.prototype.getDelete = function( ) {
  return this._delete;
}

/**
 * Set the _create attribute to value of 'value'.
 * When the _create attribute has a value different to 0, this means that
 * the lifeline has a create message (being the element B of the create message)
 * and your value indicates the y coordinate where this create message is.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setCreate
 * @param {boolean} value value that will assigned to the attribute '_create'.
 *
 */
Lifeline.prototype.setCreate = function( value ) {
  this._create = value;
}


/**
 * Return the _create attribute 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getCreate
 * @return {boolean}  value that contains the y coordinate of the create message
 *
 */
Lifeline.prototype.getCreate = function( ) {
  return this._create;
}


/**
 * Add a new relation ('rel' parameter) to the LifeLine, provided
 * the 'addedRelationAlready' parameter has a value different to 0. A value 0 of the 
 * parameter is saw when the relation to add is a relation to self, and
 * this has already been added previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class addRelation
 *
 * @param {Relation} rel relation that will be added to the LifeLine
 * @param {Number} addedRelationAlready Indicates if the relation has been added previously
 *
 */
Lifeline.prototype.addRelation = function( rel, addedRelationAlready ) {			

	//Initializes the value of the parameter
  var addedRelationAlready = (JSFun.isNumber( addedRelationAlready )) ? addedRelationAlready : 0;	

	//Set the 'delete' attribute to the position of y coordinate
  if( rel instanceof DeleteMessage && rel._elemB == this ) {
		this.setDelete( rel._y );
  }

	//Set the 'create' attribute to the position of y coordinate
  if( rel instanceof CreateMessage && rel._elemB == this) {
		this.setCreate( rel._y );
  }

	//Ensures that the upper limit of relation is below small rectangle of lifeline
	rel.updateLimitY();			

	//Update the y position of the relations if your upper limit has been modified 
  if(rel._y < rel._limitY)	
		rel._y = rel._limitY;

	//Call to base method
	if(!addedRelationAlready){
	  Lifeline.base.addRelation.call( this, rel );
	}
}



/**
 * Updates the elememt's position regarding the movement indicated 
 * by the parameters and transmits it to its elements
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updatePosition
 * @param {Number} movx Movement in the x-axis
 * @param {Number} movy Movement in the y-axis
 */
Lifeline.prototype.updatePosition = function( movx, movy ) {
  var i, comp;


  if( movx == undefined || movy == undefined ) {

    var mov = this.getMovement();
    var movx = mov.getX();
    var movy = mov.getY();

		//Resets the movement
    this.resetMovement();

		//Updates the node's relations
    for( i in this._relations ) {
      this._relations[i].updatePosition();
    }

  } else {
    this._x += movx;
    this._y += movy;    
  }

	//Reset the movement
  this.resetMovement();

  //Updates position of the node's components
  for( i in this._components ) {
    this._components[i].updatePosition( movx, movy );
  }

  //Updates position of the node's relations
  for( i in this._relations ) {
    if( this._relations[i].getParent() != this._parent ) {
      this._relations[i].notifyChange();
    }
  }

  //Updates position of the child nodes and child relations of the node
  if( this._container ) {
    for( i in this._nodeChilds ) {
      this._nodeChilds[i].updatePosition( movx, movy );
    }
    
    for( i in this._relationChilds ) {
      this._relationChilds[i].updatePosition( movx, movy );
    }
  } 
  
}


/**
 * Delete a relation ('rel' parameter) to the LifeLine, provided
 * the 'deletedRelationAlready' parameter has a value different to 0. A value 0 of the 
 * parameter is saw when the relation to delete is a relation to self, and
 * this has already been removed previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class delRelation
 *
 * @param {Relation} rel relation that will be deleted of the LifeLine
 * @param {Number} deletedRelationAlready Indicates if the relation has been deleted of the time interval already
 *
 */
Lifeline.prototype.delRelation = function( rel, deletedRelationAlready) {

	//Initializes the value of the parameter if hasn't been defined
  var deletedRelationAlready = (JSFun.isNumber( deletedRelationAlready )) ? deletedRelationAlready : 0;	

	//If the relation is a deletemessage, the delete attribute is setting to the initial value
  if( rel instanceof DeleteMessage && rel._elemB == this) {
	this.setDelete( 0 );
  }

  if( rel instanceof DeleteMessage) {
    this._limitY = -1;
  }
     
	//If the relation is a createmessage, the create attribute is setting to the initial value
  if( rel.getType() == 'UMLCreate' && rel._elemB == this){
		this.setCreate( 0 );
  }

  
  //Update length of all lifeline that exits in the diagram
  var nodes = this._diagram._nodes;
  for(var i=0; i<nodes.length; i++)
    if(nodes[i].getType() == 'UMLLifeline')
			nodes[i].updateLength();

  //Call to delRelation method of base class
	if(!deletedRelationAlready){
	  Lifeline.base.delRelation.call( this, rel );
	}
}


/**
 * Draw a LifeLine in the canvas
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class draw
 *
 * @param {CanvasRenderingContext2D} context Context of canvas element
 *
 */
Lifeline.prototype.draw = function( context ) {

	//Call to the base method
  Lifeline.base.draw.call( this, context );
  
	//If the lifeline contains a delete message, being the element B of this.
  if( this._delete ) {

    var x = this.getX() + this.getWidth() / 2;
    var y = this.getY() + this.getHeight();
    
    context.save();			
    context.strokeStyle = '#000000';		
    context.translate( x, y );
    
		//Draws a X to the end of dashed line, when the lifeline is the element B of a delete message
    context.beginPath();
    context.moveTo( -8.5, 8.5 );		
    context.lineTo( 8.5, -8.5 );
    context.moveTo( 8.5, 8.5 );
    context.lineTo( -8.5, -8.5 );
    context.stroke();
    context.restore();
  }
  
}



/**
 * Draw the shape of the life line
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
Lifeline.prototype.drawShape = function( context ) {
  context.save();
  context.lineWidth = 2.5;
  context.strokeStyle = NodeStyle.shape_color;
  context.strokeRect( JSGraphic.toPixel( this._x ), JSGraphic.toPixel( this._y ), this._width, this._heightSmallRectangle);

  context.beginPath();
  context.moveTo(this.getLineX(), JSGraphic.toPixel( this._y ) + this._heightSmallRectangle);
  context.lineTo(this.getLineX(), JSGraphic.toPixel( this._y ) + this._height);
  context.closePath();
  context.stroke();
  context.restore();  
}


/**
 * Draws the figures that the lifeline has
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Lifeline.prototype.drawFigures = function( context ) {

  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {
			this._figures[i].draw( context, this._x, this._y, this._width, this._height, this._heightSmallRectangle );
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

Lifeline.prototype.setName = function( text ){
	this._components[1].setValue( text );
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
Lifeline.prototype.addStereotype = function(text){
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

Lifeline.prototype.getStereotypes = function( ){
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
Lifeline.prototype.getName = function( ){
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
Lifeline.prototype.getStereotype = function(){		
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
Lifeline.prototype.getNameAsComponent = function( ){
	return this._components[1];
}