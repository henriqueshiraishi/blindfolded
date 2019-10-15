/**
 ** MODULE NAME: 
 **	  CreateMessage.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the create message of the sequence diagrams of UML 2.
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
 * Create Message class constructor, creates a create message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class CreateMessage
 * @extends Message
 *
 */
var CreateMessage = function( params ) {

  params = params || {};
  CreateMessage.baseConstructor.call( this, params );  
}
JSFun.extend( CreateMessage, Message );


/**
 * A xml node is received with the node information and such information is retrieved
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class setElementXML
 * @param  {DOMNode} xmlnode Xml node with the information about the Message element
 * @param  {array} ids Vector with the references to the objects of the diagram
 */
CreateMessage.prototype.setElementXML = function( xmlnode, ids ) {

	//Call to base method
  CreateMessage.base.setElementXML.call( this, xmlnode, ids );

	//Set the position that occupies the create message
  this._elemB.setCreate(this._y);

	//Update the position of related elements
	this._elemA.updatePosition();
	this._elemB.updatePosition();
}



/**
 * Defines the elements related with the relation.
 * This method is used when the elements hasn't been indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the new elements have been asigned to the relation
 */

CreateMessage.prototype.setElements = function( elemA, elemB ) {

	//Call to the base class 
  CreateMessage.base.setElements.call( this, elemA, elemB )

	var i;

	//Updates the B element of the relation
	if(this._elemB)
		this._elemB.updatePosition();

	//Updates position of all B element of each createmessage moves
	var createMessages = this.descendantsCreateMessages();
	for(i=0;i<createMessages.length;i++)
		createMessages[i].updatePosition();
}


/**
 * Removes the create message and all related elements that 
 * make no sense without its existence
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drag
 * @param {Number} x Coordinate of the new position
 * @param {Number} y Coordinate of the new position
 */


CreateMessage.prototype.remove = function() {

	//Call to the base class 
  CreateMessage.base.remove.call( this );

  //Put the y coordinate of the lifeline to the position that had before of the creation of create message
  this._elemB.setPosition(this._elemB.getX() , 70); 

	//The element updates your position
  this._elemB.updatePosition();

	//Updates the create attribute
  this._elemB.setCreate( 0 );  

	//Update height of the related lifelines   
  if( this._elemA ) {
    this._elemA.updateLength();
  }
  
  if( this._elemB ) {
    this._elemB.updateLength();
  }

  //Set the limitY of the relations to the established limit in the A element of the removed relation
	var rel = this._elemB._relations;
  for(var i=0;i< rel.length;i++){
		if( rel[i]._elemA._y > rel[i]._elemB._y || rel[i] instanceof CreateMessage)
			rel[i].setLimitY(rel[i]._elemA.getY() + rel[i]._elemA._heightSmallRectangle + 5); 
		else
			rel[i].setLimitY(rel[i]._elemB.getY() + rel[i]._elemB._heightSmallRectangle + 5); 
  }
}



/**
 * Performs the actions necessaries when the user 
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

CreateMessage.prototype.drop = function( x, y ) {

	//Call to base method
  CreateMessage.base.drop.call(this, x, y);

	//Updates the B element of the relation
  this._elemB.updatePosition();

	//Updates position of all B element of each createmessage moves
	var createMessages = this.descendantsCreateMessages();
	for(var i=0;i<createMessages.length;i++)
		createMessages[i].updatePosition();

}





/**
 * Calculates the final points of the create message, so such the final 
 * of messages related with the create message
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _calculateLineEnds
 * @private
 * @param {Number} updateObj If the final points of the related messages of the create message are calculated
 *															- 0: the final points of the related messages aren't updated by the _calculateLineEnds method call
 *															- 1: the finals points of the related messages(so such the objects's movement and the y limit of the message) are updated
 *															- 2: the finals points of the related messages are updated
 */


CreateMessage.prototype._calculateLineEnds = function( updateObj ) { 

	//Initiliaze parameter of method
	var updateObj = (updateObj == 0 || updateObj) ? updateObj : 1;  

	var relObjA;
	var relObjB;

	//If the method is called because of the movement of one of its points, or some of its elements aren't defined, it is left of the method
  if( !(!this._selectedPoint && this._elemA && this._elemB) || this._elemA == this._elemB) 
		return;

  //Sort the array of relations so that createMessages update your position in the last time
  var rel = this._sortRelByCreateMessages(this._elemB._relations,1); 
	var createMessages = [];
	var i,j,k;

  //the y coordinate of the Message is increased if it occupies the lifeline rectangle
  if( (this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle)) )
	  this._y = this._elemA.getY() + this._heightSmallRectangle;

	//Updates the limitY of the create message
	if(updateObj == 1){	
		this.updateLimitY();
		if(this._y < this._limitY)
			this._y = this._limitY;
	}

  //Set the points of the CreateMessage element
  this._points[0].setPoint( this._elemA.getLineX((this._elemA._x > this._elemB._x) ? -1 : 1), this._y );

  if(this._elemB.getX() > this._elemA.getX())
		this._points[1].setPoint( this._elemB.getX(), this._y );
  else
		this._points[1].setPoint( this._elemB.getX() + this._elemB.getWidth(), this._y );


  //Update the position of the lifeline B so that the create message is found in the half of the lifeline's rectangle
	this._elemB._y = this._y - this._elemB._heightSmallRectangle/2;


	if(updateObj){

		//Sets that movement of the create message has already been done
		if(updateObj == 1)
			this._moved = true;

		//Set the position of the relations related to the CreateMessage element
		for(i=0;i<rel.length;i++){

			//If rel[i] hasn't yet been moved, rel[i] updates your position
			if( !rel[i]._moved ){

				//Updated the position and 'y' limit of the relation
				rel[i]._y = rel[i]._y + this._y - this._elemB.getCreate();

				//Set the y limit of the relation
				rel[i].setLimitY(this._y + this._elemB._heightSmallRectangle/2 + 5);
				if(rel[i]._limitY > rel[i]._y)
					rel[i]._y = rel[i]._limitY;

				//Set that the movement of the message has been done
				rel[i]._moved = true;

				//Update the end points of the message
				rel[i]._calculateLineEnds((!updateObj) ? updateObj : 2);
				rel[i]._updateComponents();	

				//Update the '_delete' attribute if the rel[i] is a deletemessage, and your position has been modified
				if(rel[i] instanceof DeleteMessage)
					rel[i]._elemB.setDelete(rel[i]._y);
			}
		}

		//Set the new position of the create message in the 'create' attribute
		this._elemB.setCreate(this._y);


		//When a new create message is created, the messages found above this must be taken under this
		if(this._elemB.getCreate() != 0){

			for(i=0;i<rel.length;i++){
				if(rel[i]._y < this._elemB.getCreate()  && !(rel[i]._elemA instanceof TimeInterval) && !(rel[i]._elemB instanceof TimeInterval)){

					var y = rel[i]._y;

					//Updated the position and 'y' limit of the relation
					rel[i]._points[0].setY( y + this._elemB.getCreate() - this._elemA.getY() );
					rel[i]._points[1].setY( y + this._elemB.getCreate() - this._elemA.getY() );
					rel[i]._y = y + this._elemB.getCreate() - this._elemA.getY();

					//Updates the y limit
					rel[i].setLimitY(this._y + this._elemB._heightSmallRectangle/2 + 5 );
					if(rel[i]._limitY > rel[i]._y)
						rel[i]._y = rel[i]._limitY;

					//Updates components, objects and notifies changes in the relation
					rel[i]._updateComponents();	
					rel[i].updateObjects();
					rel[i].notifyChange();			
				}
			}	
		}   

		/*
			If this is the first call to the method _calculateLineEnds of the 
			createMessage and isn't any recursive call of this method, it is
			updates the objects, the upper y limit and the _moved atributte 
			of the this message(and its related messages).
		*/
		if(updateObj == 1){	

			//Calculates the descendant messages of the current create message
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

    this.updateObjects();
	}

}


/**
 * Searchs all descendant messages of the current message and stores 
 * them in an array that will be returned, between the descendant messages
 * take in account this create message.
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantMessages
 * @params {Array} descendant_messages Optional parameter that gives an array the descendant messages 
 * @return {Array} An array with the descendant messages of the message(included this message)
 */
CreateMessage.prototype.descendantMessages = function ( descendant_messages) {

	//Initializes the value of the descendant_messages(if the parameter hasn't been passed to the method)
	var descendant_messages =  descendant_messages || [];

	//Includes the 'this' message, if isn't included
	if(!this.foundInArray(descendant_messages))
		descendant_messages.push(this);
		
	//Includes the messages contained in the element B of the this message
	if(this._elemB){
		for(var i=0;i<this._elemB._relations.length;i++)
			if(this._elemB._relations[i] != this)
				descendant_messages = this._elemB._relations[i].descendantMessages(descendant_messages);
	}

	return descendant_messages;
}


/**
 * Perfoms the actions necessaries because by the mouse's 
 * drag that the user makes
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
CreateMessage.prototype.drag = function( x, y ) {

  if( this._selectedLine ) {

    var i;
		//Ensures that the create message isn't above upper y limit 
    if( y > this._limitY ) {
      this._y = y;
    } else {
      this._y = this._limitY;
    }

    this._moved = true;
    
  } else if( this._selectedPoint ) {
			//Selects a point and displaces it not is allowed
  }
}


/**
 * Searchs all descendant createmessages and stores 
 * them in an array that will be returned
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantsCreateMessages
 * @return {Array} An array with the B elements of descendant createmessages
 */
CreateMessage.prototype.descendantsCreateMessages = function () {

	if(!this._elemB)
		return [];
	
	var rel = this._elemB._relations;
	var i;
	var j;
	var createMessages = [];
	var auxCreateMessages = [];
	var found = false;

	//All relations of the element B of the create message is around in search of descendant create messages
	for( i=0;i<rel.length;i++){

		/*
			If rel[i] is a create message that has as element A to the element
		  B of the current create message and as element B to other element
			else of the element A of the curretn create message
		*/
		if((rel[i] instanceof CreateMessage)  && (rel[i]._elemA == this._elemB) && (rel[i]._elemA != rel[i]._elemB)){

			//Searching if the element B of rel[i] has already been added to the descendant create messages array previously
			found = false;
			for( j=0; j< createMessages.length && !found; j++){
				if(createMessages[j] == rel[i]._elemB)
					found = true;
			}

			/*
				If the element B of rel[i] hasn't been found in the descendant create messages array, 
				rel[i] is added to this array and descendant createmessages of this are searched
			*/
			if(!found){

				//Adding the element B of rel[i] 
				createMessages.push(rel[i]._elemB);		
		
				//Searching descendant create messages between the relations of the element B of rel[i]
				auxCreateMessages = rel[i].descendantsCreateMessages();
				for(j=0; j< auxCreateMessages.length; j++)
					createMessages.push(auxCreateMessages[j]);
			}
		} else {

			
			//It is checked if some object of rel[i] has a descendant create message
			if(rel[i]._elemA == this)
				var relObj = (rel[i]._objA) ? rel[i]._objA._relations : [];
			else 
				var relObj = (rel[i]._objB) ? rel[i]._objB._relations : [];
 

			for(j=0;j<relObj.length;j++)
				if((relObj[j] instanceof CreateMessage)){

					//Adds create message to the array of descendant create messages
					createMessages.push(relObj[j]._elemB);		

					/*
						Descendant create messages of the create message relObj[j] are searched, and 
						if is found a descendant create message, is added to the array of descendant 
						create messages
					*/
					auxCreateMessages = relObj[j].descendantsCreateMessages();
					for(var k=0; k< auxCreateMessages.length; k++)
						createMessages.push(auxCreateMessages[k]);
				}

		}
	}

	return createMessages;
}




