/**
 ** MODULE NAME: 
 **	  SequenceDiagram.js
 **
 ** DESCRIPTION:
 **   Defines the sequence diagram of UML 2.
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


//= require <../modules/sequence/Message>


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

	//If the new node is of Lifeline type, this updates your height to fit to the largest y coordinate 
  if( newNode instanceof Lifeline ) {

    newNode.setDiagram( this );
    newNode.updateLength();
  }
	//Call to base method
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

	//If the relation is of Message type
  if( newRelation instanceof Message ) {

		//Set the diagram to the new relation
    newRelation.setDiagram( this );

		//Deletes the object A of relation if the relation has as element A a time interval
		if(newRelation._elemA instanceof TimeInterval && newRelation._objA){
			newRelation._objA.remove();
			newRelation._objA = 0;
		}

		//Deletes the object B of relation if the relation has as element B  a time interval
		if(newRelation._elemB instanceof TimeInterval && newRelation._objB){
			newRelation._objB.remove();
			newRelation._objB = 0;
		}

		//Adds the new relations to the relations's list
    this._relations.push( newRelation );

		/*
			Updates the position of the new relation to avoid that the new message 
			can be underneath a delete message
		*/
		newRelation.updateDeleteMessages();

		//Updates the relation
    newRelation.notifyChange();	
  } else{

		//If the relation isn't a message, it is called the base method
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

  //the lifeline or TimeInterval element can't be contained in a container element
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

  //Sort the array of elements by Area
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

		//initialize parameter if your value is undefined
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

