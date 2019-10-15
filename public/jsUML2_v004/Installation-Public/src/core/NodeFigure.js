/**
 ** MODULE NAME: 
 **	  NodeFigure.js
 **
 ** DESCRIPTION:
 **   Class is responsible for controlling the graphical representation of the nodes.
 **
 ** DEVELOPED BY:
 **	    Alejandro Arrabal Hidalgo (AAH)
 **     Martin Vega-Leal Ordonez (MVL)
 ** 	Rafael Molina Linares    (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	    003 - Apr 2013 - AAH - Fourth version release 
 **	    002 - Oct 2012 - AAH - Third version release 
 ** 	001 - Sep 2011 - RML - Second version release
 ** 	000 - Feb 2011 - MVL - First version release
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



//= require <JSFun>
//= require <JSGraphic>



var figureStyle = {
  border: '#294253'
}



/**
 * NodeFigure class constructor
 * Is the grafical representation of a node
 *
 * @author Martín Vega-leal Ordóñez / Molina Linares / Arrabal Hidalgo Alejandro
 * @update 29/11/2010 / 12/08/2011 / 30/07/2012
 *
 * @class NodeFigure
 * @param {String} color Object's color in your representation
 * @param {String} changeFigureColor If the figure's color can be modified (true) or not(false)
 * @param {String} changeFigureLineWidth If the figure's line width can be modified (true) or not(false)
 * @param {String} lineColor Object's color in your representation
 * @param {Number} lineWidth Object's line width in your representation
 */
var NodeFigure = function( params ) {
  params = params || {};
  this._changeFigureColor = (params.changeFigureColor == false) ? false : true;
  this._changeFigureLineWidth = (params.changeFigureLineWidth == false) ? false : true;
  if( params.color ) {
    this._color = params.color;
  } else {
    this._color = '#ffffff';
  }
  if( params.lineColor ) {
	  this._lineColor = params.lineColor;
  } else {
	  this._lineColor = '#294253';
  }
  if( params.lineWidth ) {
	  this._lineWidth = params.Width;
  } else {
	  this._lineWidth = 1;
  }
}


/**
 * Draw the element in the canvas with 
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
NodeFigure.prototype.draw = function( context, x, y, width, height ) {}



/**
 * Returns the object's color
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @protected
 * @return {String} Object's color with format of CSS2
 */
NodeFigure.prototype.getColor = function() {
  return this._color;
}


/**
 * Set the color of the object
 *
 * @author Rafael Molina Linares
 * @update 12/08/2011
 *
 * @method setColor
 * @protected
 * @params {String} color Object's color with the CSS2 format
 */
NodeFigure.prototype.setColor = function(color) {
	//Only the color will be modified if is defined for that, and the 'color' parameter is right
  if(this._changeFigureColor && color)
		this._color = color;
}




/**
 * Set the line color of the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method setLineColor
 * @protected
 * @params {String} color Object's line color with the CSS2 format
 */
NodeFigure.prototype.setLineColor = function(color) {
	//Only the line color will be modified if is defined for that, and the 'color' parameter is right
  if(this._changeFigureColor && color)
		this._lineColor = color;
}




/**
 * Returns the object's line color
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method getLineColor
 * @protected
 * @return {String} Object's line color with format of CSS2
 *
**/
NodeFigure.prototype.getLineColor = function() {
  return this._lineColor;
}




/**
 * Set the line width of the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method setLineWidth
 * @protected
 * @params {Number} width Object's line width
 */
NodeFigure.prototype.setLineWidth = function(width) {
	//Only the line width will be modified if is defined for that, and the 'width' parameter is right
  if(this._changeFigureLineWidth && JSFun.isNumber(width))
		this._lineWidth = width;
}




/**
 * Returns the object's line width
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method getLineColor
 * @protected
 * @return {String} Object's line color with format of CSS2
 *
**/
NodeFigure.prototype.getLineWidth = function() {
  return this._lineWidth;
}




/**
 * StickmanFigure class constructor
 * Represents an object with form of stickman
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StickmanFigure
 * @extends NodeFigure
 */
var StickmanFigure = function() {}
JSFun.extend( StickmanFigure, NodeFigure );



/**
 * Draws a stickman in the canvas with 
 * the position and size given 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
StickmanFigure.prototype.draw = function( context, x, y, width, height ) {
  x = JSGraphic.toPixel( x );
  y = JSGraphic.toPixel( y );
  
  context.save();
  context.strokeStyle = '#000000';

  context.beginPath();
  context.arc( x + width / 2, y + width / 4, width / 4, 0, Math.PI*2, true );

  context.moveTo( x+width/2 , y+width/2 );
  context.lineTo( x+width/2 , y+width/2+height/3 );
  context.lineTo( x , y+height );
    
  context.moveTo( x+width/2, y+width/2+height/3 );
  context.lineTo( x+width, y+height );
  
  context.moveTo( x, y+height/2 );
  context.lineTo( x+width, y+height/2 );
  
  context.stroke();
  context.restore();
}



/**
 * EllipseFigure class constructor
 * Represents an objet with form of ellipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class EllipseFigure
 * @extends NodeFigure
 */
var EllipseFigure = function( params ) {
  params = params || {};
  EllipseFigure.baseConstructor.call( this, params );
}
JSFun.extend( EllipseFigure, NodeFigure );



/**
 * Draws an ellipse in the canvas with /
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez / 	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/	30/07/2012
 * 
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
EllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;
  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );
  context.stroke();
  context.restore();
  
  context.save();
  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();
  context.restore();

}



/**
 * HalfFilledEllipseFigure class constructor
 * Represent an object with the ellipse form and a smaller ellipse inside
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class HalfFilledEllipseFigure
 * @extends NodeFigure
 */
var HalfFilledEllipseFigure = function( params ) {
  params = params || {};
  HalfFilledEllipseFigure.baseConstructor.call( this, params );
}
JSFun.extend( HalfFilledEllipseFigure, EllipseFigure );



/**
 * Draw an ellipse in the canvas, and within this, a smaller ellipse fills
 * with the position and size given.
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 /	30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
HalfFilledEllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  context.save();
  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();
  context.restore();  
  
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );
  context.stroke();
  context.restore();
  
  context.save();
  context.fillStyle = '#000000';
  JSGraphic.ellipse( context, x + sw, y  + sh, sw*0.5, sh*0.5 );
  context.fill();
  context.restore();
}



/**
 * CrossEllipseFigure class constructor
 * Represent an object with the ellipse form and a cross within this.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class CrossEllipseFigure
 * @extends NodeFigure
 */
var CrossEllipseFigure = function( params ) {
  params = params || {};
  CrossEllipseFigure.baseConstructor.call( this, params );

}
JSFun.extend( CrossEllipseFigure, EllipseFigure );



/**
 * Draw an ellipse in the canvas, and within this, a cross
 * with the position and size given.
 *
 * @author Rafael Molina Linares /	Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
CrossEllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;
  
  var punto = (Math.sqrt((width)*(width) + (height)*(height)) - (sw*2))/2;
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );

	//Draws a cross on the circle
  context.moveTo(x+punto,y+punto);		
  context.lineTo(x+width-punto,y+height-punto); 
  context.moveTo(x+width-punto,y+punto);
  context.lineTo(x+punto,y+height-punto);
  
  context.stroke();
  context.restore();
}



/**
 * CrossEllipseFigure class constructor
 * Represent an object with the ellipse form and a cross within this.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class CrossFigure
 * @extends NodeFigure
 */
var CrossFigure = function( params ) {

  params = params || {};
  CrossFigure.baseConstructor.call( this, params );
}
JSFun.extend( CrossFigure, NodeFigure );



/**
 * Draw an ellipse in the canvas, and within this, a cross.
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordinate where object is drawn 
 * @param {Number} y left upper y coordinate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
CrossFigure.prototype.draw = function( context, x, y, width, height ) {

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

	//Draws a cross on the circle
  context.beginPath();
  context.moveTo(x,y);		
  context.lineTo(x+width,y+height); 
  context.moveTo(x+width,y);
  context.lineTo(x,y+height);

  context.closePath();
  context.stroke();
  context.restore();
}



/**
 * RhombusFigure class constructor
 * Represents an object with rhombus form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RhombusFigure
 * @extends NodeFigure
 */
var RhombusFigure = function(params) {
	params = params || {};
	RhombusFigure.baseConstructor.call( this, params );
}
JSFun.extend( RhombusFigure, NodeFigure );



/**
 * Draws a rhombus in the canvas with 
 * the position and size give
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
RhombusFigure.prototype.draw = function( context, x, y, width, height ) {
  context.save();
  context.fillStyle = '#ffffff';
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.rhombus( context, x, y, width, height );
  context.fill();
  context.stroke();
  context.restore();
}



/**
 * RectangleFigure class constructor
 * Represents an object with rectangle form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RectangleFigure
 * @extends NodeFigure
 */
var RectangleFigure = function( params ) {
  params = params || {};
  RectangleFigure.baseConstructor.call( this, params );
}
JSFun.extend( RectangleFigure, NodeFigure );



/**
 * Draws a rectangle in the canvas with
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
RectangleFigure.prototype.draw = function( context, x, y, width, height ) {

  var xp = JSGraphic.toPixel( x );
  var yp = JSGraphic.toPixel( y );
  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  context.fillStyle = this.getColor();  
  context.fillRect( x , y, width, height );
  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( xp, yp, width, height );

}



/**
 * ExpansionNodeFigure class constructor
 * Represents an object with small rectangle form
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class ExpansionNodeFigure
 * @extends NodeFigure
 */
var ExpansionNodeFigure = function( params ) {
  params = params || {};
  ExpansionNodeFigure.baseConstructor.call( this, params );
}
JSFun.extend( ExpansionNodeFigure, NodeFigure );



/**
 * Draws a small rectagle in the canvas with
 * the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
ExpansionNodeFigure.prototype.draw = function( context, x, y, width, height ) {

  var xp = JSGraphic.toPixel( x );
  var yp = JSGraphic.toPixel( y );

  context.save();
 
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  context.fillStyle = this.getColor();  
  context.fillRect( x , y, width, height );

  context.beginPath();

  if(width < height){

    context.moveTo(xp, JSGraphic.toPixel(y + height/4));
    context.lineTo(xp + width, yp + JSGraphic.toPixel(height/4));

    context.moveTo(xp, JSGraphic.toPixel(yp + 2* (height/4)));
    context.lineTo(xp + width, JSGraphic.toPixel(yp +  2 * (height/4)));

    context.moveTo(xp, JSGraphic.toPixel(yp + 3* (height/4)));
    context.lineTo(xp + width, JSGraphic.toPixel(yp + 3* (height/4)));
  } else {

    context.moveTo(JSGraphic.toPixel(x + width/4), yp );
    context.lineTo( xp + JSGraphic.toPixel(width/4), yp + height);

    context.moveTo( JSGraphic.toPixel(xp + 2* (width/4)), yp);
    context.lineTo( JSGraphic.toPixel(xp +  2 * (width/4)), yp + height);

    context.moveTo( JSGraphic.toPixel(xp + 3* (width/4)), yp);
    context.lineTo( JSGraphic.toPixel(xp + 3* (width/4)), yp + height);
  }

  context.closePath();
  context.stroke();

  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( xp, yp, width, height );
}



/**
 * RoundedRectangleFigure class Constructor
 * Represent an object with rounded rectangle form.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class RoundedRectangleFigure
 * @extends NodeFigure
 */
var RoundedRectangleFigure = function( params ) {

  params = params || {};
  RoundedRectangleFigure.baseConstructor.call( this, params );
}
JSFun.extend( RoundedRectangleFigure, NodeFigure );



/**
 * Draw a rounded rectangle in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
RoundedRectangleFigure.prototype.draw = function( context, x, y, width, height ) {
  
  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );
  var radius = 4;

	//Draws the figure's fill
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.fillStyle = this.getColor();


  context.beginPath();
  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);
  context.closePath();
  
  context.fill();
  
  context.restore();  

	//Draws the figure's shape
  context.save();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();
  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);

  context.stroke();
  
  context.restore();  
}



/**
 * RegionFigure class Constructor
 * Represent an object with rounded rectangle form that
 * contains a tab and a vertical line.
 *
 * @class RegionFigure
 * @extends NodeFigure
 */
var RegionFigure = function( params ) {
  params = params || {};
  RegionFigure.baseConstructor.call( this, params );
}
JSFun.extend( RegionFigure, NodeFigure );



/**
 * Draw a rounded rectangle with a tab in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
RegionFigure.prototype.draw = function( context, x, y, width, height, heightSmallRectangle, widthSmallRectangle, Xmovement) {

  heightSmallRectangle = heightSmallRectangle || 15;
  widthSmallRectangle = widthSmallRectangle || 75;
  Xmovement = Xmovement || 15;

  var radius = 4;
  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 

	//Draws the figure's fill
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  
  context.beginPath();
  context.fillRect( x + 15 , y , widthSmallRectangle, heightSmallRectangle );

  y+= heightSmallRectangle;
  height-= heightSmallRectangle;

  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);
  
  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);  
  context.closePath();
  context.fill();
  context.restore();

  y-= heightSmallRectangle;
  height+= heightSmallRectangle;

	//Draws the figure's shape
  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  
  context.beginPath();

  context.strokeRect( x + 15 , y , widthSmallRectangle, heightSmallRectangle );
  y+= heightSmallRectangle;
  height-= heightSmallRectangle;

  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);
  
  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);  

  context.stroke();
  context.restore();
}



/**
 * PackageFigure class constructor
 * Represents an object with packect form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class PackageFigure
 * @extends NodeFigure
 */
var PackageFigure = function( params ) {
  params = params || {};
  PackageFigure.baseConstructor.call( this, params );
}
JSFun.extend( PackageFigure, NodeFigure );



/**
 * Draw a rectangle with a tab in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
PackageFigure.prototype.draw = function( context, x, y, width, height ) {
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  context.fillRect( x , y , 60, 15 );
  context.fillRect( x , y + 15 , width, height - 15 );
  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( x + 0.5, y + 0.5, 60, 15 );
  context.strokeRect( x + 0.5, y + 15.5, width, height - 15 );
}



/**
 * NoteFigure class constructor
 * Represents an object with note form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class NoteFigure
 * @extends NodeFigure
 */
var NoteFigure = function( params ) {
  params = params || {};
  NoteFigure.baseConstructor.call( this, params );
}
JSFun.extend( NoteFigure, NodeFigure );



/**
 * Draw a rectangle in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
NoteFigure.prototype.draw = function( context, x, y, width, height ) {
  x = JSGraphic.toPixel( x );
  y = JSGraphic.toPixel( y );
  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  
  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + width - 15, y );
  context.lineTo( x + width, y + 15 );
  context.lineTo( x + width, y + height );
  context.lineTo( x, y + height );
  context.closePath();

  context.fill();
  context.restore();
  
  
  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.stroke();

  context.beginPath();
  context.moveTo( x + width - 15, y );
  context.lineTo( x + width - 15, y + 15 );
  context.lineTo( x + width, y + 15 );
  context.stroke();
  
  context.restore();
}




/**
 * FromImageFigure class constructor
 * Draws an extern image on the canvas
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 29/11/2010 / 20/10/2011
 *
 * @class FromImageFigure
 * @extends NodeFigure
 * @params {String} route Path of the image
 */
var FromImageFigure = function( params ) {
  params = params || {};
  NoteFigure.baseConstructor.call( this, params );
  
	if(params.route){
		this.route = params.route;
		this.load = true;
		this.image = new Image();
		this.image.setAttribute( 'src', this.route );
	}  
	this._associatedStereotypes = [];
}
JSFun.extend( FromImageFigure, NodeFigure );



/**
 * Adds an object Stereotype as associated stereotype of the figure 
 * to indicate that this object uses that figure to the graphic 
 * representation of the elements UML that have among their 
 * stereotypes label to the object
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method addAssociatedStereotype
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.addAssociatedStereotype = function( stereotype ){
	this._associatedStereotypes.push( stereotype );
}



/**
 * Deletes an object Stereotype as associated stereotype of the figure 
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method delAssociatedStereotype
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.delAssociatedStereotype = function( stereotype ){

	for(var i=0;i<this._associatedStereotypes.length;i++){
		if(this._associatedStereotypes[i] == stereotype){
			this._associatedStereotypes.splice(i,1);
			break;
		}
	}
}



/**
 * Searchs the object Stereotype passed as parameter 
 * between the stereotypes associated to this figure
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method foundInAssociatedStereotypes
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.foundInAssociatedStereotypes = function( stereotype ){
	for(var i=0;i<this._associatedStereotypes.length;i++)
		if(this._associatedStereotypes[i] == stereotype)
			return true;
	return false;
}



/**
 * Draws the image, if this is loaded
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method foundInAssociatedStereotypes
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.draw = function( context, x, y, width, height ) {

  if( this.load ) {

		/*
			Catch the call to the drawImage so that the call 
			of this method with a image that has a invalid 
			route don't produce a general failure of the system
		*/
		try{
	    context.drawImage( this.image, x, y, width, height );
		}
		catch(err){
			//Image no found
		}
  }  
}



/**
 * LifelineFigure class constructor
 * Represents an object with life line form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class LifelineFigure
 * @extends NodeFigure
 */
var LifelineFigure = function( params ) {
  params = params || {};
  LifelineFigure.baseConstructor.call( this, params );
}
JSFun.extend( LifelineFigure, NodeFigure );



/**
 * Draw a rectangle with a vertical line in the canvas
 * with the position and size given
 *
 * @author Martín Vega-Leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
LifelineFigure.prototype.draw = function( context, x, y, width, height, heightSmallRectangle) {

  heightSmallRectangle = heightSmallRectangle || 25;
  var xline = JSGraphic.toPixel( x + width / 2 );
  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  context.fillRect( x , y , width, heightSmallRectangle );
  context.restore();

  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( x + 0.5 , y + 0.5 , width, heightSmallRectangle );
  context.restore();
  
  JSGraphic.dashedLine( context,  xline, y + heightSmallRectangle, xline, y + height, 10 );
}



/**
 * LifelineFigure class constructor
 * Represents an object with accept event action form of UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class AcceptEventActionFigure
 * @extends NodeFigure
 */
var AcceptEventActionFigure = function( params ) {
  params = params || {};
  AcceptEventActionFigure.baseConstructor.call( this, params );
}
JSFun.extend( AcceptEventActionFigure, NodeFigure );



/**
 * Draw an object with the form of an accept event action UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
AcceptEventActionFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 
  
	//Draws the figure's fill 
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y); 
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x + 25, y + height/2);

  context.closePath();
  context.fill();
	context.restore();

	//Draws the figure's shape 
	context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y); 
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x + 25, y + height/2);
  context.lineTo(x,y);

  context.stroke();
  context.restore();
}


/**
 * TimeEventFigure class constructor
 * Represents a object with form of time event UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class TimeEventFigure
 * @extends NodeFigure
 */
var TimeEventFigure = function( params ) {
  params = params || {};
  TimeEventFigure.baseConstructor.call( this, params );
}
JSFun.extend( TimeEventFigure, NodeFigure );



/**
 * Draw an time event UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
TimeEventFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 

	//Draws the figure's fill  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.strokeStyle = figureStyle.border;
  context.fillStyle = this.getColor();

  //upper triangle
  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y); 
  context.lineTo(x + width/2, y + height/2);

  context.closePath();
  context.fill();

  //down triangle
  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x + width,y + height); 
  context.lineTo(x + width/2, y + height/2);

  context.closePath();
  context.fill();

  context.restore();

	//Draws the figure's shape
  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  //upper triangle
  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y); 
  context.lineTo(x + width/2, y + height/2);
  context.lineTo(x,y);

  context.stroke();

  //down triangle
  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x + width,y + height); 
  context.lineTo(x + width/2, y + height/2);
  context.lineTo(x,y + height);

  context.stroke();

  context.restore();
}



/**
 * SendSignalActionFigure class constructor
 * Represents an object with form of send signal action of UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class SendSignalActionFigure
 * @extends NodeFigure
 */
var SendSignalActionFigure = function( params ) {
  params = params || {};
  SendSignalActionFigure.baseConstructor.call( this, params );
}
JSFun.extend( SendSignalActionFigure, NodeFigure );



/**
 * Draw a send signal action of UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
SendSignalActionFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 

	//Draw the figure's fill  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + width - 25, y); 
  context.lineTo(x + width, y + height/2);
  context.lineTo(x + width - 25, y + height);
  context.lineTo(x, y + height);

  context.closePath();
  context.fill();

  context.restore();

	//Draw the figure's shape
	context.save();
	context.strokeStyle =  this.getLineColor();
	context.lineWidth = this.getLineWidth();

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + width - 25, y); 
  context.lineTo(x + width, y + height/2);
  context.lineTo(x + width - 25, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x,y);

  context.stroke();
  context.restore();
}


/**
 * LifelineFigure class constructor
 * Represents an object with form of a horizontal swimlane UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class SwimlaneFigure
 * @extends NodeFigure
 */
var SwimlaneFigure = function( params ) {
  params = params || {};
  SwimlaneFigure.baseConstructor.call( this, params );
}
JSFun.extend( SwimlaneFigure, NodeFigure );



/**
 * Draw a horizontal swimlane UML
 * with the position and size given
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
SwimlaneFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 
  
  context.save();
  context.lineWidth = 2.5;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();
  context.moveTo(x + width,y);
  context.lineTo(x, y); 
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + height);

  context.stroke();
  context.restore();
}



/**
 * VerticalSwimlaneFigure class constructor
 * Represents an object with form of a vertical swimlane UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class LifelineFigure
 * @extends NodeFigure
 */
var VerticalSwimlaneFigure = function( params ) {
  params = params || {};
  VerticalSwimlaneFigure.baseConstructor.call( this, params );
}
JSFun.extend( VerticalSwimlaneFigure, NodeFigure );



/**
 * Draw a vertical swimlane UML
 * with the position and size given
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento 
 * @param {Number} x left upper x coordenate where object is drawn 
 * @param {Number} y left upper y coordenate where object is drawn 
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
VerticalSwimlaneFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y ); 

  
  context.save();
  context.lineWidth = 2.5;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;   
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();


  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x, y); 
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);

  context.stroke();

  context.restore();
}



/**
 * TriangleFigure class constructor
 * Represents an object with triangle form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @class TriangleFigure
 * @extends NodeFigure
 * 
 * @param {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
var TriangleFigure = function(params) {
	  params = params || {};
	  if(params.direction && JSFun.isNumber(params.direction))this.setDirection(params.direction);
	  TriangleFigure.baseConstructor.call( this, params );
	}
JSFun.extend( TriangleFigure, NodeFigure );



/**
 * Draws a triangle in the canvas with 
 * the position and size give
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
TriangleFigure.prototype.draw = function( context, x, y, width, height) {
  context.save();
  context.fillStyle = '#ffffff';
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.triangle( context, x, y, width, height,this.getDirection() );
  context.fill();
  context.stroke();
  context.restore();
}




/**
 * Set a triangle direction 
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method setDirection
 * @param {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
TriangleFigure.prototype.setDirection = function( direction) {
	if(JSFun.isNumber(direction))this._direction=direction;
}



/**
 * Get the triangle direction 
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method getDirection
 * @return {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
TriangleFigure.prototype.getDirection = function() {
	if(JSFun.isNumber(this._direction))return this._direction;
	return 0;
}



/**
 * CubeFigure class constructor
 * Represents an object with cubic form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @class CubeFigure
 * @extends NodeFigure
 */
var CubeFigure = function( params ) {
  params = params || {};
  CubeFigure.baseConstructor.call( this, params );
}
JSFun.extend( CubeFigure, NodeFigure );



/**
 * Draws a cubic form in the canvas with
 * the position and size given
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/03/2013
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
CubeFigure.prototype.draw = function( context, x, y, width, height ) {

  var xp = JSGraphic.toPixel( x );
  var yp = JSGraphic.toPixel( y );
  
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  
  //Draw the figure's fill
  context.fillRect( x , y, width, height );
  context.restore();

  //Draw the figure's 3D fills
  context.save();
  context.fillStyle = this.getColor(); 
  
  context.beginPath();
  
  context.moveTo(xp+10, yp-10); // give the (x,y) coordinates
  context.lineTo(xp+10+width, yp-10);
  context.lineTo(xp+10+width, yp+height-10);
  context.lineTo(xp+width, yp+height);
  context.lineTo(xp+width, yp);
  context.lineTo(xp, yp);
  
  context.closePath();
  context.fill();
  context.restore();
  
  //Draw the figure's shape
  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.strokeRect( xp, yp, width, height );
  context.restore();
  
  //Draw the figure's 3D shape.
  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();
  
  context.moveTo(xp+10, yp-10); // give the (x,y) coordinates
  context.lineTo(xp+10+width, yp-10);
  context.lineTo(xp+10+width, yp+height-10);
  context.lineTo(xp+width, yp+height);
  context.lineTo(xp+width, yp);
  context.lineTo(xp, yp);
  context.lineTo(xp+10, yp-10);
  
  context.moveTo(xp+width, yp);
  context.lineTo(xp+10+width, yp-10);
  
  context.stroke();
  
  context.restore();


}