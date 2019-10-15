/**
 ** MODULE NAME: 
 **	  SpecificationItem.js
 **
 ** DESCRIPTION:
 **   Component that defines the specification of a state UML 2
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo(AAH)
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
//= require <TextBox>
//= require <Component>



/**
 * SpecificationItem Class Constructor.
 * Create a component that represent the specifications of the state UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class SpecificationItem
 * @extends TextBox
 *
 */
var SpecificationItem = function( params ) {

  params = params || {};
  SpecificationItem.baseConstructor.call( this, params );

  var expression = '^(entry/)?' //behavior type 
	  + '([a-zA-Z]*)?'            //name
	  + '(;do/)?'              		//behavior type
	  + '([a-zA-Z]*)?'            //name
	  + '(;exit/)?'		        		//behavior type
	  + '([a-zA-Z]*)?$';          //name         

	//Regular expression that must comply the text of the component		
  this._parse = new RegExp( expression );	

	//Entry, do and exit behaviors 
  this._behaviors = new Array();

	//Visibility of the component
  this._visible = params.visible || false;

	//Set the minimal width
  this.setMinWidth( 100 );

	//Allows that the component can be remove
	this.setDeletable();
}
JSFun.extend( SpecificationItem, TextBox );



/**
 * Encodes the component's text from its separate items 
 * and returns the resulting text of the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected 
 * @param {Array} values Elements that compounds the component
 * @return {String} Operation resulting
 */
SpecificationItem.prototype.encode = function( values ) {

	var string = '';

	//Items of entry behavior
	if( values[0] ) {
		this._behaviors[0] = values[0];
		string += 'entry/';
	}
	if( values[1] ) {
		string += values[1];
	}

	//Items of ongoing behavior
	if( values[2] ) {
		this._behaviors[1] = values[2];	
		string += ';do/';
	}

	if( values[3] ) {
		string += values[3];
	}

	//Items of exit behavior
	if( values[4] ) {
		this._behaviors[2] = values[4];	
		string += ';exit/';
	}

	if( values[5] ) {
		string += values[5];
	}

	//Ensure that the resulting string comply the regular expression
	if( this._parse.exec( string ) ) {
		return string;
	} else {
		return 'wrong_attribute';
	}
}



/**
 * Split a char string that contains the different parts of the component
 * according to the regular expression that controls and returns the
 * array's parts
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @param {String} specification Full text of the component in a chain
 * @param {Array}  differents elements that compounds the full text of the component
 */
SpecificationItem.prototype.decode = function( specification ) {
	
	//Ensure that the resulting string complies the regular expression
	var result = this._parse.exec( specification );

	if( result ) {
		result.shift();

		return result;
	} else {
		return [];
	}
}



/**
 * Generates a xml node with information of component
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent node of xml tree that is generated
 * @return {DOMNode Node with the information of component
 */
SpecificationItem.prototype.getComponentXML = function( parent ) {
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
  xmlcomp.setAttribute( 'behaviors', this._behaviors );
  xmlcomp.setAttribute( 'visible', this._visible );
  return xmlcomp;
}



/**
 * Modify the component's value
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method setValue
 * @param {String} value Text that will be asigned to object
 */
SpecificationItem.prototype.setValue = function( value, behaviors, visible) {

	//Set the behavior of 'entry', 'do' and 'exit'
	if(behaviors){
		this._behaviors[0] = behaviors[0];
		this._behaviors[1] = behaviors[2];	
		this._behaviors[2] = behaviors[4];	
	}

	//Set the visibility of the component
	this._visible = (visible == "true") ? true : false ;

	//Set the text of the component
  this.setText( value );
}



/**
 * Modify the text that contains the component
 * 
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method setText
 * @protected
 * @param {String} newText String that contains the new text
 */
SpecificationItem.prototype.setText = function( newText ) {

	//Ensures that the new text is of type String
  if( JSFun.isString( newText ) ) {

    var i, width = 0;

		//Separates the text by character ';'
    var aux = newText.split(';');

		//Searchs the maximal width between its separated parts
    for( i = 0; i < aux.length; i++ ) {

      if( aux[i].length > width )
        width = aux[i].length;
    }
    
		//Set the text of the component in its separated parts
    this._text = aux; 
    
		//Set the width of the component
    if( newText == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }
    
		//Set the height of the component
    this.setHeight( this._text.length * this._line_height );
  }
}


/**
 * Returns the text that contains the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method getValue
 * @return {String} Text contained in the component
 */
SpecificationItem.prototype.getValue = function() {
 if(!this._text) return "";
  return this._text.join(';');
}



/**
 * Checks if the given point is over the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the component
 */
SpecificationItem.prototype.isOver = function( x, y ) {

  if( x >= this._x 
      && x <= this._x + this._width
      && y >= this._y
      && y <= this._y + this._height
			&& this._visible ) 
  {
    return true;
  } else {
    return false;
  }
}


/**
 * Show a dialog for that the elements of attribute can be modified
 * by users
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 */
SpecificationItem.prototype.showDialog = function() {

	//Ensures that the dialog isn't shown twice to the user
	if( this.active || !this._visible) {
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
	for( i = 0; i < 6; i++ ){
		fields.push( document.createElement("input") );
	}
		
	//Create the button 'ok' and its properties
	var ok = document.createElement("input");
	ok.setAttribute( "type" , "submit" );
	ok.setAttribute( "value", "OK" );

	var sel;  

	/*
		Creates the options of the element 
		select that store the behavior
	*/
	for(i=0; i< 6; i += 2){

		fields[i] = document.createElement('select');

		sel = document.createElement('option');
		sel.value='0';
		sel.appendChild( document.createTextNode('<UNSPECIFIED>') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='1';
		sel.appendChild( document.createTextNode('Activity') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='2';
		sel.appendChild( document.createTextNode('FunctionBehavior') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='3';
		sel.appendChild( document.createTextNode('Interaction') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='4';
		sel.appendChild( document.createTextNode('OpaqueBehavior') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='5';
		sel.appendChild( document.createTextNode('ProtocolStateMachine') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.value='6';
		sel.appendChild( document.createTextNode('StateMachine') );
		fields[i].appendChild( sel );
	}

	//Decode the text of the component in its separates elements 
	var values = that.decode( that.getValue() );

	//Sets the value that have the fields of the component
	for( i = 0; i < fields.length; i++ ) {
		fields[i].type='text';
		fields[i].value=values[i] || '';
	}

	//Select the value of the behavior 'entry'
	if( values[0] ) {
		var childs = fields[0].childNodes;
		for( i=0;i< childs.length;i++ ) {
		  if( childs[i].value ==  that._behaviors[0]) {
		    childs[i].selected='selected'; 
		  }
		}
	}

	//Select the value of the behavior 'do'
	if( values[2] ) {
		var childs = fields[2].childNodes;
		for( i=0;i< childs.length;i++ ) {
		  if( childs[i].value ==  that._behaviors[1]) {
		    childs[i].selected='selected'; 
		  }
		}
	}

	//Select the value of the behavior 'exit'
	if( values[4] ) {
			  var childs = fields[4].childNodes;
				for( i=0;i< childs.length;i++ ) {
			    if( childs[i].value ==  that._behaviors[2]) {
			      childs[i].selected='selected'; 
			    }
			  }
			}  

	//Function associated to the click event of the 'ok' buttom
	that.changeText = function ( event ) {
		if( that.active ) {
		  
		  var values = [];
		  for( i = 0; i < fields.length; i++) {
		    values.push( fields[i].value );
		  }
		             
 			//Sets the text encoded of the component 
		  that.setText(  that.encode( values ) );

			//Removes the div shown to the user      
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		  that._parent.updateComponents();
		  that._parent.notifyDraw();

		}
	}

	//Function to the close of the dialog
	that.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();

		  that.notifyDraw();	

		}
	}

	//Prevents the information from the form to be sent
	form.onsubmit = function() { return false; }

	//Adds the event click to the button 'ok'
	ok.addEventListener("click", that.changeText, false);

  //Text nodes that will appear next the elements 'input' 
	var labels = [ 'Behavior', 'name', 'Behavior', 'name', 'Behavior', 'name', 'restrictions' ];

	var label;
	var divaux;
	var titles = ['Entry', 'Do Activity', 'Exit'];
	var j= -1;

	//Creates the tag of the elements 'input'
	for( i = 0; i < fields.length; i++ ) {
		if(i%2 == 0){
			divaux = document.createElement( 'div' );
			divaux.appendChild( document.createTextNode(titles[++j]));
			divaux.style.background = "#ccccff";
			divaux.style.textAlign = "center";
			divaux.style.fontWeight= "bold";
			divaux.style.marginLeft = "-10px";
			divaux.style.marginRight = "-10px";
			divaux.style.font = "14px";
			divaux.style.paddingTop = "3px";
			divaux.style.paddingBottom = "3px";
			form.appendChild( divaux);
		}
		divaux = document.createElement( 'div' );
		label = document.createElement( 'label' );
		label.appendChild( document.createTextNode( labels[i] ) );
		
		divaux.appendChild( label );
		divaux.style.clear = "both";
		divaux.appendChild( fields[i] );
		
		form.appendChild( divaux );
	}

  //Adds button 'ok' to the form
	form.appendChild( ok );

	//If the object is deletable, shows the button
	if( that.deletable ) {

		//Create the button 'no' and its properties
		var no = document.createElement("input");  
		no.setAttribute( "type", "submit" );
		no.setAttribute( "value", "delete" );

		//Function associated to the click event of the 'no' buttom		
		that.deleteDialog = function ( event ) {

			if( that.active ) {

				//Removes the div that shows the dialog
				document.body.removeChild( div );
				that.active = false;

				//Changes the visibility of the component
				that._visible = false;

				//Removes the text of the component
				that.setText( "" );

				//Notify changes and draws again
				that.notifyChange();
				that.notifyDraw();
			}
		}

	  //Adds event 'click' to the button 'no'
		no.addEventListener("click", that.deleteDialog, false);   

		//Adds button 'no' to the form
		form.appendChild( no );

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
 * Draw the shape and the elements of component that can interact with the user.
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SpecificationItem.prototype.drawShape = function( context ) {

 	if(this._visible){

		context.save();
		context.strokeStyle = "#aaaaaa";

		context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
		context.restore();
 }
}



/**
 * Draw the component text and your background if interaction is produced with it 
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SpecificationItem.prototype.draw = function( context ) {

	//The component is only drawn if is visible
 	if(!this._visible)
		return;

  context.save();

	//Sets the properties of the text to draw
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();
  
  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();
  var ax = 0;
  
  var i;

	//Draws the text of the component
  for( i = 0; i < this._text.length; i++ ) {
    ax = x + w / 2 - ( this._text[i].length * this._font_width ) / 2;
    context.fillText( this._text[i], ax, y );
    y += this._line_height;
  }

  context.restore();
}




/**
 * Re-size the component depending on his text and font-size
 * 
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
SpecificationItem.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;	
	//Ensures that the new text is of type String
    var i, width = 0;

		//Separates the text by character ';'
    var aux = this.getValue().split(';') || "";

		//Searchs the maximal width between its separated parts
    for( i = 0; i < aux.length; i++ ) {

      if( aux[i].length > width )
        width = aux[i].length;
    }

    
		//Set the width of the component
    if( aux == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }
    
		//Set the height of the component
    this.setHeight( aux.length * this._line_height );
}