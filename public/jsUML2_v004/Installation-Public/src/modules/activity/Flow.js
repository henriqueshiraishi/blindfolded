/**
 ** MODULE NAME: 
 **	  Component.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the Flow element of the activity diagram of UML 2.
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



/**
 * Flow class constructor, creates a flow in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @class Flow
 * @extends Relation
 * @param {Number} y Distance from the top left corner of the Fork/Join node to the y position occupied by the point of the flow in this.
 * @param {Number} x Distance from the top left corner of the Fork/Join node to the x position occupied by the point of the flow in this.
 * @param {Boolean} setElementXML Tells us if the instance of a object flow has been done because of the import of a diagram
 *
 */
var Flow = function( params ) {
	params = params || {};

	/*
		Tells us in that position is found the point of the Flow if 
		this flow has a fork/join node. If the fork/join node has a
		vertical orientation, the parameter y tell us the position 
		where is found the point of the flow(and the value of x will 
		be -1). If has a horizontal orientation, will the parameter x 
		tell us the position of the point of the flow (and the value
		of y will be -1).
	*/
	this._y = params.y || -1;	
	this._x = params.x || -1;	

	//Call to base constructor
	Flow.baseConstructor.call(this,params);

	//Adds the components
	if(params.setElementXml){
	} else{
		this._addComponents();
	}
}
JSFun.extend(Flow,Relation);



/**
 * Receives a xml node with the information of the relation and get it back
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Xml node with the information of the relation
 * @param {Array} ids Array with the references to the objects of diagram
 */
Flow.prototype.setElementXML = function( xmlnode, ids ) {

	//Retrieves the properties of the flow
  var idElemA = xmlnode.getAttribute( 'side_A' );
  var idElemB = xmlnode.getAttribute( 'side_B' );
  
  this.setElements( ids[ idElemA ], ids[ idElemB ] );
  this._y = parseInt( xmlnode.getAttribute( 'y' ) );
	this._x = parseInt( xmlnode.getAttribute( 'x' ) );
  
  
	//Retrieves the information about the points of the flow
  var i;
  var childs = xmlnode.childNodes;
  
  var p = 0;
  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'point' ) {
      this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                   parseInt( childs[i].getAttribute( 'y' ) )
                                  );
      p++;
    }
  }

	//Add components to the flow
	this._addComponents();
  
	//Retrieves the information about the components of the flow
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
  
	//Updates components
  this._updateComponents();
}



/**
 * Adds a component to the flow according to whether the A element is a merge or join node or not 
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method addComponent
 * @private
 */
Flow.prototype._addComponents = function(){

  this.addComponentStereotype(); 
	this.setComponentName('');
}



/**
 * Sets a new name to the relation, and adds like component to the flow
 * 
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setComponentName
 * @param {String} newName New name to the relation
 */

Flow.prototype.setComponentName = function( newName ) {
  if( !this._name ) {

		//If the flow hasn't name, it is added taking in account the elemen A of this
		if(this._elemA.getType() == 'UMLDecision_MergeNode')		
	    this._name = new GuardItem({ id: 'description', text: '[]'});
		else
	    this._name = new TextArea({ id: 'name_node', text: '' });

    this._addComponent( this._name );
  } else {

		//If the name already exists, the new name is established
    this._name.setText( newName );
  }
}



/**
 * Sets a new name to the relation, and adds like component to the flow
 * 
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method updateName
 * @param {String} newName New name to the relation
 */
Flow.prototype.updateName = function(){

	//Ensures that the flow has a node
	if(!this._name)
		return;

	/*
		If the element A of the flow isn't a decisioon/Merge node 
		and the type of component associated to the element A is a GuardItem.
		Then, the type of component for the name has to be change to a  type TextArea.
	*/
	if(this._elemA.getType() != 'UMLDecision_MergeNode' && this._name instanceof GuardItem){

		var text = this._name._text.join('\n');

		//Removes the characters '[' and ']' to the text
		text = text.substring(1,text.length-1);

		//Remove the component of the name and creates a component to the name again with the text without brackets
		this._delComponent(this._name);
		this._name = new TextArea({ id: 'name_node', text: text });				
		this._addComponent(this._name);
	}	else if(this._elemA.getType() == 'UMLDecision_MergeNode' && !(this._name instanceof GuardItem)){
		
		/*
			If the element A of the flow is a decisioon/Merge node 
			and the type of component associated to the element A isn't a GuardItem.
			Then, the type of component for the name has to be change to a  type GuardItem.
		*/

		//Adds to the text the characters '[' and ']' 
		var text = '[' + this._name._text.join('\n') + ']';

		//Remove the component of the name and creates a component to the name 
		this._delComponent(this._name);
		this._name = new GuardItem({ id: 'description', text: text });  
		this._addComponent(this._name);
	}				
}



/**
 * Calculates the final points of the Flow are in contact with the nodes
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @method _calculateLineEnds
 * @private
 *
 */
Flow.prototype._calculateLineEnds = function() {

 	/*
		If some element of the flow is a fork/join node, the final points are
		calculated by this method. In other case, the final points are 
		calculated by the base method	
	*/
  if(this._elemA.getType() == 'UMLFork_JoinNode' || this._elemB.getType() == 'UMLFork_JoinNode'){

		//Central points of elements
		var cpA  = this._elemA.getCentralPoint();
		var cpB  = this._elemB.getCentralPoint();
	  var npoints = this._points.length;

		var updateOfPointAfter = false;

		if( !this._selectedPoint && this._elemA && this._elemB ) {

			//If exists more of two points
		  if( npoints > 2 ) {

				//If the element A is a fork/join node
				if(this._elemA.getType() == 'UMLFork_JoinNode'){

					if(this._x != -1){
						//If the fork or join node has a vertical orientation
						this._points[0].setPoint( this._elemA.getLink( this._points[1]._x, this._points[1]._y , this._elemA._x + this._x, cpA._y ) );
					}	else {
					  //If the fork or join node has a horizontal orientation
						this._points[0].setPoint( this._elemA.getLink( this._points[1]._x, this._points[1]._y , cpA._x, this._elemA._y + this._y ) );
					}
		
					//Updates the minimum size that can have the fork/join node
					this._elemA.updateLimitSize();
				}
				else
					this._points[0] = this._elemA.getLinkCentered( this._points[1] );

				//If the element B is a fork/join node
				if(this._elemB.getType() == 'UMLFork_JoinNode'){

					if(this._x != -1){
						//If the fork or join node has a vertical orientation
						this._points[npoints - 1].setPoint( this._elemB.getLink( this._points[ npoints - 2 ]._x, this._points[ npoints - 2 ]._y ,this._elemB._x + this._x, cpB._y ) );
					} else{
					  //If the fork or join node has a horizontal orientation
						this._points[npoints - 1].setPoint( this._elemB.getLink( this._points[ npoints - 2 ]._x, this._points[ npoints - 2 ]._y , cpB._x, this._elemB._y + this._y ) );
					}

					//Updates the minimum size that can have the fork/join node
					this._elemB.updateLimitSize();
				}
				else{
					this._points[npoints - 1] = this._elemB.getLinkCentered( this._points[npoints - 2] );
				}

		    
		  } else {	//the flow just has two points


				if(this._elemA.getType() == 'UMLFork_JoinNode'){

					if(this._x != -1){
					  //If the fork or join node has a vertical orientation
						this._points[0].setPoint( this._elemA.getLink( cpB._x, cpB._y , this._elemA._x + this._x, cpA._y ) );
					} else {
					  //If the fork or join node has a horizontal orientation
						this._points[0].setPoint( this._elemA.getLink( cpB._x, cpB._y , cpA._x, this._elemA._y + this._y ) );
					}

					//Updates the minimum size that can have the fork/join node
					this._elemA.updateLimitSize();
				}
				else{
					updateOfPointAfter = true;
				}

				if(this._elemB.getType() == 'UMLFork_JoinNode'){
					if(this._x != -1){
					  //If the fork or join node has a vertical orientation
						this._points[1].setPoint( this._elemB.getLink( cpA._x, cpA._y ,this._elemB._x + this._x, cpB._y ) );
					}	else {
					  //If the fork or join node has a horizontal orientation
						this._points[1].setPoint( this._elemB.getLink( cpA._x, cpA._y , cpB._x, this._elemB._y + this._y ) );
					}

					//Updates the minimum size that can have the fork/join node
					this._elemB.updateLimitSize();
				}
				else{
					this._points[1] = this._elemB.getLinkCentered( this._points[0].getX(), this._points[0].getY());
				}

				if(updateOfPointAfter)
					this._points[0] = this._elemA.getLinkCentered( this._points[1].getX(), this._points[1].getY());
			}
		}
  }
  else
		Flow.base._calculateLineEnds.call(this);
}


/**
 * Perfom the neccesary actions to get a mouse movement to the given position by the x,y attributes 
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */

Flow.prototype.drag = function( x, y ) {
	//If some of its elements is a fork/join node
	if(this._elemA.getType() == 'UMLFork_JoinNode' || this._elemB.getType() == 'UMLFork_JoinNode'){

		if( this._selectedLine ) {
		  this._points[ this._selected + 1 ].setPoint(x, y);
		  this._moved = true;
		  
		} else if( this._selectedPoint ) {
		  this._points[ this._selected ].setPoint(x, y);
		  this._moved = true;
		}  
	}
	else {
		//In other case, it perform the same actions of the relation class
		Flow.base.drag.call(this, x, y);
	}
}


/**
 * Performs the actions necessaries when the user 
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update  12/09/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Flow.prototype.drop = function( x, y ) {

  if( this._moved ) {
    this._checkForNewNodes( x, y );

		//If some of the element related with the flow is a fork or join node, the _x and _y attributes are updated
		var elem;
		var npoints = this._points.length;
		if(this._elemA.getType() == 'UMLFork_JoinNode' && this._selected == 0 )
			elem = this._elemA;
		else if ( this._elemB.getType() == 'UMLFork_JoinNode' && this._selected == npoints - 1)
			elem = this._elemB;
	
		if(elem){
			if(elem._quadrant == 1){	

				/*
					The element has a horizontal orientation, and therefore is used the x 
					attribute to saved the distance from the upper left border to the x 
					coordinate that occupied the point in the element.
				*/
				this._x = x - elem._x;
				this._x = (this._x >= 0) ? this._x : 1;
			}
			else {  

				/*
					The element has a vertical orientation, and therefore is used the y 
					attribute to saved the distance from the upper left border to the y 
					coordinate that occupied the point in the element.
				*/
				this._y = y - elem._y;
				this._y = (this._y >= 0) ? this._y : 1;
			}
	
		}
    
  } else if( this._selectedBefore ) {
    this._selectComponent( x, y );
  }


  this._selectedLine = false;
  this._selectedPoint = false;
  this._moved = false;

  this._delUselessPoints();
  this.notifyChange();
}


/**
 * Exchange the value of the _x and _y attributes of the flow.
 * This method is called because of a orientation's change in the fork or join node.
 *
 * @author Rafael Molina Linares
 * @update  12/09/2011
 *
 * @method exchangePosition
 *
 */
Flow.prototype.exchangePosition = function(){

	var aux;
	aux = this._x;
	this._x = this._y;
	this._y = aux;
	
	delete aux;
}



/**
 * Checks if exists some element in the given point, and in this case,  
 * is added to the relation, after of remove the previous element
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of element to check
 * @param {Number} y Coordinate y of element to check
 */
Flow.prototype._checkForNewNodes = function( x, y ) {

	//If has been selected the first or last point of the relation
  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

		//Gets the element that is in x,y coordinates
    var newElem = this._diagram.reassignRelationTo( this, x, y );

		//If the new element is another than the current element
    if( newElem != this ) {

      if( this._selected == 0 ) {

				//If a element has been found in the x,y coordinate, and is checked that this element be not a fork/join node if the B element is it
				if( newElem && !(newElem.getType() == 'UMLFork_JoinNode' && this._elemB.getType() == 'UMLFork_JoinNode' )){

					var beforeElemA = this._elemA;
	        this.setElementA( newElem );  

					//Size of before element is updated
					if(beforeElemA.getType() == 'UMLFork_JoinNode')
						beforeElemA.updateLimitSize();      

					//Updates the name of the flow(if necessary)
					this.updateName();
				}
      } else {

				//If a element has been found in the x,y coordinate ,and is checked that this element be not a fork or join node if the A element is it
				if( newElem && !(newElem.getType() == 'UMLFork_JoinNode' && this._elemA.getType() == 'UMLFork_JoinNode' )){

					var beforeElemB = this._elemB;
	        this.setElementB( newElem );  

					//Size of before element is updated
					if(beforeElemB.getType() == 'UMLFork_JoinNode')
						beforeElemB.updateLimitSize();  
				}
      }
    }
  }
}



/**
 * Return a xml node with information about the relation
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @class getElementXML
 * @param  {DOMNode} parent Parent of the relation
 * @return {DOMNode} xml node with information about the object
 */
Flow.prototype.getElementXML = function( parent ) {

	//Calls to base method
  var xmlnode = Flow.base.getElementXML.call( this, parent );
  
	//Adds information about the attributes to the xml node
  xmlnode.setAttribute( 'y', this._y );
  xmlnode.setAttribute( 'x', this._x );
  
  return xmlnode;
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Flow.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Flow.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
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
Flow.prototype.getName = function( ){
	return this._components[1].getValue();
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

Flow.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
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
Flow.prototype.getNameAsComponent = function( ){
	return this._components[1];
}