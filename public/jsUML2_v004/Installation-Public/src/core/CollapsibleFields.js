/**
 ** MODULE NAME: 
 **	  CollapsibleFields.js
 **
 ** DESCRIPTION:
 **   Represents a set of editable text fields that can be hidden by the user
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	001 - Apr 2013 - AAH - Fourth version release
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

//= require <SuperComponent>
//= require <TextBox>



/**
 * Representa un conjunto de campos de texto editables por el usuario
 * y que tienen la propiedad de plegarse y ocultarse por el usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class CollapsibleFields
 * @extends SuperComponent
 * @param {Boolean} visible Determina si el elementos será visible o no por defecto
 */
var CollapsibleFields = function( params ) {
  params = params || {};
  CollapsibleFields.baseConstructor.call( this, params );
  
  this.setMinHeight( 10 );
  
//  if( params.visible == false ) {
  if( params.visibleSubComponents == false ) {
    this.changeVisibility();
  }

}
JSFun.extend( CollapsibleFields, SuperComponent );



/**
 * Añade un campo de texto al componente con el valor pasado
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setValue
 * @param {String} value Valor del nuevo campo de texto
 */
/*
CollapsibleFields.prototype.setValue = function( value ) {
  this.addField( value );
}*/



/**
 * Permite añadir un campo de texto al componente con el valor pasado
 * como parámetro
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method addField
 * @param {String} value Valor del nuevo campo de texto
 */
CollapsibleFields.prototype.addField = function( value ) {
    var nt = this.newItem();
    nt.setDeletable();

    if( value ) {    
      nt.setValue( value );
    }

    this.addSubComponent( nt );
    this.notifyChange();

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
CollapsibleFields.prototype.newItem = function() {
  return new TextBox();
}


/**
 * Comprueba si el punto está sobre uno de los elementos de interacción
 * con el componente
 *
* @author Alejandro Arrabal Hidalgo
 * @update  10/12/2012
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} radius Radius where is checked
 * @return {Boolean} Si el punto está sobre alguno de los elementos
 */
CollapsibleFields.prototype.isOver = function( x, y,radius  ) {
	var r = radius || 0;
	if( Math.abs( x - ( this._getX() + 5) ) <= 6 + r
      && Math.abs( y - ( this._getY() + 5) ) <= 6 + r )
  {
    return true;
    
  }else if( this.visibilitySubComponents() &&
      Math.abs( x - ( this._getX() + this.getSuperWidth() - 5) ) <= 6 +r
      && Math.abs( y - ( this._getY() + 5) ) <= 6 + r )
  {
    return true;
  }
  return CollapsibleFields.base.isOver.call( this, x, y, r);
}

/**
 * Comprueba si el punto está sobre uno de los elementos de interacción
 * con el componente y en caso afirmativo, realizará las acciones pertinentes
 *
 * @author Martín Vega-leal Ordóñez/ Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 10/12/2012
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} radius Radius where is checked
 * @return {Boolean} Si el punto está sobre alguno de los elementos
 */
CollapsibleFields.prototype.select = function( x, y,radius  ) {
	var r = radius || 0;
	if( Math.abs( x - ( this._getX() + 5) ) <= 6 + r
      && Math.abs( y - ( this._getY() + 5) ) <= 6 + r )
  {
    this.changeVisibility();
    this.notifyChange();
    return true;
    
  }else if( this.visibilitySubComponents() &&
      Math.abs( x - ( this._getX() + this.getSuperWidth() - 5) ) <= 6 +r
      && Math.abs( y - ( this._getY() + 5) ) <= 6 + r )
  {
    this.addField();
    return true;
  }
  return CollapsibleFields.base.select.call( this, x, y);
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
CollapsibleFields.prototype.drawShape = function( context ) {
  
	if(!this._visible)
		return;

  CollapsibleFields.base.drawShape.call( this, context );
  

  var x = this.getPixelX();
  var y = this.getPixelY();
  
  context.save();
  context.fillStyle = '#ff0000';
  context.beginPath();

  if( this.visibilitySubComponents() ) {
    context.moveTo( x , y + 5 );
    context.lineTo( x + 10, y + 5 );
    context.lineTo( x + 5, y );
    context.closePath();
    context.fill();
    
    context.fillStyle = '#94dc91';
    context.beginPath();
    context.arc( this.getPixelX() + this.getSuperWidth() - 5 , this.getPixelY() + 5, 4, 0, Math.PI*2, true );
    context.closePath();
    context.fill();
    
    context.restore();
    
  } else {
    context.moveTo( x + 5 , y );
    context.lineTo( x + 5, y + 10 );
    context.lineTo( x + 10, y + 5 );
    context.closePath();
    context.fill();
    context.restore();
  }


}



/**
 * Dibuja el objeto en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
CollapsibleFields.prototype.draw = function( context ) {
  
	if(!this._visible)
		return;

  if( this.visibilitySubComponents() ) {
    context.save();
    
    context.beginPath();
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX() + this.getSuperWidth(), this.getPixelY() );
    
    context.stroke();
    context.restore();
  }
  
  CollapsibleFields.base.draw.call( this, context );

}
