/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   State Machine diagram constructor defines restrictions on what items can be added.
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


//= require <../modules/stateMachine/StateMachineDiagram>


/**
 * UMLStateMachineDiagram class constructor
 * Represents the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLStateMachineDiagram
 * @extends Diagram
 */
var UMLStateMachineDiagram = function( params ) {

  var f = new StateMachineDiagram( params );
  f.setType( 'UMLStateMachineDiagram' );
  f.setName( 'State Machine diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLInitialPseudostate' ,  
												'UMLFinalState', 'UMLTerminate','UMLEntryPoint', 
												'UMLExitPoint', 'UMLJunction', 'UMLSimpleState' , 
												'UMLCompositeState', 'UMLVerticalRegion','UMLHorizontalRegion', 
												'UMLTransition',  'Region'] );
  return f;
}
