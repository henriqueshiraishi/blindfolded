/**
 ** MODULE NAME: 
 **	  PackageDiagram.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the PackageDiagram element of the structure diagram of UML 2.
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	000 - Dec 2012 - AAH -
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