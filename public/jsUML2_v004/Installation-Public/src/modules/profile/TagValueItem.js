/**
 ** MODULE NAME: 
 **	  TagValueItem.js
 **
 ** DESCRIPTION:
 **   Defines a component that represents an item to a tag value
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
 * TagValueItem class Constructor
 * Creates a  'item' that controls a tag value to a stereotype object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class TagValueItem
 * @extends TextBox
 */
var TagValueItem = function( params ) {

  params = params || {};
  TagValueItem.baseConstructor.call( this, params );
  
  var expression = '^([a-zA-Z_0-9]*)?(?:\:([a-zA-Z_0-9]*))?$';     
  
  this._parse = new RegExp( expression );
  
  this.setMinWidth( 40 );
}
JSFun.extend( TagValueItem, TextBox );




/**
 * Encode the text of the resulting operation from its separate elements 
 * and returns the encode operation with the corresponding symbols
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method encode
 * @protected 
 * @param {Array} values Elements of the operation
 * @return {String} Operation that represents
 */

TagValueItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += values[0];
  }
  if( values[1] ) {
    string +=  ':' + values[1];
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_attribute';
  }
}



/**
 * Separates a string that contains a operation in its different
 * parts according to the regular expression that controls it 
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method decode
 * @protected
 * @param {String} operation Operation in chain's text
 * @param {Array} Elements of the operation separated
 */
TagValueItem.prototype.decode = function( attr ) {
  
  var result = this._parse.exec( attr );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}


/**
 * Returns the name of the tag value
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getNameTagValue
 */

TagValueItem.prototype.getNameTagValue = function(){
	return this.decode(this._text)[0];
}


/**
 * Returns the default value of the tag value
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getDefaultValue
 */

TagValueItem.prototype.getDefaultValue = function(){
	return this.decode(this._text)[1];
}



/**
 * Shows a dialog to modify the tag value's elements by user
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 */

TagValueItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }
  
  var that = this;
  this.active = true;
  
	//Creates the div and form
  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];
  var i;  

  div.className = "ud_popup";
  
  // Create the input elements
  for( i = 0; i < 2; i++ ){
    fields.push( document.createElement("input") );
  }
  

  //Creates the 'ok' button and defines its attributes
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  //Decodes the value of the component
  var values = this.decode( this.getValue() );
  
	//Sets the value of the inputs
  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }
  

	//Function to the click event of the 'ok' buttom
  this.changeText = function ( event ) {
    if( that.active ) {
      
      var values = [];
      
      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }
                  
      that.setText(  that.encode( values ) );
      
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

	//Dialog's close
	this.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		}
	}
 

  form.onsubmit = function() { return false; }
  
  ok.addEventListener("click", this.changeText, false);
  
  
	//Defines the corresponding labels of the inputs 
  var labels = [ 'tag value', 'default value' ];
  
  var label;
  var divaux;
  
	//Adds the labels and inputs to the form
  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );
    
    divaux.appendChild( label );
    divaux.appendChild( fields[i] );
    
    form.appendChild( divaux );
  }

  
  form.appendChild( ok );
  
  //If the object is deletable, show the button
  if( this.deletable ) {
    var no = document.createElement("input");  
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );
    
    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);   
    form.appendChild( no );
  }
  
	//Adds the form and div to the document HTML
  div.appendChild( form );
  document.body.appendChild( div );
  
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



/**
 * Checks if the component has been pressed and performs the corresponding actions
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method select
 * @param {Number} x Coordinate x of where you clicked
 * @param {Number} y Coordenate y of where you clicked
 * @return {Boolean} If the point is over the tag value or some of its elements
 */

TagValueItem.prototype.select = function( x, y ) {  
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;
  } else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5 
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;
  
  }
  
  return TagValueItem.base.select.call( this, x, y );

}



/**
 * Draws the shape of the tag value component, specifically 
 * the buttons to move the tag values vertically
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
TagValueItem.prototype.drawShape = function( context ) {
 
  var x = this.getPixelX() + this.getSuperWidth() - 35;
  var y = this.getPixelY() + 3;
  
  context.save();
  
  context.fillStyle = "#0000aa";
  
  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + 10, y );
  context.lineTo( x + 5, y + 7 );
  context.closePath();
  context.fill();
  
  
  x = x + 10;  
  context.beginPath();
  context.moveTo( x + 5, y );
  context.lineTo( x, y + 7 );
  context.lineTo( x + 10, y + 7 );
  context.closePath();
  context.fill();
 

  context.restore();
}
