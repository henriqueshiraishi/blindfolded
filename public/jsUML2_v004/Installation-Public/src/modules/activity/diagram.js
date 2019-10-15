/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Contains the activity diagram of UML 2
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Sep 2011 - RML - Second version release
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


//= require <../modules/activity/ActivityDiagram>


/**
 * UMLActivityDiagram class constructor
 * Represents a diagram of activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class UMLActivityDiagram
 * @extends ActivityDiagram
 */
var UMLActivityDiagram = function( params ) {
  var f = new ActivityDiagram( params ); 
  f.setType( 'UMLActivityDiagram' );
  f.setName( 'Activity diagram' );
  
  f.setValidElements( [ 'UMLAcceptEventAction', 'UMLTimeEvent', 'UMLAction', 
												'UMLObject', 'UMLActivity',  'UMLFlow', 'UMLActivityFinal', 
												'UMLInitialNode' ,  'UMLFlowFinal' ,  'UMLDecision_MergeNode', 
												'UMLDataStore', 'UMLFork_JoinNode', 'UMLSendSignalAction', 
												'UMLConnectorActivity', 'UMLHorizontalSwimlane','UMLVerticalSwimlane', 
												'UMLVerticalSwimlane', 'UMLHorizontalHierarchicalSwimlane',
												'UMLVerticalHierarchicalSwimlane', 'UMLExceptionHandler', 
												'Region', 'Swimlane', 'UMLPin', 'UMLParameterNode', 
												'UMLExpansionNode','UMLNote', 'UMLLine'] );

  return f;
}
