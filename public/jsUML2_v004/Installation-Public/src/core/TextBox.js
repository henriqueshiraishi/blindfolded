/**
 ** MODULE NAME: 
 **	  TextBox.js
 **
 ** DESCRIPTION:
 **   Component that stores a line of text that the user can edit through
 **   the graphical interface.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
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

//= require <Text>

/**
 * Constructor de la clase TextBox
 * Un elemento TextBox, es un elemento que almacena una linea de texto
 * editable por el usuario mediante la interfaz gráfica
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class TextBox
 * @extends Text
 */
var TextBox = function( params ) {

  params = params || {};
  TextBox.baseConstructor.call( this, params );

  this.selected = params.selected || false;
  this.deletable = false;

  if(params.width)
    this._width = params.width;
}
JSFun.extend( TextBox, Text );



/**
 * Permite que un super-componente que contiene el campo de texto lo elimine
 * de su interior
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setDeleatable
 */
TextBox.prototype.setDeletable = function() {
  this.deletable = true;
}



/**
 * Comprueba que se ha pulsado sobre el componente y lanza las operaciones
 * pertinentes a la pulsación en caso de producirse
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 10/12/2012
 *
 * @method select
 * @param {Number} x Coordenada en el eje x de la pulsación
 * @param {Number} y Coordenada en el eje y de la pulsación
 * @param {Number} radius Radio donde es comprobado el punto
 * @return {Boolean} Si el punto está sobre el componente o no.
 */
TextBox.prototype.select = function( x, y, radius) {
	var r= radius || 0;
  if( !this.selected && this.isOver( x, y, r ) ) {

    this.showDialog( x, y );
    return true;
  } else {
    return false;
  }
}



/**
 * Cierra la ventana de interaccion, en caso de encontrarse abierta y
 * paraliza la interacción con el componente por parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method deselect
 */
TextBox.prototype.deselect = function() {  
  if( this.active ) {
    this.closeDialog();
    this.active = false;
  }
}



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
TextBox.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }
  
  var that = this;
  this.active = true;
  
  var div = document.createElement("div");
  var form = document.createElement("form");
  var textField = document.createElement("input");

  var ok = document.createElement("input");

  
  //div.style.position = "fixed";
  div.className = "ud_popup";

  textField.setAttribute( "type", "text" );
  textField.setAttribute( "value", this.decode( this.getValue() ) );
  
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "OK" );
  


  this.changeText = function ( event ) {
    if( that.active ) {
      that.setText( that.encode( textField.value ) );
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }
 
 

  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }
  
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
  
  div.appendChild( form );
  document.body.appendChild( div );
  
  textField.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
  
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
TextBox.prototype.drawShape = function( context ) {
	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = "#aaaaaa";
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
  context.restore();
}



/**
 * Dibuja el texto de componente y su fondo si se produce interacción con el mismo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextBox.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();
  
  if( this.active ) {
    context.fillStyle = "#ffc485";
    context.fillRect( this.getPixelX(),
                      this.getPixelY(), 
                      this.getWidth(), 
                      this.getHeight() );
  }
  
  context.restore();
  
  TextBox.base.draw.call( this, context );
}



/**
 * Codifica el texto del componente según se defina, para este componente concreto
 * no realiza ninguna acción sobre el valor del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @return {String} Linea de texto del componente
 */
TextBox.prototype.encode = function( value ) {
  return value;
}



/**
 * Separa una cadena que contiene un texto en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario, se devuelven
 * en un Array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} Valor que se va decodificar según la lógica del componente
 * @return {Array} Elementos que componen el componente separados
 */
TextBox.prototype.decode = function( value ) {
  return value;
}