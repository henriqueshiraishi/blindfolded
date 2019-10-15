/**
 ** MODULE NAME: 
 **	  Message.js
 **
 ** DESCRIPTION:
 **   Defines the properties of the message element of the sequence diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Oct 2012 - AAH - Third version release
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


//= require <../modules/sequence/TimeInterval>
//= require <../modules/sequence/SequenceDiagram>
//= require <../modules/sequence/TimeInterval>



/**
 * Message class constructor, creates a Message element in a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class Message
 * @extends Relation
 * @param {Element} a first element of Message
 * @param {Element} b second element of the Message
 * @param {Number} y : y coordinate of the Message element
 */

var Message = function( params ) {
  params = params || {};

	//y coordinate and y limit
  this._y = params.y || 0;
  this._limitY = 0;
  
	//objects 
  this._objA = null;
  this._objB = null;
  
	//Call to base method
  Message.baseConstructor.call( this, params );
}
JSFun.extend( Message, Relation );


/**
 * Return a xml node with information about the message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getElementXML
 * @param  {DOMNode} parent: parent of Message element
 * @return {DOMNode} xml node with information about the object
 */
Message.prototype.getElementXML = function( parent ) {

	//Call to base method
  var xmlnode = Message.base.getElementXML.call( this, parent );
  
	//Saves the y coordinate
  xmlnode.setAttribute( 'y', this._y );
  
	/*	
		If the object A of the message exists, is saved your id, 
		in other case is saved null or 0, depending on whether 
		the message hasn't a object A or this has been deleted 
		because one of its elements (A or B element) is a time interval
	*/
  if( this._objA ){
		//object's id is saved
	  xmlnode.setAttribute( 'a', this._objA.getId() );
  } else {
		//null or 0 is saved
	  xmlnode.setAttribute( 'a', this._objA );	
	}
  
  if( this._objB ){
		//object's id is saved
	  xmlnode.setAttribute( 'b', this._objB.getId() );
  } else {
		//null or 0 is saved
	  xmlnode.setAttribute( 'b', this._objB );  
	}
  
  return xmlnode;
}


/**
 * A xml node is received with the node information and such information is retrieved
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setElementXML
 * @param  {DOMNode} xmlnode xml node with the information about the Message element
 * @param  {array} ids Vector with the references to the objects of the diagram
 */

Message.prototype.setElementXML = function( xmlnode, ids ) {

	//Call to the base method
  Message.base.setElementXML.call( this, xmlnode, ids );

	//Retrieves the y coordinate of the message
  this._y = parseInt( xmlnode.getAttribute( 'y' ) );

	//Retrieves the information about the objects
  var idObjA = xmlnode.getAttribute( 'a' );
  var idObjB = xmlnode.getAttribute( 'b' );
	

	/*
		If idObjA/idObjBB don't represent the object's id, and is number
	  or a null value, this is passed to your correct type.
		For this, first idObjA/idObjB is tried to convert a number, if 
		it isn't possible, means that idObjA/idObjB has a null value 
	*/

	var numA = parseInt(idObjA);
	if(JSFun.isNumber(numA))
		idObjA = numA;
	else if(idObjA == 'null')
		idObjA = null;
	

	var numB = parseInt(idObjB);
	if(JSFun.isNumber(numB)) 
		idObjB = numB;
	else if(idObjB == 'null')
		idObjB = null;

	/*
		Once that the idObjA and idObjB is passed to your correct format,
		the value of the message's objects is set
	*/

  if( idObjA ) {
	  this.setObjA( ids[ idObjA ] );
  } else {
		this._objA = idObjA;
	}

  if( idObjB ) {
	  this.setObjB( ids[ idObjB ] );
  } else {
		this._objB = idObjB;
	}
}



/**
 * Defines the elements of the relation.
 * It is used when indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the new elements has been performed rightly
 */

Message.prototype.setElements = function( elemA, elemB ) {

  this._points[0] = new Point();
  this._points[1] = new Point();


  if( elemA instanceof Element && elemB instanceof Element ) {
  
    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }
    
		/*
			A and B elements of the message are deleted. If is a message to self, 
			only can be deleted one of its elements, since both are the same.
		*/

		//Deletes the element A of the message. If is a message to self, 
		//only is deleted this element
    if( this._elemA && this._elemA != this._elemB ) {
      this._elemA.delRelation( this );
    }
		//Deletes the element B
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }
    
		//Sets the new element of the message
    this._elemA = elemA;
    this._elemB = elemB;

		//Adds the message to the element A
    this._elemA.addRelation( this );

		//If is a message to self, then the message only is added in the element A.
		//In the else condition, the second parameter avoids that the element be added
		// by second time.
		if(elemA != elemB)
    	this._elemB.addRelation( this );
		else 
	    this._elemB.addRelation( this,2 ); 

    this.updateParent();
    this._calculateLineEnds();

    return true;
  
  } else { 
    return false;
  }
}



/**
 * Set the A element of the Message. 
 *
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 */
Message.prototype.setElementA = function( elem ) {

	//Only is enable to set as element of a message a life line or a time interval
  if( elem && (elem.getType() == 'UMLLifeline' || elem.getType() == 'TimeInterval')) {

		//Is avoid that both elements of the relation be relations
    if( elem instanceof Relation && this._elemB instanceof Relation ) {
      return false;
    }

		/*
			If the before element A of the message is same to the elememt B,
			it must avoid delete the relation of the element(it is got via the 
			second parameter of the 'delRelation' method of the 'else' condition)
		*/
    if( this._elemA ) {
			if(this._elemA != this._elemB)
	      this._elemA.delRelation( this );
			else
	      this._elemA.delRelation( this,1 );
    }

		//Sets the new element of the message
    this._elemA = elem;

		/*
			If is a message to self, then can't be added because this message 
			has been added previously. In the else condition, the second parameter 
			avoids that the element be added by second time.
		*/
		if(this._elemA != this._elemB)
	    this._elemA.addRelation( this );
		else 
	    this._elemA.addRelation( this,1 );
    this.updateParent();

    return true;
  } else { 
    return false;
  }
}


/**
 * Set the B element of the Message
 *
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method setElementB
 * @param {Element} elem Second element of the message
 */


Message.prototype.setElementB = function( elem ) {

	//Only is enable to set as element of a message a life line or a time interval
  if( elem && (elem.getType() == 'UMLLifeline' || elem.getType() == 'TimeInterval') ) {

		//Is avoid that both elements of the relation be relations
    if( elem instanceof Relation && this._elemA instanceof Relation ) {
      return false;
    }

		/*
			If the before element B of the message is same to the elememt A,
			it must avoid delete the relation of the element(it is got via the 
			second parameter of the 'delRelation' method of the 'else' condition)
		*/

    if( this._elemB ) {
			if(this._elemA != this._elemB)
	      this._elemB.delRelation( this );	
			else
	      this._elemB.delRelation( this, 2 );	
    }

		//Sets the new element of the message
    this._elemB = elem;

		/*
			If is a message to self, then can't be added because this message 
			has been added previously. In the else condition, the second parameter 
			avoids that the element be added by second time.
		*/

		if(this._elemA != this._elemB)
	    this._elemB.addRelation( this );
		else 
	    this._elemB.addRelation( this, 2);

		//Updates the parent
    this.updateParent();

    return true;    
  } else {
    return false;
  }
}

/**
 * Set the upper limit of the Message 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setLimitY
 * @param  {number} y Coordinate y of the Message
 */
Message.prototype.setLimitY = function( y ){
  this._limitY = y;
}


/**
 * Return the y coordinate of the Message 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getY
 * @return {number} y Coordinate y of the Message
 */
Message.prototype.getY = function() {
  return this._y;
}


/**
 * Check if the given point is over some element of Message, and in right case, 
 * the Message is selected to interact with the user.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method select
 * @param {Number} x  Coordinate x of point to check
 * @param {Number} y  Coordinate y of point to check
 * @return {Boolean} if the point is over any element.
 */
Message.prototype.select = function( x, y ) {
  this._deselectComponent();

  // you have clicked on one point
  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {
      
      if( this._selected > -1 )
        this._selectedBefore = true;
        
      this._selected = i;
      this._selectedPoint = true;
      return true;
    }
  }
  
  
  // you have clicked on a component
  if( this._selected > -1 ) {
    if( this._isOverComponent( x, y ) ) {
      this._selectedBefore = true;    
      return true;
    }
  }
  

  // you have clicked on one lines
  for( var i = 0; i < this._points.length - 1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y ) ) {  
      
      if( this._selected > -1 )
        this._selectedBefore = true;
          
      this._selected = i;
      this._selectedLine = true;		

			//Stored the movement from the y coordinate captured by click event to the y coordinate of the 0 point
			if(this._elemA == this._elemB)
				this._movementLine = y - this._points[0]._y;
	
      return true;
    }
  }
  
  return false;
}


/**
 * Perfom the neccesary actions to get a mouse movement 
 * to the given position by the x,y attributes 
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
Message.prototype.drag = function( x, y ) {
  if( this._selectedLine ) {

    var i;

		/*
			If the line is a message to self and this message is drag from another point 
			than the 0 point, the new position of y has to take in account the movement 
			from the y coordinate(passed like parameter) to the 0 point
		*/

		if(this._elemA == this._elemB)
	 		y -= this._movementLine;

		//Ensures that the create message isn't above upper y limit 
    if( y > this._limitY ) {
      this._y = y;
    } else {
      this._y = this._limitY;
    }

    this._moved = true;
    
  } else if( this._selectedPoint ) {
		
    this._points[ this._selected ].setX( x );
	
    this._moved = true;
  }
}


/**
 * Performs the actions necessaries when the user 
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Message.prototype.drop = function( x, y ) {
  if( this._moved ) {
    this._checkForNewNodes( x, y );   
  } else if( this._selectedBefore ) {
    this._selectComponent( x, y );
  }

  this._selectedLine = false;
  this._selectedPoint = false;

  this._delUselessPoints();
  this.notifyChange();

	//Updates the delete messages so that there aren't messages below a delete message
	this.updateDeleteMessages();

	//Updates position of life lines that are B elements of descendant create messages
	this.updateRelatedLifeline();

  this._moved = false;
}


/**
 * Update the position of life lines that are the B elements of create 
 * messages contained into the descendant time intervals of the current message
 *
 * @author Rafael Molina Linars
 * @update 3/10/2011
 *
 * @method _updateRelatedLifeline
 * @private
 *
 */

Message.prototype.updateRelatedLifeline = function(){

	var descendant_messages = this.descendantMessages();
	for(var i=0;i<descendant_messages.length;i++){
		if(descendant_messages[i] instanceof CreateMessage)
			descendant_messages[i]._elemB.updatePosition();
	}
}

/**
 * Check if there is a consistent element at the point 
 * indicated and if so adds to the relation after removal of old item
 *
 * @author Rafael Molina Linars
 * @update 21/09/2011
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of posible point
 * @param {Number} y Coordinate y of posible point
 */
Message.prototype._checkForNewNodes = function( x, y ) {

  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

		//Gets the element found in the x,y coordinates
    var newElem = this._diagram.reassignRelationTo( this, x, y );

		//Ensures that a message can't have like element A or B to its own objects(objA or objB)
    if( newElem != this && newElem != this._objA && newElem != this._objB  ) {

      if( this._selected == 0 ) {
        this.setElementA( newElem );        
      } else {
        this.setElementB( newElem );    
      }
    }
  }
}


/**
 * Updates the position of the delete message(if is necessary) so that
 * there aren't any message below a delete message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method checkPositionMessages
 */

Message.prototype.updateDeleteMessages = function(){		

	var i = 0;
	var lifelines = [];
	if(this._diagram){
		var nodes = this._diagram._nodes;
	}
	else var nodes=[];

	//Stores the lifelines in a new array
	for(i= nodes.length; i--;)
		if((nodes[i] instanceof Lifeline))
			lifelines.push(nodes[i]);

	/*
		Sort the lifelines according to the delete attribute so that 
		the life lines that have its delete message with a lower y coordinate 
		are updated before
	*/
	lifelines.sort(
    function( a, b ) {
      var delete1 = a.getDelete();
      var delete2 = b.getDelete();

      if( delete1 < delete2 )
        return -1;
      else if( delete1 == delete2 )
        return 0;
      else
        return 1;       
  });

	//Update the position of deletemessage of the lifelines
	for(i=0;i< lifelines.length;i++)
			lifelines[i].updateDelete();
}


/**
 * Calculates the final points of the Message are in contact with the nodes
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _calculateLineEnds
 * @private
 * @param {Number} updateObj If the objects are updated and the final points of the related messages of the message are calculated 
 */

Message.prototype._calculateLineEnds = function( updateObj ) {  

	//Initiliaze parameter of method
	var updateObj = (updateObj == false || updateObj == 0 || updateObj) ? updateObj : 1;

	var i;



  if( !this._selectedPoint && this._elemA && this._elemB ) {

    //the y coordinate of the Message is increased if it occupies the lifeline rectangle
    if( (this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle)) )
	  this._y = this._elemA.getY() + this._heightSmallRectangle;

		//Is took in account that the parameters of the same method changes according to the element related with this message
		var that = this;
 
		/*
			This function called to the getLineX method of different way according to 
			whether the element that calls to the method is a TimeInterval object or
			Lifeline object. If the element is a TimeInterval, the method is called with
			a parameter between its arguments. If the parameter has a value of 1, it means 
			that the element has a lower x coordinate that the another element of the 
			message, and then,the contact point between the message and the element must
			be the right side of the element. If the value is 0, the element has a higher
			x coordinate, and the contact point must be the left side of the element
		*/
		var getLineXAlternative = function( elem ){
			if(elem instanceof Lifeline)
				return elem.getLineX();
			else if(elem instanceof TimeInterval){
				//If the element that calls to the function is the element A of relation
				if(elem == that._elemA){

					//If the x coordinate of the element is on the right of the element B
					if(elem._x > that._elemB._x){		
						return elem.getLineX(-1);
					}	else {
						//if the x coordinate of the element is on the left of the element B
						return elem.getLineX(1);
					}
				} else { 

					//If the x coordinate of the element is on the right of the element B
					if(elem._x > that._elemA._x){		
						return elem.getLineX(-1);
					} else{
						//if the x coordinate of the element is on the left of the element B
						return elem.getLineX(1);
					}
				}
			}
		}

		//Updates the limitY
		if(updateObj == 1){	
			this.updateLimitY();
			if(this._y < this._limitY)
				this._y = this._limitY;
		}

		//If is a message to self
    if(this._elemA == this._elemB){

	    var  height = (this._objA) ? (this._objA.getHeight() + 20) : 50;

	    this._points[0].setPoint( getLineXAlternative(this._elemA), this._y );
	    this._points[1] = new Point( getLineXAlternative(this._elemB) + 50, this._y );
	    this._points[2] = new Point( getLineXAlternative(this._elemB) + 50, this._y + height);
	    this._points[3]= new Point( getLineXAlternative(this._elemB) , this._y + height);

    }
    else {

	    this._points[0].setPoint( getLineXAlternative(this._elemA), this._y );
	    this._points[1].setPoint( getLineXAlternative(this._elemB), this._y );

			//If exists more point, are deleted
			while(this._points[2])
				this._points.pop();
    }

		//This code's part is executed when this method hasn't been called by drawShape method to get the interaction
		if(updateObj){

			//Updates objects
	    this.updateObjects();

			var heightUpdate;
			var rel = [];

			//Set that the movement of the relation has been done
			if(updateObj == 1)
				this._moved = true;

			//If there are object A or if the element A contains some relation to self
			if(this._objA || (this._elemA instanceof TimeInterval && this._objB) ){
	
				var relObjA = [];
				var objA = (this._objA) ? this._objA : this._elemA;

				//Inserts the correspond relations in an array
				if(this._objA){
					relObjA = objA._relations;
				}	else {
					//Only are taking in account the relations to self
					for(var j=0;j<this._elemA._relations.length;j++)
						if(this._elemA._relations[j]._elemA == this._elemA._relations[j]._elemB)
							relObjA.push(this._elemA._relations[j]);
				}

				for(i=0; i < relObjA.length; i++){

					//If the relations hasn't been moved by the previously calls of this method
					if(!relObjA[i]._moved){

						//Set the new message's position
						if(this._objA)
							heightUpdate = (this._objA._y - this._objA._prey)
						else{
							heightUpdate = (this._objB) ? (this._objB._y - this._objB._prey) : 0;			
						} 
						relObjA[i]._y = relObjA[i]._y + heightUpdate;
		
						//Set that the movement of the message has been done
						relObjA[i]._moved = true;

						//Update the end points of the message
						relObjA[i]._calculateLineEnds((!updateObj) ? updateObj : 2);	
						relObjA[i]._updateComponents();	
					}
				}
			}

			//If there are object B or if the element B contains some relation to self
			if(this._objB || (this._elemB instanceof TimeInterval && this._objA) ){

				var relObjB = [];
				var objB = (this._objB) ? this._objB : this._elemB;

				//Inserts the correspond relations in an array
				if(this._objB){
					relObjB = objB._relations;
				}	else {

					//Only are taking in account the relations to self
					for(var j=0;j<this._elemB._relations.length;j++)
						if(this._elemB._relations[j]._elemA == this._elemB._relations[j]._elemB)
							relObjB.push(this._elemB._relations[j]);
				}


				for(i=0; i < relObjB.length; i++){
					if(!relObjB[i]._moved){

						//Set the new message's position
						if(this._objB)
							heightUpdate = (this._objB) ? (this._objB._y - this._objB._prey) : (this._objA._y - this._objA._prey);
						else
							heightUpdate = (this._objA) ? (this._objA._y - this._objA._prey) : 0;			
						
						relObjB[i]._y = relObjB[i]._y + heightUpdate;

						//Set that the movement of the message has been done
						relObjB[i]._moved = true;

						//Update the end points of the message
						relObjB[i]._calculateLineEnds((!updateObj) ? updateObj : 2);  
						relObjB[i]._updateComponents();	
					}
				}
			}

			//Reset the movement 
			if(updateObj != 2){
				if(this._objA)
					this._objA.resetMovement();
				if(this._objB)
					this._objB.resetMovement();

				//Updates the objects, upper y limit and _moved atributte of the this message(and its related messages)
				var descendant_messages = this._sortAscendant(this.descendantMessages());
				for(i=0;i<descendant_messages.length;i++){

					//Once the message's position has been updated, the movement of the message is set to false
					descendant_messages[i]._moved = false;

					//Reset the movement of message's objects stored in the _prex,_prey atributtes 
					if(descendant_messages[i]._objA)
						descendant_messages[i]._objA.resetMovement();
					if(descendant_messages[i]._objB)
						descendant_messages[i]._objB.resetMovement();

					//Updates the upper y limit of the message
					descendant_messages[i].updateLimitY();
					if(descendant_messages[i]._y < descendant_messages[i]._limitY){
						descendant_messages[i]._y = descendant_messages[i]._limitY;
						descendant_messages[i]._calculateLineEnds();
					}
				}
			}
		}
  }
}


/**
 * Searchs all descendant messages of the current message and stores 
 * them in an array that will be returned
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantMessages
 * @return {Array} An array with the descendant messages of the message(included this message)
 */
Message.prototype.descendantMessages = function ( descendant_messages) {

	var descendant_messages =  descendant_messages || [];
	var i;

	//Includes the 'this' message
	if(!this.foundInArray(descendant_messages))
	descendant_messages.push(this);
		
	//Includes the messages contained in the object A of the this message, or the messages to self contained in the element A of the "this" message
	if(this._objA){

		for( i=0;i<this._objA._relations.length;i++)
			descendant_messages = this._objA._relations[i].descendantMessages(descendant_messages);
	} else if(this._elemA && this._objB){

		//Only are taking in account the relations to self
		for( i=0;i<this._elemA._relations.length;i++)
			if(this._elemA._relations[i]._elemA == this._elemA._relations[i]._elemB)
				descendant_messages = this._elemA._relations[i].descendantMessages(descendant_messages);		
	}

	//Includes the messages contained in the object B of the this message, or the messages to self contained in the element B of the "this" message
	if(this._objB){

		for( i=0;i<this._objB._relations.length;i++)
			descendant_messages = this._objB._relations[i].descendantMessages(descendant_messages);
	} else if(this._elemB && this._objA) {

		//Only are taking in account the relations to self
		for( i=0;i<this._elemB._relations.length;i++)
			if(this._elemB._relations[i]._elemA == this._elemB._relations[i]._elemB)
				descendant_messages = this._elemB._relations[i].descendantMessages(descendant_messages);	
	}

	return descendant_messages;
}



/**
 * Sorts an array of relations according to the create messages that contains
 *
 *
 * @author Rafael Molina Linares
 * @update 4/10/2011
 *
 * @method _sortRelByCreateMessages
 * @param {Array} rel Array of relations that will be sorted
 * @param {Number} numSort Sort type to performs.  If numSort =-1 create messages are colocated in the first positions of array.
 *																								 If numSort = 1 create messages are colocated in the last positions of array.
 *
 */
Message.prototype._sortRelByCreateMessages = function(rel,numSort){

	if(!(numSort == 1 || numSort == -1))
		return rel;

	rel.sort(
		function( a, b ) {

			if(a instanceof CreateMessage && b instanceof CreateMessage ){
				if(a._y > b._y)
					return -1;
				else
					return 1;
			}	else if (a instanceof CreateMessage && !(b instanceof CreateMessage )){
				return numSort;
			}	else if ( !(a instanceof CreateMessage ) && b instanceof CreateMessage){
				return -numSort;
			} else {
				return 0;
			}			
	});

	return rel;
}

/**
 * Sorts an array of relations according to the distance between the y 
 * coordinate and the limitY of the relation(in descendant orden)
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _sortRelByDistanceToLimitY
 * @param {Array} rel Array of relations that will be sorted
 *
 */
Message.prototype._sortRelByDistanceToLimitY = function(rel){

	rel.sort(
		function( a, b ) {

			var distanceA = a._y - a._limitY;
			var distanceB = b._y - b._limitY;

			if(distanceA > distanceB)
				return -1;
			else if(distanceA < distanceB)
				return 1;
			else 
				return 0;
		});
	return rel;
}

/**
 * Sorts an array from lowest to highest value of the y coordinate 
 *
 *
 * @author Rafael Molina Linares
 * @update 4/10/2011
 *
 * @method _sortAscendant
 * @param {Array} rel Array of relations that will be sorted
 *
 *
 */
Message.prototype._sortAscendant = function(rel){

	rel.sort(
		function( a, b ) {

				if(a._y > b._y)
					return 1;
				else if(a._y < b._y)
					return -1;
				else 
					return 0;
		});
	return rel;
}

/**
 * Updates the y limit of relations taking the maximum y between both elements(elemA/B)
 *
 *
 * @author Rafael Molina Linares
 * @update 29/09/2011
 *
 * @method updateLimitY
 *
 */
Message.prototype.updateLimitY = function (){

	var y_elemA = 0;
	var y_elemB = 0;	


	//Calculates the y limit depending on whether the element is a life life or a TimeInterval
	if(this._elemA){
		y_elemA = (this._elemA instanceof Lifeline) ? (this._elemA.getY() + this._elemA._heightSmallRectangle + 5) : (this._elemA.getY() + 5);		
	}
	if(this._elemB){
		y_elemB = (this._elemB instanceof Lifeline) ? (this._elemB.getY() + this._elemB._heightSmallRectangle + 5) : (this._elemB.getY() + 5);
	}

	//Sets the y limit with the higher value of the y coordinate between the element A and B
	if(y_elemA > y_elemB || this instanceof CreateMessage)
		this.setLimitY(y_elemA);
	else 
		this.setLimitY(y_elemB);
}



/**
 * Searchs a match between some item of the array and the 'this' message
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method foundInArray
 * @return {Boolean} If the message is inside array 
 */
Message.prototype.foundInArray = function (array){

	for(var i=array.length; i--; ){
		if(array[i] == this)
			return true;
	}
	return false;
}



/**
 * Notify to the object Message that a change has 
 * been produced over some of your components o nodes
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method notifyChange
 */
Message.prototype.notifyChange = function( ) {

  var i;
  var nodes = (this._elemA._diagram) ? this._elemA._diagram._nodes : [];

	//Call to base method
  Message.base.notifyChange.call( this );

	//Update the length of the life line exist in the diagram
	for(i=0; i< nodes.length; i++){

		/*
			The length of the a node os the diagram is updated if 
			the node is a life line that not has the 'delete' attribute
			to true, if the node is a time interval or if the lifeline 
			has the 'delete' attribute to true, but the lifeline match
			with the elemA or elemB of the 'this' message.
		*/
		if( ((nodes[i].getType() == 'UMLLifeline') && !(nodes[i]._delete) ) || 
				((nodes[i].getType() == 'UMLLifeline') && (nodes[i]._delete) && ((nodes[i] == this._elemA) || (nodes[i] == this._elemB)) ) ||
				(nodes[i].getType() == 'TimeInterval') ){
			 nodes[i].updateLength();
		}
	}
}



/**
 * Remove the Message and all elements that are 
 * meaningless without the existence of this.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method remove
 *
 */
Message.prototype.remove = function() {

	//Call to method of base class 
  Message.base.remove.call( this );

	//If the relation is a deletemessage, the delete attribute is setting to the initial value	
  if( this instanceof DeleteMessage ) {
	this._elemB.setDelete( 0 );
  }
  
	//Removes the objet related with the relation
  if( this._objA ) {
    this._objA.remove();
  }
  
  if( this._objB ) {
    this._objB.remove();
  }

  this.notifyChange();
}



/**
 * Set the object found under the first point of Message
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setObjA
 * @param {TimeInterval} obj object of the first point of Message
 */

Message.prototype.setObjA = function( obj ) {
  this._objA = obj;

	//Set this message as object's message
  this._objA.setMessage(this);

	//Updates objects
  this.updateObjects();
}


/**
 * Set the object found under the second point of Message
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setObjB
 * @param {TimeInterval} obj object of the second point of Message
 */
Message.prototype.setObjB = function( obj ) {
  this._objB = obj;

	//Set this message as object's message
  this._objB.setMessage(this);

	//Updates objects
  this.updateObjects();
}


/**
 * Check a reference to the diagram that it belongs
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setDiagram
 * @param {Diagram} dia diagram to which the Message belongs
 */

Message.prototype.setDiagram = function( dia ) {

	//Call the class base method
  Message.base.setDiagram.call( this, dia );

	//Adds objects to the diagram
  if( this._objA ) 
    dia._addNode( this._objA );

  if( this._objB )
    dia._addNode( this._objB );
}


/**
 * Update the positions of the objects
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method updateObjects
 *
 */
Message.prototype.updateObjects = function() {

	//Sets the position of the object A 
  if( this._objA ) {
    this._objA.setPosition( this._points[0].getX() - this._objA.getWidth()/2, this._points[0].getY() );
  }

	//Sets the position of the object B
  if( this._objB ) {

		//If is a message to self
    if( this._elemA == this._elemB){
			this._objB.setPosition( this._points[3].getX() - this._objB.getWidth()/2, this._points[3].getY() );
    } else {
			this._objB.setPosition( this._points[1].getX() - this._objB.getWidth()/2, this._points[1].getY() );
    }
  }
}


/**
 * Resets the prex/prey atributtes of message's objects
 *
 *
 * @author Rafael Molina Linares
 * @update 27/09/2011
 *
 * @method resetMovementObjects
 *
 */
Message.prototype.resetMovementObjects = function() {

	if(this._objA)
		this._objA.resetMovement();
	if(this._objB)
		this._objB.resetMovement();
}



/**
 * Set the components of the Message
 *
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method _updateComponents
 *
 */
Message.prototype._updateComponents = function() {

  if( ! ( this._elemA && this._elemB ) ) {
    return;
  }
  
  var ax = this._points[0].getX();
  var ay = this._points[0].getY();
  var bx = this._points[1].getX();
  var by = this._points[1].getY();

	//If the message is a relation to self
  if(this._elemA == this._elemB && this._points.length == 4){
	  bx = this._points[2].getX();
	  by = this._points[2].getY();
  }

	//Calculates the half coordinates
  var cx = (ax + bx ) / 2 ;
  var cy = (ay + by ) / 2 ;

	//Sets the coordinates of the message's name
  if( this._name ) { 
    if(this._elemA == this._elemB){
      this._name.setCoordinates( bx, cy - this._name.getHeight()/2 );
    } else {
			this._name.setCoordinates( cx - this._name.getWidth() / 2, cy - this._name.getHeight() );
    }
  }

	//Sets the coordinates of the message's stereotype
  if( this._stereotype ) {  

    if( this._name ) {
			if(this._elemA == this._elemB){
      	this._stereotype.setCoordinates( bx, cy - this._stereotype.getHeight() - this._name.getHeight()/2 );
			} else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth()/2, cy - this._stereotype.getHeight() - this._name.getHeight() );
			}
    } else {
			if(this._elemA == this._elemB){
      	this._stereotype.setCoordinates( bx, cy - (this._stereotype.getHeight())/2 );
			} else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth()/2, cy - this._stereotype.getHeight() );
			}
    }   
  
    if( this._stereotype instanceof SuperComponent ) {
      this._stereotype.updateComponents();
    }  
  }  
}


/**
 * It's draw the line of relation
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of draw
 */
Message.prototype.drawShape = function( context ) {
  if( !( this._selectedPoint && this._selected == 0 || this._selected == this._points.length -1 ) ) {
    this._calculateLineEnds(0);
  }
  
  context.save();
  context.lineWidth = 2;
  context.strokeStyle = RelationStyle.shape_color;
  
  context.beginPath();
  context.moveTo( this._points[0].pixelX(), this._points[0].pixelY() );
  
  var i;
  for( var i = 1; i < this._points.length; i++ ) {
    context.lineTo( this._points[i].pixelX(), this._points[i].pixelY() );
  }
  
  context.stroke();
  context.restore();
}

/**
 * Get the object found under the first point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getObjA
 * @return {Element} object of the first point of Message
 */

Message.prototype.getObjA = function() {
  return this._objA;
}




/**
 * Get the object found under the second point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getObjB
 * @param {Element} object of the second point of Message
 */

Message.prototype.getObjB = function() {
  return this._objB;
}