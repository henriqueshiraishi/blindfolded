/**
 ** MODULE NAME: 
 **	  TextFields.js
 **
 ** DESCRIPTION:
 **   Component that represents a set of text fields without format that can be 
 **   edited by the user.
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **	  Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - May 2013 - AAH - Fourth version release
 ** 	000 - Feb 2011 - MVL - First version release
 **
 ** CONTACT INFO:
 ** 	José Raúl Romero, http://www.jrromero.net
 **
 ** NOTES:
 **
 ** LICENSE & DISCLAIMER:
 **    Copyright (C) 2013 The authors
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

//= require <SuperComponent>
//= require <TextBox>



/**
 * Representa un conjunto de campos de texto editables por el usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class TextFields
 * @extends SuperComponent
 */
var TextFields = function( params ) {
  params = params || {};
  TextFields.baseConstructor.call( this, params );
  
  this.setMinHeight( 10 );
  this.setMinWidth( 25 );
}
JSFun.extend( TextFields, SuperComponent );



/*
TextFields.prototype.setValue = function( value ) {
  this.addField( value );
}*/



/**
 * Comprueba si el punto indicado está sobre el componente
 *
* @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 30/11/2010 / 10/12/2012
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
  * @param {Number} radius Radius where is checked
 * @return {Boolean} Si el punto está sobre el componente
 */
TextFields.prototype.isOver = function( x, y,radius ) {
 var r = radius || 0;
  if( this._visible && 
			this.visibilitySubComponents() &&
      Math.abs( x - ( this._getX() + this.getWidth() - 5) ) <= 6 + r
      && Math.abs( y - ( this._getY() + 5) ) <= 6 +r )
  {
    return true;
  } else {
    return TextFields.base.isOver.call( this, x, y );
  }
}



/**
 * Comprueba que se ha pulsado sobre el componente en las coordenadas
 * indicadas y en caso afirmativo activa las acciones pertinentes
 *
* @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 10/12/2012
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} radius Radius where is checked
 * @return {Boolean} Si el punto está sobre el componente
 */
TextFields.prototype.select = function( x, y,radius  ) {
	var r = radius || 0;
	var compX = (this._orientation) ? (this._getX() + 5) : (this._getX() + this.getWidth() - 5);
	var compY = (this._orientation) ? (this._getY() + this.getHeight() - 5) : (this._getY() + 5);
  if( this.visibilitySubComponents() &&
      Math.abs( x - compX ) <= 6 +r 
      && Math.abs( y - compY - r) <= 6 +r )
  {

    this.addField();
    return true;
  } else {
    return TextFields.base.select.call( this, x, y, r );
  }
}



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo TextBox
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method newItem
 * @return {TextBox} Nuevo objeto del componente
 */
TextFields.prototype.newItem = function() {
  return new TextBox();
}



/**
 * Permite añadir un campo de texto al componente con el valor pasado
 * como parámetro
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method addField
 * @param {String} text Valor del nuevo campo de texto
 */
TextFields.prototype.addField = function( text ) {
    var nt = this.newItem();
    nt.setDeletable();
//    this.addSubComponent( nt );
    nt.setValue( text );
    this.addSubComponent( nt );
    this.notifyChange();
}



/**
 * Dibuja el contorno y los elementos interactuables del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextFields.prototype.drawShape = function( context ) {
  
	if(!this._visible)
		return;

  TextFields.base.drawShape.call( this, context );
  
  if( this.visibilitySubComponents() ) {
    context.save();
    
    context.fillStyle = '#94dc91';
    context.beginPath();
		if(this._orientation)
	    context.arc( this.getPixelX() + 5 , this.getPixelY() + this.getHeight() - 5, 4, 0, Math.PI*2, true );
		else
	    context.arc( this.getPixelX() + this.getWidth() - 5 , this.getPixelY() + 5, 4, 0, Math.PI*2, true );
    context.closePath();
    context.fill();
    
    context.restore();
  }
  
}



