/**
 ** MODULE NAME: 
 **	  ExceptionHandler.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the ExceptionHandler element of the activity diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo(AAH)
 **   Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Oct 2012 - AAH - Third version release
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
 * ExceptionHandler class constructor, creates a ExceptionHandler element in a activity diagram
 *
 * @author Rafael Molina Linares
 * @update 5/9/2011
 *
 * @class ExceptionHandler
 * @extends Relation
 * @param {Element} a first element of ExceptionHandler
 * @param {Element} b second element of the ExceptionHandler
 * @param {Number}  y coordinate y of the ExceptionHandler element
 */
var ExceptionHandler = function( params ) {
  params = params || {};

  this._y = params.y || 0;
  this._limitY = 0;
  
  this._objA = null;
  this._objB = null;
  
  ExceptionHandler.baseConstructor.call( this, params );
}
JSFun.extend( ExceptionHandler, Relation );




/**
 * Check if the given point is over any some element of Message, and in right case, 
 * the Message is selected to interact with the user.
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method select
 * @param {Number} x Coodinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} if the point is over any element.
 */
ExceptionHandler.prototype.select = function( x, y ) {
  this._deselectComponent();
  //change the radius to a bigger one for touch devices
  var radius= ( this._diagram._touch) ? 6 : 0;
  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/* 
			If the right button has been pressed or tap hold was tiggered,
			and therefore, the contextual menu is activated
		 */
	   var radius= ( this._diagram._touch) ? 10: 0;
	   if( this.isOver( x, y, radius ) ) {
	    	this._diagram._pressMouseRight =  false;

		    //the default contextual menu is removed
	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account 
					that Chrome and Opera browsers support the document.documentElement 
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    //Shows the contextual menu
		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }	  
}

// you have clicked or touched on one point
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
  	
    // you have clicked or touched on one component 	
    if( this._isOverComponent( x, y, radius ) ) {
            this._selectedBefore = true;    
            return true;
          }
  }
  
  // you have clicked or touched on one lines
  for( var i = 0; i < this._points.length - 1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {  
        
        if( this._selected > -1 )
          this._selectedBefore = true;
            
        this._selected = i;
        this._selectedLine = true;		

        //Add new point to the relation
        this._points.splice( this._selected + 1, 0, new Point(x,y) );
  	
        return true;
    }
  }
    
  return false;
}



/**
 * Draws the relation with the defined style and all its components
 *
 * @author Rafael Molina Linares
 * @update 5/9/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
ExceptionHandler.prototype.draw = function( context ) {

	//Call to the base method to draw the line
	ExceptionHandler.base.draw.call(this, context);

  context.save();

  context.strokeStyle = this.getLineColor();
  context.lineWidth = this.getLineWidth();


  var len = this._points.length;
  var central = parseInt( len / 2 ) - 1;

	//Set the value by default of the rect
  var ax = this._points[central].getX();
  var ay = this._points[central].getY();
  var bx = this._points[central + 1].getX();
  var by = this._points[central + 1].getY();


  if( len % 2 != 0 ) {
    var cx = bx;
    var cy = by;
  } else {
    var cx = (ax + bx ) / 2;
    var cy = (this._components.length) ? this._components[0]._y - 30 :  ((ay + by )/2 - 30) ;
  }

	//Central point of the relation
	var cp = this._elemA.getCentralPoint();
  var cpx = cp._x;
  var cpy = cp._y; 


  if( bx < cpx ) {
		/* Second quadrant */
    if( by < cpy ) {

			if(Math.abs(bx - cpx) > Math.abs(by - cpy)){

      } else { 
				//Second half of quadrant
    		var cx = (this._components.length) ? this._components[0]._x + 30 :  ((ax + bx ) / 2 + 30) ;
		    var cy = (ay + by ) / 2;
      }
    } else {

			/* Third quadrant */

			if(Math.abs(bx - cpx) > Math.abs(by - cpy)){

      } else {

				//Second half of quadrant
    		var cx = (this._components.length) ? this._components[0]._x + 30 :  ((ax + bx ) / 2 + 30) ;
		    var cy = (ay + by ) / 2;
      }
    }

  } else {
    if( by < cpy ) { 

			/* First quadrant */

			if(Math.abs(bx - cpx) < Math.abs(by - cpy)){  

				//Second half of quadrant
    		var cx = (this._components.length) ? this._components[0]._x + 30 :  ((ax + bx ) / 2 + 30) ;
		    var cy = (ay + by ) / 2;
      } else {

      }

    }else {

			/* Forth quadrant */

			if(Math.abs(bx - cpx) > Math.abs(by - cpy)){

      } else {

				//first half of quadrant
    		var cx = (this._components.length) ? this._components[0]._x + 30 :  ((ax + bx ) / 2 + 30) ;
		    var cy = (ay + by ) / 2;
      }
    }
  }

	//Draws the Z what the relation has above
	context.beginPath();

	context.moveTo( cx - 15, cy);
	context.lineTo( cx + 15, cy);
	context.lineTo( cx - 15, cy + 20);
	context.lineTo( cx + 15, cy + 20);

  context.stroke();

  context.restore();	
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
ExceptionHandler.prototype.setName = function( text ){
	this._components[1].setValue( text );
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

ExceptionHandler.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
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
ExceptionHandler.prototype.getName = function( ){
	return this._components[1].getValue();
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

ExceptionHandler.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
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
ExceptionHandler.prototype.getNameAsComponent = function( ){
	return this._components[1];
}