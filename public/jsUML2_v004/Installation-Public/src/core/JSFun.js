/**
 ** MODULE NAME: 
 **	  JSFun.js
 **
 ** DESCRIPTION:
 **   Define static functions to aid in handling javascript elements,
 **   inheritance and type checking
 **
 ** DEVELOPED BY:
 **   Martin Vega-Leal Ordonez (MVL)
 **		Rafael Molina Linares (RML)
 **
 ** SUPERVISED BY:
 **		José Raúl Romero, PhD (Associate Professor, University of Córdoba, Spain)
 **
 ** HISTORY:
 ** 	000 - Feb 2011 - MVL - First version release
 **		001 - Sep 2011 - RML - Second version release
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
 * Define static functions to aid in handling javascript elements,
 * inheritance and type checking
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class JSFun
 */
var JSFun = {



  /**
   * Allowed to inherit a class from another previously defined
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method extend
   * @param {Object} subClass Class that inherits the properties
   * @param {Object} baseClass Base class in the inheritance
   */
  extend: function( subClass, baseClass) {
    function inheritance() {};
    inheritance.prototype = baseClass.prototype;

    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.base = baseClass.prototype;
  },
  
  

  /**
   * Check if the introduced object is of type number and is finite
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method isNumber
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is a number and is finite
   */
  isNumber: function( value ) {
    return typeof value === 'number' && isFinite( value );
  },
  
  

  /**
   * Check if the introduced object is of type string
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method isString
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is a string
   */
  isString: function( value ) {
    return typeof value === 'string';
  },



  /**
   * Check if the introduced object is of type array
   *
   * @author Rafael Molina Linares
   * @update 18/10/2011
   *
   * @method isArray
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is an array
   */
  isArray: function( value ) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },


  /**
   * Check if the introduced object is of type boolean
   *
   * @author Rafael Molina Linares
   * @update 18/10/2011
   *
   * @method isBoolean
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is an boolean
   */
  isBoolean: function( value ) {
    return typeof value === 'boolean';
  }
  
  
}




