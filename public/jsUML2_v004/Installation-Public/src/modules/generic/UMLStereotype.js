/**
 ** MODULE NAME: 
 **	  UMLStereotype.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the element UML so that this element can do use of the defined profiles.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
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



/**
 * UMLStereotypedElement class constructor, 
 * defines that properties and methods has 
 * a stereotyped element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method UMLStereotypedElement
 * @extends Rectangular
 *
 */

var UMLStereotypedElement = function( params ) {
  params = params || {};

	//Objects Stereotype that the element could be applied
	this._stereotypes = params.stereotypes || [];

	//Saves the element UML to which these properties are
	this._parent = params.parent || null;

	//Saves the name of the object Stereotype shown 
	this._shownStereotype;

	//Saves the objects Stereotype that has been applied to the element UML
	this._appliedStereotypes = [];
}


/**
 * If the node is a node's drawable, that is, if the node can change the default figure 
 * by other associated to a stereotype.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method isDrawableStereotype
 *
 */

UMLStereotypedElement.prototype.isDrawableStereotype = function( ){

	//List of drawable nodes that can't be modified from out of method
	var _umlDrawableStereotypes = [  'UMLActor', 'UMLUseCase', 'UMLUseCaseExtended', 'UMLSystem', 'UMLSubSystem',
																	 'UMLClass', 'UMLComponent', 'UMLInterfaceExtended','UMLPackage', 'UMLPackageContainer',
																	 'UMLComComponent','UMLInterface', 'UMLOption', 'UMLAlternative',
																	 'UMLLoop', 'UMLBreak','UMLAcceptEventAction','UMLTimeEvent', 'UMLSendSignalAction', 
																	 'UMLAction','UMLObject', 'UMLActivity',  'UMLDataStore', 'UMLConnectorActivity' , 
																	 'UMLHorizontalHierarchicalSwimlane','UMLVerticalHierarchicalSwimlane',
																	 'UMLSimpleState', 'UMLCompositeState', 'UMLVerticalRegion', 'UMLPin', 'UMLParameterNode',
																	 'UMLExpansionNode', 'UMLHorizontalRegion', 'UMLPort', 'UMLTerminate', 'UMLEntryPoint', 
																	 'UMLExitPoint', 'UMLJunction', 'UMLFlowFinal', 'UMLDataType'  ];
	
	//If the type of the node match with some of the list
	for(var i=0;i<_umlDrawableStereotypes.length;i++)
		if(this._parent.getType() == _umlDrawableStereotypes[i])
			return true;

	return false;
}


/**
 * Set the array that contains the object Stereotype 
 * that can be applied to the element UML. This array 
 * is passed from the extern application 
 * 
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setStereotypesProfile
 * @param {Array} stereotypes Array of stereotypes that contains the stereotypes's object
 *
 */

UMLStereotypedElement.prototype.setStereotypesProfile = function( stereotypes ){

	//Element UML that contains the stereotyped properties
	var elem = this._parent;
	if(!elem)
		return;

	this._stereotypes = stereotypes;
}


/**
 * Apply the stereotype passed as parameter to the element UML('this._parent'), 
 * adding the tag values of the stereotype to the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method applyStereotype
 * @param {Stereotype} stereotype Object Stereotype to apply 
 *
 */

UMLStereotypedElement.prototype.applyStereotype = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;

	//Ensure that there are an element in that the stereotype is applied
	var elem = this._parent;
	if(!elem)
		return false;

	var i;
	var found = false;
	var stereotypeName = '\xAB' + stereotype.getName() + '\xBB';

	/*
		If the name of the stereotype is found between its 
		stereotype tags, the stereotype isn't applied
	*/
	for(i=0;i<elem.getStereotype()._childs.length && !found;i++)
		if( stereotypeName == elem.getStereotype()._childs[i]._text &&		
			 stereotype._validMetaclass(elem.getType()))
			found = true;

	/*
		If the name of the stereotype hasn't been found between its 
		stereotype tags, the stereotype is applied
	*/
	if(!found){

		elem.addStereotype(stereotype.getName());

		//Adds to the array of applied stereotypes
		this._appliedStereotypes.push(stereotype);

		//Set the tag values of the stereotype to the element UML
		elem.setTagValues(stereotype.getTagValues());
		elem.notifyDraw();

		return true;
	}
	return false;
}

/**
 * Draws the element UML using the figure associated 
 * to the stereotype passed as parameter. A condition
 * to draws this figure is that the stereotype has been
 * applied previously
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showStereotype
 * @param {Stereotype} stereotype Object Stereotype whose image will be used to draw the node
 *
 */

UMLStereotypedElement.prototype.showStereotype = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;


	//Ensure that there are an element in that the stereotype is applied
	var elem = this._parent;
	var found = false;
	if(!elem)
		return false;

	//Only can be draw the figure, if the stereotype has been applied previously
	for(var i=0;i<this._appliedStereotypes.length;i++){
		if(this._appliedStereotypes[i] == stereotype){
			found = true;
			break;
		}
	}

	//Draws the figure or image associated to the stereotype
	if(found){
		if( !this.drawStereotype(stereotype) )
			return false;

		elem.notifyDraw();
		return true;
	}
	return false;
}


/**
 * Draws the figure associated to the stereotype passed like parameter(if has). First, 
 * this figure is seacrh in the figure's array of the element, and after, 
 * if this figure isn't found, the figure is added to the figure's array 
 * and the position of this figure in the array is selected to next draws of the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method drawStereotype
 * @private
 * @param {Stereotype} stereotype Object of Stereotype type that constains the figure to add(if isn't added) and draw
 *
 */

UMLStereotypedElement.prototype.drawStereotype = function( stereotype ){

	//Ensure that there are an element in that the stereotype is applied
	var elem = this._parent;
	if(!elem)
		return false;

	/*
		If there aren't stereotype passed like parameter, it is selected the figure 0 and it is drawn.
		If the node isn't a drawable element, it also is selected the figure 0.
	*/
	if(!stereotype || !this.isDrawableStereotype()){
		elem.setSelectedFigure(0);
		elem.notifyDraw();
		return false;
	}
			
	var found = false;

	/*
		If the figure exist in the  figures array of  the element, select 
		the figure's position to draw so that next calls to the method drawFigures draw the updated figure
	*/
	for(var i=0;i<elem._figures.length && !found;i++){

		if(elem._figures[i].route && elem._figures[i].route == stereotype.getPath()){

			/*
				if some figure has the same route that the stereotype's route, 
				and this stereotype isn't added in the array of associated
				stereotypes of the figure, this stereotype is added 			
			*/
			if(!elem._figures[i].foundInAssociatedStereotypes( stereotype ))
				elem._figures[i].addAssociatedStereotype(stereotype);

			elem.setSelectedFigure(i);
			found = true;
		}
	}

	/*
		if the stereotype's figure hasn't been founded in the figure's array, it is added this figure to the figure's array 
		and the position of this figure is selected so that next calls to the method drawFigures  draw the updated figure
	*/
	if(!found && stereotype.getPath()){
		elem.addFigure(new FromImageFigure({route: stereotype.getPath()}));
		elem._figures[elem._figures.length-1].addAssociatedStereotype(stereotype);
		elem.setSelectedFigure(elem._figures.length-1);
	}
	return true;
}



/**
 * If the object stereotype passed as paramter has been applied
 * to the element UML are performed the following actions: 
 * 		- remove tag values associated to the object Stereotype
 * 		- remove figure associated to the object stereotype
 *  	- remove tag stereotype of the element that contains the name of the stereotype
 * 		- remove the stereotype of the array of applied stereotypes to the element
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method removeStereotype
 * @param {StereotypeTag} dcomp Component to check if there are a match in the stereotypes array.
 * 
 */

UMLStereotypedElement.prototype.removeStereotype = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;

	var found = false;
	
	/*
		Search if the stereotype pass as parameter has been applied previously
	*/
	for(var i=0;i<this._appliedStereotypes.length && !found;i++){
		if(stereotype == this._appliedStereotypes[i])
			found = true;
	}

	//If a match has been found
	if(found){

		//Remove all tag value that is found in the selected stereotype
		this.removeTagValues( stereotype );

		//remove the figure, if necessary
		this.removeFigure( stereotype );

		//Remove the stereotype tag
		this.deleteStereotypeTag( stereotype );

		//Remove the stereotype of the array of applied stereotypes
		this.removeAppliedStereotype( stereotype );
	}
	
	return true;
}


/**
 * Remove the tag values of the element UML that has been added to the 
 * node by the application of the stereotype object passed as parameter.
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method removeTagValues
 * @param {StereotypeTag} stereotype Stereotype object whose tag values will be removed of the element
 * 
 */

UMLStereotypedElement.prototype.removeTagValues = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;


	var tagValues = this._parent._tagValues;
	var childs = stereotype._components[3]._childs;
	var i,j;
	var found = false;

	//Remove all tag value that is found in the object stereotype
	i = 0;
	while(tagValues[i]){

		found = false;

		/*
			Deletes any tag value of the element that match 
			with a tag value of the object stereotype passed 
			as parameter
		*/
		for(j=0;j<childs.length && !found;j++){
			if(tagValues[i][0] == childs[j].getNameTagValue()){
				found = true;
		    tagValues.splice( i, 1 );
			}
		}
	
		//It is increased the value of 'i' for the next iteration
		if(!found)
			i++;			
	}
	return true;
}


/**
 * Remove the image of the element UML that has been added to the 
 * element UML by the application of the stereotype object passed as parameter.
 *   ​​
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method removeFigure
 * @param {StereotypeTag} stereotype Stereotype object whose figure will be removed
 * 
 */

UMLStereotypedElement.prototype.removeFigure = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;

	var i;

	for(i=0;i<this._parent._figures.length;i++){

		/*
			if some figure contains to the stereotype in your array
		  of associated stereotype, the stereotype is removed of the array, 
			and if this array is empty, the figure is remove
		*/
		if(this._parent._figures[i] instanceof FromImageFigure && this._parent._figures[i].foundInAssociatedStereotypes( stereotype )){

			//Remove the stereotype of the array of associated stereotypes			
			this._parent._figures[i].delAssociatedStereotype(stereotype);
			this.drawStereotype(null);

			//Remove the figure if the array of associated stereotypes is empty
			if(!this._parent._figures[i]._associatedStereotypes.length)
				this._parent.delFigure(this._parent._figures[i]);

//			break;
			return true;
		}
	}		
	return false;
}


/**
 * Remove the stereotype tag of the element UML that has been added to the 
 * node by the application of the stereotype object passed as parameter.
 *   ​​
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method deleteStereotypeTag
 * @param {StereotypeTag} stereotype Stereotype object 
 * 
 */
UMLStereotypedElement.prototype.deleteStereotypeTag = function( stereotype ){

	//If the parameter isn't of object Stereotype, the function doesn't run
	if(!(stereotype instanceof Stereotype))
		return false;

	var childs = this._parent.getStereotype()._childs;
	var i;

	//If there are some tag stereotype with the name of the object stereotype, this is delete
	for(i in childs){
	  if( childs[i]._text == '\xAB' + stereotype.getName() + '\xBB' ) {
	    childs.splice( i, 1 );
			break;
	  }
	}
	//Notify changes of the component Stereotype
	this._parent.getStereotype().notifyChange();
}


/**
 * Remove the stereotype passed as parameter of the array of applied 
 * stereotypes that saves the element
 *   ​​
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method removeAppliedStereotype
 * @param {StereotypeTag} stereotype Stereotype object that will be removed
 * 
 */

UMLStereotypedElement.prototype.removeAppliedStereotype = function( stereotype ){

	for(var i=0;i<this._appliedStereotypes.length;i++){
		if(stereotype == this._appliedStereotypes[i])
	    this._appliedStereotypes.splice( i, 1 );
			break;
	}
}


/**
 * This method is called when the object stereotype passed as parameter going to change its name.
 * Is searched the stereotype tag that contains the name of the object stereotype, and if this is 
 * found, this stereotype tag changes its name by the value of the newName parameter (that has 
 * the name that the object stereotype will have)   
 *   ​​
 * @author Rafael Molina Linares
 * @update 14/10/2011
 *
 * @method changeNameStereotype
 * 
 */

UMLStereotypedElement.prototype.changeNameStereotype = function( stereotype , newName){

	
	var found = false;
	
	/*
		If the stereotype pass as parameter has been applied previously
	*/
	for(var i=0;i<this._appliedStereotypes.length && !found;i++){
		if(stereotype == this._appliedStereotypes[i])
			found = true;
	}

	//If a match is found
	if(found){

		//Change the text of the stereotype tag
		var	childs = this._parent.getStereotype()._childs;
		for(i in childs){
		  if( childs[i]._text == '\xAB' + stereotype.getName() + '\xBB' ) {
		    childs[i].setText(newName, true);
				break;
		  }
		}
		//notify change in the node
		this._parent.getStereotype().notifyChange();
	}
}


/**
 * Updates the tag values (adding or deleting the tag values) take in account 
 * the tag stereotypes that the node has added to apply an object stereotype.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method updateElementStereotypes
 *
 */

UMLStereotypedElement.prototype.updateElementStereotypes = function( ) {

	var stereotypeTags = this._parent.getStereotype()._childs;
	var stereotypesTagValues = [];
	var found = false;

	//Adds the stereotype tags defines in some profile that not are yet added
	for(var i=0;i<this._appliedStereotypes.length;i++){
		found = false;

		//If the element can apply the stereotype
		if(this._appliedStereotypes[i]._validMetaclass(this._parent.getType())){

			//Is searched a match between the name of the stereotype and some stereotype tag of the text
			for(var j=0;j<stereotypeTags.length && !found;j++){
			
				//If is found a match
				if( '\xAB' + this._appliedStereotypes[i].getName() + '\xBB' == stereotypeTags[j]._text ){

					//Tag values of the object steretype are added to an array that is used later
					for(k=0;k<this._appliedStereotypes[i]._components[3]._childs.length;k++)
						stereotypesTagValues.push([this._appliedStereotypes[i]._components[3]._childs[k].getNameTagValue(),
																			 this._appliedStereotypes[i]._components[3]._childs[k].getDefaultValue()]);
					found = true;
				}
			}
		}
	}

	/*
		Remove the tag values belonged to applied stereotypes that 
		have been removed of its corresponding object stereotype
	*/
	var tagValues = this._parent._tagValues;
	i = 0;
	while(tagValues[i]){

		found = false;
		for(j=0;j<stereotypesTagValues.length && !found; j++){
			if(stereotypesTagValues[j][0] == tagValues[i][0]){
				found = true;
				i++;
			}
		}
		if(!found)
			tagValues.splice(i,1);
	}

	/*
		Adds the tag values belonged to applied stereotypes to the 
		element, and this isn't saves in the array of tag values 
		of the element
	*/
	var tagValues = this._parent._tagValues;
	for(i in stereotypesTagValues){
		found = false;
		for(j=0;j<tagValues.length && !found;j++){
			if(stereotypesTagValues[i][0] == tagValues[j][0])
				found = true;
		}
		if(!found)
			tagValues.push(stereotypesTagValues[i]);
	}		
}


/**
 * Show the dialog that contains the tag values of the element 
 * 
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showTagValuesDialog
 * 
 */

UMLStereotypedElement.prototype.showTagValuesDialog = function(  ) {

	//Element that has the properties of stereotyped
	var that = this._parent;

  //Div that contains to the form
  var div = document.createElement("div");
  div.className = "ud_popup";

	//Form that contains the tag values 
  var form = document.createElement("form");
  var fields = [];
  var i;  
  
   //Create fields of form 
  for( i = 0; i < that._tagValues.length; i++ ){
    fields.push( document.createElement("input") );
  }
    
	//Create the ok buttom
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  //Assign a value to the tad values
  for( i = 0; i < that._tagValues.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', that._tagValues[i][1] || '' );
  }
 

	//Method of the click event of buttom 'ok'
  var changeText = function ( event ) {
    var i;
		for( i = 0; i < that._tagValues.length; i++ ) {
			that._tagValues[i][1] = fields[i].value;
		}                    
    document.body.removeChild( div );
  }
 

	//Method of the click event of buttom 'delete'
  var closeDialog = function ( event ) {
      document.body.removeChild( div );
  }

  form.onsubmit = function() { return false; }
  
  ok.addEventListener("click", changeText, false);
  
  
  var label;
  var divaux;
	
	var labels = [];

	//Assign the name of the tag values
	for(i=0;i<fields.length;i++){		
		labels.push(that._tagValues[i][0]);
	}
  
	//Add each label and input field to the form
  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );
    
    divaux.appendChild( label );
    divaux.appendChild( fields[i] );
    
    form.appendChild( divaux );
  }

  //Adds the 'ok' buttom to the form
  form.appendChild( ok );
  
	//Adds form to div
  div.appendChild( form );

	//Add diw to document HTML
  document.body.appendChild( div );
  
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}




/**
 * Show the dialog with the possible stereotypes to apply to the element
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method showApplyStereotypesDialog
 */

UMLStereotypedElement.prototype.showApplyStereotypesDialog = function( ) {
  
	//Element UML that contains the properties of stereotyped
  var that = this._parent;

	//Objects Stereotype that can be applied
	var stereotypes = this._stereotypes;

  //Div that contains to the form
  var div = document.createElement("div");
  div.className = "ud_popup";

	//Form that contains the possible stereotype to apply
  var form = document.createElement("form");
  var fields = [];
	var i,j,k;
	var metaclass = [];
	
	var childs = [];
	var nodeChild;

	//Saves the stereotypes of the component
	for(i=0;i<that._components.length;i++){
		
		//If the component is of StereotypeFields type, means that constains a set of stereotypes inside
		if(that._components[i] instanceof StereotypeFields){

			//Stereotypes of the StereotypeFields
			childs = that._components[i]._childs;
			for(j=0;j<childs.length;j++){

				//If the stereotype hasn't yet been in the 'fields' array
				if(!fields[childs[j].getValue()]){
					fields[childs[j].getValue()] = that;
				}
			}
		}
	}

	//If the node is a super-node, should be looked at the child nodes of this in search of stereotypes
	if(that instanceof SuperNode){

		//For each child node
		for(i=0;i<that._nodeChilds.length;i++){

			//For each component of the child node
			for(j=0;j<that._nodeChilds[i]._components.length;j++){

				//If the component is of StereotypeFields type, means that constains a set of stereotypes inside				
				if(that._nodeChilds[i]._components[j] instanceof StereotypeFields){

					//Stereotypes contains in the StereotypeFields component
					childs = that._nodeChilds[i]._components[j]._childs;

					//For each stereotype
					for(k=0;k<childs.length;k++){
				
						//If the stereotype hasn't yet been in the 'fields' array
						if(!fields[childs[k].getValue()])
							fields[childs[k].getValue()] = that._nodeChilds[i];
					}
				}
			}
		}
	}


	//Saves the Stereotype objects that have between its metaclasses to the element UML
	for(i=0;i<stereotypes.length;i++){

		//Metaclasses related with the stereotype object because of a extension's relation
		metaclass = stereotypes[i]._metaclass;

		//For each metaclass
		for(j=0;j<metaclass.length;j++){

			//If the metaclass's name match with the element's type of the current node
			if(metaclass[j].getName() == that.getType()){

				//If the stereotype hasn't yet been in the 'fields' array
				if(!fields['\xAB' + stereotypes[i].getName() + '\xBB'])
					fields['\xAB' + stereotypes[i].getName() + '\xBB'] = that;
			}
		}
	}

	/*
		If the node is a super-node, saves the name of the stereotype objects
		that keep relation with metaclasses defined to the same element 
		type than some child node of the supernode
	*/
	if(that instanceof SuperNode){	
		for(k=0;k<that._nodeChilds.length;k++){

			//Child node of super-node
			nodeChild = that._nodeChilds[k];

			//If the child node of super-node contains stereotyped properties, and then, can be stereotyped
			if(nodeChild._stereotypeProperties){
				for(i=0;i<nodeChild._stereotypeProperties._stereotypes.length;i++){

					//Metaclasses related with the stereotype object because of a extension's relation
					metaclass = nodeChild._stereotypeProperties._stereotypes[i]._metaclass;

					//For each metaclass
					for(j=0;j<metaclass.length;j++){

						//If the metaclass's name match with the element's type of the current child node
						if(metaclass[j].getName() == nodeChild.getType()){

							//If the stereotype hasn't yet been in the 'fields' array
							if(!fields['\xAB' + that._stereotypeProperties._stereotypes[i].getName() + '\xBB'])
								fields['\xAB' + that._stereotypeProperties._stereotypes[i].getName() + '\xBB'] = that._nodeChilds[k];
						}
					}
				}
			}
		}
	}

	//If the element don't contain any stereotype tag, the dialog isn't shown
	var	found = false;
	for(i in fields)
		found = true;
	if(!found)	
		return;

  
  //Create element select of the form
  var sel;  
  textField = document.createElement('select');

	//Create option by default
  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('default') );
  textField.appendChild( sel );

	//Create a option for each stereotype tags stored in the 'fields' array
	for(i in fields){

			sel = document.createElement('option');
			sel.setAttribute( 'value', i);
			sel.appendChild( document.createTextNode(i) );
			textField.appendChild( sel );
	}


	//Create the 'ok' button and its properties
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );
  

	//Method of the click event of buttom 'ok'
  var changeText = function ( event ) {

      var values = [];
			var found = false;
			var element;
      
      var i,j;

			//It is searched the element in which the stereotype going to be applied
			for(i in fields){

					if(textField.value == i){
						element = fields[i];
						break;
					}
			}
		
			for( i = 0; i < stereotypes.length && !found; i++ ) {
				
				//If there are some object stereotype whose name match with the value of the select element
				if('\xAB' + stereotypes[i].getName() + '\xBB' == textField.value){

					//The stereotype is applied
					if(element._stereotypeProperties)
						element._stereotypeProperties.applyStereotype(stereotypes[i]);

					found = true
				}
			}
      //Remove the div that contains the form                 
      document.body.removeChild( div );
  }
 

	
  var closeDialog = function ( event ) {
      document.body.removeChild( div );
  }

  form.onsubmit = function() { return false; }
  
  ok.addEventListener("click", changeText, false);
    
	//Adds select element to form
  form.appendChild( textField );  

	//Adds ok button to the form
  form.appendChild( ok );
  
	//Adds form to div
  div.appendChild( form );
		
	//Adds div to the HTML document
  document.body.appendChild( div );
  
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



/**
 * Show the dialog that contains the sterotypes 
 * that have been applied to the element
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method showStereotypeDialog
 * 
 */
UMLStereotypedElement.prototype.showStereotypesDialog = function(  ) {
  
  var that = this._parent;
	var stereotypes = that._stereotypeProperties._appliedStereotypes;

  //Div that contains the form with all the applied stereotypes
  var div = document.createElement("div");
  div.className = "ud_popup";

	//Form that contains the applied stereotypes
  var form = document.createElement("form");
  var fields = [];
	var i,j,k;
	var metaclass = [];
	
	var childs = [];
	var nodeChild;


	//Saves the Stereotype objects that have been applied to the element
	for(i=0;i<stereotypes.length;i++){

		//If the stereotype hasn't yet been in the 'fields' array
		if(!fields['\xAB' + stereotypes[i].getName() + '\xBB'])
			fields['\xAB' + stereotypes[i].getName() + '\xBB'] = that;
	}

	/*
		If the node is a super-node, saves the name of the stereotype objects
		that keep relation with metaclasses defined to the same element 
		type than some child node of the supernode
	*/
	if(that instanceof SuperNode){	
		for(k=0;k<that._nodeChilds.length;k++){

			//Child node of super-node
			nodeChild = that._nodeChilds[k];

			//If the child node of super-node contains stereotyped properties, and then, can be stereotyped
			if(nodeChild._stereotypeProperties){
				//Saves the Stereotype objects that have between its metaclasses to the 'that' element
				for(i=0;i<stereotypes.length;i++){

					//If the stereotype hasn't yet been in the 'fields' array
					if(!fields['\xAB' + stereotypes[i].getName() + '\xBB'])
						fields['\xAB' + stereotypes[i].getName() + '\xBB'] = that._nodeChilds[k];
				}
			}
		}
	}

	//If the element don't contain any stereotype component, the dialog isn't shown
	var	found = false;
	for(i in fields)
		found = true;
	if(!found)	
		return;

  
  //Create element select of the form
  var sel;  
  textField = document.createElement('select');

	//Create option by default
  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('default') );
  textField.appendChild( sel );

	//Create a option for each stereotype tags stored in the 'fields' array
	for(i in fields){

			sel = document.createElement('option');
			sel.setAttribute( 'value', i);
			sel.appendChild( document.createTextNode(i) );
	
			/*
				If the stereotype object is the object that has been applied the last time, 
				the selected attribute is added to  the option of this object 
			*/
			if(that._stereotypeProperties._shownStereotype && that._stereotypeProperties._shownStereotype == i)
				sel.setAttribute( 'selected', 'selected');

			//Adds option to select element
			textField.appendChild( sel );
	}


	//Create the 'ok' button and its properties
  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );
  

	//Method of the click event of buttom 'ok'
  var changeText = function ( event ) {

      var values = [];
			var found = false;
			var element;
      
      var i,j;

			//It is searched the element in which the stereotype going to be applied
			for(i in fields){
					if(textField.value == i){
						element = fields[i];
						break;
					}
			}
		
			for( i = 0; i < stereotypes.length && !found; i++ ) {
				
				//If there are some object stereotype whose name match with the value of the select element
				if('\xAB' + stereotypes[i].getName() + '\xBB' == textField.value){

					//The stereotype is applied
					element._stereotypeProperties.showStereotype(stereotypes[i]);

					//Save the name of object stereotype applied
					that._stereotypeProperties._shownStereotype = textField.value;
					found = true
				}
			}

			//If hasn't been found any object stereotype that match with the value of the select element
			if(!found){
				that._stereotypeProperties._shownStereotype = '';
				that._stereotypeProperties.drawStereotype(null);
			}
                       
      document.body.removeChild( div );
  }
 


  var closeDialog = function ( event ) {
      document.body.removeChild( div );
  }

  form.onsubmit = function() { return false; }  
  ok.addEventListener("click", changeText, false);
  

  
	//Adds select element to form
  form.appendChild( textField );  

	//Adds ok button to the form
  form.appendChild( ok );
  
	//Adds form to div
  div.appendChild( form );
		
	//Adds div to the HTML document
  document.body.appendChild( div );
    
  //Center the form
  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



/**
 * Define the necessary properties so that an element can be stereotyped by the use of profiles
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setStereotypesProfile
 * @param {UMLElement} element UML element that will add the properties of stereotyped 
 * @param {Array} stereotypes Array of possible objects Stereotype that can be applied to this element UML
 *
 */

var setStereotypeProperties = function( element, stereotypes ){

	element._stereotypeProperties = new UMLStereotypedElement({stereotypes: stereotypes, parent: element});
}




/**
 * Get the properties of an element which can be use for stereotype it by the use of profiles
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 26/10/2012
 *
 * @method getStereotypesProfile
 * @param {UMLElement} element UML element that will get the properties of stereotyped 
 *
*/
var getStereotypeProperties = function( element){

	return element._stereotypeProperties;
}