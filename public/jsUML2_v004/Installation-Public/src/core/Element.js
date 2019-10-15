/**
 ** MODULE NAME: 
 **	  Element.js
 **
 ** DESCRIPTION:
 **   Represents all objects drawn in a diagram
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



//= require <Point>


/**
 * Interfaz Element
 * Representa todo objeto representable en un diagrama
 *
 * @author Martín Vega-leal Ordóñez
 * @update 5/10/2010
 *
 * @class Element
 */
var Element = function() {}



/**
 * Comprueba que se ha pulsado sobre el elemento en las coordenadas
 * indicadas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method select
 * @param {Number} x Coordenada x
 * @param {Number} y Coordenada y
 * @return {Boolean} Si el punto está sobre el elemento
 */
Element.prototype.select = function( x, y ) { return false; }



/**
 * Deselecciona el elemento y cierra toda interación abierta
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method deselect
 */
Element.prototype.deselect = function() {}



/**
 * Realiza las acciones necesarias causadas por el arrastre del ratón
 * por parte de un usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drag
 * @param {Number} x Coordenada x de la nueva posición
 * @param {Number} y Coordenada y de la nueva posición
 */
Element.prototype.drag = function( x, y ) {}



/**
 * Realiza las acciones necesarias cuando el usuario suelta el
 * ratón que tenía pulsado en la posición indicada
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drop
 * @param {Number} x Coordenada x de la posición
 * @param {Number} y Coordenada y de la posición
 */
Element.prototype.drop = function( x, y ) {}



/**
 * Dibuja completamente el elemento en el lienzo canvas,
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Element.prototype.draw = function( context ) {}



/**
 * Dibuja la silueta del elemento
 * Esta función se activa para representar el desplazamiento de los objetos
 * por el lienzo de dibujo cuando son desplazados o se modifica su tamaño
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Element.prototype.drawShape = function( context ) {}



/**
 * Comprueba si el punto indicado está sonbre el elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
 * @return {Boolean} Si el punto está sobre el nodo
 */
Element.prototype.isOver = function( x, y ) { return false; }



/**
 * Almacena una referencia al diagrama al que pertenece el elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method setDiagram
 * @param {Diagram} diagram Diagrama al que pertenece
 */
Element.prototype.setDiagram = function( diagram ) {}



/**
 * Devuelve el padre del elemento, en caso de no tener,
 * devuelve null
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getParent
 * @return {Node} Nodo padre, si tiene uno asignado
 */
Element.prototype.getParent = function() { return null; }



/**
 * Devuelve el punto central del elemento
 * Este punto sirver para calcular las lineas de las relaciones entre elementos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getCentralPoint
 * @return {Point} Coordenadas del punto central del elemento
 */
Element.prototype.getCentralPoint = function() { return new Point(); }



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la forma del elemento
 * Este punto sirver para calcular las lineas de las relaciones entre elementos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes del nodo
 */
Element.prototype.getLinkCentered = function( x, y ) { return new Point(); }



 /**
 * Recibe un nodo xml con la información del elemento y recupera los datos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Nodo xml con la información del elemento
 */
Element.prototype.setElementXML = function( xmlnode ) { }



/**
 * Genera un nodo XML con la información referente al elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getElementXML
 * @param {DOMNode} parent Nodo padre del árbol xml que se generará
 * @return {DOMNode} Nodo xml con la información referente al elemento
 */
Element.prototype.getElementXML = function( parent ) { return ""; }
