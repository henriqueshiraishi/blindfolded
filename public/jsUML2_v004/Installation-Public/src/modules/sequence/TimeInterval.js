/**
 ** MODULE NAME: 
 **	  TimeInterval.js
 **
 ** DESCRIPTION:
 **   Defines the properties of the timeinterval element of the sequence diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
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


//= require <../modules/sequence/Message>


/**
 * TimeInterval class constructor, creates a time interval element in a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @class TimeInterval
 * @extends Lifeline
 *
 */
var TimeInterval = function( params ) {
  params = params || {};
  TimeInterval.baseConstructor.call( this, params );
  
  this.setType( 'TimeInterval' );
  this.setMoveable();
  this.setWidth( 10 );
  this.setMinHeight( 30 );
	this.setHeight(params.height || 1);
  this.addFigure( new RectangleFigure({ color: '#ffffff', changeFigureColor: false }) );
}

JSFun.extend( TimeInterval, Rectangular );



/**
 * Performs the corresponding actions when the user drag 
 * the time interval element.
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @class drag
 *
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
TimeInterval.prototype.drag = function( x, y ) {

  if( this._resizing ) {

    var height = y - this.getY();
    this.setHeight( height );
  }
}

/**
 * Perfoms the necessary actions when user releases the mouse's 
 * buttom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of position
 * @param {Number} y Coordinate y of position
 */
TimeInterval.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }

		this.updatePosition();

		if( this._parent ) {
			this._parent.updateContainer();
		}
    
  } else if( this._resizing ) { 

		//Notify changes to the message that has created this time interval
    this._message.notifyChange();

		//Notify changes in the time interval
    this.notifyChange();
  } else if( this._selectedBefore ) {

    this.selectComponent( x, y );
  }
  
	//Updates the delete messages to ensure that there aren't any message below a delete message
	this._message.updateDeleteMessages();

  this._moved = false;
  this._resizing = false;
}


/**
 * Assign to the node the related message 
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method setMessage
 * @param {Node} newMessage Message to the node belongs
 */
TimeInterval.prototype.setMessage = function( newMessage ) {

  if( newMessage instanceof Message ) {
    this._message = newMessage;       
  } else {
    this._message = null;
  }
}


/**
 * Return the x coordenate that coincides with the dashed line of the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method getLineX
 *
 * @param {Number}  mult value 1 or -1 to return the x coordinate of the rigth or left side of the node
 * @return {Number} x coordinate of left or right side of the node
 */
TimeInterval.prototype.getLineX = function(mult) {
  return this.getX() + this.getWidth()/2 + (mult * this.getWidth()/2) ;
}



/**
 * Updates height of the node according to the related messages 
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method updateLength
 *
 */
TimeInterval.prototype.updateLength = function() {

  var i;
  var max = 0;
	var maxRel;
	var y;
  
  for( i in this._relations ) {

		//Calculates the y coordinate of the relation

		//If is a message to self
		if(this._relations[i]._elemA == this._relations[i]._elemB){
			y = this._relations[i].getY() + 100;
		} else {

			//if the message has like element B to this node
			if ( this._relations[i]._elemB == this){

				//If the objB has a value of 0, it means that the message had a objB before be added to this node
				var heightObjB = (this._relations[i]._objB == 0) ? 30 : 0;
				var y = this._relations[i].getY() + heightObjB;
			}	else { //if the message has like element A to this node

				//If the objA has a value of 0, it means that the message had a objA before be added to this node
				var heightObjA = (this._relations[i]._objA == 0) ? 30 : 0;	
				var y = this._relations[i].getY() + heightObjA;			
			}
		}
				
		//If the y coordinate is greater than the maximum
    if( (this._relations[i] instanceof Message) && y > max ) {
      max = y;
			maxRel = this._relations[i];
    }
  }

	/*
		Updates the height of the node if necessary
	*/

	//If the time interval contains any relations
	if(maxRel){
		max = max - this._y;
		this.setMinHeight( max );
	} else {
		//If the time interval not contains any relations
		this.setMinHeight( 30 );
	}
}

/**
 * Add a new relation ('rel' parameter) to the time interval, provided
 * the 'addedRelationAlready' parameter has a value different to 0. A value 0 of the 
 * parameter is saw when the relation to add is a relation to self, and
 * this has already been added previously.
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @class addRelation
 * @param {Relation} rel relation that will be added to the time interval
 * @param {Number} addedRelationAlready Indicates if the relation has been added previously
 *
 */
TimeInterval.prototype.addRelation = function( rel, addedRelationAlready){

	//Initializes the value of the parameter if hasn't been defined
  var addedRelationAlready = (JSFun.isNumber( addedRelationAlready )) ? addedRelationAlready : 0;	

	//Add the object A that has been removed when this object has been added previously to the TimeInterval node
	if(rel._elemA == this && rel._objA && (addedRelationAlready == 1 || addedRelationAlready == 0)){
		rel._objA.remove();
		rel._objA = 0;
	}

	//Add the object B that has been removed when this object has been added previously to the TimeInterval node
	if(rel._elemB == this && rel._objB && (addedRelationAlready == 2 || addedRelationAlready == 0)){
		rel._objB.remove();
		rel._objB = 0;
	}

	//Ensures that the upper limit of relation is below small rectangle of lifeline
	rel.updateLimitY();

	//Update the y position of the relations if your upper limit has been modified 
  if(rel._y < rel._limitY)	
		rel._y = rel._limitY;

	//Call to base method
	if(!addedRelationAlready)
	  Lifeline.base.addRelation.call( this, rel );

}


/**
 * Delete a relation ('rel' parameter) to the time interval, provided
 * the 'deletedRelationAlready' parameter has a value different to 0. A value 0 of the 
 * parameter is saw when the relation to delete is a relation to self, and
 * this has already been deleted previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class delRelation
 * @param {Relation} rel relation that will be deleted of the time interval
 * @param {Number} deletedRelationAlready Indicates if the relation has been deleted of the time interval already
 *
 */

TimeInterval.prototype.delRelation = function( rel, deletedRelationAlready ) {
	
	//Initializes the value of the parameter if hasn't been defined
  var deletedRelationAlready = (JSFun.isNumber( deletedRelationAlready )) ? deletedRelationAlready : 0;	

	//Add the object A that has been removed when this object has been added previously to the TimeInterval node
	if(rel._elemA == this && rel._objA == 0 && (deletedRelationAlready == 1 ||  deletedRelationAlready == 0)){

			rel.setObjA( new TimeInterval() );
			rel._objA.setDiagram(rel._diagram);
			rel._diagram._addNode(rel._objA);
	}

	//Add the object B that has been removed when this object has been added previously to the TimeInterval node
	if(rel._elemB == this && rel._objB == 0 && (deletedRelationAlready == 2 ||  deletedRelationAlready == 0)){

			rel.setObjB( new TimeInterval() );
			rel._objB.setDiagram(rel._diagram);
			rel._diagram._addNode(rel._objB);
	}

	//Update the upper y limit of the rel that will be removed
	rel._limitY = this._message._limitY;	
  
  //Update length of all lifeline that exits in the diagram
  var nodes = this._diagram._nodes;
  for(var i=0; i<nodes.length; i++)
    if(nodes[i].getType() == 'UMLLifeline')
			nodes[i].updateLength();



  //Call to delRelation method of base class
	if(!deletedRelationAlready)
	  TimeInterval.base.delRelation.call( this, rel );

	//Update length of the TimeInterval
	this.updateLength();
}

