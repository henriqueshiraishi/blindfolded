/**
 ** MODULE NAME: 
 **	  objects.js
 **
 ** DESCRIPTION:
 **   Defines how are the elements of deployment diagrams of UML 2.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	000 - Mar 2012 - AAH - Initial version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2013 The authors
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

//= require <../modules/deployment/Association>
//= require <../modules/deployment/Artifact>
//= require <../modules/deployment/InstanceArtifact>
//= require <../modules/deployment/Dependency>
//= require <../modules/deployment/DeploymentSpecification>
//= require <../modules/deployment/Generalization>
//= require <../modules/deployment/GeneralizationSet>
//= require <../modules/deployment/NAssociation>
//= require <../modules/deployment/NodeElement>


/**
 * Constructor of the class UMLInstanceArtifact
 * Represents an instance artifact of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @class UMLInstanceArtifact
 * @extends Rectangular
 */
var UMLInstanceArtifact = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new InstanceArtifact( params );
  f.setType( 'UMLInstance' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	
  f.setMoveable();
  
  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABartifact\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Artifact Name', centered: true, margin: 3 }) );
  f.getNameAsComponent().setUnderlineText(true);
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
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
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new OperationFields({ id: 'operations',visibleSubComponents: false, margin: 3 })); 
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
/**
 * Constructor of the class UMLNode
 * Represents a Node element of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class UMLNode
 * @extends Rectangular
 */
var UMLNode = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodeElement( params );
  f.setType( 'UMLNode' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );
  
  f.setMoveable();
  f.setContainer();
  
  f.addFigure( new CubeFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Node name', centered: true, margin: 3 }) );
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
 * Constructor of the class UMLNodeTextNotation
 * Represents a text notation Node element of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class UMLNodeTextNotation
 * @extends Rectangular
 */
var UMLNodeTextNotation = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new NodeTextNotation( params );
  f.setType( 'UMLNodeTextNotation' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );
  
  f.setMoveable();
  
  f.addFigure( new CubeFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Node name', centered: true, margin: 3 }) );
  f.addComponent( new ArtifactFields({ id: 'artifacts', margin: 3 }) );
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
 * Constructor of the class UMLDeploymentSpecification
 * Represents a deployment specification of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @class UMLDeploymentSpecification
 * @extends Rectangular
 */
var UMLDeploymentSpecification = function( params ) {

	//Initializes the 'params' value if hasn't
	var params = params || {};

  var f = new DeploymentSpecification( params );
  f.setType( 'UMLDeploymentSpecification' );
  
	//Sets the stereotyped properties to the element UML
	setStereotypeProperties(f,params.stereotypes || []);
	
  f.setMoveable();
  
  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABdeployment spec\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
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




// Relations of DeploymentDiagram
/**
 * Constructor of the class UMLAssociation
 * Represents an association of UML 2
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
 * Constructor of the class UMLGeneralization
 * Represents a relation of generalization of UML 2
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
 * Constructor of the class UMLAssociationN
 * Represents a n-ary relation of UML 2
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
 * Represents a generalization set relation of UML2
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
 * Constructor of the class UMLManifestation
 * Represents a manifestation relation of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @class UMLManifestation
 * @extends Relation
 */
var UMLManifestation = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLManifestation' );
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  
  f.setStereotype( '\xABmanifest\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}




/**
 * Constructor of the class UMLDeployment
 * Represents a deployment relation of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @class UMLDeployment
 * @extends Relation
 */
var UMLDeployment = function( params ) {
  var f = new Relation( params );
  f.setType( 'UMLDeployment' );
  
  //Add item to contextual menu
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);
  
  
  f.setStereotype( '\xABdeploy\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );
  
  return f;
}

