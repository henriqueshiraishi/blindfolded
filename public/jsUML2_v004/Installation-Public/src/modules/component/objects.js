/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of the sequence diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **   Rafael Molina Linares    (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	    002 - Oct 2012 - AAH - Third version release
 ** 	001 - Sep 2011 - RML - Second version release
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

//= require <../modules/generic/UMLStereotype>
//= require <../modules/generic/StereotypeTagList>

//= require <../modules/component/NodePorts>
//= require <../modules/component/NodeInterface>
//= require <../modules/component/Port>
//= require <../modules/component/InterfaceUsage>
//= require <../modules/component/InterfaceRealization>
//= require <../modules/component/GeneralizationSet>




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
  
  f.addFigure( new RectangleFigure({ color: '#bdd8e5' }) );
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

var UMLComComponent = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodePorts( params );
  f.setType( 'UMLComComponent' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  
  f.setContainer();
  f.setMoveable();
  f.setWidth( 150 );
  
  f.addFigure( new RectangleFigure({ color: '#ffffbb' }) );
  f.addComponent( new ComponentSymbol({ position: Component.TopRight, margin: 3 }) );
  
  
  f.addComponent( new Text({ text: '\xABcomponent\xBB', centered: true }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  
  f.addComponent( new TextArea({ id: 'name', text: 'Component Name', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'interfaces', text: 'new_interface', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'realizations', text: 'new_realization', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'artifacts', text: 'new_artifact', visibleSubComponents: false, margin: 3 }) );

  //Add item to contextual menu
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
								f.setAbstract(!f.isAbstract());
								f.removeContextualMenu();},'Change abstract property'],
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
 * Constructor de la clase UMLClass
 * Representa una clase de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLClass
 * @extends Rectangular
 */
var UMLClass = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Class( params );
  f.setType( 'UMLClass' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	
  f.setMoveable();
  
  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'ClassName', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'operations' , margin: 3}) );


  //Add item to contextual menu
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
								f.setAbstract(!f.isAbstract());
								f.removeContextualMenu();},'Change abstract property'],
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
 * Constructor of the class UMLArtifact
 * Represents an artifact of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @class UMLArtifact
 * @extends Rectangular
 */
var UMLArtifact = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Artifact( params );
  f.setType( 'UMLArtifact' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	
  f.setMoveable();
  
  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABartifact\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Artifact Name', centered: true, margin: 3 }) );
  f.getNameAsComponent().setUnderlineText(true);
  f.addComponent( new PropertyFields({ id: 'properties',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new ArtifactSymbol({ position: Component.TopRight, margin: 3 }) );  
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

var UMLInterface = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodeInterface( params );
  f.setType( 'UMLInterface' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 16 );
  f.setHeight( 16 );
  
  f.addFigure( new EllipseFigure({ color: '#67ac88' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

  //Add item to contextual menu
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
								f.setAbstract(!f.isAbstract());
								f.removeContextualMenu();},'Change abstract property'],
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
 * Constructor de la clase UMLInterfaceExtended
 * Representa una interfaz de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLInterfaceExtended
 * @extends Rectangular
 */
var UMLInterfaceExtended = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new InterfaceExtended( params );
  f.setType( 'UMLInterfaceExtended' );
  

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);


  f.setMoveable();
  f.setWidth( 150 );
  
  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new CircleSymbol({ position: Component.TopRight, margin: 3 }) );
  
  f.addComponent( new TextArea({ id: 'name', text: 'Interface Name', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'methods' , visibleSubComponents: false, margin: 3}) );

  //Add item to contextual menu
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
								f.setAbstract(!f.isAbstract());
								f.removeContextualMenu();},'Change abstract property'],
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



var UMLInterfaceUsage = function( params ) {
  var f = new InterfaceUsage( params );
  f.setType( 'UMLInterfaceUsage' );
  
  f.setComponentName();
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setLine( new SolidLine() );
  f.setEnd( new InterfaceUsageEnd() );
  
  return f;
}


var UMLInterfaceRealization = function( params ) {
  var f = new InterfaceRealization( params );
  f.setType( 'UMLInterfaceRealization' );
  
  f.setComponentName();
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setLine( new SolidLine() );  
  return f;
}


var UMLConnector = function( params ) {
  var f = new ConnectorRelation( params );
  f.setType( 'UMLConnector' );
  
  f.addComponentStereotype();
  f.setComponentName();
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
   
  f.setLine( new SolidLine() );  
  return f;
}

var UMLPort = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Port( params );
  f.setType( 'UMLPort' ); 

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

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
 * Constructor de la clase UMLGeneralization
 * Representa una relación de generalización de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLGeneralization
 * @extends Relation
 */
var UMLGeneralization = function( params ) {
  var f = new Generalization( params );
  f.setType( 'UMLGeneralization' );
  
  f.addComponentStereotype();
  f.setComponentName();

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setLine( new SolidLine() );
  f.setEnd( new CloseTip() );
  
  return f;
}




/**
 * UMLGeneralizationSet class Constructor 
 * Represents a generalization set node of UML2
 *
 * @author Alejandro Arrabal Hidalgo 
 * @update 28/08/2012
 *
 * @class UMLGeneralizationSet
 * @extends Relation
 */
var UMLGeneralizationSet = function( params ) {
	  var f = new GeneralizationSet (params);
	  f.setType( 'UMLGeneralizationSet' );
	  
	  //Add item to contextual menu
	  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  
	  f.addComponentStereotype();
	  f.setComponentName();



	  return f;
}




/**
 * Constructor of the class UMLDependency
 * Represents a relation of dependency of UML 2
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
 * Constructor de la clase UMLAssociation
 * Representa una relación de asociación de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLAssociation
 * @extends Relation
 */
var UMLAssociation = function( params ) {
  var f = new Association( params );
  f.setType( 'UMLAssociation' );
  
  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentRoleB();
  f.setComponentMultiplicityA();
  f.setComponentMultiplicityB();

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);
  
  f.setLine( new SolidLine() );
  return f;
}



/**
 * Constructor de la clase UMLAssociationN
 * Representa una relación n-aria de UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 21/08/2012
 *
 * @class UMLAssociationN
 * @extends Rhombus
 */
var UMLNAssociation = function( params ) {
  var params = params || {};
  var f = new NAssociation(params);
  f.setMoveable();
	setStereotypeProperties(f,params.stereotypes || []);

  f.setType( 'UMLNAssociation' );
  f.addFigure( new RhombusFigure({ color:  '#ffffbb' }) );
  
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: ' ', centered: true, margin: 3 }) );



  return f;
}




/**
 * Constructor of the class UMLInterfaceUse
 * Represents a relation of interface use of UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLInterfaceUse
 * @extends Relation
 */
var UMLInterfaceUse = function( params ) {
  var f = new InterfaceUse( params ); 
  f.setType( 'UMLInterfaceUse' );
  
  f.addComponentStereotype();
  f.setComponentName();
 
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}