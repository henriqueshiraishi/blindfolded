/**
 ** MODULE NAME: 
 **	  StereotypeFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of editable text fields by the user with the representation
 **   of a group of stereotypes of UML 2.
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

//= require <TextFields>
//= require <StereotypeItem>



/**
 * Constructor de la clase StereotypeFields
 * Representa un conjunto de campos de texto editables por el usuario
 * con la representación de un estereotipo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StereotypeFields
 * @extends TextFields
 */
var StereotypeFields = function( params ) {
  params = params || {};
  StereotypeFields.baseConstructor.call( this, params );

  this.setMinHeight( 1 );
  this.setMinWidth( 1 );
  this.setHeight( 1 );
  this.setWidth( 1 );

}

JSFun.extend( StereotypeFields, TextFields );



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo StereotypeItem
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method newItem
 * @return {StereotypeItem} Nuevo objeto del componente
 */
StereotypeFields.prototype.newItem = function() {
  return new StereotypeItem({ text: '\xABstereotype\xBB', orientation : this._orientation || 0 });
}

