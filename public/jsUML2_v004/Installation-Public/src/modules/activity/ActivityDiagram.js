/**
 ** MODULE NAME: 
 **	  ActivityDiagram.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the ActivityDiagram element of the activity diagram of UML 2.
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
 * ActivityDiagram class constructor, creates a diagram of state machine
 *
 * @author Rafael Molina Linares
 * @update 9/09/2011
 *
 * @class ActivityDiagram
 * @extends Diagram
 *
 */
var ActivityDiagram = function( params ){
	ActivityDiagram.baseConstructor.call(this,params);
}
JSFun.extend(ActivityDiagram,Diagram);



/**
 * Function that instantiates the given element and all 
 * their soons, and it is related with your id
 *
 * @author Rafael Molina Linares
 * @update 16/09/11
 *
 * @method _instantiateElements
 * @private
 * @param {DOMNode} xmlnode Xml information of the element that is instantiates
 * @param {Array} ids Is stored a reference for each element instantiated together your id
 * @param {Node} parent Parent node of element that is initialize
*/

ActivityDiagram.prototype._instantiateElements = function( xmlnode, ids, parent ) {
 
	//initialize parameter if your value is undefined
  parent = parent || null;

	//Instantiates an object using the nodename of the xmlnode
  var obj = this._instantiateObjectFromString( xmlnode.nodeName, parent );

  if( obj ) {

		//Object is inserted in the ids's array
    ids[ xmlnode.getAttribute( 'id' ) ] = obj;
    var i;

		//Instantiation of the child nodes
    for(i = 0; i < xmlnode.childNodes.length; i++ ) {

			//if is a region of the Supernode, the supernode is passed to the method 
      if(obj instanceof SuperNode && xmlnode.childNodes[i].nodeName == 'Swimlane'  )
				this._instantiateElements( xmlnode.childNodes[i], ids, obj );
			else
				this._instantiateElements( xmlnode.childNodes[i], ids );
    }
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
ActivityDiagram.prototype._instantiateObjectFromString = function( elemName, parent ) {
  if( JSFun.isString( elemName ) ) {

		//initialize parameter if your value is undefined
    parent = parent || null;

    var i;

    for( i in this._validElements ) {
	
      if( elemName == this._validElements[i] ) {

				/*
					If the correspondent object to the 'elemName' chain is an object that creates other objects every time that is instantiated, 
					the object don't perform the creation of this objects in this moment, and later, this objects will be created. This is the case
					of any SuperNode element(as UMLHorizontalHierarchicalSwimlane).
				*/
				if( elemName == 'UMLHorizontalHierarchicalSwimlane' || elemName == 'UMLVerticalHierarchicalSwimlane' || elemName == 'UMLHorizontalSwimlane' || 					    elemName == 'UMLVerticalSwimlane' || elemName == 'UMLFlow'){

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

ActivityDiagram.prototype.setXML = function( xml, stereotypeObjects ) {

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

ActivityDiagram.prototype._addElementXML = function( xmlnode, ids, parent, stereotypeObjects ) {

	var parent = parent || null;
	var stereotypeObjects = stereotypeObjects || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){ 

		//Adds components to the supernode's region
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
