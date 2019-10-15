/**
 ** MODULE NAME: 
 **	  AcceptEventAction.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the AcceptEventAction element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
 ** 	000 - Sep 2011 - RML - Second version release
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
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
 * AcceptEventAction class constructor, creates a AcceptEventAction in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class AcceptEventAcion
 * @extends Rectangular
 *
 */
var AcceptEventAction = function( params ) {
  params = params || {};
  AcceptEventAction.baseConstructor.call(this,params);
}
JSFun.extend(AcceptEventAction,Rectangular);



/**
 * Returns the point's intersection between the given point by parameters and 
 * and the node's shape.
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of point
 * @param {Number} y Coordinate y of point
 * @return {Point} Intersection point with the border of the accept event action figure
 */
AcceptEventAction.prototype.getLinkCentered = function( x, y ) {


	//If the figure that is drawn isn't the figure associated by default to the node, it is called to base method
	if(this._selectedFigure)
		return AcceptEventAction.base.getLinkCentered.call(this,x,y);

  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  
	//Get the central point of the node
  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();
  
  var ax, ay, bx, by;
  
	//Initializes the value by default
  ax = this.getX();
  ay = this.getY();
  bx = cp.getX();
  by = this.getY();


  if( x < cpx ) {
		/* Second quadrant */
    if( y < cpy ) {

      var m;
      m = (this.getY() - cpy)/(this.getX() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

				bx = this.getX() + 25;
				by = this.getY() + this.getHeight()/2;
      } else { 

				//First half of quadrant
				bx = this.getX() + this.getWidth();
				by = this.getY();
      }
    } else {
			/* Third quadrant */
      var m;
      m = (this.getY() + this.getHeight() - cpy)/(this.getX() - cpx);

			//First half of quadrant
      if( ( (y - cpy) == 0) || Math.abs( (y - cpy)/(x - cpx) ) < Math.abs( m ) ){ 

				ax = this.getX() + 25;
				ay = this.getY() + this.getHeight()/2;
				bx = this.getX();
				by = this.getY() + this.getHeight();
      } else { 

				//Second half of quadrant
				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }
  } else {

		/* First quadrant */
    if( y < cpy ) {

      var m;
      m = (this.getY() - cpy)/(this.getX() + this.getWidth() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 

				bx = this.getX() + this.getWidth();
				by = this.getY();
      } else {	

				//First half of quadrant
				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }else { 

			/* fourth quadrant */
      var m;
      m = (this.getY() + this.getHeight() - cpy)/(this.getX() + this.getWidth() - cpx);

			//Second half of quadrant
      if( ( (y - cpy) == 0) || ( (y - cpy)/(x - cpx) ) < m ){ 

				ax = this.getX() + this.getWidth();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      } else { 

				//First half of quadrant
				ay = this.getY() + this.getHeight();
				bx = this.getX() + this.getWidth();
				by = this.getY() + this.getHeight();
      }
    }
  }

  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );  
}


/**
 * Calculate the minimum size of node according to the size of your components
 * 
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method calculateSize
 * @protected
 */
AcceptEventAction.prototype.calculateSize = function() {

	//If the figure that is drawn isn't the figure associated by default to the node, it is called to base method
	if(this._selectedFigure){
		AcceptEventAction.base.calculateSize.call(this);
		return;
	}
		
  if( this._components.length > 0 ) {
    var comp;
    var maxWidth = 0;
    var maxHeight = 0;
   
    var i;
     
		//Searches for the maximum height and width
    for( i in this._components ) {
      comp = this._components[i];
      
      if( comp.getPosition() == Component.Float || comp.getPosition() == Component.BottomLeft || comp.getPosition() == Component.BottomRight) {
        maxHeight += comp.getHeight();

        if( comp.getWidth() > maxWidth )
          maxWidth = comp.getWidth();
      }
    }
    
		//Updates minimal size if is a container node
    if( this._container ) {

      if( maxHeight > this._minHeight )
        this.setMinHeight( maxHeight);
        
      if( maxWidth > this._minWidth )
        this.setMinWidth( maxWidth  + 25);
       
    } else {
      if( maxHeight > 0 )
        this.setMinHeight( maxHeight );
      
      if( maxWidth > 0 )
        this.setMinWidth( maxWidth + 25);
    }    
  }
}


/**
 * Update the position of node's components
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method updateComponents
 * @private
 */
AcceptEventAction.prototype.updateComponents = function() {

  if( this._components.length > 0 ) {
    this.calculateSize();
    this.insertComponents( this._x + 25, this._y, this._width - 25, this._height );       
    
    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }    
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
AcceptEventAction.prototype.addStereotype = function(text){
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
AcceptEventAction.prototype.setName = function( text ){
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

AcceptEventAction.prototype.getStereotypes = function( ){
	var childs = this._components[0]._childs;
	var stringChilds = [];
	for(var i=0;i<childs.length;i++)
		stringChilds.push(childs[i]._text);
	return	stringChilds;
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
AcceptEventAction.prototype.getName = function( ){
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
AcceptEventAction.prototype.getStereotype = function(){		
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
AcceptEventAction.prototype.getNameAsComponent = function( ){
	return this._components[1];
}
