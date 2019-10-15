/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of profile diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Oct 2012 - AAH - Third version release.
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


//= require <../modules/profile/Metaclass>
//= require <../modules/profile/MetaclassItem>
//= require <../modules/profile/TagValueFields>
//= require <../modules/profile/SrcItem>
//= require <../modules/profile/StereotypeNameItem>




/**
 * UMLMetaclass class constructor
 * Represents a metaclass of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLMetaclass
 * @extends Metaclass
 */
var UMLMetaclass = function( params ) {
  var f = new Metaclass( params );
  f.setType( 'UMLMetaclass' );
  
  f.setMoveable();

  f.setWidth( 80 );
  f.setHeight( 30 );
  
	//Adds figures and component to the element
  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );  
	f.addComponent( new StereotypeItem({ id: 'stereotype', text: '\xABmetaclass\xBB' , selected: true, centered:true}) );
  f.addComponent( new MetaclassItem({ id: 'name', text: 'MetaClass name', centered: true, margin: 3 }) );
  
  //Add item to contextual menu
  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);

  return f;
}



/**
 * UMLStereotype class constructor
 * Represents a stereotype object of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLStereotype
 * @extends Stereotype
 */
var UMLStereotype = function( params ) {
  var f = new Stereotype( params );
  f.setType( 'UMLStereotype' );
  
  f.setWidth( 100 );
  f.setHeight( 40 );
  
  f.setMoveable();
  
	//Adds the figures and components of the element
  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
	f.addComponent( new StereotypeItem({ id: 'stereotype', text: '\xABstereotype\xBB' , selected: true, centered: true}) );
	f.addComponent( new StereotypeNameItem({ id: 'name', text: 'stereotype name', centered:true }) );
	f.addComponent( new Separator({ id: 'separator', centered: true}) );
  f.addComponent( new TagValueFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new SrcItem({ id: 'src', text: 'path:/', margin: 3 }) );

  //Add item to contextual menu
  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);
  
  return f;
}


/**
 * UMLExtension class constructor
 * Represents a relatin of extension of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLExtension
 * @extends Extension
 */
var UMLExtension = function( params ) {
  var f = new Extension( params );
  f.setType( 'UMLExtension' );

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setLine( new SolidLine() );
  f.setEnd( new CloseTip({color: '#000000'}) );
  
  return f;
}

