/**
 ** MODULE NAME: 
 **	  DataStoreItem.js
 **
 ** DESCRIPTION:
 **   Component that defines a dataStore element of activity diagram
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
//= require <JSGraphic>
//= require <Point>
//= require <Element>
//= require <TextBox>



/**
 * DataStoreItem constructor class.
 * Creates a item of text to a datastore element of the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class DataStoreItem
 * @extends TextBox
 */
var DataStoreItem = function( params ) {

  params = params || {};
  DataStoreItem.baseConstructor.call( this, params );

	//Regular expression that must comply the text of the component
  this._parse = /^([a-zA-Z]*)(?:\[([^\[\]]*)\])?$/;  
}
JSFun.extend( DataStoreItem, TextBox );



/**
 * Encodes the text of the operation resulting from its separate elements
 * and returns the encoded operation with the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected 
 * @param {Array} values Elements that form the operation
 * @return {String} Operation resulting
 */
DataStoreItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += values[0] ;
  }

  if( values[1] ) {
    string += '[' + values[1] + ']';
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
 * @param {String} transition Operation in text's chain
 * @param {Array} Elements that form the 'transition' operation
 *
 */
DataStoreItem.prototype.decode = function( transition ) {  

  var result = this._parse.exec( transition );
  
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
 */
DataStoreItem.prototype.showDialog = function() {

	//Ensures that the dialog isn't shown twice to the user
  if( this.active ) {
    return;
  }
  
  var that = this;

	//Sets the true the attribute 'active'
  this.active = true;
  
  //Div that contains the modified fields of the component
  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];
  
  
  //Create form 
  var i;
  for( i = 0; i < 2; i++ ){
    fields.push( document.createElement("input") );
  }
    
	//Create the 'ok' button and its properties
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "OK" );

	//Decodes the text of the component in its different fields
  var values = this.decode( this.getValue() );
  
	//Put the value of the different fields of the component
  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }
      
	//Function asociated to click event of 'ok' buttom
  this.changeText = function ( event ) {
    if( that.active ) {
      
      var values = [];
      
      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }
    
			//Sets the code of encoded form              
      that.setText(  that.encode( values ) );
      
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }
 
  form.onsubmit = function() { return false; }
  
	//Adds the click event to the 'ok' button
  ok.addEventListener("click", this.changeText, false);
  
  
  var labels = [ 'name', 'state'];
  
  var label;
  var divaux;

	//Adds the div element that contains the fields of the component to the form  
  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );
    
    divaux.appendChild( label );
    divaux.appendChild( fields[i] );
    
    form.appendChild( divaux );
  }

	//Adds 'ok' button element to form  
  form.appendChild( ok );
  
  //If the object is deletable, show the button
  if( this.deletable ) {
    var no = document.createElement("input");  
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );
    
		//Function asociated to click event of 'ok' buttom
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
  
	//Adds form to div
  div.appendChild( form );

	//Adds div to the HTML document
  document.body.appendChild( div );
  
  ok.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



