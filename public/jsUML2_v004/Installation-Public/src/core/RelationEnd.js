/**
 ** MODULE NAME: 
 **	  RelationEnd.js
 **
 ** DESCRIPTION:
 **   Graphically defines the end of a relationship.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
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



/**
 * Define la forma gráfica del final de una relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class RelationEnd
 */
var RelationEnd = function() {}




/**
 * Dibuja la forma del final de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @param {Number} angle Ángulo de giro a la dirección de la relación
 * @param {String} color Color opcional del objeto en formato valido de CSS2
 */
RelationEnd.prototype.draw = function( context, x, y, angle, color ) {}



/**
 * Define un final de punta de flecha cerrada
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class CloseTip
 * @extends RelationEnd
 */
var CloseTip = function(params) {

	params = params || {};
	this._color = params.color || '#ffffff';
}
JSFun.extend( CloseTip, RelationEnd );

CloseTip.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = this._color;//"#ffffff";
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -8.5, 5.5 );
  context.lineTo( -8.5, -5.5 );
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();

}



/**
 * Define un final de punta de flecha abierta
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class OpenTip
 * @extends RelationEnd
 */
var OpenTip = function() {}
JSFun.extend( OpenTip, RelationEnd );

OpenTip.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( -8.5, 5.5 );
  context.lineTo( 0, 0 );
  context.lineTo( -8.5, -5.5 );
  context.stroke();
  context.restore();

}



/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class AggregationEnd
 * @extends RelationEnd
 */
var AggregationEnd = function() {}
JSFun.extend( AggregationEnd, RelationEnd );

AggregationEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();
    
  context.strokeStyle = color;
  context.fillStyle = "#ffffff";
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();

}



/**
 * Define un final con la forma de una composición, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class CompositionEnd
 * @extends RelationEnd
 */
var CompositionEnd = function() {}
JSFun.extend( CompositionEnd, RelationEnd );

CompositionEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();
    
  context.fillStyle = '#000000';
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.closePath();
  context.fill();
  context.restore();

}





var InterfaceUsageEnd = function() {}
JSFun.extend( InterfaceUsageEnd, RelationEnd );

InterfaceUsageEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
    
  context.translate( x+(1*Math.cos(angle)), y+(1*Math.sin(angle)));
  context.rotate( angle );
  
  context.beginPath();
  context.arc( 8, 0, 12, Math.PI/2, Math.PI*1.5, false );
  context.stroke();
  context.restore();
}
/*
var CrossEnd = function() {}
JSFun.extend( CrossEnd, RelationEnd );

CrossEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( -8.5, 8.5 );
  context.lineTo( 8.5, -8.5 );
  context.moveTo( 8.5, 8.5 );
  context.lineTo( -8.5, -8.5 );
  context.stroke();
  context.restore();

}*/




/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @class OpenTipAggregationEnd
 * @extends RelationEnd
 */
var OpenTipAggregationEnd = function() {}
JSFun.extend( OpenTipAggregationEnd, RelationEnd );

OpenTipAggregationEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();
    
  context.strokeStyle = color;
  context.fillStyle = "#ffffff";
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.lineTo( 0, 0 );  
  context.fill();
  context.moveTo( -22.5, 5.5 );
  context.lineTo( -14, 0 );
  context.lineTo( -22.5, -5.5 );  
  context.stroke();
  context.restore();

  
}




/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 17/10/2012
 *
 * @class OpenTipCompositionEnd
 * @extends RelationEnd
 */
var OpenTipCompositionEnd = function() {}
JSFun.extend( OpenTipCompositionEnd, RelationEnd );

OpenTipCompositionEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();
    
  context.strokeStyle = color;
  context.fillStyle = '#000000';
  
  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.lineTo( 0, 0 );  
  context.fill();
  context.moveTo( -22.5, 5.5 );
  context.lineTo( -14, 0 );
  context.lineTo( -22.5, -5.5 );  
  context.stroke();
  context.restore();

  
}
