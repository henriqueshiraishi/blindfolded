/**
 ** MODULE NAME: 
 **	  RelationLine.js
 **
 ** DESCRIPTION:
 **   Graphically defines the relation line.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **	  Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **     001 - Oct 2012 - AAH - Second version release
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

//= require <Point>



/**
 * Define la forma gráfica la linea de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class RelationLine
 */
var RelationLine = function() {}



/**
 * Dibuja la forma del trazado de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 * @param {Array} points Vector que contiene los puntos de la relación
 * @param {String} color Color de la linea en formato definido por CSS2
 */
RelationLine.prototype.draw = function( context, points, color ) {}



/**
 * Define una linea de trazo continuo
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 30/11/2010 / 10/10/2012
 *
 * @class SolidLine
 * @extends RelationLine
 */
var SolidLine = function() {}
JSFun.extend( SolidLine, RelationLine );



SolidLine.prototype.draw = function( context, points, color,width ) {
  var i;
  
  context.save();
  context.strokeStyle = color;
  context.lineWidth = width;

  context.beginPath();
  
  if(points[0])context.moveTo( points[0].pixelX(),  points[0].pixelY()  );
  
  for( i = 1; i < points.length; i++ )
    context.lineTo( points[i].pixelX(), points[i].pixelY() );
  context.stroke();
  
  context.restore();
}



/**
 * Define una linea de trazo discontinuo
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 30/11/2010 / 10/10/2012
 *
 * @class DashedLine
 * @extends RelationLine
 */
var DashedLine = function() {}
JSFun.extend( DashedLine, RelationLine );

DashedLine.prototype.draw = function( context, points, color,width ) {
  var i;
  
  context.save();
  context.strokeStyle = color;
  context.lineWidth = width;
  
  for( i = 0; i < points.length - 1; i++ ) {
    JSGraphic.dashedLine( context,
                          points[i].pixelX(),
                          points[i].pixelY(),
                          points[i+1].pixelX(),
                          points[i+1].pixelY(),
                          10 );
  }
  
  context.restore();

}
