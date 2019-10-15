/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Component diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
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


//= require <../modules/component/ComponentDiagram>


var UMLComponentDiagram = function( params ) {
  var f = new ComponentDiagram( params );
  f.setType( 'UMLComponentDiagram' );
  f.setName( 'Component diagram' );
  
  f.setValidElements(  [ 'UMLNote', 'UMLLine','UMLArtifact','UMLClass', 'UMLComComponent', 'UMLComposition',
                          'UMLInterface', 'UMLInterfaceExtended', 'UMLInterfaceUsage',
                          'UMLInterfaceRealization', 'UMLPort', 'UMLGeneralization',
                          'UMLGeneralizationSet','SetLine', 'UMLDependency',
                          'UMLRealization', 'UMLInterfaceExtended', 'UMLConnector',
                          'UMLNAssociation', 'UMLAssociation','UMLInterfaceUse',
                          'UMLPackage', 'UMLPackageContainer' ]  );

  return f;
}
