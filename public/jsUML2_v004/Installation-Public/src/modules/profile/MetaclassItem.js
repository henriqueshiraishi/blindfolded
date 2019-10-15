/**
 ** MODULE NAME: 
 **	  MetaclassItem.js
 **
 ** DESCRIPTION:
 **   Component that stores a line of text with the name of the a Metaclass object
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
 * TextBox class constructor
 * Component that stored the name of the metaclass
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Metaclass
 * @extends TextBox
 */
var MetaclassItem = function( params ) {

  params = params || {};
  MetaclassItem.baseConstructor.call( this, params );
}
JSFun.extend( MetaclassItem, TextBox );
  


/**
 * Modify the text stored in the object. When the text is change, all elements of the
 * '_diagram' array of the Metaclass object that are of the same type than the name of 
 * the metaclass, remove the stereotypes tags that have been created because of a 
 * stereotype object(this stereotype object must be in the _stereotypes array of the metaclass).
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setText
 * @param {String} newText New text that will contain the object
 */
MetaclassItem.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {

		/*
			If the text has changed, it is called to the removeStereotype method 
			and if this stereotype tag has been added to the node by existence of
			a stereotype object, the tag values and image associated 
			to this stereotype tag are remove
		*/
		if(this._text != newText){
			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];

			//Through all the diagrams
			for(var i in diagrams){
				nodes = diagrams[i]._nodes;
				
				for(var j=0;j<nodes.length;j++){
					//If the node has stereotyped properties 
					if(nodes[j]._stereotypeProperties && this._parent){

						//Call to method removeStereotype to each stereotype
						for(var k=0;k<this._parent._stereotypes.length;k++)
							nodes[j]._stereotypeProperties.removeStereotype(this._parent._stereotypes[k]);
					}
				}
			}
		}
			
		//Call to the base method 
		StereotypeTag.base.setText.call(this, newText);
  }
}


/**
 * Shows a dialog to modify the text of the component by the user
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 * @protected
 */


MetaclassItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }
  
  var that = this;
  this.active = true;
  
	//Creates the div,form,inputs and buttons
  var div = document.createElement("div");
  var form = document.createElement("form");
  var textField = document.createElement("input");
  var ok = document.createElement("input");

  
  //div.style.position = "fixed";
  div.className = "ud_popup";

  
  var sel;  
	//Create the defult option of the select element
  textField = document.createElement('select');

  sel = document.createElement('option');
  sel.setAttribute( 'value', 'Metaclass name' );
  sel.appendChild( document.createTextNode('none') );
  textField.appendChild( sel );

	//Create all the option contained in the array of valid metaclasses
	for(var i=0; i<this._parent._validMetaclassApp.length; i++){

		sel = document.createElement('option');
		sel.setAttribute( 'value', this._parent._validMetaclassApp[i][0]);
		sel.appendChild( document.createTextNode(this._parent._validMetaclassApp[i][0]) );

		//It is set the current option selected
		if(this._parent.getName() == this._parent._validMetaclassApp[i][1])
			sel.setAttribute('selected','selected');

		//Adds the option to the select element
		textField.appendChild( sel );
	}


  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );
		
	//Function to the click event of the 'ok' buttom
  this.changeText = function ( event ) {
    if( that.active ) {
      that.setText( that.encode( textField.value ) );
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
  
	//Adds event click to the buttom
  ok.addEventListener("click", this.changeText, false);
  
  form.appendChild( textField );
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
  
	//Adds form to div
  div.appendChild( form );
	//Adds div to HTML document 
  document.body.appendChild( div );
  
	//Set the focus in the select element
  textField.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
  
}

