/**
 ** MODULE NAME: 
 **	  RoleItem.js
 **
 ** DESCRIPTION:
 **   Create a component with the contents of a role of UML.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **can
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

//= require <TextBox>



/**
 * Constructor de la clase RoleItem
 * Crea un 'item' que controla un texto de tipo rol restringiendo
 * sus valores a los permitidos para el rol de una relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RoleItem
 * @extends TextBox
 */
var RoleItem = function( params ) {
  params = params || {};
  RoleItem.baseConstructor.call( this, params );
  
  this._parse = /^([#|+|\-|~])?([\/])?(.*)?$/;
}
JSFun.extend( RoleItem, TextBox );



/**
 * Codifica el texto del rol resultante a partir de sus elementos 
 * separados y devuelve el rol codificado para poder ser mostrado
 * al usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected 
 * @param {Array} values Elementos que componen el rol
 * @return {String} Rol que contiene
 */
RoleItem.prototype.encode = function( values ) {
  
  var string = '';
  
  if( values[0] ) {
    string += values[0];
  }
  if( values[1] ) {
    string += values[1];
  }
  if( values[2] ) {
    string += values[2];
  }

  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_role';
  }
}



/**
 * Separa una cadena que contiene un rol en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario, se devuelven
 * en un Array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} role Rol que se va a separar
 * @return {Array} Elementos que componen el rol separados
 */
RoleItem.prototype.decode = function( role ) {
  var result = this._parse.exec( role );
  
  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra una ventana para modificar los elementos del rol por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
RoleItem.prototype.showDialog = function() {
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
  for( i = 0; i < 3; i++ ){
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
  
  fields[1] = document.createElement('select');
  sel = document.createElement('option');
  sel.value='';
  sel.appendChild( document.createTextNode('no') );
  fields[1].appendChild( sel );
  sel = document.createElement('option');
  sel.value='/';
  sel.appendChild( document.createTextNode('yes') );
  fields[1].appendChild( sel );

  
  var ok = document.createElement("input");
  div.className = "ud_popup";
  
  var values = this.decode( this.getValue() );
  
  for( i = 0; i < fields.length; i++ ) {
    fields[i].type='text';
    fields[i].value= values[i] || '';
  }
  
  
  if( values[0] ) {
    var childs = fields[0].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[0] ) {
        childs[i].selected='selected'; 
      }
    }
  }
  if( values[1] ) {
    var childs = fields[1].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[1] ) {
        childs[i].selected= 'selected'; 
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
  
  
  var labels = [ 'visibility', 'derived', 'role' ];
  
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



