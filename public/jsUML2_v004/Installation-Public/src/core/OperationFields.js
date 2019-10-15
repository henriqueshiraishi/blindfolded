/**
 ** MODULE NAME: 
 **	  OperationFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of fields of operation for an element of UML 2.
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

//= require <CollapsibleFields>
//= require <OperationItem>



/**
 * Constructor de la clase OperationFields
 * Representa un conjunto de campos de operación con las restricciones
 * que requiere, para un elemento de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @class OperationFields
 * @extends CollapsibleFields
 */
var OperationFields = function( params ) {
  params = params || {};
  OperationFields.baseConstructor.call( this, params );
}
JSFun.extend( OperationFields, CollapsibleFields );



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo OperationItem
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method newItem
 * @return {OperationItem} Nuevo objeto del componente
 */
OperationFields.prototype.newItem = function() {
  return new OperationItem({ text: 'new_operation()' });
}



