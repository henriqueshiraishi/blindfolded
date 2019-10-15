/**
 ** MODULE NAME: 
 **	  StereotypeItem.js
 **
 ** DESCRIPTION:
 **   Define a component that manages a stereotype of UML 2.
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

//= require <TextBox>



/**
 * Constructor de la clase StereotypeItem
 * Crea un 'item' que controla un estereotipo de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StereotypeItem
 * @extends TextBox
 */
var StereotypeItem = function( params ) {
  params = params || {};
  StereotypeItem.baseConstructor.call( this, params );
  
  this._parse = /^\xAB(.*)\xBB$/;

	if(this._orientation)//vertical orientation
	  this.setMinHeight( 40 );
	else
	  this.setMinWidth( 40 );
}
JSFun.extend( StereotypeItem, TextBox );



/**
 * Codifica el texto del componente para un estereotipo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @param {String} value Cadena con el valor del estereotipo sin codificación
 * @return {String} Linea de texto del componente
 */
StereotypeItem.prototype.encode = function( value ) {
  var string = '';
  
  if( value ) {
    string += '\xAB' + value + '\xBB';
  }
  
  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_stereotype';
  }
}



/**
 * Separa una cadena que contiene un texto en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} Valor que se va decodificar según la lógica del estereotipo
 * @return {String} Valor del estereotipo sin formato
 */
StereotypeItem.prototype.decode = function( string ) {
 
  var result = this._parse.exec( string );
  
  if( result ) {
    result.shift();
    return result[0];
  } else {
    return '';
  }

}


