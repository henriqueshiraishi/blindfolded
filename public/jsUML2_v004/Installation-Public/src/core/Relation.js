/**
 ** MODULE NAME: 
 **	  Relation.js
 **
 ** DESCRIPTION:
 **   Class that represents a relationship between two elements in the diagram.
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
 **     003 - May 2013 - AAH - Fourth version release
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


//= require <Point>
//= require <Element>
//= require <RelationLine>
//= require <RelationEnd>
//= require <Component>



var RelationStyle = {
  shape_color: '#000000'
  //line_color: '#000000'
}



/**
 * Class that represent a relation between two elements of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Relation
 * @extends Element
 * @param {Element} a First element of the relation
 * @param {Element} b Second element of the relation
 */
var Relation = function( params ) {
  params = params || {};

  this._id = 0;
  this._type = 'untyped';
  this._line_color= '#000000';
  this._line_width=1.25;
  this._points = [ new Point(), new Point() ];
  
  this._selected = -1;
  this._selectedBefore = false;
  this._moved = false;
  this._activeComponent = null;

  
  this._selectedLine = false;
  this._selectedPoint = false;
  
  /* defined if use
  this._line = null;
  this._end = null;
  this._start = null;
  */
  this._components = [];
  this._relations = [];
  /* defined if use
  this._name = null;
  this._stereotype = null;
  this._roleA = null;
  this._roleB = null;
  this._multiA = null;
  this._multiB = null;
  */ 
  this._diagram = null;
  this.setElements( params.a, params.b );

}
JSFun.extend( Relation, Element );



/**
 * Define the elements of the relation.
 * It is used when the elements hasn't given in the constructor.
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
Relation.prototype.setElements = function( elemA, elemB ) {
  if( elemA instanceof Element && elemB instanceof Element ) {
  
    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }
    
    if( this._elemA ) {
      this._elemA.delRelation( this );
    }
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }
    
    this._elemA = elemA;
    this._elemB = elemB;
    
    this._elemA.addRelation( this );
    this._elemB.addRelation( this );

    this.updateParent();
    this._calculateLineEnds();


 
    return true;
  
  } else { 
    return false;
  }
}



/**
 * Defines the first elemet of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/12/2010
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 * @return {Boolean} If the assign of the new element has been produced
 */
Relation.prototype.setElementA = function( elem ) {
  if( elem instanceof Element ) {

    if( elem instanceof Relation && this._elemB instanceof Relation ) {
      return false;
    }

    if( this._elemA ) {
      this._elemA.delRelation( this );
    }

    this._elemA = elem;
    this._elemA.addRelation( this );
    this.updateParent();

    return true;
  } else { 
    return false;
  }
}



/**
 * Defines the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/12/2010
 *
 * @method setElementB
 * @param {Element} elem Second element of the relation
 * @return {Boolean} if the assign of the new element has been produced
 */
Relation.prototype.setElementB = function( elem ) {
	//alert((elem instanceof Element));
  if( elem instanceof Element ) {
    
    if( elem instanceof Relation && this._elemA instanceof Relation ) {
      return false;
    }

    if( this._elemB ) {
      this._elemB.delRelation( this );
    }

    this._elemB = elem;
    this._elemB.addRelation( this );
    this.updateParent();


    return true;
    
  } else {
    return false;
  }
}



/**
 * Modify the component's value of the relation, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component within the relation
 * @param {String} value Text that will be assigned to the component
 */
Relation.prototype.setValue = function( id, value ) {
  var i;
  
  for( i in this._components ) {
    if( this._components[i].getId() == id ) {
      this._components[i].setValue( value );
      
      this._updateComponents();
      return;    
    }
  }

}



/**
 * Adds a value to component of the relation, if exist. This component
 * should can container multiple values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component within the relation
 * @param {String} value Text that will be added to the component
 */
Relation.prototype.addValue = function( id, value ) {
  var i;
  
  for( i in this._components ) {
    if( this._components[i] instanceof SuperComponent && this._components[i].getId() == id ) {
      this._components[i].addField( value );
      
      this._updateComponents();
      return;    
    }
  }


}



/**
 * Generates a XML node with the information of the relation
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 10/10/2012
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the relation
 */
Relation.prototype.getElementXML = function( parent ) {

  //storing the type and id of the element in the xmlnode
  var xmlnode = parent.createElement( this.getType() );
  xmlnode.setAttribute( 'id', this.getId() );

  //storing the final elements of the relation in the xmlnode
  xmlnode.setAttribute( 'side_A', this._elemA.getId() );
  xmlnode.setAttribute( 'side_B', this._elemB.getId() );
  
  //storing the points of the relation in the xmlnode
  var i;
  for( i = 0; i < this._points.length; i++ ) {
    var pointnode = parent.createElement( 'point' );
    pointnode.setAttribute( 'x', this._points[i].getX() );
    pointnode.setAttribute( 'y', this._points[i].getY() );
    xmlnode.appendChild( pointnode );
  }
  
  //storing the components of the relation in the xmlnode
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }
  
  //storing the style properties and direction of the relation in the xmlnode,
  //in case of they don't are the default ones(in order to save space)
  if(this.getLineColor()!= '#000000')xmlnode.setAttribute( 'color', this.getLineColor() );
  if(this.getLineWidth()!= 1.25)xmlnode.setAttribute( 'width', this.getLineWidth() );
  if(this._lineStyleChanged)xmlnode.setAttribute( 'style', this.getLineStyle() );
  if(this.getDirection()!='none')xmlnode.setAttribute( 'direction', this.getDirection() );
  return xmlnode;
}



/**
 * Receives a xml node with the information of the relation and get it back 
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 10/10/2012
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
 */
Relation.prototype.setElementXML = function( xmlnode, ids ) {
  //setting the type and id of the element from xmlnode
  var idElemA = xmlnode.getAttribute( 'side_A' );
  var idElemB = xmlnode.getAttribute( 'side_B' );

  //setting the final elements of the relation from xmlnode 
  this.setElements( ids[ idElemA ], ids[ idElemB ] );
  
  
  var i;
  var childs = xmlnode.childNodes;

  var p = 0;
  //setting the points of the relation from xmlnode 
  for( i = 0; i < childs.length; i++ ) {
	 if( childs[i].nodeName == 'point' ) {
      this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                   parseInt( childs[i].getAttribute( 'y' ) )
                                  );
      p++;
    }
  }
  //setting the components and  the supercomponents of the relation from xmlnode 
  for( i = 0; i < childs.length; i++ ) {
	 if( childs[i].nodeName == 'item' ) {
      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );
      
    } else if( childs[i].nodeName == 'superitem' ) {
    
      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }
    
  }
  
  //setting the style properties and direction of the relation form the xmlnode,
  //in case of they wasn't defined the default ones are taken
  var color=xmlnode.getAttribute( 'color');
  if( color)this.setLineColor(color);
  var width=xmlnode.getAttribute('width');
  if(width)this.setLineWidth(width);
  var style=xmlnode.getAttribute( 'style');
  if(style){
	  this.setLineStyle(style);
  }
  var direction=xmlnode.getAttribute( 'direction');
  if(direction)this.setDirection(direction);
  
  this._updateComponents();

}



/**
 * Assigns a id number to the relation within a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {String} value Chain of id
 */
Relation.prototype.setId = function( value ) {
  this._id = this.getType() + '_' + value;
}



/**
 * Returns the id of the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/	5/11/2013
 *
 * @method getId
 * @return {String} Chain of id of the relation within the diagram
 */
Relation.prototype.getId = function() {
	return this._diagram.getId()+':'+this._id;
}



/**
 * Assigns a type to the relation. This type will be the way to 
 * determine the class ame of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value Type of the relation. Identifies the class of the relation
 */
Relation.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the type of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} Type of the relation. Identifies the class of the relation
 */
Relation.prototype.getType = function() {
  return this._type;
}



/**
 * Adds a relation to the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addRelation
 * @param {Relation} rel Relation to which belong
 */
Relation.prototype.addRelation = function( rel ) {
  if( rel instanceof Relation ) {
    this._relations.push( rel );
  }
}



/**
 * Deletes a relation to which this belonged
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delRelation
 * @param {Relation} rel Relation that will be remove
 */
Relation.prototype.delRelation = function( rel ) {
  var i;
  
  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
      break;
    }
  }
  
}



/**
 * Stored a reference to the diagram to which the relation belong
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setDiagram
 * @param {Diagram} ndiagram Diagram to which the relation belong
 */
Relation.prototype.setDiagram = function( ndiagram ) {
  if( ndiagram instanceof Diagram ) {
    this._diagram = ndiagram;
  }
}



/**
 * Adds a component to the relatio
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addComponent
 * @param {Component} ncomp New component for the relation
 */
Relation.prototype._addComponent = function( ncomp ) {
  ncomp.setParent( this );
  this._components.push( ncomp );
  this._updateComponents();
 
}



/**
 * Delete a component of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _delComponent
 * @param {Component} dcomp Component that will be remove
 */
Relation.prototype._delComponent = function( dcomp ) {
  var i;
  
  for( i in this._components ) {
    if( this._components[i] == dcomp ) {
      this._components.splice( i, 1 );
      break;
    }  
  }
  
}



/**
 * Sets a new name for the relation. For this, this name will 
 * be assigned to the specified component for this function
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentName
 * @param {String} newName New name for the relation
 */
Relation.prototype.setComponentName = function( newName ) {
  if( !this._name ) {
    this._name = new TextBox({ id: 'name', text: newName });
    this._addComponent( this._name );
  } else {
    this._name.setText( newName );
  }
}



/**
 * Sets a new stereotypes for the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setStereotype
 * @param {String} stereotype New stereotypes for the relation
 */
Relation.prototype.setStereotype = function( stereotype ) {

  this._stereotype = new Text({ id: 'stereotype', text: stereotype });
  this._addComponent( this._stereotype );
}



/**
 * Adds a component Stereotype to the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addComponentStereotype
 * @param {String} stereotype New stereotype for the relation
 */
Relation.prototype.addComponentStereotype = function( stereotype ) {
  if( !this._stereotype ) {

    this._stereotype = new StereotypeFields({ id: 'stereotype', width: 100, text: stereotype });
    this._addComponent( this._stereotype );
  }
}



/**
 * Assigns the value of the rol for the first element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentRoleA
 * @param {String} rol New rol of the relation
 */
Relation.prototype.setComponentRoleA = function( rol ) {
  if( !this._roleA ) {
    this._roleA = new RoleItem({ id: 'roleA', text: rol, margin: 4 });
    this._addComponent( this._roleA );  
  } else {
    this._roleA.setText( rol );
  }
}



/**
 * Assigns the value of the rol for the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentRoleB
 * @param {String} rol New rol of the relation
 */
Relation.prototype.setComponentRoleB = function( rol ) {  
  if( !this._roleB ) {
    this._roleB = new RoleItem({ id: 'roleB', text: rol, margin: 4 });
    this._addComponent( this._roleB );
  } else {
    this._roleB.setText( rol );
  }
}



/**
 * Assigns the value of multiplicity for the first element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentMultiplicityA
 * @param {String} multi New value of multiplicity of the relation
 */
Relation.prototype.setComponentMultiplicityA = function( multi ) {
  if( !this._multiA ) {
    this._multiA = new TextBox({ id: 'multiplicityA', text: multi, margin: 4 });
    this._addComponent( this._multiA );
  } else {
    this._multiA.setText( multi );
  }
}



/**
 * Assigns the value of multiplicity for the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentMultiplicityB
 * @param {String} multi New value of multiplicity of the relation
 */
Relation.prototype.setComponentMultiplicityB = function( multi ) {
  if( !this._multiB ) {
    this._multiB = new TextBox({ id: 'multiplicityB', text: multi, margin: 4 });
    this._addComponent( this._multiB );
  } else {
    this._multiB.setText( multi );
  }
}



/**
 * Updates the position of the components of the relation, if exist. 
 * This components can be the name, stereotypes, roles and 
 * multiplicities of the relation 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _updateComponents
 * @private
 */
Relation.prototype._updateComponents = function() {
  if( ! ( this._elemA && this._elemB ) ) {
    return;
  }

  var len = this._points.length;
  var central = parseInt( len / 2 ) - 1;

  /***
  Rol A update position
  *******/
  if( this._roleA ) {
    var ax = this._points[0].getX();
    var ay = this._points[0].getY();
    var bx = this._points[1].getX();
    var by = this._points[1].getY();

    if( this._elemA instanceof Relation ) {
      this._roleA.setCoordinates( ax, ay - this._roleA.getHeight() );
    
    } else {
        
      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );
          
      var width = this._roleA.getWidth()
      var height = this._roleA.getHeight();
    
      var movx;
      var movy;
      if( ax == this._elemA.getX() ) {
        movx = - width;
        
        if( by < ay ) {
          movy = - height - tang * width;       
        } else {
          movy = - height;
        }
        
      } else if( ax == this._elemA.getX() + this._elemA.getWidth() ) {
        movx = 0;
        if( by < ay ) {
          movy = - height + tang * width;
        } else {
          movy = - height;
        }
        
      } else if( ay == this._elemA.getY() ) {
        movy = - height;
        if( bx < ax ) {
          movx = - width - height / tang;
        } else {
          movx = - width;
        }    
        
      } else if( ay == this._elemA.getY() + this._elemA.getHeight() ) {
        movy = 0;
        if( bx < ax ) {
          movx = - width + height / tang;
        } else {
          movx = - width;
        }   
      }
      
      this._roleA.setCoordinates( ax + movx, ay + movy );
    
    }
  }

  
  /***
  Rol B update position
  *******/    
  if( this._roleB ) {

    var ax = this._points[ len - 1 ].getX();
    var ay = this._points[ len - 1 ].getY();
    var bx = this._points[ len - 2 ].getX();
    var by = this._points[ len - 2 ].getY();
    

    if( this._elemB instanceof Relation ) {
      this._roleB.setCoordinates( ax, ay - this._roleB.getHeight() );

    } else {
    
      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );
          
      var width = this._roleB.getWidth()
      var height = this._roleB.getHeight();
    
      var movx;
      var movy;
      
      if( ax == this._elemB.getX() ) {
        movx = - width;
        
        if( by < ay ) {
          movy = - height - tang * this._roleB.getWidth();       
        } else {
          movy = - height;
        }
        
      } else if( ax == this._elemB.getX() + this._elemB.getWidth() ) {
        movx = 0;
        if( by < ay ) {
          movy = - height + tang * this._roleB.getWidth();
        } else {
          movy = - height;
        }
        
      } else if( ay == this._elemB.getY() ) {
        movy = - height;
        if( bx < ax ) {
          movx = - width - this._roleB.getHeight() / tang;
        } else {
          movx = - width;
        }    
        
      } else if( ay == this._elemB.getY() + this._elemB.getHeight() ) {
        movy = 0;
        if( bx < ax ) {
          movx = - width + this._roleB.getHeight() / tang;
        } else {
          movx = - width;
        }   
      }
      
      this._roleB.setCoordinates( ax + movx, ay + movy );
    }
    
  }
  


  /***
  Multiplicity A update position
  *******/    
  if( this._multiA ) {

    var ax = this._points[0].getX();
    var ay = this._points[0].getY();
    var bx = this._points[1].getX();
    var by = this._points[1].getY();
    
    
    if( this._elemA instanceof Relation ) {
      this._multiA.setCoordinates( ax, ay);
    
    } else {
    
      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );
          
      var width = this._multiA.getWidth()
      var height = this._multiA.getHeight();
    
      var movx = 0;
      var movy = 0;
      
      var cx = this._elemA.getX() + this._elemA.getWidth() / 2;
      var cy = this._elemA.getY() + this._elemA.getHeight() / 2;
      
      var relx = ax - cx;
      var rely = ay - cy;  
      var m = ( this._elemA.getHeight() / this._elemA.getWidth() );
   

      if( relx < 0 ) {
        //top-left
        if( rely < 0 ) {
          if( rely > m * relx ) {
            movx = - width;
            movy = 0;
          
          } else {
            movx = 0;
            movy = - height;
          }
          
        //bottom-left
        } else {
          if( rely >  ( - m ) * relx ) {
            movx = 0;
            movy = 0;
          } else {
            movx = - width;
            movy =  - tang * width;
          }
        }

      } else {
      
        //top-rigth
        if( rely < 0 ) {
          if( rely <  ( - m ) * relx ) {
            movx = - height / tang;
            movy = - height;
          } else {
            movx = 0;
            movy = 0;          
          }
        //bottom-right
        } else {
          if( rely <  m * relx ) {
            movx = 0;
            movy = tang * width;
          } else {
            movx = height / tang;
            movy = 0;
          }   
        }
      
      }
      
      this._multiA.setCoordinates( ax + movx, ay + movy );

    }
    
  }
  

  /***
  Multiplicity B update position
  *******/    
  if( this._multiB ) {
    
    var ax = this._points[ len - 1 ].getX();
    var ay = this._points[ len - 1 ].getY();
    var bx = this._points[ len - 2 ].getX();
    var by = this._points[ len - 2 ].getY();
    
    
    if( this._elemB instanceof Relation ) {
      this._multiB.setCoordinates( ax, ay);
    
    } else {
    
      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );
          
      var width = this._multiB.getWidth()
      var height = this._multiB.getHeight();
    
      var movx = 0;
      var movy = 0;
      
      var cx = this._elemB.getX() + this._elemB.getWidth() / 2;
      var cy = this._elemB.getY() + this._elemB.getHeight() / 2;
      
      var relx = ax - cx;
      var rely = ay - cy;  
      var m = ( this._elemB.getHeight() / this._elemB.getWidth() );
   

      if( relx < 0 ) {
        //top-left
        if( rely < 0 ) {
          if( rely > m * relx ) {
            movx = - width;
            movy = 0;
          
          } else {
            movx = 0;
            movy = - height;
          }
          
        //bottom-left
        } else {
          if( rely >  ( - m ) * relx ) {
            movx = 0;
            movy = 0;
          } else {
            movx = - width;
            movy =  - tang * width;
          }
        }

      } else {
      
        //top-rigth
        if( rely < 0 ) {
          if( rely <  ( - m ) * relx ) {
            movx = - height / tang;
            movy = - height;
          } else {
            movx = 0;
            movy = 0;          
          }
        //bottom-right
        } else {
          if( rely <  m * relx ) {
            movx = 0;
            movy = tang * width;
          } else {
            movx = height / tang;
            movy = 0;
          }   
        }
      
      }
    
      this._multiB.setCoordinates( ax + movx, ay + movy );
      
    }
  }
  

  /***
  Stereotype and Name update position
  *******/    

  var ax = this._points[central].getX();
  var ay = this._points[central].getY();
  var bx = this._points[central + 1].getX();
  var by = this._points[central + 1].getY();

  if( len % 2 != 0 ) {
    var cx = bx;
    var cy = by;
  } else {
    var cx = (ax + bx ) / 2;
    var cy = (ay + by ) / 2 ;
  }

  
  if( this._stereotype ) {  
    if( ax > bx && ay < by || bx > ax && by < ay ) {
      if( this._name ) {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth(), cy - this._stereotype.getHeight() - this._name.getHeight() );
      } else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth(), cy - this._stereotype.getHeight() );
      }      
    } else {
      if( this._name ) {
        this._stereotype.setCoordinates( cx , cy - this._stereotype.getHeight() - this._name.getHeight() );
      } else {
        this._stereotype.setCoordinates( cx , cy - this._stereotype.getHeight() );
      }   
    }
    
    
    if( this._stereotype instanceof SuperComponent ) {
      this._stereotype.updateComponents();
    }
    
  }
  
  if( this._name ) {  
    if( ax > bx && ay < by || bx > ax && by < ay ) {
      this._name.setCoordinates( cx - this._name.getWidth(), cy - this._name.getHeight() );
    } else {
      this._name.setCoordinates( cx , cy - this._name.getHeight() );
    }
  }

}



/**
 * Draws the value of the components of the relation in the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawComponents
 * @private
 * @param {CanvasRenderingContext2D} context Context of draw of the canvas element
 */
Relation.prototype._drawComponents = function( context ) {
  var i;
  
  for( i = 0; i < this._components.length; i++ ) {
    this._components[i].draw( context );
  }
}



/**
 * Draws the border of the components of the relation in the canvas element.
 * This method is normally used for the movement of the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawComponentsShape
 * @private
 * @param {CanvasRenderingContext2D} context Context of draw of the canvas element
 */
Relation.prototype._drawComponentsShape = function( context ) {
  var i;
 
  for( i = 0; i < this._components.length; i++ ) {
    this._components[i].drawShape( context );
  }
}



/**
 * Checks if the element belong the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isLinked
 * @param {Element} obj Element that will be checked
 * @return {Boolean} If the element belong the relation or not
 */
Relation.prototype.isLinked = function( obj ) {
  if( obj instanceof Element && ( this._elemA == obj || this._elemB == obj ) )
    return true;
  else
    return false;
}



/**
 * Checks if the given point is found between two point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _selectLine
 * @private
 * @param {Point} pointA A point of the relation
 * @param {Point} pointB The next poit of the relation
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @param {Number} margin Margin around of the line
 * @return {Boolean} If the point is within the line
 */
Relation.prototype._selectLine = function( pointA, pointB, x, y, margin ) {

  if( !(pointA instanceof Point && pointB instanceof Point) )
    return false;
   
    
  var margin = margin || 5;
  
  var x1 = pointA.getX();
  var y1 = pointA.getY();
  var x2 = pointB.getX();
  var y2 = pointB.getY();
  
  var maxx, maxy, minx, miny;
  
  if( x1 > x2 ) {
    maxx = x1;
    minx = x2;
  } else {
    maxx = x2;
    minx = x1;
  }
  
  if( y1 > y2 ) {
    maxy = y1;
    miny = y2;
  } else {
    maxy = y2;
    miny = y1;
  }

  if( x1 == x2 ) {
    if( y <= maxy && y >= miny && x >= minx - margin && x <= minx + margin ) {
      return true;
    }      
  
  } else {
  
    var m, angle, ampx, ampy;

    m = ( y2 - y1 ) / ( x2 - x1 );
    angle = Math.atan( ( y2 - y1 ) / ( x2 - x1 ) );
    ampx = Math.abs( Math.sin( angle ) * margin );
    ampy = Math.abs( Math.cos( angle ) * margin );
    
    if( x >= minx - ampx && x <= maxx + ampx && y >= miny - ampy && y <= maxy + ampy ) {
      var diff, gap;
      
      diff = ( x - x1 ) * m + y1;
      gap = Math.abs( y - diff );
      gap = Math.cos( angle ) * gap;
      
      if( gap <= margin ) {
        return true;
      }
    
    }
  }
  
  return false;
}



/**
 * Checks if the given point is over a component of the relation
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 10/12/2012
 *
 * @method _isOverComponent
 * @private
 * @param {Number} x Coordinate x of point to check 
 * @param {Number} y Coordinate y of poit to check
 * @param {Number} radius Radius where check the point 
 * @return {Boolean} If the point is over the component
 */
Relation.prototype._isOverComponent = function( x, y, radius ) {
  var i;
  var r= radius || 0;
  for( i = 0; i < this._components.length; i++ ) {
    if( this._components[i].isOver( x, y, r ) ) {
      return true;
    }
  }
  
  return false;
}



/**
 * Deselects a component so that closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _deselectComponent
 * @private
 */
Relation.prototype._deselectComponent = function() {
  if( this._activeComponent ) {
    this._activeComponent.deselect();
    this._activeComponent = null;
  }
}



/**
 * Checks if the given point is over a component of the relation and, 
 * in affirmative case, selects it 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _selectComponent
 * @private
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y if the point to check
 */
Relation.prototype._selectComponent = function( x, y ) {
  var i;
  
  for( i = 0; i < this._components.length; i++ ) {
    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  }

}



/**
 * Checks if the given point is over the line of the relation
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 01/02/2013
 *
 * @method isOver
 * @param {Number} x Coordiate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @param {Number} radius Radius where check the point 
 * @return {Boolean} If the point is over the relation
 */
Relation.prototype.isOver = function( x, y, radius ) {
  var i;
  var r=radius || 0;
  //checks if the given point are close to one of the relation's points 
  for( var i = 0; i < this._points.length - 1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, r ) ) {
      return true;
    }
  }
  
  return false;
}



/**
 * Checks if the given point is over some element of the relation and, 
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 20/01/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
Relation.prototype.select = function( x, y ) {
  this._deselectComponent();
  //change the radius to a bigger one for touch devices
  var radius= ( this._diagram._touch) ? 6 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();  
}


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
      this._component=false;
      return true;
    }
  }
    if( this._selected > -1 ) {
    	
      // you have clicked or touched on one component 	
      if( this._isOverComponent( x, y, radius ) ) {
            this._selectedBefore = true;   
            this._component=true;
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
        this._component=false;
        //Add new point to the relation
        this._points.splice( this._selected + 1, 0, new Point(x,y) );
        return true;
      }
    }
    


  return false;
}



/**
 * Perfoms the actions necessary for a movement of the mouse to the 
 * given position by the parameters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drag
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 */
Relation.prototype.drag = function( x, y ) {
  if( this._selectedLine ) {
		if(this._elemA == this._elemB){
			this._selected = 2;
	    this._points[ this._selected ].setPoint(x, y);
		} else {
	    this._points[ this._selected + 1 ].setPoint(x, y);
		}
    this._moved = true;
    
  } else if( this._selectedPoint ) {
		if(this._elemA == this._elemB){
           
			if(this._selected == 1)
			  this._points[ this._selected ].setY(y);			
			else 	if(this._selected == 3)
			  this._points[ this._selected ].setX(x);			
			else
			  this._points[ this._selected ].setPoint(x, y);
		} else {
		  this._points[ this._selected ].setPoint(x, y);
		}
    this._moved = true;
  }  
}



/**
 * Checks if exists some compatible element in the given point and, 
 * in affirmative case, adds it to the relation, after removal of 
 * the old element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of the possible element
 * @param {Number} y Coordinate y of the possible element
 */
Relation.prototype._checkForNewNodes = function( x, y) {

  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {
 
	  var newElem = this._diagram.reassignRelationTo( this, x, y );
    
    if( newElem != this ) {


      if( this._selected == 0 ) {

        this.setElementA( newElem );        
      } else {

        this.setElementB( newElem );    
      }

    }
  }
}



/**
 * Reacts to the event of release the button by 
 * the user in the given coordinates
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the point
 * @param {Number} y Coordinate y of the point
 */
Relation.prototype.drop = function( x, y ) {
  if( this._moved ) {
    this._checkForNewNodes( x, y );   
  } else if( this._selectedBefore ) {
    this._selectComponent( x, y );
  }

  this._selectedLine = false;
  this._selectedPoint = false
  this._moved = false;

  this._delUselessPoints();
  this.notifyChange();

}



/**
 * Notifies to the relation what a change in some 
 * of its components or nodes has been produced
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */
Relation.prototype.notifyChange = function() {

  this._delUselessPoints();
  this.updateParent();
  this._calculateLineEnds();
  this._updateComponents();


  for( var i in this._relations ) {
    this._relations[i].notifyChange();
  }
  
}



/**
 * Notifies to the relation that must re-draw to 
 * self because some element has changed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDraw
 */
Relation.prototype.notifyDraw = function() {
  if( this._diagram ) {
    this._diagram.draw();
  }
}



/**
 * Reacts to the deselect by the diagram. An action of the user 
 * normally closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselect
 */
Relation.prototype.deselect = function() {
  this._deselectComponent();
  
  this._selectedBefore = false;
  this._selected = -1;
}



/**
 * Calculates the final points of the relation 
 * that are in contact with the nodes
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
 */
Relation.prototype._calculateLineEnds = function( ) {

  var pointA, pointB;
  var npoints = this._points.length;

  if( this._elemA == this._elemB ) { 

		var center = this._elemA.getCentralPoint();
    var cx = center.getX();
    var cy = center.getY();

		//If this method has been called previously and all points of the relation to self has been stablished
		var x = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var y = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var heightPoints;
		var widthPoints;

		if(this._selected == 2 || this._selected == 0 || this._selected == npoints-1 || 
		   (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing){

			if((x - cx) > 0){
				if((y-cy) > 0){	//Fourthy quadrant

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

					heightPoints = y - pointA.getY();
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() + heightPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				} else {	//First quadrant

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

					heightPoints = pointA.getY() - y;
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() - heightPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				}
			} else {

				if((y-cy) > 0){	//Third quadrant

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );

					heightPoints = y - pointA.getY();
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() + heightPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				} else {	//Second quadrant

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
					heightPoints = pointA.getY() - y;
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() - heightPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				}
			}    
		} else if(this._selected == 3){
			
			x = this._points[3]._x;
			y = this._points[3]._y;

			pointA = this._elemA.getLinkCentered( cx, this._points[0]._y  );

			if((x - cx) > 0){

				pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );
				widthPoints  = x - pointB.getX();
				widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
				this._points[2].setX(pointB.getX() + widthPoints );
				this._points[3] = new Point( pointB.getX() + widthPoints, cy );
			} else {

				pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
				widthPoints  = pointB.getX() - x;
				widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
				this._points[2].setX(pointB.getX() - widthPoints );
				this._points[3] = new Point( pointB.getX() - widthPoints, cy );
			}
		} else if(this._selected == 1){

			x = this._points[1]._x;
			y = this._points[1]._y;

			pointB = this._elemA.getLinkCentered( this._points[4]._x, cy );

			if((y - cy) > 0){

				pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
				heightPoints  = y - pointA.getY();
				heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
				this._points[1] = new Point( cx, pointA.getY() + heightPoints );
				this._points[2].setY(pointA.getY() + heightPoints );
			} else {

				pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
				heightPoints  = pointA.getY() - y;
				heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
				this._points[1] = new Point( cx, pointA.getY() - heightPoints );
				this._points[2].setY(pointA.getY() - heightPoints);
			}
		} else if(this._selected == -1){

			var movX = 0;
			var movY = 0;
			if(this._elemA._moved){

				var movX = (this._elemA._x - this._elemA._prex)/2;
				var movY = (this._elemA._y - this._elemA._prey)/2;
			
				this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
				this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

				pointA = this._points[0];
				pointB = this._points[4];

				this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
				this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
				this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
			} 
		} 

		this._points[0] = pointA;
	  this._points[4] = pointB;
	
		//If there are more of five points, they must be removed
		while(this._points[5])
			this._points.pop();

  } else {
  
    if( npoints > 2 ) {
      pointA = this._elemA.getLinkCentered( this._points[1] );
      pointB = this._elemB.getLinkCentered( this._points[ npoints - 2 ] );
      
      this._points[0] = pointA; 
      this._points[ npoints - 1 ] = pointB; 
      
    } else {
       
      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );
      
      this._points[0] = pointA; 
      this._points[1] = pointB; 
    }
  }
}


/**
 * The relation and its components are drawn with the defined style
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/ 22/09/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas 
 */
Relation.prototype.draw = function( context ) {
  var npoints = this._points.length;
  //Draw the line with his defined styles
  if( this._line ) {
	this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );
  }
  
  //Draw the style tip of link
  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();   
    var angle = Math.atan2( by - ay , bx - ax );
 
    this._end.draw( context, bx, by, angle, this.getLineColor() );  
  }
  
  //Draw the style end of link
  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );
    
    this._start.draw( context, bx, by, angle, this.getLineColor() );  
  
  }
  
  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;
    
    for( i = 0; i < this._points.length; i++ ) {
      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }
  }
  
  if( this._selected > -1 ) {
    this._drawComponentsShape( context );
  }
  this._drawComponents( context );

}


/**
 * The lie of the relation is drawn
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del liendo de dibujo
 */
Relation.prototype.drawShape = function( context ) {
  if( !( this._selectedPoint && this._selected == 0 || this._selected == this._points.length -1 ) ) {
	  this._calculateLineEnds();
  }
  
  context.save();
  context.lineWidth = 2;
  context.strokeStyle = RelationStyle.shape_color;
  
  context.beginPath();
  context.moveTo( this._points[0].pixelX(), this._points[0].pixelY() );
  
  var i;
  for( var i = 1; i < this._points.length; i++ ) {
    context.lineTo( this._points[i].pixelX(), this._points[i].pixelY() );
  }
  
  context.stroke();
  context.restore();
}



/**
 * Keeps the reference to a top node in which the relation is 
 * contained to move the points of the relation if the 
 * parent node changes your position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setParent
 * @param {Node} nparent Parent node to which the relation belong
 */
Relation.prototype.setParent = function( nparent ) {
  if( nparent instanceof Node ) {
    this._parent = nparent;
  } else {
    this._parent = null;
  }
}



/**
 * Checks if the relations is container in a container node. This 
 * is produced when its two elements are contained within the same node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updateParent
 */
Relation.prototype.updateParent = function() {
  if( this._parent ) {
    this._parent.delChild( this );
    this._parent = null;
  }
  
  if( this._elemA && this._elemB ) {

    if( this._elemA.getParent() != null && this._elemA.getParent() == this._elemB.getParent() ) {
      ( this._elemA.getParent() ).addChild( this );
    } else if(   this._elemA._parent && this._elemB._parent && this._elemA._parent._parent instanceof SuperNode 
							&& this._elemB._parent._parent instanceof SuperNode && this._elemA._parent._parent == this._elemB._parent._parent){
      ( this._elemA.getParent().getParent() ).addChild( this );
		
    }
  }
  
}



/**
 * Updates the points of the relation according to 
 * the relative movement to the current position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updatePosition
 * @param {Number} movx Relative movement in the x axis
 * @param {Number} movy Relative movement in the y axis
 */
Relation.prototype.updatePosition = function( movx, movy ) {
  var i;
  
  if( movx == undefined && movy == undefined ) {

    this.notifyChange();

  } else {
    for( i = 0; i < this._points.length; i++ ) {

        this._points[i].setPoint( this._points[i].getX() + movx, this._points[i].getY() + movy );
    }
    
    for( i in this._components ) {
      this._components[i].updatePosition( movx, movy );
    }
    
    for( i in this._relations ) {
      if( this._relations[i]._parent != this._parent ) {
        this._relations[i].notifyChange();
      }
    }
  }
}




/**
 * The grafical style of the relations's lines is defined 
 * by an object of type RelationLine that draws the lines
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setLine
 * @param {RelationLine} nline Object that defines the style of the lines
 */
Relation.prototype.setLine = function( nline ) {
  if( nline instanceof RelationLine ) {
    this._line = nline;
  }
}



/**
 * The grafical style of the line's end is defined by an 
 * object of type RelationEnd that draws it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setEnd
 * @param {RelationEnd} nline Objet that defines the end's style of the relation
 */
Relation.prototype.setEnd = function( nend ) {
  if( nend instanceof RelationEnd ) {
    this._end = nend;
  }
}



/**
 * Teh grafical style of the relation's start is defined by an 
 * object of type RelationEnd that drawn it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setStart
 * @param {RelationEnd} nline Objet that defines the start's style of the relation
 */
Relation.prototype.setStart = function( nstart ) {
  if( nstart instanceof RelationEnd ) {
    this._start = nstart;
  }
}



/**
 * Returns the element Node that contains the 
 * relation, if has a parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParent
 * @return {Node} Element that contains to the relation
 */
Relation.prototype.getParent = function() {
  return this._parent;
}



/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points 
 * and form a straight line 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _delUselessPoints
 * @private
 */
Relation.prototype._delUselessPoints = function() {
  var ultimo = this._points.length - 1;
  
  if( this._elemA != this._elemB ) {
    if( this._elemA instanceof Node ) {
      if( this._points[1] != this._points[ ultimo ] && this._elemA.isOver( this._points[1] ) ) {
        this._points.shift();
        ultimo -= 1;
      }
    }
    
    if( this._elemB instanceof Node ) {
      if( this._points[ ultimo - 1] != this._points[0] && this._elemB.isOver( this._points[ ultimo - 1 ] ) ) {
    	  this._points.pop();
      }
    }
    var i;  
    for( i = 1; i < this._points.length-1; i++ ) {
      if( this._selectLine( this._points[i-1],
                            this._points[i+1], 
                            this._points[i].getX(), 
                            this._points[i].getY(), 10 ) )
      {
        this._points.splice(i, 1);
      }
    }
  }
}



/**
 * Returns the central point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getCentralPoint
 * @return {Point} Central point of the relation
 */
Relation.prototype.getCentralPoint = function() {
  var central = parseInt( this._points.length / 2 ) - 1;
  var ax = this._points[central].getX();
  var ay = this._points[central].getY();
  var bx = this._points[central + 1].getX();
  var by = this._points[central + 1].getY();
  
  return new Point( (ax + bx ) / 2, (ay + by ) / 2 );
}



/**
 * Returns the central point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getLinkCentered
 * @return {Point} Central point of the relation
 */
Relation.prototype.getLinkCentered = function( x, y ) {
  return this.getCentralPoint();
}



/**
 * Don't perfom any action
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
Relation.prototype.notifyDeleted = function( elem ) {}



/**
 * Deletes the element and all element make no sense 
 * to maintain by its relation with himself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method remove
 */
Relation.prototype.remove = function( ) {  
  var i;
  
  while( this._relations[0] ) {
    ( this._relations.pop() ).remove();
  }
  
  this._elemA.notifyDeleted( this );
  this._elemB.notifyDeleted( this );
  
  if( this._parent ) {
    this._parent.delChild( this );
  }
  if(this._diagram)  this._diagram.notifyDeleted( this );
}



/**
 * Returns a identifying strig of the element's class
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method toString
 * @return {String} Identifying name of the element's class
 */
Relation.prototype.toString = function() {
  return 'Relation';
}
    




/**
 * The grafical style of the relations's lines is defined as style
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set
 */
Relation.prototype.setLineStyle = function(style) {
	if(style.toLowerCase()=='solid'){
		//check if it is his actual style and doesn't changed before 
		if(this.getLineStyle()!='solid' && !this._lineStyleChanged)
			{
			  this._lineStyleChanged=true;
			}
		else if(this.getLineStyle()!='solid' && this._lineStyleChanged)this._lineStyleChanged=false;
		
		this.setLine( new SolidLine() );
		return true;
	}
	else if(style.toLowerCase()=='dashed'){
		this._lineStyle='dashed';
		//check if it is his actual style and doesn't changed before 
		if(this.getLineStyle()!='dashed' && !this._lineStyleChanged)
			{
			  this._lineStyleChanged=true;
			}
		else if(this.getLineStyle()!='dashed' && this._lineStyleChanged)this._lineStyleChanged=false;

		this.setLine( new DashedLine() );
		return true;
	}
	return false;
}









/**
 * Get the grafical style of the relations's lines
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 *
 * @method setLine
 * @return {String} string that defines the style of the lines
 */
Relation.prototype.getLineStyle = function() {
	if(this._line instanceof SolidLine){
		return "solid";
	}
	else if(this._line instanceof DashedLine){
		return "dashed";
	}
	return "";
}




/**
 * The color of the relations's lines is defined as color
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines
 */
Relation.prototype.setLineColor = function(color) {
	this._line_color=color;
}





/**
 * Return color of the relations's lines
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getLineColor
 * @return {CSSColor} string with the color of the lines
 */
Relation.prototype.getLineColor = function() {
	return this._line_color;
}





/**
 * The width of the relations's lines is defined as width
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines
 */
Relation.prototype.setLineWidth = function(width) {
	this._line_width=width;
}



/**
 * Return width of the relations's lines
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getLineWidth
 * @return {Number} The width of the lines
 */
Relation.prototype.getLineWidth = function() {
	return this._line_width;
}



/**
 * Show contextual menu of a Relation
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showContextualMenu
 * @param {Number} x represents the upper left x coordinate of the contextual menu
 * @param {Number} y represents the upper left y coordinate of the contextual menu
 *
 */
Relation.prototype.showContextualMenu = function(x,y){

	//In the case what the contextual menu already is activated or the node hasn't any item, exits of this method 
	if(this._diagram._activeMenu || !this._menu.length){
		return;
	}

	this._diagram._activeMenu = true;

	//Creates div that will contain the different options or items
	var div = document.createElement('div'); 
	div.className = "ud_contextualMenu";
	div.style.cursor = 'pointer';
	
	//Adds items or options to the container div
	for(var i=0;i<this._menu.length;i++)
	   this.addItem(this._menu[i],div);	

	//Adds div to the html document
	document.body.appendChild(div);

	this._diagram._divMenu = div;

	div.style.top = y + "px";
	div.style.left = x + "px";	
}



/**
 * Remove contextual menu of a html document
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method removeContextualMenu
 */

Relation.prototype.removeContextualMenu = function(){

	if(this._diagram._activeMenu){

		//Remove container div of the html document
   	document.body.removeChild( this._diagram._divMenu );
		
		this._diagram._activeMenu = false;
   	this.notifyDraw();
	}
}


/**
 * Add a item to the contextual menu
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method addItem
 * @param {array} item Array whose position 0 represents the actions to perfom when the item is pressed, 
											 and the position 1 represents the text that appears in the contextual menu
 * @param {div} divContainer Represents the div that contains all items of the contextual menu.
 *
 */

Relation.prototype.addItem = function(item, divContainer){		
 
	//Create a div for containing to the item
	var div = document.createElement('div'); 
	div.className = "ud_contextualMenuItem";

	//Creates a span element that contains a text node with the name of the item	
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(item[1]));
	
	//Adds item to contextual menu
	div.appendChild(span);
	divContainer.appendChild(div);

	//Associated the item[0] function to the mouseup event
	div.addEventListener('mouseup', item[0] , false);
}
	

/**
 * Show the dialog for changing the background-color of the Node. 
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 13/08/2012
 *
 * @method showStyleDialog
 * 
 */

Relation.prototype.showStyleDialog = function( params ) {
	
	var that = params.that || this;
	var x= params.x || 0;
	var y= params.y || 0;
	//Keep the color for the case that the button 'cancel' is pressed
	var colorLineBackup=that.getLineColor();
	
	//Take the background-color without the # character.
	var numHex = that.getLineColor().split('#')[1];		

	//Disjoin the six digit into groups of two and add each group into a array position
	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),	
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupLineStyle";


	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');	

	//div that contains the hexadecimal background-color 
	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	//Red color
	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');
	
	//Green color
	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	//Blue color
	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	//Select color
	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	//Create form
	var form = document.createElement("form");
  
	
  //Controls for line
  var _divLine = document.createElement('div');
  _divLine.setAttribute("id","divLine");
  //create line's width number control
  var number_width = document.createElement("input");
  number_width.setAttribute( "type", "number" );
  number_width.setAttribute("name","width");
  number_width.setAttribute( "value", that.getLineWidth() || "1" );  
  number_width.setAttribute("style","width: 58px");
  var label_width= document.createElement("label");
  label_width.innerHTML="line width";
  label_width.setAttribute("for","width");
   
  _divLine.appendChild(number_width);
  _divLine.appendChild(label_width);

  //create line's style select control
  var select_style = document.createElement("select");
  select_style.name="style";
  value= that.getLineStyle() || 'solid';
  select_style.add(new Option('Solid', 'solid'));
  select_style.add(new Option('Dashed', 'dashed'));
  for(i=0;i<select_style.length;i++){
	  if(select_style.options[i].value==value)select_style.options[i].selected=true;
  }
  select_style.style="width: 85px";
  var label_style= document.createElement("label");
  label_style.innerHTML="line style";
  label_style.setAttribute("for","style");
  
  //create buttons ok and cancel	
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "OK" );
  button_close.setAttribute("style","bottom: 15px");
  
  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "Cancel" );
  button_cancel.setAttribute("style","bottom: 15px");
  
	//method for closing the dialog that re-draw the figures of Node
  var closeWindow = function ( event ) {
	  that.setLineWidth(parseFloat(number_width.value,10));
	  that.setLineStyle(select_style.options[select_style.selectedIndex].value);
	  //Re-draw the figures of the Node for update your node style
		that.notifyDraw();

		/*
			Removes the element div that contains the 
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

	//method for closing the dialog that no re-draw the figures of Node
  var cancelWindow = function ( event ) {
	that.setLineColor(colorLineBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }
  
  //method for re-draw the dialog when the color option is changed
  var changeColorOption = function( event ) {
  		var current=that.getLineColor();
  		if(!current)current='#000000';
  		drawCurrentColor(current);
  		current=current.split('#')[1];
  		var defaultColor = new Array( parseInt(current.slice(0,2),16),	
			  parseInt(current.slice(2,4),16),
				parseInt(current.slice(4,6),16));
  		//draw the rectangles of each color primary in the dialog
  		drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
  		drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
  		drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
  }
  
	//Add event to the 'close' and 'cancel' button
	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

	//Prevents the information from the form to be sent
  form.onsubmit = function() { return false; }
	
	//Set the focus to the button
	button_close.focus();

	//Add controls to the form 
	form.appendChild(_divLine);
	form.appendChild(select_style);
	form.appendChild(label_style);
	form.appendChild(document.createElement('br'));
	form.appendChild(button_close);
	form.appendChild(button_cancel);
	
	//Add to the div Container
	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);
	

	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose 
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		//draw (R,G o B) according to color level 
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		//draw a rectangle of red,green or blue color
		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		//draw circle about drawn rectangle before
		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		//draw value between 0 and 255
		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter. 
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){
		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color 
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code, 
	 *															where each position represents a primary color. 
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		} 


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}

		var font = document.createElement("font");
		font.style.color = '#' + color;
		var text=document.createTextNode('#');
		var text_color=document.createTextNode(color);
		font.appendChild(text);
		font.appendChild(text_color);
		_divRGB.appendChild(font);
		that.setLineColor('#' + color);
	}

	/**
	 * Method that modify the hexadecimal color of the Node 
	 * when it is pressed on one of the rectangles 
	 *
	 * @author Rafael Molina Linares  / Alejandro Arrabal hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;	
		var mousey = event.pageY - this.offsetTop;	
		
		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;					
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;	
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;
			
			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;	
			
			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(that.getLineColor());
	}




	//draw the rectangles of each color primary in the dialog
	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

	//draw the rectangle with the combination color of the three primary color
    drawCurrentColor(that.getLineColor());


	//Conver the color decimal to hexadecimal code and set this color like background-color of the Node
	colorHex(defaultColor);



	//Add "selectColor" method to the 'mousedown' event
	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	//Add container div to the html body
	document.body.appendChild(_divContainer);

  //Center the form

  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";  
}



/**
 * Set the menu of the node with the different options 
 * that the contextual menu of node has, as well as 
 * the actions associated with each option. The passed
 * array is contained by pairs [actions,name], where name is
 * the name that will have the option in the menu, and actions
 * are the actions that will be performed when this option be
 * pressed
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method setMenu
 * @param {Array} items contain at the contextual menu
 */

Relation.prototype.setMenu = function(items){
	if(items instanceof Array){
		this._menu = items;
	}
}


/**
 * Retuns the array that contains the information 
 * about the contextual menu of the node
 * 
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method getMenu
 * @return {Array} Information about the node's menu
 */

Relation.prototype.getMenu = function(){
	return this._menu;
}



/**
 * Show the dialog for changing the background-color of the Node. 
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 13/08/2012
 *
 * @method showDirectionDialog
 * 
 */

Relation.prototype.showDirectionDialog = function( params ) {
	params=params || {}
	var that = params.that || this;


	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupDirection";

	var _divNavegability = document.createElement('div');
	_divNavegability.setAttribute('id','divNavegability');


	//Create form
	var form = document.createElement("form");
	
  //Controls for line
  
  //create select control for the line's direction
  var select_direction = document.createElement("select");
  select_direction.setAttribute("name","direction");
  value=that.getDirection();
  select_direction.add(new Option('none', 'none'));
  select_direction.add(new Option('a<-b', 'a'));
  select_direction.add(new Option('a->b', 'b'));
  select_direction.add(new Option('a<->b', 'ab'));
  for(i=0;i<select_direction.length;i++){
	  if(select_direction.options[i].value==value)select_direction.options[i].selected=true;
  }
  select_direction.setAttribute("style","width: 85px");
  
  var header_direction= document.createElement("h5");
  header_direction.innerHTML="Navegability:";
  

    //create ok and cancel buttons	
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "OK" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "Cancel" );

 
	//method for closing the dialog that re-draw the figures of Node
  var closeWindow = function ( event ) {
	  that.setDirection(select_direction.options[select_direction.selectedIndex].value);
	  //Re-draw the figures of the Node for update your node style
		that.notifyDraw();

		/*
			Removes the element div that contains the 
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

	//method for closing the dialog that no re-draw the figures of Node
  var cancelWindow = function ( event ) {
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }
  
  
	//Add event to the 'close' and 'cancel' button
	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

	//Prevents the information from the form to be sent
  form.onsubmit = function() { return false; }
	
	//Set the focus to the button
	button_close.focus();

	//Add controls to the form 
	form.appendChild(select_direction);
	form.appendChild(document.createElement("br"));
	form.appendChild(button_close);
	form.appendChild(button_cancel);

	_divNavegability.appendChild(form);
	_divContainer.appendChild(header_direction);
	_divContainer.appendChild(_divNavegability);

	//Add container div to the html body
	document.body.appendChild(_divContainer);

	//Center the form

  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";  
}



/**
 * The direction of the relations's line is defined 
 * by an string(a,b or ab direction)
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 13/10/2012
 *
 * @method setDirection
 * @param {String} direction String that define the direction of the relation
 */
Relation.prototype.setDirection = function( direction ) {
	direction=direction.toLowerCase();
	switch(direction) {
	//if the relation was directed to a
	case 'a':
		 this.setDirectionToA(true);
		 this.setDirectionToB(false);
		 break;
		//if the relation was directed to b
	case 'b':
		this.setDirectionToA(false);
		this.setDirectionToB(true);
		break;
		//if the relation was directed to a and b
	case 'ab':
		this.setDirectionToA(true);
		this.setDirectionToB(true);
		break;
		//if the relation is not directed
	case 'none':
		this.setDirectionToA(false);
		this.setDirectionToB(false);
		break;
  }
}




/**
 * Set if the relation is directed to A elem or not
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to A elem or not
 */
Relation.prototype.setDirectionToA = function(directed) {
	this._directionA=directed;
	//In afirmative case the opentip is set at the start
	if(directed==true){
		this.setStart(new OpenTip());
	}
	//In other case is remove(if exist)
	else{
		if(this._start instanceof OpenTip)this._start=null;
	}
}



/**
 * Set if the relation is directed to B elem or not
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to B elem or not
 */
Relation.prototype.setDirectionToB = function(directed) {
	this._directionB=directed;
	//In afirmative case the opentip is set at the end
	if(directed==true){
		this.setEnd(new OpenTip());
	}
	//In other case is remove(if exist)
	else{
		if(this._end instanceof OpenTip)this._end=null;
	}
}




/**
 * Get the relation direction to A elem.
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirectionToA
 * @return {Boolean}If the relation is directed to A elem or not
 */
Relation.prototype.getDirectionToA = function() {
	if(this._directionA!=undefined)return this._directionA;
	else if(!(this._start instanceof OpenTip) && !(this._end instanceof OpenTip))return true;
	else if(this._start instanceof OpenTip)return true;
	return false;
}




/**
 * Get the relation direction to B elem.
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirectionToB
 * @return {Boolean}If the relation is directed to B elem or not
 */
Relation.prototype.getDirectionToB = function() {
	if(this._directionB!=undefined)return this._directionB;
	else if(this.getElementA()==this.getElementB())return false;
	else if(!(this._start instanceof OpenTip) && !(this._end instanceof OpenTip))return true;
	else if(this._end instanceof OpenTip)return true;
	return false;
	
}





/**
 * Return the direction of the relations's line defined 
 * by an string(a,b or ab direction)
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirection
 * @return {String} direction String that define the direction of the relation
 */
Relation.prototype.getDirection = function() {

	if(this._directionA==true && this._directionB==true){
		return 'ab';
	}
	else if(this._directionA==true){
		return 'a';
	}
	else if(this._directionB==true){
		return 'b';
	}
	return 'none';
}




/**
 * Get the object found under the first point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getElementA
 * @return {Element} first element of Relation
 */

Relation.prototype.getElementA = function() {
  return this._elemA;
}




/**
 * Get the object found under the second point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getElementB
 * @param {Element} Second element of Relation
 */

Relation.prototype.getElementB = function() {
  return this._elemB;
}



/**
 * Get the end of relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/06/2013
 *
 * @method getEnd
 * @param {RelationEnd} End of the Relation
 */

Relation.prototype.getEnd = function() {
  return this._end;
}



/**
 * Get the Start of the relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/06/2013
 *
 * @method getStart
 * @param {RelationEnd} Start of the Relation
 */

Relation.prototype.getStart = function() {
  return this._start;
}



/**
 * Get the Relations associated to Relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 13/06/2013
 *
 * @method getRelations
 * @param {Array} Relations associated to Relation
 */

Relation.prototype.getRelations = function() {
  return this._relations;
}
