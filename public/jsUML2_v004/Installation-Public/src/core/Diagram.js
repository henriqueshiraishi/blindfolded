/**
 ** MODULE NAME: 
 **	  Diagram.js
 **
 ** DESCRIPTION:
 **   manages the diagram elements, capturing the events relevant to the 
 **   interaction between the diagram and the user
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **   Rafael Molina Linares (RML)
 **	  Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **		003 - May 2013 - AAH - Fourth version release
 **		002 - Oct 2012 - AAH - Third version release
 ** 	001 - Sep 2011 - RML - Second version release
 ** 	000 - Feb 2011 - MVL - First version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2013 The authors
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

//= require <Node>
//= require <Relation>
//= require <Component>
//= require <Region>


/**
 * Class responsible for managing the elements of a generic diagram capturing 
 * the events relevant to the interaction between nodes and their relationships
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Diagram
 * @param {HTMLID} id Id of the <div> element that contains the diagram
 * @param {CSSColor} background Color for the background of the draw canvas 
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawing canvas
 * @param {CSSColor} backgroundNodes Color for the background of the nodes of the diagram
 */
var Diagram = function( params ) {
  
  this._alone = false;
  this._width = 0;
  this._height = 0;
  this._background =  '#ffffff';
  
  this._div = null;
  this._mainContext = null;
  this._motionContext = null;
  

  this._nodes = [];
  this._relations = [];
  
  this._pressMouse = false;
  this._pressMouseRight = false;
  this._pressKey = false;
  
  this._validElements = [];
  this._items = [];
  this._id;  
  this._type = 'untyped';

  this._activeMenu = false;
	this._visible = true;

  this._name = new Tab({ text: 'Diagram name', margin: 6 });
  this._name.setCoordinates( 0, 0 );
  this._name.setParent( this );
  

  
  if( params ) {
		if( params.backgroundNodes ){
      this._backgroundNodes = params.backgroundNodes;			
		}

		/*
		  If the diagram is not invoked from the application layer,
		  it generates the structure of <canvas> elements 
			with information passed in the background,
			id,width and height parameters
		*/

    if( params.background ) {
      this._background = params.background;
    }

		if(params.id){
	    this._alone = true;
  	  this._generateStructure( params.id, params.width, params.height );
		}
  }

	/*
		Attributes that represent the current and previous element with 
		which the user has had interaction(used in the _defineDragAndDrop method)
	*/
  this._element = null;
  this._lastElement = null;

  this._defineDragAndDrop();

	/*
		Attribute that notifies if the dinamiv rezising of 
		the canvas's height is performed or not
	*/
	this._updateCanvas = false;
}



/**
 * Generates the elements needed to draw and animate the diagram 
 * and the values ​​assigned to attributes that apply. It is used 
 * when the diagram is not contained in any application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method generateStructure
 * @private
 * @param {String} divId Name of the 'id' property of div that will contained the diagram
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawin canvas
 */
Diagram.prototype._generateStructure = function( divId, width, height ) {

  if( !width || width < 0 ) {
    width = 300;
  }
  if( !height || height < 0 ) {
    height = 100;
  }
  
  this._width = width;
  this._height = height;
  this._minWidth = width;
  
  var div = document.getElementById( divId );
  
  
  
  if( div == null || div.nodeName != 'DIV' ) {
	  
    throw { name : 'NotCorrectId', message : 'The id specified does not exist or not a div element' };
    
  }  
  
  div.setAttribute( 'class', 'ud_diagram_div' );
  div.style.width = width + 'px';
  div.style.height = height + 'px';
  this._div = div;
  

  var canvas = document.createElement('canvas');
  canvas.setAttribute( 'class', 'ud_diagram_canvas' );
  canvas.width = width;
  canvas.height = height;
  this._mainContext = canvas.getContext('2d');
  div.appendChild( canvas );
  
  canvas = document.createElement('canvas');
  canvas.setAttribute( 'class', 'ud_diagram_canvas' );;
  canvas.width = this._width;
  canvas.height = this._height;
  canvas.onmousedown = function () { return false; };
  this._motionContext = canvas.getContext('2d');
  div.appendChild( canvas );
  
  return true;
}



/**
 * Initializes the diagram's values by the extern application, and re-writes 
 * the possible initial values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method initialize
 * @param {Number} id Number of diagram's id
 * @param {DOMNode} div Node of <div> type that contains the drawin canvas element
 * @param {CanvasRenderingContext2D} mainContext Context of the main drawing canvas 
 * @param {CanvasRenderingContext2D} motionContext Context where is drawn the movement of the element
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawing canvas
 * @return {Boolean} If the diagram has been initialized correctly, in other case return false
 */
Diagram.prototype.initialize = function( id, div, mainContext, motionContext, width, height ) {

  if( JSFun.isNumber( id ) &&
      div.nodeName == 'DIV' &&
      mainContext instanceof CanvasRenderingContext2D &&
      motionContext instanceof CanvasRenderingContext2D &&
      width > 0 &&
      height > 0 )
  {      
    this._id = id;
    this._div = div;
    this._mainContext = mainContext;
    this._motionContext = motionContext;
    this._width = width;
    this._height = height;
    this._minWidth = width;
    
    return true;
  } else {
    return false;
  }
}



/**
 * Returns the id's number assigns to the diagram by the application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getId
 * @return {Number} Number of the id
 */
Diagram.prototype.getId = function() {
  return this._id;
}


/**
 * Assignss to the diagram a number of id whitin of the application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {Number} value Number of id
 */
Diagram.prototype.setId = function( value ) {
  this._id = value;
}



/**
 * Returns the name assigns to the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Name of the diagram
 */
Diagram.prototype.getName = function() {
  return this._name.getValue();
}



/**
 * Assigns to the diagram the given name as parameter
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} value Name of the diagram
 */
Diagram.prototype.setName = function( value ) {
  if( JSFun.isString( value ) ) {
    this._name.setValue( value );
  }
}



/**
 * Assign a diagram's type that identifies the diagram's type that contains
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value Diagram's type
 */
Diagram.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the diagram's type that contains the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} Diagram's type
 */
Diagram.prototype.getType = function() {
  return this._type;
}



/**
 * Notifies to the object that should refresh the drawing canvas. 
 * The call of this method will be done by an object of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 *
 * @method notifyDraw
 */
Diagram.prototype.notifyDraw = function() {
  this.draw();
}



/**
 * Notifies to the object that some components has changed your value.
 * An example is the tab's name that identifies to the diagram in an external application
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */

Diagram.prototype.notifyChange = function() {
	this.draw();
 
}



/**
 * Adds a element to the list of nodes or relation according to your type, 
 * without performs any check over your state or update about yourself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addElementOnly
 * @private
 * @param {Element} elem New element to the diagram
 */
Diagram.prototype._addElementOnly = function( elem ) {

  if( elem instanceof Node ) {
    elem.setDiagram( this );
    this._nodes.push( elem );
    
  } else if( elem instanceof Relation ) {
    elem.setDiagram( this );
    this._relations.push( elem );
  }
  
}



/**
 * Adds a element to the list of nodes or relation according to your type, 
 * performs any check over your state or update about yourself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addElement
 * @param {Element} elem Nuevo elemento del diagrama
 * @return {Boolean} Si el elemento ha sido añadido al diagrama o no
 */
Diagram.prototype.addElement = function( elem ) {

  if( !elem || ! (elem instanceof Element) ) {
    return false;
  }

  var i;

  for( i in this._validElements ) {
    if( elem.getType() == this._validElements[i] ) {
      if( elem instanceof Node ) { 

        this._addNode( elem );
        return true;
      } else if( elem instanceof Relation ) {    

        this._addRelation( elem );     
        return true;
      }      
    }
  }
  
  return false;
}



/**
 * Adds a element of type Node to the list of nodes, and 
 * accordingly updates this place and its components
 *
 * @author Martín Vega-leal Ordóñez		/  Rafael Molina Linares
 * @update 28/11/2010									/  9/11/2011
 *
 * @method addElement
 * @param {Node} newNode Node that will be added to the diagram
 */

Diagram.prototype._addNode = function( newNode ) {

  if( newNode instanceof Node ) {

    newNode.setDiagram( this );

    if(newNode instanceof SuperNode){
      for(var i=0;i<newNode._nodeChilds.length;i++)
				newNode._nodeChilds[i].setDiagram(this);
    }

    this._nodes.push( newNode );

		//If has a color to the background of the nodes contained inside this diagram, this color is used to draws the node
		if(this._backgroundNodes)
			newNode.setBackgroundColor(this._backgroundNodes);

    if( !newNode.isAlone() ) {
      this.checkForParent( newNode );
    }

    newNode.updatePosition();

    if( newNode.getParent() ){

      newNode._parent.updateContainer();

			//if the node is contained within a supernode, all regions of the supernode and the own supernode must be updated
			var superNode = newNode._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
		}

    this._sortNodesByArea();

  }

}

/**
 * Set the background-color that will be used to draws the nodes of the diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setBackgroundNodes
 * @param {colorCSS} color Backgroun-color used to draws the nodes of the diagram
 *
 */

Diagram.prototype.setBackgroundNodes = function( color ){

	if(color)
		this._backgroundNodes = color;
}


/**
 * Deletes the element to the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delElement
 * @param {Element} elem Element that going to be remove
 * @return {Boolean} If the element has been remove of the diagram
 */

Diagram.prototype.delElement = function( elem ) {
  var i;
  
  for( i in this._nodes ) {
    if( this._nodes[i] == elem ) {
      elem.remove();
      return true;
    }
  }
  
  for( i in this._relations ) {
    if( this._relations[i] == elem ) {
      elem.remove();
      return true;
    } 
  }
  
  return false;
}



/**
 * Notifies to the diagram that the delete of the some 
 * element so that be remove of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @param {Element} element Elements that notifies that has been remove
 */

Diagram.prototype.notifyDeleted = function( element ) {
  var i;
  
  if( element instanceof Relation ) {
    for( i in this._relations ) {
      if( this._relations[i] == element ) {
        this._relations.splice( i, 1 ); 
        return;
      }
    }
    
  } else if( element instanceof Node ) {
    for( i in this._nodes ) {
      if( this._nodes[i] == element ) {
        this._nodes.splice( i, 1 ); 
        return;
      }
    } 
  }
}



/**
 * Adds a element of type Relation to the list of relations, 
 * and accordingly updates the state of the diagram 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addRelation
 * @private
 * @param {Relation} newRelation Relation that is added to the diagram
 */
Diagram.prototype._addRelation = function( newRelation ) {

  if( newRelation instanceof Relation ) {
    newRelation.setDiagram( this );
    this._relations.push( newRelation );
  }
}



/**
 * Checks the existence of two nodes in the given coordinates, and in affirmative case,
 * check if can be assigned the relation to the selected elements and then add it
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 30/10/2012
 *
 * @method addRelationFromPoints
 * @param {Relation} newRelation Relation that is added to the diagram
 * @param {Number} x1 Coordinate x of the first point
 * @param {Number} y1 Coordinate y of the first point
 * @param {Number} x2 Coordinate x of the second point
 * @param {Number} y2 Coordinate y of the second point
 * @return {Boolean} if the relation has been added
 */
Diagram.prototype.addRelationFromPoints = function( newRelation, x1, y1, x2, y2 ) {

  var elem1 = this.getElementByPoint( x1, y1 );
  var elem2 = this.getElementByPoint( x2, y2 );
        
  if( elem1 && elem2 ) { 	  
    if( newRelation.setElements( elem1, elem2 ) ) {    	
      newRelation.notifyChange();
      return this.addElement( newRelation );
    }
  }
  return false;
}



/**
 * Clear the drawing canvas, deleting all visible element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _clearMain
 * @private
 */
Diagram.prototype._clearMain = function() {
  this._mainContext.clearRect(0, 0, this._width, this._height );

  this._mainContext.save();
  this._mainContext.fillStyle = this._background;
  this._mainContext.fillRect( 0, 0, this._width, this._height );
  this._mainContext.restore();
}



/**
 * Clear the drawing canvas that represents the motion of the elements
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _clearMotion
 * @private
 */
Diagram.prototype._clearMotion = function() {
  this._motionContext.clearRect(0, 0, this._width, this._height );
}



/**
 * Draws all the elements of the diagram in the main drawing canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method draw
 */

Diagram.prototype.draw = function() {

	this._clearMain();

	//Update the height and width when there are some element with a long height or width
	this.updateHeightCanvas();
	this.updateWidthCanvas();

	this._name.draw( this._mainContext );


	for( i = this._nodes.length - 1; i >= 0; i-=1 ) {
		this._nodes[i].draw( this._mainContext );
	}

	for( i in this._relations ) {
		this._relations[i].draw( this._mainContext );
	}
}


/**
 * Update the height of the canvas element of diagram so that there aren't any element out
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method updateHeightCanvas
 */

Diagram.prototype.updateHeightCanvas = function(){

	//If isn't allowed the dinamic updated of the canvas, the method isn't performed any action
	if(!this._updateCanvas)
		return;

	var i;    

	//Searchs the maximum y coordinate between all nodes of the diagram
	var maxHeight = 0;
	for( i = this._nodes.length - 1; i >= 0; i-=1 ) {
		if( (this._nodes[i]._y + this._nodes[i]._height + 10) > maxHeight)
			maxHeight = this._nodes[i]._y + this._nodes[i]._height + 10;
	}

	//If the maximum y coordinate is greater of the canvas's height 
	if(maxHeight > this._height){

		//Sets the new height in the div that contains to the drawing canvas
		this._div.style.height = maxHeight + 'px';

		//Sets the new height in each drawing canvas contained in the diadram
		this._div.childNodes[0].height = maxHeight;
		this._div.childNodes[1].height = maxHeight;
		this._mainContext.canvas.height = maxHeight;
		this._motionContext.canvas.height = maxHeight;

		//Clear the motion canvas
		this._clearMotion();

		//Changes the attribute that keeps the height of the diagram, and puts the new height
		this._height = maxHeight;
	} else {

		/*
			If the maximum y coordinate is less than the current height, 
			the height is reducing provided that not less than 580
		*/
		maxHeight = (maxHeight > 580) ? maxHeight : 580;

		//Sets the new height in the div that contains to the drawing canvas
		this._div.style.height = maxHeight + 'px';

		//Sets the new height in each drawing canvas contained in the diadram
		this._div.childNodes[0].height = maxHeight;
		this._div.childNodes[1].height = maxHeight;
		this._mainContext.canvas.height = maxHeight;
		this._motionContext.canvas.height = maxHeight;

		//Clear the motion canvas
		this._clearMotion();

		//Changes the attribute that keeps the height of the diagram, and puts the new height
		this._height = maxHeight;
	}
}

/**
 * Choose if the dinamical redimension of canvas's height is activated/desactivated
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setUpdateHeightCanvas
 * @private
 * @param {Boolean} bool Value that set to activated/desactivated the automatic redimension of canvas's height
 */

Diagram.prototype.setUpdateHeightCanvas = function(bool){
	this._updateCanvas = bool;
}


/**
 * Draws the movement of the given element, drawing your shape
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawMotion
 * @private
 * @param {Element} element Elemento a dibujar
 */
Diagram.prototype._drawMotion = function( element ) {
  this._clearMotion();
  element.drawShape( this._motionContext );
}



/**
 * Sorts the nodes of the diagram by your area in sort ascendant
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _sortNodesByArea
 * @private
 */
Diagram.prototype._sortNodesByArea = function() {
  //Sort the array of elements by Area
  this._nodes.sort(
    function( a, b ) {
      var area1 = a.getArea();
      var area2 = b.getArea();

      if( area1 < area2 )
        return -1;
      else if( area1 == area2 )
        return 0;
      else
        return 1;
        
  });
}



/**
 * Checks the existence of a diagram's element in the given coordinates
 * and returns it in affirmative case
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getElementByPoint
 * @param {Number} x Coordinate x of the element to search
 * @param {Number} y Coordinate y of the element to search
 * @return {Element} element found or null in your default
 */
Diagram.prototype.getElementByPoint = function( x, y ) {
  var i,j;

  for( i in this._relations ) {
    if( this._relations[i].isOver( x, y ) ) {
      return this._relations[i];
    }
  }
  
  for( i = 0; i < this._nodes.length; i++ ) {
 
    if( this._nodes[i].isOver( x, y ) ) {
      return this._nodes[i];
    }
  }

  return null;
}



/**
 * Is searched a element in the given coordinates and if if exists, this is returned 
 * 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method reassignRelationTo
 * @param {Relation} rel Relation that will allocated
 * @param {number} x Coordinate x of the element to assign
 * @param {Number} y Coordinate y of the element to assign
 * @return {Element} element allocated in given coordinates
 */
Diagram.prototype.reassignRelationTo = function( rel, x, y ) {
  var i;
    
  //Check the Relations
  for(i in this._relations ) {
    if( this._relations[i] != rel &&  this._relations[i].isOver( x, y ) ) {
      return this._relations[i];
    }
  }
  
  //Check the Nodes
  for( i = 0; i < this._nodes.length; i++ ) {
    if( this._nodes[i].isOver( x, y ) ) {
      return this._nodes[i];
    }
  }
    
  return null;
}



/**
 * Checks the hierarchy of elements whitin the diagram and the relative position of the passed element as parameter,
 * reassigns it in your correct position on parents
 *
 * @author Martín Vega-leal Ordóñez		/ Rafael Molina Linares
 * @update 28/11/2010									/ 20/08/2011
 *
 * @method checkForParent
 * @param {Element} element Elemento para comprobar jerarquía
 */

Diagram.prototype.checkForParent = function( element ) {
  if( element instanceof Node ) {
 
    var i;
    var newParent;
    var nodeParent;
    var found = false;
    var foundNode = false;

    var lastParent = element.getParent();
        
    for( i = 0; i < this._nodes.length && !found; i++  ) {

      newParent = this._nodes[i];

      //If the new parent is a supernode, it is saw that region of the supernode exactly is the parent
      if(newParent instanceof SuperNode){
				for(var j=0; j< newParent._nodeChilds.length && !found; j++){

					//Region of the supernode
					nodeParent = newParent._nodeChilds[j];

					//Is search if the region is the parent of the element
					if(   nodeParent.isContainer()
						 && nodeParent != element
						 && nodeParent.isOver( element.getCentralPoint() )
						 && ( !element.isContainer() || ( element.isContainer() && !nodeParent.isChildOf( element ) ) ) ){
							found = true;
							newParent = nodeParent;
							break;
	        }
				}
      }
      else { //If the new parent isn't a supernode
		
				if(   newParent.isContainer()
					 && newParent != element
					 && newParent.getArea() > element.getArea()
					 && newParent.isOver( element.getCentralPoint() )
					 && ( !element.isContainer() || ( element.isContainer() && !newParent.isChildOf( element ) ) ) ){
						found = true;
						break;
				}
      }
    }


    //If the element's parent has been found 
    if( found ) {
      
      //If the parent is the same
      if( newParent == lastParent ) {
	      //If the parent is different from previous      
      } else if( lastParent ) {
        lastParent.delChild( element );
        lastParent.updateContainer();
        newParent.addChild( element );
      } else {
        newParent.addChild( element );
      }
      
    //If the element has no parent
    } else {

      //If the element has left his parent but it had parent
      if( lastParent ) {

        lastParent.delChild( element );
        lastParent.updateContainer();

				/*
					If the element is contained in a supernode's region, first 
					all supernode's regions must be updated and then, the 
					supernode must be updated
				*/
				var superNode = lastParent.getParent(); 
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
				} 
      }
    }      
  }    
}



/**
 * Generates the necessary functions for the management of the interaction with the user,
 * including the calls to the select/drag/drop methods to the different elements 
 * of the diagram
 *
 * @author Martín Vega-leal Ordóñez		/ Rafael Molina Linares
 * @update 28/11/2010								 	/ 20/09/2011
 *
 * @method _defineDragAndDrop
 * @private
 */
Diagram.prototype._defineDragAndDrop = function() {
  var that = this;
  this._element = null;
  this._lastElement = null;

  /**
   * Catch the coordinates of mouse's pulsation and checks if some 
	 * element is found in this coordinates, in affirmative case,
   * a signal is send via the select() function so that the element 
	 * will act accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _selectElement
   * @private
   * @param {Event} event Javascript event
   */
  this._selectElement = function( event ) {
	if(event._touch==true)return;
	if( event.button != 0 ){
    	if(event.button == 2){

    		that._pressMouseRight = true;
    	}
    	else{    		
    		that._pressKey = true;   
    		return;
    	}
    } else {
      that._pressMouse = true;      
    }

    //document.oncontextmenu = function (){return false;};
    var mousex = event.pageX - that._div.offsetLeft;
    var mousey = event.pageY - that._div.offsetTop;

    var found = false;
    var i;
    
    //Check the selected element
    if( that._lastElement instanceof Relation ) {
      if( that._lastElement.select( mousex, mousey ) ) {
        that._element = that._lastElement;
        found = true;
      }
    }

    for( i = 0; i < that._relations.length && !found; i++ ) {
      if( that._relations[i].select( mousex, mousey ) ) {
        that._element = that._relations[i];
        found = true;
      }
    }
  
    for( i = 0; i < that._nodes.length && !found; i++ ) {
      if( that._nodes[i].select( mousex, mousey ) ) {

        that._element = that._nodes[i];
        found = true;
      }
    }

    
    //Can modify the tab name if there is no application integrated
    if( that._alone ) {
      that._name.deselect();
      if( !found && that._name.select( mousex, mousey ) ) {
        found = true;
      }
    }

    //If the element found is other deselect the previous element
    if( that._lastElement && that._lastElement != that._element ) {
      that._lastElement.deselect();
      that._lastElement = null;
    }
    
}
  
  /**
   * Catch the coordinates of finger pulsation and checks if some 
	 * element is found in this coordinates, in affirmative case,
   * a signal is send via the select() function so that the element 
	 * will act accordingly
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 10/12/2012
   *
   * @method _selectByTouch
   * @private
   * @param {Event} event Javascript event
   */
  this._selectByTouch = function( event ) {
	 if(event.touches.length!=1)return;
     var touch = event.touches[0];
	 that._touch=true;
	 that._hold = false;
	 
    //document.oncontextmenu = function (){return false;};
    that._startX = touch.pageX - that._div.offsetLeft;
    that._startY = touch.pageY - that._div.offsetTop;
    
    var found = false;
    var i;
    
    //Check the selected element
    if( that._lastElement instanceof Relation ) {
      if( that._lastElement.select( that._startX, that._startY ) ) {
        that._element = that._lastElement;
        found = true;
      }
    }

    for( i = 0; i < that._relations.length && !found; i++ ) {
      if( that._relations[i].select( that._startX, that._startY ) ) {
        that._element = that._relations[i];
        found = true;
      }
    }
  
    for( i = 0; i < that._nodes.length && !found; i++ ) {
      if( that._nodes[i].select( that._startX, that._startY ) ) {

        that._element = that._nodes[i];
        found = true;
      }
    }

    
    //Can modify the tab name if there is no application integrated
    if( that._alone ) {
      that._name.deselect();
      if( !found && that._name.select( that._startX,that._startY ) ) {
        found = true;
      }
    }

if( found == true && that._element._selectedBefore==true){

    //check if an element but not a component has been touch	
	if(( that._element instanceof Node || that._element instanceof Relation) 
			&& !that._element._component && !( that._element instanceof Node && that._element.resize ))
	//stop custom event
			 {
		that._tapTime = setTimeout(function() {
			that._tapHold(touch);
			},600);
			
		that._stopEvent(event);
			that._cancelEvent(event);
			
			 }
	}

     if( that._lastElement && that._lastElement != that._element) {
      that._lastElement.deselect();
      that._lastElement = null;
    }
}
  
  /**
   * If a element has been selected in the selection function 
	 * and the mouse is moving, the element receives a call advising 
	 * of the coordinates by the drag() function, and so, acts to 
	 * your movement accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _dragElement
   * @private   
   * @param {Event} event Javascript event
   */
  this._dragElement = function( event ) {

    
    if( !( event.button == 0 && that._pressMouse ) ){
      return;
    }

    if( that._element ) {
      var mousex = event.pageX - that._div.offsetLeft;
      var mousey = event.pageY - that._div.offsetTop;
      
      if( mousex < 0 )
        mousex = 0;
      if( mousey < 0 )
        mousey = 0;
      if( mousex >= that._width )
        mousex = that._width; 
      if( mousey >= that._height )
        mousey = that._height;
     
      that._div.style.cursor = 'pointer';
      that._element.drag( mousex, mousey );

      that._drawMotion( that._element );
    }
    
  }
  
  
  
  /**
   * If a element has been selected in the selection function and the 
	 * mouse has been left of pressed, the element receives a call 
	 * adviseing of the coordinates by the drop() function, and so, 
	 * acts to the event accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _dropElement
   * @private
   * @param {Event} Javascript event
   */
  this._dropElement = function( event ) {
    if( !( event.button == 0 && that._pressMouse ) )
      return;
      
    if( that._element ) {

      that._div.style.cursor = 'default';
      that._clearMotion();
      
      
      var mousex = event.pageX - that._div.offsetLeft;
      var mousey = event.pageY - that._div.offsetTop;
      
      that._element.drop( mousex, mousey );
      
      that._lastElement = that._element;
      that._element = null;

      //Sort the elements to draw
      that._sortNodesByArea();

      that.draw();
    
    } else {
      that.draw();
    }
    
    that._pressMouse = false;
  }
  
  /**
   * If a element has been selected in the selection function and the 
	 *finger has been released, the element receives a call 
	 * adviseing of the coordinates by the drop() function, and so, 
	 * acts to the event accordingly
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/11/2010
   *
   * @method _dropByTouch
   * @private
   * @param {Event} Javascript event
   */
  this._dropByTouch = function( event ) {
	  //event.preventDefault();
    if( !(that._move) ){
        //stop the tapHold countdown
    	clearTimeout(that._tapTime);
    	return;    	
    }
    if( that._element ) {
     
      that._div.style.cursor = 'default';
      that._clearMotion();
      
      var touch= event.changedTouches[0];
      that._startX = touch.pageX - that._div.offsetLeft;
      that._startY = touch.pageY - that._div.offsetTop;

      that._element.drop( that._startX, that._startY );
      
      that._lastElement = that._element;
      that._element = null;

      //Sort the elements to draw
      that._sortNodesByArea();

      that.draw();
    
    } else {
      that.draw();
    }
    
    that._touch = false;
    that._move = false;
  }
  
  /**
   * If a element has been selected in the selection function 
	 * the element will be move, at the same place of a finger
   * @author Alejandro Arrabal Hidalgo
   * @update 30/11/2012
   *
   * @method _moveByTouch
   * @private
   * @param {Event} event Javascript event
   */
  this._moveByTouch = function( event ){
	  if(event.touches.length!=1)return;
	//stop the tapHold countdown
	  clearTimeout(that._tapTime);
	    if (that._touch == true && that._element && that._element != null ) {
                      event.preventDefault();
	         	      that._div.style.cursor = 'default';
		    	      that._clearMotion(); 	  

		    	      var touch= event.changedTouches[0];
	                  var touchx = touch.pageX - that._div.offsetLeft;
	                  var touchy = touch.pageY - that._div.offsetTop;

	                  if( touchx < 0 )
	                      touchx = 0;
	                    if( touchy < 0 )
	                      touchy = 0;
	                    if( touchx >= that._width )
	                      touchx = that._width; 
	                    if( touchy >= that._height )
	                      touchy = that._height;
	                   
	                    that._div.style.cursor = 'pointer';
	                    that._element.drag( touchx, touchy );

	                    that._drawMotion( that._element );
	                	that._move=true;  
	                  }
}  
	   
  
  /**
   * If a element has been selected in the selection function 
	 * and is pressed the delete key, the element will be remove 
	 * of the diagram
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _suprElement
   * @private
   * @param {Event} event Javascript event
   */
  this._suprElement = function( event ) {
    //the key supr
    if( event.keyCode != 46 ) {
      return;
    }
    
    if( that._lastElement /*&&
        window.confirm( '¿Está seguro de que desea elminiar el objeto '' + 
                        lastElement.getType() +
                        ''?\n\nUna vez borrado no podrá recuperarlo' )*/ )
      {
      that.delElement( that._lastElement );
      that._lastElement = null;
      
      that.draw();
    }
  
  }
  
  /**
   * Event tiggered when a finger is hold for a time, act accordingly
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/11/2010
   *
   * @method _selectElement
   * @private
   * @param {Event} event Javascript event
   */
  this._tapHold = function(touch) {
	var touchx = touch.pageX - that._div.offsetLeft;
    var touchy = touch.pageY - that._div.offsetTop;
    that._touch=false;
    that._hold = true;
    if(that._element != null){
    	that._element.showContextualMenu(touchx,touchy);
    }
    clearTimeout(that._tapTime);
    }  
  
  /**
   * Causes a advise to the elements that are in motion to leave their state and put to rest
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method stopEvents
   */
  this.stopEvents = function() {
    this._name.deselect();
    
    if( that._lastElement ) {
      that._lastElement.deselect();
      that._lastElement = null;
    }
  }

  /**
   * Stop the target event and his propagation
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/11/2010
   *
   * @method _stopEvent
   * @private
   * @param {Event} event Javascript event
   */

  this._stopEvent= function(e) {
	    if (!e) e = window.event;
	    if (e.stopPropagation) {
	        e.stopPropagation();
	    } else {
	        e.cancelBubble = true;
	    }
	}
  /**
   * Cancel the target event
   *    *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/11/2010
   *
   * @method _cancelEvent
   * @private
   * @param {Event} event Javascript event
   */

  this._cancelEvent=function(e) {
	    if (!e) e = window.event;
	    if (e.preventDefault) {
	        e.preventDefault();
	    } else {
	        e.returnValue = false;
	    }
	}
}


/**
 * Set the visibility to the diagram to true or false
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method setVisibility
 * @param {Boolean} bool value of visibility of the diagram
 */
Diagram.prototype.setVisibility = function( bool ) {

  this._visible = bool;

	if(!bool)
		this.interaction(false);
}



/**
 * Indicates if the diagram is visible
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method isVisible
 * @return {Boolean} If the diagram is visible or not
 */
Diagram.prototype.isVisible = function( ) {

  return this._visible;
}



/**
 * Activates or desactivates the interaction with the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method interaction
 * @param {Boolean} activate Activate/desactivate the interaction with the user
*/

Diagram.prototype.interaction = function( activate ) {

  if( activate ){
    this._div.addEventListener('mousedown', this._selectElement, false);
    window.addEventListener('mousemove',    this._dragElement , false);
    window.addEventListener('mouseup',      this._dropElement , false);

		//touch events
		this._div.addEventListener("touchstart", this._selectByTouch, false);
		window.addEventListener("touchmove", this._moveByTouch, false);
		window.addEventListener("touchend", this._dropByTouch, false);

    //window.addEventListener('keydown', this._suprElement, false);
  } else {
    this.stopEvents();
    this._div.removeEventListener('mousedown', this._selectElement, false);
    window.removeEventListener('mousemove', this._dragElement, false);
    window.removeEventListener('mouseup', this._dropElement, false);
    //window.removeEventListener('keydown', this._suprElement, false);
   //touch events
    this._div.removeEventListener("touchstart", this._selectByTouch, false);
	window.removeEventListener("touchmove", this._moveByTouch, false);
	window.removeEventListener("touchend", this._dropByTouch, false);

  } 
}


/**
 * Assigns a only id number to each element of the diagram
 *
 * @author Martín Vega-leal Ordóñez		/  Rafael Molina Linares
 * @update 28/11/2010									/  28/08/2011
 *
 * @method _enumerateElements
 * @private
*/
Diagram.prototype._enumerateElements = function() {
  var i;
  var j=0;
  var id = 0;

  for( i = 0; i < this._nodes.length; i++ ) {

		if(i > id) id = i;
    this._nodes[i].setId( id );


    if(this._nodes[i] instanceof SuperNode){
			for( j=id+1;j< this._nodes[i]._nodeChilds.length + id + 1; j++){
		    this._nodes[i]._nodeChilds[j - id -1].setId( j );
			}
			id = j;
    } else if(i != id){
			id = id + 1;
		}
  }
  
  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].setId( i );
  }

}



/**
 * Generates a tree with all element of the diagram in xml format
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getXML
 * @param {DOMNode} parent Parent node of xml tree
 * @return {DOMNode} Generated node with the overall diagram
*/
Diagram.prototype.getXML = function( parent ) {
  this._enumerateElements();
  
  this._sortNodesByArea();
  
  
  if( this._alone ) {
    var parent = (new DOMParser()).parseFromString( '<' + this.getType() + '/>', 'text/xml');
    var diagram = parent.getElementsByTagName( this.getType() )[0];
  } else {
    var diagram = parent.createElement( this.getType() );
  }
  
  diagram.setAttribute( 'name', this._name.getValue() );

	if(this._backgroundNodes)
	  diagram.setAttribute( 'backgroundNodes', this._backgroundNodes );  

  var node;
  var i;
  for(i = this._nodes.length - 1; i >= 0; i-- ) {
    if( this._nodes[i].getParent() == null && this._nodes[i]._action == undefined) {
      diagram.appendChild( this._nodes[i].getElementXML( parent ) );
    }
  }
  
  var relation;
  for( i = 0; i < this._relations.length; i++ ) {
    if( ! this._relations[i].getParent() ) {
      diagram.appendChild( this._relations[i].getElementXML( parent ) );
    }
  }
  
  return diagram;
}


/**
 * Generates the tree of diagram in xml and it is passed to a chain of characters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getXMLString
 * @return {String} Chain with the xml diagram
*/
Diagram.prototype.getXMLString = function() {
  return ( new XMLSerializer() ).serializeToString( this.getXML() );
}



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/
Diagram.prototype.setXML = function( xml ) {

  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );
  
  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }

  
  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * Functions that changes a chain with the diagram in xml, in a tree for your processing
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setXMLString
 * @param {String} stringDiagram Chain with the diagram in xml
 * @param {Boolean} Returns false if a bug has been found in the chain
*/
Diagram.prototype.setXMLString = function( stringDiagram ) {
  if( !stringDiagram || !JSFun.isString( stringDiagram ) ) {
    return false;
  }
  
  stringDiagram = stringDiagram.replace( /\n/gi, '' );
  
  var xml = (new DOMParser()).parseFromString( stringDiagram, 'text/xml' )
  if( xml == null ) {
    return null;
  }
  
  return this.setXML( xml );
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the 
 * diagram and his father is assigned
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 
 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Checks the validity of a chain and its correspondence with an object accepted by the diagram, in which case the request and returnsParent node of the element that is initialized
*/

Diagram.prototype._addElementXML = function( xmlnode, ids, parent ) { 

	var parent = parent || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){ 

		//Adds components to the supernode's region
		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array 
			of the diagram via the _addElementOnly method, so the 
			user can't move this region separately from the 
			supernode and can only move the entire supernode 
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;			
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj);
    }

  }  
}

/**
 * Instantiates the passed element and all its childs, 
 * and related it with your id
 *
 * @author Martín Vega-leal Ordóñez			/ Rafael Molina Linares
 * @update 28/11/2010										/ 15/08/11
 *
 * @method _instantiateElements
 * @private
 * @param {DOMNode} xmlnode XML information of the element that is instantiated
 * @param {Array} ids Is saves a reference a each element instantiated together your id
 * @param {Node} parent Parent node of element that is initialize
*/

Diagram.prototype._instantiateElements = function( xmlnode, ids, parent ) {
 
	//initialize parameter if your value is undefined
  parent = parent || null;

  var obj = this._instantiateObjectFromString( xmlnode.nodeName, parent );

  if( obj ) {

    ids[ xmlnode.getAttribute( 'id' ) ] = obj;
    var i;

    for(i = 0; i < xmlnode.childNodes.length; i++ ) {
      if(obj instanceof SuperNode && xmlnode.childNodes[i].nodeName == 'Region' )
				this._instantiateElements( xmlnode.childNodes[i], ids, obj );
			else
				this._instantiateElements( xmlnode.childNodes[i], ids );
    }
  }
}

/**
 * Defined the valid elements's types that are accepted by the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValidElements
 * @param {Array} types Valid Element for the diagram
*/
Diagram.prototype.setValidElements = function( types ) {
  this._validElements = [];
  
  var i;
  
  for( i in types ) {
    if( JSFun.isString( types[i] ) ) {
      this._validElements.push( types[i] );    
    }  
  }

}



/**
 * Returns the accepted objects by the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getValidElements
 * @return {Array} Elements accepted in the diagram
*/
Diagram.prototype.getValidElements = function() {
  if( this._validElements ) {
    return this._validElements;
  }
}



/**
 * Checks the validity of a chain and its correspondence with 
 * an object accepted by the diagram, in which case the request and returns
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _instantiateObjectFromString
 * @private
 * @param {string} elemName Name of the element to instantiate
 * @return {Element} Element instantiated
*/

Diagram.prototype._instantiateObjectFromString = function( elemName, parent ) {
  if( JSFun.isString( elemName ) ) {

		//initialize parameter if your value is undefined
    parent = parent || null;

    var i;

    for( i in this._validElements ) {
	
      if( elemName == this._validElements[i] ) {

				//If the element of the given name is a superNode, in the instantiation is passed a parameter that not allow the call to the method addNode 
				if(elemName == 'UMLAlternative' || elemName == 'UMLHorizontalRegion' || elemName == 'UMLVerticalRegion' || elemName == 'UMLCompositeState'){

					var setElementXml = true;
					return eval( 'new ' + this._validElements[i] + '({ setElementXml: ' + setElementXml + '})' );
				} else {

					if(parent){
						return (new window[this._validElements[i]]( { addComponent : false, parent: parent }) ); 
					}	else {
						return eval( 'new ' + this._validElements[i] + '()' );
					}
				}
			}
    }
  } else {
    return null;
  }

}



/**
 * Update the width of the canvas element of diagram so that there aren't any element out
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method updateWidthCanvas
 */

Diagram.prototype.updateWidthCanvas = function(){

	//If isn't allowed the dinamic updated of the canvas, the method isn't performed any action
	if(!this._updateWidthCanvas)
		return;

	var i;    

	//Searchs the maximum x coordinate between all nodes of the diagram
	var maxWidth = 0;
	for( i = this._nodes.length - 1; i >= 0; i-=1 ) {
		if( (this._nodes[i]._x + this._nodes[i]._width + 10) > maxWidth)
			maxWidth = this._nodes[i]._x + this._nodes[i]._width + 10;
	}

	//If the maximum x coordinate is greater of the canvas's width
	if(maxWidth > this._width){

		//Sets the new width in the div that contains to the drawing canvas
		this._div.style.width = maxWidth + 'px';

		//Sets the new width in each drawing canvas contained in the diadram
		this._div.childNodes[0].width = maxWidth;
		this._div.childNodes[1].width = maxWidth;
		this._mainContext.canvas.width = maxWidth;
		this._motionContext.canvas.width = maxWidth;

		//Clear the motion canvas
		this._clearMotion();

		//Changes the attribute that keeps the width of the diagram, and puts the new width
		this._width = maxWidth;
	} else {

		/*
			If the maximum x coordinate is less than the current width, 
			the width is reducing provided that not less than _minWidth
		*/
		maxWidth = (maxWidth > this._minWidth) ? maxWidth : this._minWidth;

		//Sets the new width in the div that contains to the drawing canvas
		this._div.style.width = maxWidth + 'px';

		//Sets the new height in each drawing canvas contained in the diagram
		this._div.childNodes[0].width = maxWidth;
		this._div.childNodes[1].width = maxWidth;
		this._mainContext.canvas.width = maxWidth;
		this._motionContext.canvas.width = maxWidth;

		//Clear the motion canvas
		this._clearMotion();

		//Changes the attribute that keeps the width of the diagram, and puts the new width
		this._width = maxWidth;
	}
}

/**
 * Choose if the dinamical redimension of canvas's width is activated/desactivated
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setUpdateWidthCanvas
 * @private
 * @param {Boolean} bool Value that set to activated/desactivated the automatic redimension of canvas's width
 */

Diagram.prototype.setUpdateWidthCanvas = function(bool){
	this._updateWidthCanvas = bool;
}


/**
 * Returns the Diagram's relations
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/06/2013
 *
 * @method getRelations
 * @return {Array} relations of the diagram
 */
Diagram.prototype.getRelations = function() {
  return this._relations;
} 
