/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of class diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **	    Alejandro Arrabal Hidalgo (AAH)
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	    000 - Apr 2013 - AAH - Fourth version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2012 The authors
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



//= require <../modules/generic/UMLStereotype>
//= require <../modules/generic/StereotypeTagList>

//= require <../modules/instances/Instance>
//= require <../modules/instances/Link>




/**
 * Constructor de la clase UMLAssociation
 * Representa una relación de asociación de UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @class UMLLink
 * @extends Relation
 */
var UMLLink = function( params ) {
  var f = new Link( params );
  f.setType( 'UMLLink' );
  
  f.addComponentStereotype();
  var component=new InstanceItem({ id: 'name', centered: true, margin: 3 })
  f._addComponent( component );
  f._name=component;
  f.setComponentMultiplicityA();
  f.setComponentMultiplicityB();

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);
  
  f.setLine( new SolidLine() );
  return f;
}




/**
 * UMLInstance class Constructor 
 * Represents a object of UML2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @class UMLInstance
 */
var UMLInstance = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Instance( params );
  f.setType( 'UMLInstance' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new InstanceItem({ id: 'name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb'}));
  f.getComponents()[0].setUnderlineText(true);

  //Add item to contextual menu
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
								getStereotypeProperties(f).showTagValuesDialog();
								f.removeContextualMenu();},'Tag value'],
						[function(){
								getStereotypeProperties(f).showApplyStereotypesDialog();
								f.removeContextualMenu();},'Apply Stereotype'],
						[function(){
								getStereotypeProperties(f).showStereotypesDialog();
								f.removeContextualMenu();},'Show Stereotype']	]);

	return f;
}