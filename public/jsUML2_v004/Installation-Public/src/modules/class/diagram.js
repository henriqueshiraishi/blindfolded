/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Class diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	  Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Oct 2012 - AAH - Second version release
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

//= require <../modules/class/ClassDiagram>

/**
 * Constructor de la clase UMLClassDiagram
 * Representa un diagrama de clases de UML 2
 *
 * @author Martín Vega-leal Ordóñez	/ Rafael Molina Linares	/Alejandro Arrabal Hidalgo
 * @update 2/12/2010								/ 5/12/2011		/28/08/2012
 * @class UMLClassDiagram
 * @extends Diagram
 */
var UMLClassDiagram = function( params ) {

  var f = new ClassDiagram( params );

  f.setType( 'UMLClassDiagram' );
  f.setName( 'Class diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine','UMLClass','UMLDataType', 'UMLComponent',
                        'UMLInstance', 'UMLInterfaceExtended', 'UMLPackage',
                        'UMLPackageContainer', 'UMLAggregation', 'UMLAssociation', 'UMLComposition',
                        'UMLDependency', 'UMLGeneralization', 'UMLRealization',
                        'UMLUsage', 'UMLPackageMerge', 'UMLPackagePublicImport',
                        'UMLPackagePrivateImport', 'UMLGeneralizationSet','SetLine','UMLNAssociation', 'AssociationN'] );

  return f;
}
