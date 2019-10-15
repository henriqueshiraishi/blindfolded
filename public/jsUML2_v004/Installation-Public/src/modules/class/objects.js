/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of class diagrams of UML 2.
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
 **	002 - Agu 2012 - AAH -
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

//= require <../modules/class/Aggregation>
//= require <../modules/class/Association>
//= require <../modules/class/Composition>
//= require <../modules/class/Dependency>
//= require <../modules/class/Generalization>
//= require <../modules/class/Realization>
//= require <../modules/class/GeneralizationSet>
//= require <../modules/class/NAssociation>
//= require <../modules/class/DataType>




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
 * Constructor de la clase UMLComponent
 * Representa un componente de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLComponent
 * @extends Rectangular
 */
var UMLComponent = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ComponentElement( params );
  f.setType( 'UMLComponent' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setWidth( 150 );
  
  f.addFigure( new RectangleFigure({ color: '#ffffbb'}) );
  f.addComponent( new ComponentSymbol({ position: Component.TopRight, margin: 3 }) );
  
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new Text({ text: '\xABcomponent\xBB', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Component Name', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'operations' , visibleSubComponents: false, margin: 3}) );

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



/**
 * Constructor de la clase UMLAggregation
 * Representa una relación de agregación de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLAggregation
 * @extends Relation
 */
var UMLAggregation = function( params ) {
  var f = new Aggregation( params );
  f.setType( 'UMLAggregation' );
  
  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentRoleB();
  f.setComponentMultiplicityA();
  f.setComponentMultiplicityB();
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);
  
  f.setLine( new SolidLine() );
  f.setStart( new AggregationEnd() );
  
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
 * Constructor de la clase UMLComposition
 * Representa una relación de composición de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLComposition
 * @extends Relation
 */
var UMLComposition = function( params ) {
  var f = new Composition( params );
  f.setType( 'UMLComposition' );
  
  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentRoleB();
  f.setComponentMultiplicityA();
  f.setComponentMultiplicityB();
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);
    
  f.setLine( new SolidLine() );
  f.setStart( new CompositionEnd() );
  
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

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.addComponentStereotype();
  f.setComponentName();

  f.setLine( new SolidLine() );
  f.setEnd( new CloseTip() );
  
  return f;
}



/**
 * Constructor de la clase UMLRealization
 * Representa una relación de realización de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLRealization
 * @extends Relation
 */
var UMLRealization = function( params ) {
  var f = new Realization( params );
  f.setType( 'UMLRealization' );
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.addComponentStereotype();
  f.setComponentName();

  f.setLine( new DashedLine() );
  f.setEnd( new CloseTip() );
  
  return f;
}



/**
 * Constructor de la clase UMLUsage
 * Representa una relación de uso de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLUsage
 * @extends Dependency
 */
var UMLUsage = function( params ) {
  var f = new Dependency( params ); 
  f.setType( 'UMLUsage' );
  
  f.addComponentStereotype();
  f.setComponentName();  

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  f.setStereotype( '\xABuse\xBB' );
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




/**
 * Constructor de la clase UMLDataType
 * Representa un tipo de datos de UML 2
 *
 * @author Jose Maria Gomez Hernandez / Alejandro Arrabal Hidalgo
 * @update 23/02/2012 / 14/08/2012 / 22/09/2012
 *
 * @class UMLDataType
 * @extends Rectangular
 */

var UMLDataType= function( params ) {
	var params = params || {};

  var f = new DataType( params );
  f.setType( 'UMLDataType' );

	setStereotypeProperties(f,params.stereotypes || []);
	//f.stereotypeProperties=getStereotypeProperties(f);
  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );

 
  f.addComponent( new Text({ text: '\xABdatatype\xBB' , centered: true }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'DataTypeName', centered: true, margin: 3 }) );
    
  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'operations' , margin: 3}) );
  f.setMenu([[function(){
								f.showStyleDialog({that: f});
								f.removeContextualMenu();},'Style'],
						[function(){
							getStereotypeProperties(f).showTagValuesDialog();
							f.removeContextualMenu();},'Tag value'],
						[function(){
							f.setAbstract(!f.isAbstract());
							f.removeContextualMenu();},'Change abstract property'],
						[function(){
							getStereotypeProperties(f).showApplyStereotypesDialog();
							f.removeContextualMenu();},'Apply Stereotype'],
						[function(){
							getStereotypeProperties(f).showStereotypesDialog();
							f.removeContextualMenu();},'Show Stereotype']	]);

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
	  var params = params || {};
	  var f = new GeneralizationSet (params);
	  f.setType( 'UMLGeneralizationSet' );
	  
	  f.addComponentStereotype();
	  f.setComponentName();
	  
	  //Add item to contextual menu
	  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  

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