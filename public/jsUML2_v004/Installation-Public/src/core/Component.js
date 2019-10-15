/**
 ** MODULE NAME: 
 **	  Component.js
 **
 ** DESCRIPTION:
 **   A component is a small function part that adds properties to a larger item 
 **   such as a node or relationship
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
 **	    003 - Apr 2013 - AAH - Fourth version release
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


var ComponentStyle={
		  component_color: '#000000'
}




/**
 * Constructor of the class component.
 * A component is a small part that adds semantics
 * to a element higher, as a node or a relation
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 5/10/2011 / 01/08/2012
 *
 * @class Component
 * @param {String} id Identification of component, inside of your parent
 * @param {Number} margin Separation between the component and its adjacents
 * @param {Component.position} position Position of component inside of the parent
 * @param {Boolean} centered If the element will be centered 
 * @param {Number} orientation Indicates the vertical u horizontal orientation of the component:
 *																- 0: horizontal
 *																- 1: vertical
 * @param {Boolean} visible If the component is visible
 */
var Component = function( params ) {
  params = params || {}
    
  this._x = 0;
  this._y = 0;
  
  this._width = 0;
  this._height = 0;

  this._minWidth = 0;
  this._minHeight = 0;
  
  this._superWidth = 0;
  this._parent = null;

 //ComponentStyle

  
  //this._id {String}
  this._setId( params.id || '' );
  
  //this._margin {Number}
  this._setMargin( params.margin || 0 );
  
  //this._position {Component.position}
  this._setPosition( params.position || Component.Float );
  
  //this._centered {Boolean}
  this._setCentered( params.centered || false );

  this._orientation = params.orientation || 0; 

	//visibility of component
  this._visible = params.visible || true;
}

Component.Static = 0;
Component.Float = 1;
Component.TopRight = 2;
Component.Bottom = 3;
Component.BottomLeft = 4;
Component.BottomRight = 5;
Component.TopLeft = 8;
Component.Xmovement = 10;
Component.Top = 11;
Component.Left = 12;
Component.Right = 13;



/**
 * Assigns a id to the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method _setId
 * @private
 * @param {String} newId New id of the component
 */
Component.prototype._setId = function( newId ) {
  if( JSFun.isString( newId ) ) {
    this._id = newId;
  } else {
    this._id = '';
  }
}



/**
 * Return the id of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getId
 * @return {String} Id of the component
 */
Component.prototype.getId = function() {
  return this._id;
}


/**
 * Assigns a unique id to the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 18/06/2013
 *
 * @method _getUniqueId
 */
Component.prototype.getUniqueId = function( ) {
	if(this.getParent() instanceof SuperComponent)
		return this.getParent().getUniqueId()+this.getParent()._childs.indexOf(this);
	
    return this.getParent().getId()+this._id;
}

/**
 * Modifies the position of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setCoodinates
 * @param {Number} x New coordinate x of the component
 * @param {Number} x New coordinate y of the component
 */
Component.prototype.setCoordinates = function( x, y ) {
  this._x = x;
  this._y = y;
}



/**
 * Update the position of the component according to a relative movement
 * to the before position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method updatePosition
 * @param {Number} incx Movement in the x axis
 * @param {Number} incy Movement in the y axis
 */
Component.prototype.updatePosition = function( incx, incy ) {
  this._x += incx;
  this._y += incy; 
}



/**
 * Sets the width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method setWidth
 * @protected
 * @param {Number} newWidth New width of the component
 */
Component.prototype.setWidth = function( newWidth ) {
  if( newWidth > this._minWidth ) {
    this._width = newWidth + 2 * this._margin;
  } else {
    this._width = this._minWidth;
  }
}



/**
 * Sets the height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setHeight
 * @protected
 * @param {Number} newHeight New height of the component
 */
Component.prototype.setHeight = function( newHeight ) {
  if( newHeight > this._minHeight ) {
    this._height = newHeight + 2*this._margin;
  } else {
    this._height = this._minHeight;
  }
}

/**
 * Set the visibility to the component to true or false
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @protected
 * @param {Boolean} bool value of visibility of the component
 */
Component.prototype.setVisibility = function( bool ) {

  this._visible = bool;
}


/**
 * Set the minimal width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 7/11/2010
 *
 * @method setMinHeight
 * @protected
 * @param {Number} value New minimal width of the component
 */
Component.prototype.setMinWidth = function( value ) {
  if( value > 0 ) {
    this._minWidth = value;
  }
  
  if( value > this._width ) {
    this._width = value;
  }
}



/**
 * Sets the minimal height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setMinHeight
 * @protected
 * @param {Number} value New minimal height of the component
 */
Component.prototype.setMinHeight = function( value ) {
  if( value > 0 ) {
    this._minHeight = value;
  }
  
  if( value > this._height ) {
    this._height = value;
  }
  
}



/**
 * Set the disponible width for the node inside your container element,
 * this gives a margin to move and focus
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setSuperWidth
 * @param {Number} size Overall width within of the component that contains
 */
Component.prototype.setSuperWidth = function( size ) {
  if( size >= 0 ) {
    this._superWidth = size;
  }
}




/**
 * Sets the margin of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method _setMargin
 * @private
 * @param {Number} value New margin to the component
 */
Component.prototype._setMargin = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this._margin = value;
  } else {
    this._margin = 0;
  }
}



/**
 * Sets a reference to your parent element that contains it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method setParent
 * @param {Element|SuperComponent|Diagram} newParent Parent element that contains it
 */
Component.prototype.setParent = function( newParent ) {
  if( newParent instanceof Element || newParent instanceof SuperComponent || newParent instanceof Diagram ) {
    this._parent = newParent;
    }
}



/**
 * Sets the position that will occupy the component whitin your parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _setPosition
 * @private
 * @param {Number} value New position that will occupy whitin the parent component
 */
Component.prototype._setPosition = function( value ) {
  if(    value == Component.Float
      || value == Component.Static
      || value == Component.TopRight
      || value == Component.Bottom 
      || value == Component.BottomLeft
      || value == Component.BottomRight
      || value == Component.TopLeft
      || value == Component.sideLeft
      || value == Component.Xmovement
      || value == Component.Top
      || value == Component.Left
      || value == Component.Right)
  {     
    this._position = value;

  } else {
    this._position = Component.Float;  
  }
}

/**
 * Sets if the component will be centered(horizontally or vertically) or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _setCentered
 * @private
 * @param {Number} value If the component will be centered 
 */
Component.prototype._setCentered = function( value ) {
  if( value == true ) {
    this._centered = true;
  } else {
    this._centered = false;
  }
  
}



/**
 * Returns the position of the component, your x coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getX
 * @protected
 * @return {Number} Coordinate x of the position of the component
 */
Component.prototype._getX = function() {
  return this._x;
}



/**
 * Returns the position of the component, your y coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getY
 * @protected
 * @return {Number} Coordinate y of the position of the component
 */
Component.prototype._getY = function() {
  return this._y;
}



/**
 * Returns the position of the component, your x coordinate, specially 
 * formatted for the drawing of lines and that these fit 
 * within a pixel to not fade
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPixelX
 * @protected
 * @return {Number} Coordinate x of the position of the component
 */
Component.prototype.getPixelX = function() {
  return JSGraphic.toPixel( this._x );
}



/**
 * Returns the position of the component, your x coordinate, specially 
 * formatted for the drawing of lines and that these fit 
 * within a pixel to not fade
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPixelY
 * @protected
 * @return {Number} Coordinate y of the position of the component
 */
Component.prototype.getPixelY = function() {
  return JSGraphic.toPixel( this._y );
}



/**
 * Returns the real position of the component content, taking in 
 * account the assigned margin, your x coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMX
 * @protected
 * @return {Number} Coordinate  of the real position of the content
 */
Component.prototype._getMX = function() {
  return this._x + this._margin;
}



/**
 * Returns the real position of the component content, taking in 
 * account the assigned margin, your y coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMY
 * @protected
 * @return {Number} Coordinate y of the real position of the content
 */
Component.prototype._getMY = function() {
  return this._y + this._margin;
}



/**
 * Returns the width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getWidth
 * @return {Number} Width of the component
 */
Component.prototype.getWidth = function() { 
  return this._width;
}



/**
 * Returns the height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getHeight
 * @return {Number} Height of the component
 */
Component.prototype.getHeight = function() {
  return this._height;
}



/**
 * Returns the margin of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMargin
 * @private
 * @return {Number} Margin of the component
 */
Component.prototype._getMargin = function() {
  return this._margin;
}



/**
 * Returns the width margin that the component has 
 * whitin your parent element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getSuperWidth
 * @return {Number} Maximum width of the component
 */
Component.prototype.getSuperWidth = function() {
  if( this._parent instanceof SuperComponent ) {
    return this._parent.getSuperWidth();
  } else {
    return this._superWidth;
  }
}



/**
 * Returns the parent element of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/11/2010
 *
 * @method getParent
 * @return {Element|SuperComponent|Diagram} Parent element of the component
 */
Component.prototype.getParent = function() {
  return this._parent;
}



/**
 * Returns the position of the component whitin your parent element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPosition
 * @return {Component.position} Positioin of the component
 */
Component.prototype.getPosition = function() {
  return this._position;
}



/**
 * Returns if the component is centered vertically or horizontally
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method isCentered
 * @return {Boolean} If the component is centered 
 */
Component.prototype.isCentered = function() {
  return this._centered;
}



/**
 * Gets a XML node with the information of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
Component.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );
  
  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }
  
  xmlcomp.setAttribute( 'value', this.getValue() );
  return xmlcomp;
}



/**
 * Notifies to the parent element that should be 
 * re-drawn because the component has changed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDraw
 */
Component.prototype.notifyDraw = function() {
  if( this._parent ) {
    this._parent.notifyDraw();
  }
}



/**
 * Notifies to the parent element that should be updated and drawn
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 1/11/2010 / 17/09/2011
 *
 * @method notifyChange
 */
Component.prototype.notifyChange = function() {
  if( this._parent ) {

		//saves the width of the node, taking in account the orientation of the component
		var beforeWidth = (this._orientation) ? this._parent._height : this._parent._width;

		/*
			Notify changes in the parent. The parent of the component 
			can be a node(or supernode), or a super-component
		*/
		if(this._parent instanceof SuperNode)
	    this._parent.notifyChange(true);
		else	
	    this._parent.notifyChange();

		if(this._parent && this._parent._parent instanceof SuperNode)
			this._parent._parent.notifyChange(true);

		//Notify that should be drawn		
    this._parent.notifyDraw();    
  }
}



/**
 * Notifies to the parent element that the component has been remove
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDelete
 */
Component.prototype.notifyDelete = function() {

  if( this._parent instanceof SuperComponent || this._parent instanceof Diagram || this._parent.getParent() instanceof SuperNode) {

    this._parent.notifyDelete( this );
  }
}



/**
 * Notifies to the parent element that the component wanna up a level 
 * in relation to adjacent components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToUp
 */
Component.prototype.notifyToUp = function() {
  if( this._parent instanceof SuperComponent ) {
    this._parent.notifyToUp( this );
  }
}



/**
 * Notifies to the parent element that the component wanna go down a level 
 * in relation to adjacent components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToDown
 */
Component.prototype.notifyToDown = function() {
  if( this._parent instanceof SuperComponent ) {
    this._parent.notifyToDown( this );
  }
}



/**
 * Checks if the indicated point is over the component
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 10/12/2012
 *
 * @method isOver
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @param {Number} radius Radius where is cheked 
 * @return {Boolean} If the point is over the component
 */
Component.prototype.isOver = function( x, y , radius ) {
	var r = radius || 0;
	//alert(r);
  if( this._visible && 
			x + r >= this._x 
      && x <= this._x + this._width + r
      && y + r >= this._y
      && y <= this._y + this._height + r ) 
  {
    return true;
  } else {
    return false;
  }
}



/**
 * Draws the component on the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Component.prototype.draw = function( context ) {}



/**
 * Checks that it is pressed over the component on the given coordinates 
 * and in affirmative case, the corresponding actiokns are activated
 *
 * @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 10/12
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} radius Radius where is checked
 * @return {Boolean} If the point is over the component
 */
Component.prototype.select = function( x, y, radius) { return false; }



/**
 * Draws the component's shape and its button(if has)
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Component.prototype.drawShape = function( context ) {}



/**
 * Deselects the component and close all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method deselect
 */
Component.prototype.deselect = function() {}



/**
 * Modifies the component's value
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method setValue
 * @param {String} value Text that will be assigned to the component
 */
Component.prototype.setValue = function( value ) {}



/**
 * Returns the value of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method getValue
 * @return {String} Text that contains the component
 */
Component.prototype.getValue = function() { return; }



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
Component.prototype.setFontColor = function( color ) {}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
Component.prototype.getFontColor = function() {return ;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
Component.prototype.setFontFamily = function( font_family ) {}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
Component.prototype.getFontFamily = function() {return;}




/**
 * Modifies the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
Component.prototype.setFontSize = function( font_size ) {}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
Component.prototype.getFontSize = function() {return;}




/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontStyle
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
Component.prototype.setFontStyle = function( font_style ) {}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
Component.prototype.getFontStyle = function() {return;}



/**
 * get the Component's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Weight} the current font weight
 */

Component.prototype.getFontWeight = function( ) {return;}




/**
 *	Modifies the Component's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method setFontWeight
 * @param {cssFont-Weight} font weight to stablish
 */

Component.prototype.setFontWeight = function( weight ) {}


/**
 * get the Component's underline text
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  06/12/2012
 *
 * @method getFontUnderline
 * @return {boolean} if the component's text was underline
 */

Component.prototype.getUnderlineText = function( ) {return this._underline;}




/**
 *	Modifies the Component's underline text proprety
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  06/12/2012
 *
 * @method setUnderlineText
 * @param {boolean} proprety for the component's text underline property
 */

Component.prototype.setUnderlineText = function(underline) {this._underline=underline}
/**
 * Receives a xml component with the information of the component and get it back
 *
 * @author Alejandro Arrabal Hidalgo 
 * @update 30/08/2012
 *
 * @method setComponentXML
 * @param {DOMNode} xmlcomponent Xml component with the information of the component
 */
Component.prototype.setComponentXML = function( xmlcomponent ) {
	  if( xmlcomponent.getAttribute('id') ) {
		    this._id=xmlcomponent.getAttribute('id');
		  }
  if(xmlcomponent.getAttribute( 'fontColor' ) )  this.setFontColor( xmlcomponent.getAttribute( 'fontColor' )  );
  if(xmlcomponent.getAttribute( 'fontSize' ))this.setFontSize( xmlcomponent.getAttribute( 'fontSize' )  );
  if(xmlcomponent.getAttribute( 'fontFamily' ))this.setFontFamily( xmlcomponent.getAttribute( 'fontFamily' )  );
  if(xmlcomponent.getAttribute( 'fontStyle' ))this.setFontStyle( xmlcomponent.getAttribute( 'fontStyle' )  );
  if(xmlcomponent.getAttribute( 'fontWeight' ))this.setFontWeight( xmlcomponent.getAttribute( 'fontWeight' )  );
  this.setValue( xmlcomponent.getAttribute( 'value' ) );

}
