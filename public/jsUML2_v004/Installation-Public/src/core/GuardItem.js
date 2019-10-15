/**
 ** MODULE NAME: 
 **	  GuardItem.js
 **
 ** DESCRIPTION:
 **   Component that defines a guard of UML 2
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

//= require <Point>
//= require <Element>
//= require <TextArea>


/**
 * GuardItem Class Constructor
 * Creates a 'item' that controls the text of a guard UML 2.
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @class GuardItem
 * @extends TextArea
 */
var GuardItem = function( params ) {

  params = params || {};
  GuardItem.baseConstructor.call( this, params );
  
	//Regular expression that must comply the text of the component
  this._parse = /^(?:\[([^\[\]\;]*)\])?$/;  

	//Sets the minimal width of the component
  this.setMinWidth( 15 );
}
JSFun.extend( GuardItem, TextArea );



/**
 * Encodes the text of the operation resulting from its separate elements
 * and returns the encoded operation with the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected 
 * @param {Array} value Element that form the text of the guard
 * @return {String} Elements encoded in a only string
 */
GuardItem.prototype.encode = function( value ) {
  
  var string = '[]';
  
  if( value ) {
    string = '[' + value + ']';
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a chain that contains a operations in its differents 
 * elements according to the regular expresion that controls it 
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} guard Operation in text's chain
 * @param {Array} Elements that form the 'guard' operation
 *
 */
GuardItem.prototype.decode = function( guard ) {  
  var result = this._parse.exec( guard );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the operation 
 * by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 *
 */
GuardItem.prototype.showDialog = function() {

	//Stored the current object in a local variable
  var that = this;

	//Ensures that the dialog isn't shown twice to the user
  if( this.active ) {
    return;
  }

	//Sets the true the attribute 'active'
  this._active = true;
  
  //Div that contains the modified fields of the component
  var div = document.createElement('div');
  div.className = 'ud_popup';

  var form = document.createElement('form');
  var textArea = document.createElement('textarea');
  textArea.setAttribute( 'rows', 5 );
  textArea.setAttribute( 'cols', 30 ); 

	//Create the button 'ok' and its properties
  var ok = document.createElement('input');
  ok.setAttribute( 'type' , 'submit' );
  ok.setAttribute( 'value', 'OK' );

	//Create the button 'no' and its properties
  var no = document.createElement('input');
  no.setAttribute( 'type', 'submit' );
  no.setAttribute( 'value', 'No' );

	//Put the value of the component in the element text area 
  textArea.value = this.decode( this._text.join('\n') );
 
	//Function asociated to click event of 'ok' buttom	
  this.changeText = function ( event ) {
    if( that._active ) {
      that.setText( that.encode(textArea.value) );
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }
  
	//Function asociated to click event of 'no' buttom	
  this.closeDialog = function ( event ) {
    if( that._active ) {
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }
  
	//Add event click to the 'ok' and 'no' button
  ok.addEventListener('click', this.changeText, false);
  no.addEventListener('click', this.closeDialog, false);
    
	//Adds the elements to the HTML document 
  form.appendChild( textArea );
  form.appendChild( ok );
  form.appendChild( no );
  div.appendChild( form );
  document.body.appendChild( div );
  
  textArea.focus();

  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + 'px';
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + 'px';
}



/**
 * Draws the component's text and your background if the interaction is produced
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 08/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
GuardItem.prototype.draw = function( context ) {

	//Ensures that the component isn't drawn if isn't visible
	if(!this._visible)
		return;

  context.save();

  if( this._active ) {
    context.fillStyle = '#ffc485';
    context.fillRect( this._getX(), this._getY(), this.getWidth(), this.getHeight() );
  }
  
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();
  
  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();
  
  var i;
  
  for( i = 0; i < this._text.length; i++ ) {
    context.fillText( this._text[i], x, y );
    y += this._line_height;
  }
  context.restore();
}
