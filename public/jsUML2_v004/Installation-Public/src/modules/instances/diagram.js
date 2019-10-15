/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Instances diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Apr 2013 - AAH - Fourth version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2012 The authors
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

//= require <../modules/instances/InstanceDiagram>

/**
 * Constructor of UMLInstancesDiagram
 * Represents a instances diagram of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 * @class UMLInstancesDiagram
 * @extends Diagram
 */
var UMLInstanceDiagram = function( params ) {

  var f = new InstanceDiagram( params );

  f.setType( 'UMLInstanceDiagram' );
  f.setName( 'Instance diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLInstance', 'UMLLink'] );

  return f;
}
