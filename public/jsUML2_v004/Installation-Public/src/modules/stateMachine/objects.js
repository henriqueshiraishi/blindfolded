/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of the state Machine diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Oct 2012 - AAH - Third version release
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


//= require <../modules/generic/UMLStereotype>
//= require <../modules/generic/StereotypeTagList>

//= require <../modules/stateMachine/EntryPoint>
//= require <../modules/stateMachine/ExitPoint>
//= require <../modules/stateMachine/Junction>
//= require <../modules/stateMachine/SimpleState>
//= require <../modules/stateMachine/CompositeState>
//= require <../modules/stateMachine/Transition>




/**
 * UMLInitialPseudostate class Constructor 
 * Represents a initial pseudostate of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLInitialPseudostate
 */
var UMLInitialPseudostate = function( params ) {  
  var f = new Elliptical( params);
  f.setType( 'UMLInitialPseudostate' );

	//Set properties to the element
  f.setWidth( 16 );
  f.setHeight( 16 );

	//Adds figure to the element
  f.addFigure( new EllipseFigure({ color: '#000000', changeFigureColor: false }) );

  return f;
}

/**
 * UMLFinalState class Constructor 
 * Represents a final state of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLFinalState
 */
var UMLFinalState = function( params ) {
  var f = new Elliptical( params); 
  f.setType( 'UMLFinalState' );

	//Adds properties to the element
  f.setWidth( 16 );
  f.setHeight( 16 );

  //Adds figure to the element
  f.addFigure( new HalfFilledEllipseFigure({ color: '#ffffff', changeFigureColor: false }) );

  return f;
}


/**
 * UMLFinalState class Constructor 
 * Represents a terminate element of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLTerminate
 */
var UMLTerminate = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Terminate( params); 
  f.setType( 'UMLTerminate' );

	//Sets stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Set other properties to the element
  f.setWidth( 20 );
  f.setHeight( 20 );

  //Adds components and figures to the element
  f.addFigure( new CrossFigure({ color: '#000000', changeFigureColor: false}) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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
 * UMLEntryPoint class Constructor 
 * Represents a entry point of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLEntryPoint
 */
var UMLEntryPoint = function( params ) {  

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new EntryPoint( params );
  f.setType( 'UMLEntryPoint' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 14 );
  f.setHeight( 14 );

	//Adds components and figures to the element
  f.addFigure( new EllipseFigure({ color: '#ffffff', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );


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
 * UMLExitPoint class Constructor 
 * Represents a exit point of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLExitPoint
 */
var UMLExitPoint = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ExitPoint( params );
  f.setType( 'UMLExitPoint' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 14 );
  f.setHeight( 14 );

	//Adds figures and components to the element
  f.addFigure( new CrossEllipseFigure({ color: '#ffffff', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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
 * UMLJunction class Constructor 
 * Represents a junction of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLJunction
 */
var UMLJunction = function( params ) {  

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Junction( params );
  f.setType( 'UMLJunction' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties to the element
  f.setWidth( 14 );
  f.setHeight( 14 );

	//Adds components and figure to the element
  f.addFigure( new EllipseFigure({ color: '#000000', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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
 * UMLSimpleState class Constructor 
 * Represent a simpleState of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLSimpleState
 */
var UMLSimpleState = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

	var f = new SimpleState( params );
	f.setType( 'UMLSimpleState' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties to the element
	f.setWidth( 75 );
	f.setHeight( 30 );
	f.setMoveable();

	//Adds components and figures to the simple state
	f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true  }) );
	f.addComponent( new TextArea({ id: 'name', centered: true, position: Component.Static, margin: 5 }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addFigure( new RoundedRectangleFigure({color: '#ffffbb'}));


	//Add item to contextual menu
	f.setMenu([[function(){
								for(var i=0;i< f._components.length; i++)
									if(f._components[i] instanceof SpecificationItem){
										f._components[i]._visible = true;
										f._components[i].showDialog();
										f.removeContextualMenu();  
									}},'Specifications'],
						[function(){
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
 * UMLCompositeState class Constructor 
 * Represent a composite state of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLCompositeState
 */

var UMLCompositeState = function( params ) {

	//Add params to the UML element
	params = params || {};
	params.includeComponentByRegion = false;

	var f = new CompositeState( params );
	f.setType( 'UMLCompositeState' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties to the element
	f.setWidth( 150 );
	f.setHeight( 100 );
	f.setMoveable();
 	f.setContainer();

	//Adds components and figures to the composite state
	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'StateName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));


	//Set height and width of small rectangle according to the added components previously 
	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	//Add node to composite state
	if(params.setElementXml){
	} else{

		f.addRegion(new Region({parent: f}));
	}


	//Add item to contextual menu
	f.setMenu([[function(){
								for(var i=0;i< f._components.length; i++)
									if(f._components[i] instanceof SpecificationItem){
										f._components[i]._visible = true;
										f._components[i].showDialog();
										f.removeContextualMenu();  
									}},'Specifications'],
						[function(){
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
 * UMLVerticalRegion class Constructor 
 * Represent a vertical region of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLVerticalRegion
 */
var UMLVerticalRegion = function( params ) {

	//Add params to the UML element
	params = params || {};
	params.orientation = 1;

	var f = new CompositeState( params );
	f.setType( 'UMLVerticalRegion' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties to the element
	f.setWidth( 320 );
	f.setHeight( 150 );
	f.setMinHeight(50);
	f.setMoveable();
 	f.setContainer();

	//Adds components and figures to the vertical region
	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'RegionName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addComponent( new RegionStateItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));

	//Set height and width of small rectangle according to the added components previously 		
	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	//Add nodes to vertical region
	if(params.setElementXml){
	} else{

		f.addRegion(new RegionState({parent: f}));
		f.addRegion(new RegionState({parent: f}));
	}

	//Add item to contextual menu
	f.setMenu([[function(){
								for(var i=0;i< f._components.length; i++)
									if(f._components[i] instanceof SpecificationItem){
										f._components[i]._visible = true;
										f._components[i].showDialog();
										f.removeContextualMenu();  
									}},'Specifications'],
						[function(){
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
 * UMLHorizontalRegion class Constructor 
 * Represent a horizontalregion of UML2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLHorizontalRegion
 */
var UMLHorizontalRegion = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

	var f = new CompositeState( params );
	f.setType( 'UMLHorizontalRegion' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties to the element
	f.setWidth( 320 );
	f.setHeight( 150 );
	f.setMinHeight(50);
	f.setMoveable();
 	f.setContainer();


	//Adds components and figures to the vertical region
	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'RegionName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position:  Component.BottomLeft, margin: 10 }) );
	f.addComponent( new RegionStateItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));


	//Set height and width of small rectangle according to the added components previously 		
	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	//Add nodes to composite state
	if(params.setElementXml){
	} else{
		f.addRegion(new RegionState({parent: f}));
		f.addRegion(new RegionState({parent: f}));
	}

	//Add item to contextual menu
	f.setMenu([[function(){
								for(var i=0;i< f._components.length; i++)
									if(f._components[i] instanceof SpecificationItem){
										f._components[i]._visible = true;
										f._components[i].showDialog();
										f.removeContextualMenu();  
									}},'Specifications'],
						[function(){
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
 * Constructor de la clase UMLTransition
 * Representa una relación de transicion de UML 2
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLTransition
 *
 */
var UMLTransition = function( params ) {

  var f = new Transition( params );
  f.setType( 'UMLTransition' );
  
	//Adds stereotype and name to the transition
  f.addComponentStereotype();  
  f.setComponentName();

	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  	//Sets line type and arrow of line
  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}



