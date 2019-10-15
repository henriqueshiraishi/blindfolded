/**
 ** MODULE NAME: 
 **	  AttributeItem.js
 **
 ** DESCRIPTION:
 **   Represents a object that controls an attribute of UML 2
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
 * Constructor de la clase AttributeItem
 * Crea un 'item' que controla un texto de tipo atributo de clase
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class AttributeItem
 * @extends TextBox
 */
var AttributeItem = function( params ) {

  params = params || {};
  AttributeItem.baseConstructor.call( this, params );
  
  var expression = '^(?:\xAB([^\xAB\xBB:={}\\x5B\\x5D]+)\xBB)?'  //stereotype
                   + '([-|#|+|~])?'                  //visibility
                   + '([\/])?'                        //derived
                   + '([^\xAB\xBB:={}\\x5B\\x5D]+)?'            //name
                   + '(?::([^\xAB\xBB:={}\\x5B\\x5D]+))?'       //type
                   + '(?:=([^\xAB\xBB:={}\\x5B\\x5D]+)?)?'      //default
                   + '(?:\\x5B([^\xAB\xBB:={}\\x5B\\x5D]+)\\x5D)?' //multiplicity
                   + '(?:{([^\xAB\xBB:={}\\x5B\\x5D]+)})?$';    //restrictions
                   
  //this._parse = /^(?:\xAB([^\xAB\xBB:={}]+)\xBB)?([#|+|\-|~])?([\/])?([^\xAB\xBB:={}]+)?(?::([^\xAB\xBB:={}]+))?(?:=([^\xAB\xBB:={}]+)?)?(?:{([^\xAB\xBB:={}]+)})?$/;
  
  this._parse = new RegExp( expression );
  
  this.setMinWidth( 40 );

}
JSFun.extend( AttributeItem, TextBox );



/**
 * Codifica el atributo resultante a partir de sus elementos separados
 * y devuelve el atributo compuesto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected 
 * @param {Array} values Elementos que componen el atributo
 * @return {String} Atributo que contiene
 */
AttributeItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += '\xAB' + values[0] + '\xBB';
  }
  if( values[1] ) {
    string += values[1];
  }
  if( values[2] ) {
    string += values[2];
  }
  if( values[3] ) {
    string += values[3];
  }
  if( values[4] ) {
    string += ':' + values[4];
  }
  if( values[5] ) {
    string += '=' + values[5];
  }
  if( values[6] ) {
	    string += '[' + values[6] + ']';
	  }
  if( values[7] ) {
    string += '{' + values[7] + '}';
  }
  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_attribute';
  }
}



/**
 * Separa una cadena que contiene el un atributo en sus diferentes partes
 * en función de la expresión regular que lo controla y devuelve las
 * partes en un array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @param {String} attr Atributo completo en cadena de texto
 * @param {Array} Elementos que componen el atributo separados
 */
AttributeItem.prototype.decode = function( attr ) {
  
  var result = this._parse.exec( attr );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra un dialogo para modificar los elementos del atributo por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
AttributeItem.prototype.showDialog = function() {
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
  for( i = 0; i < 8; i++ ){
    fields.push( document.createElement("input") );
  }
  
  var sel;  
  fields[1] = document.createElement('select');
  
  sel = document.createElement('option');
  sel.value='';
  sel.appendChild( document.createTextNode('(none)') );
  fields[1].appendChild( sel );
  
  sel = document.createElement('option');
  sel.value='+';
  sel.appendChild( document.createTextNode('+ (public)') );
  fields[1].appendChild( sel );
  
  sel = document.createElement('option');
  sel.value='-';
  sel.appendChild( document.createTextNode('- (private)') );
  fields[1].appendChild( sel );
  
  sel = document.createElement('option');
  sel.value='#';
  sel.appendChild( document.createTextNode('# (protected)') );
  fields[1].appendChild( sel );
  
  sel = document.createElement('option');
  sel.value='~';
  sel.appendChild( document.createTextNode('~ (package)') );
  fields[1].appendChild( sel );
  
  fields[2] = document.createElement('select');
  sel = document.createElement('option');
  sel.value='';
  sel.appendChild( document.createTextNode('no') );
  fields[2].appendChild( sel );
  sel = document.createElement('option');
  sel.value='/';
  sel.appendChild( document.createTextNode('yes') );
  fields[2].appendChild( sel );

  
  var ok = document.createElement("input");
  /**/
  
  //div.style.position = "fixed";
  div.className = "ud_popup";

  
  var values = this.decode( this.getValue() );
  
  for( i = 0; i < fields.length; i++ ) {
    fields[i].type='text';
    fields[i].value=values[i] || '';
  }
  
  
  if( values[1] ) {
    var childs = fields[1].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[1] ) {
        childs[i].setAttribute( 'selected', 'selected' ); 
      }
    }
  }
  if( values[2] ) {
    var childs = fields[2].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[2] ) {
        childs[i].setAttribute( 'selected', 'selected' ); 
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
  
  
  var labels = [ 'stereotype', 'visibility', 'derived', 'name', 'type', 'default','multiplicity', 'restrictions' ];
  
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
 * Comprueba si se ha pulsado sobre una parte del atributo y ejectua
 * las acciones pertienentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada x de la pulsación
 * @param {Number} y Coordenada y de la pulsación
 * @return {Boolean} Si el punto está sobre el atributo o alguno de sus elementos
 */
AttributeItem.prototype.select = function( x, y ) {  
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
  
  return AttributeItem.base.select.call( this, x, y );

}



/**
 * Dibuja la silueta del atributo, concretamente los botones para desplazar
 * los atributos verticalmente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
AttributeItem.prototype.drawShape = function( context ) {

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
