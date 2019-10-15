/**
 ** MODULE NAME: 
 **	  JSGraphic.js
 **
 ** DESCRIPTION:
 **   Define static functions to aid in the design of graphic elements in HTML5 canvas
 **
 ** DEVELOPED BY:
 **	Alejandro Arrabal Hidalgo (AAH)
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 **	001 - Agu 2012 - AAH -
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



//= require <Point>



/**
 * Constructor de la clase JSGraphic
 * Define funciones estáticas para la ayuda en el dibujo de elementos
 * gráficos en canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class JSGraphic
 */
var JSGraphic = {
  
  
  
  /**
   * Adapta un valor numerico al más cercano que se adapte a la posición
   * dentro de un pixel
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method toPixel
   * @param {Number} x Posición que se adaptará
   * @return {Number} Posición más cercana al interior exacto de un píxel
   */
  toPixel: function( x ) {
    return parseInt( x ) + 0.5;
  },
  
  
  
  /**
   * Dibuja una linea discontinua entre dos puntos, el margen de dicontinuidad
   * se puede definir
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method dashedLine
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x1 Coordenada del eje X del primer punto
   * @param {Number} y1 Coordenada del eje Y del primer punto
   * @param {Number} x2 Coordenada del eje X del segundo punto
   * @param {Number} y2 Coordenada del eje Y del segundo punto
   * @param {Number} size Distancia entre fragmentos discontinuos
   */
  dashedLine: function( context, x1, y1, x2, y2, size ) {
    
    var divisions = Math.sqrt( (x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 ) ) / size;
    divisions = divisions/2 - 1;

    var angle = Math.abs( Math.atan2( y2 - y1 , x2 - x1 ) );
    var incx = Math.cos( angle ) * size;
    var incy = Math.sin( angle ) * size;  
    
    var x = x1;
    var y = y1;

    if( y2 < y1 )
      incy = - incy;

    context.beginPath();
    for( var i=0; i < divisions; i++ ) {
      context.moveTo( x, y );

      x += incx;
      y += incy;
      context.lineTo( x, y );

      x += incx;
      y += incy;
    }

    context.moveTo( x, y );  
    x += incx;
    y += incy;
    
    if( (incx > 0 && x > x2) || (incx < 0 && x < x2) )
      x = x2;
    if( (incy > 0 && y > y2) || (incy < 0 && y < y2) )
      y = y2;
      
    context.lineTo( x, y );
    context.stroke();
  },
  
  

  /**
   * Calcula el punto de intersección entre dos rectas, dados dos puntos
   * de cada una de ellas
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method lineIntersection
   * @param {Number} x1 Coordenada del eje X de un punto de la primera recta
   * @param {Number} y1 Coordenada del eje Y de un punto de la primera recta
   * @param {Number} x2 Coordenada del eje X de otro punto de la primera recta
   * @param {Number} y2 Coordenada del eje Y de otro punto de la primera recta
   * @param {Number} x3 Coordenada del eje X de un punto de la segunda recta
   * @param {Number} y3 Coordenada del eje Y de un punto de la segunda recta
   * @param {Number} x4 Coordenada del eje X de otro punto de la segunda recta
   * @param {Number} y4 Coordenada del eje Y de otro punto de la segunda recta
   * @return {Point} Punto de intersección entre las dos rectas
   */
  lineIntersection: function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    var a1 = y2 - y1;
    var b1 = x1 - x2;
    var c1 = - b1 * y1 - a1 * x1;
    
    var a2 = y4 - y3;
    var b2 = x3 - x4;
    var c2 = - b2 * y3 - a2 * x3;
    
    var x, y;
    
    if( x1 == x2 ) {
      x = x1;
      y = - ( c2 + a2 * x ) / b2;
    } else if( y1 == y2 ) {
      y = y1;
      x = - ( c2 + b2 * y ) / a2;
    }else if( x3 == x4 ) {
      x = x3;
      y = - ( c1 + a1 * x ) / b1;
    } else if( y3 == y4 ) {
      y = y3;
      x = - ( c1 + b1 * y ) / a1;
    }else {
      var h = - b1 / b2;
      x =  - ( h * c2 + c1 ) / ( a1 + h * a2 );
      y = - ( c1 + a1 * x ) / b1;
    }

    return new Point( x, y );
  },
  
  
  
  /**
   * Define el trazo de una elipse sobre el lienzo de dibujo
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method ellipse
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro de la elipse
   * @param {Number} y Coordenada Y del centro de la elipse
   * @param {Number} h Semieje mayor de la elipse
   * @param {Number} v Semieje menor de la elipse
   */
  ellipse: function( context, x, y, h, v ) {
    var C = 0.5522847498307933;
    var ch = C * h;
    var cv = C * v;

    context.beginPath();
    context.moveTo( x - h, y );
    context.bezierCurveTo( x - h , y - cv, x - ch, y - v,  x, y - v );
    context.bezierCurveTo( x + ch, y - v, x + h , y - cv, x + h, y );
    context.bezierCurveTo( x + h, y + cv, x + ch , y + v, x, y + v );
    context.bezierCurveTo( x - ch, y + v, x - h , y + cv, x - h, y );
  },
  
  

  /**
   * Define el trazo de un rombo sobre el lienzo de dibujo
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method rhombus
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro de la elipse
   * @param {Number} y Coordenada Y del centro de la elipse
   * @param {Number} width Diagonal horizontal del rombo
   * @param {Number} height Diagonal vertical del rombo
   */
  rhombus: function( context, x, y, width, height ) {
    context.beginPath();
    context.moveTo( x, y + height/2 );
    context.lineTo( x + width/2, y );
    context.lineTo( x + width, y + height/2 );
    context.lineTo( x + width/2, y + height );
    context.closePath();
  },
  
  
  /**
   * Define el trazo de un triangulo sobre el lienzo de dibujo
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/08/2012
   *
   * @method triangle
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro del triangulo
   * @param {Number} y Coordenada Y del centro del triangulo
   * @param {Number} width longitud horizontal del triangulo
   * @param {Number} height altura vertical del triangulo
   * @param {Number} direction Direccion en el sentido de las agujas del reloj (0: Arriba,1:Derecha...)
   */
  triangle: function( context, x, y, width, height, direction ) {
    context.beginPath();
    switch(direction){
    case 0:
        context.moveTo( x, y + height/2 );
        context.lineTo( x + width/2, y );
        context.lineTo( x + width, y + height/2 );
    	break;
    case 1:
        context.moveTo( x + width/2, y );
        context.lineTo( x + width, y + height/2 );
        context.lineTo( x + width/2, y + height );
    	break;
    case 2:
        context.moveTo( x, y + height/2 );
        context.lineTo( x + width, y + height/2 );
        context.lineTo( x + width/2, y + height );
    	break;
    default:
        context.moveTo( x, y + height/2 );
    	context.lineTo( x + width/2, y );
    	context.lineTo( x + width/2, y + height );
    	break;
    }

    context.closePath();
  },
  
  
  
  
  /**
   * Calcula el punto de intersección entre una elipse y la recta formada
   * por un punto y el centro de la elipse
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method ellipseIntersection
   * @param {Number} cx Coordenada del eje X del centro de la elipse
   * @param {Number} cy Coordenada del eje Y del centro de la elipse
   * @param {Number} a Semieje mayor de la elipse
   * @param {Number} b Semieje menor de la elipse
   * @param {Number} ax Coordenada del eje X de un punto de la recta
   * @param {Number} ay Coordenada del eje Y de un punto de la recta
   * @return {Point} Punto de intersección
   */
  ellipseIntersection: function( cx, cy, a, b, ax, ay) {
    var m = (ay - cy ) / (ax - cx );

    var incx = 0;
    var incy = 0;
    
    var aux;
    
    if( a > 0 && b > 0 )
      incx = Math.sqrt( 1 / ( 1/(a*a) + (m*m)/(b*b) ) );

    aux = (1 - (incx*incx)/(a*a) )*(b*b);
    if( a > 0 &&  aux >= 0 )
      incy = Math.sqrt( aux );

    if( ax < cx )
      incx = - incx;
      
    if( ay < cy )
      incy = - incy;
    
    return new Point( cx + incx, cy + incy ); 
  }//,
  
  
  
}
