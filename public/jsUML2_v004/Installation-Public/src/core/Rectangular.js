/**
 ** MODULE NAME: 
 **	  Rectangular.js
 **
 ** DESCRIPTION:
 **   Define a node with the behavior and the shape of a rectangle.
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

//= require <Node>



/**
 * Constructor de la clase Rectangular
 * Define un nodo con el comportamiento y la forma de un rectángulo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 7/11/2010
 *
 * @class Rectangular
 * @extends Node
 */
var Rectangular = function( params ) {
  params = params || {};
  Rectangular.baseConstructor.call( this, params );
}

JSFun.extend( Rectangular, Node );


Rectangular.prototype.setElementXML = function( xmlnode ) {
	Rectangular.base.setElementXML.call(this ,xmlnode);
}