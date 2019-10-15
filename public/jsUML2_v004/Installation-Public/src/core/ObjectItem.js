/**
 ** MODULE NAME: 
 **	  ObjectItem.js
 **
 ** DESCRIPTION:
 **   This class represents a field of a object element of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
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
//= require <TextBox>
//= require <JSGraphic>
//= require <Point>
//= require <Element>



/**
 * ObjectItem class constructor. Creates a 'item' that 
 * controls a text that contains information about a
 * object element of a activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class ObjectItem
 * @extends TextBox
 */
var ObjectItem = function( params ) {

  params = params || {};
		
	//Call to the base method
  ObjectItem.baseConstructor.call( this, params );

	//Regular expression that must comply the text of the component		
  this._parse = /^([a-zA-Z]*)(?:\:([^\:\{\}]*))?(?:\{([a-zA-Z]*)\})?$/;  
}
JSFun.extend( ObjectItem, TextBox );



/**
 * Encodes the text of operation resulting from its 
 * separate elements and returns the encoded 
 * operations with the simbols corresponding
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected 
 * @param  {Array}  values Elements of the operation
 * @return {String} Operation resulting
 *
 */
ObjectItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += values[0] ;
  }

  if( values[1] ) {
    string += ':' + values[1];
  }
  
  if( values[2] ) {
    string += '{' + values[2] + '}';
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a string that contains the operation with 
 * its different parts according to the regular 
 * expresion that controls it and returns the separate 
 * parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} value Operation in text's chain
 * @param {Array} Separate elements of the operation  
 */
ObjectItem.prototype.decode = function( value ) {  
  var result = this._parse.exec( value );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the 
 * operation by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 *
 */
ObjectItem.prototype.showDialog = function() {

	//Ensures that the dialog isn't shown twice to the user
  if( this.active ) {
    return;
  }
  
	//Stored the current object in a local variable
  var that = this;

	//Sets the true the attribute 'active'
  this.active = true;
  
  //Div that contains the modified fields of the component
  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];
   
  //Create the fields of the component
  var i;
  for( i = 0; i < 3; i++ ){
    fields.push( document.createElement("input") );
  }
    
	//Create the button 'ok' and its properties
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

	//Decode the text of the component in its separates elements 
  var values = this.decode( this.getValue() );
  
	//Sets the value that have the fields of the component
  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }
  
	//Function associated to the click event of the 'ok' buttom
  this.changeText = function ( event ) {
    if( that.active ) {
      
      var values = [];
      
      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

 			//Sets the text encoded of the component
      that.setText(  that.encode( values ) );

			//Removes the div shown to the user      
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }
 
	//Function to the close of the dialog
  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

	//Prevents the information from the form to be sent
  form.onsubmit = function() { return false; }
  
	//Adds the event click to the button 'ok'
  ok.addEventListener("click", this.changeText, false);
  
  //Text nodes that will appear next the elements 'input'   
  var labels = [ 'name', 'class', 'state'];
  
  var label;
  var divaux;
  
	//Creates the tag of the elements 'input'
  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );
    
    divaux.appendChild( label );
    divaux.appendChild( fields[i] );
    
    form.appendChild( divaux );
  }

  //Adds button 'ok' to the form
  form.appendChild( ok );
  
  //If the object is deletable, shows the button
  if( this.deletable ) {

		//Create the button 'no' and its properties
    var no = document.createElement("input");  
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );
    
		//Function associated to the click event of the 'no' buttom
    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

	  //Adds event 'click' to the button 'no'
    no.addEventListener("click", this.deleteDialog, false);   

	  //Adds button 'no' to the form
    form.appendChild( no );
  }
  
	//Adds elements to the HTML document
  div.appendChild( form );
  document.body.appendChild( div );
  
  ok.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



