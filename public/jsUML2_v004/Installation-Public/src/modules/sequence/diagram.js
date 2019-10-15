/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   Sequence diagram constructor defines restrictions on what items can be added.
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


//= require <../modules/sequence/SequenceDiagram>


/**
 * UMLSequenceDiagram class constructor
 * Represents the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLSequenceDiagram
 * @extends SequenceDiagram
 */

var UMLSequenceDiagram = function( params ) {
  var f = new SequenceDiagram ( params );
  f.setType( 'UMLSequenceDiagram' );
  f.setName( 'Sequence diagram' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLCreate', 'UMLDestroy', 
												'UMLLifeline', 'UMLCallMessage', 'UMLSendMessage', 
												'UMLDeleteMessage', 'UMLReplyMessage', 'UMLOption', 
												'UMLAlternative', 'UMLLoop', 'UMLBreak', 'Region', 
												'TimeInterval' ] );
  
  return f;
}




