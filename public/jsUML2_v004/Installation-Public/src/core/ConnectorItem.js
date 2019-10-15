/**
 ** MODULE NAME: 
 **	  ConnectorItem.js
 **
 ** DESCRIPTION:
 **   Component that defines a textBox to the connector element of the activity diagram
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Agu 2012 - AAH - 
 ** 	000 - Sep 2011 - RML - Initial version release
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
//= require <TextBox>
//= require <Point>
//= require <Element>




/**
 * ConnectorItem class constructor, create 'item' that controls a text 
 * of the connector element in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class ConnectorItem
 * @extends TextBox
 */
var ConnectorItem = function( params ) {

  params = params || {};
  ConnectorItem.baseConstructor.call( this, params );
}
JSFun.extend( ConnectorItem, TextBox );



/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method setText
 * @param {String} newText New text that will contained the object
 */

ConnectorItem.prototype.setText = function( newText ) {

	//Ensures that newText is of type string
  if( JSFun.isString( newText ) ) {
    
    this._text = newText;

		/*
			Sets the height/width of the component according
			to the width of the words of the text. 
		*/    
    if( newText == "" ) {

			//vertical orientation 
      if(this._orientation)
        this.setHeight( 14 );
      else //horizontal orientation
        this.setWidth( 14 );
    } else {

			//vertical orientation 
      if(this._orientation)
        this.setHeight( this._text.length * this._font_width );
      else //horizontal orientation
        this.setWidth( this._text.length * this._font_width );
    }
  
		/*
			Sets the height/width of the component according
			to the height of the words of the text. 
		*/    
    if(this._orientation)//vertical orientation
      this.setWidth(this._line_height );
    else
      this.setHeight( this._line_height );
  }
}



/**
 * Re-size the component depending on his text and font-size
 * 
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
ConnectorItem.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
	var aux=this.getValue();
	if(!aux)aux="";
		/*
			Sets the height/width of the component according
			to the width of the words of the text. 
		*/    
    if( aux == "" ) {

			//vertical orientation 
      if(this._orientation)
        this.setHeight( 14 );
      else //horizontal orientation
        this.setWidth( 14 );
    } else {

			//vertical orientation 
      if(this._orientation)
        this.setHeight( aux.length * this._font_width );
      else //horizontal orientation
        this.setWidth( aux.length * this._font_width );
    }
  
		/*
			Sets the height/width of the component according
			to the height of the words of the text. 
		*/    
    if(this._orientation)//vertical orientation
      this.setWidth(this._line_height );
    else
      this.setHeight( this._line_height );
}




/**
 * Gets the text stored in the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/09/2012
 *
 * @method getValue
 * @return {String} _text the text stored in the object
 */
ConnectorItem.prototype.getValue = function(){
	return this._text;
}