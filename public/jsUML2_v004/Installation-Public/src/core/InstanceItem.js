/**
 ** MODULE NAME: 
 **	  InstanceItem.js
 **
 ** DESCRIPTION:
 **   This class represents a field of a instance element of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - MAY 2013 - AAH - Fourth version release
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
//= require <TextBox>
//= require <JSGraphic>
//= require <Point>
//= require <Element>



/**
 * InstanceItem class constructor. Creates a 'item' that 
 * controls a text, which contains information about a
 * instance element of a activity diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/01/2013
 *
 * @class InstanceItem
 * @extends TextBox
 */
var InstanceItem = function( params ) {

  params = params || {};
		
	//Call to the base method
  InstanceItem.baseConstructor.call( this, params );
  
  var expression = '^([^:=]+)?'            //name
	  + '(?:: ([^=:]+))?'            // Class
	  + '(?:= ([^=:]+))?$';          //Value  
	//Regular expression that must comply the text of the component		
  this._parse = new RegExp( expression );	
 
}
JSFun.extend( InstanceItem, TextBox );



/**
 * Encodes the text of operation resulting from its 
 * separate elements and returns the encoded 
 * operations with their corresponding symbols
 * and style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/01/2013
 *
 * @method encode
 * @protected 
 * @param  {Array}  values Elements of the operation
 * @return {String} Operation resulting
 *
 */
InstanceItem.prototype.encode = function( values ) {
  
	  var string = '';
	  
	  if( values[0] ) {
	    string += values[0];
	  }
	  if( values[1] ) {
	    string += ': '+values[1];
	  }
	  if( values[2] ) {
	    string += '= '+values[2];
	  }
	  if( this._parse.exec( string ) ) {
			this._underlineText='';
			if(values[0])this._underlineText += values[0] ;
			if(values[1]) this._underlineText += ': ' +values[1];
		    return string;
		  } else {
		    return 'wrong_instance';
		  }
  
}



/**
 * Separates a string that contains the instance with 
 * its different parts according to the regular 
 * expresion that controls it and returns the separate 
 * parts in an array
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/01/2013
 * 
 * @method decode
 * @protected
 * @param {String} value Operation in text's chain
 * @param {Array} Separate elements of the intance  
 */
InstanceItem.prototype.decode = function( value ) {  
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
 * instance by the user
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/01/2013
 * 
 * @method showDialog
 *
 */
InstanceItem.prototype.showDialog = function() {

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
  ok.setAttribute( "value", "OK" );

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
  var labels = [ 'name', 'classifier', 'value'];
  
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


/**
 * Underline the text contained by the instance
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 09/01/2013
 *
 * @method underline
* @param {CanvasRenderingContext2D} context Context of canvas
 */
InstanceItem.prototype.underline = function(context){
	  var auxText = this._underlineText;

      // measure his width
	  context.font=this.getFontSize() + "px " + this.getFontFamily();
      var width =context.measureText(auxText).width;
	  context.strokeStyle = this.getFontColor();
	  context.lineWidth = 1;
	  
	  //draw the underline
	  context.moveTo(this._getMX(),this._getMY()+(this.getFontSize()-1));
	  context.lineTo(this._getMX()+ width,this._getMY()+(this.getFontSize()-1));
	  context.stroke();
}



/**
 * Draw the component text and his shape
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 09/01/2013
 * 
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas
 */
InstanceItem.prototype.draw = function( context ) {
	if(!this._visible)
		return;
   //check the proprerty underline of the item, and perform the action needed
   if(this._underlineText)this.underline(context);
   InstanceItem.base.draw.call( this, context );
}



/**
 * Modify the component's value
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 09/01/2013
 *
 * @method setValue
 * @param {String} value Text that will be asigned to object
 */
InstanceItem.prototype.setValue = function( value) {

  //Set the text of the component
  InstanceItem.base.setValue.call( this, value );
  //Underline the two first values
  this.encode(value);
}