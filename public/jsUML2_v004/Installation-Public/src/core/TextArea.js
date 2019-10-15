/**
 ** MODULE NAME: 
 **	  TextArea.js
 **
 ** DESCRIPTION:
 **   Component that controls a text with line breaks that the user can to edit.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Agu 2012 - AAH -
 ** 	000 - Feb 2011 - MVL - First version release
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

//= require <Component>



/**
 * Constructor de la clase TextArea
 * Crea un 'item' que muestra un texto con saltos de linea
 * editable por el usuario
 *
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/ 08/08/2012
 *
 * @class TextArea
 * @extends Component
 * 
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 * @param {String} text Texto por defecto que contendrá el componente desde su creación
 */
var TextArea = function( params ) {
  params = params || {};
  TextArea.baseConstructor.call( this, params );
  
  //this._text = [];
  this.setText( params.text || '' );
  this._active = false; 
  //Font properties
  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this.line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');  
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal');
}
JSFun.extend( TextArea, Component );



/**
 * Muestra un dialogo para modificar el texto del componente por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 * @protected
 */
TextArea.prototype.showDialog = function() {
  var that = this;
  this._active = true;
  
  var div = document.createElement('div');
  var form = document.createElement('form');
  var textArea = document.createElement('textarea');

  var ok = document.createElement('input');
  var no = document.createElement('input');
  
  div.className = 'ud_popup';

  textArea.setAttribute( 'rows', 5 );
  textArea.setAttribute( 'cols', 30 ); 
  textArea.value = this._text.join('\n');
 
  ok.setAttribute( 'type' , 'submit' );
  ok.setAttribute( 'value', 'OK' );
  
  no.setAttribute( 'type', 'submit' );
  no.setAttribute( 'value', 'Cancel' );

  this.changeText = function ( event ) {
    if( that._active ) {
      that.setText( textArea.value );
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }
  
  this.closeDialog = function ( event ) {
    if( that._active ) {
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }
  
  ok.addEventListener('click', this.changeText, false);
  no.addEventListener('click', this.closeDialog, false);
    
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
 * Modifica el texto que contiene el componente
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/ 02/08/2012
 *
 * @method setText
 * @protected
 * @param {String} newText Cadena que contiene el nuevo texto
 */
TextArea.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {
    var i, width = 0;
    var aux = newText.split('\n');

    for( i = 0; i < aux.length; i++ ) {
      if( aux[i].length > width )
        width = aux[i].length;
    }
    
    this._text = aux;
    
    
    if( newText == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }
    
    this.setHeight( this._text.length * this._line_height );
  }
}



/**
 * Modifica el valor que contiene el componente, en este caso
 * el texto que contiene modificando los saltos de linea por ';'
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setValue
 * @param {String} value Nueva texto que contendrá el componente
 */
TextArea.prototype.setValue = function( value ) {
  value = value.replace( /;/gi, '\n' );
  this.setText( value );
}



/**
 * Devuelve el texto que conteiene en el componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method getValue
 * @return {String} Texto contenido en el componente
 */
TextArea.prototype.getValue = function() {
  return this._text.join(';');
}



/**
 * Compureba si se a pulsado sobre el componente y en caso de ser así
 * se muestra la ventana para modificar su valor
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 12/12/2012
 * 
 * @method select
 * @param {Number} x Coordenada del eje x del diagrama
 * @param {Number} y Coordenada del eje y del diagrama
 * @param {Number} radius  Radio donde es comprobado el punto
 * @return {Boolean} Si el punto está sobre el componente o no.
 */
TextArea.prototype.select =function( x, y, radius) {
	var r= radius || 0;
  if(  !this._active && this.isOver( x, y, r ) ) {
    this.showDialog( x, y );
    return true;
  } else {
    return false;
  }
}



/**
 * Dibuja el texto de componente y su fondo si se produce interacción con el mismo
 *
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 02/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextArea.prototype.draw = function( context ) {
	if(!this._visible)
		return;
  context.save();

  if( this._active ) {
    context.fillStyle = '#ffc485';
    context.fillRect( this._getX(), this._getY(), this.getWidth(), this.getHeight() );
  }
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = 'middle';
  context.fillStyle = this.getFontColor();
  if(this.getUnderlineText() && this.getUnderlineText()==true){
	  this.underline(context);
  }
 
  
  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();
  var ax = 0;
  
  var i;
  
  for( i = 0; i < this._text.length; i++ ) {
    ax = x + w / 2 - ( this._text[i].length * this._font_width ) / 2;
    context.fillText( this._text[i], ax, y );
    y += this._line_height;
  }
  context.restore();

}



/**
 * Dibuja la línea de contorno del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextArea.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  context.save();
  
  context.strokeStyle = '#aaaaaa';
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
  
  context.restore();
}



/**
 * Cierra la ventana de interaccion, en caso de encontrarse abierta y
 * para la interacción con el componente por parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method deselect
 */
TextArea.prototype.deselect = function() {
  if( this._active ) {
    this.closeDialog();
    this._active = false;
  }
}



/**
 * Modifies the component's font size and fit the line height
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
TextArea.prototype.setFontSize = function( font_size ) {
	this._font_size=font_size;
	this.resize();
}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
TextArea.prototype.getFontSize = function() {return this._font_size;}



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
TextArea.prototype.setFontColor = function( color ) {
	this._font_color=color;
}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
TextArea.prototype.getFontColor = function() {return this._font_color;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
TextArea.prototype.setFontFamily = function( font_family ) {
	this._font_family=font_family;
}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
TextArea.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Re-size the component depending on his text and font-size
 * 
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
TextArea.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
    var i, width = 0;
    var aux = this.getValue().split('\n') || "" ;

    for( i = 0; i < aux.length; i++ ) {
      if( aux[i].length > width )
        width = aux[i].length;
    }
    
    
    if( aux == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }
    
    this.setHeight( aux.length * this._line_height );
}




/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
TextArea.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
TextArea.prototype.getFontStyle = function() {
	return this._font_style;
	}



/**
 * Modifies the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight
 * @param {font-weightCSS}  font weight that will be assigned to the component
 */
TextArea.prototype.setFontWeight = function( font_weight ) {
	this._font_weight=font_weight;
}




/**
 * Returns the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method getFontWeight
 * @return {font-weightCSS} Current component's font weight
 */
TextArea.prototype.getFontWeight = function() {
	return this._font_weight;
	}



/**
 * Gets a XML node with the information of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
TextArea.prototype.getComponentXML = function( parent ) {
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
  return xmlcomp;
}

/**
 * Underline the text contained by the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method underline
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextArea.prototype.underline = function(context){
	  // checks if the text exist
      if(!this._text)return;
      // measure his width
      var width =context.measureText(this._text).width;
	  context.strokeStyle = this.getFontColor();
	  context.lineWidth = 1;
	  
	  //draw the underline
	  context.beginPath();
	  context.moveTo(this._getMX(),this._getMY()+(this.getFontSize()-1));
	  context.lineTo(this._getMX()+ width,this._getMY()+(this.getFontSize()-1));
	  context.stroke();
	}