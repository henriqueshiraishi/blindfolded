/**
 ** MODULE NAME: 
 **	  Text.js
 **
 ** DESCRIPTION:
 **   Component that controls a text field that the user can't edit.
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
 **    002 - Agu 2012 - AAH -
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
//= require <Component>



/**
 * Text class constructor.
 * Creates a 'item' that controls a text's field not editable
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 1/11/2010	/08/08/2012
 *
 * @class Text
 * @extends Component
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 * @param {String} text that will be set
 */
var Text = function( params ) {
  params = params || {};
  Text.baseConstructor.call( this, params );
  
  //Font properties
  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this._line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');  
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal');  
  this.setText( params.text || '' ); 
}
JSFun.extend( Text, Component );



/**
 * Modifies the  value of the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method setValue
 * @param {String} value Text that will be assigned to the object
 */
Text.prototype.setValue = function( value ) {
  this.setText( value );
}



/**
 * Returns the value of the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method getValue
 * @return {String} Text that contains the object
 */
Text.prototype.getValue = function() {
  return this._text;
}



/**
 * Modifica el texto almacenado en el objeto
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 11/2011 / 02/08/2012
 *
 * @method setText
 * @param {String} newText New text that will contained the object
 */
Text.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {
    
    this._text = newText;
    
    if( newText == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( this._text.length * this._font_width );
      else
        this.setWidth( this._text.length * this._font_width );
    }
  
    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
  }
}



/**
 * Draws the text in the canvas element
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 9/11/2011 / 27/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Text.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

  if(this._orientation){
    context.translate(this._getMX() + this._line_height / 2, this._getMY() );
    context.rotate((-90 * Math.PI)/180 );
    context.fillText( this._text, this._margin*2 - this.getHeight(), 0 );  
  } else {
   if(this._text)context.fillText( this._text, this._getMX(), 
                    this._getMY() + this._line_height / 2 );
  }
  

  context.restore();
}




/**
 * Modifies the component's font size and fit the line height
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
Text.prototype.setFontSize = function( font_size ) {
	this._font_size=font_size;
	this.resize();
	
}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
Text.prototype.getFontSize = function() {return this._font_size;}



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
Text.prototype.setFontColor = function( color ) {
	this._font_color=color;
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
Text.prototype.getFontColor = function() {return this._font_color;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
Text.prototype.setFontFamily = function( font_family ) {
	this._font_family=font_family;
}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
Text.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Re-size the component depending on his text and font-size
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
Text.prototype.resize = function( ) {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
	var text = this.getValue() || "";
	
    if(  text == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( text.length * this._font_width );
      else
        this.setWidth( text.length * this._font_width );
    }
  
    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
}




/**
 * Modifies the component's font style
  context.restore();
}


 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
Text.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
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
Text.prototype.getFontStyle = function() {
	return this._font_style;
	}




/**
 * Modifies the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight
 * @param {font-weightCSS}  font weight that will be assigned to the component
 */
Text.prototype.setFontWeight = function( font_weight ) {
	this._font_weight=font_weight;
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
Text.prototype.getFontWeight = function() {
	return this._font_weight;
	}



/**
 * Gets a XML node with the information of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
Text.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );
  
  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }

  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  xmlcomp.setAttribute( 'value', this.getValue() );
  return xmlcomp;
}


