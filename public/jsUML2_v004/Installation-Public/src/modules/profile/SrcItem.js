/**
 ** MODULE NAME: 
 **	  SrcItem.js
 **
 ** DESCRIPTION:
 **   This class represents a field  of text to introduce a archive's route.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares
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
 * SrcItem class Constructor
 * Creates a 'item' that insert a route of a archive
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class SrcItem
 * @extends TextBox
 */
var SrcItem = function( params ) {

  params = params || {};
  SrcItem.baseConstructor.call( this, params );
  
  this._parse = /^path(?:\:\/([a-zA-Z\:\_\.\/\\0-9 ]*))?$/;  

 this.setMinWidth( 50 );
}
JSFun.extend( SrcItem, TextBox );



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

SrcItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += 'path:/' + values[0];
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'no icon ';
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

SrcItem.prototype.decode = function( operation ) {  
  var result = this._parse.exec( operation );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Shows a dialog to modify the operation's elements by user
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 */


SrcItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }
  
  var that = this;
  this.active = true;
  
	//Create the div,form and inputs 
  var div = document.createElement("div");
  var form = document.createElement("form");
  var field = document.createElement("input");

	//Create the 'ok' button and its attributes
  var ok = document.createElement("input");    
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  div.className = "ud_popup";

	//Decode the text of the component
  var values = this.decode( this.getValue() );
  

	//Set the value of the input
  field.setAttribute( 'type', 'text' );
  field.setAttribute( 'value', values[0] || '' );

  
  

	//Functions of the click event associated to 'ok' button
  this.changeText = function ( event ) {
    if( that.active ) {
      
      var values = [];
      
      values.push( field.value );
                  
      that.setText(  that.encode( values ) );
      
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
      that.notifyDraw();
    }
  }

	//Dialog's close
	this.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		  that.notifyDraw();
		}
	}
 

  form.onsubmit = function() { return false; }
  
  ok.addEventListener("click", this.changeText, false);
  
   
  var label;
  var divaux;
  
	//Adds the element to the document HTML
  divaux = document.createElement( 'div' );
  label = document.createElement( 'label' );
  label.appendChild( document.createTextNode( 'Icon path (absolute path)' ) );
  
  divaux.appendChild( label );
  divaux.appendChild( field );
  
  form.appendChild( divaux );


  
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
        that.notifyDraw();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);   
    form.appendChild( no );
  }
  
  div.appendChild( form );
  document.body.appendChild( div );

	//Set the focus to the input  
	field.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}


/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares
 * @update 19/11/2011
 *
 * @method setText
 * @param {String} newText New text that contains the object
 */
SrcItem.prototype.setText = function( newText ) {

	//Only can be set the newText if is of type string
  if( JSFun.isString( newText ) ) {
    


		//Saves if the text of the component has been modified
		var modifiedText = (this._text != newText) ? true : false;

    this._text = newText;

		/*
			If the text has changed, the figure of the object Stereotype 
			(parent of the component) is removed, and is drawn 
			the new figure 
		*/
		if(modifiedText){

			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];
			for(var i in diagrams){
				nodes = diagrams[i]._nodes;
				for(var j=0;j<nodes.length;j++){
					if(nodes[j]._stereotypeProperties && this._parent){

						/*
							If the node has the same type than some of the metaclasses of the '_metaclass' array
							of the stereotype, the figure of the object Stereotype is updated
						*/

						if(this._parent._validMetaclass(nodes[j].getType())){
							nodes[j]._stereotypeProperties.removeFigure(this._parent);
							if(nodes[j]._stereotypeProperties._shownStereotype == '\xAB' + this._parent.getName() + '\xBB')
								nodes[j]._stereotypeProperties.drawStereotype(this._parent);
						}
					}
				}
			}
		}




		//If the length of text is higher than 20, only is taking in account the top twenty positions
    var len = (this._text.length > 20) ? 20 : this._text.length;

		//If the new text is empty
    if( newText == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( len * this.font_width );
      else
        this.setWidth( len * this.font_width );
    }
  
    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
  }
}


/**
 * Draw the text of component and your background if the interaction is produced with youself
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

SrcItem.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();
  
	//Draw the background of the component when a dialog's textbox is opened
  if( this.active ) {
    context.fillStyle = "#ffc485";
    context.fillRect( this.getPixelX(),
                      this.getPixelY(), 
                      this.getWidth(), 
                      this.getHeight() );
  }
  
  context.restore();


	//Draw the text of the component
  context.save();
  
  context.font = this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

	var text = this._text;
	if(!text)text="";

	//If the length of the component's text is higher than 20
  if( text.length > 20 ) {
    text = text.substring(0, 17 );		//si es demasiado largo se ponen puntos suspensivos
    text += '...';
  }

  if(this._orientation){	//Vertical orientation of text

    context.translate(this._getMX() + this._line_height / 2, this._getMY() );
    context.rotate((-90 * Math.PI)/180 );
    context.fillText( text, this._margin*2 - this.getHeight(), 0 );  
  } else {//horizontal orientation of text
    context.fillText( text, this._getMX(), this._getMY() + this._line_height / 2 );
  }
  
  context.restore();
}




