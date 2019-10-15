/**
 ** MODULE NAME: 
 **	  Dialog.js
 **
 ** DESCRIPTION:
 **   Class that draws a dialog box to communicate something to the user
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




/**
 * Dialog constructor class. Defines functions to show 
 * dialogs's text to the user in differents situations
 *
 * @author Rafael Molina linares
 * @update 5/09/2011
 *
 * @class Dialog
 *
 */

var Dialog = function(params) {
	params = params || {};

	this._text = params.text || '';
	this._cancelable = params.cancelable || false;
	this._active = false;
}



/**
 * Shows a dialog that notify to the user some actions to perform.
 * This actions must be confirmed by the user.
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method show
 * @params {Function} fn Actions to apply when the user press the button 'ok'
 * @params {String} nameInput Indicates the text that must be included in a element 'input', 
															whose value can be changed and used by the actions of the parameter 'fn'
 */

Dialog.prototype.show = function(fn, nameInput) {

	//Initialize the value of the parameters
	var nameInput = nameInput || null;

	//Ensures that the dialog box can be shown twice to the same time
	if( this._active ) {
	  return;
	}
	
	//Sets the true the attribute 'active'
	this._active = true;

	//Ensure that the text that will appear in the dialog box be of type string
	if(!(typeof this._text === 'string'))
		return false;

	that = this;

  //Div that contains the modified fields of the component
	var div = document.createElement("div");
	div.className = "ud_popup";
	
	var form = document.createElement("form");

	//Create the 'ok' button and its properties
	var ok = document.createElement("input");
	ok.setAttribute( "type" , "submit" );
	ok.setAttribute( "value", "OK" );

	var elem;
	var divaux;

	//Create the elements contained within the form
  divaux = document.createElement( 'div' );		

	//Adds the text that contains the text 
	divaux.appendChild( document.createTextNode( this._text ) );
	
	//Create a form with the a text field that can be modified
	if(nameInput){
		var divInput = document.createElement( 'div' );		  
		var form = document.createElement( 'form' );
		var input;
		input = document.createElement("input");
    input.setAttribute( 'type', 'text' );
    input.setAttribute( 'value', nameInput);
		divInput.appendChild( input );
		form.appendChild( divInput);
	}

	//Function asociated to click event of 'ok' button
	this.acceptText = function ( event ) {
			
	  document.body.removeChild( div );

		//Call to function passed like parameter		
		(nameInput) ? fn(input.value) :	fn();

		that._active = false;
	}
	ok.addEventListener("click", this.acceptText, false); 

	form.onsubmit = function() { return false; }
	form.appendChild( ok );
	
	//If the object is deletable, show the button
	if( this._cancelable ) {
		
		//Creates a input element and its properties
	  var no = document.createElement("input");  
	  no.setAttribute( "type", "submit" );
	  no.setAttribute( "value", "cancel" );
	  
		//Function associated to click event of button 'no'
	  this.deleteDialog = function ( event ) {
      document.body.removeChild( div );		
			that._active = false;
	  }

		//Adds the event 'click' to the button 'no'
	  no.addEventListener("click", this.deleteDialog, false);   
	  form.appendChild( no );
	}

	//Adds the elements to the HTML document
	div.appendChild( divaux );	
	div.appendChild( form );
	document.body.appendChild( div );
	
	ok.focus();
	
	//Center the form
	div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
	div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

	return true;
}


