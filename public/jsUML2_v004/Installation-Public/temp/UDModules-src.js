


/**
 * Aggregation class constructor, creates a Aggregation in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Aggregation
 * @extends Relation
 *
 */

var Aggregation = function( params ) {

  params = params || {};
  Aggregation.baseConstructor.call(this,params);
}
JSFun.extend(Aggregation,Relation);

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Aggregation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Aggregation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A
 *
 */

Aggregation.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role A
 *
 */

Aggregation.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Aggregation.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Aggregation.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Aggregation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Aggregation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Aggregation.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Aggregation.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Aggregation.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Aggregation.prototype.getMultiplicityB = function( ){
	return this._components[5].getValue( );
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Aggregation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * Set the relation directed to A elem
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to A elem or not
 */
Aggregation.prototype.setDirectionToA = function(directed) {
	this._directionA=directed;
	if(directed==true){
		this.setStart(new OpenTipAggregationEnd());
	}
	else{
		if(this._start instanceof OpenTipAggregationEnd)this.setStart(new AggregationEnd());
	}
}



/**
 * Association class constructor, creates a relation of association in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Association
 * @extends Relation
 *
 */

var Association = function( params ) {

  params = params || {};
  Association.baseConstructor.call(this,params);
}
JSFun.extend(Association,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Association.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Association.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A
 *
 */

Association.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role B
 *
 */

Association.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Association.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Association.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Association.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Association.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Association.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Association.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Association.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Association.prototype.getMultiplicityB = function( ){
	return this._components[5].getValue( );
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Association.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Class class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class Class
 * @extends Rectangular
 *
 */

var Class = function( params ) {

  params = params || {};
  this._abstract=false;
  Class.baseConstructor.call(this,params);
}
JSFun.extend(Class,Rectangular);




/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
Class.prototype.getElementXML = function( parent ) {
	  var xmlnode = Class.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
	}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
Class.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  Class.base.setElementXML.call( this, xmlcomponent );
	}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Class.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Class.prototype.setName = function( text ){
	this._components[1].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Class.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[2].addField( text );
}




/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

Class.prototype.addOperation = function(text){
	var text = text || '';
	this._components[3].addField( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Class.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Class.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

Class.prototype.getAttributes = function( ){
	return	this._components[2]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

Class.prototype.getOperations = function( ){
	return	this._components[3]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Class.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Class.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
Class.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
Class.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * ClassDiagram class constructor, creates a diagram of state machine
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class ClassDiagram
 * @extends Diagram
 *
 */
var ClassDiagram = function( params ){
	ClassDiagram.baseConstructor.call(this,params);
}
JSFun.extend(ClassDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

ClassDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

ClassDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

		obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
    	this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}




/**
 * ComponentElement ComponentElement constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @ComponentElement ComponentElement
 * @extends Rectangular
 *
 */

var ComponentElement = function( params ) {

  params = params || {};
  this._abstract=false;
  ComponentElement.baseConstructor.call(this,params);
}
JSFun.extend(ComponentElement,Rectangular);




/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
ComponentElement.prototype.getElementXML = function( parent ) {
	  var xmlnode = ComponentElement.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
ComponentElement.prototype.setElementXML = function( xmlcomponent ) {
	  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
	  ComponentElement.base.setElementXML.call( this, xmlcomponent );
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

ComponentElement.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

ComponentElement.prototype.setName = function( text ){
	this._components[3].setValue( text );
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

ComponentElement.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[4].addField( text );
}


/**
 * Adds new item to the operation fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

ComponentElement.prototype.addOperation = function(text){
	var text = text || '';
	this._components[5].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

ComponentElement.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
ComponentElement.prototype.getName = function( ){
	return this._components[3].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

ComponentElement.prototype.getAttributes = function( ){
	return	this._components[4]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

ComponentElement.prototype.getOperations = function( ){
	return	this._components[5]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

ComponentElement.prototype.getStereotype = function(){
	return this._components[1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
ComponentElement.prototype.getNameAsComponent = function( ){
	return this._components[3];
}




/**
 * Returns the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the component is abstract
 *
 */
ComponentElement.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the component
 *
 */
ComponentElement.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * Composition class constructor, creates a relation of composition in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Composition
 * @extends Relation
 *
 */

var Composition = function( params ) {

  params = params || {};
  Composition.baseConstructor.call(this,params);
}
JSFun.extend(Composition,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Composition.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Composition.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A
 *
 */

Composition.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role A
 *
 */

Composition.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Composition.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Composition.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Composition.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Composition.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Composition.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Composition.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Composition.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Composition.prototype.getMultiplicityB = function( ){
  return this._components[5].getValue( );
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Composition.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * Set the relation directed to A elem
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to A elem or not
 */
Composition.prototype.setDirectionToA = function(directed) {
	this._directionA=directed;
	if(directed==true){
		this.setStart(new OpenTipCompositionEnd());
	}
	else{
		if(this._start instanceof OpenTipCompositionEnd)this.setStart(new CompositionEnd());
	}
}

/**
 * DataType class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class DataType
 * @extends Rectangular
 *
 */

var DataType = function( params ) {

  params = params || {};
  this._abstract=false;
  DataType.baseConstructor.call(this,params);
}
JSFun.extend(DataType,Rectangular);

/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

DataType.prototype.setName = function( text ){
	this._components[2].setValue( text );
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

DataType.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

DataType.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

DataType.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
DataType.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

DataType.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
DataType.prototype.getNameAsComponent = function( ){
	return this._components[2];
}




/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

DataType.prototype.addOperation = function(text){
	var text = text || '';
	this._components[4].addField( text );
}




/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

DataType.prototype.getOperations = function( ){
	return	this._components[4]._childs;
}






/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

DataType.prototype.getStereotype = function(){
	return this._components[1];
}






/**
 * Returns the property abstract of the data type
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
DataType.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the data type
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
DataType.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * Dependency class constructor, creates a relation of dependency in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Dependency
 * @extends Relation
 *
 */

var Dependency = function( params ) {

  params = params || {};
  Dependency.baseConstructor.call(this,params);
}
JSFun.extend(Dependency,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Dependency.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Dependency.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Dependency.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Dependency.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Dependency.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Generalization class constructor, creates a generalization in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Generalization
 * @extends Relation
 *
 */

var Generalization = function( params ) {

  params = params || {};
  Generalization.baseConstructor.call(this,params);
}
JSFun.extend(Generalization,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Generalization.prototype.addStereotype = function( text ){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Generalization.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Generalization.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Generalization.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Generalization.prototype.getNameAsComponent = function( ){
	return this._components[1];
}





/**
 * GeneralizationSet class constructor, creates a relation of GeneralizationSet in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @class GeneralizationSet
 * @extends Relation
 *
 */

var GeneralizationSet = function( params ) {
  params=params || {};
  this._pivotP=2;
  GeneralizationSet.baseConstructor.call(this);
}
JSFun.extend(GeneralizationSet,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

GeneralizationSet.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
GeneralizationSet.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

GeneralizationSet.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
GeneralizationSet.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
GeneralizationSet.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
GeneralizationSet.prototype.getRelations=function() {
	return this._relations;
}




/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
GeneralizationSet.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(GeneralizationSet.base.setElements.call(this,elem,elem2))
		{
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem.length>1)
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			this._calculateLineEnds();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 04/09/2012
 *
 * @method getRelation
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
GeneralizationSet.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA===elem || this._relations[i]._elemB===elem)return this._relations[i];
	 }
}



/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
GeneralizationSet.prototype.addElement = function( elem) {
	if(!(elem instanceof Node) )return false;

	for(i in this._relations ) if(this._relations[i]._elemA==elem || this._relations[i]._elemB==elem )return false;

   relation=new SetLine({a:elem,b:this});
   relation._calculateLineEnds();

   var newP=new Point(relation.getCentralPoint());
   this._points.splice(this._pivotP,0,newP);

   relation._calculateLineEnds();

   relation._points[2]=this._points[this._pivotP];
   this._pivotP++;

   this.notifyChange();
   return true;

}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/03/2013
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
GeneralizationSet.prototype.delElement = function( elem) {
	if(!(elem instanceof Node) )return false;

  for(i in this._relations ){
	  if(this._relations[i]._elemA===elem  || this._relations[i]._elemB===elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }

  return false;
}




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
GeneralizationSet.prototype.notifyDeleted = function( elem ) {
	  for(i=0;i<this._relations.length;i++ ){
		  if(this._relations[i]===elem && this._relations[i].getType()=="SetLine"){
			  this._relations.splice( i, 1 );
			  this._pivotP--;
			  this._points.splice( 2+i, 1 );
		  }
	  }
}


/**
 * Calculates the final points of the relation
 * that are in contact with the nodes
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _calculateLineEnds
 * @private
 */

GeneralizationSet.prototype._calculateLineEnds = function( ) {
	  var pointA, pointB;
	  var npoints = this._points.length;

	   if(!this._points[3]){
		      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
		      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

		      this._points[0] = pointA;
		      this._points[1] = pointB;
		      this._points[1] = new Point(this.getCentralPoint());
		      this._points[2]= new Point(this.getCentralPoint());
		      this._points[3]=this._points[1];
		      this._points[1]=this._points[2];
		      this._points[2]=this._points[3];
		      this._pivotP=2;
              this._points[3]= pointB;

		 }

	  if( this._elemA == this._elemB ) {
		var center = this._elemA.getCentralPoint();
	    var cx = center.getX();
	    var cy = center.getY();

			var x = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
			var y = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
			var heightPoints;
			var widthPoints;

			if(this._selected == 2 || this._selected == 0 || this._selected == npoints-1 ||
			   (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing){

				if((x - cx) > 0){
					if((y-cy) > 0){	//Fourthy quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					} else {	//First quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					}
				} else {

					if((y-cy) > 0){	//Third quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					} else {	//Second quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					}
				}
			} else if(this._selected == 3){

				x = this._points[3]._x;
				y = this._points[3]._y;

				pointA = this._elemA.getLinkCentered( cx, this._points[0]._y  );

				if((x - cx) > 0){

					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() + widthPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				} else {

					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() - widthPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				}
			} else if(this._selected == 1){

				x = this._points[1]._x;
				y = this._points[1]._y;

				pointB = this._elemA.getLinkCentered( this._points[4]._x, cy );

				if((y - cy) > 0){

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					heightPoints  = y - pointA.getY();
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2].setY(pointA.getY() + heightPoints );
				} else {

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					heightPoints  = pointA.getY() - y;
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2].setY(pointA.getY() - heightPoints);
				}
			}
			else if(this._selected == 2){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			   else if(this._selected == -1){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			this._points[0] = pointA;
		  this._points[4] = pointB;

			while(this._points[5])
				this._points.pop();

	  }
	  else {
		  if( npoints == 4 ) {
		      pointA = this._elemA.getLinkCentered( this._points[1] );
		      pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		      this._points[0] = pointA;
              this._points[3]= pointB;
		    }

		    else if(npoints > 4 ){
		        pointA = this._elemA.getLinkCentered( this._points[1] );
		        pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		        this._points[0] = pointA;
		        this._points[this._points.length-1]= pointB;

		        for(i=0;i<this._relations.length;i++)this._relations[i]._calculateLineEnds();
		       	if(this._orientation){
		       		for(i=1;i<this._pivotP;i++)this._points[i].setX(this._points[this._pivotP].getX());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setY(this._points[1].getY()+5);
		       		 }
		       		}
		       	else{
		       		for(i=1;i<this._pivotP;i++)this._points[i].setY(this._points[this._pivotP].getY());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setX(this._points[1].getX()+5);
		       		 }
		       		}
		    }
		    else {

			      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
			      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

			      this._points[0] = pointA;
			      this._points[1] = pointB;
			      this._points[1] = new Point(this.getCentralPoint());
			      this._points[2]= new Point(this.getCentralPoint());
			      this._points[3]=this._points[1];
			      this._points[1]=this._points[2];
			      this._points[2]=this._points[3];
			      this._pivotP=2;
	              this._points[3]= pointB;
		    }
		  }
}

/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points
 * and form a straight line
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
GeneralizationSet.prototype._delUselessPoints = function() {
	  var i;
	  for( i = this._points.length-1; i > this._pivotP; i-- ) {
	    if(this._selectLine( this._points[i+1],
	                          this._points[i-1],
	                          this._points[i].getX(),
	                          this._points[i].getY(), 10 ) )
	    {

	      this._points.splice(i, 1);
	    }
	  }

}

/**
 * The relation and its components are drawn with the defined style
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/ 22/09/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
GeneralizationSet.prototype.draw = function( context ) {
  var npoints = this._points.length;
  var points=[];
  for(i=this._pivotP; i<npoints ;i++){

	  points.push(this._points[i]);
  }
  if( this._line ) {
	  this._line.draw( context, points, this.getLineColor(),this.getLineWidth() );

  }
  if( this._end ){

    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx =this._points[ npoints - 1 ].getX();
    var by =this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    this._end.draw( context, bx, by, angle, this.getLineColor() );

  }

  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {

      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }

  }
	/*Drawing the line for the setlines*/
	  points=[];
	  for(i=1;i<=this._pivotP;i++){

		  points.push(this._points[i]);
	  }
	  if(points.length>1){

		  if(this.getLineStyle()=="solid")var a=new SolidLine();
		  else{var a=new DashedLine();}

	      a.draw(context, points, this.getLineColor(),this.getLineWidth());
	  }

	 /*Drawing the main line*/
	  points=[];
	  points[0]=this._points[0];
	  points[1]=this._points[1];
	  points[2]=this._points[this._pivotP];

	  if(this.getLineStyle()=="solid")var a=new SolidLine();
	  else{var a=new DashedLine();}

	  a.draw(context, points, this.getLineColor(),this.getLineWidth());


  if( this._selected > -1 ) {
    this._drawComponentsShape( context );

  }
  this._drawComponents( context );

}

/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 4/03/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
GeneralizationSet.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}

  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
    if( this._selected > -1 ) {

      if( this._isOverComponent( x, y, radius ) ) {
            this._selectedBefore = true;
            this._component=true;

            return true;
          }

    }

    for( var i = 0; i < this._points.length-1; i++ ) {
      if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

        if( this._selected > -1 )
          this._selectedBefore = true;

        this._selected = i;
        if(i>=this._pivotP){
            this._selectedLine = true;
            this._component=false;
        	this._points.splice( this._selected, 0, new Point(x,y) );
        }
        else if(i>=1){
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = this._pivotP;
        }
        else{
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = 1;

        }
        return true;
      }
    }



  return false;
}




/**
 * Calculates element orientation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method __calculateOrientation
 * @return {Boolean} True if the element was oriented along the x axis, False in other case.
 * @private
 */
GeneralizationSet.prototype._calculateOrientation = function() {
	  var m=(this._elemA.getCentralPoint().getY()-this._elemB.getCentralPoint().getY())
	  /(this._elemA.getCentralPoint().getX()-this._elemB.getCentralPoint().getX());
      return (m<1&&m>-1);
}



/**
 * Check is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isXOriented
 * @return {Boolean} If the element was oriented along the x axis
 */
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation;
}




/**
 * Check is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isYOriented
 * @return {Boolean} If the element was oriented along the y axis
 */
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation;
}




/**
 * Set is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setXOrientation
 */
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation=true;
}




/**
 * Set is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setYOrientation
 */
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation=false;
}




/**
 * return the orientation of the element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method getOrientation
 * @return {String} The axis of the element orientation
 */
GeneralizationSet.prototype.getOrientation = function() {
	if(this._orientation)return "x";
	return "y";
}



/**
 * The grafical style of the GeneralizationSet's lines and SetLines will be defined as style
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set to the relation and all his SetLines
 */
GeneralizationSet.prototype.setLineStyle = function(style){
	if(!(GeneralizationSet.base.setLineStyle.call(this,style)))return false;
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine"){
			if(!(this._relations[i].setLineStyle(style)))return false;
		}
	}
	return true;
}




/**
 * The color of the GeneralizationSet's lines and SetLines will be defined as color
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines and SetLines
 */

GeneralizationSet.prototype.setLineColor = function(color){
	GeneralizationSet.base.setLineColor.call(this,color)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineColor(color);
	}
}




/**
 * The width of the GeneralizationSet's lines and SetLines will be defined as width
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines and SetLines
 */
GeneralizationSet.prototype.setLineWidth = function(width) {
	GeneralizationSet.base.setLineWidth.call(this,width)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineWidth(width);
	}
}




/**
 * Constructor de la clase SetLine
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 07/10/2012
 *
 * @class SetLine
 * @extends Relation
 */
var SetLine = function( params ) {
	  params=params || {};
	  this._last=null;
	  this._id = 0;
	  this._type = 'SetLine';
	  this._line_color= '#000000';
	  this._line_width=1.25;
	  this._points = [ new Point(), new Point() ];

	  this._selected = -1;
	  this._selectedBefore = false;
	  this._moved = false;
	  this._activeComponent = null;


	  this._selectedLine = false;
	  this._selectedPoint = false;

	  this._relations= [];
	  this._components = [];
	  this._diagram = null;

	  this.setElements( params.a, params.b );
	  f=this;
	  if(this._elemB){
		  this.setMenu([[function(){f._elemB.showStyleDialog({that: f._elemB});f._elemB.removeContextualMenu();},'Style']]);
		  this.setLineStyle( this._elemB.getLineStyle() );
		  this.setLineColor(this._elemB.getLineColor());
		  this.setLineWidth(this._elemB.getLineWidth());
		  }
}
JSFun.extend(SetLine,Relation);




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
SetLine.prototype._delUselessPoints = function() {
}




/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 20/01/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 *
 */
SetLine.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */	  this.setType( 'SetLine' );
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}
  for( var i = 0; i > this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedLine = true;
      this._component=false;
      return true;
    }
  }
  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {
      if(i==2)return false;
      if( this._selected > -1 )
        this._selectedBefore = true;
      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
  for( var i = 0; i < this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }

  return false;
}




/**
 * Calculates the final points of the relation
 * that are in contact with the node and relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
*/
SetLine.prototype._calculateLineEnds= function() {
    if(!this._elemB)return false;
    var pointA=this._points[1];

	if(this._elemB._orientation){
	    if(this._points.length<3){
	    	var pointA= new Point(this._elemB._points[1].getX(),this._elemA.getCentralPoint().getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
	    }
	    else{
	    	if(this._elemA.isOver(this._points[2])){
	    		if(this._elemB._points[this._elemB._pivotP].getY()
		   			<this._elemA.getY())
		   		this._points[2].setY(this._elemA.getY()-20);
	    		else{this._points[2].setY(this._elemA.getY()+this._elemA.getHeight()+20);}
	    	}

		    if(this._points[0].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[2].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX()-10);

		    }
		    else if(this._points[2].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[0].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX()+this._elemA.getWidth());
				this._points[1].setX(this._elemA.getX()+this._elemA.getWidth()+10);

		    }

	    }

	}

	else{
		if(this._points.length<3){
			var pointA= new Point(this._elemA.getCentralPoint().getX(),this._elemB._points[1].getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
		}
		else{

			if(this._elemA.isOver(this._points[2])){
		    	if(this._elemB._points[this._elemB._pivotP].getX()
		    			<this._elemA.getX())
		    		this._points[2].setX(this._elemA.getX()-20);
		    	else{this._points[2].setX(this._elemA.getX()+this._elemA.getWidth()+20);}
		    }

		    if(this._points[0].getY()<=this._elemA.getY()
		    		&&this._points[2].getY()>this._elemA.getY()+this._elemA.getHeight())
		    	{
		    		this._points[0].setY(this._elemA.getY()+this._elemA.getHeight());
		    		this._points[1].setY(this._elemA.getY()+this._elemA.getHeight()+10);
		    	}
		    else if(this._points[0].getY()>=this._elemA.getY()+this._elemA.getHeight()
		    		&&this._points[2].getY()<=this._elemA.getY())
		    {
				this._points[0].setY(this._elemA.getY());
				this._points[1].setY(this._elemA.getY()-10);

		    }

		}

	}

	if(this._points.length<3){
		this._points[1]=pointA;
		this._points[1]=new Point(this.getCentralPoint());
		this._points[2]=pointA;
	}



	this._points[0]=this._elemA.getLinkCentered(this._points[1]);
}




/**
 * Receives a xml node with the information this.setElements( ids[ idElemA ], ids[ idElemB ] );of the relation and get it back
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
*/
SetLine.prototype.setElementXML = function( xmlnode, ids ) {
	var idElemA = xmlnode.getAttribute( 'side_A' );
	var idElemB = xmlnode.getAttribute( 'side_B' );
	var elemB =ids[ idElemB ];
	var elemA =ids[ idElemA ];

	if(!(elemB instanceof GeneralizationSet))return null;

	elemB.addElement(elemA);
    relation = elemB._relations[elemB._relations.length-1];
    this.setId(xmlnode.getAttribute( 'id' ));

    var i;
    var childs = xmlnode.childNodes;
    var p = 0;
    for( i = 0; i < childs.length; i++ ) {
      if( childs[i].nodeName == 'point' ) {
    	  this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                     parseInt( childs[i].getAttribute( 'y' ) )
                                    );
        p++;
      }
    }
    elemB.delElement(elemA);


    this.setLineStyle(elemB.getLineStyle() );
    this.setLineColor(elemB.getLineColor());
    this.setLineWidth(elemB.getLineWidth());
    this._type = 'SetLine';

    this._elemA=elemA;
    this._elemB=elemB;

    elemB._relations.splice( elemB._relations.length-1, 1, this );
    this._points[2]=elemB._points[elemB._pivotP];
    elemB._pivotP++;
    elemB.notifyChange();

	elemA.addRelation(this);
}



/**
 * Instance instance constructor, creates a instance in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class Instance
 * @extends Rectangular
 *
 */

var Instance = function( params ) {

  params = params || {};
  Instance.baseConstructor.call(this,params);
}
JSFun.extend(Instance,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Instance.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Instance.prototype.setName = function( text ){
	this._components[1].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Instance.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[2].addField( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Instance.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Instance.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

Instance.prototype.getAttributes = function( ){
	return	this._components[2]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Instance.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Instance.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Instance.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * InterfaceExtended class constructor, creates a interface extend element in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class InterfaceExtended
 * @extends Rectangular
 *
 */

var InterfaceExtended = function( params ) {

  params = params || {};
  this._abstract=false;
  InterfaceExtended.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceExtended,Rectangular);



/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/06/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
InterfaceExtended.prototype.getElementXML = function( parent ) {
	  var xmlnode = InterfaceExtended.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
	}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/06/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
InterfaceExtended.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  InterfaceExtended.base.setElementXML.call( this, xmlcomponent );
	}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

InterfaceExtended.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

InterfaceExtended.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

InterfaceExtended.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Adds new item to the operation fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

InterfaceExtended.prototype.addOperation = function(text){
	var text = text || '';
	this._components[4].addField( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

InterfaceExtended.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceExtended.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

InterfaceExtended.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

InterfaceExtended.prototype.getOperations = function( ){
	return	this._components[4]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

InterfaceExtended.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceExtended.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
InterfaceExtended.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
InterfaceExtended.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * NAssociation class constructor, creates a relation of n-ary association in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/09/2012
 *
 * @class NAssociation
 * @extends Relation
 *
 */

var NAssociation = function( params ) {
  params=params || {};

  NAssociation.baseConstructor.call(this,params);
}
JSFun.extend(NAssociation,Rhombus);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NAssociation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
NAssociation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method setRole
 * @param {Element} element  Element witch role is gone be set.
 * @param {String} text New value of element's role.
 *
 */

NAssociation.prototype.setRole = function(element,text){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentRoleA(text);
	}
}


/**
 * Set the multiplicity of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method Multiplicity
 * @param {Element} element  Element witch multiplicity is gone be set.
 * @param {String} multi New value of element's multiplicity.
 *
 */

NAssociation.prototype.setMultiplicity = function(element,multipicity){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentMultiplicityA(multipicity);
	}
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NAssociation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NAssociation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getRole
 * @param {Element} element  Element witch role is gone be get.
 * @return {String} Text of the associated element  role component
 *
 */

NAssociation.prototype.getRole = function(element ){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._roleA)
			return this._relations[i]._roleA.getValue();
	}
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getMultiplicity
  * @param {Element} element  Element witch multiplicity is gone be get.
 * @return {String} Text of the associated  element multiplicity component.
 *
 */

NAssociation.prototype.getMultiplicity = function(element){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._multiA)
			return this._relations[i]._multiA.getValue();
	}
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NAssociation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
NAssociation.prototype.getRelations=function() {
	return this._relations;
}



/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
NAssociation.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(elem instanceof Node &&elem2 instanceof Node)
		{
			relation=new AssociationN({a:elem,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	relation=new AssociationN({a:elem2,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	this.notifyChange();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem[0]&&elem[1])
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.notifyChange();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method getElement
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
NAssociation.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA==elem)return this._relations[i];
	 }
}




/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
NAssociation.prototype.addElement = function( elem) {
	  if(!(elem instanceof Node) )return false;

  for(i in this._relations ) if(this._relations[i]._elemA==elem )return false;

 	relation=new AssociationN({a:elem,b:this});
    relation._calculateLineEnds();
    relation.updateParent();
    this.notifyChange();
    return true;
}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
NAssociation.prototype.delElement = function( elem) {
  if(!(elem instanceof Node) )return false;


  for(i in this._relations ){
	  if(this._relations[i]._elemA==elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }
  return false;
}



/**
 * Constructor de la clase AssociationN
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/10/2012
 *
 * @class AssociationN
 * @extends Relation
 */
var AssociationN = function( params ) {
	var params = params || {};
  var f = new Relation( params );

  f.setType( 'AssociationN' );

  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentMultiplicityA();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);

  f.setLine( new SolidLine() );

  return f;
}




/**
 * Package class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @class Package
 * @extends Rectangular
 *
 */

var Package = function( params ) {

  params = params || {};
  Package.baseConstructor.call(this,params);
}
JSFun.extend(Package,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Package.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Package.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Package.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Package.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Package.prototype.getStereotype = function(){
	return this._components[1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Package.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * PackageContainer class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class PackageContainer
 * @extends Rectangular
 *
 */

var PackageContainer = function( params ) {

  params = params || {};
  PackageContainer.baseConstructor.call(this,params);
}
JSFun.extend(PackageContainer,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

PackageContainer.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

PackageContainer.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

PackageContainer.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
PackageContainer.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

PackageContainer.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
PackageContainer.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Realization class constructor, creates a realization's relation in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Realization
 * @extends Relation
 *
 */

var Realization = function( params ) {

  params = params || {};
  Realization.baseConstructor.call(this,params);
}
JSFun.extend(Realization,Relation);

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Realization.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Realization.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Realization.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */

Realization.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Realization.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Dependency class constructor, creates a relation of dependency in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Dependency
 * @extends Relation
 *
 */

var Dependency = function( params ) {

  params = params || {};
  Dependency.baseConstructor.call(this,params);
}
JSFun.extend(Dependency,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Dependency.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Dependency.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Dependency.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Dependency.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Dependency.prototype.getNameAsComponent = function( ){
	return this._components[1];
}


/**
 * Constructor de la clase UMLClassDiagram
 * Representa un diagrama de clases de UML 2
 *
 * @author Martín Vega-leal Ordóñez	/ Rafael Molina Linares	/Alejandro Arrabal Hidalgo
 * @update 2/12/2010								/ 5/12/2011		/28/08/2012
 * @class UMLClassDiagram
 * @extends Diagram
 */
var UMLClassDiagram = function( params ) {

  var f = new ClassDiagram( params );

  f.setType( 'UMLClassDiagram' );
  f.setName( 'Class diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine','UMLClass','UMLDataType', 'UMLComponent',
                        'UMLInstance', 'UMLInterfaceExtended', 'UMLPackage',
                        'UMLPackageContainer', 'UMLAggregation', 'UMLAssociation', 'UMLComposition',
                        'UMLDependency', 'UMLGeneralization', 'UMLRealization',
                        'UMLUsage', 'UMLPackageMerge', 'UMLPackagePublicImport',
                        'UMLPackagePrivateImport', 'UMLGeneralizationSet','SetLine','UMLNAssociation', 'AssociationN'] );

  return f;
}






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

	this._stereotypes = params.stereotypes || [];

	this._parent = params.parent || null;

	this._shownStereotype;

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

	var _umlDrawableStereotypes = [  'UMLActor', 'UMLUseCase', 'UMLUseCaseExtended', 'UMLSystem', 'UMLSubSystem',
																	 'UMLClass', 'UMLComponent', 'UMLInterfaceExtended','UMLPackage', 'UMLPackageContainer',
																	 'UMLComComponent','UMLInterface', 'UMLOption', 'UMLAlternative',
																	 'UMLLoop', 'UMLBreak','UMLAcceptEventAction','UMLTimeEvent', 'UMLSendSignalAction',
																	 'UMLAction','UMLObject', 'UMLActivity',  'UMLDataStore', 'UMLConnectorActivity' ,
																	 'UMLHorizontalHierarchicalSwimlane','UMLVerticalHierarchicalSwimlane',
																	 'UMLSimpleState', 'UMLCompositeState', 'UMLVerticalRegion', 'UMLPin', 'UMLParameterNode',
																	 'UMLExpansionNode', 'UMLHorizontalRegion', 'UMLPort', 'UMLTerminate', 'UMLEntryPoint',
																	 'UMLExitPoint', 'UMLJunction', 'UMLFlowFinal', 'UMLDataType'  ];

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

	if(!(stereotype instanceof Stereotype))
		return false;

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

		this._appliedStereotypes.push(stereotype);

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

	if(!(stereotype instanceof Stereotype))
		return false;


	var elem = this._parent;
	var found = false;
	if(!elem)
		return false;

	for(var i=0;i<this._appliedStereotypes.length;i++){
		if(this._appliedStereotypes[i] == stereotype){
			found = true;
			break;
		}
	}

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

	if(found){

		this.removeTagValues( stereotype );

		this.removeFigure( stereotype );

		this.deleteStereotypeTag( stereotype );

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

	if(!(stereotype instanceof Stereotype))
		return false;


	var tagValues = this._parent._tagValues;
	var childs = stereotype._components[3]._childs;
	var i,j;
	var found = false;

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

			this._parent._figures[i].delAssociatedStereotype(stereotype);
			this.drawStereotype(null);

			if(!this._parent._figures[i]._associatedStereotypes.length)
				this._parent.delFigure(this._parent._figures[i]);

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

	if(!(stereotype instanceof Stereotype))
		return false;

	var childs = this._parent.getStereotype()._childs;
	var i;

	for(i in childs){
	  if( childs[i]._text == '\xAB' + stereotype.getName() + '\xBB' ) {
	    childs.splice( i, 1 );
			break;
	  }
	}
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

	if(found){

		var	childs = this._parent.getStereotype()._childs;
		for(i in childs){
		  if( childs[i]._text == '\xAB' + stereotype.getName() + '\xBB' ) {
		    childs[i].setText(newName, true);
				break;
		  }
		}
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

	for(var i=0;i<this._appliedStereotypes.length;i++){
		found = false;

		if(this._appliedStereotypes[i]._validMetaclass(this._parent.getType())){

			for(var j=0;j<stereotypeTags.length && !found;j++){

				if( '\xAB' + this._appliedStereotypes[i].getName() + '\xBB' == stereotypeTags[j]._text ){

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

	var that = this._parent;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];
  var i;

  for( i = 0; i < that._tagValues.length; i++ ){
    fields.push( document.createElement("input") );
  }

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  for( i = 0; i < that._tagValues.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', that._tagValues[i][1] || '' );
  }


  var changeText = function ( event ) {
    var i;
		for( i = 0; i < that._tagValues.length; i++ ) {
			that._tagValues[i][1] = fields[i].value;
		}
    document.body.removeChild( div );
  }


  var closeDialog = function ( event ) {
      document.body.removeChild( div );
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", changeText, false);


  var label;
  var divaux;

	var labels = [];

	for(i=0;i<fields.length;i++){
		labels.push(that._tagValues[i][0]);
	}

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }

  form.appendChild( ok );

  div.appendChild( form );

  document.body.appendChild( div );


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

  var that = this._parent;

	var stereotypes = this._stereotypes;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];
	var i,j,k;
	var metaclass = [];

	var childs = [];
	var nodeChild;

	for(i=0;i<that._components.length;i++){

		if(that._components[i] instanceof StereotypeFields){

			childs = that._components[i]._childs;
			for(j=0;j<childs.length;j++){

				if(!fields[childs[j].getValue()]){
					fields[childs[j].getValue()] = that;
				}
			}
		}
	}

	if(that instanceof SuperNode){

		for(i=0;i<that._nodeChilds.length;i++){

			for(j=0;j<that._nodeChilds[i]._components.length;j++){

				if(that._nodeChilds[i]._components[j] instanceof StereotypeFields){

					childs = that._nodeChilds[i]._components[j]._childs;

					for(k=0;k<childs.length;k++){

						if(!fields[childs[k].getValue()])
							fields[childs[k].getValue()] = that._nodeChilds[i];
					}
				}
			}
		}
	}


	for(i=0;i<stereotypes.length;i++){

		metaclass = stereotypes[i]._metaclass;

		for(j=0;j<metaclass.length;j++){

			if(metaclass[j].getName() == that.getType()){

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

			nodeChild = that._nodeChilds[k];

			if(nodeChild._stereotypeProperties){
				for(i=0;i<nodeChild._stereotypeProperties._stereotypes.length;i++){

					metaclass = nodeChild._stereotypeProperties._stereotypes[i]._metaclass;

					for(j=0;j<metaclass.length;j++){

						if(metaclass[j].getName() == nodeChild.getType()){

							if(!fields['\xAB' + that._stereotypeProperties._stereotypes[i].getName() + '\xBB'])
								fields['\xAB' + that._stereotypeProperties._stereotypes[i].getName() + '\xBB'] = that._nodeChilds[k];
						}
					}
				}
			}
		}
	}

	var	found = false;
	for(i in fields)
		found = true;
	if(!found)
		return;


  var sel;
  textField = document.createElement('select');

  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('default') );
  textField.appendChild( sel );

	for(i in fields){

			sel = document.createElement('option');
			sel.setAttribute( 'value', i);
			sel.appendChild( document.createTextNode(i) );
			textField.appendChild( sel );
	}


  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  var changeText = function ( event ) {

      var values = [];
			var found = false;
			var element;

      var i,j;

			for(i in fields){

					if(textField.value == i){
						element = fields[i];
						break;
					}
			}

			for( i = 0; i < stereotypes.length && !found; i++ ) {

				if('\xAB' + stereotypes[i].getName() + '\xBB' == textField.value){

					if(element._stereotypeProperties)
						element._stereotypeProperties.applyStereotype(stereotypes[i]);

					found = true
				}
			}
      document.body.removeChild( div );
  }



  var closeDialog = function ( event ) {
      document.body.removeChild( div );
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", changeText, false);

  form.appendChild( textField );

  form.appendChild( ok );

  div.appendChild( form );

  document.body.appendChild( div );

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

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];
	var i,j,k;
	var metaclass = [];

	var childs = [];
	var nodeChild;


	for(i=0;i<stereotypes.length;i++){

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

			nodeChild = that._nodeChilds[k];

			if(nodeChild._stereotypeProperties){
				for(i=0;i<stereotypes.length;i++){

					if(!fields['\xAB' + stereotypes[i].getName() + '\xBB'])
						fields['\xAB' + stereotypes[i].getName() + '\xBB'] = that._nodeChilds[k];
				}
			}
		}
	}

	var	found = false;
	for(i in fields)
		found = true;
	if(!found)
		return;


  var sel;
  textField = document.createElement('select');

  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('default') );
  textField.appendChild( sel );

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

			textField.appendChild( sel );
	}


  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  var changeText = function ( event ) {

      var values = [];
			var found = false;
			var element;

      var i,j;

			for(i in fields){
					if(textField.value == i){
						element = fields[i];
						break;
					}
			}

			for( i = 0; i < stereotypes.length && !found; i++ ) {

				if('\xAB' + stereotypes[i].getName() + '\xBB' == textField.value){

					element._stereotypeProperties.showStereotype(stereotypes[i]);

					that._stereotypeProperties._shownStereotype = textField.value;
					found = true
				}
			}

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



  form.appendChild( textField );

  form.appendChild( ok );

  div.appendChild( form );

  document.body.appendChild( div );

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





/**
 * StereotypeTag class constructor, creates a tag of stereotype in a element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @StereotypeTag StereotypeTag
 * @extends StereotypeItem
 *
 */

var StereotypeTag = function( params ) {

  params = params || {};
  StereotypeTag.baseConstructor.call(this,params);
}
JSFun.extend(StereotypeTag,StereotypeItem);




/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setText
 * @param {String} newText New text that will contains the object
 * @param {Boolean} updateObjectStereotype If the new text is established because
 *																				 of the change of name of a stereotype object
 */
StereotypeTag.prototype.setText = function( newText, updateObjectStereotype ) {

	var updateObjectStereotype = updateObjectStereotype || false;

	var i;
	var stereotypeProperties;


  if( JSFun.isString( newText ) ) {

		/*
			If the text has changed, it is called to the removeStereotype method
			and if this stereotype tag has been added to the node by existence of
			a stereotype object, the tag values and image associated
			to this stereotype tag are remove. If the change of the component's text
			is changed like consecuence of a change in the name of the stereotype's
			object, this tag stereotype  mustn't be removed
		*/
		if(this._text != newText && !updateObjectStereotype){
			if(this._parent && this._parent instanceof SuperComponent && this._parent._parent._stereotypeProperties){

				stereotypeProperties = this._parent._parent._stereotypeProperties;

				/*
					Is searched if the tag value has been added to the node by existence
					of a stereotype object. If is found some match, the tag stereotype,
					the figure and the tag values related with this stereotype
					are removed of the node
				*/
				for(i=0;i<stereotypeProperties._appliedStereotypes.length;i++){
					if('\xAB' + stereotypeProperties._appliedStereotypes[i].getName() + '\xBB' == this._text ){
						this._parent._parent._stereotypeProperties.removeStereotype(stereotypeProperties._appliedStereotypes[i]);
						break;
					}
				}

			}	else if(this._parent && this._parent._stereotypeProperties){
				stereotypeProperties = this._parent._stereotypeProperties;

				/*
					Is searched if the tag value has been added to the node by existence
					of a stereotype object. If is found some match, the tag stereotype,
					the figure and the tag values related with this stereotype
					are removed of the node
				*/
				for(i=0;i<stereotypeProperties._appliedStereotypes.length;i++){
					if('\xAB' + stereotypeProperties._appliedStereotypes[i].getName() + '\xBB' == this._text ){
						stereotypeProperties.removeStereotype(stereotypeProperties._appliedStereotypes[i]);
						break;
					}
				}
			}
		}

		StereotypeTag.base.setText.call(this, newText);
  }
}

/**
 * Modify the value of the object
 *
 * @author Rafael Molina Linares
 * @update 4/12/2011
 *
 * @method setValue
 * @param {String} value Text that will be assign to the object
 */

StereotypeTag.prototype.setValue = function( value ) {

  this.setText( value );
}



/**
 * Gets a XML node with the information of the component
 *
 * @author Rafael Molina Linares
 * @update 5/12/2011
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
StereotypeTag.prototype.getComponentXML = function( parent ) {

  var xmlcomp = parent.createElement( 'item' );

  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }

  xmlcomp.setAttribute( 'value', this.getValue() );

	var stereotypeProperties = this._parent._parent._stereotypeProperties;
	var stereotypes = stereotypeProperties._stereotypes;
	var i;

	for(i=0;i<stereotypes.length;i++)
		if('\xAB' + stereotypes[i].getName() + '\xBB' == this.getValue()){
			xmlcomp.setAttribute( 'stereotypeObject', true );
			break;
		}


  return xmlcomp;
}



/**
 * StereotypeTagList class constructor, define a composite component consists of stereotype tags
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @StereotypeTagList StereotypeTagList
 * @extends StereotypeFields
 *
 */

var StereotypeTagList = function( params ) {

  params = params || {};
  StereotypeTagList.baseConstructor.call(this,params);
}
JSFun.extend(StereotypeTagList,StereotypeFields);



/**
 * Receives the delete's notification of a child component and it is removed
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be remove
 */


StereotypeTagList.prototype.notifyDelete = function( dcomp ) {

/*
	if(this._parent._stereotypeProperties)
		this._parent._stereotypeProperties.removeStereotype(dcomp);
*/
	var i;
	var stereotypeProperties = this._parent._stereotypeProperties;

	if(stereotypeProperties){

		/*
			Is searched if the tag value has been added to the node by existence
			of a stereotype object. If is found some match, the tag stereotype,
			the figure and the tag values related with this stereotype
			are removed of the node
		*/
		for(i=0;i<stereotypeProperties._appliedStereotypes.length;i++){
			if('\xAB' + stereotypeProperties._appliedStereotypes[i].getName() + '\xBB' == dcomp._text ){
				stereotypeProperties.removeStereotype(stereotypeProperties._appliedStereotypes[i]);
				break;
			}
		}
	}

  this.delSubComponent( dcomp );

  this.updateComponents();
}




/**
 * Delete a child of super-componet, if exists
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delSubComponent
 * @param {Component} dcom Component that will be remove
 */
StereotypeTagList.prototype.delSubComponent = function( dcom ) {
  var i;

  for( i in this._childs ) {
    if( this._childs[i] == dcom ) {
      this._childs.splice( i, 1 );
      break;
    }
  }
}




/**
 * Defines the element's type that will contain in the super-component.
 * In this case, will be a object of StereotypeTag type.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method newItem
 * @return {StereotypeTag} New object of component
 */
StereotypeTagList.prototype.newItem = function() {
  return new StereotypeTag({ text: '\xABstereotype\xBB', orientation : this._orientation || 0 });
}



/**
 * Receives a xml node with the information of
 * the super-component and get it back
 *
 * @author Rafael Molina Linares
 * @update 5/12/2011
 *
 * @method setComponentXML
 * @param {DOMNode} xmlnode Xml node with the super-component's information
 */

StereotypeTagList.prototype.setComponentXML = function( xmlnode ) {

  var i;
  var childs = xmlnode.childNodes;

  if( xmlnode.getAttribute( 'visibleSubComponents' ) == 'true' ) {
    this._visibleSubComponents = true;
  } else {
    this._visibleSubComponents = false;
  }

	var value;
	var i;

  for( i = 0; i < childs.length; i++ ) {
		if(childs[i].getAttribute( 'stereotypeObject' ) == 'true'){

			value = childs[i].getAttribute( 'value' );
			this.applyStereotype(value);
		} else {
	    this.addField( childs[i].getAttribute( 'value' ) );
		}
  }
}



/**
 * Apply a stereotype object to the object that contains the component StereotypetagList
 * and add a stereotype tag that contains the name of the stereotype object
 *
 * @author Rafael Molina Linares
 * @update 5/12/2011
 *
 * @method applyStereotype
 * @param {DOMNode} value Name of the stereotype object that wanna be applied
 */

StereotypeTagList.prototype.applyStereotype = function( value ) {

	var stereotypes = this._parent._stereotypeProperties._stereotypes;
	var metaclass;
	var value;
	var j,k;

	for(k=0;k<stereotypes.length;k++){

		metaclass = stereotypes[k]._metaclass;

		for(j=0;j<metaclass.length;j++){

			if(metaclass[j].getName() == this._parent.getType()){

				if('\xAB' + stereotypes[k].getName() + '\xBB' == value)
						this._parent._stereotypeProperties.applyStereotype( stereotypes[k] );
			}
		}
	}
}






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

	var params = params || {};

  var f = new Package( params );
  f.setType( 'UMLPackage' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );

  f.addFigure( new PackageFigure({ color: '#c0e1c2' }) );

  f.addComponent( new Space({ height: 16 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Package name', centered: true, margin: 3 }) );

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

	var params = params || {};

  var f = new PackageContainer( params );
  f.setType( 'UMLPackageContainer' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );

  f.setMoveable();
  f.setContainer();

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name', margin: 5, text: 'Package name' }) );

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

	var params = params || {};

  var f = new Class( params );
  f.setType( 'UMLClass' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'ClassName', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'operations' , margin: 3}) );


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

	var params = params || {};

  var f = new ComponentElement( params );
  f.setType( 'UMLComponent' );

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

	var params = params || {};

  var f = new InterfaceExtended( params );
  f.setType( 'UMLInterfaceExtended' );


	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setWidth( 150 );

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new CircleSymbol({ position: Component.TopRight, margin: 3 }) );

  f.addComponent( new TextArea({ id: 'name', text: 'Interface Name', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'methods' , visibleSubComponents: false, margin: 3}) );

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

	var params = params || {};

  var f = new Instance( params );
  f.setType( 'UMLInstance' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new InstanceItem({ id: 'name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );

  f.addFigure( new RectangleFigure({ color: '#ffffbb'}));
  f.getComponents()[0].setUnderlineText(true);

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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);

  f.setLine( new SolidLine() );
  return f;
}



/**
 * Artifact constructor, creates a Artifact of the uml2 deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/3/2013
 *
 * @class Artifact
 * @extends Rectangular
 *
 */

var Artifact = function( params ) {

  params = params || {};
  Artifact.baseConstructor.call(this,params);
}
JSFun.extend(Artifact,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Artifact.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Artifact.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Adds new item to the property fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Artifact.prototype.addProperty = function(text){
	var text = text || '';
	this._components[3].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Artifact.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Artifact.prototype.getName = function( ){
	return this._components[2].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Artifact.prototype.getStereotype = function(){
	return this._components[1];
}


/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Artifact.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * Return the component that contains the properties of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getProperties
 * @return {Array} Array with the attribute components of the element
 *
 */
Artifact.prototype.getProperties = function( ){
	return	this._components[3]._childs;
}



/**
 * Association class constructor, creates a relation of association in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Association
 * @extends Relation
 *
 */

var Association = function( params ) {

  params = params || {};
  Association.baseConstructor.call(this,params);
}
JSFun.extend(Association,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Association.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Association.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A
 *
 */

Association.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role B
 *
 */

Association.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Association.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Association.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Association.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Association.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Association.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Association.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Association.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Association.prototype.getMultiplicityB = function( ){
	return this._components[5].getValue( );
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Association.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Class class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class Class
 * @extends Rectangular
 *
 */

var Class = function( params ) {

  params = params || {};
  this._abstract=false;
  Class.baseConstructor.call(this,params);
}
JSFun.extend(Class,Rectangular);




/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
Class.prototype.getElementXML = function( parent ) {
	  var xmlnode = Class.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
	}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
Class.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  Class.base.setElementXML.call( this, xmlcomponent );
	}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Class.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Class.prototype.setName = function( text ){
	this._components[1].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Class.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[2].addField( text );
}




/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

Class.prototype.addOperation = function(text){
	var text = text || '';
	this._components[3].addField( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Class.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Class.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

Class.prototype.getAttributes = function( ){
	return	this._components[2]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

Class.prototype.getOperations = function( ){
	return	this._components[3]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Class.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Class.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
Class.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
Class.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * ComponentDiagram class constructor, creates a diagram of state machine
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class ComponentDiagram
 * @extends Diagram
 *
 */
var ComponentDiagram = function( params ){
	ComponentDiagram.baseConstructor.call(this,params);
}
JSFun.extend(ComponentDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

ComponentDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

  var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

ComponentDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

		obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}



/**
 * Package class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class ConnectorRelation
 * @extends Relation
 *
 */

var ConnectorRelation = function( params ) {

  params = params || {};
  ConnectorRelation.baseConstructor.call(this,params);
}
JSFun.extend(ConnectorRelation,Relation);

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

ConnectorRelation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
ConnectorRelation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}

/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return Array with the stereotypes components of the element
 *
 */

ConnectorRelation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
ConnectorRelation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
ConnectorRelation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Dependency class constructor, creates a relation of dependency in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Dependency
 * @extends Relation
 *
 */

var Dependency = function( params ) {

  params = params || {};
  Dependency.baseConstructor.call(this,params);
}
JSFun.extend(Dependency,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Dependency.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Dependency.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Dependency.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Dependency.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Dependency.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Generalization class constructor, creates a generalization in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Generalization
 * @extends Relation
 *
 */

var Generalization = function( params ) {

  params = params || {};
  Generalization.baseConstructor.call(this,params);
}
JSFun.extend(Generalization,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Generalization.prototype.addStereotype = function( text ){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Generalization.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Generalization.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Generalization.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Generalization.prototype.getNameAsComponent = function( ){
	return this._components[1];
}





/**
 * GeneralizationSet class constructor, creates a relation of GeneralizationSet in the component diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @class GeneralizationSet
 * @extends Relation
 *
 */

var GeneralizationSet = function( params ) {
  params=params || {};
  this._pivotP=2;
  GeneralizationSet.baseConstructor.call(this);
}
JSFun.extend(GeneralizationSet,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

GeneralizationSet.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
GeneralizationSet.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

GeneralizationSet.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
GeneralizationSet.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
GeneralizationSet.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
GeneralizationSet.prototype.getRelations=function() {
	return this._relations;
}




/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
GeneralizationSet.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(GeneralizationSet.base.setElements.call(this,elem,elem2))
		{
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem.length>1)
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			this._calculateLineEnds();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 04/09/2012
 *
 * @method getRelation
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
GeneralizationSet.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA===elem || this._relations[i]._elemB===elem)return this._relations[i];
	 }
}



/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
GeneralizationSet.prototype.addElement = function( elem) {
	if(!(elem instanceof Node) )return false;

	for(i in this._relations ) if(this._relations[i]._elemA==elem || this._relations[i]._elemB==elem )return false;

   relation=new SetLine({a:elem,b:this});
   relation._calculateLineEnds();

   var newP=new Point(relation.getCentralPoint());
   this._points.splice(this._pivotP,0,newP);

   relation._calculateLineEnds();

   relation._points[2]=this._points[this._pivotP];
   this._pivotP++;

   this.notifyChange();
   return true;

}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/03/2013
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
GeneralizationSet.prototype.delElement = function( elem) {
	if(!(elem instanceof Node) )return false;

  for(i in this._relations ){
	  if(this._relations[i]._elemA===elem  || this._relations[i]._elemB===elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }

  return false;
}




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
GeneralizationSet.prototype.notifyDeleted = function( elem ) {
	  for(i=0;i<this._relations.length;i++ ){
		  if(this._relations[i]===elem && this._relations[i].getType()=="SetLine"){
			  this._relations.splice( i, 1 );
			  this._pivotP--;
			  this._points.splice( 2+i, 1 );
		  }
	  }
}


/**
 * Calculates the final points of the relation
 * that are in contact with the nodes
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _calculateLineEnds
 * @private
 */

GeneralizationSet.prototype._calculateLineEnds = function( ) {
	  var pointA, pointB;
	  var npoints = this._points.length;

	   if(!this._points[3]){
		      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
		      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

		      this._points[0] = pointA;
		      this._points[1] = pointB;
		      this._points[1] = new Point(this.getCentralPoint());
		      this._points[2]= new Point(this.getCentralPoint());
		      this._points[3]=this._points[1];
		      this._points[1]=this._points[2];
		      this._points[2]=this._points[3];
		      this._pivotP=2;
              this._points[3]= pointB;

		 }

	  if( this._elemA == this._elemB ) {
		var center = this._elemA.getCentralPoint();
	    var cx = center.getX();
	    var cy = center.getY();

			var x = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
			var y = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
			var heightPoints;
			var widthPoints;

			if(this._selected == 2 || this._selected == 0 || this._selected == npoints-1 ||
			   (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing){

				if((x - cx) > 0){
					if((y-cy) > 0){	//Fourthy quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					} else {	//First quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					}
				} else {

					if((y-cy) > 0){	//Third quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					} else {	//Second quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					}
				}
			} else if(this._selected == 3){

				x = this._points[3]._x;
				y = this._points[3]._y;

				pointA = this._elemA.getLinkCentered( cx, this._points[0]._y  );

				if((x - cx) > 0){

					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() + widthPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				} else {

					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() - widthPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				}
			} else if(this._selected == 1){

				x = this._points[1]._x;
				y = this._points[1]._y;

				pointB = this._elemA.getLinkCentered( this._points[4]._x, cy );

				if((y - cy) > 0){

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					heightPoints  = y - pointA.getY();
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2].setY(pointA.getY() + heightPoints );
				} else {

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					heightPoints  = pointA.getY() - y;
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2].setY(pointA.getY() - heightPoints);
				}
			}
			else if(this._selected == 2){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			   else if(this._selected == -1){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			this._points[0] = pointA;
		  this._points[4] = pointB;

			while(this._points[5])
				this._points.pop();

	  }
	  else {
		  if( npoints == 4 ) {
		      pointA = this._elemA.getLinkCentered( this._points[1] );
		      pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		      this._points[0] = pointA;
              this._points[3]= pointB;
		    }

		    else if(npoints > 4 ){
		        pointA = this._elemA.getLinkCentered( this._points[1] );
		        pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		        this._points[0] = pointA;
		        this._points[this._points.length-1]= pointB;

		        for(i=0;i<this._relations.length;i++)this._relations[i]._calculateLineEnds();
		       	if(this._orientation){
		       		for(i=1;i<this._pivotP;i++)this._points[i].setX(this._points[this._pivotP].getX());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setY(this._points[1].getY()+5);
		       		 }
		       		}
		       	else{
		       		for(i=1;i<this._pivotP;i++)this._points[i].setY(this._points[this._pivotP].getY());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setX(this._points[1].getX()+5);
		       		 }
		       		}
		    }
		    else {

			      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
			      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

			      this._points[0] = pointA;
			      this._points[1] = pointB;
			      this._points[1] = new Point(this.getCentralPoint());
			      this._points[2]= new Point(this.getCentralPoint());
			      this._points[3]=this._points[1];
			      this._points[1]=this._points[2];
			      this._points[2]=this._points[3];
			      this._pivotP=2;
	              this._points[3]= pointB;
		    }
		  }
}

/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points
 * and form a straight line
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
GeneralizationSet.prototype._delUselessPoints = function() {
	  var i;
	  for( i = this._points.length-1; i > this._pivotP; i-- ) {
	    if(this._selectLine( this._points[i+1],
	                          this._points[i-1],
	                          this._points[i].getX(),
	                          this._points[i].getY(), 10 ) )
	    {

	      this._points.splice(i, 1);
	    }
	  }

}

/**
 * The relation and its components are drawn with the defined style
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/ 22/09/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
GeneralizationSet.prototype.draw = function( context ) {
  var npoints = this._points.length;
  var points=[];
  for(i=this._pivotP; i<npoints ;i++){

	  points.push(this._points[i]);
  }
  if( this._line ) {
	  this._line.draw( context, points, this.getLineColor(),this.getLineWidth() );

  }
  if( this._end ){

    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx =this._points[ npoints - 1 ].getX();
    var by =this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    this._end.draw( context, bx, by, angle, this.getLineColor() );

  }

  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {

      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }

  }
	/*Drawing the line for the setlines*/
	  points=[];
	  for(i=1;i<=this._pivotP;i++){

		  points.push(this._points[i]);
	  }
	  if(points.length>1){

		  if(this.getLineStyle()=="solid")var a=new SolidLine();
		  else{var a=new DashedLine();}

	      a.draw(context, points, this.getLineColor(),this.getLineWidth());
	  }

	 /*Drawing the main line*/
	  points=[];
	  points[0]=this._points[0];
	  points[1]=this._points[1];
	  points[2]=this._points[this._pivotP];

	  if(this.getLineStyle()=="solid")var a=new SolidLine();
	  else{var a=new DashedLine();}

	  a.draw(context, points, this.getLineColor(),this.getLineWidth());


  if( this._selected > -1 ) {
    this._drawComponentsShape( context );

  }
  this._drawComponents( context );

}

/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 4/03/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
GeneralizationSet.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}

  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
    if( this._selected > -1 ) {

      if( this._isOverComponent( x, y, radius ) ) {
            this._selectedBefore = true;
            this._component=true;

            return true;
          }

    }

    for( var i = 0; i < this._points.length-1; i++ ) {
      if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

        if( this._selected > -1 )
          this._selectedBefore = true;

        this._selected = i;
        if(i>=this._pivotP){
            this._selectedLine = true;
            this._component=false;
        	this._points.splice( this._selected, 0, new Point(x,y) );
        }
        else if(i>=1){
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = this._pivotP;
        }
        else{
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = 1;

        }
        return true;
      }
    }



  return false;
}




/**
 * Calculates element orientation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method __calculateOrientation
 * @return {Boolean} True if the element was oriented along the x axis, False in other case.
 * @private
 */
GeneralizationSet.prototype._calculateOrientation = function() {
	  var m=(this._elemA.getCentralPoint().getY()-this._elemB.getCentralPoint().getY())
	  /(this._elemA.getCentralPoint().getX()-this._elemB.getCentralPoint().getX());
      return (m<1&&m>-1);
}



/**
 * Check is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isXOriented
 * @return {Boolean} If the element was oriented along the x axis
 */
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation;
}




/**
 * Check is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isYOriented
 * @return {Boolean} If the element was oriented along the y axis
 */
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation;
}




/**
 * Set is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setXOrientation
 */
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation=true;
}




/**
 * Set is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setYOrientation
 */
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation=false;
}




/**
 * return the orientation of the element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method getOrientation
 * @return {String} The axis of the element orientation
 */
GeneralizationSet.prototype.getOrientation = function() {
	if(this._orientation)return "x";
	return "y";
}



/**
 * The grafical style of the GeneralizationSet's lines and SetLines will be defined as style
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set to the relation and all his SetLines
 */
GeneralizationSet.prototype.setLineStyle = function(style){
	if(!(GeneralizationSet.base.setLineStyle.call(this,style)))return false;
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine"){
			if(!(this._relations[i].setLineStyle(style)))return false;
		}
	}
	return true;
}




/**
 * The color of the GeneralizationSet's lines and SetLines will be defined as color
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines and SetLines
 */

GeneralizationSet.prototype.setLineColor = function(color){
	GeneralizationSet.base.setLineColor.call(this,color)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineColor(color);
	}
}




/**
 * The width of the GeneralizationSet's lines and SetLines will be defined as width
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines and SetLines
 */
GeneralizationSet.prototype.setLineWidth = function(width) {
	GeneralizationSet.base.setLineWidth.call(this,width)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineWidth(width);
	}
}




/**
 * Constructor de la clase SetLine
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 07/10/2012
 *
 * @class SetLine
 * @extends Relation
 */
var SetLine = function( params ) {
	  params=params || {};
	  this._last=null;
	  this._id = 0;
	  this._type = 'SetLine';
	  this._line_color= '#000000';
	  this._line_width=1.25;
	  this._points = [ new Point(), new Point() ];

	  this._selected = -1;
	  this._selectedBefore = false;
	  this._moved = false;
	  this._activeComponent = null;


	  this._selectedLine = false;
	  this._selectedPoint = false;

	  this._relations= [];
	  this._components = [];
	  this._diagram = null;

	  this.setElements( params.a, params.b );
	  f=this;
	  if(this._elemB){
		  this.setMenu([[function(){f._elemB.showStyleDialog({that: f._elemB});f._elemB.removeContextualMenu();},'Style']]);
		  this.setLineStyle( this._elemB.getLineStyle() );
		  this.setLineColor(this._elemB.getLineColor());
		  this.setLineWidth(this._elemB.getLineWidth());
		  }
}
JSFun.extend(SetLine,Relation);




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
SetLine.prototype._delUselessPoints = function() {
}




/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 20/01/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 *
 */
SetLine.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */	  this.setType( 'SetLine' );
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}
  for( var i = 0; i > this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedLine = true;
      this._component=false;
      return true;
    }
  }
  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {
      if(i==2)return false;
      if( this._selected > -1 )
        this._selectedBefore = true;
      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
  for( var i = 0; i < this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }

  return false;
}




/**
 * Calculates the final points of the relation
 * that are in contact with the node and relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
*/
SetLine.prototype._calculateLineEnds= function() {
    if(!this._elemB)return false;
    var pointA=this._points[1];

	if(this._elemB._orientation){
	    if(this._points.length<3){
	    	var pointA= new Point(this._elemB._points[1].getX(),this._elemA.getCentralPoint().getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
	    }
	    else{
	    	if(this._elemA.isOver(this._points[2])){
	    		if(this._elemB._points[this._elemB._pivotP].getY()
		   			<this._elemA.getY())
		   		this._points[2].setY(this._elemA.getY()-20);
	    		else{this._points[2].setY(this._elemA.getY()+this._elemA.getHeight()+20);}
	    	}

		    if(this._points[0].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[2].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX()-10);

		    }
		    else if(this._points[2].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[0].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX()+this._elemA.getWidth());
				this._points[1].setX(this._elemA.getX()+this._elemA.getWidth()+10);

		    }

	    }

	}

	else{
		if(this._points.length<3){
			var pointA= new Point(this._elemA.getCentralPoint().getX(),this._elemB._points[1].getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
		}
		else{

			if(this._elemA.isOver(this._points[2])){
		    	if(this._elemB._points[this._elemB._pivotP].getX()
		    			<this._elemA.getX())
		    		this._points[2].setX(this._elemA.getX()-20);
		    	else{this._points[2].setX(this._elemA.getX()+this._elemA.getWidth()+20);}
		    }

		    if(this._points[0].getY()<=this._elemA.getY()
		    		&&this._points[2].getY()>this._elemA.getY()+this._elemA.getHeight())
		    	{
		    		this._points[0].setY(this._elemA.getY()+this._elemA.getHeight());
		    		this._points[1].setY(this._elemA.getY()+this._elemA.getHeight()+10);
		    	}
		    else if(this._points[0].getY()>=this._elemA.getY()+this._elemA.getHeight()
		    		&&this._points[2].getY()<=this._elemA.getY())
		    {
				this._points[0].setY(this._elemA.getY());
				this._points[1].setY(this._elemA.getY()-10);

		    }

		}

	}

	if(this._points.length<3){
		this._points[1]=pointA;
		this._points[1]=new Point(this.getCentralPoint());
		this._points[2]=pointA;
	}



	this._points[0]=this._elemA.getLinkCentered(this._points[1]);
}




/**
 * Receives a xml node with the information this.setElements( ids[ idElemA ], ids[ idElemB ] );of the relation and get it back
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
*/
SetLine.prototype.setElementXML = function( xmlnode, ids ) {
	var idElemA = xmlnode.getAttribute( 'side_A' );
	var idElemB = xmlnode.getAttribute( 'side_B' );
	var elemB =ids[ idElemB ];
	var elemA =ids[ idElemA ];

	if(!(elemB instanceof GeneralizationSet))return null;

	elemB.addElement(elemA);
    relation = elemB._relations[elemB._relations.length-1];
    this.setId(xmlnode.getAttribute( 'id' ));

    var i;
    var childs = xmlnode.childNodes;
    var p = 0;
    for( i = 0; i < childs.length; i++ ) {
      if( childs[i].nodeName == 'point' ) {
    	  this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                     parseInt( childs[i].getAttribute( 'y' ) )
                                    );
        p++;
      }
    }
    elemB.delElement(elemA);


    this.setLineStyle(elemB.getLineStyle() );
    this.setLineColor(elemB.getLineColor());
    this.setLineWidth(elemB.getLineWidth());
    this._type = 'SetLine';

    this._elemA=elemA;
    this._elemB=elemB;

    elemB._relations.splice( elemB._relations.length-1, 1, this );
    this._points[2]=elemB._points[elemB._pivotP];
    elemB._pivotP++;
    elemB.notifyChange();

	elemA.addRelation(this);
}



/**
 * InterfaceExtended class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class InterfaceExtended
 * @extends Rectangular
 *
 */

var InterfaceExtended = function( params ) {

  params = params || {};
  this._abstract=false;
  InterfaceExtended.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceExtended,Rectangular);




/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
InterfaceExtended.prototype.getElementXML = function( parent ) {
	  var xmlnode = InterfaceExtended.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
	}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
InterfaceExtended.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  InterfaceExtended.base.setElementXML.call( this, xmlcomponent );
	}




/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

InterfaceExtended.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

InterfaceExtended.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

InterfaceExtended.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Adds new item to the operation fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addOperation
 * @param {String} text Text that will contain the new field of the component
 *
 */

InterfaceExtended.prototype.addOperation = function(text){
	var text = text || '';
	this._components[4].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

InterfaceExtended.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceExtended.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

InterfaceExtended.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}


/**
 * Return the component that contains the operations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getOperations
 * @return {Array} Array with the operation components of the element
 *
 */

InterfaceExtended.prototype.getOperations = function( ){
	return	this._components[4]._childs;
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

InterfaceExtended.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceExtended.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
InterfaceExtended.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
InterfaceExtended.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}



/**
 * InterfaceRealization class constructor, creates a relation InterfaceRealization in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class InterfaceRealization
 * @extends Relation
 *
 */

var InterfaceRealization = function( params ) {

  params = params || {};
  InterfaceRealization.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceRealization,Relation);



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
InterfaceRealization.prototype.setName = function( text ){
	this._components[0].setValue( text );
}



/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceRealization.prototype.getName = function( ){
	return this._components[0].getValue();
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceRealization.prototype.getNameAsComponent = function( ){
	return this._components[0];
}



/**
 * InterfaceUsage class constructor, creates a relation InterfaceUsage in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class InterfaceUsage
 * @extends Relation
 *
 */

var InterfaceUsage = function( params ) {

  params = params || {};
  InterfaceUsage.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceUsage,Relation);



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
InterfaceUsage.prototype.setName = function( text ){
	this._components[0].setValue( text );
}



/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceUsage.prototype.getName = function( ){
	return this._components[0].getValue();
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceUsage.prototype.getNameAsComponent = function( ){
	return this._components[0];
}





/**
 * The relation and its components are drawn with the defined style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/06/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
InterfaceUsage.prototype.draw = function( context ) {
  var npoints = this._points.length;
  if( this._line ) {
	var ax = this._points[ npoints - 2 ].getX();
	var ay = this._points[ npoints - 2 ].getY();
	var bx = this._points[ npoints - 1 ].getX();
	var by = this._points[ npoints - 1 ].getY();
	var angle = Math.atan2( by - ay , bx - ax );
	this._points[ npoints - 1 ].setX(this._points[ npoints - 1 ].getX()-(4*Math.cos(angle)));
	this._points[ npoints - 1 ].setY(this._points[ npoints - 1 ].getY()-(4*Math.sin(angle)));
	this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );
    this._points[ npoints - 1 ].setX(this._points[ npoints - 1 ].getX()+(4*Math.cos(angle)));
    this._points[ npoints - 1 ].setY(this._points[ npoints - 1 ].getY()+(4*Math.sin(angle)));

  }

  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._end.draw( context, bx, by, angle, this.getLineColor() );
  }

  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._start.draw( context, bx, by, angle, this.getLineColor() );

  }

  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {
      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }
  }

  if( this._selected > -1 ) {
    this._drawComponentsShape( context );
  }
  this._drawComponents( context );

}



/**
 * InterfaceUse class constructor, creates a relation of InterfaceUse in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class InterfaceUse
 * @extends Relation
 *
 */

var InterfaceUse = function( params ) {

  params = params || {};
  InterfaceUse.baseConstructor.call(this,params);
}
JSFun.extend(InterfaceUse,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

InterfaceUse.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
InterfaceUse.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

InterfaceUse.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InterfaceUse.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InterfaceUse.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * NAssociation class constructor, creates a relation of n-ary association in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/09/2012
 *
 * @class NAssociation
 * @extends Relation
 *
 */

var NAssociation = function( params ) {
  params=params || {};

  NAssociation.baseConstructor.call(this,params);
}
JSFun.extend(NAssociation,Rhombus);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NAssociation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
NAssociation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method setRole
 * @param {Element} element  Element witch role is gone be set.
 * @param {String} text New value of element's role.
 *
 */

NAssociation.prototype.setRole = function(element,text){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentRoleA(text);
	}
}


/**
 * Set the multiplicity of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method Multiplicity
 * @param {Element} element  Element witch multiplicity is gone be set.
 * @param {String} multi New value of element's multiplicity.
 *
 */

NAssociation.prototype.setMultiplicity = function(element,multipicity){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentMultiplicityA(multipicity);
	}
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NAssociation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NAssociation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getRole
 * @param {Element} element  Element witch role is gone be get.
 * @return {String} Text of the associated element  role component
 *
 */

NAssociation.prototype.getRole = function(element ){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._roleA)
			return this._relations[i]._roleA.getValue();
	}
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getMultiplicity
  * @param {Element} element  Element witch multiplicity is gone be get.
 * @return {String} Text of the associated  element multiplicity component.
 *
 */

NAssociation.prototype.getMultiplicity = function(element){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._multiA)
			return this._relations[i]._multiA.getValue();
	}
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NAssociation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
NAssociation.prototype.getRelations=function() {
	return this._relations;
}



/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
NAssociation.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(elem instanceof Node &&elem2 instanceof Node)
		{
			relation=new AssociationN({a:elem,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	relation=new AssociationN({a:elem2,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	this.notifyChange();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem[0]&&elem[1])
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.notifyChange();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method getElement
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
NAssociation.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA==elem)return this._relations[i];
	 }
}




/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
NAssociation.prototype.addElement = function( elem) {
	  if(!(elem instanceof Node) )return false;

  for(i in this._relations ) if(this._relations[i]._elemA==elem )return false;

 	relation=new AssociationN({a:elem,b:this});
    relation._calculateLineEnds();
    relation.updateParent();
    this.notifyChange();
    return true;
}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
NAssociation.prototype.delElement = function( elem) {
  if(!(elem instanceof Node) )return false;


  for(i in this._relations ){
	  if(this._relations[i]._elemA==elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }
  return false;
}



/**
 * Constructor de la clase AssociationN
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/10/2012
 *
 * @class AssociationN
 * @extends Relation
 */
var AssociationN = function( params ) {
	var params = params || {};
  var f = new Relation( params );

  f.setType( 'AssociationN' );

  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentMultiplicityA();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);

  f.setLine( new SolidLine() );

  return f;
}




/**
 * NodeInterface class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @class NodeInterface
 * @extends Elliptical
 *
 */
var NodeInterface = function( params ) {
  params = params || {};
  this._abstract=false;
  NodeInterface.baseConstructor.call( this, params );

}
JSFun.extend( NodeInterface, Elliptical );



/**
 * Draws the node on the canvas element
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element
 *
 */
NodeInterface.prototype.draw = function( context ) {
  var no = false;
  var realization = false;

  if( this._relations.length <= 0 ) {
    no = true;
  }

  var i;
  for( i in this._relations ) {
    if( this._relations[i].getType() == 'UMLInterfaceRealization' || this._relations[i].getType() == 'UMLInterfaceUsage' ) {
      realization = true;
      break;
    }
  }

    NodeInterface.base.draw.call( this, context );

    if( this._selected ) {
      this.drawComponentsShape( context );
    }

}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodeInterface.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodeInterface.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NodeInterface.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NodeInterface.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodeInterface.prototype.getStereotype = function(){
	return this._components[0];
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NodeInterface.prototype.getNameAsComponent = function( ){
	return this._components[1];
}

/**
 * Generates a XML node with the information of the node
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
NodeInterface.prototype.getElementXML = function( parent ) {
	  var xmlnode = NodeInterface.base.getElementXML.call( this, parent );
	  xmlnode.setAttribute( 'abstract', this.isAbstract() );
	  return xmlnode;
	}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
NodeInterface.prototype.setElementXML = function( xmlcomponent ) {
		  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
		  NodeInterface.base.setElementXML.call( this, xmlcomponent );
	}



/**
 * Returns the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the class is abstract
 *
 */
NodeInterface.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the class
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the class
 *
 */
NodeInterface.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}






/**
 * Port class constructor, creates a port in the component diagram
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @class Port
 * @extends Rectangular
 *
 */

var Port = function( params ) {
  params = params || {};
  Port.baseConstructor.call( this, params );


  this.setAlone();

  this.setWidth(14);
  this.setHeight(14);

	setStereotypeProperties(this,params.stereotypes || []);

  this.addFigure( new RectangleFigure({ color: '#eeeeee' }) );
  this.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  this.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );


}
JSFun.extend( Port, Rectangular );



/**
 * Performs the necessary actions when the user
 * releases the mouse's button that had pressed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Port.prototype.drop = function( x, y ) {

  this.correctPosition();
  Port.base.drop.call( this, x, y );
}


/**
 * Colocates the node in the position correct on the parent node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Port.prototype.correctPosition = function() {

	if(!this._parent)
		return;

  var x = this._parent.getX();
  var y = this._parent.getY();
  var w = this._parent.getWidth();
  var h = this._parent.getHeight();

  var np = this._parent.getLinkCentered( this.getX() + 7, this.getY() + 7);
  var nx = np.getX();
  var ny = np.getY();

  this.setPosition( nx - 7, ny - 7 );
 	this.updatePositionComponents(nx,ny);
}



/**
 * Updates the components's position regarding
 * the point indicated by the parameters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method updatePositionComponents
 */

Port.prototype.updatePositionComponents = function(nx,ny){
	var position = -1;
	if(nx == this._parent.getX())
		position = Component.Left;
	else if(nx == this._parent.getX() + this._parent.getWidth())
		position = Component.Right;
	else if(ny == this._parent.getY())
		position = Component.Top;
	else if(ny == this._parent.getY() + this._parent.getHeight())
		position = Component.Bottom;

	for(var i=0;i<this._components.length;i++)
		this._components[i]._setPosition(position);

	this.updateComponents();
}



/**
 * Notify to the node that a change has been produced,
 * some relationed element has changed and can affect it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method notifyChange
 */

Port.prototype.notifyChange = function() {
  var i;

  for( i in this._relations ) {
    this._relations[i].notifyChange();
  }

	this.correctPosition();
}



/**
 * Deletes the element and all elements that have relation with him, and
 * meaningless without the existence, as child nodes or relations
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @method remove
 */

Port.prototype.remove = function() {
  Port.base.remove.call( this );

  this._parent.notifyDeleted( this );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Port.prototype.setName = function( text ){
	this._components[1].setValue( text );
}

/**
 * Get the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getName
 * @return {String} The element name
 *
 */

Port.prototype.getName = function(){
	return this._components[1].getValue();
}

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Port.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Port.prototype.getStereotype = function(){
	return this._components[0];
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Port.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * NodePort class constructor, creates a node that can container port
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @class Port
 * @extends Rectangular
 *
 */

var NodePorts = function( params ) {
  params = params || {};
  this._abstract=false;
  NodePorts.baseConstructor.call( this, params );

  this._ports = [];
}
JSFun.extend( NodePorts, Node );


/**
 * Adds a port to the node
 *
 * @author Rafael Molina Linares
 * @update 2/12/2010
 *
 * @method addPort
 * @param {Node} port Port that will be added to the nodePort
 */

NodePorts.prototype.addPort = function( port ) {

  if( port instanceof Node && port.getType() == 'UMLPort' ) {
    this._ports.push( port );
    this._diagram._addNode( port );
    port.setParent( this );
    port.correctPosition();
  }
}



/**
 * Set the figure that will be drawn and if the figure
 * to draw is a image, the components of the node are hidden
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setSelectedFigure
 * @param {Number} numFig Position of the figure's array that will be drawn
 *
 */

NodePorts.prototype.setSelectedFigure = function( numFig ){

	var selectedFigure = NodePorts.base.setSelectedFigure.call(this,numFig);

	/*
		If the call of the 'setSelectedFigure' has selected a new figure, the method returns true.
		If this method receives a number of figure not valid, or already selected, the method
		returns false and the method doesn't change the visibility of the ports
	*/
	if(selectedFigure){

		if(this._figures[numFig] instanceof FromImageFigure){

			for(i in this._ports){
				this._ports[i].setVisibility( false );
			}
		} else {//If the figure selected for drawing isn't a image

			for(i in this._ports){
				this._ports[i].setVisibility( true );
			}
		}
	}

}

/**
 * Set the node's visibility, so such to its components and its child nodes
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @private
 * @param {Boolean} bool Visibility to apply to the node
 */

NodePorts.prototype.setVisibility = function( bool ){

	NodePorts.base.setVisibility.call(this,bool);
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object,
		and the node going to be made visible, should be taken in account that only
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	if(this._container && _setVisibility){
		for(i in this._ports){
			this._ports[i].setVisibility( bool );
		}
	}
}


NodePorts.prototype.updatePosition = function( movx, movy ) {

  if( movx == undefined && movy == undefined ) {
    var mov = this.getMovement();
    var mx = mov.getX();
    var my = mov.getY();
  } else {
    var mx = movx;
    var my = movy;
  }

  var i;
  for( i in this._ports ) {
    this._ports[i].updatePosition( mx, my );
  }

  NodePorts.base.updatePosition.call( this, movx, movy );
}



NodePorts.prototype.notifyChange = function() {
  NodePorts.base.notifyChange.call( this );

  var i;

  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }
}

NodePorts.prototype.updateContainer = function() {
  NodePorts.base.updateContainer.call( this );

  for( i in this._ports ) {
    this._ports[i].correctPosition();
    this._ports[i].notifyChange();
  }

}


NodePorts.prototype.remove = function() {
  NodePorts.base.remove.call( this );

  var i;
  for( i in this._ports ) {
    this._ports[i].remove();
  }
}





/**
 * Generates a XML node with the information of the node
 *
 * @author Rafael Molina Linares	Alejandro Arrabal Hidalgo
 * @update 17/10/2011 	30/05/2013
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
NodePorts.prototype.getElementXML = function( parent ) {
  var xmlnode = NodePorts.base.getElementXML.call( this, parent );
  xmlnode.setAttribute( 'abstract', this.isAbstract() );
  var i;
  for( i in this._ports ) {
    xmlnode.appendChild( this._ports[i].getElementXML( parent ) );
  }

  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Rafael Molina Linares	Alejandro Arrabal Hidalgo
 * @update 17/10/2011 	30/05/2013
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the node
 * @param {Array} ids Array with the references to the objects of the diagram
*/
NodePorts.prototype.setElementXML = function( xmlcomponent ) {
	  this.setAbstract(xmlcomponent.getAttribute( 'abstract' ));
	  NodePorts.base.setElementXML.call( this, xmlcomponent );
}


NodePorts.prototype.addChild = function( child ) {
  if( child instanceof Port ) {

    this._ports.push( child );
    child.setParent( this );

    child.correctPosition();
    return;
  } else {

    NodePorts.base.addChild.call( this, child );
  }

}

NodePorts.prototype.notifyDeleted = function( elem ) {

  if( elem instanceof Port ) {
    var i;
    for( i in this._ports ) {
      if( this._ports[i] == elem ) {
        this._ports.splice( i, 1 )
      }
    }
  } else {
    NodePorts.base.notifyDeleted.call( this, elem );
  }
}




/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodePorts.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[2].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodePorts.prototype.setName = function( text ){
	this._components[3].setValue( text );
}



/**
 * Adds new item to the attribute fields component of interfaces of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addInterface
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addInterface = function(text){
	var text = text || '';
	this._components[4].addField( text );
}


/**
 * Adds new item to the attribute fields component of realizations of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addRealization
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addRealization = function(text){
	var text = text || '';
	this._components[5].addField( text );
}


/**
 * Adds new item to the attribute fields component of artifacts of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/10/2011
 *
 * @method addArtifact
 * @param {String} text Text that will contain the new field of the component
 *
 */

NodePorts.prototype.addArtifact = function(text){
	var text = text || '';
	this._components[6].addField( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NodePorts.prototype.getStereotypes = function( ){
	return	this._components[2]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NodePorts.prototype.getName = function( ){
	return this._components[3].getValue();
}



/**
 * Return the interfaces of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getInterfaces
 * @return {Array} Array with the interface components of the element
 *
 */

NodePorts.prototype.getInterfaces = function( ){
	return	this._components[4]._childs;
}



/**
 * Return the realizations of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRealizations
 * @return {Array} Array with the realization components of the element
 *
 */

NodePorts.prototype.getRealizations = function( ){
	return	this._components[5]._childs;
}



/**
 * Return the artefacts of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getArtefacts
 * @return {Array} Array with the artefact components of the element
 *
 */

NodePorts.prototype.getArtifacts = function( ){
	return	this._components[6]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodePorts.prototype.getStereotype = function(){
	return this._components[2];
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NodePorts.prototype.getNameAsComponent = function( ){
	return this._components[3];
}




/**
 * Returns the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method isAbstract
 * @return {Boolean} if the component is abstract
 *
 */
NodePorts.prototype.isAbstract  = function(){
	return this._abstract;
}




/**
 * Set the property abstract of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 29/05/2013
 *
 * @method setAbstract
 * @param {Boolean}  The value to set for the abstract property of the component
 *
 */
NodePorts.prototype.setAbstract  = function( value ){
	this._abstract=value;
	if(this._abstract==true)this.getNameAsComponent().setFontStyle('italic');
	else if(this.getNameAsComponent().getFontStyle()=='italic') this.getNameAsComponent().setFontStyle('normal');
}


/**
 * Returns the ports of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/08/2013
 *
 * @method getPorts
 * @return {Array} the component ports
 *
 */
NodePorts.prototype.getPorts  = function(){
	return this._ports;
}



/**
 * Package class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @class Package
 * @extends Rectangular
 *
 */

var Package = function( params ) {

  params = params || {};
  Package.baseConstructor.call(this,params);
}
JSFun.extend(Package,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Package.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Package.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Package.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Package.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Package.prototype.getStereotype = function(){
	return this._components[1];
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Package.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * PackageContainer class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class PackageContainer
 * @extends Rectangular
 *
 */

var PackageContainer = function( params ) {

  params = params || {};
  PackageContainer.baseConstructor.call(this,params);
}
JSFun.extend(PackageContainer,Rectangular);




/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

PackageContainer.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

PackageContainer.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

PackageContainer.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
PackageContainer.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

PackageContainer.prototype.getStereotype = function(){
	return this._components[0];
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
PackageContainer.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Realization class constructor, creates a realization's relation in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Realization
 * @extends Relation
 *
 */

var Realization = function( params ) {

  params = params || {};
  Realization.baseConstructor.call(this,params);
}
JSFun.extend(Realization,Relation);

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Realization.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Realization.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Realization.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */

Realization.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Realization.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




var UMLComponentDiagram = function( params ) {
  var f = new ComponentDiagram( params );
  f.setType( 'UMLComponentDiagram' );
  f.setName( 'Component diagram' );

  f.setValidElements(  [ 'UMLNote', 'UMLLine','UMLArtifact','UMLClass', 'UMLComComponent', 'UMLComposition',
                          'UMLInterface', 'UMLInterfaceExtended', 'UMLInterfaceUsage',
                          'UMLInterfaceRealization', 'UMLPort', 'UMLGeneralization',
                          'UMLGeneralizationSet','SetLine', 'UMLDependency',
                          'UMLRealization', 'UMLInterfaceExtended', 'UMLConnector',
                          'UMLNAssociation', 'UMLAssociation','UMLInterfaceUse',
                          'UMLPackage', 'UMLPackageContainer' ]  );

  return f;
}






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

	var params = params || {};

  var f = new Package( params );
  f.setType( 'UMLPackage' );


	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );

  f.addFigure( new PackageFigure({ color: '#c0e1c2' }) );

  f.addComponent( new Space({ height: 16 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Package name', centered: true, margin: 3 }) );

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

	var params = params || {};

  var f = new PackageContainer( params );
  f.setType( 'UMLPackageContainer' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );

  f.setMoveable();
  f.setContainer();

  f.addFigure( new RectangleFigure({ color: '#bdd8e5' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name', margin: 5, text: 'Package name' }) );

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

	var params = params || {};

  var f = new NodePorts( params );
  f.setType( 'UMLComComponent' );

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

	var params = params || {};

  var f = new Class( params );
  f.setType( 'UMLClass' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'ClassName', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'operations' , margin: 3}) );


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

	var params = params || {};

  var f = new Artifact( params );
  f.setType( 'UMLArtifact' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABartifact\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Artifact Name', centered: true, margin: 3 }) );
  f.getNameAsComponent().setUnderlineText(true);
  f.addComponent( new PropertyFields({ id: 'properties',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new ArtifactSymbol({ position: Component.TopRight, margin: 3 }) );
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

	var params = params || {};

  var f = new NodeInterface( params );
  f.setType( 'UMLInterface' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 16 );
  f.setHeight( 16 );

  f.addFigure( new EllipseFigure({ color: '#67ac88' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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

	var params = params || {};

  var f = new InterfaceExtended( params );
  f.setType( 'UMLInterfaceExtended' );


	setStereotypeProperties(f,params.stereotypes || []);


  f.setMoveable();
  f.setWidth( 150 );

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new CircleSymbol({ position: Component.TopRight, margin: 3 }) );

  f.addComponent( new TextArea({ id: 'name', text: 'Interface Name', centered: true, margin: 3 }) );

  f.addComponent( new AttributeFields({ id: 'attributes', visibleSubComponents: false, margin: 3 }) );
  f.addComponent( new OperationFields({ id: 'methods' , visibleSubComponents: false, margin: 3}) );

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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  f.setEnd( new InterfaceUsageEnd() );

  return f;
}


var UMLInterfaceRealization = function( params ) {
  var f = new InterfaceRealization( params );
  f.setType( 'UMLInterfaceRealization' );

  f.setComponentName();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  return f;
}


var UMLConnector = function( params ) {
  var f = new ConnectorRelation( params );
  f.setType( 'UMLConnector' );

  f.addComponentStereotype();
  f.setComponentName();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  return f;
}

var UMLPort = function( params ) {

	var params = params || {};

  var f = new Port( params );
  f.setType( 'UMLPort' );

	setStereotypeProperties(f,params.stereotypes || []);

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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);


  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );

  return f;
}



/**
 * Artifact constructor, creates a Artifact of the uml2 deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/3/2013
 *
 * @class Artifact
 * @extends Rectangular
 *
 */

var Artifact = function( params ) {

  params = params || {};
  Artifact.baseConstructor.call(this,params);
}
JSFun.extend(Artifact,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contthat.objectain the new field of the stereotype component
 *
 */

Artifact.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Artifact.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Adds new item to the property fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Artifact.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}



/**
 * Adds new item to the property fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/11/2011
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Artifact.prototype.addOperation = function(text){
	var text = text || '';
	this._components[4].addField( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Artifact.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Artifact.prototype.getName = function( ){
	return this._components[2].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Artifact.prototype.getStereotype = function(){
	return this._components[1];
}


/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Artifact.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * Return the component that contains the properties of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getProperties
 * @return {Array} Array with the attribute components of the element
 *
 */
Artifact.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}



/**
 * Return the component that contains the properties of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getProperties
 * @return {Array} Array with the attribute components of the element
 *
 */
Artifact.prototype.getOperations = function( ){
	return	this._components[4]._childs;
}



/**
 * Association class constructor, creates a relation of association in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Association
 * @extends Relation
 *
 */

var Association = function( params ) {

  params = params || {};
  Association.baseConstructor.call(this,params);
}
JSFun.extend(Association,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Association.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Association.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleA
 * @param {String} text Text to establish the role A
 *
 */

Association.prototype.setRoleA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setRoleB
 * @param {String} text Text to establish the role B
 *
 */

Association.prototype.setRoleB = function(text){
	this._components[3].setValue( text );
}



/**
 * Set the Multiplicity A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Association.prototype.setMultiplicityA = function(text){
	this._components[4].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Association.prototype.setMultiplicityB = function(text){
	this._components[5].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Association.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Association.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleA
 * @return {String} Text of the role A component
 *
 */

Association.prototype.getRoleA = function( ){
	return this._components[2].getValue( );
}



/**
 * Returns the text of the role B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getRoleB
 * @return {String} Text of the role B component
 *
 */

Association.prototype.getRoleB = function( ){
	return this._components[3].getValue( );
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Association.prototype.getMultiplicityA = function( ){
	return this._components[4].getValue( );
}



/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Association.prototype.getMultiplicityB = function( ){
	return this._components[5].getValue( );
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Association.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Dependency class constructor, creates a relation of dependency in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Dependency
 * @extends Relation
 *
 */

var Dependency = function( params ) {

  params = params || {};
  Dependency.baseConstructor.call(this,params);
}
JSFun.extend(Dependency,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Dependency.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Dependency.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Dependency.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Dependency.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Dependency.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * DeploymentDiagram class constructor, creates a uml2 diagram of deployment
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 5/03/2013
 *
 * @class DeploymentDiagram
 * @extends Diagram
 *
 */
var DeploymentDiagram = function( params ){
	DeploymentDiagram.baseConstructor.call(this,params);
}
JSFun.extend(DeploymentDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/04/2013
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

DeploymentDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2011
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

DeploymentDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

			obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}



/**
 * DeploymentSpecification constructor, creates a DeploymentSpecification of the uml2 deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/3/2013
 *
 * @class DeploymentSpecification
 * @extends Rectangular
 *
 */

var DeploymentSpecification = function( params ) {

  params = params || {};
  DeploymentSpecification.baseConstructor.call(this,params);
}
JSFun.extend(DeploymentSpecification,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

DeploymentSpecification.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

DeploymentSpecification.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

DeploymentSpecification.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

DeploymentSpecification.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
DeploymentSpecification.prototype.getName = function( ){
	return this._components[2].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

DeploymentSpecification.prototype.getStereotype = function(){
	return this._components[1];
}


/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
DeploymentSpecification.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * Return the component that contains the properties of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getAttribute
 * @return {Array} Array with the attribute components of the element
 *
 */
DeploymentSpecification.prototype.getAttribute = function( ){
	return	this._components[3]._childs;
}



/**
 * Generalization class constructor, creates a generalization in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Generalization
 * @extends Relation
 *
 */

var Generalization = function( params ) {

  params = params || {};
  Generalization.baseConstructor.call(this,params);
}
JSFun.extend(Generalization,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Generalization.prototype.addStereotype = function( text ){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Generalization.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Generalization.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Generalization.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Generalization.prototype.getNameAsComponent = function( ){
	return this._components[1];
}





/**
 * GeneralizationSet class constructor, creates a relation of GeneralizationSet in the usecase diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @class GeneralizationSet
 * @extends Relation
 *
 */

var GeneralizationSet = function( params ) {
  params=params || {};
  this._pivotP=2;
  GeneralizationSet.baseConstructor.call(this);
}
JSFun.extend(GeneralizationSet,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

GeneralizationSet.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
GeneralizationSet.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

GeneralizationSet.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
GeneralizationSet.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
GeneralizationSet.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
GeneralizationSet.prototype.getRelations=function() {
	return this._relations;
}




/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
GeneralizationSet.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(GeneralizationSet.base.setElements.call(this,elem,elem2))
		{
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem.length>1)
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			this._calculateLineEnds();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 04/09/2012
 *
 * @method getRelation
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
GeneralizationSet.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA===elem || this._relations[i]._elemB===elem)return this._relations[i];
	 }
}



/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
GeneralizationSet.prototype.addElement = function( elem) {
	if(!(elem instanceof Node) )return false;

	for(i in this._relations ) if(this._relations[i]._elemA==elem || this._relations[i]._elemB==elem )return false;

   relation=new SetLine({a:elem,b:this});
   relation._calculateLineEnds();

   var newP=new Point(relation.getCentralPoint());
   this._points.splice(this._pivotP,0,newP);

   relation._calculateLineEnds();

   relation._points[2]=this._points[this._pivotP];
   this._pivotP++;

   this.notifyChange();
   return true;

}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/03/2013
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
GeneralizationSet.prototype.delElement = function( elem) {
	if(!(elem instanceof Node) )return false;

  for(i in this._relations ){
	  if(this._relations[i]._elemA===elem  || this._relations[i]._elemB===elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }

  return false;
}




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
GeneralizationSet.prototype.notifyDeleted = function( elem ) {
	  for(i=0;i<this._relations.length;i++ ){
		  if(this._relations[i]===elem && this._relations[i].getType()=="SetLine"){
			  this._relations.splice( i, 1 );
			  this._pivotP--;
			  this._points.splice( 2+i, 1 );
		  }
	  }
}


/**
 * Calculates the final points of the relation
 * that are in contact with the nodes
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _calculateLineEnds
 * @private
 */

GeneralizationSet.prototype._calculateLineEnds = function( ) {
	  var pointA, pointB;
	  var npoints = this._points.length;

	   if(!this._points[3]){
		      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
		      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

		      this._points[0] = pointA;
		      this._points[1] = pointB;
		      this._points[1] = new Point(this.getCentralPoint());
		      this._points[2]= new Point(this.getCentralPoint());
		      this._points[3]=this._points[1];
		      this._points[1]=this._points[2];
		      this._points[2]=this._points[3];
		      this._pivotP=2;
              this._points[3]= pointB;

		 }

	  if( this._elemA == this._elemB ) {
		var center = this._elemA.getCentralPoint();
	    var cx = center.getX();
	    var cy = center.getY();

			var x = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
			var y = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
			var heightPoints;
			var widthPoints;

			if(this._selected == 2 || this._selected == 0 || this._selected == npoints-1 ||
			   (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing){

				if((x - cx) > 0){
					if((y-cy) > 0){	//Fourthy quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					} else {	//First quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = x - pointB.getX();
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() + widthPoints, cy );
					}
				} else {

					if((y-cy) > 0){	//Third quadrant

						pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );

						heightPoints = y - pointA.getY();
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() + heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() + heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					} else {	//Second quadrant

						pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
						pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
						heightPoints = pointA.getY() - y;
						heightPoints = (heightPoints < 20) ? 20 : heightPoints;
						widthPoints  = pointB.getX() - x;
						widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

						this._points[1] = new Point( cx, pointA.getY() - heightPoints );
						this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() - heightPoints );
						this._points[3] = new Point( pointB.getX() - widthPoints, cy );
					}
				}
			} else if(this._selected == 3){

				x = this._points[3]._x;
				y = this._points[3]._y;

				pointA = this._elemA.getLinkCentered( cx, this._points[0]._y  );

				if((x - cx) > 0){

					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() + widthPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				} else {

					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
					this._points[2].setX(pointB.getX() - widthPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				}
			} else if(this._selected == 1){

				x = this._points[1]._x;
				y = this._points[1]._y;

				pointB = this._elemA.getLinkCentered( this._points[4]._x, cy );

				if((y - cy) > 0){

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					heightPoints  = y - pointA.getY();
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2].setY(pointA.getY() + heightPoints );
				} else {

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					heightPoints  = pointA.getY() - y;
					heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2].setY(pointA.getY() - heightPoints);
				}
			}
			else if(this._selected == 2){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			   else if(this._selected == -1){

				var movX = 0;
				var movY = 0;
				if(this._elemA._moved){

					var movX = (this._elemA._x - this._elemA._prex)/2;
					var movY = (this._elemA._y - this._elemA._prey)/2;

					this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
					this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

					pointA = this._points[0];
					pointB = this._points[4];

					this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
					this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
					this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
				}
			}

			this._points[0] = pointA;
		  this._points[4] = pointB;

			while(this._points[5])
				this._points.pop();

	  }
	  else {
		  if( npoints == 4 ) {
		      pointA = this._elemA.getLinkCentered( this._points[1] );
		      pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		      this._points[0] = pointA;
              this._points[3]= pointB;
		    }

		    else if(npoints > 4 ){
		        pointA = this._elemA.getLinkCentered( this._points[1] );
		        pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		        this._points[0] = pointA;
		        this._points[this._points.length-1]= pointB;

		        for(i=0;i<this._relations.length;i++)this._relations[i]._calculateLineEnds();
		       	if(this._orientation){
		       		for(i=1;i<this._pivotP;i++)this._points[i].setX(this._points[this._pivotP].getX());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setY(this._points[1].getY()+5);
		       		 }
		       		}
		       	else{
		       		for(i=1;i<this._pivotP;i++)this._points[i].setY(this._points[this._pivotP].getY());
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setX(this._points[1].getX()+5);
		       		 }
		       		}
		    }
		    else {

			      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
			      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

			      this._points[0] = pointA;
			      this._points[1] = pointB;
			      this._points[1] = new Point(this.getCentralPoint());
			      this._points[2]= new Point(this.getCentralPoint());
			      this._points[3]=this._points[1];
			      this._points[1]=this._points[2];
			      this._points[2]=this._points[3];
			      this._pivotP=2;
	              this._points[3]= pointB;
		    }
		  }
}

/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points
 * and form a straight line
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
GeneralizationSet.prototype._delUselessPoints = function() {
	  var i;
	  for( i = this._points.length-1; i > this._pivotP; i-- ) {
	    if(this._selectLine( this._points[i+1],
	                          this._points[i-1],
	                          this._points[i].getX(),
	                          this._points[i].getY(), 10 ) )
	    {

	      this._points.splice(i, 1);
	    }
	  }

}

/**
 * The relation and its components are drawn with the defined style
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/ 22/09/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
GeneralizationSet.prototype.draw = function( context ) {
  var npoints = this._points.length;
  var points=[];
  for(i=this._pivotP; i<npoints ;i++){

	  points.push(this._points[i]);
  }
  if( this._line ) {
	  this._line.draw( context, points, this.getLineColor(),this.getLineWidth() );

  }
  if( this._end ){

    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx =this._points[ npoints - 1 ].getX();
    var by =this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    this._end.draw( context, bx, by, angle, this.getLineColor() );

  }

  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {

      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }

  }
	/*Drawing the line for the setlines*/
	  points=[];
	  for(i=1;i<=this._pivotP;i++){

		  points.push(this._points[i]);
	  }
	  if(points.length>1){

		  if(this.getLineStyle()=="solid")var a=new SolidLine();
		  else{var a=new DashedLine();}

	      a.draw(context, points, this.getLineColor(),this.getLineWidth());
	  }

	 /*Drawing the main line*/
	  points=[];
	  points[0]=this._points[0];
	  points[1]=this._points[1];
	  points[2]=this._points[this._pivotP];

	  if(this.getLineStyle()=="solid")var a=new SolidLine();
	  else{var a=new DashedLine();}

	  a.draw(context, points, this.getLineColor(),this.getLineWidth());


  if( this._selected > -1 ) {
    this._drawComponentsShape( context );

  }
  this._drawComponents( context );

}

/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 4/03/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
GeneralizationSet.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}

  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
    if( this._selected > -1 ) {

      if( this._isOverComponent( x, y, radius ) ) {
            this._selectedBefore = true;
            this._component=true;

            return true;
          }

    }

    for( var i = 0; i < this._points.length-1; i++ ) {
      if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

        if( this._selected > -1 )
          this._selectedBefore = true;

        this._selected = i;
        if(i>=this._pivotP){
            this._selectedLine = true;
            this._component=false;
        	this._points.splice( this._selected, 0, new Point(x,y) );
        }
        else if(i>=1){
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = this._pivotP;
        }
        else{
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = 1;

        }
        return true;
      }
    }



  return false;
}




/**
 * Calculates element orientation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method __calculateOrientation
 * @return {Boolean} True if the element was oriented along the x axis, False in other case.
 * @private
 */
GeneralizationSet.prototype._calculateOrientation = function() {
	  var m=(this._elemA.getCentralPoint().getY()-this._elemB.getCentralPoint().getY())
	  /(this._elemA.getCentralPoint().getX()-this._elemB.getCentralPoint().getX());
      return (m<1&&m>-1);
}



/**
 * Check is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isXOriented
 * @return {Boolean} If the element was oriented along the x axis
 */
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation;
}




/**
 * Check is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isYOriented
 * @return {Boolean} If the element was oriented along the y axis
 */
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation;
}




/**
 * Set is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setXOrientation
 */
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation=true;
}




/**
 * Set is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setYOrientation
 */
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation=false;
}




/**
 * return the orientation of the element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method getOrientation
 * @return {String} The axis of the element orientation
 */
GeneralizationSet.prototype.getOrientation = function() {
	if(this._orientation)return "x";
	return "y";
}



/**
 * The grafical style of the GeneralizationSet's lines and SetLines will be defined as style
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set to the relation and all his SetLines
 */
GeneralizationSet.prototype.setLineStyle = function(style){
	if(!(GeneralizationSet.base.setLineStyle.call(this,style)))return false;
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine"){
			if(!(this._relations[i].setLineStyle(style)))return false;
		}
	}
	return true;
}




/**
 * The color of the GeneralizationSet's lines and SetLines will be defined as color
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines and SetLines
 */

GeneralizationSet.prototype.setLineColor = function(color){
	GeneralizationSet.base.setLineColor.call(this,color)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineColor(color);
	}
}




/**
 * The width of the GeneralizationSet's lines and SetLines will be defined as width
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines and SetLines
 */
GeneralizationSet.prototype.setLineWidth = function(width) {
	GeneralizationSet.base.setLineWidth.call(this,width)
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineWidth(width);
	}
}




/**
 * Constructor de la clase SetLine
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 07/10/2012
 *
 * @class SetLine
 * @extends Relation
 */
var SetLine = function( params ) {
	  params=params || {};
	  this._last=null;
	  this._id = 0;
	  this._type = 'SetLine';
	  this._line_color= '#000000';
	  this._line_width=1.25;
	  this._points = [ new Point(), new Point() ];

	  this._selected = -1;
	  this._selectedBefore = false;
	  this._moved = false;
	  this._activeComponent = null;


	  this._selectedLine = false;
	  this._selectedPoint = false;

	  this._relations= [];
	  this._components = [];
	  this._diagram = null;

	  this.setElements( params.a, params.b );
	  f=this;
	  if(this._elemB){
		  this.setMenu([[function(){f._elemB.showStyleDialog({that: f._elemB});f._elemB.removeContextualMenu();},'Style']]);
		  this.setLineStyle( this._elemB.getLineStyle() );
		  this.setLineColor(this._elemB.getLineColor());
		  this.setLineWidth(this._elemB.getLineWidth());
		  }
}
JSFun.extend(SetLine,Relation);




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
SetLine.prototype._delUselessPoints = function() {
}




/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 20/01/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 *
 */
SetLine.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */	  this.setType( 'SetLine' );
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}
  for( var i = 0; i > this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedLine = true;
      this._component=false;
      return true;
    }
  }
  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {
      if(i==2)return false;
      if( this._selected > -1 )
        this._selectedBefore = true;
      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
  for( var i = 0; i < this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = 1;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }

  return false;
}




/**
 * Calculates the final points of the relation
 * that are in contact with the node and relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
*/
SetLine.prototype._calculateLineEnds= function() {
    if(!this._elemB)return false;
    var pointA=this._points[1];

	if(this._elemB._orientation){
	    if(this._points.length<3){
	    	var pointA= new Point(this._elemB._points[1].getX(),this._elemA.getCentralPoint().getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
	    }
	    else{
	    	if(this._elemA.isOver(this._points[2])){
	    		if(this._elemB._points[this._elemB._pivotP].getY()
		   			<this._elemA.getY())
		   		this._points[2].setY(this._elemA.getY()-20);
	    		else{this._points[2].setY(this._elemA.getY()+this._elemA.getHeight()+20);}
	    	}

		    if(this._points[0].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[2].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX()-10);

		    }
		    else if(this._points[2].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[0].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX()+this._elemA.getWidth());
				this._points[1].setX(this._elemA.getX()+this._elemA.getWidth()+10);

		    }

	    }

	}

	else{
		if(this._points.length<3){
			var pointA= new Point(this._elemA.getCentralPoint().getX(),this._elemB._points[1].getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
		}
		else{

			if(this._elemA.isOver(this._points[2])){
		    	if(this._elemB._points[this._elemB._pivotP].getX()
		    			<this._elemA.getX())
		    		this._points[2].setX(this._elemA.getX()-20);
		    	else{this._points[2].setX(this._elemA.getX()+this._elemA.getWidth()+20);}
		    }

		    if(this._points[0].getY()<=this._elemA.getY()
		    		&&this._points[2].getY()>this._elemA.getY()+this._elemA.getHeight())
		    	{
		    		this._points[0].setY(this._elemA.getY()+this._elemA.getHeight());
		    		this._points[1].setY(this._elemA.getY()+this._elemA.getHeight()+10);
		    	}
		    else if(this._points[0].getY()>=this._elemA.getY()+this._elemA.getHeight()
		    		&&this._points[2].getY()<=this._elemA.getY())
		    {
				this._points[0].setY(this._elemA.getY());
				this._points[1].setY(this._elemA.getY()-10);

		    }

		}

	}

	if(this._points.length<3){
		this._points[1]=pointA;
		this._points[1]=new Point(this.getCentralPoint());
		this._points[2]=pointA;
	}



	this._points[0]=this._elemA.getLinkCentered(this._points[1]);
}




/**
 * Receives a xml node with the information this.setElements( ids[ idElemA ], ids[ idElemB ] );of the relation and get it back
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
*/
SetLine.prototype.setElementXML = function( xmlnode, ids ) {
	var idElemA = xmlnode.getAttribute( 'side_A' );
	var idElemB = xmlnode.getAttribute( 'side_B' );
	var elemB =ids[ idElemB ];
	var elemA =ids[ idElemA ];

	if(!(elemB instanceof GeneralizationSet))return null;

	elemB.addElement(elemA);
    relation = elemB._relations[elemB._relations.length-1];
    this.setId(xmlnode.getAttribute( 'id' ));

    var i;
    var childs = xmlnode.childNodes;
    var p = 0;
    for( i = 0; i < childs.length; i++ ) {
      if( childs[i].nodeName == 'point' ) {
    	  this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                     parseInt( childs[i].getAttribute( 'y' ) )
                                    );
        p++;
      }
    }
    elemB.delElement(elemA);


    this.setLineStyle(elemB.getLineStyle() );
    this.setLineColor(elemB.getLineColor());
    this.setLineWidth(elemB.getLineWidth());
    this._type = 'SetLine';

    this._elemA=elemA;
    this._elemB=elemB;

    elemB._relations.splice( elemB._relations.length-1, 1, this );
    this._points[2]=elemB._points[elemB._pivotP];
    elemB._pivotP++;
    elemB.notifyChange();

	elemA.addRelation(this);
}



/**
 * InstanceArtifact InstanceArtifact constructor, creates a InstanceArtifact in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class InstanceArtifact
 * @extends Rectangular
 *
 */

var InstanceArtifact = function( params ) {

  params = params || {};
  InstanceArtifact.baseConstructor.call(this,params);
}
JSFun.extend(InstanceArtifact,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

InstanceArtifact.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

InstanceArtifact.prototype.setName = function( text ){
	this._components[2].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

InstanceArtifact.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

InstanceArtifact.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
InstanceArtifact.prototype.getName = function( ){
	return this._components[2].decode(this._components[2].getValue())[0];
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

InstanceArtifact.prototype.getAttributes = function( ){
	return	this._components[3]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

InstanceArtifact.prototype.getStereotype = function(){
	return this._components[1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
InstanceArtifact.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * NAssociation class constructor, creates a relation of n-ary association in the deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 5/03/2013
 *
 * @class NAssociation
 * @extends Rhombus
 *
 */

var NAssociation = function( params ) {
  params=params || {};

  NAssociation.baseConstructor.call(this,params);
}
JSFun.extend(NAssociation,Rhombus);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NAssociation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
NAssociation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the role of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method setRole
 * @param {Element} element  Element witch role is gone be set.
 * @param {String} text New value of element's role.
 *
 */

NAssociation.prototype.setRole = function(element,text){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentRoleA(text);
	}
}


/**
 * Set the multiplicity of the element UML, if this form part of the n-arry relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/09/2012
 *
 * @method Multiplicity
 * @param {Element} element  Element witch multiplicity is gone be set.
 * @param {String} multi New value of element's multiplicity.
 *
 */

NAssociation.prototype.setMultiplicity = function(element,multipicity){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element)
			this._relations[i].setComponentMultiplicityA(multipicity);
	}
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NAssociation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NAssociation.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the text of the role A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getRole
 * @param {Element} element  Element witch role is gone be get.
 * @return {String} Text of the associated element  role component
 *
 */

NAssociation.prototype.getRole = function(element ){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._roleA)
			return this._relations[i]._roleA.getValue();
	}
}



/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/08/2012
 *
 * @method getMultiplicity
  * @param {Element} element  Element witch multiplicity is gone be get.
 * @return {String} Text of the associated  element multiplicity component.
 *
 */

NAssociation.prototype.getMultiplicity = function(element){
	for(i in this._relations ) {
		if(this._relations[i]._elemA==element && this._relations[i]._multiA)
			return this._relations[i]._multiA.getValue();
	}
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NAssociation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
NAssociation.prototype.getRelations=function() {
	return this._relations;
}



/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
NAssociation.prototype.setElements = function( elem,elem2) {
	if(!(elem instanceof Array)){
		if(elem instanceof Node &&elem2 instanceof Node)
		{
			relation=new AssociationN({a:elem,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	relation=new AssociationN({a:elem2,b:this});
		 	relation._calculateLineEnds();
		 	relation.updateParent();
		 	this.notifyChange();
			return true;
		}
		return false;
	}
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	 if(elem[0]&&elem[1])
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.notifyChange();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method getElement
 * @param {Element} elem  Element witch associated relation is gone be get.
 * @return {Relation}  The relation associated to the element.
 */
NAssociation.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA==elem)return this._relations[i];
	 }
}




/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
NAssociation.prototype.addElement = function( elem) {
	  if(!(elem instanceof Node) )return false;

  for(i in this._relations ) if(this._relations[i]._elemA==elem )return false;

 	relation=new AssociationN({a:elem,b:this});
    relation._calculateLineEnds();
    relation.updateParent();
    this.notifyChange();
    return true;
}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/09/2012
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
NAssociation.prototype.delElement = function( elem) {
  if(!(elem instanceof Node) )return false;


  for(i in this._relations ){
	  if(this._relations[i]._elemA==elem ){
		  this._relations[i].remove();

		  if( this._relations.length>=2&&(elem==this._elemA||elem==this._elemB)){
			  this._elemA=this._relations[0]._elemA;
			  this._elemB=this._relations[1]._elemA;

		  }
		  else if(this._relations.length<2){
			  this.remove();
		  }
		  return true;
	  }
  }

    return false;
}



/**
 * Constructor de la clase AssociationN
 * Representa una relación n-aria
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/10/2012
 *
 * @class AssociationN
 * @extends Relation
 */
var AssociationN = function( params ) {
	var params = params || {};
  var f = new Relation( params );

  f.setType( 'AssociationN' );

  f.addComponentStereotype();
  f.setComponentName();
  f.setComponentRoleA();
  f.setComponentMultiplicityA();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);

  f.setLine( new SolidLine() );

  return f;
}




/**
 * NodeElement class constructor, creates a NodeElement in the deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @class NodeElement
 * @extends Rectangular
 *
 */

var NodeElement = function( params ) {

  params = params || {};
  NodeElement.baseConstructor.call(this,params);
}
JSFun.extend(NodeElement,Cube);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodeElement.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodeElement.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NodeElement.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NodeElement.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodeElement.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 12/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NodeElement.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * NodeTextNotation class constructor, creates a NodeTextNotation in the deployment diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @class NodeTextNotation
 * @extends Rectangular
 *
 */

var NodeTextNotation = function( params ) {

  params = params || {};
  NodeTextNotation.baseConstructor.call(this,params);
}
JSFun.extend(NodeTextNotation,Cube);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

NodeTextNotation.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

NodeTextNotation.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

NodeTextNotation.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
NodeTextNotation.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

NodeTextNotation.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
NodeTextNotation.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Returns the artifact fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method getArtifacts
 * @return {Component} Artifact fields component of the element UML
 *
 */
NodeTextNotation.prototype.getArtifacts = function( ){
	return this._components[2]._childs;
}



/**
 * Creates a new artifact item in artifact fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 15/03/2013
 *
 * @method addArtifact
 * @param {String} String text for the artifact item
 *
 */
NodeTextNotation.prototype.addArtifact = function(text ){
	var text = text || '';
	this._components[2].addField( text );
}


/**
 * Constructor of the class UMLDeploymentDiagram
 * Represents an deployment diagram of UML2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 * @class UMLDeploymentDiagram
 * @extends Diagram
 */
var UMLDeploymentDiagram = function( params ) {

  var f = new DeploymentDiagram( params );

  f.setType( 'UMLDeploymentDiagram' );
  f.setName( 'Deployment diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLAssociation','UMLDependency', 'UMLGeneralization', 'UMLGeneralizationSet',
                        'SetLine','UMLNAssociation', 'AssociationN','UMLArtifact','UMLInstance','UMLNode','UMLNodeTextNotation','UMLDeploymentSpecification','UMLManifestation','UMLDeployment'] );

  return f;
}






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

	var params = params || {};

  var f = new InstanceArtifact( params );
  f.setType( 'UMLInstance' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABartifact\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Artifact Name', centered: true, margin: 3 }) );
  f.getNameAsComponent().setUnderlineText(true);
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new ArtifactSymbol({ position: Component.TopRight, margin: 3 }) );
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

	var params = params || {};

  var f = new Artifact( params );
  f.setType( 'UMLArtifact' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABartifact\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Artifact Name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new OperationFields({ id: 'operations',visibleSubComponents: false, margin: 3 }));
  f.addComponent( new ArtifactSymbol({ position: Component.TopRight, margin: 3 }) );
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

	var params = params || {};

  var f = new NodeElement( params );
  f.setType( 'UMLNode' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );

  f.setMoveable();
  f.setContainer();

  f.addFigure( new CubeFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Node name', centered: true, margin: 3 }) );
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

	var params = params || {};

  var f = new NodeTextNotation( params );
  f.setType( 'UMLNodeTextNotation' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );

  f.setMoveable();

  f.addFigure( new CubeFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Node name', centered: true, margin: 3 }) );
  f.addComponent( new ArtifactFields({ id: 'artifacts', margin: 3 }) );
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

	var params = params || {};

  var f = new DeploymentSpecification( params );
  f.setType( 'UMLDeploymentSpecification' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color:  '#ffffbb' }) );
  f.addComponent( new Text({ text: '\xABdeployment spec\xBB' , centered: true, margin: 3 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes',  centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes',visibleSubComponents: false, margin: 3 }));
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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);


  f.setStereotype( '\xABdeploy\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );

  return f;
}




/**
 * Clase que representa una relación entre dos elementos del diagrama
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Line
 * @extends Element
 * @param {Element} a Primer elemento de la relación
 * @param {Element} b Segundo elemento de la relación
 */
var Line = function( params ) {
  params = params || {};
  Line.baseConstructor.call(this,params);

}
JSFun.extend( Line, Relation );





/**
 * Se dibuja la relación con el estilo definido y todos sus componentes
 *
 * @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 13/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del liendo de dibujo
 */

Line.prototype.draw = function( context ) {
  var npoints = this._points.length;

  if( this._line ) {
    this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );//3b3b3b
  }
/*
  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._end.draw( context, bx, by, angle, RelationStyle.line_color );
  }

  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._start.draw( context, bx, by, angle, RelationStyle.line_color );

  }
 */
  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {
      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }
  }

  if( this._selected > -1 ) {
    this._drawComponentsShape( context );
  }
  this._drawComponents( context );

}





/**
 * Note class constructor, define the properties and methods of a note in any diagram UML
 *
 * @author Rafael Molina Linares
 * @update 20/11/2011
 *
 * @class Note
 * @extends Element
 *
 */

var Note = function( params ) {

  params = params || {};
	Note.baseConstructor.call(this,params);
}
JSFun.extend( Note, Rectangular );




/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Note.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Note.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return Array with the stereotypes components of the element
 *
 */

Note.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}



/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */

Note.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Note.prototype.getNameAsComponent = function( ){
	return this._components[1];
}






/**
 * Constructor de la clase UMLNote
 * Representa una nota de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLNote
 * @extends Rectangular
 */
var UMLNote = function( params ) {
  var f = new Note( params );
  f.setType( 'UMLNote' );

  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );


  f.addFigure( new NoteFigure({ color:  '#ffffbb' }) );
  f.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true  }) );
  f.addComponent( new TextArea({ id: 'description', text: 'Note', centered: true, margin: 5 }) );

  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);

  return f;
}



/**
 * Constructor de la clase UMLLine
 * Representa una linea simple
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/12/2010
 *
 * @class UMLLine
 * @extends Relation
 */

var UMLLine = function( params ) {
  var f = new Line( params );
  f.setType( 'UMLLine' );

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new DashedLine() );

  return f;
}






/**
 * Instance instance constructor, creates a instance in the class diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class Instance
 * @extends Rectangular
 *
 */

var Instance = function( params ) {

  params = params || {};
  Instance.baseConstructor.call(this,params);
}
JSFun.extend(Instance,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Instance.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Instance.prototype.setName = function( text ){
	this._components[1].setValue( text );
}





/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method addAttribute
 * @param {String} text Text that will contain the new field of the component
 *
 */

Instance.prototype.addAttribute = function(text){
	var text = text || '';
	this._components[2].addField( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Instance.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Instance.prototype.getName = function( ){
	return this._components[1].decode(this._components[1].getValue())[0];
}


/**
 * Return the component that contains the attributes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getAttributes
 * @return {Array} Array with the attribute components of the element
 *
 */

Instance.prototype.getAttributes = function( ){
	return	this._components[2]._childs;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Instance.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 3/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Instance.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Instance.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * PackageDiagram class constructor, creates a diagram of state machine
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @class PackageDiagram
 * @extends Diagram
 *
 */
var InstanceDiagram = function( params ){
	InstanceDiagram.baseConstructor.call(this,params);
}
JSFun.extend(InstanceDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

InstanceDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

InstanceDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}



/**
 * Association class constructor, creates a relation of link in the instances diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @class instances
 * @extends Relation
 *
 */

var Link = function( params ) {

  params = params || {};
  Link.baseConstructor.call(this,params);
}
JSFun.extend(Link,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Link.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Link.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Set the Multiplicity A of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setMultiplicityA
 * @param {String} text Text to establish the multiplicity A component
 *
 */

Link.prototype.setMultiplicityA = function(text){
	this._components[2].setValue( text );
}



/**
 * Set the Multiplicity B of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method setMulticiplyB
 * @param {String} text Text to establish the Multiplicity B component
 *
 */

Link.prototype.setMultiplicityB = function(text){
	this._components[3].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Link.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Link.prototype.getName = function( ){
	return this._components[1].decode(this._components[1].getValue())[0];
}




/**
 * Returns the text of the Multiplicity A component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getMultiplicityA
 * @return {String} Text of the Multiciply A component
 *
 */

Link.prototype.getMultiplicityA = function( ){
	return this._components[2].getValue( );
}




/**
 * Returns the Multiplicity B of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getMulticiplyB
 * @return {String} Text of the Multiciply B component
 *
 */

Link.prototype.getMultiplicityB = function( ){
	return this._components[3].getValue( );
}






/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Link.prototype.getNameAsComponent = function( ){
	return this._components[1];
}


/**
 * Constructor of UMLInstancesDiagram
 * Represents a instances diagram of UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/12/2012
 * @class UMLInstancesDiagram
 * @extends Diagram
 */
var UMLInstanceDiagram = function( params ) {

  var f = new InstanceDiagram( params );

  f.setType( 'UMLInstanceDiagram' );
  f.setName( 'Instance diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLInstance', 'UMLLink'] );

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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style'],[function(){f.showDirectionDialog({that: f});f.removeContextualMenu();},'Navegability']]);

  f.setLine( new SolidLine() );
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

	var params = params || {};

  var f = new Instance( params );
  f.setType( 'UMLInstance' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 100 );
  f.setHeight( 50 );
  f.setMoveable();

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new InstanceItem({ id: 'name', centered: true, margin: 3 }) );
  f.addComponent( new AttributeFields({ id: 'attributes', margin: 3 }) );
  f.addFigure( new RectangleFigure({ color: '#ffffbb'}));
  f.getComponents()[0].setUnderlineText(true);

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
 * Dependency class constructor, creates a relation of dependency in the class diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class Dependency
 * @extends Relation
 *
 */

var Dependency = function( params ) {

  params = params || {};
  Dependency.baseConstructor.call(this,params);
}
JSFun.extend(Dependency,Relation);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Dependency.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Dependency.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Dependency.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Dependency.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Dependency.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Package class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @class Package
 * @extends Rectangular
 *
 */

var Package = function( params ) {

  params = params || {};
  Package.baseConstructor.call(this,params);
}
JSFun.extend(Package,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Package.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[1].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Package.prototype.setName = function( text ){
	this._components[2].setValue( text );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Package.prototype.getStereotypes = function( ){
	return	this._components[1]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Package.prototype.getName = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Package.prototype.getStereotype = function(){
	return this._components[1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Package.prototype.getNameAsComponent = function( ){
	return this._components[2];
}



/**
 * PackageContainer class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class PackageContainer
 * @extends Rectangular
 *
 */

var PackageContainer = function( params ) {

  params = params || {};
  PackageContainer.baseConstructor.call(this,params);
}
JSFun.extend(PackageContainer,Rectangular);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

PackageContainer.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

PackageContainer.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

PackageContainer.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
PackageContainer.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 13/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

PackageContainer.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
PackageContainer.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * PackageDiagram class constructor, creates a diagram of state machine
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 9/09/2011
 *
 * @class PackageDiagram
 * @extends Diagram
 *
 */
var PackageDiagram = function( params ){
	PackageDiagram.baseConstructor.call(this,params);
}
JSFun.extend(PackageDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/12/2012
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

PackageDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/12/2012
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

PackageDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}




/**
 * Constructor de la clase UMLPackageDiagram
 * Representa un diagrama de pauetes de UML 2
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/12/2012
 *
 * @class UMLPackageDiagram
 * @extends Diagram
 */
var UMLPackageDiagram = function( params ) {
  var f = new PackageDiagram( params );

  f.setType( 'UMLPackageDiagram' );
  f.setName( 'Package diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLPackage',
                        'UMLPackageContainer', 'UMLPackageMerge', 'UMLPackagePublicImport',
                        'UMLPackagePrivateImport','UMLDependency',] );

  return f;
}







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

	var params = params || {};

  var f = new Package( params );
  f.setType( 'UMLPackage' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();

  f.setWidth( 100 );
  f.setHeight( 50 );

  f.addFigure( new PackageFigure({ color: '#c0e1c2' }) );

  f.addComponent( new Space({ height: 16 }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextArea({ id: 'name', text: 'Package name', centered: true, margin: 3 }) );

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

	var params = params || {};

  var f = new PackageContainer( params );
  f.setType( 'UMLPackageContainer' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 150 );
  f.setHeight( 75 );

  f.setMoveable();
  f.setContainer();

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name', margin: 5, text: 'Package name' }) );

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

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setStereotype( '\xABaccess\xBB' );
  f.setLine( new DashedLine() );
  f.setEnd( new OpenTip() );

  return f;
}



/**
 * Extension class constructor, creates a Extension element of profile's diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Extension
 * @extends Relation
 *
 */

var Extension = function( params ){
	params = params || {};
	Extension.baseConstructor.call(this,params);
}
JSFun.extend(Extension,Relation);



/**
 * Defines the elements that are parte of the extension.
 * It is used when this elements hasn't been indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElements
 * @param {Element} elemA First relation's element
 * @param {Element} elemB Second relation's element
 * @return {Boolean} If it is has produced the allocation of new elements
 */

Extension.prototype.setElements = function( elemA, elemB ) {

	if(!((elemA instanceof Stereotype && elemB instanceof Metaclass) || (elemB instanceof Stereotype && elemA instanceof Metaclass)))
		return;

  if( elemA instanceof Element && elemB instanceof Element ) {

    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }

    if( this._elemA ) {
      this._elemA.delRelation( this );
    }
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }

		/*
			The element A must forever be the stereotype object.
			The element B must forever be the metaclass object.
		*/
    this._elemA = (elemA instanceof Stereotype) ? elemA : elemB;
    this._elemB = (elemB instanceof Metaclass)  ? elemB : elemA;

    this._elemA.addRelation( this );
    this._elemB.addRelation( this );

    this.updateParent();
    this._calculateLineEnds();



    return true;

  } else {
    return false;
  }
}


/**
 * Defines the first element that is part of the relation
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 * @return {Boolean} If the allocation of the new element has been done
 */
Extension.prototype.setElementA = function( elem ) {

	if(elem.getType() == 'UMLStereotype')
		Extension.base.setElementA.call(this,elem);
}



/**
 * Defines the second element that is part of the relation
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setElementB
 * @param {Element} elem Second element of the relation
 * @return {Boolean} If the allocation of the new element has been produced
 */
Extension.prototype.setElementB = function( elem ) {

	if(elem.getType() == 'UMLMetaclass')
		Extension.base.setElementB.call(this,elem);
}







/**
 * Metaclass class constructor, creates a Metaclass object of profile diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Metaclass
 * @extends Rectangular
 * @param {Number} diagrams Array of diagrams in which a change of the Metaclass object is propagated
 * @param {Array} validMetaclass  Bidimensional array with a list of pairs that relates the given name to the objects
 * 																in the application with the given name in the library
 */


var Metaclass = function( params ){
	params = params || {};
	Metaclass.baseConstructor.call(this,params);

	this.setValidMetaclass(params.validMetaclass || [])

	this._stereotypes = [];

	this.setDiagrams(params.diagrams || []);
}
JSFun.extend(Metaclass,Rectangular);



/**
 * Compares each pairs of the nameMetaclass array (passed as parameter) with all names of
 * the _validMetaclassLibrary, and the pairs that find a match will be saved
 * in an array of valid metaclasses to the application
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setValidMetaclass
 * @param {Array} nameMetaclass Array of pairs that relates the given name to a element UML by the application with the given name by the library
 */

Metaclass.prototype.setValidMetaclass = function( nameMetaclass ){

	if(!JSFun.isArray(nameMetaclass))
		return;

	this._validMetaclassLibrary = [  'UMLActor', 'UMLUseCase', 'UMLUseCaseExtended', 'UMLSystem', 'UMLSubSystem', 'UMLLine',
																	 'UMLClass', 'UMLComponent', 'UMLInterfaceExtended','UMLPackage', 'UMLPackageContainer',
																	 'UMLComComponent','UMLInterface','UMLLifeline', 'UMLOption', 'UMLAlternative',
																	 'UMLLoop', 'UMLBreak','UMLAcceptEventAction','UMLTimeEvent', 'UMLSendSignalAction',
																	 'UMLAction','UMLObject', 'UMLActivity',  'UMLDataStore', 'UMLConnectorActivity' ,
																	 'UMLHorizontalHierarchicalSwimlane','UMLVerticalHierarchicalSwimlane',
																	 'UMLSimpleState', 'UMLCompositeState', 'UMLVerticalRegion', 'UMLPin', 'UMLParameterNode',
																	 'UMLExpansionNode', 'UMLHorizontalRegion', 'UMLPort', 'UMLTerminate', 'UMLEntryPoint',
																	 'UMLExitPoint', 'UMLJunction', 'UMLFlowFinal', 'UMLDataType'  ];


	this._validMetaclassApp = [];

	/*
		For each pair (object's name in the library, object's name in the application)
		of the 'nameMetaclass' array, It is searched a match between the name of the object
		in the library of each pair and one of the valid metaclass names established by the
		library(they are found in the '_validMetaclassLibrary' array). If the match is found,
		the pair gets into the '_validMetaclassApp' array.
	*/

	for(var i=0;i<nameMetaclass.length;i++)
		if(JSFun.isArray(nameMetaclass[i]) && nameMetaclass[i].length == 2)
			if(this.foundInArray(this._validMetaclassLibrary, nameMetaclass[i][1]))
				this._validMetaclassApp.push(nameMetaclass[i]);

	this._validMetaclassApp = this._sortNamesMetaclass(this._validMetaclassApp);
}


/**
 * It is sorted the two-bidimensional array passed as parameter
 *
 *
 * @author Rafael Molina Linares
 * @update 3/12/2011
 *
 * @method sortNamesMetaclass
 * @param {Array} array Array that contains the possible names of the metaclass
 */

Metaclass.prototype._sortNamesMetaclass = function( array ){

	array.sort(
		function( a, b ) {

			if( a[0] < b[0] ){
				return -1;
			}	else if( a[0] > b[0]){
				return 1;
			}	else {
				return 0;
			}
	});

	return array;
}



/**
 * It is searched a match between the 'elem' parameter and some position of the array
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method foundInArray
 * @param {Array} array Array where searchs the elem parameter
 * @param {Array} elem  Element to search in the array
 * @return{Boolean} If the element has been found in the array
 */

Metaclass.prototype.foundInArray = function(array, elem){

	for(var i=0;i<array.length;i++)
		if(elem == array[i])
			return true;

	return false;
}


/**
 * Set the diagrams related with the Stereotype. When a change
 * is done to the Stereotype object, this change will be propagate to this diagrams
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Array} diagrams Array of diagrams that will be notified of changes in the Stereotype object
 */

Metaclass.prototype.setDiagrams = function( diagrams ){
	this._diagrams = diagrams;
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Metaclass.prototype.setName = function( text ) {
	this._components[1].setValue( text);
}



/**
 * A relation is added to the node, this means that the node has started
 * to be part of a relation and stores a reference to propagate changes
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */

Metaclass.prototype.addRelation = function( rel ) {

	Metaclass.base.addRelation.call(this,rel);
	this._stereotypes.push(rel._elemA);
	rel._elemA._metaclass.push(this);
}





/**
 * Relation is removed from the node, the node has ceased
 * to be part of the relation and does not need to store more information
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delRelation
 * @param {Relation} rel Relation to be remove
 */

Metaclass.prototype.delRelation = function( rel ){

	Metaclass.base.delRelation.call(this,rel);

	rel._elemA.delMetaclass(this);
	this.delStereotype(rel._elemA);
}



/**
 * Removes the item and all items that relate to it and make no sense
 * without its existence as child nodes or relations to which it belongs
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method remove
 */

Metaclass.prototype.remove = function() {

	var rel = this._relations;
	for(var i=0;i<rel.length;i++)
		rel[i]._elemA.delMetaclass(this);

	Metaclass.base.remove.call(this);
}


/**
 * Deletes the relation that is passed as parameter
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method notifyDeleted
 *
 */

Metaclass.prototype.notifyDeleted = function( rel ) {
  var i;

  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
			this.delStereotype(rel._elemA);
			rel._elemA.delMetaclass(this);

      this._relations.splice( i, 1 );
    }
  }

}



/**
 * It is removed the stereotype passed as parameter of the '_stereotype' array of the object(if exist inside of the array).
 * So this, it is searched inside of the '_stereotype' array, and if is found, it is removed.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delStereotype
 * @param {Metaclass} stereotype Stereotype to remove of the '_stereotype' array
 */

Metaclass.prototype.delStereotype = function( stereotype ) {
  var i;

  for( i in this._stereotypes ) {
    if( this._stereotypes[i] == stereotype ) {
      this._stereotypes.splice( i, 1 );
      break;
    }
  }

}

/**
 * Return the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getName
 * @return {String} name of the node
 *
 */

Metaclass.prototype.getName = function() {
	for(var i=0;i<this._validMetaclassApp.length;i++)
		if(this._validMetaclassApp[i][0] == this._components[1].getValue())
		 return	this._validMetaclassApp[i][1];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Metaclass.prototype.getNameAsComponent = function( ){
	for(var i=0;i<this._validMetaclassApp.length;i++)
		if(this._validMetaclassApp[i][0] == this._components[1])
			return this._components[1];
}



/**
 * TextBox class constructor
 * Component that stored the name of the metaclass
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Metaclass
 * @extends TextBox
 */
var MetaclassItem = function( params ) {

  params = params || {};
  MetaclassItem.baseConstructor.call( this, params );
}
JSFun.extend( MetaclassItem, TextBox );



/**
 * Modify the text stored in the object. When the text is change, all elements of the
 * '_diagram' array of the Metaclass object that are of the same type than the name of
 * the metaclass, remove the stereotypes tags that have been created because of a
 * stereotype object(this stereotype object must be in the _stereotypes array of the metaclass).
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setText
 * @param {String} newText New text that will contain the object
 */
MetaclassItem.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {

		/*
			If the text has changed, it is called to the removeStereotype method
			and if this stereotype tag has been added to the node by existence of
			a stereotype object, the tag values and image associated
			to this stereotype tag are remove
		*/
		if(this._text != newText){
			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];

			for(var i in diagrams){
				nodes = diagrams[i]._nodes;

				for(var j=0;j<nodes.length;j++){
					if(nodes[j]._stereotypeProperties && this._parent){

						for(var k=0;k<this._parent._stereotypes.length;k++)
							nodes[j]._stereotypeProperties.removeStereotype(this._parent._stereotypes[k]);
					}
				}
			}
		}

		StereotypeTag.base.setText.call(this, newText);
  }
}


/**
 * Shows a dialog to modify the text of the component by the user
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 * @protected
 */


MetaclassItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var textField = document.createElement("input");
  var ok = document.createElement("input");


  div.className = "ud_popup";


  var sel;
  textField = document.createElement('select');

  sel = document.createElement('option');
  sel.setAttribute( 'value', 'Metaclass name' );
  sel.appendChild( document.createTextNode('none') );
  textField.appendChild( sel );

	for(var i=0; i<this._parent._validMetaclassApp.length; i++){

		sel = document.createElement('option');
		sel.setAttribute( 'value', this._parent._validMetaclassApp[i][0]);
		sel.appendChild( document.createTextNode(this._parent._validMetaclassApp[i][0]) );

		if(this._parent.getName() == this._parent._validMetaclassApp[i][1])
			sel.setAttribute('selected','selected');

		textField.appendChild( sel );
	}


  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

  this.changeText = function ( event ) {
    if( that.active ) {
      that.setText( that.encode( textField.value ) );
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }


  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);

  form.appendChild( textField );
  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

  textField.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}





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

	for(i=0;i<this._nodes.length;i++){
		if(this._nodes[i].getType() == 'UMLMetaclass')
			metaclass.push(this._nodes[i]);
	}

	var nodes;
	var found = false;

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

	if(!diagrams)
		return;

	var i;
	var stereotypes = [];

	for(i=0;i<this._nodes.length;i++){
		if(this._nodes[i].getType() == 'UMLStereotype')
			stereotypes.push(this._nodes[i]);
	}

	var nodes;
	var found = false;


	for(i=0;i<diagrams.length;i++){

		nodes = diagrams[i]._nodes;
		for(j=0;j<nodes.length;j++){

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

	diagrams = diagrams || [];
	acceptedElementsUML = acceptedElementsUML || [];

	ProfileDiagram.base.setXML.call(this,xml);

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

	if(diagram.getAttribute( 'visible' ) == "false")
		this._visible = false;

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

		}	else if(this._nodes[i].getType() == 'UMLStereotype'){

			/*
				If the node is a stereotype object, it is passed
  			the list of diagrams that has to be updated
				when a change is produced in the metaclass
			*/
			this._nodes[i].setDiagrams( diagrams );

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



/**
 * SrcItem class Constructor
 * Creates a 'item' that insert a route of a archive
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class SrcItem
 * @extends TextBox
 */
var SrcItem = function( params ) {

  params = params || {};
  SrcItem.baseConstructor.call( this, params );

  this._parse = /^path(?:\:\/([a-zA-Z\:\_\.\/\\0-9 ]*))?$/;

 this.setMinWidth( 50 );
}
JSFun.extend( SrcItem, TextBox );



/**
 * Encode the text of the resulting operation from its separate elements
 * and returns the encode operation with the corresponding symbols
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements of the operation
 * @return {String} Operation that represents
 */

SrcItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += 'path:/' + values[0];
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'no icon ';
  }
}



/**
 * Separates a string that contains a operation in its different
 * parts according to the regular expression that controls it
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method decode
 * @protected
 * @param {String} operation Operation in chain's text
 * @param {Array} Elements of the operation separated
 */

SrcItem.prototype.decode = function( operation ) {
  var result = this._parse.exec( operation );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Shows a dialog to modify the operation's elements by user
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 */


SrcItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var field = document.createElement("input");

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  div.className = "ud_popup";

  var values = this.decode( this.getValue() );


  field.setAttribute( 'type', 'text' );
  field.setAttribute( 'value', values[0] || '' );




  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      values.push( field.value );

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
      that.notifyDraw();
    }
  }

	this.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		  that.notifyDraw();
		}
	}


  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var label;
  var divaux;

  divaux = document.createElement( 'div' );
  label = document.createElement( 'label' );
  label.appendChild( document.createTextNode( 'Icon path (absolute path)' ) );

  divaux.appendChild( label );
  divaux.appendChild( field );

  form.appendChild( divaux );



  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
        that.notifyDraw();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

	field.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}


/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares
 * @update 19/11/2011
 *
 * @method setText
 * @param {String} newText New text that contains the object
 */
SrcItem.prototype.setText = function( newText ) {

  if( JSFun.isString( newText ) ) {



		var modifiedText = (this._text != newText) ? true : false;

    this._text = newText;

		/*
			If the text has changed, the figure of the object Stereotype
			(parent of the component) is removed, and is drawn
			the new figure
		*/
		if(modifiedText){

			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];
			for(var i in diagrams){
				nodes = diagrams[i]._nodes;
				for(var j=0;j<nodes.length;j++){
					if(nodes[j]._stereotypeProperties && this._parent){

						/*
							If the node has the same type than some of the metaclasses of the '_metaclass' array
							of the stereotype, the figure of the object Stereotype is updated
						*/

						if(this._parent._validMetaclass(nodes[j].getType())){
							nodes[j]._stereotypeProperties.removeFigure(this._parent);
							if(nodes[j]._stereotypeProperties._shownStereotype == '\xAB' + this._parent.getName() + '\xBB')
								nodes[j]._stereotypeProperties.drawStereotype(this._parent);
						}
					}
				}
			}
		}




    var len = (this._text.length > 20) ? 20 : this._text.length;

    if( newText == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( len * this.font_width );
      else
        this.setWidth( len * this.font_width );
    }

    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
  }
}


/**
 * Draw the text of component and your background if the interaction is produced with youself
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

SrcItem.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();

  if( this.active ) {
    context.fillStyle = "#ffc485";
    context.fillRect( this.getPixelX(),
                      this.getPixelY(),
                      this.getWidth(),
                      this.getHeight() );
  }

  context.restore();


  context.save();

  context.font = this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

	var text = this._text;
	if(!text)text="";

  if( text.length > 20 ) {
    text = text.substring(0, 17 );		//si es demasiado largo se ponen puntos suspensivos
    text += '...';
  }

  if(this._orientation){	//Vertical orientation of text

    context.translate(this._getMX() + this._line_height / 2, this._getMY() );
    context.rotate((-90 * Math.PI)/180 );
    context.fillText( text, this._margin*2 - this.getHeight(), 0 );
  } else {//horizontal orientation of text
    context.fillText( text, this._getMX(), this._getMY() + this._line_height / 2 );
  }

  context.restore();
}







/**
 * Stereotype class constructor, creates a Stereotype element of a profile diagram
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class Stereotype
 * @extends Rectangular
 * @param {Array} diagrams Array of diagrams that the application has
 *
 */

var Stereotype = function( params ){
	params = params || {};
	Stereotype.baseConstructor.call(this,params);

	this._metaclass = [];

	this.setDiagrams(params.diagrams || []);
}
JSFun.extend(Stereotype,Rectangular);



/**
 * Set the diagrams related with the Stereotype. When a change
 * is done to the Stereotype object, this change will be propagate to this diagrams
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Array} diagrams Array of diagrams that will be notified of changes in the Stereotype object
 */

Stereotype.prototype.setDiagrams = function( diagrams ){
	this._diagrams = diagrams;
}


/**
 * A relation is added to the node, this means that the node has started
 * to be part of a relationship and stores a reference to propagate changes
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */

Stereotype.prototype.addRelation = function( rel ) {

	Stereotype.base.addRelation.call(this,rel);
}



/**
 * Relation is removed from the node, the node has ceased
 * to be part of the relation and does not need to store more information
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delRelation
 * @param {Relation} rel Relation to be remove
 */

Stereotype.prototype.delRelation = function( rel ){
	Stereotype.base.delRelation.call(this,rel);

	rel._elemB.delStereotype(this);

	this.delMetaclass(rel._elemB);
}



/**
 * Removes the item and all items that relate to it and make no sense
 * without its existence as child nodes or relations to which it belongs
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method remove
 */
Stereotype.prototype.remove = function() {

	var rel = this._relations;

	for(var i=0;i<rel.length;i++)
		rel[i]._elemB.delStereotype(this);

	Stereotype.base.remove.call(this);
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Stereotype.prototype.setName = function( text ) {
	this._components[1].setValue( text);
}



/**
 * Adds new item to the attribute fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addTagValue
 * @param {String} text Text that will contain the new field of the component
 *
 */

Stereotype.prototype.addTagValue = function(text){
	var text = text || '';
	this._components[3].addField( text );
}


/**
 * Adds the route of the image associated to the object Stereotype
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method setPath
 * @param {String} text Text that will contain the route of the image
 *
 */

Stereotype.prototype.setPath = function(text){
	this._components[4].setValue( 'path:/' + text);
}



/**
 * Return the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getName
 * @return {String} name of the node
 *
 */
Stereotype.prototype.getName = function() {
 return	this._components[1].getValue();
}



/**
 * Return an array with all tag values associated to the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getTagValues
 * @return {Array} tag values contained in the node
 */

Stereotype.prototype.getTagValues = function() {

	var childs = this._components[3]._childs;
	var childsValues = [];

	for(var i=0;i<childs.length;i++)
		childsValues.push(childs[i].getValue());

	return childsValues;

}


/**
 * Return the image's route of the component that stored it.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getPath
 * @return {String} Image's route of the image associated to a Stereotype object
 */
Stereotype.prototype.getPath = function() {
 return	this._components[4].getValue().substring(5);
}



/**
 * Checks if a name of metaclass passed as parameter match with
 * the name of the some metaclass contained in the _metaclass array of the node
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method _validMetaclass
 * @return {Boolean} If the passed parameter match with the name of some metaclas of the 'metaclass' array
 */

Stereotype.prototype._validMetaclass = function( metaclass ) {
	for(var i=this._metaclass.length;i--;)
		if(this._metaclass[i].getName() == metaclass)
			return true;
	return false;
}

/**
 * It is removed the metaclass passed as parameter of the '_metaclass' array of the object(if exist inside of the array).
 * Also, it is removed all element UML contained in the array of the node's diagrams
 * that are of the type given by the name of the metaclass  to be removed
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method delMetaclass
 * @param {Metaclass} metaclass Metaclass to remove of the 'metaclass' array
 */

Stereotype.prototype.delMetaclass = function( metaclass ) {
  var i,j;

	/*
		remove all element UML contained in the array of the node's diagrams
		that are of the type given by the name of the metaclass to be removed
	*/
	for(i in this._diagrams){

		for(var j=0;j<this._diagrams[i]._nodes.length;j++)
			if(this._diagrams[i]._nodes[j].getType() == metaclass.getName() && this._diagrams[i]._nodes[j]._stereotypeProperties){
				this._diagrams[i]._nodes[j]._stereotypeProperties.removeStereotype(this);
			}
	}

  for( i in this._metaclass ) {
    if( this._metaclass[i] == metaclass ) {
      this._metaclass.splice( i, 1 );
      break;
    }
  }
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Stereotype.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * StereotypeNameItem class constructor, creates a component to the name of the a stereotype's object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class StereotypeNameItem
 * @extends StereotypeItem
 *
 */

var StereotypeNameItem = function( params ) {

  params = params || {};
  StereotypeNameItem.baseConstructor.call(this,params);
}
JSFun.extend(StereotypeNameItem,TextBox);




/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method setText
 * @param {String} newText New text that contains the object
 */
StereotypeNameItem.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {

		/*
			If the text has changed, it is called to the changeStereotype method of all nodes
			and if this stereotype tag has been added to the node by existence of
			a stereotype object, the stereotype tag modify your text
		*/

		if(this._text != newText){
			var diagrams = (this._parent) ? this._parent._diagrams : [];
			var nodes = [];
			for(var i in diagrams){
				nodes = diagrams[i]._nodes;
				for(var j=0;j<nodes.length;j++){
					if(nodes[j]._stereotypeProperties && this._parent){

						/*
							If the node has the same type than some of the metaclasses of the '_metaclass' array
							of the stereotype, the changeNameStereotype method is called
						*/

						if(this._parent._validMetaclass(nodes[j].getType()))
							nodes[j]._stereotypeProperties.changeNameStereotype(this._parent,'\xAB' + newText + '\xBB');
					}
				}
			}
		}

		StereotypeNameItem.base.setText.call(this, newText);
  }
}






/**
 * TagValueItem class Constructor
 * Creates a  'item' that controls a tag value to a stereotype object
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class TagValueItem
 * @extends TextBox
 */
var TagValueItem = function( params ) {

  params = params || {};
  TagValueItem.baseConstructor.call( this, params );

  var expression = '^([a-zA-Z_0-9]*)?(?:\:([a-zA-Z_0-9]*))?$';

  this._parse = new RegExp( expression );

  this.setMinWidth( 40 );
}
JSFun.extend( TagValueItem, TextBox );




/**
 * Encode the text of the resulting operation from its separate elements
 * and returns the encode operation with the corresponding symbols
 *
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements of the operation
 * @return {String} Operation that represents
 */

TagValueItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0];
  }
  if( values[1] ) {
    string +=  ':' + values[1];
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_attribute';
  }
}



/**
 * Separates a string that contains a operation in its different
 * parts according to the regular expression that controls it
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method decode
 * @protected
 * @param {String} operation Operation in chain's text
 * @param {Array} Elements of the operation separated
 */
TagValueItem.prototype.decode = function( attr ) {

  var result = this._parse.exec( attr );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}


/**
 * Returns the name of the tag value
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getNameTagValue
 */

TagValueItem.prototype.getNameTagValue = function(){
	return this.decode(this._text)[0];
}


/**
 * Returns the default value of the tag value
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method getDefaultValue
 */

TagValueItem.prototype.getDefaultValue = function(){
	return this.decode(this._text)[1];
}



/**
 * Shows a dialog to modify the tag value's elements by user
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method showDialog
 */

TagValueItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];
  var i;

  div.className = "ud_popup";

  for( i = 0; i < 2; i++ ){
    fields.push( document.createElement("input") );
  }


  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );


  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }


  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

	this.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		}
	}


  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var labels = [ 'tag value', 'default value' ];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }


  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );


  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



/**
 * Checks if the component has been pressed and performs the corresponding actions
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method select
 * @param {Number} x Coordinate x of where you clicked
 * @param {Number} y Coordenate y of where you clicked
 * @return {Boolean} If the point is over the tag value or some of its elements
 */

TagValueItem.prototype.select = function( x, y ) {
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;
  } else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;

  }

  return TagValueItem.base.select.call( this, x, y );

}



/**
 * Draws the shape of the tag value component, specifically
 * the buttons to move the tag values vertically
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
TagValueItem.prototype.drawShape = function( context ) {

  var x = this.getPixelX() + this.getSuperWidth() - 35;
  var y = this.getPixelY() + 3;

  context.save();

  context.fillStyle = "#0000aa";

  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + 10, y );
  context.lineTo( x + 5, y + 7 );
  context.closePath();
  context.fill();


  x = x + 10;
  context.beginPath();
  context.moveTo( x + 5, y );
  context.lineTo( x, y + 7 );
  context.lineTo( x + 10, y + 7 );
  context.closePath();
  context.fill();


  context.restore();
}


/**
 * TagValueFields Class Constructor.
 * Represents a set of tag value's fields with the restrictions UML for a element
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class TagValueFields
 * @extends CollapsibleFields
 */
var TagValueFields = function( params ) {
  params = params || {};
  TagValueFields.baseConstructor.call( this, params );

  this._default = params.text || 'new_attribute';
}
JSFun.extend( TagValueFields, CollapsibleFields );



/**
 * Defines the element's type that contains the super-component.
 * In this case, the object will be of type TagValueItem.
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @method newItem
 * @return {AttributeItem} New component's object
 */

TagValueFields.prototype.newItem = function() {
  return new TagValueItem({ text: this._default });
}








/**
 * Constructor de la clase UMLClassDiagram
 * Representa un diagrama de clases de UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLProfile
 * @extends ProfileDiagram
 */

var UMLProfile = function( params ) {
  var f = new ProfileDiagram( params );
  f.setType( 'UMLProfile' );
  f.setName( 'Profile' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLMetaclass', 'UMLExtension', 'UMLStereotype' ] );

  return f;
}






/**
 * UMLMetaclass class constructor
 * Represents a metaclass of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLMetaclass
 * @extends Metaclass
 */
var UMLMetaclass = function( params ) {
  var f = new Metaclass( params );
  f.setType( 'UMLMetaclass' );

  f.setMoveable();

  f.setWidth( 80 );
  f.setHeight( 30 );

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
	f.addComponent( new StereotypeItem({ id: 'stereotype', text: '\xABmetaclass\xBB' , selected: true, centered:true}) );
  f.addComponent( new MetaclassItem({ id: 'name', text: 'MetaClass name', centered: true, margin: 3 }) );

  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);

  return f;
}



/**
 * UMLStereotype class constructor
 * Represents a stereotype object of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLStereotype
 * @extends Stereotype
 */
var UMLStereotype = function( params ) {
  var f = new Stereotype( params );
  f.setType( 'UMLStereotype' );

  f.setWidth( 100 );
  f.setHeight( 40 );

  f.setMoveable();

  f.addFigure( new RectangleFigure({ color: '#c0e1c2' }) );
	f.addComponent( new StereotypeItem({ id: 'stereotype', text: '\xABstereotype\xBB' , selected: true, centered: true}) );
	f.addComponent( new StereotypeNameItem({ id: 'name', text: 'stereotype name', centered:true }) );
	f.addComponent( new Separator({ id: 'separator', centered: true}) );
  f.addComponent( new TagValueFields({ id: 'attributes', margin: 3 }) );
  f.addComponent( new SrcItem({ id: 'src', text: 'path:/', margin: 3 }) );

  f.setMenu([[function(){
		f.showStyleDialog({that: f});
		f.removeContextualMenu();},'Style']]);

  return f;
}


/**
 * UMLExtension class constructor
 * Represents a relatin of extension of UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/10/2011
 *
 * @class UMLExtension
 * @extends Extension
 */
var UMLExtension = function( params ) {
  var f = new Extension( params );
  f.setType( 'UMLExtension' );

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  f.setEnd( new CloseTip({color: '#000000'}) );

  return f;
}




/**
 * Alternative class constructor, creates a altenative block in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class Alternative
 * @extends SuperNode
 *
 */
var Alternative = function( params ) {

  params = params || {};
  Alternative.baseConstructor.call( this, params );
}
JSFun.extend( Alternative, SuperNode );



/**
 * Performs the actions necessaries when the user
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Alternative.prototype.drop = function( x, y ) {

	var i,j;

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }


    var rel = this._diagram._relations;
		var containedRel = [];
		var centralPointRel = [];
		var createMessages = [];

		/*
			if rel[i] is found on this node when click event is actived,
			and the containedRel[i]'s x central coordinate is found on this node
			when bottom is released, this is added to the containedRel array, and after,
			will be moved with the movement of the node.
		*/
    for( i=0; i< rel.length;i++){
			if(this.isOverBeforePosition(rel[i].getCentralPoint() ) && rel[i] instanceof Message){
				centralPointRel.push(rel[i].getCentralPoint());
				containedRel.push(rel[i]);
			}
		}

		/*
			Sorts the relations so that the messages with the distance between the y
			coordinate and the upper y limit lower are in the first array's position
		*/
		if(containedRel.length)
			containedRel = containedRel[0]._sortRelByDistanceToLimitY(containedRel);


    for( i=0; i< containedRel.length;i++){

			if(!containedRel[i]._moved){

				containedRel[i]._y = containedRel[i]._y +  (y - this._rely - this._prey);
				if(containedRel[i]._y < containedRel[i]._limitY)
					containedRel[i]._y = containedRel[i]._limitY;

				containedRel[i]._moved = true;

				containedRel[i]._calculateLineEnds(2);
			}
    }


    for( j=0; j< containedRel.length;j++){
			var descendant_messages = containedRel[j]._sortAscendant(containedRel[j].descendantMessages());
			for(i=0;i<descendant_messages.length;i++){

				descendant_messages[i]._moved = false;

				if(descendant_messages[i]._objA)
					descendant_messages[i]._objA.resetMovement();
				if(descendant_messages[i]._objB)
					descendant_messages[i]._objB.resetMovement();

				descendant_messages[i].notifyChange();
			}

		}

    for( i=0; i< containedRel.length;i++){
			containedRel[i].updateRelatedLifeline();
		}

		if(containedRel.length) {
			containedRel[0].updateDeleteMessages();
		}
	}

	Interaction.base.drop.call(this, x, y);

  var nodes = this._diagram._nodes;
  for( i=0; i< nodes.length; i++){
		if(nodes[i] instanceof Lifeline)
		  nodes[i].updateLength();
  }

  this._moved = false;
  this._resizing = false;
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Alternative.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Alternative.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Alternative.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Alternative.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Alternative.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Alternative.prototype.getNameAsComponent = function( ){
	return this._components[1];
}








/**
 * TimeInterval class constructor, creates a time interval element in a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @class TimeInterval
 * @extends Lifeline
 *
 */
var TimeInterval = function( params ) {
  params = params || {};
  TimeInterval.baseConstructor.call( this, params );

  this.setType( 'TimeInterval' );
  this.setMoveable();
  this.setWidth( 10 );
  this.setMinHeight( 30 );
	this.setHeight(params.height || 1);
  this.addFigure( new RectangleFigure({ color: '#ffffff', changeFigureColor: false }) );
}

JSFun.extend( TimeInterval, Rectangular );



/**
 * Performs the corresponding actions when the user drag
 * the time interval element.
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @class drag
 *
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
TimeInterval.prototype.drag = function( x, y ) {

  if( this._resizing ) {

    var height = y - this.getY();
    this.setHeight( height );
  }
}

/**
 * Perfoms the necessary actions when user releases the mouse's
 * buttom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of position
 * @param {Number} y Coordinate y of position
 */
TimeInterval.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }

		this.updatePosition();

		if( this._parent ) {
			this._parent.updateContainer();
		}

  } else if( this._resizing ) {

    this._message.notifyChange();

    this.notifyChange();
  } else if( this._selectedBefore ) {

    this.selectComponent( x, y );
  }

	this._message.updateDeleteMessages();

  this._moved = false;
  this._resizing = false;
}


/**
 * Assign to the node the related message
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method setMessage
 * @param {Node} newMessage Message to the node belongs
 */
TimeInterval.prototype.setMessage = function( newMessage ) {

  if( newMessage instanceof Message ) {
    this._message = newMessage;
  } else {
    this._message = null;
  }
}


/**
 * Return the x coordenate that coincides with the dashed line of the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method getLineX
 *
 * @param {Number}  mult value 1 or -1 to return the x coordinate of the rigth or left side of the node
 * @return {Number} x coordinate of left or right side of the node
 */
TimeInterval.prototype.getLineX = function(mult) {
  return this.getX() + this.getWidth()/2 + (mult * this.getWidth()/2) ;
}



/**
 * Updates height of the node according to the related messages
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method updateLength
 *
 */
TimeInterval.prototype.updateLength = function() {

  var i;
  var max = 0;
	var maxRel;
	var y;

  for( i in this._relations ) {


		if(this._relations[i]._elemA == this._relations[i]._elemB){
			y = this._relations[i].getY() + 100;
		} else {

			if ( this._relations[i]._elemB == this){

				var heightObjB = (this._relations[i]._objB == 0) ? 30 : 0;
				var y = this._relations[i].getY() + heightObjB;
			}	else { //if the message has like element A to this node

				var heightObjA = (this._relations[i]._objA == 0) ? 30 : 0;
				var y = this._relations[i].getY() + heightObjA;
			}
		}

    if( (this._relations[i] instanceof Message) && y > max ) {
      max = y;
			maxRel = this._relations[i];
    }
  }

	/*
		Updates the height of the node if necessary
	*/

	if(maxRel){
		max = max - this._y;
		this.setMinHeight( max );
	} else {
		this.setMinHeight( 30 );
	}
}

/**
 * Add a new relation ('rel' parameter) to the time interval, provided
 * the 'addedRelationAlready' parameter has a value different to 0. A value 0 of the
 * parameter is saw when the relation to add is a relation to self, and
 * this has already been added previously.
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @class addRelation
 * @param {Relation} rel relation that will be added to the time interval
 * @param {Number} addedRelationAlready Indicates if the relation has been added previously
 *
 */
TimeInterval.prototype.addRelation = function( rel, addedRelationAlready){

  var addedRelationAlready = (JSFun.isNumber( addedRelationAlready )) ? addedRelationAlready : 0;

	if(rel._elemA == this && rel._objA && (addedRelationAlready == 1 || addedRelationAlready == 0)){
		rel._objA.remove();
		rel._objA = 0;
	}

	if(rel._elemB == this && rel._objB && (addedRelationAlready == 2 || addedRelationAlready == 0)){
		rel._objB.remove();
		rel._objB = 0;
	}

	rel.updateLimitY();

  if(rel._y < rel._limitY)
		rel._y = rel._limitY;

	if(!addedRelationAlready)
	  Lifeline.base.addRelation.call( this, rel );

}


/**
 * Delete a relation ('rel' parameter) to the time interval, provided
 * the 'deletedRelationAlready' parameter has a value different to 0. A value 0 of the
 * parameter is saw when the relation to delete is a relation to self, and
 * this has already been deleted previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class delRelation
 * @param {Relation} rel relation that will be deleted of the time interval
 * @param {Number} deletedRelationAlready Indicates if the relation has been deleted of the time interval already
 *
 */

TimeInterval.prototype.delRelation = function( rel, deletedRelationAlready ) {

  var deletedRelationAlready = (JSFun.isNumber( deletedRelationAlready )) ? deletedRelationAlready : 0;

	if(rel._elemA == this && rel._objA == 0 && (deletedRelationAlready == 1 ||  deletedRelationAlready == 0)){

			rel.setObjA( new TimeInterval() );
			rel._objA.setDiagram(rel._diagram);
			rel._diagram._addNode(rel._objA);
	}

	if(rel._elemB == this && rel._objB == 0 && (deletedRelationAlready == 2 ||  deletedRelationAlready == 0)){

			rel.setObjB( new TimeInterval() );
			rel._objB.setDiagram(rel._diagram);
			rel._diagram._addNode(rel._objB);
	}

	rel._limitY = this._message._limitY;

  var nodes = this._diagram._nodes;
  for(var i=0; i<nodes.length; i++)
    if(nodes[i].getType() == 'UMLLifeline')
			nodes[i].updateLength();



	if(!deletedRelationAlready)
	  TimeInterval.base.delRelation.call( this, rel );

	this.updateLength();
}





/**
 * SequenceDiagram class constructor, creates a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class SequenceDiagram
 * @extends Diagram
 * @param {Number} x Coordenate x of the node's position
 * @param {Number} y Coordenate y of the node's position
 */
var SequenceDiagram = function( params ){
	SequenceDiagram.baseConstructor.call(this,params);
}
JSFun.extend(SequenceDiagram,Diagram);


/**
 * Adds a element of Node type to the nodes's list,
 * and updates this element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method addElement
 * @param {Node} newNode Node that will be added to the diagram
 */
SequenceDiagram.prototype._addNode = function( newNode ) {

  if( newNode instanceof Lifeline ) {

    newNode.setDiagram( this );
    newNode.updateLength();
  }
  SequenceDiagram.base._addNode.call( this, newNode );
}


/**
 * Add a element of Relation type to the relations's list,
 * and updates  this element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method _addRelation
 * @private
 * @param {Relation} newRelation Relación que se añade al diagrama
 */
SequenceDiagram.prototype._addRelation = function( newRelation ) {

  if( newRelation instanceof Message ) {

    newRelation.setDiagram( this );

		if(newRelation._elemA instanceof TimeInterval && newRelation._objA){
			newRelation._objA.remove();
			newRelation._objA = 0;
		}

		if(newRelation._elemB instanceof TimeInterval && newRelation._objB){
			newRelation._objB.remove();
			newRelation._objB = 0;
		}

    this._relations.push( newRelation );

		/*
			Updates the position of the new relation to avoid that the new message
			can be underneath a delete message
		*/
		newRelation.updateDeleteMessages();

    newRelation.notifyChange();
  } else{

		SequenceDiagram.base._addRelation.call( this, newRelation );
	}
}





/**
 * Check the hierarchy of elements within the diagram and the
 * relative position of the given element as parameter,
 * reassigning this in its proper position on parents and children
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method checkForParent
 * @param {Element} element Element to check hierarchy
 */
SequenceDiagram.prototype.checkForParent = function( element ) {

  if( (element instanceof Node) && !(element instanceof Lifeline) && !(element instanceof TimeInterval))
		SequenceDiagram.base.checkForParent.call( this, element );
}


/**
 * Generates a tree with all elements of diagram in xml format
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method getXML
 * @param {DOMNode} parent Node parent of xml tree
 * @return {DOMNode} Generated node with the full diagram
*/
SequenceDiagram.prototype.getXML = function( parent ) {
	return	SequenceDiagram.base.getXML.call( this, parent );
}




/**
 * Sorts the diagram's nodes by area, giving preference to
 * any element so that be drawn before a life line
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method _sortNodesByArea
 * @private
 */
SequenceDiagram.prototype._sortNodesByArea = function() {

  this._nodes.sort(
    function( a, b ) {
      var area1 = a.getArea();
      var area2 = b.getArea();

			/*
				Any lifeline is colocated in the first of te node's list,
				and so, this will be drawn in the last time
			*/
			if( (a.getType() == 'UMLLifeline'  &&  b.getType() != 'TimeInterval') ||
					(a.getType() != 'TimeInterval' &&  b.getType() == 'UMLLifeline')){
      	if(a.getType() == 'UMLLifeline')
					return -1;
				else
					return 1;
      } else{
				if( area1 < area2 )
					return -1;
				else if( area1 == area2 )
					return 0;
				else
					return 1;
			}

  });
}



/**
 * Adds a element to the list of nodes or relation according to your type,
 * without performs any check over your state or update about yourself
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method _addElementOnly
 * @private
 * @param {Element} elem New element of diagram
 */
SequenceDiagram.prototype._addElementOnly = function( elem ) {

  if( elem instanceof Node ) {
    elem.setDiagram( this );
    this._nodes.push( elem );

  } else if( elem instanceof Relation ) {
    elem._diagram = this;
    this._relations.push( elem );
  }
}




/**
 * Checks the validity of a chain and its correspondence with
 * an object accepted by the diagram, in which case instantiates and returns it
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method _instantiateObjectFromString
 * @private
 * @param {string} elemName Name of the element to instantiate
 * @return {Element} Instantiated element
*/
SequenceDiagram.prototype._instantiateObjectFromString = function( elemName, parent ) {
  if( JSFun.isString( elemName ) ) {

    parent = parent || null;

    var i;

    for( i in this._validElements ) {

      if( elemName == this._validElements[i] ) {

				/*
					If the correspondent object to the 'elemName' chain is an object that creates other objects every time that is instantiated,
					the object don't perform the creation of this objects in this moment, and later, this objects will be created. This is the case
					of any SuperNode element(as UMLAlternative) that creates its regions or any message that creates its time interval with your instance.
				*/
				if( elemName == 'UMLAlternative' || elemName == 'UMLCreate' || elemName == 'UMLDestroy' || elemName == 'UMLSendMessage' ||
					  elemName == 'UMLCallMessage' || elemName == 'UMLDeleteMessage' || elemName == 'UMLReplyMessage'){

					var setElementXml = true;
					return eval( 'new ' + this._validElements[i] + '({ setElementXml: ' + setElementXml + '})' );
				} else {

					/*
						If parent has a value different of null, means that the object to instantiate has as parent to a SuperNode, and so,
						is a Region of a SuperNode. This object requires a specific parameters that inform about:
							addComponent: the object's components aren't added yet
							parent: who is your parent
					*/
					if(parent)
						return (new window[this._validElements[i]]( { addComponent : false, parent: parent }) );
					else
						return eval( 'new ' + this._validElements[i] + '()' );
				}
			}
    }
  } else {
    return null;
  }
}



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

SequenceDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

SequenceDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}




/**
 * Message class constructor, creates a Message element in a sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class Message
 * @extends Relation
 * @param {Element} a first element of Message
 * @param {Element} b second element of the Message
 * @param {Number} y : y coordinate of the Message element
 */

var Message = function( params ) {
  params = params || {};

  this._y = params.y || 0;
  this._limitY = 0;

  this._objA = null;
  this._objB = null;

  Message.baseConstructor.call( this, params );
}
JSFun.extend( Message, Relation );


/**
 * Return a xml node with information about the message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getElementXML
 * @param  {DOMNode} parent: parent of Message element
 * @return {DOMNode} xml node with information about the object
 */
Message.prototype.getElementXML = function( parent ) {

  var xmlnode = Message.base.getElementXML.call( this, parent );

  xmlnode.setAttribute( 'y', this._y );

	/*
		If the object A of the message exists, is saved your id,
		in other case is saved null or 0, depending on whether
		the message hasn't a object A or this has been deleted
		because one of its elements (A or B element) is a time interval
	*/
  if( this._objA ){
	  xmlnode.setAttribute( 'a', this._objA.getId() );
  } else {
	  xmlnode.setAttribute( 'a', this._objA );
	}

  if( this._objB ){
	  xmlnode.setAttribute( 'b', this._objB.getId() );
  } else {
	  xmlnode.setAttribute( 'b', this._objB );
	}

  return xmlnode;
}


/**
 * A xml node is received with the node information and such information is retrieved
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setElementXML
 * @param  {DOMNode} xmlnode xml node with the information about the Message element
 * @param  {array} ids Vector with the references to the objects of the diagram
 */

Message.prototype.setElementXML = function( xmlnode, ids ) {

  Message.base.setElementXML.call( this, xmlnode, ids );

  this._y = parseInt( xmlnode.getAttribute( 'y' ) );

  var idObjA = xmlnode.getAttribute( 'a' );
  var idObjB = xmlnode.getAttribute( 'b' );


	/*
		If idObjA/idObjBB don't represent the object's id, and is number
	  or a null value, this is passed to your correct type.
		For this, first idObjA/idObjB is tried to convert a number, if
		it isn't possible, means that idObjA/idObjB has a null value
	*/

	var numA = parseInt(idObjA);
	if(JSFun.isNumber(numA))
		idObjA = numA;
	else if(idObjA == 'null')
		idObjA = null;


	var numB = parseInt(idObjB);
	if(JSFun.isNumber(numB))
		idObjB = numB;
	else if(idObjB == 'null')
		idObjB = null;

	/*
		Once that the idObjA and idObjB is passed to your correct format,
		the value of the message's objects is set
	*/

  if( idObjA ) {
	  this.setObjA( ids[ idObjA ] );
  } else {
		this._objA = idObjA;
	}

  if( idObjB ) {
	  this.setObjB( ids[ idObjB ] );
  } else {
		this._objB = idObjB;
	}
}



/**
 * Defines the elements of the relation.
 * It is used when indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the new elements has been performed rightly
 */

Message.prototype.setElements = function( elemA, elemB ) {

  this._points[0] = new Point();
  this._points[1] = new Point();


  if( elemA instanceof Element && elemB instanceof Element ) {

    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }

		/*
			A and B elements of the message are deleted. If is a message to self,
			only can be deleted one of its elements, since both are the same.
		*/

    if( this._elemA && this._elemA != this._elemB ) {
      this._elemA.delRelation( this );
    }
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }

    this._elemA = elemA;
    this._elemB = elemB;

    this._elemA.addRelation( this );

		if(elemA != elemB)
    	this._elemB.addRelation( this );
		else
	    this._elemB.addRelation( this,2 );

    this.updateParent();
    this._calculateLineEnds();

    return true;

  } else {
    return false;
  }
}



/**
 * Set the A element of the Message.
 *
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 */
Message.prototype.setElementA = function( elem ) {

  if( elem && (elem.getType() == 'UMLLifeline' || elem.getType() == 'TimeInterval')) {

    if( elem instanceof Relation && this._elemB instanceof Relation ) {
      return false;
    }

		/*
			If the before element A of the message is same to the elememt B,
			it must avoid delete the relation of the element(it is got via the
			second parameter of the 'delRelation' method of the 'else' condition)
		*/
    if( this._elemA ) {
			if(this._elemA != this._elemB)
	      this._elemA.delRelation( this );
			else
	      this._elemA.delRelation( this,1 );
    }

    this._elemA = elem;

		/*
			If is a message to self, then can't be added because this message
			has been added previously. In the else condition, the second parameter
			avoids that the element be added by second time.
		*/
		if(this._elemA != this._elemB)
	    this._elemA.addRelation( this );
		else
	    this._elemA.addRelation( this,1 );
    this.updateParent();

    return true;
  } else {
    return false;
  }
}


/**
 * Set the B element of the Message
 *
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method setElementB
 * @param {Element} elem Second element of the message
 */


Message.prototype.setElementB = function( elem ) {

  if( elem && (elem.getType() == 'UMLLifeline' || elem.getType() == 'TimeInterval') ) {

    if( elem instanceof Relation && this._elemA instanceof Relation ) {
      return false;
    }

		/*
			If the before element B of the message is same to the elememt A,
			it must avoid delete the relation of the element(it is got via the
			second parameter of the 'delRelation' method of the 'else' condition)
		*/

    if( this._elemB ) {
			if(this._elemA != this._elemB)
	      this._elemB.delRelation( this );
			else
	      this._elemB.delRelation( this, 2 );
    }

    this._elemB = elem;

		/*
			If is a message to self, then can't be added because this message
			has been added previously. In the else condition, the second parameter
			avoids that the element be added by second time.
		*/

		if(this._elemA != this._elemB)
	    this._elemB.addRelation( this );
		else
	    this._elemB.addRelation( this, 2);

    this.updateParent();

    return true;
  } else {
    return false;
  }
}

/**
 * Set the upper limit of the Message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setLimitY
 * @param  {number} y Coordinate y of the Message
 */
Message.prototype.setLimitY = function( y ){
  this._limitY = y;
}


/**
 * Return the y coordinate of the Message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getY
 * @return {number} y Coordinate y of the Message
 */
Message.prototype.getY = function() {
  return this._y;
}


/**
 * Check if the given point is over some element of Message, and in right case,
 * the Message is selected to interact with the user.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method select
 * @param {Number} x  Coordinate x of point to check
 * @param {Number} y  Coordinate y of point to check
 * @return {Boolean} if the point is over any element.
 */
Message.prototype.select = function( x, y ) {
  this._deselectComponent();

  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedPoint = true;
      return true;
    }
  }


  if( this._selected > -1 ) {
    if( this._isOverComponent( x, y ) ) {
      this._selectedBefore = true;
      return true;
    }
  }


  for( var i = 0; i < this._points.length - 1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y ) ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedLine = true;

			if(this._elemA == this._elemB)
				this._movementLine = y - this._points[0]._y;

      return true;
    }
  }

  return false;
}


/**
 * Perfom the neccesary actions to get a mouse movement
 * to the given position by the x,y attributes
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
Message.prototype.drag = function( x, y ) {
  if( this._selectedLine ) {

    var i;

		/*
			If the line is a message to self and this message is drag from another point
			than the 0 point, the new position of y has to take in account the movement
			from the y coordinate(passed like parameter) to the 0 point
		*/

		if(this._elemA == this._elemB)
	 		y -= this._movementLine;

    if( y > this._limitY ) {
      this._y = y;
    } else {
      this._y = this._limitY;
    }

    this._moved = true;

  } else if( this._selectedPoint ) {

    this._points[ this._selected ].setX( x );

    this._moved = true;
  }
}


/**
 * Performs the actions necessaries when the user
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Message.prototype.drop = function( x, y ) {
  if( this._moved ) {
    this._checkForNewNodes( x, y );
  } else if( this._selectedBefore ) {
    this._selectComponent( x, y );
  }

  this._selectedLine = false;
  this._selectedPoint = false;

  this._delUselessPoints();
  this.notifyChange();

	this.updateDeleteMessages();

	this.updateRelatedLifeline();

  this._moved = false;
}


/**
 * Update the position of life lines that are the B elements of create
 * messages contained into the descendant time intervals of the current message
 *
 * @author Rafael Molina Linars
 * @update 3/10/2011
 *
 * @method _updateRelatedLifeline
 * @private
 *
 */

Message.prototype.updateRelatedLifeline = function(){

	var descendant_messages = this.descendantMessages();
	for(var i=0;i<descendant_messages.length;i++){
		if(descendant_messages[i] instanceof CreateMessage)
			descendant_messages[i]._elemB.updatePosition();
	}
}

/**
 * Check if there is a consistent element at the point
 * indicated and if so adds to the relation after removal of old item
 *
 * @author Rafael Molina Linars
 * @update 21/09/2011
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of posible point
 * @param {Number} y Coordinate y of posible point
 */
Message.prototype._checkForNewNodes = function( x, y ) {

  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

    var newElem = this._diagram.reassignRelationTo( this, x, y );

    if( newElem != this && newElem != this._objA && newElem != this._objB  ) {

      if( this._selected == 0 ) {
        this.setElementA( newElem );
      } else {
        this.setElementB( newElem );
      }
    }
  }
}


/**
 * Updates the position of the delete message(if is necessary) so that
 * there aren't any message below a delete message
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method checkPositionMessages
 */

Message.prototype.updateDeleteMessages = function(){

	var i = 0;
	var lifelines = [];
	if(this._diagram){
		var nodes = this._diagram._nodes;
	}
	else var nodes=[];

	for(i= nodes.length; i--;)
		if((nodes[i] instanceof Lifeline))
			lifelines.push(nodes[i]);

	/*
		Sort the lifelines according to the delete attribute so that
		the life lines that have its delete message with a lower y coordinate
		are updated before
	*/
	lifelines.sort(
    function( a, b ) {
      var delete1 = a.getDelete();
      var delete2 = b.getDelete();

      if( delete1 < delete2 )
        return -1;
      else if( delete1 == delete2 )
        return 0;
      else
        return 1;
  });

	for(i=0;i< lifelines.length;i++)
			lifelines[i].updateDelete();
}


/**
 * Calculates the final points of the Message are in contact with the nodes
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _calculateLineEnds
 * @private
 * @param {Number} updateObj If the objects are updated and the final points of the related messages of the message are calculated
 */

Message.prototype._calculateLineEnds = function( updateObj ) {

	var updateObj = (updateObj == false || updateObj == 0 || updateObj) ? updateObj : 1;

	var i;



  if( !this._selectedPoint && this._elemA && this._elemB ) {

    if( (this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle)) )
	  this._y = this._elemA.getY() + this._heightSmallRectangle;

		var that = this;

		/*
			This function called to the getLineX method of different way according to
			whether the element that calls to the method is a TimeInterval object or
			Lifeline object. If the element is a TimeInterval, the method is called with
			a parameter between its arguments. If the parameter has a value of 1, it means
			that the element has a lower x coordinate that the another element of the
			message, and then,the contact point between the message and the element must
			be the right side of the element. If the value is 0, the element has a higher
			x coordinate, and the contact point must be the left side of the element
		*/
		var getLineXAlternative = function( elem ){
			if(elem instanceof Lifeline)
				return elem.getLineX();
			else if(elem instanceof TimeInterval){
				if(elem == that._elemA){

					if(elem._x > that._elemB._x){
						return elem.getLineX(-1);
					}	else {
						return elem.getLineX(1);
					}
				} else {

					if(elem._x > that._elemA._x){
						return elem.getLineX(-1);
					} else{
						return elem.getLineX(1);
					}
				}
			}
		}

		if(updateObj == 1){
			this.updateLimitY();
			if(this._y < this._limitY)
				this._y = this._limitY;
		}

    if(this._elemA == this._elemB){

	    var  height = (this._objA) ? (this._objA.getHeight() + 20) : 50;

	    this._points[0].setPoint( getLineXAlternative(this._elemA), this._y );
	    this._points[1] = new Point( getLineXAlternative(this._elemB) + 50, this._y );
	    this._points[2] = new Point( getLineXAlternative(this._elemB) + 50, this._y + height);
	    this._points[3]= new Point( getLineXAlternative(this._elemB) , this._y + height);

    }
    else {

	    this._points[0].setPoint( getLineXAlternative(this._elemA), this._y );
	    this._points[1].setPoint( getLineXAlternative(this._elemB), this._y );

			while(this._points[2])
				this._points.pop();
    }

		if(updateObj){

	    this.updateObjects();

			var heightUpdate;
			var rel = [];

			if(updateObj == 1)
				this._moved = true;

			if(this._objA || (this._elemA instanceof TimeInterval && this._objB) ){

				var relObjA = [];
				var objA = (this._objA) ? this._objA : this._elemA;

				if(this._objA){
					relObjA = objA._relations;
				}	else {
					for(var j=0;j<this._elemA._relations.length;j++)
						if(this._elemA._relations[j]._elemA == this._elemA._relations[j]._elemB)
							relObjA.push(this._elemA._relations[j]);
				}

				for(i=0; i < relObjA.length; i++){

					if(!relObjA[i]._moved){

						if(this._objA)
							heightUpdate = (this._objA._y - this._objA._prey)
						else{
							heightUpdate = (this._objB) ? (this._objB._y - this._objB._prey) : 0;
						}
						relObjA[i]._y = relObjA[i]._y + heightUpdate;

						relObjA[i]._moved = true;

						relObjA[i]._calculateLineEnds((!updateObj) ? updateObj : 2);
						relObjA[i]._updateComponents();
					}
				}
			}

			if(this._objB || (this._elemB instanceof TimeInterval && this._objA) ){

				var relObjB = [];
				var objB = (this._objB) ? this._objB : this._elemB;

				if(this._objB){
					relObjB = objB._relations;
				}	else {

					for(var j=0;j<this._elemB._relations.length;j++)
						if(this._elemB._relations[j]._elemA == this._elemB._relations[j]._elemB)
							relObjB.push(this._elemB._relations[j]);
				}


				for(i=0; i < relObjB.length; i++){
					if(!relObjB[i]._moved){

						if(this._objB)
							heightUpdate = (this._objB) ? (this._objB._y - this._objB._prey) : (this._objA._y - this._objA._prey);
						else
							heightUpdate = (this._objA) ? (this._objA._y - this._objA._prey) : 0;

						relObjB[i]._y = relObjB[i]._y + heightUpdate;

						relObjB[i]._moved = true;

						relObjB[i]._calculateLineEnds((!updateObj) ? updateObj : 2);
						relObjB[i]._updateComponents();
					}
				}
			}

			if(updateObj != 2){
				if(this._objA)
					this._objA.resetMovement();
				if(this._objB)
					this._objB.resetMovement();

				var descendant_messages = this._sortAscendant(this.descendantMessages());
				for(i=0;i<descendant_messages.length;i++){

					descendant_messages[i]._moved = false;

					if(descendant_messages[i]._objA)
						descendant_messages[i]._objA.resetMovement();
					if(descendant_messages[i]._objB)
						descendant_messages[i]._objB.resetMovement();

					descendant_messages[i].updateLimitY();
					if(descendant_messages[i]._y < descendant_messages[i]._limitY){
						descendant_messages[i]._y = descendant_messages[i]._limitY;
						descendant_messages[i]._calculateLineEnds();
					}
				}
			}
		}
  }
}


/**
 * Searchs all descendant messages of the current message and stores
 * them in an array that will be returned
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantMessages
 * @return {Array} An array with the descendant messages of the message(included this message)
 */
Message.prototype.descendantMessages = function ( descendant_messages) {

	var descendant_messages =  descendant_messages || [];
	var i;

	if(!this.foundInArray(descendant_messages))
	descendant_messages.push(this);

	if(this._objA){

		for( i=0;i<this._objA._relations.length;i++)
			descendant_messages = this._objA._relations[i].descendantMessages(descendant_messages);
	} else if(this._elemA && this._objB){

		for( i=0;i<this._elemA._relations.length;i++)
			if(this._elemA._relations[i]._elemA == this._elemA._relations[i]._elemB)
				descendant_messages = this._elemA._relations[i].descendantMessages(descendant_messages);
	}

	if(this._objB){

		for( i=0;i<this._objB._relations.length;i++)
			descendant_messages = this._objB._relations[i].descendantMessages(descendant_messages);
	} else if(this._elemB && this._objA) {

		for( i=0;i<this._elemB._relations.length;i++)
			if(this._elemB._relations[i]._elemA == this._elemB._relations[i]._elemB)
				descendant_messages = this._elemB._relations[i].descendantMessages(descendant_messages);
	}

	return descendant_messages;
}



/**
 * Sorts an array of relations according to the create messages that contains
 *
 *
 * @author Rafael Molina Linares
 * @update 4/10/2011
 *
 * @method _sortRelByCreateMessages
 * @param {Array} rel Array of relations that will be sorted
 * @param {Number} numSort Sort type to performs.  If numSort =-1 create messages are colocated in the first positions of array.
 *																								 If numSort = 1 create messages are colocated in the last positions of array.
 *
 */
Message.prototype._sortRelByCreateMessages = function(rel,numSort){

	if(!(numSort == 1 || numSort == -1))
		return rel;

	rel.sort(
		function( a, b ) {

			if(a instanceof CreateMessage && b instanceof CreateMessage ){
				if(a._y > b._y)
					return -1;
				else
					return 1;
			}	else if (a instanceof CreateMessage && !(b instanceof CreateMessage )){
				return numSort;
			}	else if ( !(a instanceof CreateMessage ) && b instanceof CreateMessage){
				return -numSort;
			} else {
				return 0;
			}
	});

	return rel;
}

/**
 * Sorts an array of relations according to the distance between the y
 * coordinate and the limitY of the relation(in descendant orden)
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _sortRelByDistanceToLimitY
 * @param {Array} rel Array of relations that will be sorted
 *
 */
Message.prototype._sortRelByDistanceToLimitY = function(rel){

	rel.sort(
		function( a, b ) {

			var distanceA = a._y - a._limitY;
			var distanceB = b._y - b._limitY;

			if(distanceA > distanceB)
				return -1;
			else if(distanceA < distanceB)
				return 1;
			else
				return 0;
		});
	return rel;
}

/**
 * Sorts an array from lowest to highest value of the y coordinate
 *
 *
 * @author Rafael Molina Linares
 * @update 4/10/2011
 *
 * @method _sortAscendant
 * @param {Array} rel Array of relations that will be sorted
 *
 *
 */
Message.prototype._sortAscendant = function(rel){

	rel.sort(
		function( a, b ) {

				if(a._y > b._y)
					return 1;
				else if(a._y < b._y)
					return -1;
				else
					return 0;
		});
	return rel;
}

/**
 * Updates the y limit of relations taking the maximum y between both elements(elemA/B)
 *
 *
 * @author Rafael Molina Linares
 * @update 29/09/2011
 *
 * @method updateLimitY
 *
 */
Message.prototype.updateLimitY = function (){

	var y_elemA = 0;
	var y_elemB = 0;


	if(this._elemA){
		y_elemA = (this._elemA instanceof Lifeline) ? (this._elemA.getY() + this._elemA._heightSmallRectangle + 5) : (this._elemA.getY() + 5);
	}
	if(this._elemB){
		y_elemB = (this._elemB instanceof Lifeline) ? (this._elemB.getY() + this._elemB._heightSmallRectangle + 5) : (this._elemB.getY() + 5);
	}

	if(y_elemA > y_elemB || this instanceof CreateMessage)
		this.setLimitY(y_elemA);
	else
		this.setLimitY(y_elemB);
}



/**
 * Searchs a match between some item of the array and the 'this' message
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method foundInArray
 * @return {Boolean} If the message is inside array
 */
Message.prototype.foundInArray = function (array){

	for(var i=array.length; i--; ){
		if(array[i] == this)
			return true;
	}
	return false;
}



/**
 * Notify to the object Message that a change has
 * been produced over some of your components o nodes
 *
 * @author Rafael Molina Linares
 * @update 21/09/2011
 *
 * @method notifyChange
 */
Message.prototype.notifyChange = function( ) {

  var i;
  var nodes = (this._elemA._diagram) ? this._elemA._diagram._nodes : [];

  Message.base.notifyChange.call( this );

	for(i=0; i< nodes.length; i++){

		/*
			The length of the a node os the diagram is updated if
			the node is a life line that not has the 'delete' attribute
			to true, if the node is a time interval or if the lifeline
			has the 'delete' attribute to true, but the lifeline match
			with the elemA or elemB of the 'this' message.
		*/
		if( ((nodes[i].getType() == 'UMLLifeline') && !(nodes[i]._delete) ) ||
				((nodes[i].getType() == 'UMLLifeline') && (nodes[i]._delete) && ((nodes[i] == this._elemA) || (nodes[i] == this._elemB)) ) ||
				(nodes[i].getType() == 'TimeInterval') ){
			 nodes[i].updateLength();
		}
	}
}



/**
 * Remove the Message and all elements that are
 * meaningless without the existence of this.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method remove
 *
 */
Message.prototype.remove = function() {

  Message.base.remove.call( this );

  if( this instanceof DeleteMessage ) {
	this._elemB.setDelete( 0 );
  }

  if( this._objA ) {
    this._objA.remove();
  }

  if( this._objB ) {
    this._objB.remove();
  }

  this.notifyChange();
}



/**
 * Set the object found under the first point of Message
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setObjA
 * @param {TimeInterval} obj object of the first point of Message
 */

Message.prototype.setObjA = function( obj ) {
  this._objA = obj;

  this._objA.setMessage(this);

  this.updateObjects();
}


/**
 * Set the object found under the second point of Message
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setObjB
 * @param {TimeInterval} obj object of the second point of Message
 */
Message.prototype.setObjB = function( obj ) {
  this._objB = obj;

  this._objB.setMessage(this);

  this.updateObjects();
}


/**
 * Check a reference to the diagram that it belongs
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method setDiagram
 * @param {Diagram} dia diagram to which the Message belongs
 */

Message.prototype.setDiagram = function( dia ) {

  Message.base.setDiagram.call( this, dia );

  if( this._objA )
    dia._addNode( this._objA );

  if( this._objB )
    dia._addNode( this._objB );
}


/**
 * Update the positions of the objects
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method updateObjects
 *
 */
Message.prototype.updateObjects = function() {

  if( this._objA ) {
    this._objA.setPosition( this._points[0].getX() - this._objA.getWidth()/2, this._points[0].getY() );
  }

  if( this._objB ) {

    if( this._elemA == this._elemB){
			this._objB.setPosition( this._points[3].getX() - this._objB.getWidth()/2, this._points[3].getY() );
    } else {
			this._objB.setPosition( this._points[1].getX() - this._objB.getWidth()/2, this._points[1].getY() );
    }
  }
}


/**
 * Resets the prex/prey atributtes of message's objects
 *
 *
 * @author Rafael Molina Linares
 * @update 27/09/2011
 *
 * @method resetMovementObjects
 *
 */
Message.prototype.resetMovementObjects = function() {

	if(this._objA)
		this._objA.resetMovement();
	if(this._objB)
		this._objB.resetMovement();
}



/**
 * Set the components of the Message
 *
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method _updateComponents
 *
 */
Message.prototype._updateComponents = function() {

  if( ! ( this._elemA && this._elemB ) ) {
    return;
  }

  var ax = this._points[0].getX();
  var ay = this._points[0].getY();
  var bx = this._points[1].getX();
  var by = this._points[1].getY();

  if(this._elemA == this._elemB && this._points.length == 4){
	  bx = this._points[2].getX();
	  by = this._points[2].getY();
  }

  var cx = (ax + bx ) / 2 ;
  var cy = (ay + by ) / 2 ;

  if( this._name ) {
    if(this._elemA == this._elemB){
      this._name.setCoordinates( bx, cy - this._name.getHeight()/2 );
    } else {
			this._name.setCoordinates( cx - this._name.getWidth() / 2, cy - this._name.getHeight() );
    }
  }

  if( this._stereotype ) {

    if( this._name ) {
			if(this._elemA == this._elemB){
      	this._stereotype.setCoordinates( bx, cy - this._stereotype.getHeight() - this._name.getHeight()/2 );
			} else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth()/2, cy - this._stereotype.getHeight() - this._name.getHeight() );
			}
    } else {
			if(this._elemA == this._elemB){
      	this._stereotype.setCoordinates( bx, cy - (this._stereotype.getHeight())/2 );
			} else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth()/2, cy - this._stereotype.getHeight() );
			}
    }

    if( this._stereotype instanceof SuperComponent ) {
      this._stereotype.updateComponents();
    }
  }
}


/**
 * It's draw the line of relation
 *
 * @author Rafael Molina Linares
 * @update 20/09/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of draw
 */
Message.prototype.drawShape = function( context ) {
  if( !( this._selectedPoint && this._selected == 0 || this._selected == this._points.length -1 ) ) {
    this._calculateLineEnds(0);
  }

  context.save();
  context.lineWidth = 2;
  context.strokeStyle = RelationStyle.shape_color;

  context.beginPath();
  context.moveTo( this._points[0].pixelX(), this._points[0].pixelY() );

  var i;
  for( var i = 1; i < this._points.length; i++ ) {
    context.lineTo( this._points[i].pixelX(), this._points[i].pixelY() );
  }

  context.stroke();
  context.restore();
}

/**
 * Get the object found under the first point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getObjA
 * @return {Element} object of the first point of Message
 */

Message.prototype.getObjA = function() {
  return this._objA;
}




/**
 * Get the object found under the second point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getObjB
 * @param {Element} object of the second point of Message
 */

Message.prototype.getObjB = function() {
  return this._objB;
}


/**
 * CallMessage class constructor, creates a call message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class CallMessage
 * @extends Relation
 *
 */

var CallMessage = function( params ) {

  params = params || {};
  CallMessage.baseConstructor.call(this,params);
}
JSFun.extend(CallMessage,Message);

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

CallMessage.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
CallMessage.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

CallMessage.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
CallMessage.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
CallMessage.prototype.getNameAsComponent = function( ){
	return this._components[1];
}





/**
 * Create Message class constructor, creates a create message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class CreateMessage
 * @extends Message
 *
 */
var CreateMessage = function( params ) {

  params = params || {};
  CreateMessage.baseConstructor.call( this, params );
}
JSFun.extend( CreateMessage, Message );


/**
 * A xml node is received with the node information and such information is retrieved
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class setElementXML
 * @param  {DOMNode} xmlnode Xml node with the information about the Message element
 * @param  {array} ids Vector with the references to the objects of the diagram
 */
CreateMessage.prototype.setElementXML = function( xmlnode, ids ) {

  CreateMessage.base.setElementXML.call( this, xmlnode, ids );

  this._elemB.setCreate(this._y);

	this._elemA.updatePosition();
	this._elemB.updatePosition();
}



/**
 * Defines the elements related with the relation.
 * This method is used when the elements hasn't been indicated in the constructor.
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the new elements have been asigned to the relation
 */

CreateMessage.prototype.setElements = function( elemA, elemB ) {

  CreateMessage.base.setElements.call( this, elemA, elemB )

	var i;

	if(this._elemB)
		this._elemB.updatePosition();

	var createMessages = this.descendantsCreateMessages();
	for(i=0;i<createMessages.length;i++)
		createMessages[i].updatePosition();
}


/**
 * Removes the create message and all related elements that
 * make no sense without its existence
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drag
 * @param {Number} x Coordinate of the new position
 * @param {Number} y Coordinate of the new position
 */


CreateMessage.prototype.remove = function() {

  CreateMessage.base.remove.call( this );

  this._elemB.setPosition(this._elemB.getX() , 70);

  this._elemB.updatePosition();

  this._elemB.setCreate( 0 );

  if( this._elemA ) {
    this._elemA.updateLength();
  }

  if( this._elemB ) {
    this._elemB.updateLength();
  }

	var rel = this._elemB._relations;
  for(var i=0;i< rel.length;i++){
		if( rel[i]._elemA._y > rel[i]._elemB._y || rel[i] instanceof CreateMessage)
			rel[i].setLimitY(rel[i]._elemA.getY() + rel[i]._elemA._heightSmallRectangle + 5);
		else
			rel[i].setLimitY(rel[i]._elemB.getY() + rel[i]._elemB._heightSmallRectangle + 5);
  }
}



/**
 * Performs the actions necessaries when the user
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

CreateMessage.prototype.drop = function( x, y ) {

  CreateMessage.base.drop.call(this, x, y);

  this._elemB.updatePosition();

	var createMessages = this.descendantsCreateMessages();
	for(var i=0;i<createMessages.length;i++)
		createMessages[i].updatePosition();

}





/**
 * Calculates the final points of the create message, so such the final
 * of messages related with the create message
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method _calculateLineEnds
 * @private
 * @param {Number} updateObj If the final points of the related messages of the create message are calculated
 *															- 0: the final points of the related messages aren't updated by the _calculateLineEnds method call
 *															- 1: the finals points of the related messages(so such the objects's movement and the y limit of the message) are updated
 *															- 2: the finals points of the related messages are updated
 */


CreateMessage.prototype._calculateLineEnds = function( updateObj ) {

	var updateObj = (updateObj == 0 || updateObj) ? updateObj : 1;

	var relObjA;
	var relObjB;

  if( !(!this._selectedPoint && this._elemA && this._elemB) || this._elemA == this._elemB)
		return;

  var rel = this._sortRelByCreateMessages(this._elemB._relations,1);
	var createMessages = [];
	var i,j,k;

  if( (this._y >= this._elemA.getY()) && (this._y <= (this._elemA.getY() + this._heightSmallRectangle)) )
	  this._y = this._elemA.getY() + this._heightSmallRectangle;

	if(updateObj == 1){
		this.updateLimitY();
		if(this._y < this._limitY)
			this._y = this._limitY;
	}

  this._points[0].setPoint( this._elemA.getLineX((this._elemA._x > this._elemB._x) ? -1 : 1), this._y );

  if(this._elemB.getX() > this._elemA.getX())
		this._points[1].setPoint( this._elemB.getX(), this._y );
  else
		this._points[1].setPoint( this._elemB.getX() + this._elemB.getWidth(), this._y );


	this._elemB._y = this._y - this._elemB._heightSmallRectangle/2;


	if(updateObj){

		if(updateObj == 1)
			this._moved = true;

		for(i=0;i<rel.length;i++){

			if( !rel[i]._moved ){

				rel[i]._y = rel[i]._y + this._y - this._elemB.getCreate();

				rel[i].setLimitY(this._y + this._elemB._heightSmallRectangle/2 + 5);
				if(rel[i]._limitY > rel[i]._y)
					rel[i]._y = rel[i]._limitY;

				rel[i]._moved = true;

				rel[i]._calculateLineEnds((!updateObj) ? updateObj : 2);
				rel[i]._updateComponents();

				if(rel[i] instanceof DeleteMessage)
					rel[i]._elemB.setDelete(rel[i]._y);
			}
		}

		this._elemB.setCreate(this._y);


		if(this._elemB.getCreate() != 0){

			for(i=0;i<rel.length;i++){
				if(rel[i]._y < this._elemB.getCreate()  && !(rel[i]._elemA instanceof TimeInterval) && !(rel[i]._elemB instanceof TimeInterval)){

					var y = rel[i]._y;

					rel[i]._points[0].setY( y + this._elemB.getCreate() - this._elemA.getY() );
					rel[i]._points[1].setY( y + this._elemB.getCreate() - this._elemA.getY() );
					rel[i]._y = y + this._elemB.getCreate() - this._elemA.getY();

					rel[i].setLimitY(this._y + this._elemB._heightSmallRectangle/2 + 5 );
					if(rel[i]._limitY > rel[i]._y)
						rel[i]._y = rel[i]._limitY;

					rel[i]._updateComponents();
					rel[i].updateObjects();
					rel[i].notifyChange();
				}
			}
		}

		/*
			If this is the first call to the method _calculateLineEnds of the
			createMessage and isn't any recursive call of this method, it is
			updates the objects, the upper y limit and the _moved atributte
			of the this message(and its related messages).
		*/
		if(updateObj == 1){

			var descendant_messages = this._sortAscendant(this.descendantMessages());
			for(i=0;i<descendant_messages.length;i++){

				descendant_messages[i]._moved = false;

				if(descendant_messages[i]._objA)
					descendant_messages[i]._objA.resetMovement();
				if(descendant_messages[i]._objB)
					descendant_messages[i]._objB.resetMovement();

				descendant_messages[i].updateLimitY();
				if(descendant_messages[i]._y < descendant_messages[i]._limitY){
					descendant_messages[i]._y = descendant_messages[i]._limitY;
					descendant_messages[i]._calculateLineEnds();
				}
			}
		}

    this.updateObjects();
	}

}


/**
 * Searchs all descendant messages of the current message and stores
 * them in an array that will be returned, between the descendant messages
 * take in account this create message.
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantMessages
 * @params {Array} descendant_messages Optional parameter that gives an array the descendant messages
 * @return {Array} An array with the descendant messages of the message(included this message)
 */
CreateMessage.prototype.descendantMessages = function ( descendant_messages) {

	var descendant_messages =  descendant_messages || [];

	if(!this.foundInArray(descendant_messages))
		descendant_messages.push(this);

	if(this._elemB){
		for(var i=0;i<this._elemB._relations.length;i++)
			if(this._elemB._relations[i] != this)
				descendant_messages = this._elemB._relations[i].descendantMessages(descendant_messages);
	}

	return descendant_messages;
}


/**
 * Perfoms the actions necessaries because by the mouse's
 * drag that the user makes
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drag
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
CreateMessage.prototype.drag = function( x, y ) {

  if( this._selectedLine ) {

    var i;
    if( y > this._limitY ) {
      this._y = y;
    } else {
      this._y = this._limitY;
    }

    this._moved = true;

  } else if( this._selectedPoint ) {
  }
}


/**
 * Searchs all descendant createmessages and stores
 * them in an array that will be returned
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method descendantsCreateMessages
 * @return {Array} An array with the B elements of descendant createmessages
 */
CreateMessage.prototype.descendantsCreateMessages = function () {

	if(!this._elemB)
		return [];

	var rel = this._elemB._relations;
	var i;
	var j;
	var createMessages = [];
	var auxCreateMessages = [];
	var found = false;

	for( i=0;i<rel.length;i++){

		/*
			If rel[i] is a create message that has as element A to the element
		  B of the current create message and as element B to other element
			else of the element A of the curretn create message
		*/
		if((rel[i] instanceof CreateMessage)  && (rel[i]._elemA == this._elemB) && (rel[i]._elemA != rel[i]._elemB)){

			found = false;
			for( j=0; j< createMessages.length && !found; j++){
				if(createMessages[j] == rel[i]._elemB)
					found = true;
			}

			/*
				If the element B of rel[i] hasn't been found in the descendant create messages array,
				rel[i] is added to this array and descendant createmessages of this are searched
			*/
			if(!found){

				createMessages.push(rel[i]._elemB);

				auxCreateMessages = rel[i].descendantsCreateMessages();
				for(j=0; j< auxCreateMessages.length; j++)
					createMessages.push(auxCreateMessages[j]);
			}
		} else {


			if(rel[i]._elemA == this)
				var relObj = (rel[i]._objA) ? rel[i]._objA._relations : [];
			else
				var relObj = (rel[i]._objB) ? rel[i]._objB._relations : [];


			for(j=0;j<relObj.length;j++)
				if((relObj[j] instanceof CreateMessage)){

					createMessages.push(relObj[j]._elemB);

					/*
						Descendant create messages of the create message relObj[j] are searched, and
						if is found a descendant create message, is added to the array of descendant
						create messages
					*/
					auxCreateMessages = relObj[j].descendantsCreateMessages();
					for(var k=0; k< auxCreateMessages.length; k++)
						createMessages.push(auxCreateMessages[k]);
				}

		}
	}

	return createMessages;
}









/**
 * DeleteMessage class constructor, creates a delete message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class DeleteMessage
 * @extends Message
 *
 */
var DeleteMessage = function( params ) {
  params = params || {};
  DeleteMessage.baseConstructor.call( this, params );
}
JSFun.extend( DeleteMessage, Message );




/**
 * Check if exists some element in the given point ,and if it is so,
 * the element is added to the relation, removing the old element before
 *
 * @author Rafael Molina Linares
 * @update 2/10/2011
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of the posible element
 * @param {Number} y Coordinate y of the posible element
 */
DeleteMessage.prototype._checkForNewNodes = function( x, y ) {

  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

    var newElem = this._diagram.reassignRelationTo( this, x, y );

    if( newElem ) {

      if( this._selected == 0 ) {

				if( newElem != this._elemB && newElem != this._objA &&
					  ((newElem.getType() == 'UMLLifeline'  && !newElem.getDelete()) || newElem.getType() == 'TimeInterval'))
	        this.setElementA( newElem );
      } else {

				if(newElem != this._elemA && newElem.getType() == 'UMLLifeline' && !newElem.getDelete())
	        this.setElementB( newElem );
      }

      this.notifyChange();

    }
  }

}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

DeleteMessage.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
DeleteMessage.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

DeleteMessage.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
DeleteMessage.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
DeleteMessage.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Interaction class constructor, creates a interaction block in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @class Interaction
 * @extends Rectangular
 *
 */
var Interaction = function( params ) {

  params = params || {};
  Interaction.baseConstructor.call( this, params );
}
JSFun.extend( Interaction, Rectangular );





/**
 * Performs the actions necessaries when the user
 * releases the mouse's bottom that had pressed
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

Interaction.prototype.drop = function( x, y ) {

	var i,j;

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }


    var rel = this._diagram._relations;
		var containedRel = [];
		var centralPointRel = [];
		var createMessages = [];

		/*
			if rel[i] is found on this node when click event is actived,
			and the containedRel[i]'s x central coordinate is found on this node
			when bottom is released, this is added to the containedRel array, and after,
			will be moved with the movement of the node.
		*/
    for( i=0; i< rel.length;i++){
			if(this.isOverBeforePosition(rel[i].getCentralPoint() ) && rel[i] instanceof Message){
				centralPointRel.push(rel[i].getCentralPoint());
				containedRel.push(rel[i]);
			}
		}

		/*
			Sorts the relations so that the messages with the distance between the y
			coordinate and the upper y limit lower are in the first array's position
		*/
		if(containedRel.length)
			containedRel = containedRel[0]._sortRelByDistanceToLimitY(containedRel);


    for( i=0; i< containedRel.length;i++){

			if(!containedRel[i]._moved){

				containedRel[i]._y = containedRel[i]._y +  (y - this._rely - this._prey);
				if(containedRel[i]._y < containedRel[i]._limitY)
					containedRel[i]._y = containedRel[i]._limitY;

				containedRel[i]._moved = true;

				containedRel[i]._calculateLineEnds(2);
			}
    }


    for( j=0; j< containedRel.length;j++){
			var descendant_messages = containedRel[j]._sortAscendant(containedRel[j].descendantMessages());
			for(i=0;i<descendant_messages.length;i++){

				descendant_messages[i]._moved = false;

				if(descendant_messages[i]._objA)
					descendant_messages[i]._objA.resetMovement();
				if(descendant_messages[i]._objB)
					descendant_messages[i]._objB.resetMovement();

				descendant_messages[i].notifyChange();
			}

		}

    for( i=0; i< containedRel.length;i++){
			containedRel[i].updateRelatedLifeline();
		}

		if(containedRel.length) {
			containedRel[0].updateDeleteMessages();
		}
	}

	Interaction.base.drop.call(this, x, y);

  var nodes = this._diagram._nodes;
  for( i=0; i< nodes.length; i++){
		if(nodes[i] instanceof Lifeline)
		  nodes[i].updateLength();
  }

  this._moved = false;
  this._resizing = false;
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Interaction.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Interaction.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the text of the guard component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setGuard
 * @param {String} text Text to establish the guard
 *
 */

Interaction.prototype.setGuard = function( text ){
	if(this._components[2])
		this._components[2].setValue( '[' + text + ']' );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Interaction.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Interaction.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Returns the guard's text of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Interaction.prototype.getGuard = function( ){
	var text = this._components[2].getValue();
	var value = (this._components[2]) ? text.substring(1,text.length -1) : null;
	return value;
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

Interaction.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Interaction.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * LifeLine class constructor, creates a lifeline element in a diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class LifeLine
 * @extends Rectangular
 * @param {Number} heightSmallRectangle Height of the small rectangle of the lifeline
 *
 */
var Lifeline = function( params ) {
  params = params || {};
  Lifeline.baseConstructor.call( this, params );

  this._delete = 0;
  this._create = 0;
  this._limitY = -1;

  this.setHeightSmallRectangle( params.heightSmallRectangle || 25);
}
JSFun.extend( Lifeline, Rectangular );




/**
 * Set the height of the rectangle of the life line
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setHeightSmallRectangle
 * @param {Number} height Height of the small rectangle drawn in the upper side of the lifeline
 *
 */
Lifeline.prototype.setHeightSmallRectangle = function( height ) {
	this._heightSmallRectangle = height;
}


/**
 * Checks if the given point is over the lifeline
 * or some of its components
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the lifeline
 */
Lifeline.prototype.isOver = function( x, y ) {

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  if(  (x >= this._x && x <= this._x + this._width &&
				y >= this._y && y <= this._y + this._heightSmallRectangle) ||
       (x >= (this.getLineX() - 5) && x <= (this.getLineX() + 5) &&
			  y >= (this._y + this._heightSmallRectangle) && y <= (this._y + this._height) ) ) {
    return true;
  }
  return false;
}



/**
 * Notify to the lifeline that a change has been produced by
 * some relationed element with the lifeline
 *
 * @author Rafael Molina Linares
 * @update 26/09/2011
 *
 * @method notifyChange
 */


Lifeline.prototype.notifyChange = function() {

	var createMessages;
	var descendantTimeIntervals = [];
  var i,j;

  var beforeHeight = this._heightSmallRectangle;
  this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());
  var mov = this._heightSmallRectangle - beforeHeight;



  for(i=0; i< this._relations.length;i++) {
  	if(!(this._relations[i] instanceof CreateMessage) || ( (this._relations[i] instanceof CreateMessage) && (this._relations[i]._elemA == this))){

		  if(mov){

		    if(!(this._relations[i] instanceof CreateMessage)){ //If is not a create message

			    if(this._relations[i]._elemA == this){

						if( (this._relations[i]._elemB._y + this._relations[i]._elemB._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5) )
			        this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
						else
			        this._relations[i].setLimitY(this._relations[i]._elemB._y + this._relations[i]._elemB._heightSmallRectangle + 5);
			    } else {
						if( (this._relations[i]._elemA._y + this._relations[i]._elemA._heightSmallRectangle + 5) < (this._y + this._heightSmallRectangle + 5) )
		        	this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
						else
		      	  this._relations[i].setLimitY(this._relations[i]._elemA._y + this._relations[i]._elemA._heightSmallRectangle + 5);
					}
		    } else {
		        this._relations[i].setLimitY(this._y + this._heightSmallRectangle + 5);
		    }
		  }

		  if( this._relations[i]._y < (this._y + this._heightSmallRectangle + 5) ){

				this._relations[i]._y += mov;
				this._relations[i].notifyChange();

				if(this._relations[i] instanceof CreateMessage){
					this._relations[i]._elemB.updatePosition();
					createMessages = this._relations[i].descendantsCreateMessages();
					for(j=0;j<createMessages.length;j++)
						createMessages[j].updatePosition();
				} else {

					this._relations[i].updateRelatedLifeline();
				}
		  }
		}

		if(mov && this._relations[i] instanceof CreateMessage && (this._relations[i]._elemB == this))
		  this._relations[i].notifyChange();

		if(mov)
		  this.resetMovement();
  }
	if(mov && this._relations.length)
		this._relations[0].updateDeleteMessages();


  if( this._container ) {
    this.updateContainer();
  } else {
    this.updateComponents();
    if( this._parent ) {
  	this._parent.updateContainer();
    }
  }

	this.setWidth((this._minWidth > 60) ? this._minWidth : 60);
	this.updateComponents();
}




/**
 * Return the x coordenate that coincides with the dashed line of the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getLineX
 *
 * @return {Number} x coordinate of the dashed line.
 */
Lifeline.prototype.getLineX = function() {
  return this.getX() + this.getWidth() / 2;
}


/**
 * Performs the corresponding actions when the user drag the LifeLine element.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class drag
 *
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
Lifeline.prototype.drag = function( x, y ) {

  if ( !this.resizing && this._selected ) {

    var px = x - this._relx;

    this.setPosition( px, this.getY() );
    this._moved = true;
  } else {
    Lifeline.base.drag.call( this, x, y );
  }
}



/**
 * Update the position of the deletemessage and the delete attribute of the lifeline
 * if exists any message below of the deletemessage
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateDelete
 */

Lifeline.prototype.updateDelete = function(){

	if(!this._delete)
		return;

	var heightObjA, heightObjB;
	var height;
	var yRel;
	var additionalSpace = 20;
	var i, j;
	var rel = this._relations;
	var max = 0;
	var deleteMessage;


	for(i=0; i< rel.length; i++){
		if(rel[i] instanceof Message) {

			if( !(rel[i] instanceof DeleteMessage) || (rel[i] instanceof DeleteMessage && rel[i]._elemB != this)) {


				yRel = rel[i].getY();

				if(rel[i]._elemA == rel[i]._elemB){

					yRel += (rel[i]._objA) ? (rel[i]._objA.getHeight() + 20) : 50;
				  height = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;
				} else {

					heightObjA = (rel[i]._objA) ? rel[i]._objA.getHeight() : 0;
					heightObjB = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;

					if( heightObjA > heightObjB)
						height = heightObjA;
					else
						height = heightObjB;
				}

			  if( (yRel + height + additionalSpace) > max )
					max = yRel + height + additionalSpace;

				if(rel[i]._objA){

					var relObjA = rel[i]._objA._relations;

					for(j=0; j < relObjA.length; j++){

						yRel = relObjA[j].getY();

						heightObjA = (relObjA[j]._objA) ? relObjA[j]._objA.getHeight() : 0;
						heightObjB = (relObjA[j]._objB) ? relObjA[j]._objB.getHeight() : 0;

						if( heightObjA > heightObjB)
							height = heightObjA;
						else
							height = heightObjB;

						if( (yRel + height + additionalSpace) > max )
							max = yRel + height + additionalSpace;
					}
				}

				if(rel[i]._objB){

					var relObjB = rel[i]._objB._relations;
					for(j=0; j < relObjB.length; j++){

						yRel = relObjB[j].getY();

						heightObjA = (relObjB[j]._objA) ? relObjB[j]._objA.getHeight() : 0;
						heightObjB = (relObjB[j]._objB) ? relObjB[j]._objB.getHeight() : 0;

						if( heightObjA > heightObjB)
							height = heightObjA;
						else
							height = heightObjB;

						if( (yRel + height + additionalSpace) > max )
							max = yRel + height + additionalSpace;
					}
				}

			} else {
				deleteMessage = rel[i];
			}
		}
	}



	if(deleteMessage._y < max)
		this._delete = max;
	else
		this._delete = deleteMessage._y;

	deleteMessage._y = this._delete;
	deleteMessage.notifyChange();

}


/**
 * Updates the height of the node(if necessary) takes in
 * account the greater y coordinate between all relations
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateLength
 */
Lifeline.prototype.updateLength = function() {

  var i;
  var max = 0;

  /*
	 If the lifeline has a delete message whose element B is this lifeline,
	 it just is taken in account the lifeline's relations to calculate the maximun length
	*/

  if( this._delete ){
	  for( i in this._relations ) {

	    if( (this._relations[i] instanceof Message) && this._relations[i].getY() > max ) {
	      max = this._relations[i].getY();
	    }
	  }
  } else {

		/*
		 If the lifeline hasn't a delete message whose element B is this lifeline,
		 it is taken in account the lifeline's relations to calculate the maximun length
		*/

	  var rel = this._diagram._relations;
	  var nodes = this._diagram._nodes;
	  var heightObjA, heightObjB;
		var yRel;
	  var height = 0;
	  var maxRel;

	  for( i=0; i< rel.length; i++ ) {

			if(rel[i] instanceof Message){
				yRel = rel[i].getY();

				if(rel[i]._elemA == rel[i]._elemB){

					yRel += (rel[i]._objA) ? (rel[i]._objA.getHeight() + 20) : 50;
				  height = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;
				} else {

					heightObjA = (rel[i]._objA) ? rel[i]._objA.getHeight() : 0;
					heightObjB = (rel[i]._objB) ? rel[i]._objB.getHeight() : 0;

					if( heightObjA > heightObjB)
						height = heightObjA;
					else
						height = heightObjB;
				}

			  if( (yRel + height) > max ) {
					max = yRel + height;
					maxRel = rel[i];
			  }
			}
	  }

		for( i=0; i< nodes.length; i++){

		  if( (nodes[i] instanceof Alternative) || (nodes[i] instanceof Interaction))

		    if( (nodes[i].getY() + nodes[i]._height) > max ) {
 	        max = nodes[i].getY() + nodes[i]._height;
					maxRel = null;
		    }
			}
	  }


	  max = max - this.getY();

	  if( max <= 0 ) {
	    max = 200;
	  }

	  if(max < this._heightSmallRectangle + 60 && !this._delete){
	    max = this._heightSmallRectangle + 60;
	  }

		/*
	  	If the element that gives the maximum height to the lifeline
			is a create message, the height of the A element( A lifeline)
			of the create message is modify so that the bottom Y coordinate
			of the A element coincides with the bottom Y coordinate of the
			B element (in the case that the bottom Y coordinate of A element
			is less than the bottom Y coordinate of B element).
		*/
	  if(maxRel && maxRel instanceof CreateMessage){
			if(maxRel._elemB == this){
    		if(!maxRel._elemA.getDelete()){

				/*
	      	Modify the height of the A element so that the bottom
					Y coordinate of the A element coincides with the
					bottom Y coordinate of the B element(if necessary)
				*/
		      if( (maxRel._elemA.getY() + maxRel._elemA.getHeight()) < (this.getY() + max + 60))
  	      	maxRel._elemA.setHeight(this.getY() + max + 60 - maxRel._elemA.getY());
  		  }
			} else {
				/*
	      	Ensure that the B element of create message has updated
					your height before update the height of the A element
				*/
	      maxRel._elemB.updateLength();

				/*
	      	Modify the height of the A element so that the bottom Y
					coordinate of the A element coincides with the bottom Y
					coordinate of the B element(if necessary)
				*/
	      if( (maxRel._elemB.getY() + maxRel._elemB.getHeight()) > (this.getY() + max + 60))
	        max = maxRel._elemB.getY() + maxRel._elemB.getHeight() - this.getY() - 60;
			}
		}

		if( this._delete ) {
			this.setHeight( max  );
		} else {
			this.setHeight( max + 60 );
		}
}


/**
 * Set the _delete attribute to value of 'y'.
 * When the delete attribute has a value different to 0, this means that
 * the lifeline has a delete message (being the element B of the delete message)
 * and your value indicates the y coordinate where this delete message is.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setDelete
 * @param {number} y value that contains the y coordinate of the delete message and will assigned to the attribute '_delete'
 *
 */
Lifeline.prototype.setDelete = function( y ) {
  this._delete = y;
}

/**
 * Return the _delete attribute
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getDelete
 * @return {boolean}  value that contains the y coordinate of the delete message
 *
 */
Lifeline.prototype.getDelete = function( ) {
  return this._delete;
}

/**
 * Set the _create attribute to value of 'value'.
 * When the _create attribute has a value different to 0, this means that
 * the lifeline has a create message (being the element B of the create message)
 * and your value indicates the y coordinate where this create message is.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setCreate
 * @param {boolean} value value that will assigned to the attribute '_create'.
 *
 */
Lifeline.prototype.setCreate = function( value ) {
  this._create = value;
}


/**
 * Return the _create attribute
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class getCreate
 * @return {boolean}  value that contains the y coordinate of the create message
 *
 */
Lifeline.prototype.getCreate = function( ) {
  return this._create;
}


/**
 * Add a new relation ('rel' parameter) to the LifeLine, provided
 * the 'addedRelationAlready' parameter has a value different to 0. A value 0 of the
 * parameter is saw when the relation to add is a relation to self, and
 * this has already been added previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class addRelation
 *
 * @param {Relation} rel relation that will be added to the LifeLine
 * @param {Number} addedRelationAlready Indicates if the relation has been added previously
 *
 */
Lifeline.prototype.addRelation = function( rel, addedRelationAlready ) {

  var addedRelationAlready = (JSFun.isNumber( addedRelationAlready )) ? addedRelationAlready : 0;

  if( rel instanceof DeleteMessage && rel._elemB == this ) {
		this.setDelete( rel._y );
  }

  if( rel instanceof CreateMessage && rel._elemB == this) {
		this.setCreate( rel._y );
  }

	rel.updateLimitY();

  if(rel._y < rel._limitY)
		rel._y = rel._limitY;

	if(!addedRelationAlready){
	  Lifeline.base.addRelation.call( this, rel );
	}
}



/**
 * Updates the elememt's position regarding the movement indicated
 * by the parameters and transmits it to its elements
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updatePosition
 * @param {Number} movx Movement in the x-axis
 * @param {Number} movy Movement in the y-axis
 */
Lifeline.prototype.updatePosition = function( movx, movy ) {
  var i, comp;


  if( movx == undefined || movy == undefined ) {

    var mov = this.getMovement();
    var movx = mov.getX();
    var movy = mov.getY();

    this.resetMovement();

    for( i in this._relations ) {
      this._relations[i].updatePosition();
    }

  } else {
    this._x += movx;
    this._y += movy;
  }

  this.resetMovement();

  for( i in this._components ) {
    this._components[i].updatePosition( movx, movy );
  }

  for( i in this._relations ) {
    if( this._relations[i].getParent() != this._parent ) {
      this._relations[i].notifyChange();
    }
  }

  if( this._container ) {
    for( i in this._nodeChilds ) {
      this._nodeChilds[i].updatePosition( movx, movy );
    }

    for( i in this._relationChilds ) {
      this._relationChilds[i].updatePosition( movx, movy );
    }
  }

}


/**
 * Delete a relation ('rel' parameter) to the LifeLine, provided
 * the 'deletedRelationAlready' parameter has a value different to 0. A value 0 of the
 * parameter is saw when the relation to delete is a relation to self, and
 * this has already been removed previously.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class delRelation
 *
 * @param {Relation} rel relation that will be deleted of the LifeLine
 * @param {Number} deletedRelationAlready Indicates if the relation has been deleted of the time interval already
 *
 */
Lifeline.prototype.delRelation = function( rel, deletedRelationAlready) {

  var deletedRelationAlready = (JSFun.isNumber( deletedRelationAlready )) ? deletedRelationAlready : 0;

  if( rel instanceof DeleteMessage && rel._elemB == this) {
	this.setDelete( 0 );
  }

  if( rel instanceof DeleteMessage) {
    this._limitY = -1;
  }

  if( rel.getType() == 'UMLCreate' && rel._elemB == this){
		this.setCreate( 0 );
  }


  var nodes = this._diagram._nodes;
  for(var i=0; i<nodes.length; i++)
    if(nodes[i].getType() == 'UMLLifeline')
			nodes[i].updateLength();

	if(!deletedRelationAlready){
	  Lifeline.base.delRelation.call( this, rel );
	}
}


/**
 * Draw a LifeLine in the canvas
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class draw
 *
 * @param {CanvasRenderingContext2D} context Context of canvas element
 *
 */
Lifeline.prototype.draw = function( context ) {

  Lifeline.base.draw.call( this, context );

  if( this._delete ) {

    var x = this.getX() + this.getWidth() / 2;
    var y = this.getY() + this.getHeight();

    context.save();
    context.strokeStyle = '#000000';
    context.translate( x, y );

    context.beginPath();
    context.moveTo( -8.5, 8.5 );
    context.lineTo( 8.5, -8.5 );
    context.moveTo( 8.5, 8.5 );
    context.lineTo( -8.5, -8.5 );
    context.stroke();
    context.restore();
  }

}



/**
 * Draw the shape of the life line
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
Lifeline.prototype.drawShape = function( context ) {
  context.save();
  context.lineWidth = 2.5;
  context.strokeStyle = NodeStyle.shape_color;
  context.strokeRect( JSGraphic.toPixel( this._x ), JSGraphic.toPixel( this._y ), this._width, this._heightSmallRectangle);

  context.beginPath();
  context.moveTo(this.getLineX(), JSGraphic.toPixel( this._y ) + this._heightSmallRectangle);
  context.lineTo(this.getLineX(), JSGraphic.toPixel( this._y ) + this._height);
  context.closePath();
  context.stroke();
  context.restore();
}


/**
 * Draws the figures that the lifeline has
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Lifeline.prototype.drawFigures = function( context ) {

  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {
			this._figures[i].draw( context, this._x, this._y, this._width, this._height, this._heightSmallRectangle );
	}
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

Lifeline.prototype.setName = function( text ){
	this._components[1].setValue( text );
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
Lifeline.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Lifeline.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Lifeline.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
Lifeline.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Lifeline.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * RegionAlternative class constructor, creates a region in the diagram
 *
 * @author Rafael Molina Liares
 * @update 16/10/2011
 *
 * @class RegionAlternative
 * @extends Region
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
var RegionAlternative = function( params ) {

  params = params || {};
  RegionAlternative.baseConstructor.call(this,params);
}
JSFun.extend( RegionAlternative, Region );



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
RegionAlternative.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the text of guard component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setGuard
 * @param {String} text Text to establish the new name
 *
 */
RegionAlternative.prototype.setGuard = function( text ){
	if(this._components[1])
		this._components[1].setValue( '[' + text + ']' );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */
RegionAlternative.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the guard's text of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
RegionAlternative.prototype.getGuard = function( ){
	var text = this._components[1].getValue();
	var value = (this._components[1]) ? text.substring(1,text.length -1) : null;
	return value;
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
RegionAlternative.prototype.getStereotype = function(){
	return this._components[0];
}






/**
 * RegionAlternativeItem Class Constructor
 * Create a component that when is clicked creates a region
 *
 * @author Rafael Molina Linares
 * @update 9/7/2011
 *
 * @class RegionAlternativeItem
 * @extends RegionItem
 */
var RegionAlternativeItem = function( params ) {
  params = params || {};
  RegionAlternativeItem.baseConstructor.call( this, params );
}
JSFun.extend( RegionAlternativeItem, RegionItem );



/**
 * Create a node or region to the parent
 *
 *
 * @author Rafael Molina Linares
 * @update 5/07/2011
 *
 * @method createRegion
 *
 */

RegionAlternativeItem.prototype.createRegion = function( ) {

	var lenComponents = this.getParent()._components.length;


	if(this.getParent()._orientation) {//vertical orientation
		this.getParent().addRegion(new RegionAlternative({parent: this.getParent()}));
	} else {
		this.getParent().addRegion(new RegionAlternative({parent: this.getParent()}));
	}

}









/**
 * ReplyMessage class constructor, creates a reply message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class ReplyMessage
 * @extends Relation
 *
 */

var ReplyMessage = function( params ) {

  params = params || {};
  ReplyMessage.baseConstructor.call(this,params);
}
JSFun.extend(ReplyMessage,Message);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

ReplyMessage.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
ReplyMessage.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

ReplyMessage.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
ReplyMessage.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
ReplyMessage.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * SendMessage class constructor, creates a send message in the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @class SendMessage
 * @extends Relation
 *
 */

var SendMessage = function( params ) {

  params = params || {};
  SendMessage.baseConstructor.call(this,params);
}
JSFun.extend(SendMessage,Message);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

SendMessage.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
SendMessage.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

SendMessage.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
SendMessage.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
SendMessage.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * UMLSequenceDiagram class constructor
 * Represents the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLSequenceDiagram
 * @extends SequenceDiagram
 */

var UMLSequenceDiagram = function( params ) {
  var f = new SequenceDiagram ( params );
  f.setType( 'UMLSequenceDiagram' );
  f.setName( 'Sequence diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLCreate', 'UMLDestroy',
												'UMLLifeline', 'UMLCallMessage', 'UMLSendMessage',
												'UMLDeleteMessage', 'UMLReplyMessage', 'UMLOption',
												'UMLAlternative', 'UMLLoop', 'UMLBreak', 'Region',
												'TimeInterval' ] );

  return f;
}












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

	var params = params || {};

  var f = new Lifeline( params );
  f.setType( 'UMLLifeline' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setHeight( 250 );

  f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true }) );
  f.addComponent( new TextBox({ id: 'name', centered: true, margin: 3 }) );
  f.addFigure( new LifelineFigure({ color: '#c6dbdc' }) );


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

  f.setStereotype( '\xABcreate\xBB' );

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

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

  f.setStereotype( '\xABdestroy\xBB' );

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

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
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

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
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

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
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);


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
  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

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

	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLOption' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );

	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name',  text:'OPT', margin: 4 , selected: true}) );
  f.addComponent( new GuardItem({ id: 'guard', text:'[]', margin: 1 }) );
  f.addFigure( new RectangleFigure() );

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

	var params = params || {};

  params = params || {};
  var f = new Alternative( params );
  f.setType( 'UMLAlternative' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setWidth( 200 );
  f.setHeight( 100 );


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

	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLLoop' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );

	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new LoopItem({ id: 'name',  text:'LOOP', margin: 4 }) );
  f.addComponent( new GuardItem({ id: 'guard', text:'[]', margin: 1 }) );
  f.addFigure( new RectangleFigure() );

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

	var params = params || {};

  var f = new Interaction( params );
  f.setType( 'UMLBreak' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setMoveable();
  f.setContainer();
  f.setWidth( 200 );
  f.setHeight( 100 );

	f.addComponent( new StereotypeTagList({ id: 'stereotypes' }) );
  f.addComponent( new Tab({ id: 'name',  text:'BREAK', margin: 4, selected: true }) );
  f.addFigure( new RectangleFigure() );

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
 * CompositeState class constructor, creates a composite state in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class CompositeState
 * @extends SuperNode
 * @param {Number} heightSmallRectangle Height of the small rectangle draws in the upper side of the element
 * @param {Number} widthSmallRectangle Width of the small rectangle draws in the upper side of the element
 * @param {Number} Xmovement Movement of the small rectangle on the top left x coordinate of the element
 */
var CompositeState = function( params ){

	params = params || {};
	CompositeState.baseConstructor.call(this,params);

	this.setHeightSmallRectangle( params.heightSmallRectangle || 15);
	this.setWidthSmallRectangle( params.widthSmallRectangle || 75);

	this.setXmovement(params.Xmovement || 15);
}
JSFun.extend(CompositeState,SuperNode);


/**
 * Set the height of the small rectangle of the element
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @class setHeightSmallRectangle
 * @param {Number} height Height of the small rectangle drawn in the upper side of the element
 *
 */
CompositeState.prototype.setHeightSmallRectangle = function( height ) {
	this._heightSmallRectangle = height;
}



/**
 * Set the width of the small rectangle of the element
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setWidthSmallRectangle
 * @param {Number} width Width of the small rectangle drawn in the upper side of the element
 *
 */
CompositeState.prototype.setWidthSmallRectangle = function( width ) {
	this._widthSmallRectangle = width;
}


/**
 * Set the displacement to the right of the small rectangle on the top left x coordinate of the element
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class setXmovement
 * @param {Number} x Movement of the small rectangle on the top left x coordinate of the element
 *
 */
CompositeState.prototype.setXmovement = function( x ) {
	this._Xmovement = x;
}



/**
 * If the node that call to this method, is container, check your minimal size
 * according to the contained elements within it and its components
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method updateContainer
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 *
 */
CompositeState.prototype.updateContainer = function(recall) {

  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {
    var i;

    var lx = this._x;
    var ly = this._y + this._heightSmallRectangle;

    var rx = this._x;
    var ry = this._y + this._heightSmallRectangle;

    var elem;
    var elemRigthX, elemeRigthY, elemLeftX, elemeLeftY;
    var len = this._nodeChilds.length;

    for( i=0; i<len;i++ ) {

      elem = this._nodeChilds[i];

			/*
				If the region is a visible node, the container node
				calculates your minimal size taking in account this region
			*/
			if(elem._visible){

		    if(this._orientation){

					elemLeftX = elem._x;
					elemLeftY = elem._y;

					/*
						If this is the last region of composite state, just is
						taken the minimal width of the region.In other case,
						the width of the region is taken into account.
					*/

					if(i == (len -1))
						elemRigthX = elem._x + elem._minWidth;
					else
						elemRigthX = elem._x + elem._width;

					elemRigthY = elem._y + elem._minHeight;
				}	else {

					elemLeftX = elem._x;
					elemLeftY = elem._y;
					elemRigthX = elem._x + elem._minWidth;

					/*
						If this is the last region of composite state, just is
						taken the minimal height of the region.In other case,
						the height of the region is taken into account.
					*/

					if(i == (len -1))
						elemRigthY = elem._y + elem._minHeight;
					else
						 elemRigthY = elem._y + elem._height;

					elemRigthX = elem._x + elem._minWidth;
		    }

		    if( elemRigthX > rx )
		      rx = elemRigthX;
		    if( elemRigthY > ry )
		      ry = elemRigthY;

		    if( elemLeftX < lx )
		      lx = elemLeftX;
		    if( elemLeftY < ly )
		      ly =elemLeftY;
			}
    }

		/*
			If the size of the regions contained in the composite state are greater
			than the size of the composite state is updated
		*/
    if( lx < this._x || ly < (this._y + this._heightSmallRectangle) ) {

      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y + this._heightSmallRectangle - ly + this._height );

      this._x = lx;
      this._y = ly - this._heightSmallRectangle;

      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - this._y );


    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y );
    }

    this._prex = this._x;
    this._prey = this._y;

    this.updateComponents();

    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}
}



/**
 * Notify to the supernode that a change has been produced
 * by some relationed element with the supernode.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method notifyChange
 * @param {Boolean} recall If the call to the parent method is done or not
 * @param {Boolean} resize If the call of this method is triggered when the supernode has been resizing
 */
CompositeState.prototype.notifyChange = function(recall,resize,movementLine) {

  recall = recall || false;
	resize = resize || false;
	movementLine = movementLine || false;

  var beforeHeight = this._heightSmallRectangle;


  this.setHeightSmallRectangle(this._components[0].getHeight() + this._components[1].getHeight());
  var movHeight = this._heightSmallRectangle - beforeHeight;


  if( movHeight ){
		this._y = this._y - movHeight
		this.setHeight(this._height + movHeight);
  }


  if(this._components[0].getWidth() > this._components[1].getWidth())
		this.setWidthSmallRectangle(this._components[0].getWidth());
  else
		this.setWidthSmallRectangle(this._components[1].getWidth());


	CompositeState.base.notifyChange.call(this,recall,resize,movementLine);
}


/**
 * Get a Xml node with the information of supernode
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method getElementXML
 * @param {DOMNode} parent Node parent of the xml tree that is generated
 * @return {DOMNode} Xml node with the information of the object
 */
CompositeState.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );

  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() + this._components[0]._height - 1);
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() - this._components[0]._height + 1);
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  xmlnode.setAttribute( 'orientation', this._orientation );
  xmlnode.setAttribute( 'includeComponentByRegion', this._includeComponentByRegion );


  var i;
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }

  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }

  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }

  return xmlnode;
}



/**
 * Receives a XML node with information of supernode and get this information back
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 */
CompositeState.prototype.setElementXML = function( xmlnode ) {

  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();

  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  this._orientation = parseInt(xmlnode.getAttribute( 'orientation' ) );
  this._includeComponentByRegion = xmlnode.getAttribute( 'includeComponentByRegion' );
  this._includeComponentByRegion = (this._includeComponentByRegion == 'true') ? true : false;


  var i;
  var childs = xmlnode.childNodes;

  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {

			if(   childs[i].getAttribute( 'behaviors' )!= null
				&& (childs[i].getAttribute( 'visible' ) == "true" || childs[i].getAttribute( 'visible' ) == "false")  ){

	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ), childs[i].getAttribute( 'behaviors' ), childs[i].getAttribute( 'visible' )  );
			}
			else
	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );

    } else if( childs[i].nodeName == 'superitem' ) {

      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }

  }

	this.notifyChange();
}



/**
 * Returns the point's intersection between the given point by parameters and
 * and the shape of composite state.
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the  border of the composite state shape
 */
CompositeState.prototype.getLinkCentered = function( x, y ) {

	if(this._selectedFigure)
		return CompositeState.base.getLinkCentered.call(this,x,y);

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();


  var ax, ay, bx, by;
  ax = this.getX();
  ay = this.getY();
  bx = cp.getX();
  by = this.getY();

  var m;

  if( x < cpx ) {

    if( y < cpy ) {

      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() - cpx);

      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else {

	      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() + this._Xmovement - cpx);

	      if( Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

					ay = this.getY() + this._heightSmallRectangle;
					bx = this.getX() + this.getWidth();
					by = this.getY() + this._heightSmallRectangle;
				} else {

		      m = (this.getY() - cpy)/(this.getX() + this._Xmovement - cpx);

		      if(  Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

						ax = this.getX() + this._Xmovement;
						ay = this.getY();
						bx = this.getX() + this._Xmovement;
						by = this.getY() + this._heightSmallRectangle;
					} else {

						var xRight = this.getX() + this._Xmovement + this._widthSmallRectangle;

			      m = (this.getY() - cpy)/(xRight - cpx);

			      if(  Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

							ax = this.getX();
							ay = this.getY();
							bx = this.getX() + this.getWidth();
							by = this.getY();
						} else {

							ax = this.getX();
							ay = this.getY() + this._heightSmallRectangle;
							bx = this.getX() + this.getWidth();
							by = this.getY() + this._heightSmallRectangle;
						}
					}
				}
      }
    } else {

      m = (this.getY() + this.getHeight() - cpy)/(this.getX() - cpx);

      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else {

				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }
  } else {

    if( y < cpy ) {

			var xRight = this.getX() + this._Xmovement + this._widthSmallRectangle;
      m = (this.getY() + this._heightSmallRectangle - cpy)/(this.getX() + this.getWidth() - cpx);

      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){


	      m = (this.getY() - cpy)/(this.getX() + this._Xmovement + this._widthSmallRectangle - cpx);

	      if( (xRight > (this.getX() + this.getWidth()/2)) && Math.abs( (y - cpy)/(x - cpx) ) > Math.abs( m ) ){

					bx = this.getX() + this.getWidth();
					by = this.getY();
				} else {

		      m = (this.getY() + this._heightSmallRectangle - cpy)/( xRight - cpx);

		      if( (xRight < (this.getX() + this.getWidth()/2)) || //small rectangle contained fully in the second quadrant
							 Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){

						ax = this.getX();
						ay = this.getY() + this._heightSmallRectangle;
						bx = this.getX() + this.getWidth();
						by = this.getY() + this._heightSmallRectangle;
					} else {

						ax = this.getX() + this._Xmovement + this._widthSmallRectangle;
						ay = this.getY();
						bx = this.getX() + this._Xmovement + this._widthSmallRectangle;
						by = this.getY() + this._heightSmallRectangle;
					}
				}

      } else {

				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }else {


      m = (this.getY() + this.getHeight() - cpy)/(this.getX() + this.getWidth() - cpx);

      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){

				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();

      } else { //first half of quadrant

				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }

    }
  }
  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );
}


/**
 * Set the node's visibility, so such to its components and its child nodes
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @private
 * @param {Boolean} bool Visibility to apply to the node
 */
CompositeState.prototype.setVisibility = function( bool ){

	this._visible = bool;
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object,
		and the node going to be made visible, should be taken in account that only
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	for(var i=0;i<this._components.length;i++){
		/*
			if the component:
			- isn't a specification item or
			- is a specifications item and hasn't a empty text or
			- in the case that the node shows a image associated to a stereotype object, if the component specify the node's name
		*/
		if( (_setVisibility || ( !_setVisibility && this._components[i]._id == 'name')) &&
				( !(this._components[i] instanceof SpecificationItem) ||
				   this._components[i] instanceof SpecificationItem && this._components[i].getValue() != '')){
			this._components[i].setVisibility(bool);
		}
	}

	if(this._container && _setVisibility){
		for(i=0;i<this._nodeChilds.length;i++){
			this._nodeChilds[i].setVisibility( bool );
		}
	}
}


/**
 * Check if the given point is over the lifeline
 * or some of your components
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the lifeline
 */

CompositeState.prototype.isOver = function( x, y ) {

	if(this._selectedFigure)
		return CompositeState.base.isOver.call(this,x,y);

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }


  if(  (x >= this._x + this._Xmovement && x <= this._x + this._Xmovement + this._widthSmallRectangle &&
				y >= this._y && y <= this._y + this._heightSmallRectangle) ||
       ( x >= this._x && x <= (this._x + this._width) &&
				y >= (this._y + this._heightSmallRectangle) && y <= (this._y + this._height) ) ) {
    return true;
  }
  return false;
}



/**
 * Modifies the value of a node's component, if exists
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setValue
 * @param {String} id Id of the component
 * @param {String} value Text tha will be assigned to the component
 * @param {Array} behaviors array that keeps the selected option of a 'select' form element(is used in the 'SpecificationItem' components)
 */

CompositeState.prototype.setValue = function( id, value , behaviors, visible) {
  var i;

  for( i in this._components ) {

    if( !( this._components[i] instanceof SuperComponent ) && this._components[i].getId() == id ) {

      this._components[i].setValue( value, behaviors, visible );
      this.updateComponents();
      return true;
    }
  }

  return false;
}


/**
 * Draws the figures that the node has
 *
 * @author Rafael Molina Linares
 * @update 11/09/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

CompositeState.prototype.drawFigures = function( context ) {

  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {

		if(i == this._selectedFigure){
			this._figures[i].draw( context, this._x, this._y, this._width, this._height, this._heightSmallRectangle, this._widthSmallRectangle, this._Xmovement );
		}
  }
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
CompositeState.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Set the text of the specification component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method setSpecifications
 * @param {String} text Text to establish to the specification component
 *
 */
CompositeState.prototype.setSpecification = function( text ){

	this._components[2].setVisibility( true );

	text = text.replace( /\n/gi, ';' );

	this._components[2].setText( text );
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
CompositeState.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

CompositeState.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
CompositeState.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the specifications of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getSpecifications
 * @return {String} Text of the element's specification
 *
 */
CompositeState.prototype.getSpecification = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
CompositeState.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
CompositeState.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * EntryPoint class constructor, creates a entry point in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @class EntryPoint
 * @extends Elliptical
 *
 */
var EntryPoint = function( params ) {
  params = params || {};
  EntryPoint.baseConstructor.call(this,params);
}
JSFun.extend(EntryPoint,Elliptical);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
EntryPoint.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
EntryPoint.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

EntryPoint.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
EntryPoint.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
EntryPoint.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
EntryPoint.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * ExitPoint class constructor, creates a exit point in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @class ExitPoint
 * @extends Elliptical
 *
 */
var ExitPoint = function( params ) {

  params = params || {};
  ExitPoint.baseConstructor.call(this,params);
}
JSFun.extend(ExitPoint,Elliptical);



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
ExitPoint.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
ExitPoint.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

ExitPoint.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
ExitPoint.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
ExitPoint.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
ExitPoint.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Junction class constructor, creates a junction in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @class Junction
 * @extends Elliptical
 *
 */
var Junction = function( params ) {

  params = params || {};
  Junction.baseConstructor.call(this,params);
}
JSFun.extend(Junction,Elliptical);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
Junction.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Junction.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Junction.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Junction.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
Junction.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Junction.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Constructor de la clase RegionState, create a region on a composite state
 *
 * @author Rafael Molina Linares
 * @update 17/11/2011
 *
 * @class RegionState
 * @extends Region
 * @param {Number} x Coordinate x of the region's position
 * @param {Number} y Coordinate y of the region's position
 */
var RegionState = function( params ) {

  params = params || {};
  RegionState.baseConstructor.call(this,params);
}
JSFun.extend( RegionState, Region );



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

RegionState.prototype.addStereotype = function(text){
	if(this._components[0]){
		var text = text || '';
		this._components[0].addField( '\xAB' + text + '\xBB' );
	}
}



/**
 * Set the text of the component name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */

RegionState.prototype.setName = function( text ){
	if(this._components[1])
		this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return Array with the stereotypes components of the element
 *
 */

RegionState.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
RegionState.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */

RegionState.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
RegionState.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * RegionStateItem Class Constructor
 * Create a component that when is clicked creates a region
 *
 * @author Rafael Molina Linares
 * @update 9/7/2011
 *
 * @class RegionStateItem
 * @extends RegionItem
 */
var RegionStateItem = function( params ) {
  params = params || {};
  RegionStateItem.baseConstructor.call( this, params );
}
JSFun.extend( RegionStateItem, RegionItem );



/**
 * Create a node or region to the parent
 *
 * @author Rafael Molina Linares
 * @update 5/07/2011
 *
 * @method createRegion
 *
 */

RegionStateItem.prototype.createRegion = function( ) {

	var lenComponents = this.getParent()._components.length;

	if(this.getParent()._orientation) {//vertical orientation
		this.getParent().addRegion(new RegionState({parent: this.getParent()}));
	} else {
		this.getParent().addRegion(new RegionState({parent: this.getParent()}));
	}

}








/**
 * SimpleState class constructor, creates a simple state in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class SimpleState
 * @extends Rectangular
 *
 */
var SimpleState = function( params ){
	params = params || {};
	SimpleState.baseConstructor.call(this,params);
}
JSFun.extend(SimpleState, Rectangular);



/**
 * Receives a XML node with information of supernode and get this information back
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 *
 */
SimpleState.prototype.setElementXML = function( xmlnode ) {

  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();

  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );


  var i;
  var childs = xmlnode.childNodes;

  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {

			if(   childs[i].getAttribute( 'behaviors' ) != null
				&& (childs[i].getAttribute( 'visible' ) == "true" || childs[i].getAttribute( 'visible' ) == "false")  ){

	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ), childs[i].getAttribute( 'behaviors' ), childs[i].getAttribute( 'visible' )  );
			}
			else
	      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );

    } else if( childs[i].nodeName == 'superitem' ) {

      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }

  }

}



/**
 * Modifies the value of a node's component, if exists
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setValue
 * @param {String} id Id of the component
 * @param {String} value Text tha will be assigned to the component
 * @param {Array} behaviors array that keeps the selected option of a 'select' form element(is used in the 'SpecificationItem' components)
 */

SimpleState.prototype.setValue = function( id, value , behaviors, visible) {
  var i;

  for( i in this._components ) {

    if( !( this._components[i] instanceof SuperComponent ) && this._components[i].getId() == id ) {

      this._components[i].setValue( value, behaviors, visible );
      this.updateComponents();
      return true;
    }
  }

  return false;
}


/**
 * Set the node's visibility, so such to its components and its child nodes
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @private
 * @param {Boolean} bool Visibility to apply to the node
 */

SimpleState.prototype.setVisibility = function( bool ){

	this._visible = bool;
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object,
		and the node going to be made visible, should be taken in account that only
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	for(var i=0;i<this._components.length;i++){
		/*
			if the component:
			- isn't a specification item or
			- is a specifications item and hasn't a empty text or
			- in the case that the node show a image associated to a stereotype object, if the component specify the node's name
		*/
		if( (_setVisibility || ( !_setVisibility && this._components[i]._id == 'name')) &&
				( !(this._components[i] instanceof SpecificationItem) ||
				   this._components[i] instanceof SpecificationItem && this._components[i].getValue() != '')){
			this._components[i].setVisibility(bool);
		}
	}

	if(this._container && _setVisibility){
		for(i=0;i<this._nodeChilds.length;i++){
			this._nodeChilds[i].setVisibility( bool );
		}
	}
}


/**
 * Draws fully the simple state in the canvas element,
 * calls to the drawing sub-functions to draw
 * all components and figures of the node
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SimpleState.prototype.draw = function( context ) {

	if(!this._visible)
		return;

	SimpleState.base.draw.call(this, context);

	/*
		Draws the horizontal line that appears in
		the simple state when the 'specification'
		component is visible
	*/
	if(this._components[2]._visible){
		context.save();
		context.fillStyle = '#000000';
		context.beginPath();

		context.moveTo( JSGraphic.toPixel( this.getX()),
										JSGraphic.toPixel( this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());
		context.lineTo( JSGraphic.toPixel( this.getX() + this.getWidth()),
										JSGraphic.toPixel( this.getY()) + this._components[0].getHeight() + this._components[1].getHeight());

		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}
}

/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
SimpleState.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}



/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
SimpleState.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Set the specification component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 6/11/2011
 *
 * @method setSpecifications
 * @param {String} text Text to establish to the specification component
 *
 */

SimpleState.prototype.setSpecification = function( text ){

	this._components[2].setVisibility( true );

	text = text.replace( /\n/gi, ';' );

	this._components[2].setText( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

SimpleState.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
SimpleState.prototype.getName = function( ){
	return this._components[1].getValue();
}



/**
 * Returns the specifications of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getSpecifications
 * @return {String} Text of the element's specification
 *
 */
SimpleState.prototype.getSpecification = function( ){
	return this._components[2].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
SimpleState.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
SimpleState.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * StateMachineDiagram class constructor, creates a diagram of state machine
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class StateMachineDiagram
 * @extends Diagram
 *
 */
var StateMachineDiagram = function( params ){
	StateMachineDiagram.baseConstructor.call(this,params);
}
JSFun.extend(StateMachineDiagram,Diagram);



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/

StateMachineDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

	var stereotypeObjects = stereotypeObjects || null;
  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids, null, stereotypeObjects );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Rafael Molina Linares
 * @update 05/12/2011
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Parent of the current xml node
 * @param {Array} stereotypeObjects List of objects stereotypes that can be used by the diagram
*/

StateMachineDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

		/*
			It is set the list of stereotypes object
			that can be applied to the object
		*/
		if( obj._stereotypeProperties && stereotypeObjects )
			obj._stereotypeProperties.setStereotypesProfile( stereotypeObjects );

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj, stereotypeObjects);
    }
  }
}



/**
 * Terminate class constructor, creates a terminate element in the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class Terminate
 * @extends Elliptical
 *
 */
var Terminate = function( params ){
	params = params || {};
	Terminate.baseConstructor.call(this,params);
}
JSFun.extend(Terminate,Elliptical);




/**
 * Returns the point's intersection between the given point by parameters and
 * and the element's shape.
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the rhombus's border
 */
Terminate.prototype.getLinkCentered = function( x, y ) {

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();

  var ax, ay, bx, by;


  if( x < cpx ) {
    if( y < cpy ) {

				ax = this.getX();
				ay = this.getY();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();

    } else {
				ax = this.getX() + this.getWidth();
				ay = this.getY();
				bx = this.getX();
				by = this.getY() + this.getHeight();

    }
  } else {
    if( y < cpy ) {

				ax = this.getX() + this.getWidth();
				ay = this.getY();
				bx = this.getX();
				by = this.getY() + this.getHeight();
    }else {
				ax = this.getX();
				ay = this.getY();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
    }
  }

  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );
}


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */
Terminate.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Terminate.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Terminate.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Terminate.prototype.getName = function( ){
	return this._components[1].getValue();
}


/**
 * Returns the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 16/10/2011
 *
 * @method getStereotype
 * @return {Component} Stereotype fields components of the element UML
 *
 */
Terminate.prototype.getStereotype = function(){
	return this._components[0];
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Terminate.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
 * Transition class constructor, creates a transition element of state machine
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class Transition
 * @extends Relation
 * @param {Number} x Coordenada x de la posición del nodo
 * @param {Number} y Coordenada y de la posición del nodo
 */
var Transition = function( params ){
	params = params || {};
	Transition.baseConstructor.call(this,params);
}
JSFun.extend(Transition,Relation);


/**
 * Set the name of the 'transition' element
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @method setComponentName
 * @param {String} newName New name for the relation
 */
Transition.prototype.setComponentName = function( newName ) {

  if( !this._name ) {

    this._name = new TransitionItem({ id: 'name' });
    this._addComponent( this._name );
  } else {
    this._name.setText( newName );
  }
}



/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

Transition.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
Transition.prototype.setName = function( text ){
	this._components[1].setValue( text );
}


/**
 * Return the stereotypes of the element UML in array's form
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

Transition.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Rafael Molina Linares
 * @update 18/11/2011
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
Transition.prototype.getName = function( ){
	return this._components[1].getValue();
}




/**
 * Returns the name field component of the element UML
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getNameAsComponent
 * @return {Component} Stereotype field component of the element UML
 *
 */
Transition.prototype.getNameAsComponent = function( ){
	return this._components[1];
}




/**
 * UMLStateMachineDiagram class constructor
 * Represents the state machine diagram
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class UMLStateMachineDiagram
 * @extends Diagram
 */
var UMLStateMachineDiagram = function( params ) {

  var f = new StateMachineDiagram( params );
  f.setType( 'UMLStateMachineDiagram' );
  f.setName( 'State Machine diagram' );

  f.setValidElements( [ 'UMLNote', 'UMLLine', 'UMLInitialPseudostate' ,
												'UMLFinalState', 'UMLTerminate','UMLEntryPoint',
												'UMLExitPoint', 'UMLJunction', 'UMLSimpleState' ,
												'UMLCompositeState', 'UMLVerticalRegion','UMLHorizontalRegion',
												'UMLTransition',  'Region'] );
  return f;
}







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

  f.setWidth( 16 );
  f.setHeight( 16 );

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

  f.setWidth( 16 );
  f.setHeight( 16 );

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

	var params = params || {};

  var f = new Terminate( params);
  f.setType( 'UMLTerminate' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 20 );
  f.setHeight( 20 );

  f.addFigure( new CrossFigure({ color: '#000000', changeFigureColor: false}) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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

	var params = params || {};

  var f = new EntryPoint( params );
  f.setType( 'UMLEntryPoint' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 14 );
  f.setHeight( 14 );

  f.addFigure( new EllipseFigure({ color: '#ffffff', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );


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

	var params = params || {};

  var f = new ExitPoint( params );
  f.setType( 'UMLExitPoint' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 14 );
  f.setHeight( 14 );

  f.addFigure( new CrossEllipseFigure({ color: '#ffffff', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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

	var params = params || {};

  var f = new Junction( params );
  f.setType( 'UMLJunction' );

	setStereotypeProperties(f,params.stereotypes || []);

  f.setWidth( 14 );
  f.setHeight( 14 );

  f.addFigure( new EllipseFigure({ color: '#000000', changeFigureColor: false }) );
  f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Bottom }) );
  f.addComponent( new TextArea({ id:'name', position: Component.Bottom, margin: 3}) );

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

	var params = params || {};

	var f = new SimpleState( params );
	f.setType( 'UMLSimpleState' );

	setStereotypeProperties(f,params.stereotypes || []);

	f.setWidth( 75 );
	f.setHeight( 30 );
	f.setMoveable();

	f.addComponent( new StereotypeTagList({ id: 'stereotypes', centered: true  }) );
	f.addComponent( new TextArea({ id: 'name', centered: true, position: Component.Static, margin: 5 }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addFigure( new RoundedRectangleFigure({color: '#ffffbb'}));


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

	params = params || {};
	params.includeComponentByRegion = false;

	var f = new CompositeState( params );
	f.setType( 'UMLCompositeState' );

	setStereotypeProperties(f,params.stereotypes || []);

	f.setWidth( 150 );
	f.setHeight( 100 );
	f.setMoveable();
 	f.setContainer();

	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'StateName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));


	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	if(params.setElementXml){
	} else{

		f.addRegion(new Region({parent: f}));
	}


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

	params = params || {};
	params.orientation = 1;

	var f = new CompositeState( params );
	f.setType( 'UMLVerticalRegion' );

	setStereotypeProperties(f,params.stereotypes || []);

	f.setWidth( 320 );
	f.setHeight( 150 );
	f.setMinHeight(50);
	f.setMoveable();
 	f.setContainer();

	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'RegionName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position: Component.BottomLeft, margin: 10 }) );
	f.addComponent( new RegionStateItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));

	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	if(params.setElementXml){
	} else{

		f.addRegion(new RegionState({parent: f}));
		f.addRegion(new RegionState({parent: f}));
	}

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

	var params = params || {};

	var f = new CompositeState( params );
	f.setType( 'UMLHorizontalRegion' );

	setStereotypeProperties(f,params.stereotypes || []);

	f.setWidth( 320 );
	f.setHeight( 150 );
	f.setMinHeight(50);
	f.setMoveable();
 	f.setContainer();


	f.addComponent( new StereotypeTagList({ id: 'stereotypes', position: Component.Xmovement  }) );
	f.addComponent( new TextBox({ id: 'name', text: 'RegionName', margin: 3, position: Component.Xmovement }) );
	f.addComponent( new SpecificationItem({ id: 'specification', centered: false, position:  Component.BottomLeft, margin: 10 }) );
	f.addComponent( new RegionStateItem({ id: 'addRegion', text:'...', margin: 1, position: Component.BottomRight }) );
	f.addFigure( new RegionFigure({ color: '#ffffbb'}));


	f.setHeightSmallRectangle(f._components[0].getHeight() + f._components[1].getHeight());
	f.setWidthSmallRectangle(f._components[1].getWidth());


	if(params.setElementXml){
	} else{
		f.addRegion(new RegionState({parent: f}));
		f.addRegion(new RegionState({parent: f}));
	}

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

  f.addComponentStereotype();
  f.setComponentName();

  f.setMenu([[function(){f.showStyleDialog({that: f});f.removeContextualMenu();},'Style']]);

  f.setLine( new SolidLine() );
  f.setEnd( new OpenTip() );

  return f;
}



