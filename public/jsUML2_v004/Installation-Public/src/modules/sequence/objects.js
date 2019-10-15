/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of the component diagrams of UML 2.
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

//= require <../modules/sequence/Lifeline>
//= require <../modules/sequence/CreateMessage>
//= require <../modules/sequence/Message>
//= require <../modules/sequence/TimeInterval>
//= require <../modules/sequence/DeleteMessage>
//= require <../modules/sequence/Interaction>
//= require <../modules/sequence/Alternative>
//= require <../modules/sequence/RegionAlternative>
//= require <../modules/sequence/SendMessage>
//= require <../modules/sequence/CallMessage>
//= require <../modules/sequence/ReplyMessage>
//= require <../modules/sequence/DeleteMessage>






/**
 * UMLLifeline class Constructor 
 * Represents a lifeline of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLLifeline
 */

var UMLLifeline = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Lifeline( params );
  f.setType( 'UMLLifeline' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
  
  f.setHeight( 250 );
  
	//Adds figures and component to the element UML
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );  
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new LifelineFigure({ color: '#c6dbdc' }) );


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
 * UMLCreate class Constructor 
 * Represents a create message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLCreateMessage
 */

var UMLCreate = function( params ) {

  var f = new CreateMessage( params );
  f.setType( 'UMLCreate' );

	//Adds stereotype to the element UML
  f.setStereotype( '\xABcreate\xBB' );

  	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
	//Adds the line's type and the arrow's type 
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );

  return f;
}

/**
 * UMLDestroy class Constructor 
 * Represents a destroy message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLDestroy
 */

var UMLDestroy = function( params ) {
  var f = new DeleteMessage( params );
  f.setType( 'UMLDestroy' );

	//Adds stereotype to the element UML
  f.setStereotype( '\xABdestroy\xBB' );  

  	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
	//Adds the line's type and the arrow's type 
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  

  return f;
}


/**
 * UMLSendMessage class Constructor 
 * Represents a send message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLSendMessage
 */

var UMLSendMessage = function( params ) {

  var f = new SendMessage( params );
  f.setType( 'UMLSendMessage' );

	//Adds stereotype and name to the element UML
  f.addComponentStereotype();  
  f.setComponentName();

	/*
		If the element has been instantiated because of a import 
		of a diagram, the objects of the relation will be added later
	*/
	if(params.setElementXml){

	} else{

		f.setObjA( new TimeInterval() );
		f.setObjB( new TimeInterval() );
	}
	 //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  
	//Adds the line's type and the arrow's type 
  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );


  return f;
}


/**
 * UMLCallMessage class Constructor 
 * Represents a call message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLCallMessage
 */

var UMLCallMessage = function( params ) {

  var f = new CallMessage( params );
  f.setType( 'UMLCallMessage' );

	//Adds stereotype and name to the element UML
  f.addComponentStereotype();  
  f.setComponentName();

	/*
		If the element has been instantiated because of a import 
		of a diagram, the objects of the relation will be added later
	*/
	if(params.setElementXml){

	} else{

		f.setObjA( new TimeInterval() );
		f.setObjB( new TimeInterval() );
	}
	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  
	//Adds the line's type and the arrow's type 
  f.setLine( new SolidLine() );
  f.setEnd( new CloseTip({color: '#000000'}) );

  return f;
}


/**
 * UMLReplyMessage class Constructor 
 * Represents a reply message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLReplyMessage
 */

var UMLReplyMessage = function( params ) {
  var f = new ReplyMessage( params );
  f.setType( 'UMLReplyMessage' );

	//Adds stereotype and name to the element UML
  f.addComponentStereotype();  
  f.setComponentName();
  
	/*
		If the element has been instantiated because of a import 
		of a diagram, the objects of the relation will be added later
	*/
	if(params.setElementXml){

	} else{
	  f.setObjB( new TimeInterval() );
	}
	  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  
	
	//Adds the line's type and the arrow's type 
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}

/**
 * UMLDeleteMessage class Constructor 
 * Represents a delete message of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLDeleteMessage
 */


var UMLDeleteMessage = function( params ) {

  var f = new DeleteMessage( params );
  f.setType( 'UMLDeleteMessage' );

	//Adds stereotype and name to the element UML
  f.addComponentStereotype();  
  f.setComponentName();

	/*
		If the element has been instantiated because of a import 
		of a diagram, the objects of the relation will be added later
	*/
	if(params.setElementXml){

	} else{

	  f.setObjA( new TimeInterval() );
	}
	//Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
	  
	//Adds the line's type and the arrow's type 
  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );

  
  return f;
}

/**
 * UMLOption class Constructor 
 * Represents a option of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLOption
 */


var UMLOption = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLOption' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

	//Adds properties of the element
  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );
  
	//Adds the components and figure of the element UML
	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name',  text:'OPT', margin: 4 , selected: true}) );
  f.addComponent( new GuardItem({ id: 'guard', text:'[]', margin: 1 }) );
  f.addFigure( new RectangleFigure() );
  
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
 * UMLAlternative class Constructor 
 * Represents a alternative of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLAlternative
 */

var UMLAlternative = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  params = params || {};
  var f = new Alternative( params );
  f.setType( 'UMLAlternative' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	  
	//Adds properties of the element
  f.setMoveable();
  f.setWidth( 200 );
  f.setHeight( 100 );


	//Adds components and figure to the element UML
	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name',  text:'ALT', margin: 4 , selected: true}) );
  f.addComponent( new RegionAlternativeItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );	  
  f.addFigure( new RectangleFigure() );

	/*
		If the element has been instantiated because of a import 
		of a diagram, the regions of the node will be added later
	*/
	if(params.setElementXml){

	} else{

		f.addRegion(new RegionAlternative({parent: f, position: Component.BottomLeft}));
		f.addRegion(new RegionAlternative({parent: f, position: Component.BottomLeft}));
	}


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
 * UMLLoop class Constructor 
 * Represents a loop of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLLoop
 */

var UMLLoop = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLLoop' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	  
	//Adds properties of the element
  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );
	  
	//Adds components and figure of the element UML
	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new LoopItem({ id: 'name',  text:'LOOP', margin: 4 }) );
  f.addComponent( new GuardItem({ id: 'guard', text:'[]', margin: 1 }) );
  f.addFigure( new RectangleFigure() );
	  
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
 * UMLBreak class Constructor 
 * Represents a break of UML2
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @class UMLBreak
 */

var UMLBreak = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLBreak' );

	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
  
	//Adds properties to the element
  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );

	//Adds components and figures to the element UML
	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );  
  f.addComponent( new Tab({ id: 'name',  text:'BREAK', margin: 4, selected: true }) );
  f.addFigure( new RectangleFigure() );

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


