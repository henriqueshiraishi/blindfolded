/**
 ** MODULE NAME: 
 **	  Space.js
 **
 ** DESCRIPTION:
 **   Component that has an empty white vertical within a node.
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

//= require <Component>



/**
 * Constructor de la clase Space
 * Componente que ocupa un vacio vertical en blanco dentro de un nodo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Space
 * @extends Component
 * @param {Number} height Altura que ocupa el componente
 */
var Space = function( params ) {
  params = params || {};
  Space.baseConstructor.call( this, params );

  if( params.height ) {
    this.setHeight( params.height || 0 );
  }
}

JSFun.extend( Space, Component );
