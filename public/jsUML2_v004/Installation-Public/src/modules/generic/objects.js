/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Contains elements which are in more of a UML 2 diagram.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Feb 2011 - MVL - Second version release
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


//= require <../modules/generic/Line>
//= require <../modules/generic/Note>




/**
 * Constructor de la clase UMLNote
 * Representa una nota de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLNote
 * @extends Rectangular
 */
var UMLNote = function( params ) {
  var f = new Note( params );
  f.setType( 'UMLNote' );
  
  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );
  

  f.addFigure( new NoteFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true  }) );
  f.addComponent( new TextArea({ id: 'description', text: 'Note', centered: true, margin: 5 }) );
  
  //Add item to contextual menu
  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);

  return f;
}



/**
 * Constructor de la clase UMLLine
 * Representa una linea simple
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLLine
 * @extends Relation
 */

var UMLLine = function( params ) {
  var f = new Line( params );
  f.setType( 'UMLLine' );
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setLine( new DashedLine() );
  
  return f;
}



