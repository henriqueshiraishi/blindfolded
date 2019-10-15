/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Package diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	000 - DEC 2012 - AAH - Fourth Release
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


//= require <../modules/package/PackageDiagram.js>


/**
 * Constructor de la clase UMLPackageDiagram
 * Representa un diagrama de pauetes de UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class UMLPackageDiagram
 * @extends Diagram
 */
var UMLPackageDiagram = function( params ) {
  var f = new PackageDiagram( params );

  f.setType( 'UMLPackageDiagram' ); 
  f.setName( 'Package diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLPackage',
                        'UMLPackageContainer', 'UMLPackageMerge', 'UMLPackagePublicImport',
                        'UMLPackagePrivateImport','UMLDependency',] );
  
  return f;
}
