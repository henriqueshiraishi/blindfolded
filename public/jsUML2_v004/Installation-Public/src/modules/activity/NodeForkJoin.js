/**
 ** MODULE NAME: 
 **	  NodeForkJoin.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the fork/join node of the activity diagram of UML 2.
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



/**
 * NodeForkJoin class constructor, creates a fork or join node in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 12/9/2011
 *
 * @class NodeForkJooin
 * @extends Rectangular
 * @param  {Number} _quadrant Indicates the orientation of the node(vertical/horizontal)
 *															- 1: horizontal orientation
 *															- 2: vertical orientation
 */
var NodeForkJoin = function( params ) {
	params = params || {};

	NodeForkJoin.baseConstructor.call(this,params);

	//horizontal orientation by default
	this._quadrant = 1;	
}
JSFun.extend(NodeForkJoin,Rectangular);



/**
 * Generates a XML node with the node's information
 *
 * @author Rafael Molina Linares
 * @update 12/9/2011
 *
 * @method getElementXML
 * @param  {DOMNode} parent Node parent of xml tree that is generated
 * @return {DOMNode} XML node with object's information
 */
NodeForkJoin.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );

	//Saves the attributes of the composite state in the xml node
  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() );
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() );
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  xmlnode.setAttribute( 'quadrant', this._quadrant );

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
 * Receives a xml node with node's information and get it back 
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Xml node with the node's information
 */
NodeForkJoin.prototype.setElementXML = function( xmlnode ) {
  
	//Get the information back about the attributes of the composite state
  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();
  
  this._width = parseInt( xmlnode.getAttribute( 'width' ) ) ;
  this._height = parseInt( xmlnode.getAttribute( 'height' ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
	
	if(parseInt(xmlnode.getAttribute( 'quadrant' )) != this._quadrant){
		this._minWidth = 5;
		this._minHeight = 50;
	  this._quadrant = parseInt(xmlnode.getAttribute( 'quadrant' ));
	} 

	//Get the information back about the components of the composite state
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


/**
 * Sets quadrant of node and indicates the vertical or horizontal position of this
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method setQuadrant
 * @param  {DOMNode} quadrant Quadrant that indicates the horizontal or vertical position of node
 *
 */
NodeForkJoin.prototype.setQuadrant = function(quadrant){

	if(this._quadrant != quadrant){

		var auxHeight = this._height;
		var auxWidth = this._width;	
		var auxMinHeight = this._minHeight;
		var auxMinWidth = this._minWidth;	

		//Exchanges the values of the width and height
		this.setMinHeight( auxMinWidth );	
		this.setMinWidth( auxMinHeight );	
		this.setHeight( auxWidth );
		this.setWidth( auxHeight );

		//Exchanges position of the relations 
		for(var i=this._relations.length; i--;)
			this._relations[i].exchangePosition();

		this._quadrant = quadrant;
	}
}

/**
 * Perfoms the necessary actions because by the mouse's 
 * drag by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of node
 * @param {Number} y Coordinate y of node
 *
 */
NodeForkJoin.prototype.drag = function( x, y ) {	

  if( this._resizing ) {

		var cpx = this._x;
		var cpy = this._y;
	
		// fourth quadrant
		if( x > cpx && y > cpy ) {

			//Second half of quadrant
			if(Math.abs(x - cpx) > Math.abs(y - cpy)){

				if(this._quadrant != 1){
					//is established the position horizontal to the node
					this.setQuadrant(1);
				} else {

					//If the position horizontal already is established, the width is modified
					var px = x - this._x;
					px = Math.round( px );
					px = px - px % 5;
   
					this.setWidth( px );
				}
	    } else {	

				//First half of quadrant

				if(this._quadrant != 2){
					//is established the position vertical to the node		
					this.setQuadrant(2);
				}	else {

					//If the position vertical already is established, the height is modified
					var py = y - this._y;
					py = Math.round( py );
					py = py - py % 5;
				
					this.setHeight( py );
				}				
	    }
	  } else {		//Other than the fourth quadrant

			//if the orientation of the node is horizontal, this width is established
			if(this._quadrant == 1){

				var px = x - this._x;
				px = Math.round( px );
				px = px - px % 5;
 
				this.setWidth( px );
			}
			else {

				//if the orientation of the node is horizontal, this width is established
				var py = y - this._y;
				py = Math.round( py );
				py = py - py % 5;
			
				this.setHeight( py );
			}
		}
	
	} else if ( this._selected ) {

    var px = x - this._relx;
    var py = y - this._rely;
    
    px = Math.round( px );
    px = px - px % 5;
    py = Math.round( py );
    py = py - py % 5;
      
    this.setPosition( px, py );
    
    this._moved = true;
  } 
}


/**
 * Update your minimal width or height (according to your orientation) 
 * that the node can have because of the position occupied by their relations
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @method updateLimitSize
 * @private
 *
 */
NodeForkJoin.prototype.updateLimitSize = function(){
	
	var i;
	var rel = this._relations;
	var max = 40;

	if(this._quadrant == 1){	//horizontal orientation

		//Calcultes the minimum width that the node must have according to the position of its relations
		for(i=rel.length;i--;)
			if(rel[i]._x > max)
				max = rel[i]._x;

		//Sets the minimum width
		this.setMinWidth(max + 10);
	}	else {

		//Calcultes the minimum height that the node must have according to the position of its relations
		for(i=rel.length;i--;)
			if(rel[i]._y > max)
				max = rel[i]._y;

		//Sets the minimum height
		this.setMinHeight(max + 10);
	}		
}


/**
 * Removes the relation that is indicated like parameter.
 * The node must remove all records of it.
 *
 * @author Rafael Molina Linares
 * @update 12/09/2011
 *
 * @method notifyDeleted
 * @return {Relation} Relation that has been removed
 */
NodeForkJoin.prototype.notifyDeleted = function( rel ) {
  var i;
  
	//Delete the relation of the relations's array
  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
    }
  }

	/*
		Updates the minimum height/width that the node must have
	  (accordint to the vertical/horizontal orientation)
	*/
	this.updateLimitSize();
  
}

