/**
 ** MODULE NAME: 
 **	  ProfileDiagram.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the Profile Diagram.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares 
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
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


/**
 * ProfileDiagram class constructor, creates a profile UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class ProfileDiagram
 * @extends Diagram
 *
 */

var ProfileDiagram = function( params ){

	params = params || {};
	ProfileDiagram.baseConstructor.call(this,params);

	this._visible = true;
}
JSFun.extend(ProfileDiagram,Diagram);



/**
 * Draws all the elements of the diagram in the main drawing canvas.
 * For that, the diagram has to be visible
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method draw
 */

ProfileDiagram.prototype.draw = function() {

	if(this._visible)
		ProfileDiagram.base.draw.call(this);
}



/**
 * Activates or desactivates the interaction with the user.
 * Taking in account that if the diagram isn't visible, the 
 * interaction with the user can't be activated
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method interaction
 * @param {Boolean} activate Activate/desactivate the interaction with the user
*/

ProfileDiagram.prototype.interaction = function( activate ) {

	/*
		Only allows that the interaction be 
		activated if the diagram is visible 
	*/
	var activate = (!this._visible) ? false : activate;

	//Call to base method
	ProfileDiagram.base.interaction.call(this, activate);
}



/**
 * Update the stereotype's tags contained in the elements of the diagrams's array passed as parameter.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method updateProfile
 * @param {Array} diagrams Array of diagrams that must update its elements(its stereotype's tags and its tag values)
 *
 */

ProfileDiagram.prototype.updateProfile = function(diagrams ){
	var i;
	var metaclass = [];

	//Stores in an array the metaclass object of the profile
	for(i=0;i<this._nodes.length;i++){																			
		if(this._nodes[i].getType() == 'UMLMetaclass')
			metaclass.push(this._nodes[i]);
	}

	var nodes;
	var found = false;

	//Update the stereotypes tag of all elements of the diagrams's array passed as parameter 
	for(i=0;i<diagrams.length;i++){
		nodes = diagrams[i]._nodes;
		for(j=0;j<nodes.length;j++){
			if(nodes[j]._stereotypeProperties)
				nodes[j]._stereotypeProperties.updateElementStereotypes();
		}
	}		
}



/**
 * Remove all stereotypes tags(created by the existence of a 
 * stereotype object of the profile that will be removed) of
 * all elements of the diagramas
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method updateProfile
 * @param {Stereotype} diagrams Diagrams that update the stereotype tags of its elements
 *
 */

ProfileDiagram.prototype.removeProfile = function(diagrams ){

	//If the parameter hasn't been passed to the method
	if(!diagrams)
		return;

	var i;
	var stereotypes = [];

	//Stored all stereotype's object contained in the profile
	for(i=0;i<this._nodes.length;i++){
		if(this._nodes[i].getType() == 'UMLStereotype')
			stereotypes.push(this._nodes[i]);
	}

	var nodes;
	var found = false;

	
	for(i=0;i<diagrams.length;i++){

		nodes = diagrams[i]._nodes;
		for(j=0;j<nodes.length;j++){

			//If the node has stereotyped properties, call to the removeStereotype for each stereotype of the profile
			if(nodes[j]._stereotypeProperties){
				for(k=0;k<stereotypes.length;k++)
					nodes[j]._stereotypeProperties.removeStereotype(stereotypes[k]);
			}
		}
	}		
}



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Rafael Molina Linares
 * @update 17/11/2011
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

ProfileDiagram.prototype.setXML = function( xml, diagrams, acceptedElementsUML ) {

	//Initialize the diagrams and acceptedElementsUML attributes
	diagrams = diagrams || [];
	acceptedElementsUML = acceptedElementsUML || [];

	//Calls to the base method
	ProfileDiagram.base.setXML.call(this,xml);

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

	//Sets the value of visibility of the diagram
	if(diagram.getAttribute( 'visible' ) == "false")
		this._visible = false;

	//Adds properties to the metaclasses and stereotypes of the profile
	for(var i=0; i<this._nodes.length; i++){

		/*
			If the node is a metaclass, it is passed the list of valid 
			element that can be stereotyped, so such the list of 
			diagrams that has to be updated when a change is 
			produced in the metaclass
		*/
		if(this._nodes[i].getType() == 'UMLMetaclass'){

			this._nodes[i].setDiagrams( diagrams );
			this._nodes[i].setValidMetaclass( acceptedElementsUML );
//			_metaclass.push( diagram._nodes[i] );						

		}	else if(this._nodes[i].getType() == 'UMLStereotype'){

			/*
				If the node is a stereotype object, it is passed 
  			the list of diagrams that has to be updated 
				when a change is produced in the metaclass
			*/
			this._nodes[i].setDiagrams( diagrams );
//			_stereotypes.push( diagram._nodes[i] );						

		}	
	}
}


/**
 * Generates a tree with all element of the diagram in xml format
 *
 * @author Rafael Molina Linares
 * @update 17/11/2011
 *
 * @method getXML
 * @param {DOMNode} parent Parent node of xml tree
 * @return {DOMNode} Generated node with the overall diagram
*/
ProfileDiagram.prototype.getXML = function( parent ) {

	var diagram = ProfileDiagram.base.getXML.call(this,parent);

  diagram.setAttribute( 'visible', this._visible );  

  return diagram;
}


ProfileDiagram.prototype.getElements = function( ) {

	var metaclass = [];
	var stereotypes = [];

	for(var k=0;k<this._nodes.length;k++){

		/*
			If the node is a metaclass, it is stored in 
			a metaclass's array of the application
		*/
		if(this._nodes[k].getType() == 'UMLMetaclass'){

			metaclass.push( this._nodes[k] );						
		}	else if(this._nodes[k].getType() == 'UMLStereotype'){

			/*
				If the node is a stereotype object, it is passed 
				a stereotype's array of the application
			*/
			stereotypes.push( this._nodes[k] );						
		}	
	}

	return [metaclass,stereotypes];
}
