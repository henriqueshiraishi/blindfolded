/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Deployment diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	000 - Mar 2013 - AAH - First version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2013 The authors
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

//= require <../modules/deployment/DeploymentDiagram>

/**
 * Constructor of the class UMLDeploymentDiagram
 * Represents an deployment diagram of UML2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 * @class UMLDeploymentDiagram
 * @extends Diagram
 */
var UMLDeploymentDiagram = function( params ) {

  var f = new DeploymentDiagram( params );

  f.setType( 'UMLDeploymentDiagram' );
  f.setName( 'Deployment diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLAssociation','UMLDependency', 'UMLGeneralization', 'UMLGeneralizationSet',
                        'SetLine','UMLNAssociation', 'AssociationN','UMLArtifact','UMLInstance','UMLNode','UMLNodeTextNotation','UMLDeploymentSpecification','UMLManifestation','UMLDeployment'] );

  return f;
}
