/**
 ** MODULE NAME: 
 **	  Node.js
 **
 ** DESCRIPTION:
 **   Represents a generic element with properties and relationships in the diagram
 **
 ** DEVELOPED BY:
 **	    Alejandro Arrabal Hidalgo (AAH)
 **     Martin Vega-Leal Ordonez (MVL)
 ** 	Rafael Molina Linares    (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	    002 - Oct 2012 - AAH - Third version release
 ** 	001 - Sep 2011 - RML - Second version release
 ** 	000 - Feb 2011 - MVL - First version release
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

//= require <Point>
//= require <Element>
//= require <Component>
//= require <SuperComponent>
//= require <NodeFigure>



//Style for nodes
var NodeStyle = {
  shape_color: 'rgb( 0, 0, 0 )',
	control: ''
}


/**
 * Node class constructor, creates a node of a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Node
 * @extends Element
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
var Node = function( params ) {
  params = params || {};
  
  this._id = 0;
  this._type = 'untyped';
  
  //Position of node
  this._x = params.x || 0;
  this._y = params.y || 0;
  
  //Before position of node
  this._prex = this._x;
  this._prey = this._y;
  
  //Relative distance to the mouse's position
  this._relx = 0;
  this._rely = 0;
  
  //Size of the node
  this._width = 10;
  this._height = 10;
  this._minHeight = 5;
  this._minWidth = 5;

  //Flags of the node
  this._selected = false;
  this._selectedBefore = false;
  this._resizing = false;
  this._moved = false;
  
  //Properties of the node
  this._moveable = false;
  this._proportional = false;
  this._container = false;
  this._alone = false;
  
  //Related elements of the node
  this._figures = [];
  this._components = [];
  this._activeComponent = null;

  this._diagram = null;
  this._parent = null;

  this._nodeChilds = [];
  this._relationChilds = [];
  this._relations = [];

	//Menu of the node
  this._menu = [];  

	//Tag values of the node   
	this._tagValues = [];

	//Selected figure of the node
	this._selectedFigure = 0;

	/*
		Keeps information about the before component that store 
		the name of the node. It is used when the shown figure is changed by 
		another given by an object stereotype
	*/
	this._beforeNameComponent = null;

	//Visibility of the node
	this._visible = true;

	/*
		Saves the values of the node's size. It is used when the shown figure 
		is changed by another given by an object stereotype, and after, 
		the before values want to be recovered
	*/
	this._beforeHeight = 0;
	this._beforeWidth = 0;
}
JSFun.extend( Node, Element );


/**
 * Set the value true to the attribute 'alone' so that 
 * the node can not be contained within another container node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setAlone
 */

Node.prototype.setAlone = function() {
  this._alone = true;
}



/**
 * Return if the node can be contained within 
 * another container node or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isAlone
 * @return {Boolean} If the node can be contained within a container node
 */
Node.prototype.isAlone = function() {
  return this._alone;
}



/**
 * Assign to the node a number of id between a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {String} value Chain of id
 */
Node.prototype.setId = function( value ) {
  this._id = this.getType() + '_' + value;
}



/**
 * Returns the id of the node
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/	5/11/2013
 *
 * @method getId
 * @return {String} id's chain between the diagram
 */
Node.prototype.getId = function() {
  return this._diagram.getId()+':'+this._id;
}


/**
 * Assigns a type of the node, this type will be how to  
 * determine the name of the object's class
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value node's type, identifies the class that comes
 */
Node.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the node's type
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} type of the node
 */
Node.prototype.getType = function() {
  return this._type;
}



/**
 * Generates a XML node with the information of the node
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 28/11/2010							   /  19/09/2011			/ 30/08/2012
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
Node.prototype.getElementXML = function( parent ) {
	
  var xmlnode = parent.createElement( this.getType() );
	var tagValues = [];
  var i;

	/*
		If the selected figure is another than 0, the figure 0 is 
		established to recover the size(width/height) that 
		the node had before 
	*/
	if(this._selectedFigure){ 
	 	this.setSelectedFigure( 0 );
	}

  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() );
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() );
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  if(this.getLineColor() )xmlnode.setAttribute( 'lineColor', this.getLineColor() );
  if(this.getLineWidth())xmlnode.setAttribute( 'lineWidth', this.getLineWidth() );
  if(this.getFontColor())xmlnode.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontFamily())xmlnode.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontSize()) xmlnode.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle())xmlnode.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontWeight())xmlnode.setAttribute( 'fontWeight', this.getFontWeight() );


	//Get each tag value of the 
	for(i=0; i<this._tagValues.length; i++)
		tagValues.push(this._tagValues[i][0] + ':' + this._tagValues[i][1]);

  xmlnode.setAttribute( 'tagValues', tagValues );

//	if(this._stereotypeProperties)
//	  xmlnode.setAttribute( 'appliedStereotypes', this._stereotypeProperties._appliedStereotypes );

	//Saves the information about the components of the node
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }
     
	//Saves the information about the child nodes 
  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }

	//Saves the information about the child relations
  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }
  
  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares / Alejandro Arrabal Hidalgo 
 * @update 28/11/2010							   /  19/09/2011			/ 09/08/2012
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Xml node with the information of the node
 */
Node.prototype.setElementXML = function( xmlnode ) {

	//Retrieves the attributes of the node  
  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();
  
  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  if(xmlnode.getAttribute( 'lineColor' ))this.setLineColor( xmlnode.getAttribute( 'lineColor' )  );
  if(xmlnode.getAttribute( 'lineWidth' ))this.setLineWidth( parseInt(xmlnode.getAttribute( 'lineWidth' ) ));
  if(xmlnode.getAttribute( 'fontColor' ))this.setFontColor( xmlnode.getAttribute( 'fontColor' )  );
  if(xmlnode.getAttribute( 'fontFamily' ))this.setFontFamily( xmlnode.getAttribute( 'fontFamily' )  );
  if(xmlnode.getAttribute( 'fontSize' ))this.setFontSize( xmlnode.getAttribute( 'fontSize' )  );
  if(xmlnode.getAttribute( 'fontStyle' ))this.setFontStyle( xmlnode.getAttribute( 'fontStyle' )  );
  if(xmlnode.getAttribute( 'fontWeight' ))this.setFontWeight( xmlnode.getAttribute( 'fontWeight' )  );

	//Retrieve a chain with the value of the tag values
	var chainTagValues = xmlnode.getAttribute( 'tagValues' );
	var tagValues = [];
	var indexColon;

	/*
		Searchs the matchs with the character ',', that is 
		responsible for separating the various objects, and 
		stored each tag value in an array
	*/
	while(chainTagValues != ""){

		indexColon = chainTagValues.indexOf(',');
		if(indexColon == -1){

			tagValues.push(chainTagValues);
			chainTagValues = "";
		} else {

			tagValues.push(chainTagValues.substring(0,indexColon));
			chainTagValues = chainTagValues.substring(indexColon+1);
		}
	}

	//Sets the array of tag values of the node
	this.setTagValues(tagValues);

	//Retrieves the information about the node's components
  var i;
  var childs = xmlnode.childNodes;
  
  for( i = 0; i < childs.length; i++ ) {
      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
          this.updateComponents();
        }
      }
    }   
  this.notifyDraw();
}



/**
 * Modifies the value of a node's component, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component between of the node
 * @param {String} value Text that will be assigned to the component
 */
Node.prototype.setValue = function( id, value ) {
  var i;

  for( i in this._components ) {

    if( !( this._components[i] instanceof SuperComponent ) && this._components[i].getId() == id ) {

      this._components[i].setValue( value );      
      this.updateComponents();
      return true;    
    }
  }

  return false;
}



/**
 * Adds a value to a node's component, if exists, this 
 * component should be able to contain multiple values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addValue
 * @param {String} id Id of the component between of the node
 * @param {String} value Text that will be added to the component
 */
Node.prototype.addValue = function( id, value ) {
  var i;
  
  for( i in this._components ) {
    if( this._components[i] instanceof SuperComponent && this._components[i].getId() == id ) {
      this._components[i].addField( value );
      
      this.updateComponents();
      return true;    
    }
  }
  
  return false;
}



/**
 * Adds a child to the current node, is kept 
 * a reference to propagate changes in the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addChild
 * @param {Element} elem New child of the node
 */
Node.prototype.addChild = function( elem ) {

  if( elem instanceof Node ) {
    this._nodeChilds.push( elem );
    elem.setParent( this );

  } else if( elem instanceof Relation ) {
    this._relationChilds.push( elem );
    elem.setParent( this );    
  }  
}



/**
 * Deletes a element as child of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delChild
 * @param {Element} elem Element that will be remove as child
 */
Node.prototype.delChild = function( elem ) {
  var i;

  if( elem instanceof Node ) {
    for( i in this._nodeChilds ) {
      if( this._nodeChilds[i] == elem ) {
        this._nodeChilds.splice( i, 1 );

        elem.setParent();

        break;
      }
    }
    
  } else if( elem instanceof Relation ) {
    for( i in this._relationChilds ) {
      if( this._relationChilds[i] == elem ) {

        this._relationChilds.splice( i, 1 );
        elem.setParent();

        break;
      }
    }
  }
}



/**
 * Is added a relation to the node, this means that the 
 * node has started to be part of a relation and 
 * stores a reference to propagates changes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */
Node.prototype.addRelation = function( rel ) {
  if( rel instanceof Relation ) {
    this._relations.push( rel );
  }
}



/**
 * Is remove a relation of the node, the node has left to be part of the relation and
 * no need to continue to store your information
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delRelation
 * @param {Element} rel Relation that will be remove to the node
 */
Node.prototype.delRelation = function( rel ) {
  var i;
  
  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
      break;
    }
  }
  
}



/**
 * Stored a reference to the diagram to which it belong
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setDiagram
 * @param {Diagram} ndiagram Diagram to which belong
 */
Node.prototype.setDiagram = function( ndiagram ) {
  if( ndiagram instanceof Diagram ) {
    this._diagram = ndiagram;
  }
}



/**
 * Notifies the node that should be drawn because some
 * of the elements which it relates has changed 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDraw
 */
Node.prototype.notifyDraw = function() {
  if( this._diagram ) {
    this._diagram.draw();
  }
}



/**
 * Notify to the node that a change has been produced, 
 * some relationed element has changed and can affect it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */
Node.prototype.notifyChange = function() {

	//It is set to true so that necessary operations can be performed if the node resizing (this operations is related with relations to self of node)
  this._resizing = true;

  if( this._container ) {

    this.updateContainer();

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
  }

	//Once operations are performed, it is desactivated
  this._resizing = false;
}



/**
 * Return the x coordinate of the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getX
 * @return {Number} Coordinate x of the node's position
 */
Node.prototype.getX = function() {
    return this._x;
}



/**
 * Returns the coordinate y of the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getY
 * @return {Number} Coordinate y of the node's position
 */
Node.prototype.getY = function() {
    return this._y;
}



/**
 * Modifies the width of the element and updates the 
 * related elements of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method width
 * @param {Number} value New width of the element
 * @param {Boolean} If the change has been produced
 */
Node.prototype.width = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this.setWidth( value );
    this.notifyChange();    
    return true;
  }
  
  return false;
}



/**
 * Modifies the height of the element and updates the 
 * related elements with the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method height
 * @param {Number} value New height of the element
 * @param {Boolean} If the change has been produced
 */
Node.prototype.height = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this.setHeight( value );
    this.notifyChange();    
    return true;
  }
  
  return false;
}



/**
 * Modifies the position of the element and udpates 
 * the related elements with the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method position
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 * @param {Boolean} If the change has been produced
 */
Node.prototype.position = function( x, y ) {
  if( JSFun.isNumber( x ) && JSFun.isNumber( y ) ) {
    this.setPosition( x, y );
    this.updatePosition();
    this.resetMovement();
    
    return true;
  }
  
  return false;
}



/**
 * Modifies the position of the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setPosition
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Node.prototype.setPosition = function( x, y ) {
  if( JSFun.isNumber( x ) && JSFun.isNumber( y ) ) {

    this._x = x;
    this._y = y;
  }
}



/**
 * Returns the movement that has performed the 
 * node from your last position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getMovement
 * @return {Point} Movement of the node
 */
Node.prototype.getMovement = function() {
  return new Point( this._x - this._prex, this._y - this._prey );
}



/**
 * Set to 0 the movement performed by the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method resetMovement
 */
Node.prototype.resetMovement = function() {
  this._prex = this._x;
  this._prey = this._y;
}



/**
 * Deselects the node and close all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselect
 */
Node.prototype.deselect = function() {
  this.deselectComponent();
  
  this._selectedBefore = false;
  this._selected = false;
}



/**
 * Deselects a component and closes all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselectComponent
 * @private
 */
Node.prototype.deselectComponent = function() {
  if( this._activeComponent ) {
    this._activeComponent.deselect();
    this._activeComponent = null;
  }
}



/**
 * Check if the element has been pressed,  
 * and in affirmative case, is activated different flags
 *
 * @author Martín Vega-leal Ordóñez   /  Rafael Molina Linares
 * @update 28/11/2010								  /  19/09/2011
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is over the node or some of its components
 */
Node.prototype.select = function( x, y ) {


	//If the node isn't visible, this isn't drawn
	if(!this._visible)
		return false;

	this.deselectComponent();

	/*
		If the contextual menu is active or visible in the diagram
		and click has been done on the same node, the contextual menu is removed
	*/
	if(this._diagram._activeMenu){
	 this.removeContextualMenu();  
	}

  //If left bottom is clicked or finger touch screen
	if(this._diagram._pressMouse == true || this._diagram._touch == true){
	  if( this._selected ) {
		    var radius= ( this._diagram._touch) ? 7 : 0;
			//you have clicked on the small rectangle that allows to resize the node		  
	    if( this._moveable 
	        && Math.abs( x - ( this._x + this._width + 2.5) ) <= 2.5 +radius 
	        && Math.abs( y - ( this._y + this._height + 2.5) ) <= 2.5 +radius )
	    {
	      this._resizing = true;
	      this._component=false;
	      return true;
	    }
	     
	  }
	

	  if( this._selected ) {
		  var radius= ( this._diagram._touch) ? 4: 2;
		 if( this.isOverComponent( x, y , radius) ) {
		      this._relx = x - this._x;
		      this._rely = y - this._y;


		      this._selectedBefore = true;  
		      this._component=true;
		      return true;
		    }
	  }

		/*
			If you press on some part of the node 
			where there aren't any component, the node
			is selected.
		*/
	  if( this.isOver( x, y ) ) {
	    this._relx = x - this._x;
	    this._rely = y - this._y;

	    this._selectedBefore = this._selected;
	    this._component=false;
	    this._selected = true;
	    //alert(this._type);
 	    return true;
	  } else {
	    return false;
	  }
  } else if(this._diagram._pressMouseRight == true || this._diagram._hold == true){

		/* 
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {

		    //the default contextual menu is removed
 	  	  //document.oncontextmenu = function (){ return false; };
        this.disableDefaultContextualMenu();
				/*
					Captures the movement of the scroll bar making into account 
					that Chrome and Opera browsers support the document.documentElement 
					element and Firefox and IE browsers support the document.body element.
				*/
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
 * Show contextual menu of a Node
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showContextualMenu
 * @param {Number} x represents the upper left x coordinate of the contextual menu
 * @param {Number} y represents the upper left y coordinate of the contextual menu
 *
 */
Node.prototype.showContextualMenu = function(x,y){

	//In the case what the contextual menu already is activated or the node hasn't any item, exits of this method 
	if(this._diagram._activeMenu || !this._menu.length){
		return;
	}

	this._diagram._activeMenu = true;

	//Creates div that will contain the different options or items
	var div = document.createElement('div'); 
	div.className = "ud_contextualMenu";
	div.style.cursor = 'pointer';
	
	//Adds items or options to the container div
	for(var i=0;i<this._menu.length;i++)
	   this.addItem(this._menu[i],div);	

	//Adds div to the html document
	document.body.appendChild(div);

	this._diagram._divMenu = div;

	div.style.top = y + "px";
	div.style.left = x + "px";	
}



/**
 * Remove contextual menu of a html document
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method removeContextualMenu
 */

Node.prototype.removeContextualMenu = function(){

	if(this._diagram._activeMenu){
		this.showDefaultContextualMenu();
    //Remove container div of the html document
   	document.body.removeChild( this._diagram._divMenu );
		
		this._diagram._activeMenu = false;
   	this.notifyDraw();
	}
}

/**
 * Activate default contextual menu for the right button
 * 
 * @author Jesus Perez Navarro
 * @update 13/12/2014
 *
 * @method showDefaultContextualMenu
 */

Node.prototype.showDefaultContextualMenu = function(){
    document.oncontextmenu = function (){ return true; };
}

/**
 * Disable default contextual menu for the right button
 * 
 * @author Jesus Perez Navarro
 * @update 13/12/2014
 *
 * @method disableDefaultContextualMenu
 */

Node.prototype.disableDefaultContextualMenu = function(){
    document.oncontextmenu = function (){ return false; };
}

/**
 * Add a item to the contextual menu
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method addItem
 * @param {array} item Array whose position 0 represents the actions to perfom when the item is pressed, 
											 and the position 1 represents the text that appears in the contextual menu
 * @param {div} divContainer Represents the div that contains all items of the contextual menu.
 *
 */

Node.prototype.addItem = function(item, divContainer){		
 
	//Create a div for containing to the item
	var div = document.createElement('div'); 
	div.className = "ud_contextualMenuItem";

	//Creates a span element that contains a text node with the name of the item	
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(item[1]));
	
	//Adds item to contextual menu
	div.appendChild(span);
	divContainer.appendChild(div);

	//Associated the item[0] function to the mouseup event
	div.addEventListener('mouseup', item[0] , false);
}
	

/**
 * Show the dialog for changing the background-color of the Node. 
 * 
 * @author  Alejandro Arrabal Hidalgo
 * @update 15/10/2012
 *
 * @method showStyleDialog
 * 
 */

Node.prototype.showStyleDialog = function( params ) {
	
	var that = params.that || this;

	//Keep the color for the case that the button 'cancel' is pressed
	var colorBackgroundBackup = that._Backgroundcolor;	
	var colorLineBackup=that._lineColor;
	var colorTextBackup=that._textColor;
	
	//Take the background-color without the # character.
	var numHex = that._Backgroundcolor.split('#')[1];		

	//Disjoin the six digit into groups of two and add each group into a array position
	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),	
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupStyle";

	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');	

	//div that contains the hexadecimal background-color 
	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	//Red color
	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');
	
	//Green color
	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	//Blue color
	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	//Select color
	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	//Create form
	var form = document.createElement("form");
  
  //radio buttons
	var _divRadio = document.createElement('div');
	_divRadio.setAttribute("id","divRadio");  
	
  var label_background= document.createElement("label");
  label_background.innerHTML="Background color";
  var radio_background = document.createElement("input");
  radio_background.setAttribute("id","radio_background");
  radio_background.setAttribute("type","radio");
  radio_background.setAttribute("name","radio");
  radio_background.setAttribute("value","background");
  radio_background.setAttribute("checked","true");
  label_background.appendChild(radio_background);

  var label_line= document.createElement("label");
  label_line.innerHTML="Line color";
  var radio_line = document.createElement("input");
  radio_line.setAttribute("id","radio_line");
  radio_line.setAttribute("type","radio");
  radio_line.setAttribute("name","radio");
  radio_line.setAttribute("value","line");
  label_line.appendChild(radio_line);

  var label_text= document.createElement("label");
  label_text.innerHTML="Text color";
  var radio_text = document.createElement("input");
  radio_text.setAttribute("id","radio_text");
  radio_text.setAttribute("type","radio");
  radio_text.setAttribute("name","radio");
  radio_text.setAttribute("value","text");
  label_text.appendChild(radio_text);
  
  _divRadio.appendChild(label_line);
  _divRadio.appendChild(label_text);
  _divRadio.appendChild(label_background);
  var radio=[radio_background,radio_line,radio_text];

  //Controls for font
  var _divFont = document.createElement('div');
  _divFont.setAttribute("id","divFont");
  var number_size = document.createElement("input");
  number_size.setAttribute( "type", "number" );
  number_size.setAttribute("name","size");
  number_size.setAttribute( "value", parseInt(that._fontSize) || "12" );  
  number_size.setAttribute("style","width: 40px");//40
  var label_size= document.createElement("label");
  label_size.innerHTML=" Font size ";
  label_size.setAttribute("for","size");
  
  var text_family=document.createElement("input");
  text_family.setAttribute("type","text");
  text_family.setAttribute("name","family");
  text_family.setAttribute("value", that._fontFamily || "monospace")
  text_family.setAttribute("style","width: 70px");//65
  var label_family= document.createElement("label");
  label_family.innerHTML="Font family ";
  label_family.setAttribute("for","family");

  
  var number_width = document.createElement("input");
  number_width.setAttribute( "type", "number" );
  number_width.setAttribute("name","width");
  number_width.setAttribute( "value", that._lineWidth || "2" );  
  number_width.setAttribute("style","width: 40px");//40
  var label_width= document.createElement("label");
  label_width.innerHTML=" Line width ";
  label_width.setAttribute("for","width");
  
  _divFont.appendChild(label_family);
  _divFont.appendChild(text_family);
  _divFont.appendChild(label_size);
  _divFont.appendChild(number_size);
  _divFont.appendChild(label_width);
  _divFont.appendChild(number_width);

  var select_weight = document.createElement("select");
  select_weight.name="weight";
  var value= that._fontWeight || 'normal';
  select_weight.add(new Option('Normal', 'normal'));
  select_weight.add(new Option('Bold', 'bold'));
  select_weight.add(new Option('Bolder', 'bolder'));
  for(i=0;i<select_weight.length;i++){
	  if(select_weight.options[i].value==value)select_weight.options[i].selected=true;
  }
  select_weight.style="width: 85px";
  var label_weight= document.createElement("label");
  label_weight.innerHTML=" Text weight ";
  label_weight.setAttribute("for","weight");
 
  var select_style = document.createElement("select");
  select_style.name="style";
  value= that._fontStyle || 'normal';
  select_style.add(new Option('Normal', 'normal'));
  select_style.add(new Option('Italic', 'italic'));
  select_style.add(new Option('Oblique', 'oblique'));  
  for(i=0;i<select_style.length;i++){
	  if(select_style.options[i].value==value)select_style.options[i].selected=true;
  }
  select_style.style="width: 85px";
  var label_style= document.createElement("label");
  label_style.innerHTML="Text style ";
  label_style.setAttribute("for","style");
  //buttons	
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "OK" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "Cancel" );

  var button_advanced = document.createElement("input");
  button_advanced.setAttribute( "title", "Click here to use the advanced color picker" );
  button_advanced.setAttribute( "type", "color" );
  button_advanced.setAttribute( "id", "color" );
  //button_advanced.setAttribute( "value", colorBackup );

  var button_color = document.createElement("input");
  button_color.setAttribute( "type", "submit" );
  button_color.setAttribute( "title", "Click here to use the selected color in the color picker" );
  button_color.setAttribute( "value", "Adjust color" );




 
	//method for closing the dialog that re-draw the figures of Node
  var closeWindow = function ( event ) {
	  that.setFontFamily(text_family.value);
	  that.setFontSize( parseInt(number_size.value,10));
	  that.setLineWidth(parseFloat(number_width.value,10));
	  that.setFontStyle(select_style.options[select_style.selectedIndex].value);
	  that.setFontWeight(select_weight.options[select_weight.selectedIndex].value);
  	//Re-draw the figures of the Node for update your node style
		that.notifyDraw();

		/*
			Removes the element div that contains the 
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

	//method for closing the dialog that no re-draw the figures of Node
  var cancelWindow = function ( event ) {
		that.setBackgroundColor(colorBackgroundBackup);
		that.setLineColor(colorLineBackup);
		that.setFontColor(colorTextBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }
  
  //method for re-draw the dialog when the color option is changed
  var changeColorOption = function( event ) {
  		var current=getCheckedColor();
  		if(!current)current='#000000';
  		drawCurrentColor(current);
  		current=current.split('#')[1];
  		var defaultColor = new Array( parseInt(current.slice(0,2),16),	
			  parseInt(current.slice(2,4),16),
				parseInt(current.slice(4,6),16));
  		//draw the rectangles of each color primary in the dialog
      contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
  		drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
      contextG.clearRect(0,0,parseInt(canvasG.width),canvasR.height);
  		drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
      contextB.clearRect(0,0,parseInt(canvasB.width),canvasR.height);
  		drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
  }


      //method for closing the dialog that no re-draw the figures of Node
            var selector_advanced = function ( event ) {
              coll = document.getElementById("color").value;
              //document.body.removeChild( _divContainer );
              drawCurrentColor(coll);
              //app.updateBackgroundElementDiagram();
   
              /*var defaultColor = new Array( parseInt(coll.slice(0,2),16),  
              parseInt(coll.slice(2,4),16),
              parseInt(coll.slice(4,6),16));
              //draw the rectangles of each color primary in the dialog
              drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
              drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
              drawColor( canvasB, contextB, defaultColor[2], '#0000ff');*/
              coll2=coll;
              coll=coll.substring(1,7);
              coll_R=parseInt(coll.slice(0,2),16);
              coll_G=parseInt(coll.slice(2,4),16);
              coll_B=parseInt(coll.slice(4,6),16);

              defaultColor[0]=coll_R;
              defaultColor[1]=coll_G;
              defaultColor[2]=coll_B;

              contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
              drawColor( canvasR, contextR, coll_R, '#ff0000');
              contextG.clearRect(0,0,parseInt(canvasG.width),canvasR.height);
              drawColor( canvasG, contextG, coll_G, '#00ff00');
              contextB.clearRect(0,0,parseInt(canvasB.width),canvasR.height);
              drawColor( canvasB, contextB, coll_B, '#0000ff');

              while(_divRGB.hasChildNodes()){
              _divRGB.removeChild(_divRGB.lastChild);
              }
              var font = document.createElement("font");
              font.style.color = '#' + coll;
              var text=document.createTextNode('#');
              var text_color=document.createTextNode(coll.toUpperCase());
              font.appendChild(text);
              font.appendChild(text_color);
              _divRGB.appendChild(font);

              setCheckedColor(coll2);
            }


  
	//Add event to the 'close' and 'cancel' button
	radio_background.addEventListener('click', changeColorOption, false );
	radio_line.addEventListener('click', changeColorOption, false );
	radio_text.addEventListener('click', changeColorOption, false );
	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

  button_color.addEventListener('click', selector_advanced, false );





	//Prevents the information from the form to be sent
  form.onsubmit = function() { return false; }
	
	//Set the focus to the button
	button_close.focus();

	//Add controls to the form 
  form.appendChild(button_advanced);
  form.appendChild(button_color);
  form.appendChild(document.createElement('hr')); 
	form.appendChild(_divRadio);
	form.appendChild(document.createElement('hr'));
	form.appendChild(_divFont);
	form.appendChild(label_style);
	form.appendChild(select_style);
	form.appendChild(label_weight);
	form.appendChild(select_weight);
	form.appendChild(document.createElement('br'));
	form.appendChild(button_close);
	form.appendChild(button_cancel);



	
	//Add to the div Container
	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);
	

	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose 
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		//draw (R,G o B) according to color level 
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		//draw a rectangle of red,green or blue color
		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		//draw circle about drawn rectangle before
		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		//draw value between 0 and 255
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter. 
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){
		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color 
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code, 
	 *															where each position represents a primary color. 
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		} 


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}
		var font = document.createElement("font");
		font.style.color = '#' + color;
		var text=document.createTextNode('#');
		var text_color=document.createTextNode(color);
		font.appendChild(text);
		font.appendChild(text_color);
		_divRGB.appendChild(font);
		setCheckedColor('#' + color);

	}

	/**
	 * Method that modify the hexadecimal color of the Node 
	 * when it is pressed on one of the rectangles 
	 *
	 * @author Rafael Molina Linares  / Alejandro Arrabal hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;	
		var mousey = event.pageY - this.offsetTop;	
		
		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;					
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;	
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;
			
			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;	
			
			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(getCheckedColor());
	}
	
	  /**
	   * return  the radio's checked color
	   *
	   * @author Alejandro Arrabal Hidalgo
	   * @update 31/07/2012
	   *
	   * @method getCheckedRadioValue
	   * @return {colorCSS} The radio's checked color
	   */
	  var getCheckedColor= function(){
	  	for(var i = 0; i < radio.length; i++)
		  	if(radio[i].checked)break;
	  	switch(radio[i].value){
	  	case "background":
	  		return that.getBackgroundColor();
	  		break;
	  	case "line":
	  		return that.getLineColor();
	  		break;
	  	case "text":
	  		return that.getFontColor();
	  		break;
	  	}
	  	return that.getBackgroundColor();	
	  }




	  /**
	   * Set the color according to the chosen option
	   *
	   * @author Alejandro Arrabal Hidalgo
	   * @update 31/07/2012
	   *
	   * @method setCheckedRadioValue
	   * @param {colorCSS} The color to be set
	   */
	  var setCheckedColor= function(color){
	  	for(var i = 0; i < radio.length; i++) {
	  	if(radio[i].checked) break;
	  		}
	  	switch(radio[i].value){
	  	case "background":
	  		that.setBackgroundColor(color);
	  		break;
	  	case "line":
	  		that.setLineColor(color);
	  		break;
	  	case "text":
	  		that.setFontColor(color);
	  		break;
	  	}
	  }




	//draw the rectangles of each color primary in the dialog
	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

	//draw the rectangle with the combination color of the three primary color
    drawCurrentColor(that._Backgroundcolor);


	//Conver the color decimal to hexadecimal code and set this color like background-color of the Node
	colorHex(defaultColor);



	//Add "selectColor" method to the 'mousedown' event
	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	//Add container div to the html body
	document.body.appendChild(_divContainer);

  //Center the form

  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";  
}



/**
 * Set the tag values contained inside the node because of a profile
 * 
 * @author Rafael Molina Linares
 * @update 12/10/2011
 *
 * @method setTagValues
 * @param {Array} tagValues array that contains the tag values
 */

Node.prototype.setTagValues = function( tagValues ){

	if(!JSFun.isArray( tagValues ))
		return false;

	var name_tag = '';
	var value_tag = '';
	var indexEnd;

	for(var i=0;i<tagValues.length;i++){

		//Calculate the position of string where the ':' character appears
		indexEnd = tagValues[i].indexOf(':');

		//If the ':' character hasn't been found
		if(indexEnd == -1){
			name_tag = tagValues[i].substring(0);
		}	else {//If has been found
			name_tag = tagValues[i].substring(0,indexEnd);
			value_tag = tagValues[i].substring(indexEnd+1);
		}

		//If the tag value isn't inside the _tagValues array of the node, this is added
		if(!this.foundInTagValues(this._tagValues,name_tag))
			this._tagValues.push([name_tag,value_tag]);
	}

	return true;
}


/**
 * Searchs the name of a tag value between an array of tag values
 * 
 * @author Rafael Molina Linares
 * @update 12/10/2011
 *
 * @method foundInTagValues
 * @param {Array} array    Array of tag values
 * @param {Array} tagValue Name of the a tag value
 */

Node.prototype.foundInTagValues = function( array, tagValue  ){
	for(var i=0;i<array.length;i++)
		if(array[i][0] == tagValue)
			return true;
	return false;		
}



/**
 * Set the menu of the node with the different options 
 * that the contextual menu of node has, as well as 
 * the actions associated with each option. The passed
 * array is contained by pairs [actions,name], where name is
 * the name that will have the option in the menu, and actions
 * are the actions that will be performed when this option be
 * pressed
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method setMenu
 * @param {Array} items contain at the contextual menu
 */

Node.prototype.setMenu = function(items){
	if(items instanceof Array){
		this._menu = items;
	}
}


/**
 * Retuns the array that contains the information 
 * about the contextual menu of the node
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method getMenu
 * @return {Array} Information about the node's menu
 */

Node.prototype.getMenu = function(){
	return this._menu;
}


/**
 * Perfom the neccesary actions when the mouse 
 * is dragged by the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drag
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

Node.prototype.drag = function( x, y ) {

  if( this._resizing ) {
    
    var px = x - this._x;
    var py = y - this._y;
    
    px = Math.round( px );
    px = px - px % 5;
    py = Math.round( py );
    py = py - py % 5;
      

    var width = px;
    var height = py;

    if( this._proportional ) {
      var prop = this._width / this._height;

      if( width > height ) {
        height = width / prop;
      } else {
        width = height * prop;
      }
    
    }
        
    this.setWidth( width );
    this.setHeight( height );
    
  } else if ( this._selected ) {

    var px = x - this._relx;
    var py = y - this._rely;

    px = Math.round( px );
    px = px - px % 5;
    py = Math.round( py );
    py = py;

    this.setPosition( px, py );
    this._moved = true;
  }
}



/**
 * Performs the necessary actions when the user 
 * releases the mouse's button that had pressed
 *
 * @author Martín Vega-leal Ordóñez	/ Rafael Molina Linares
 * @update 28/11/2010 							/ 22/08/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Node.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }

 
    this.updatePosition();

    if( this._parent ) {

  		this._parent.updateContainer();

			/*
				if the node is contained within a supernode, all regions 
				of the supernode and the own supernode must be updated
			*/
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

		/*
			when the node has relation to self, the call of 
			this method is necessary to update the position of relation
		*/
    this.updatePosition();

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

			/*
				if the node is contained within a supernode, all regions 
				of the supernode and the own supernode must be updated
			*/
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
 * Assign the property to contain other nodes within it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setContainer
 */

Node.prototype.setContainer = function() {
  this._container = true;
}



/**
 * Returns if the node is container or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isContainer
 * @return {Boolean} If the node is or not a container node
 */

Node.prototype.isContainer = function() {
  if( this._container )
    return true;
  else
    return false; 
}



/**
 * Checks if the node is child of the given node or is 
 * below it in the hierarchy of nodes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isChildOf
 * @param {Node} comParent Node that is checked if is the parent
 */

Node.prototype.isChildOf = function( comParent ) {
  if( this._parent == null )
    return false;
  else if( this._parent == comParent )
    return true;
  else
    return this._parent.isChildOf( comParent );
}



/**
 * Assign to the node the passed parameter as parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setParent
 * @param {Node} newParent New parent of the node
 */

Node.prototype.setParent = function( newParent ) {
  if( newParent instanceof Node && newParent._container ) {
    this._parent = newParent;       
  } else {
    this._parent = null;
  }
}



/**
 * Return the parent of the ndoe, if has
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParent
 * @return {Node} Parent node, if has assigned it
 */

Node.prototype.getParent = function() {
  return this._parent;
}



/**
 * If the node that call to the function, is container, checks 
 * your minimal size taking in account the element and
 * components that contains 
 *
 * @author Martín Vega-leal Ordóñez			/ Rafael Molina Linares
 * @update 28/11/2010   								/ 20/08/2011
 *
 * @method updateContainer
 * @param {boolean} recall If the parent's method is called 
 */

Node.prototype.updateContainer = function(recall) {
 
	//If the value of the parameter isn't correct, this is initialized to true
  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {

    var i;

    var lx = this._x;
    var ly = this._y;
    
    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemLeftY;

		/*    
			Stores the coordinates of the extreme right, 
			left, bottom and top of the child nodes
		*/
    for( i in this._nodeChilds ) {

      elem = this._nodeChilds[i];
      
			if(elem._visible){  
		    elemLeftX = elem._x;
		    elemLeftY = elem._y;
		    elemRigthX = elem._x + elem._width;
		    elemRigthY = elem._y + elem._height;

		    
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
			Update the size, minimal size and position of the node 
			taking in account the coordinates calculate previously
		*/
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
	
		//Updates container of the node parent    
    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}  
}



/**
 * Updates the elememt's position regarding the movement indicated
 * by the parameters and transmits it to its child elements
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updatePosition
 * @param {Number}  movx Movement in the x axis
 * @param {Number}  movy Movement in the y axis
 * @param {Boolean} displacementRegion Indicates that this method has been called because of a region's displacement 
 */

Node.prototype.updatePosition = function( movx, movy, displacementRegion ) {
  var i, comp;

	displacementRegion = displacementRegion || false;

  if( movx == undefined || movy == undefined ) {
		/*
			If the movement is given as a point, this 
			movement is passed to its x,y coordinates
		*/
    var mov = this.getMovement();
    var movx = mov.getX();
    var movy = mov.getY();

		//Updates position of its relations
    for( i in this._relations ) {
      this._relations[i].updatePosition();
    }
  } else {
    this._x += movx;
    this._y += movy;    
  }

	//Resets the movement
  this.resetMovement();

  //Updates position of its components
  for( i in this._components ) {
    this._components[i].updatePosition( movx, movy );
  }

  //Updates position of its relations
  for( i in this._relations ) {

		//Parent of the relation
		var parentRel = this._relations[i].getParent();

    /*
      If the parent of the node and the relation's parent are different
      or the call to the method has been produced by the displacement
      of the a region of a super-node
    */
    if( ( parentRel != this._parent && 
				!(parentRel instanceof SuperNode && parentRel == this._parent._parent)) || 
				(displacementRegion) ) {
      this._relations[i].notifyChange();
    }
  }
  
  //If the node is a container
  if( this._container ) {

		//Updates the position of its child nodes
    for( i in this._nodeChilds ) {
      this._nodeChilds[i].updatePosition( movx, movy );
    }
    
		//Updates the position of its child relations
    for( i in this._relationChilds ) {
      this._relationChilds[i].updatePosition( movx, movy );
    }
  }   
}



/**
 * Receives a y coordinate and the node returns the 
 * horizontal limits of the figure in this region
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParticularWidth
 * @param {Number} y Position 'y' where the width is checked
 * @return {Array} Limits of the figure in the given height
 */

Node.prototype.getParticularWidth = function( y ) {
  if( y >= this._y && y <= this._y + this._height ) {
    return [ this._x, this._width ];
  }
  
  return [ 0, 0 ];
}


/**
 * Receives a x coordinate and the node returns the vertical limits 
 * of the figure in this position
 *
 * @author Rafael Molina Linares
 * @update 3/8/2011
 *
 * @method getParticularHeight
 * @param {Number} x Position 'x' where the width will be checked
 * @return {Array} Limits of the figures in the indicated width
 */

Node.prototype.getParticularHeight = function( x ) {
  if( x >= this._x && x <= this._x + this._width ) {
    return [ this._y, this._height ];
  }
  
  return [ 0, 0 ];
}



/**
 * Checks if the given point is over a node's component
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 10/12/2012
 *
 * @method isOverComponent
 * @private
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @param {Number} radius Radius where check the point 
 * @return {Boolean} If the point is over the component
 */

Node.prototype.isOverComponent = function( x, y, radius) {

  var i;
  var r= radius || 0;
  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].isOver( x, y, r ) ) {
      return true;
    }
  }
  
  return false;
}



/**
 * Checks if the given point is over a node's component and
 * in affirmative case, selects it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method selectComponent
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */

Node.prototype.selectComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  } 
}



/**
 * The grafical style of the node is defined, adding an object of type 
 * NodeFigure that draws an grafic in the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addFigure
 * @param {NodeFigure} newFig New figure that is added to the node
 */

Node.prototype.addFigure = function( newFig ) {
  if( newFig instanceof NodeFigure ) {
		if(!(newFig instanceof FromImageFigure))
	    this.setBackgroundColor(newFig._color);
		this.setLineWidth(newFig._lineWidth);
		this.setLineColor(newFig._lineColor);
    this._figures.push( newFig );
  }
}


/**
 * The grafical style of the node is remove, deleting an object of type 
 * NodeFigure passed as parameter
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delFigure
 * @param {NodeFigure} fig Figure that must be remove
 */

Node.prototype.delFigure = function( fig ) {

  if( fig instanceof NodeFigure ) {
		for(var i=1;i<this._figures.length;i++){
			if(this._figures[i] == fig){
				if(this._selectedFigure == i)
					this.setSelectedFigure(0);
				this._figures.splice(i,1);
				break;
			}
		}
  }
}



/**
 * Set the RGB color to the Node element for drawing it
 * 
 * @author Rafael Molina Linares
 * @update 7/06/2011
 *
 * @method setBackgroundColor
 * @param {char} color RGB color to be established to the Node
 */

Node.prototype.setBackgroundColor = function( color ) {
    this._Backgroundcolor = color;
    for(var i=0;i<this._figures.length;i++)
    	this._figures[i].setColor(color);
}



/**
 * Get the RGB color to the Node element
 *
 * @author Rafael Molina Linares
 * @update 7/06/2011
 *
 * @method getBackgroundColor
 *
 */

Node.prototype.getBackgroundColor = function( ) {
    return this._Backgroundcolor;
}


/**
 * Set the figure that will be drawn and if the 
 * figure to draw is a image, the components of 
 * the node are hidden
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setSelectedFigure
 * @param {Number} numFig Position of the figure's array that will be drawn
 *
 */

Node.prototype.setSelectedFigure = function( numFig ){

	//If numFig has a valid format and is inside the valid range 
	if(JSFun.isNumber( numFig ) && numFig > -1 && numFig < this._figures.length){


		//If the figure 'numFig' already is selected, exit the method
		if(this._selectedFigure == numFig)
			return false;


		//Set the new figure selected
		this._selectedFigure = numFig;

		//If the figure selected for drawing is a image
		if(this._figures[numFig] instanceof FromImageFigure){

			for(var i=0;i<this._components.length;i++){

				//If the component represents the name of node
				if(this._components[i]._id == 'name'){

					//If hasn't been stored any component inside of _beforeNameComponent
					if(!this._beforeNameComponent){

						//Stored the name component to restore its value later
						this._beforeNameComponent = this._components[i];
						
						var text = this._beforeNameComponent._text;
						var text_color= this._beforeNameComponent._font_color;
						var text_family= this._beforeNameComponent._font_family;
						var font_size= this._beforeNameComponent._font_size;
						var font_weight=this._beforeNameComponent._font_weight;
						var selected = this._beforeNameComponent.selected;

						/*
							A new component is created and put in place of the name's component. 
							It takes into account whether the before component (now stored in 
							this._beforeNameComponent) was a TextArea or TextBox
						*/
						if(this._beforeNameComponent instanceof TextArea)
							this._components[i] = new TextArea({ id:'name',text: text.join('\n'),text_color: text_color,text_family: text_family,font_size: font_size,font_weight: font_weight,selected: selected,position: Component.Bottom, margin: 3});
						if(this._beforeNameComponent instanceof TextBox)
							this._components[i] = new TextBox({ id:'name',text: text,text_color: text_color,text_family: text_family,font_size: font_size,font_weight: font_weight,selected: selected,position: Component.Bottom, margin: 3});
						//Set this node as parent of the component
						this._components[i].setParent(this);
					}
				} else {
					//Set the component's visibility to false
					this._components[i].setVisibility(false);
				}
			}

			//Saves the values of the node's size 
			this._beforeHeight = this._height;
			this._beforeWidth = this._width;

			//Set visibility of child nodes to false
			for(i=0;i<this._nodeChilds.length;i++){
				this._nodeChilds[i].setVisibility( false );
			}
		} else {//If the figure selected for drawing isn't a image

			for(var i=0;i<this._components.length;i++){

				//If the component represents the name of node
				if(this._components[i]._id == 'name' ){

					//If previously, the node had changed its figure to show
					if(this._beforeNameComponent){

						//Update the value of the component's text
						if(this._beforeNameComponent instanceof TextArea)
							this._beforeNameComponent.setText( this._components[i]._text.join('\n') );
						else if(this._beforeNameComponent instanceof TextBox)
							this._beforeNameComponent.setText( this._components[i]._text );

						//Restores the value and properties that the component had by default
						this._components[i] = this._beforeNameComponent;

						//Reset the value by default of the attribute 
						this._beforeNameComponent = null;
					}
				} else {

					if( !(this._components[i] instanceof SpecificationItem) ||
					    this._components[i] instanceof SpecificationItem && this._components[i].getValue() != ''){

						//Set the component's visibility to true
						this._components[i].setVisibility(true);
					}
				}
			}	

			//Set visibility of child nodes to true
			for(i=0;i<this._nodeChilds.length;i++){
				this._nodeChilds[i].setVisibility( true );
			}

			//Restore the values of the node's size 
			this.setHeight(this._beforeHeight);
			this.setWidth(this._beforeWidth);

			//Update container to set the minimum size of node according to the size of child nodes
			this.notifyChange(true);

			//Sort the nodes from less to higher size
			this._diagram._sortNodesByArea();
		}
		this.updateComponents();
	}
	return true;	
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

Node.prototype.setVisibility = function( bool ){

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
		if( _setVisibility || ( !_setVisibility && this._components[i]._id == 'name'))
			this._components[i].setVisibility(bool);
	}
	
	//Set the visibility of child nodes
	if(this._container && _setVisibility){
		for(i=0;i<this._nodeChilds.length;i++){
			this._nodeChilds[i].setVisibility( bool );
		}
	}
}


/**
 * Draws the figures that the node has
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares
 * @update 28/11/2010								 /  17/10/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Node.prototype.drawFigures = function( context ) {
  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {

		if(i == this._selectedFigure){
			this._figures[i].draw( context, this._x, this._y, this._width, this._height );
		}
  }
}



/**
 * Adds a component to the node, to add funcionality
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addComponent
 * @param {Component} newCom New component of the node
 */

Node.prototype.addComponent = function( newCom ) {

  if( newCom instanceof Component ) {

    newCom.setParent( this );
    this._components.push( newCom );
    this.updateComponents();
  }
}



/**
 * Calculates the minimal size of the node taking 
 * in account the size of its components, do
 * not reduce the size beyond which occupy
 *
 * @author Martín Vega-leal Ordóñez 		/ Rafael Molina Linares
 * @update 28/11/2010										/ 13/09/2011
 *
 * @method calculateSize
 * @protected
 */

Node.prototype.calculateSize = function() {

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
					if( !(comp instanceof RegionLine) && comp.getHeight() > maxHeight ){
					  maxHeight = comp.getHeight();
					}
				} else {//If the component has a horizontal orientation

					//Adds component's height to the maximum height
					maxHeight += comp.getHeight();

					widthComp = (comp.getPosition() == Component.Xmovement) ? (comp.getWidth() + 2* comp._parent._Xmovement) : comp.getWidth(); 


					//if the component's height is greater than the maximum height
					if( !(comp instanceof RegionLine) && widthComp > maxWidth ){
					  maxWidth = widthComp;
					}
				}
			} else if(!comp._visible){
				//If some component isn't visible, it is indicated in a variable
				foundInvisibleComp = true;
			}
    }

		/*
			If not found any visible component, and therefore 
			the maximum height is 0, the maximum height is 
			put to 20
		*/
		if(maxHeight == 0 && foundInvisibleComp == true)
			maxHeight = 20;
	
		/*
			If not found any visible component, and therefore 
			the maximum width is 0, the maximum height is 
			put to 20
		*/
		if(maxWidth == 0 && foundInvisibleComp == true)
			maxWidth = 20;
    
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
 * We define a box where you insert the components within 
 * the node then updates the positions of the components 
 * based on these values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method insertComponents
 * @protected
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} width Width of the box
 * @param {Number} height Height of the box
 */

Node.prototype.insertComponents = function( x, y, width, height ) {

  var i;
  var comp;

	var ytop  = -1;
	var ybottom = -1;
	var yleft  = -1;
	var yright = -1;
  
	var topComponents = [];

	/*
		Coordinates for each components are stablished to your type of position 
		between the node
	*/
  for( i = 0; i < this._components.length; i++ ) {
    comp = this._components[i];
    
		//If the component is of type Separator
    if( comp instanceof Separator ) {

      if(comp._orientation) {
        var values = this.getParticularHeight( x );
        comp.setCoordinates( x, values[0] );
        comp.setHeight( values[1] - 2*comp._margin );
      }
      else {
        var values = this.getParticularWidth( y );
        comp.setCoordinates( values[0], y );
        comp.setWidth( values[1] );
      }
    
		//If the component is centered
    } else if( comp.isCentered() ) {
      if(comp._orientation)
        comp.setCoordinates( x , y + height / 2 - comp.getHeight() / 2 );
      else
        comp.setCoordinates( x  + width / 2 - comp.getWidth() / 2, y );

		//If the component is at the right upper side of the node
    } else if( comp.getPosition() == Component.TopRight ) {

      comp.setCoordinates( x + width - comp.getWidth(), this._y );
    
		//If the component is at the left upper side of the node
    } else if( comp.getPosition() == Component.TopLeft ) {

      comp.setCoordinates( x, this._y );
    
		//If the component is out of the node, at the upper side
    } else if( comp.getPosition() == Component.Top && comp._visible ) {

			topComponents.push(comp);

		//If the component is at the bottom side of the node
    } else if( comp.getPosition() == Component.Bottom  && comp._visible) {

			if(ybottom == -1) ybottom = this._y + this._height;
      comp.setCoordinates( this._x + this._width / 2 - comp.getWidth() / 2, ybottom  );
			ybottom += comp.getHeight();

		//If the component is at the left side of the node
    } else if( comp.getPosition() == Component.Left && comp._visible ) {

			if(yleft == -1) yleft = this._y + this._height / 2 - comp.getHeight() / 2;
      comp.setCoordinates( this._x - comp.getWidth(), yleft  );
			yleft += comp.getHeight();

		//If the component is at the right side of the node
    } else if( comp.getPosition() == Component.Right && comp._visible ) {

			if(yright == -1) yright = this._y + this._height / 2 - comp.getHeight() / 2;
      comp.setCoordinates( this._x + this._width, yright  );
			yright += comp.getHeight();

		//If the component is at the left bottom side of the node
    }else if( comp.getPosition() == Component.BottomLeft ) {

      comp.setCoordinates( this._x , this._y + this._height - comp.getHeight() );  
  
		//If the component is at the right bottom side of the node
    } else if( comp.getPosition() == Component.BottomRight ) {

      comp.setCoordinates( this._x + this._width - comp.getWidth(), this._y + this._height - comp.getHeight() );      

		//If the component is at the left top side of the node, but moved in its coordinate x
    } else if( comp.getPosition() == Component.Xmovement ) {

      comp.setCoordinates( x + this._Xmovement, y );      

    } else {    	
      comp.setCoordinates( x , y );
      comp.setSuperWidth( this._width );
    }
    
		/*
			If the component is of type Float or Xmovement, the 
			x or y coordinate(according to the orientation of 
			the component) is increased for the next components
		*/
    if( comp.getPosition() == Component.Float || comp.getPosition() == Component.Xmovement ) {
      if(comp._orientation)
        x += comp.getWidth();
      else
        y += comp.getHeight();
    }
    
		//If the component is a SuperComponent, its sub-components are updated
    if( comp instanceof SuperComponent ) {
      comp.updateComponents();
    }
    
  }

	//If the component appears out of the component, in the top side
	for(i=topComponents.length-1;i>-1;i--){

		if(ytop == -1) ytop = this._y - topComponents[i].getHeight();
    topComponents[i].setCoordinates( this._x + this._width / 2 - topComponents[i].getWidth() / 2, ytop  );
		if(i!=0)
			ytop -= topComponents[i-1].getHeight();

    if( topComponents[i] instanceof SuperComponent ) {
      topComponents[i].updateComponents();
    }
	}
}



/**
 * Updates the position of the node's components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updateComponents
 * @param {Boolean} recall If your value is true, notifies changes in the relations of the node
 * @private
 */

Node.prototype.updateComponents = function(recall) {

	//initialize parameter if its value is undefined
  recall = (recall == undefined) ? true : recall;

  if( this._components.length > 0 ) {
    this.calculateSize();
    this.insertComponents( this._x, this._y, this._width, this._height );   
  }

  if(recall){
    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }
  }
}



/**
 * Draws the different components of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawComponents
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Node.prototype.drawComponents = function( context ) {
  var i;
  
  for( i = 0; i < this._components.length; i += 1 ){	 
    this._components[i].draw( context );
    }
}



/**
 * Draws the shapes and the active elements of the components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawComponentsShape
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Node.prototype.drawComponentsShape = function( context ) {
  var i;
  
  for( i = 0; i < this._components.length; i += 1 )
    this._components[i].drawShape( context );
}



/**
 * Assigns to the node the property of be rezising by the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMoveable
 */
Node.prototype.setMoveable = function() {
  this._moveable = true;
}



/**
 * Assigns to the node the property of be proportional, ie, 
 * when the user change your size, this change will 
 * maintain the size ratio width/height
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setProportional
 */
Node.prototype.setProportional = function() {
  this._proportional = true;
}



/**
 * Assigns the width of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setWidth
 * @param {Number} width New width of the node
 */
Node.prototype.setWidth = function( width ) {
  if( width < this._minWidth )
    width = this._minWidth;
  this._width = width;
}



/**
 * Assigns the height of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setHeight
 * @param {Number} width New height of the node
 */
Node.prototype.setHeight = function( height ) {
  if( height < this._minHeight )
    height = this._minHeight;
  
  this._height = height;
}



/**
 * Assigns the minimal width that can have the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMinWidth
 * @param {Number} width New minimal width of the node
 */
Node.prototype.setMinWidth = function( mw ) {
  if( mw < 0 )
    this._minWidth = 0;
  else
    this._minWidth = mw;
    
  if( this._width < this._minWidth ) {
    this._width = this._minWidth;
  }
}



/**
 * Assigns the minimal height that can have the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMinHeight
 * @param {Number} width New minimal height of the node
 */
Node.prototype.setMinHeight = function( mh ) {
  if( mh < 0 )
    this._minHeight = 0;
  else
    this._minHeight = mh;

  if( this._height < this._minHeight ) {
    this._height = this._minHeight;
  }
}



/**
 * Returns the width of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getWidth
 */
Node.prototype.getWidth = function() {
  return this._width;
}



/**
 * Returns the height of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getHeight
 */
Node.prototype.getHeight = function() {
  return this._height;
}



/**
 * Draws fully the node in the canvas element, 
 * calls to the drawing sub-functions to draw 
 * all components and figures of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Node.prototype.draw = function( context ) {

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
}



/**
 * Checks if the given point is over the node or 
 * some of its components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isOver
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over the node
 */
Node.prototype.isOver = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  if(  x >= this._x && x <= this._x + this._width && y >= this._y && y <= this._y + this._height ) {
    return true;
  }
  return false;
}


/**
 * Checks if the given point like parameter is over the position before of the node or 
 * some of your components, and the x coordinate of point is over the current position of the node 
 *
 * @author Rafael Molina Linares
 * @update 28/08/2011
 *
 * @method isOverBeforePosition
 * @param {Number} x Coordinate of point to check
 * @param {Number} y Coordinate of point to check
 * @return {Boolean} If the point is over the node
 */

Node.prototype.isOverBeforePosition = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
	if(    x >= this._prex && x <= this._prex + this._width && y >= this._prey && y <= this._prey + this._height 
			&& x >= this._x && x <= this._x + this._width){
    return true;
  }
  return false;
}


/**
 * Returns the area occupied by the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getArea
 * @return {Number} Area occupied by the node
 */
Node.prototype.getArea = function() {
  return this._width * this._height;
}



/**
 * Receives the deleting notification of a child component and delete it
 *
 * @author Rafael Molina Linares
 * @update 1/11/2010
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be remove
 */
Node.prototype.notifyDelete = function( dcomp ) {
  if(this._parent instanceof SuperNode){

    var i;

    for( i in this._components ) {
      if( this._components[i] == dcomp ) {
        this._components.splice( i, 1 );
        break;
      }
    }

    this.updateComponents();

  }
}


/**
 * Draw the node's shape
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Node.prototype.drawShape = function( context ) {
  context.save();
  context.lineWidth = 2.5;
  context.strokeStyle = NodeStyle.shape_color;
  context.strokeRect( JSGraphic.toPixel( this._x ), JSGraphic.toPixel( this._y ), this._width, this._height);
  context.restore();
  
}



/**
 * Returns the central point of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getCentralPoint
 * @return {Point} Coordinates of the central point 
 */
Node.prototype.getCentralPoint = function() {
  return new Point( this._x + this._width/2, this._y + this._height/2 );
}


/**
 * Returns the insection point between the given by x,y parameters 
 * and the node's form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of the point
 * @param {Number} y Coordinate y of the point
 * @return {Point} Intersection's point with the edyes of the node
 */
Node.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
  var incx = 0;
  var incy = 0;

  var width = this._width / 2;
  var height = this._height /2;
  
  var cx = this._x + width;
  var cy = this._y + height;
  
  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );
    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }
    
  if( incx > width ) incx = width;
  if( incy > height ) incy = height;
    
  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}


/**
 * Returns the insection point between the given by x,y parameters 
 * and the cx,cy parameters
 *
 * @author Rafael Molina Linares
 * @update 10/09/2011
 *
 * @method getLink
 * @param {Number} x Coordinate x of first point
 * @param {Number} y Coordinate y of first point
 * @param {Number} x Coordinate x of second point
 * @param {Number} y Coordinate y of second point
 * @return {Point} Intersection point with the node's borders 
 */
Node.prototype.getLink = function( x, y, cx, cy ) {

	if(!cx || !cy)
		return this.getLinkCentered(x, y);
	
 
  var incx = 0;
  var incy = 0;

  var width = cx - this._x; 
  var height = cy - this._y; 
  
	if(x > cx) width =  this._width - width;
	if(y > cy) height = this._height - height;
  
  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );

    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }
    
  if( incx > width ) incx = width;
  if( incy > height ) incy = height;
    
  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}



/**
 * Delete the given relation, this has been removed, 
 * and therefore, the node should delete
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @return {Relation} Relation that has been removed
 */
Node.prototype.notifyDeleted = function( rel ) {
  var i;
  
  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
    }
  }
}


/**
 * Deletes the element and all elements that have relation with him, and 
 * meaningless without the existence, as child nodes or relations
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method remove
 */
Node.prototype.remove = function() {
  var i;
  
	//Delete all relation of the node
  while( this._relations[0] ) {
    ( this._relations.pop() ).remove();  
  }
  
	//Delete the information of the node that contains the parent
  if( this._parent ) {
    var parent = this._parent;
    this._parent.delChild( this );
    parent.updateContainer();
  }
  
	//Delete all child node(if is a container node)
  if( this._container ) {
    while( this._nodeChilds[0] ) {
      ( this._nodeChilds.pop() ).remove();    
    } 
  }

	//Notify to the diagram that the node has been removed
  this._diagram.notifyDeleted( this );
}



/**
 * Returns a string identifying the kind of element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method toString
 * @return {String} Name identifying the item class
 */
Node.prototype.toString = function() {
  return "Node" ;
}




/**
 * Get the current node line width
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	04/08/2012
 *
 * @method getLineWidth
 * @return {number} current line width
 */

Node.prototype.getLineWidth = function() {
	return this._lineWidth;
}




/**
 * Set the line width to the Node element for drawing it
 *
 * @author Jose Maria Gomez Hernandez	/	Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	30/07/2012
 *
 * @method setLineWidth
 * @param {number} width line to be established to the Node
 */

Node.prototype.setLineWidth = function( width ) {
	this._lineWidth=width;
    for ( var i=0; i<this._figures.length; i++)		this._figures[i].setLineWidth(width);
}




/**
 * Get the  line color  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 31/07/2012
 *
 * @method getLineColor
 * @return {colorCSS} the current node's line color
 */

Node.prototype.getLineColor = function( ) {
    return this._lineColor;
}


/**
 * Set the line color to the Node element for drawing it
 *
 * @author Jose Maria Gomez Hernandez	/	Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	30/07/2012
 *
 * @method setLineColor
 * @param {char} color RGB color to be established to the line of the Node
 */

Node.prototype.setLineColor = function( color ) {
	this._lineColor = color;
    for(var i=0;i<this._figures.length;i++)
    	this._figures[i].setLineColor(color);
}




/**
 * get the Node's current font family
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update 04/08/2012
 *
 * @method getFontFamily
 * @param {family} current node's font family
 */

Node.prototype.getFontFamily = function(){
	return this._fontFamily;
}



/**
 * Modifies the Node's font family
 *
 * @author Jose Maria Gomez Hernandez / Alejandro Arrabal Hidalgo
 * @update 03/04/2012 / 02/08/2012
 *
 * @method setFontFamily
 * @param {family} font's family to stablish
 */

Node.prototype.setFontFamily = function( family ) {
	var i;
	this._fontFamily = family;
	for( i in this._components ){
		this._components[i].setFontFamily(family);
	}
}




/**
 * Get the font color  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method getFontColor
 * @return {colorCSS}the current component's font color
 */

Node.prototype.getFontColor = function( ) {
    return this._fontColor;
}




/**
 * Modifies the Node's font color
 *
 * @author Jose Maria Gomez Hernandez / Alejandro Arrabal Hidalgo
 * @update 03/04/2012 / 02/08/2012
 *
 * @method setFontColor
 * @param {color} font's color to stablish
 */

Node.prototype.setFontColor = function( color ) {
	var i;
	this._fontColor=color;
	for( i in this._components ){
		this._components[i].setFontColor(color);
	}
}



/**
 * Get the font size  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method getFontSize
 * @return {number}the current component's font size
 */

Node.prototype.getFontSize = function( ) {
    return this._fontSize;
}




/**
 * Modifies the Node's font size
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  03/08/2012
 *
 * @method setFontSize
 * @param {number} size of the font to stablish
 */

Node.prototype.setFontSize = function( size ) {
	var i;
	this._fontSize=size;
	for( i in this._components )this._components[i].setFontSize(size);
	var recall = true;
	var resize = true;
	this.notifyChange(recall, resize);
}



/**
 * get the Node's font style
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Style} the current font style
 */

Node.prototype.getFontStyle = function( ) {
		return this._fontStyle;
}




/**
 * Modifies the Node's font style
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  05/08/2012
 *
 * @method setFontStyle
 * @param {cssFont-Style} style of the font to stablish
 */

Node.prototype.setFontStyle = function( style ) {
	var i;
	this._fontStyle=style;
	for( i in this._components ){
		this._components[i].setFontStyle(style);
	}

}




/**
 * get the Node's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Weight} the current font weight
 */

Node.prototype.getFontWeight = function( ) {
		return this._fontWeight;
}




/**
 *	Modifies the Node's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method setFontWeight
 * @param {cssFont-Weight} font weight to stablish
 */

Node.prototype.setFontWeight = function( weight ) {
	var i;
	this._fontWeight=weight;
	for( i in this._components ){
		this._components[i].setFontWeight(weight);
	}
}



/**
 * Show the dialog for changing the background-color of the Node. 
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showColorDialog
 * 
 */

Node.prototype.showColorDialog = function( params ) {
	
	var that = params.that || this;

	//Keep the color for the case that the button 'cancel' is pressed
	var colorBackup = that._Backgroundcolor;	

	//Take the background-color without the # character.
	var numHex = that._Backgroundcolor.split('#')[1];		

	//Disjoin the six digit into groups of two and add each group into a array position
	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),	
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupColor";

	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');	

	//div that contains the hexadecimal background-color 
	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	//Red color
	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');
	
	//Green color
	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	//Blue color
	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	//Select color
	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	//Create form
	var form = document.createElement("form");
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "OK" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "Cancel" );

	//method for closing the dialog that re-draw the figures of Node
  var closeWindow = function ( event ) {

  	//Re-draw the figures of the Node for update your background-color
		that.notifyDraw();

		/*
			Removes the element div that contains the 
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

	//method for closing the dialog that no re-draw the figures of Node
  var cancelWindow = function ( event ) {
		that.setBackgroundColor(colorBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }

	//Add event to the 'close' and 'cancel' button
	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

	//Prevents the information from the form to be sent
  form.onsubmit = function() { return false; }
	
	//Set the focus to the button
	button_close.focus();

	//Add button to the form 
	form.appendChild(button_close);
	form.appendChild(button_cancel);

	//Add to the div Container
	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);
	

	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose 
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		//draw (R,G o B) according to color level 
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		//draw a rectangle of red,green or blue color
		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		//draw circle about drawn rectangle before
		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		//draw value between 0 and 255
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter. 
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){
	
		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color 
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code, 
	 *															where each position represents a primary color. 
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		} 


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}

		var font = document.createElement("font");
		font.style.color = '#' + color;
		var text=document.createTextNode('#');
		var text_color=document.createTextNode(color);
		font.appendChild(text);
		font.appendChild(text_color);
		_divRGB.appendChild(font);
		setCheckedColor('#' + color);


	}

	/**
	 * Method that modify the hexadecimal color of the Node 
	 * when it is pressed on one of the rectangles 
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;	
		var mousey = event.pageY - this.offsetTop;	


		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;					
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;	
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;
			
			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;	
			
			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(that._Backgroundcolor);		
	}


	//draw the rectangles of each color primary in the dialog
	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

	//draw the rectangle with the combination color of the three primary color
	drawCurrentColor(that._Backgroundcolor);


	//Conver the color decimal to hexadecimal code and set this color like background-color of the Node
	colorHex(defaultColor);



	//Add "selectColor" method to the 'mousedown' event
	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	//Add container div to the html body
	document.body.appendChild(_divContainer);

  //Center the form

  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";

}




/**
 * Returns the node's childs
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getNodeChilds
 * @return {Array} childs of the node
 */
Node.prototype.getNodeChilds = function() {
  return this._nodeChilds;
}



/**
 * Returns the node's components
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getComponents
 * @return {Array} components of the node
 */
Node.prototype.getComponents = function() {
  return this._components;
}


/**
 * Returns the node's visibility
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getComponents
 * @return {Boolean} visibility of the node
 */
Node.prototype.isVisible = function() {
  return this._visible
}

/**
 * Returns the node's relations
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/06/2013
 *
 * @method getRelations
 * @return {Array} visibility of the node
 */
Node.prototype.getRelations = function() {
  return this._relations;
} 