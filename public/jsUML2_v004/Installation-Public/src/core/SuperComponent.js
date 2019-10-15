/**
 ** MODULE NAME: 
 **	  SuperComponent.js
 **
 ** DESCRIPTION:
 **   A SuperComponent is an object that manages a group of components of a 
 **   particular mode for greater functionality
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	002 - Agu 2012 - AAH - 
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

//= require <Point>
//= require <Element>
//= require <Component>



/**
 * SuperComponent class constructor
 * A super-component is an object that manages different 
 * components of a determined way to obtain 
 * greater functionality
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010	01/08/2012
 *
 * @class SuperComponent
 * @extends Component
 * 
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 */
var SuperComponent = function( params ) {
  params = params || {};
  SuperComponent.baseConstructor.call( this, params );

  this._childs = [];
  this._activeChild = null;
  this._visibleSubComponents = true;
  
  //Font properties
  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this.line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');  
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal'); 
}
JSFun.extend( SuperComponent, Component );



/**
 * Modify the visibility of the sub-components that 
 * the component contains. If the sub-components are  
 * visibles, there are made invisible, and vice versa
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method changeVisibility
 */
SuperComponent.prototype.changeVisibility = function() {
  this._visibleSubComponents = !this._visibleSubComponents;
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
SuperComponent.prototype.setVisibility = function( bool ) {

	//Set the visibility of the component
	this._visible = bool;

	//Set the visibility of all component's child to the 'bool' value
	for(var j=0;j<this._childs.length;j++)
		this._childs[j]._visible = bool;
}


/**
 * Returns if a super-component is visible at that moment
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method visibilitySubComponents
 * @return {Boolean} If the super-component is visible
 */
SuperComponent.prototype.visibilitySubComponents = function() {
  return this._visibleSubComponents;
}

/**
 */
SuperComponent.prototype.isOver = function( x, y, r) {
	for (i in this._childs)if(this._childs[i].isOver(x,y,r))return true;
	return SuperComponent.base.select.call( this, x, y, r );
}


/**
 * Generates a XML node with the information of the super-component.
 * For this, the sub-components of the component are consulted.
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 3/11/2010 / 09/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode Node with the information of the super-component
 */
SuperComponent.prototype.getComponentXML = function( parent ) {

  var xmlcomp = parent.createElement( 'superitem' );
  xmlcomp.setAttribute( 'id', this._id );
  xmlcomp.setAttribute( 'visibleSubComponents', this._visibleSubComponents );
  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  var i;  
  for( i in this._childs ) {
    xmlcomp.appendChild( this._childs[i].getComponentXML( parent ) );
  }
  
  return xmlcomp;
}



/**
 * Receives a xml node with the information of the super-component and get it back 
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/30/08/2012
 *
 * @method setComponentXML
 * @param {DOMNode} xmlnode XML node with the information of the super-component
 */
SuperComponent.prototype.setComponentXML = function( xmlnode ) {

  var i;
  var childs = xmlnode.childNodes;
  
  if( xmlnode.getAttribute( 'visibleSubComponents' ) == 'true' ) {
    this._visibleSubComponents = true;
  } else {
    this._visibleSubComponents = false;
  }
  if(xmlnode.getAttribute( 'fontColor' ))this.setFontColor( xmlnode.getAttribute( 'fontColor' )  );
  if(xmlnode.getAttribute( 'fontSize' ))this.setFontSize( xmlnode.getAttribute( 'fontSize' )  );
  if(xmlnode.getAttribute( 'fontStyle' ))this.setFontStyle( xmlnode.getAttribute( 'fontStyle' )  );
  if(xmlnode.getAttribute( 'fontFamily' ))this.setFontFamily( xmlnode.getAttribute( 'fontFamily' ));
  if(xmlnode.getAttribute( 'fontWeigth' ))this.setFontWeight( xmlnode.getAttribute( 'fontWeight' )  );
  for( i = 0; i < childs.length; i++ ) {
    this.addField( childs[i].getAttribute( 'value' ) );
  }
}




/**
 * Updates the position of the super-component according 
 * to the relative movement from its before position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method updatePosition
 * @param {Number} incx Movement in the x axis
 * @param {Number} incy Movement in the y axis
 */
SuperComponent.prototype.updatePosition = function( incx, incy ) {
  SuperComponent.base.updatePosition.call( this, incx, incy );
  
  var i;
  for( i in this._childs ) {
    this._childs[i].updatePosition( incx, incy );
  }
  
}



/**
 * Adds a component to the super-component
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 08/08/2012
 *
 * @method addSubComponent
 * @param {Component} ncom New component of the element
 */
SuperComponent.prototype.addSubComponent = function( ncom ) {
  if( ncom instanceof Component ) {
    ncom.setParent( this );
	ncom.setFontFamily(this.getFontFamily());
	ncom.setFontColor(this.getFontColor());
	ncom.setFontSize(this.getFontSize());
	ncom.setFontStyle(this.getFontStyle());
	ncom.setFontWeight(this.getFontWeight());
    this._childs.push( ncom );
  }
  
}



/**
 * Deletes a component of the super-component, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method delSubComponent
 * @param {Component} dcom Component that will be remove
 */
SuperComponent.prototype.delSubComponent = function( dcom ) {

  var i;
  
  for( i in this._childs ) {
    if( this._childs[i] == dcom ) {
      this._childs.splice( i, 1 );
      break;
    }
  }
}



/**
 * Updates the position of the sub-components of the super-component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 20/11/2010
 *
 * @method updateComponents
 */
SuperComponent.prototype.updateComponents = function() {

  if( this._visibleSubComponents ) {
    var width = 0;
    var height = 0;
      
    var i;
    for( i in this._childs ) {

			if(this._orientation){	//vertical orientation

		    if( this._childs[i].getHeight() > height )
		      height = this._childs[i].getHeight();

		    width += this._childs[i].getWidth();
			} else {

		    if( this._childs[i].getWidth() > width )
		      width = this._childs[i].getWidth();

		    height += this._childs[i].getHeight();
			}
    }
    
		if(this._orientation){	//vertical orientation
		  this.setWidth( width );
		  this.setHeight( height + this._getMargin() );
    } else {
		  this.setWidth( width + this._getMargin() );
		  this.setHeight( height );
		}

    var x = this._getMX();
    var y = this._getMY();
    
    for( i = 0; i < this._childs.length; i++ ) {
			if(this._orientation){	//vertical orientation
		    this._childs[i].setCoordinates( x, y );
		    x += this._childs[i].getWidth();
			} else {
		    this._childs[i].setCoordinates( x, y );
		    y += this._childs[i].getHeight();
			}
    }
  
  } else {
    this.setWidth( 1 );
    this.setHeight( 1 );  
  }
}



/**
 * Checks that the super-component has been pressed in the given 
 * coordinates and, in affirmative case, active the pressed component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is over the component
 */
SuperComponent.prototype.select = function( x, y ) {
  
  if( this._visibleSubComponents ) {
    var i;

    for( i in this._childs ) {
      if( this._childs[i].select( x, y ) ) {
        this._activeChild = this._childs[i];

        return true;
      }
    }  
  }
}



/**
 * Deselects the super-component and closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method deselect
 */
SuperComponent.prototype.deselect = function() {
  if( this._activeChild ) {
    this._activeChild.deselect();
    this._activeChild = null;
  }
}



/**
 * Draws the border of the component and its buttons
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SuperComponent.prototype.drawShape = function( context ) {
  
	if(!this._visible)
		return;

  context.save();
  
  context.strokeStyle = '#aaaaaa';
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
  
  context.restore();
  
  if( this._visibleSubComponents ) {
    var i;
    for( i in this._childs ) {
      this._childs[i].drawShape( context );
    }
  } 
}



/**
 * Receives the notification to raise the component a position and moves it to its new location
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToUp
 * @param {Component} elem Element to move to the new location
 */
SuperComponent.prototype.notifyToUp = function( elem ) {
  var i;
  
  var aux = elem;
  
  for( i = 0; i < this._childs.length; i++ ) {
    if( this._childs[i] == elem ) {
      if( i > 0 ) {
        this._childs[i] = this._childs[ i - 1 ];
        this._childs[ i - 1 ] = elem;
      }
      return;
    }
  }  
}



/**
 * Receives the notification of go down the component a position and moves it to its new location
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToDown
 * @param {Component} elem Element to move to the new location
 */
SuperComponent.prototype.notifyToDown = function( elem ) {
  var i;
  
  var aux = elem;
  
  for( i = 0; i < this._childs.length - 1; i++ ) {
    if( this._childs[i] == elem ) {
      this._childs[i] = this._childs[ i + 1 ];
      this._childs[ i + 1 ] = elem;
      
      return;
    }
  }  
}



/**
 * Notify to the parent element that must update and draw it 
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 1/11/2010 / 18/09/11
 *
 * @method notifyChange
 */
SuperComponent.prototype.notifyChange = function() {
  this.updateComponents();
  
  if( this._parent ) {
		if(this._parent instanceof SuperNode)
	    this._parent.notifyChange(true);
		else	
	    this._parent.notifyChange();

		if(this._parent && this._parent._parent instanceof SuperNode)
			this._parent._parent.notifyChange(true);
  }
}



/**
 * Receives the notification to delete the child component and delete it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be removed
 */
SuperComponent.prototype.notifyDelete = function( dcomp ) {		

  this.delSubComponent( dcomp );
  this.updateComponents();
}



/**
 * Draws the super-component in the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SuperComponent.prototype.draw = function( context ) {
  
	if(!this._visible)
		return;

  if( this._visibleSubComponents ) {
  
    var i;
    
    for( i in this._childs ) {
      this._childs[i].draw( context );
    }   
  }
}




/**
 * Modifies the supercomponent and his childs font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method _setFontSize
 * @param {fon-sizeCSS} font_size the font size to be set 
 */
SuperComponent.prototype.setFontSize = function( font_size ) {
  this._font_size=font_size;
  
  var i;
  for( i in this._childs ) {
    this._childs[i].setFontSize( font_size );
  }
  
}




/**
 * Returns the supercomponent's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
SuperComponent.prototype.getFontSize = function() {return this._font_size;}



/**
 *  Modifies the supercomponent and his childs font color
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
SuperComponent.prototype.setFontColor = function( color ) {
	this._font_color=color;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontColor(color);
	  }
}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
SuperComponent.prototype.getFontColor = function() {return this._font_color;}



/**
 *  Modifies the supercomponent and his childs font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  family that will be assigned to the component
 */
SuperComponent.prototype.setFontFamily = function( family ) {
	this._font_family=family;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontFamily(family );
	  }
}




/**
 * Returns the supercomponent's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current supercomponent's font family
 */
SuperComponent.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
SuperComponent.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontStyle(font_style);
	  }

}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
SuperComponent.prototype.getFontStyle = function() {
	return this._font_style;
	}



/**
 * Modifies the component's font weight 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight 
 * @param {font-weight CSS}  font weight  that will be assigned to the component
 */
SuperComponent.prototype.setFontWeight  = function( font_weight  ) {
	this._font_weight =font_weight ;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontWeight (font_weight );
	  }

}




/**
 * Returns the component's font weight 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method getFontWeight 
 * @return {font-weightCSS} Current component's font weight 
 */
SuperComponent.prototype.getFontWeight  = function() {
	return this._font_weight ;
	}