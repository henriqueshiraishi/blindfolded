/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of the Use Case diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 ** 	Rafael Molina Linares (RML)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	002 . Oct 2012 - AAH . Third version release
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
//= require <../modules/usecase/Actor>
//= require <../modules/usecase/Communication>
//= require <../modules/usecase/Generalization>
//= require <../modules/usecase/GeneralizationSet>




/**
 * Constructor de la clase UMLActor
 * Representa un actor de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLActor
 * @extends Rectangular
 */
var UMLActor = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Actor( params );
  f.setType( 'UMLActor' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
  
  f.setMinWidth( 50 );
  f.setMinHeight( 70 );
  
  f.setProportional();
  f.setMoveable();
 
  
  f.addFigure( new StickmanFigure() );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',position: Component.Bottom }) );
  f.addComponent( new TextArea({ id: 'name', position: Component.Bottom }) );

  //Add item to contextual menu
  f.setMenu([[function(){
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
 * Constructor de la clase UMLUseCase
 * Representa un caso de uso de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLUseCase
 * @extends Elliptical
 */
var UMLUseCase = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new UseCase( params );
  f.setType( 'UMLUseCase' );
  

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 40 ); 
  
  f.setMoveable();
  
  f.addFigure( new EllipseFigure() );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );

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
 * Constructor de la clase UMLUseCaseExtended
 * Representa un caso de uso extendido de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLUseCaseExtended
 * @extends Elliptical
 */
var UMLUseCaseExtended = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new UseCaseExtended( params );
  f.setType( 'UMLUseCaseExtended' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 40 ); 
  
  f.setMoveable();
  
  f.addFigure( new EllipseFigure() );
  
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', centered: true }) );
  f.addComponent( new Separator() );
  f.addComponent( new Text({ text: 'extension points', centered: true }) );
  f.addComponent( new TextFields({ id: 'extension', centered: true }) );

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
 * Constructor de la clase UMLSystem
 * Representa un sistema de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLSystem
 * @extends Rectangular
 */
var UMLSystem = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new System( params ); 
  f.setType( 'UMLSystem' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 100 );
  
  f.setMoveable();
  f.setContainer();
  
  f.addFigure( new RectangleFigure({ color: '#c6dbdc' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new Tab({ id: 'name', margin: 5, text: 'System name' }) );

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
 * Constructor de la clase UMLSubSystem
 * Representa un sub-sistema de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLSubSystem
 * @extends Rectangular
 */
var UMLSubSystem = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new SubSystem( params );
  f.setType( 'UMLSubSystem' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setMinWidth( 150 );
  f.setHeight( 100 );
  
  f.setMoveable();
  f.setContainer();
  
  f.addFigure( new RectangleFigure({ color:'#c6dbdc' }) );
  f.addComponent( new Text({ centered: true, text: '\xABsubsystem\xBB', margin: 1 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new ComponentSymbol({ position: Component.TopRight, margin: 5 }) );
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 2 }) );

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
 * Constructor de la clase UMLCommunication
 * Representa una comunicación de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLCommunication
 * @extends Relation
 */
var UMLCommunication = function( params ) {
  var f = new Communication( params );
  f.setType( 'UMLCommunication' );
  f.addComponentStereotype();
  f.setComponentMultiplicityA();
  f.setComponentMultiplicityB();
  
	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  return f;
}


/**
 * Constructor de la clase UMLUseCase
 * Representa un caso de uso de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLUseCase
 * @extends Elliptical
 */
var UMLUseCase = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new UseCase( params );
  f.setType( 'UMLUseCase' );
  

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 40 ); 
  
  f.setMoveable();
  
  f.addFigure( new EllipseFigure() );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );

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
 * Constructor de la clase UMLExtend
 * Representa una relación de extensión de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLExtend
 * @extends Relation
 */
var UMLExtend = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLExtend' );
  
  f.setStereotype( '\xABextend\xBB' );

  	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}



/**
 * Constructor de la clase UMLInclude
 * Representa una relación de inclusión de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLInclude
 * @extends Relation
 */
var UMLInclude = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLInclude' );
  
  f.setStereotype( '\xABinclude\xBB' );

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
	  
	  f.addComponentStereotype();
	  f.setComponentName();
	
	  	//Add item to contextual menu
	  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
	  f.setLine( new SolidLine() );
	  f.setEnd( new CloseTip() );


	  return f;
}




/**
 * Constructor de la clase UMLUseCaseClassifier
 * Representa un caso de uso de UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 6/12/2012
 *
 * @class UMLUseCaseClassifier
 * @extends Rectangular
 */
var UMLUseCaseClassifier = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new UseCaseClassifier( params );
  f.setType( 'UMLUseCaseClassifier' );
  

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 40 ); 
  
  f.setMoveable();
  
  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );
  f.addComponent( new ElipseSymbol({ position: Component.TopRight, margin: 3 }) );

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