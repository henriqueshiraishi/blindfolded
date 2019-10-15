/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Use Case diagram constructor defines restrictions on what items can be added.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     002 - Apr 2013 - AAH - Fourth version release 
 **	    001 - Oct 2012 - AAH - Third version release
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


//= require <../modules/usecase/UseCaseDiagram>


/**
 * Constructor de la clase UMLUseCaseDiagram
 * Representa un diagrama de casos de uso de UML 2
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 2/12/2010 / 19/04/2013
 *
 * @class UMLUseCaseDiagram
 * @extends Diagram
 */
var UMLUseCaseDiagram = function( params ) {
  var f = new UseCaseDiagram( params );
  f.setType( 'UMLUseCaseDiagram' );
  f.setName( 'Use case diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLActor', 'UMLUseCase',
                        'UMLUseCaseExtended','UMLUseCaseClassifier', 'UMLSystem',
                        'UMLSubSystem', 'UMLCommunication', 'UMLExtend',
                        'UMLInclude', 'UMLGeneralization', 'UMLGeneralizationSet',
                        'SetLine' ] );
  
  return f;
}
