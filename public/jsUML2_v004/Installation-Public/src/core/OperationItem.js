/**
 ** MODULE NAME: 
 **	  OperationItem.js
 **
 ** DESCRIPTION:
 **   This class represents a field of operation of UML 2.
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
//= require <JSGraphic>

//= require <Point>
//= require <Element>
//= require <TextBox>



/**
 * Constructor de la clase OperationItem
 * Crea un 'item' que controla un texto de tipo operación de una clase
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class OperationItem
 * @extends TextBox
 */
var OperationItem = function( params ) {
  params = params || {};
  OperationItem.baseConstructor.call( this, params );
  
  this._parse = /^([-|#|+|~])?([^:()]+)(?:\(([^()]+)?\))(?::([^:()]+))?$/;
  
  this.setMinWidth( 100 );
}
JSFun.extend( OperationItem, TextBox );



/**
 * Codifica el texto de la operación resultante a partir de sus elementos 
 * separados y devuelve la operación codificada con los símbolos pertinentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected 
 * @param {Array} values Elementos que componen la operación
 * @return {String} Operación que representa
 */
OperationItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += values[0] ;
  }
  if( values[1] ) {
    string += values[1];
  }
  
  if( values[2] ) {
    string += '(' + values[2] + ')';
  } else {
    string += '()';
  }
  
  if( values[3] ) {
    string += ':' + values[3];
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separa una cadena que contiene el una operación en sus diferentes partes
 * en función de la expresión regular que la controla y devuelve las
 * partes separadas en un array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} operation Operación en cadena de texto
 * @param {Array} Elementos que componen la operación separados
 */
OperationItem.prototype.decode = function( operation ) {  
  var result = this._parse.exec( operation );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra un dialogo para modificar los elementos de la operación por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
OperationItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }
  
  var that = this;
  this.active = true;
  
  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];
  
  
  /* Create form */
  var i;
  for( i = 0; i < 4; i++ ){
    fields.push( document.createElement("input") );
  }
  
  fields[0] = document.createElement('select');
  var sel = document.createElement('option');
  sel.value='';
  sel.appendChild( document.createTextNode('(none)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.value='+';
  sel.appendChild( document.createTextNode('+ (public)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.value='-';
  sel.appendChild( document.createTextNode('- (private)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.value='#';
  sel.appendChild( document.createTextNode('# (protected)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.value='~';
  sel.appendChild( document.createTextNode('~ (package)') );
  fields[0].appendChild( sel );
  

  var ok = document.createElement("input");
  div.className = "ud_popup";

  var values = this.decode( this.getValue() );
  
  for( i = 0; i < fields.length; i++ ) {
    fields[i].type='text';
    fields[i].value=values[i] || '' ;
  }
  
  
  if( values[0] ) {
    var childs = fields[0].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[0] ) {
        childs[i].selected='selected'; 
      }
    }
  }
  
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "OK" );
  


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
 


  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }
  
  ok.addEventListener("click", this.changeText, false);
  
  
  var labels = [ 'visibility', 'name', 'parameters', 'return' ];
  
  var label;
  var divaux;
  
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
  
  div.appendChild( form );
  document.body.appendChild( div );
  
  //field.focus();
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}



/**
 * Comprueba si se ha pulsado sobre una parte de la operación y ejectua
 * las acciones pertienentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada x de la pulsación
 * @param {Number} y Coordenada y de la pulsación
 * @return {Boolean} Si el punto está sobre la opración o alguno de sus elementos
 */
OperationItem.prototype.select = function( x, y ) {  
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
  
  return OperationItem.base.select.call( this, x, y );
}



/**
 * Dibuja la silueta del atributo, concretamente los botones para desplazar
 * las operaciones verticalmente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
OperationItem.prototype.drawShape = function( context ) {
 
	if(!this._visible)
		return;

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
