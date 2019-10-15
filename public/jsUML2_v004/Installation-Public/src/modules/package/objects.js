/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of package diagram of UML 2.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	000 - Dec 2012 - AAH - Fourth Release
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



//= require <../modules/generic/UMLStereotype>
//= require <../modules/generic/StereotypeTagList>

//= require <../modules/class/Dependency>
//= require <../modules/class/Realization>
//= require <../modules/class/NAssociation>
//= require <../modules/class/GeneralizationSet>



/**
 * Constructor de la clase UMLPackage
 * Representa un paquete de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLPackage
 * @extends Rectangular
 */
var UMLPackage = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};
	
  var f = new Package( params );
  f.setType( 'UMLPackage' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );
  
  f.addFigure( new PackageFigure({ color: '#c0e1c2' }) );
  
  f.addComponent( new Space({ height: 16 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Package name', centered: true, margin: 3 }) );
  
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



/**
 * Constructor de la clase UMLPackageContainer
 * Representa un paquete que puede contener elementos de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLPackageContainer
 * @extends Rectangular
 */
var UMLPackageContainer = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new PackageContainer( params );
  f.setType( 'UMLPackageContainer' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );
  
  f.setMoveable();
  f.setContainer();
  
  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name', margin: 5, text: 'Package name' }) );

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


/**
 * Constructor de la clase UMLDependency
 * Representa una relación de dependencia de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLDependency
 * @extends Relation
 */
var UMLDependency = function( params ) {
  var f = new Dependency( params ); 
  f.setType( 'UMLDependency' );
  
  f.addComponentStereotype();
  f.setComponentName();
 
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}







/**
 * Constructor de la clase UMLPackageMerge
 * Representa una relación de combinación de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLPackageMerge
 * @extends Relation
 */
var UMLPackageMerge = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLPackageMerge' );

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  

  f.setStereotype( '\xABmerge\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}



/**
 * Constructor de la clase UMLPackagePublicImport
 * Representa una relación de importación pública de paquetes de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLPackagePublicImport
 * @extends Relation
 */
var UMLPackagePublicImport = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLPackagePublicImport' );

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  

  f.setStereotype( '\xABimport\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}



/**
 * Constructor de la clase UMLPackagePrivateImport
 * Representa una relación de importación privada de paquetes de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLPackagePrivateImport
 * @extends Relation
 */
var UMLPackagePrivateImport = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLPackagePrivateImport' );

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setStereotype( '\xABaccess\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}
