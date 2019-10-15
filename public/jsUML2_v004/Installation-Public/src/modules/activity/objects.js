/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of the activity diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo	(AAH)
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

//= require <../modules/activity/AcceptEventAction>
//= require <../modules/activity/DataStore>
//= require <../modules/activity/Swimlane>
//= require <../modules/activity/SwimlaneItem>
//= require <../modules/activity/NodeForkJoin>
//= require <../modules/activity/Flow>




/**
 * UMLAcceptEventAction class Constructor 
 * Represents a accept event Action of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLAcceptEventAction
 */
var UMLAcceptEventAction = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new AcceptEventAction( params ); 
  f.setType( 'UMLAcceptEventAction' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setMoveable();
  f.setWidth( 100 );
  f.setHeight( 55 );

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new AcceptEventActionFigure({ color: '#ffffbb' }) );


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
 * TimeEvent class Constructor 
 * Represents a time event of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLTimeEvent
 */

var UMLTimeEvent = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new TimeEvent( params ); 
  f.setType( 'UMLTimeEvent' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setMoveable();
  f.setWidth( 40 );
  f.setHeight( 50 );

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
  f.addFigure( new TimeEventFigure({ color: '#ffffbb' }) );


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
 * UMLAction class Constructor 
 * Represents a Action of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLAction
 */
var UMLAction = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodeAction( params );
  f.setType( 'UMLAction' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new RoundedRectangleFigure({ color: '#ffffbb'}));


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
 * UMLActivity class Constructor 
 * Represents a Activity of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLActivity
 */
var UMLActivity = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodeAction( params );
  f.setType( 'UMLActivity' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new RoundedRectangleFigure({ color: '#ffffbb'}));

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
 * UMLDataStore class Constructor 
 * Represents a dataStore of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLDataStore
 */
var UMLDataStore = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new DataStore( params );
  f.setType( 'UMLDataStore' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new Text({ centered: true, text: '\xABdatastore\xBB', margin: 1 }) );
  f.addComponent( new DataStoreItem({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb'}));

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
 * UMLPin class Constructor 
 * Represents a pin of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLPin
 */

var UMLPin = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Pin( params );
  f.setType( 'UMLPin' ); 

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb' }) );

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
 * UMLParameterNode class Constructor 
 * Represents a node parameter of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLParameterNode
 */
var UMLParameterNode = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ParameterNode( params );
  f.setType( 'UMLParameterNode' ); 
  f.setMoveable();

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextArea({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb' }) );


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
 * UMLExpansionNode class Constructor 
 * Represents a expansion node of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLExpansionNode
 */

var UMLExpansionNode = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ExpansionNode( params );
  f.setType( 'UMLExpansionNode' ); 

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
  f.addFigure( new ExpansionNodeFigure({ color: '#ffffbb' }) );


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
 * UMLObject class Constructor 
 * Represents a object of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLObject
 */
var UMLObject = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ObjectActivity( params );
  f.setType( 'UMLObject' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new ObjectItem({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb'}));


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
 * UMLFlow class Constructor 
 * Represents a flow of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLFlow
 */

var UMLFlow = function( params ) {

  var f = new Flow( params ); 
  f.setType( 'UMLFlow' );
  
  //Add item to contextual menu
 f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
	//Adds the line's type and the arrow's type
  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );

  return f;
}

/**
 * UMLActivityFinal class Constructor 
 * Represents a activity final of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLActivityFinal
 */

var UMLActivityFinal = function( params ) {
  var f = new Elliptical( params); 
  f.setType( 'UMLActivityFinal' );

	//Adds properties to the element
  f.setWidth( 16 );
  f.setHeight( 16 );
 
	//Adds the components and figures of the element UML 
  f.addFigure( new HalfFilledEllipseFigure({ color: '#ffffff', changeFigureColor: false }) );

  return f;
}

/**
 * UMLInitialNode class Constructor 
 * Represents a initial node of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLInitialNode
 */
var UMLInitialNode = function( params ) {
  var f = new Elliptical( params);
  f.setType( 'UMLInitialNode' );

	//Adds properties to the element
  f.setWidth( 16 );
  f.setHeight( 16 );
  
	//Adds the components and figures of the element UML
  f.addFigure( new EllipseFigure({ color: '#000000', changeFigureColor: false }) );

  return f;
}


/**
 * UMLFlowFinal class Constructor 
 * Represents a flow final of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLFlowFinal
 */
var UMLFlowFinal = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new FlowFinal( params );
  f.setType( 'UMLFlowFinal' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 16 );
  f.setHeight( 16 );

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
  f.addFigure( new CrossEllipseFigure({ color: '#ffffff', changeFigureColor: false }) );

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
 * UMLDecision_MergeNode class Constructor 
 * Represents a decision or merge node of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLDecision_MergeNode
 */
var UMLDecision_MergeNode = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

	var f = new Decision_MergeNode( params );
	f.setType( 'UMLDecision_MergeNode' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
	f.setMinWidth( 35 );
	f.setMinHeight( 35 );

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );
	f.addFigure( new RhombusFigure({color: '#bdd8e5'}) );


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
 * UMLFork_JoinNode class Constructor 
 * Represents a fork or join node of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLFork_JoinNode
 */
var UMLFork_JoinNode = function( params ) {
	var f = new NodeForkJoin( params );
	f.setType( 'UMLFork_JoinNode' );

	//Adds other properties to the element
	f.setWidth( 100 );
	f.setMinWidth( 50 );
	f.setHeight( 5 );
	f.setMinHeight( 5 );		

	f.setMoveable();
	
	//Adds the components and figures of the element UML
	f.addFigure( new RectangleFigure({color: '#000000', changeFigureColor: false}) );
	return f;
}


/**
 * UMLSendSignalAction class Constructor 
 * Represents a sendSignalAction of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLSendSignalAction
 */

var UMLSendSignalAction = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new SendSignalAction( params );
  f.setType( 'UMLSendSignalAction' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new SendSignalActionFigure({ color:  '#ffffbb'}));

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
 * UMLConnector class Constructor 
 * Represents a connector of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLConnector
 */
var UMLConnectorActivity = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new ConnectorActivity( params );
  f.setType( 'UMLConnectorActivity' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth(  20 );
  f.setHeight( 20 );
  f.setMoveable();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new ConnectorItem({ id: 'name', centered: true, margin: 3, width:20 }) );
  f.addFigure( new EllipseFigure({ color:  '#ffffbb'}));

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
 * UMLHorizontalSwimlane class Constructor 
 * Represents a horizontal swimlane of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLHorizontalSwimlane
 */
var UMLHorizontalSwimlane = function( params ) {

  var f = new UnhierarchicalSwimlane( params );
  f.setType( 'UMLHorizontalSwimlane' );

	//Adds properties to the element
  f.setWidth(  150 );
  f.setHeight( 60 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
	f.addComponent( new SwimlaneItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  	  
  f.addFigure( new SwimlaneFigure());


	//Adds the swimlanes of the element UML
	if(params.setElementXml){
	} else{
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
	}

  return f;
}


/**
 * UMLVerticalSwimlane class Constructor 
 * Represents a vertical swimlane of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLVerticalSwimlane
 */
var UMLVerticalSwimlane = function( params ) {
	params = params || {};
	params.orientation = 1;

  var f = new UnhierarchicalSwimlane( params );
  f.setType( 'UMLVerticalSwimlane' );

	//Adds properties to the element
  f.setWidth(  60 );
  f.setHeight( 150 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
	f.addComponent( new SwimlaneItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  	  
  f.addFigure( new VerticalSwimlaneFigure());


	//Adds the swimlanes of the element UML
	if(params.setElementXml){
	} else{
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
	}

  return f;
}

/**
 * UMLHorizontalHierarchicalSwimlane class Constructor 
 * Represents a horizontal hierarchical swimlane of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLHorizontalHierarchicalSwimlane
 */
var UMLHorizontalHierarchicalSwimlane = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new HierarchicalSwimlane( params );
  f.setType( 'UMLHorizontalHierarchicalSwimlane' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth(  150 );
  f.setHeight( 60 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true, orientation: 1 }) );  
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 3, orientation: 1 }) );
  f.addComponent( new Separator({ id: 'separator', centered: true, orientation: 1, width: 2.5 }) );
	f.addComponent( new SwimlaneItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  	  
  f.addFigure( new SwimlaneFigure());


	//Adds the swimlanes of the element UML
	if(params.setElementXml){
	} else{
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
		f.addRegion(new Swimlane({parent: f, y: f.getY(), x: f.getX()}));
	}

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
 * UMLVerticalHierarchicalSwimlane class Constructor 
 * Represents a vertical hierarchical swimlane of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLVerticalHierarchicalSwimlane
 */
var UMLVerticalHierarchicalSwimlane = function( params ) {

	//Initializes params to default value(if necessary)
	params = params || {};
	params.orientation = 1;

  var f = new HierarchicalSwimlane( params );
  f.setType( 'UMLVerticalHierarchicalSwimlane' );


	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds other properties to the element
  f.setWidth(  60 );
  f.setHeight( 150 );
  f.setMoveable();
  f.setContainer();

	//Adds the components and figures of the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 3}) );
  f.addComponent( new Separator({ id: 'separator', centered: true, height: 2.5 }) );
	f.addComponent( new SwimlaneItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  	  
  f.addFigure( new VerticalSwimlaneFigure());

	//Adds the swimlanes of the element UML
	if(params.setElementXml){
	} else{
		f.addRegion(new Swimlane({parent: f, y: f.getY() , x: f.getX()}));
		f.addRegion(new Swimlane({parent: f, y: f.getY() , x: f.getX()}));
	}

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
 * UMLExceptionhandler class Constructor 
 * Represents a exception handler of UML2
 *
 * @author Rafael Molina Linares
 * @update 18/09/2011
 *
 * @class UMLExceptionHandler
 */
var UMLExceptionHandler = function( params ) {
  var f = new ExceptionHandler( params ); 
  f.setType( 'UMLExceptionHandler' );

	//Adds stereotype and name to the element
  f.addComponentStereotype();  
  f.setComponentName();  

  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
    
	//Set the line's type and arrow's type
  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );

  return f;
}

