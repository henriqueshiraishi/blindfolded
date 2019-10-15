/**
 ** MODULE NAME: 
 **	  StereotypeTag.js
 **
 ** DESCRIPTION:
 **   Define a component that manages a stereotype of UML 2.
 **
 ** DEVELOPED BY:
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Sep 2011 - RML - Initial version release
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
	
	//Initialize the value of the parameters
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
				
				//Properties of stereotype
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
				//Properties of stereotype
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
			
		//Call to the base method 
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

	//If the stereotype hasn't yet been in the 'fields' array
	for(i=0;i<stereotypes.length;i++)
		if('\xAB' + stereotypes[i].getName() + '\xBB' == this.getValue()){
			xmlcomp.setAttribute( 'stereotypeObject', true );
			break;
		}


  return xmlcomp;
}

