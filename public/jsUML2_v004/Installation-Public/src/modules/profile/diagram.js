/**
 ** MODULE NAME: 
 **	  diagram.js
 **
 ** DESCRIPTION:
 **   profile constructor defines restrictions on what items can be added.
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


//= require <../modules/profile/ProfileDiagram>



/**
 * Constructor de la clase UMLClassDiagram
 * Representa un diagrama de clases de UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLProfile
 * @extends ProfileDiagram
 */

var UMLProfile = function( params ) {
  var f = new ProfileDiagram( params );
  f.setType( 'UMLProfile' );
  f.setName( 'Profile' );
  
  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLMetaclass', 'UMLExtension', 'UMLStereotype' ] );

  return f;
}
