/**
 ** MODULE NAME: 
 **	  GeneralizationSet.js
 **
 ** DESCRIPTION:
 **   Define the properties and methods of the generalizationset's node of the usecase diagram of UML 2.
 **
 ** DEVELOPED BY:
 **   Alejandro Arrabal Hidalgo (AAH)
 **
 ** SUPERVISED BY:
 **		Jos� Ra�l Romero, PhD (Associate Professor, University of C�rdoba, Spain)
 **
 ** HISTORY:
 **     001 - APR 2013 - AAH - Second version release
 ** 	000 - Oct 2012 - AAH - Initial version release
 **
 ** CONTACT INFO:
 ** 	Jos� Ra�l Romero, http://www.jrromero.net
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
 * GeneralizationSet class constructor, creates a relation of GeneralizationSet in the usecase diagram
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @class GeneralizationSet
 * @extends Relation
 *
 */

var GeneralizationSet = function( params ) {
  params=params || {};
  //Pivot point counter
  this._pivotP=2;
  GeneralizationSet.baseConstructor.call(this);
}
JSFun.extend(GeneralizationSet,Relation);


/**
 * Adds new item to the stereotype fields component of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addStereotype
 * @param {String} text Text that will contain the new field of the stereotype component
 *
 */

GeneralizationSet.prototype.addStereotype = function(text){
	var text = text || '';
	this._components[0].addField( '\xAB' + text + '\xBB' );
}


/**
 * Set the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} text Text to establish the new name
 *
 */
GeneralizationSet.prototype.setName = function( text ){
	this._components[1].setValue( text );
}




/**
 * Return the stereotypes of the element UML in array's form
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getStereotypes
 * @return {Array} Array with the stereotypes components of the element
 *
 */

GeneralizationSet.prototype.getStereotypes = function( ){
	return	this._components[0]._childs;
}


/**
 * Returns the name of the element UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Text of the element's name
 *
 */
GeneralizationSet.prototype.getName = function( ){
	return this._components[1].getValue();
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
GeneralizationSet.prototype.getNameAsComponent = function( ){
	return this._components[1];
}



/**
* Returns an Array wich contains the relations of the n-arry relation
*
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 25/08/2012
 *
 * @method getRelations
 * @return {Array} Array wich contains the relations of the n-arry relation
 *
 */
GeneralizationSet.prototype.getRelations=function() {
	return this._relations;
}




/**
 * Define the elements of the relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method setElements
 * @param {Array} Array that contains elements of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
GeneralizationSet.prototype.setElements = function( elem,elem2) {
	//checks if the method was call whit 2 params
	if(!(elem instanceof Array)){
		if(GeneralizationSet.base.setElements.call(this,elem,elem2))
		{
			this.updateParent();
			if(!this._orientation)this._orientation=this._calculateOrientation();
			return true;
		}
		return false;
	}
	//checks if all the components are nodes
	for( i in elem){
		  if(!(elem[i] instanceof Node) ) {
			  return false;
		  }
	  }
	//checks if the array contains two elements at least
	 if(elem.length>1)
		 {
		 	this.setElements(elem.shift(), elem.shift());
		 	while(elem[0])this.addElement(elem.shift());
			this.updateParent();	
			if(!this._orientation)this._orientation=this._calculateOrientation();
			this._calculateLineEnds();
			return true;
		 }
	 else{
		 return false;
	 }

}



/**
 * Returns the relation associated to an element.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 04/09/2012
 *
 * @method getRelation
 * @param {Element} elem  Element witch associated relation is gone be get. 
 * @return {Relation}  The relation associated to the element.
 */
GeneralizationSet.prototype.getRelation = function( elem) {
 for( i in this._relations){
			if(this._relations[i]._elemA===elem || this._relations[i]._elemB===elem)return this._relations[i];
	 }
}



/**
 * Adds a element to relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 * @method addElement
 * @param {Element} Element to be add to relation
 * @return {Boolean} If the add of the new element has been produced
 */
GeneralizationSet.prototype.addElement = function( elem) {
	//check if the elem is a node
	if(!(elem instanceof Node) )return false;
	  
    //check if the node was part of the relation
	for(i in this._relations ) if(this._relations[i]._elemA==elem || this._relations[i]._elemB==elem )return false;
 
   //add the new relation
   relation=new SetLine({a:elem,b:this});  
   //this._relations.push(relation);
   relation._calculateLineEnds();

   //adding the relation point
   var newP=new Point(relation.getCentralPoint());
   this._points.splice(this._pivotP,0,newP);

   relation._calculateLineEnds();
      
   //linking the setline point
   relation._points[2]=this._points[this._pivotP];
   this._pivotP++;
      
   this.notifyChange();
   return true;

}




/**
 * Remove an element from relation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 2/03/2013
 *
 * @method delElement
 * @param {Element} Element to be remove from relation
 * @return {Boolean} If the remove of element has been produced
 */
GeneralizationSet.prototype.delElement = function( elem) {
	//check the element
	if(!(elem instanceof Node) )return false;
	  
  //removing relation plus his point
  for(i in this._relations ){
	  if(this._relations[i]._elemA===elem  || this._relations[i]._elemB===elem ){
		  this._relations[i].remove();
		  return true;
	  }
  }
     
  return false;
}




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
GeneralizationSet.prototype.notifyDeleted = function( elem ) {
	  for(i=0;i<this._relations.length;i++ ){
		  if(this._relations[i]===elem && this._relations[i].getType()=="SetLine"){
			  this._relations.splice( i, 1 );
			  this._pivotP--;
			  this._points.splice( 2+i, 1 );
		  }
	  }
}


/**
 * Calculates the final points of the relation 
 * that are in contact with the nodes
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _calculateLineEnds
 * @private
 */

GeneralizationSet.prototype._calculateLineEnds = function( ) {
	  var pointA, pointB;
	  var npoints = this._points.length;

	  //setting initial points
	   if(!this._points[3]){
		      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
		      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );
		      
		      this._points[0] = pointA; 
		      this._points[1] = pointB; 
		      this._points[1] = new Point(this.getCentralPoint());
		      this._points[2]= new Point(this.getCentralPoint());
		      this._points[3]=this._points[1];
		      this._points[1]=this._points[2];
		      this._points[2]=this._points[3];
		      this._pivotP=2;
              this._points[3]= pointB;
		      
		 }

      //self relation
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
			}
			else if(this._selected == 2){

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
			   
			   else if(this._selected == -1){

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

	  }
	  //normal relation
	  else {
		    //only have the initial points
		  if( npoints == 4 ) {
		      pointA = this._elemA.getLinkCentered( this._points[1] );
		      pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );
		      
		      this._points[0] = pointA; 
              this._points[3]= pointB;
		    }
		  
		    //if have more points
		    else if(npoints > 4 ){
		        pointA = this._elemA.getLinkCentered( this._points[1] );
		        pointB = this._elemB.getLinkCentered( this._points[this._pivotP] );

		        this._points[0] = pointA; 
		        this._points[this._points.length-1]= pointB;
		        
		        //if pivot point changes, update setLinePoints
		        for(i=0;i<this._relations.length;i++)this._relations[i]._calculateLineEnds();
		       	if(this._orientation){
		       		for(i=1;i<this._pivotP;i++)this._points[i].setX(this._points[this._pivotP].getX());
		       	    //keeping the pivot point and the first setLinePoint split
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setY(this._points[1].getY()+5);	
		       		 }
		       		}
		       	else{
		       		for(i=1;i<this._pivotP;i++)this._points[i].setY(this._points[this._pivotP].getY());
		       	    //keeping the pivot point and the first setLinePoint split
		       		if(this._points[1].getX()==this._points[this._pivotP].getX()
		       				&&this._points[1].getY()==this._points[this._pivotP].getY()){
		       		  this._points[1].setX(this._points[1].getX()+5);	
		       		 }
		       		}
		    }
		    //intial points not defined
		    else {

			      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
			      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );
			      
			      this._points[0] = pointA; 
			      this._points[1] = pointB; 
			      this._points[1] = new Point(this.getCentralPoint());
			      this._points[2]= new Point(this.getCentralPoint());
			      this._points[3]=this._points[1];
			      this._points[1]=this._points[2];
			      this._points[2]=this._points[3];
			      this._pivotP=2;
	              this._points[3]= pointB;
		    }
		  }
}

/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points 
 * and form a straight line 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
GeneralizationSet.prototype._delUselessPoints = function() {
	  var i;  
	  //only the points of the main rrelation can be erased
	  for( i = this._points.length-1; i > this._pivotP; i-- ) {
	    if(this._selectLine( this._points[i+1],
	                          this._points[i-1], 
	                          this._points[i].getX(), 
	                          this._points[i].getY(), 10 ) )
	    {

	      this._points.splice(i, 1);
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
GeneralizationSet.prototype.draw = function( context ) {
  var npoints = this._points.length;
  var points=[];
  //obtaining points
  for(i=this._pivotP; i<npoints ;i++){

	  points.push(this._points[i]); 
  }
  //Draw the style line
  if( this._line ) {
	  this._line.draw( context, points, this.getLineColor(),this.getLineWidth() );

  }
  //Draw the style tip of link
  if( this._end ){
	 
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx =this._points[ npoints - 1 ].getX();
    var by =this._points[ npoints - 1 ].getY();   
    var angle = Math.atan2( by - ay , bx - ax );
    this._end.draw( context, bx, by, angle, this.getLineColor() );  

  }
  
  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;
    
    for( i = 0; i < this._points.length; i++ ) {

      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }

  }	  
	/*Drawing the line for the setlines*/
  	  //getting the points
	  points=[];
	  for(i=1;i<=this._pivotP;i++){
	
		  points.push(this._points[i]);
	  }
	  if(points.length>1){
		  
		  //getting the line style
		  if(this.getLineStyle()=="solid")var a=new SolidLine();
		  else{var a=new DashedLine();}
		  
	      a.draw(context, points, this.getLineColor(),this.getLineWidth());
	  }

	 /*Drawing the main line*/
  	  //getting the points
	  points=[];
	  points[0]=this._points[0];
	  points[1]=this._points[1];
	  points[2]=this._points[this._pivotP];
	  
	  //getting the line style
	  if(this.getLineStyle()=="solid")var a=new SolidLine();
	  else{var a=new DashedLine();}
      
	  a.draw(context, points, this.getLineColor(),this.getLineWidth());
      

  if( this._selected > -1 ) {
    this._drawComponentsShape( context );

  }
  this._drawComponents( context );

}

/**
 * Checks if the given point is over some element of the relation and, 
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 4/03/2013
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
GeneralizationSet.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();  
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/* 
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {
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

  // you have clicked on one point
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
    
    // you have clicked on one lines
    for( var i = 0; i < this._points.length-1; i++ ) {
      if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {  

        if( this._selected > -1 )
          this._selectedBefore = true;
            
        this._selected = i;
        //Add new point to the relation and update pivot point if this comes after pivot point
        if(i>=this._pivotP){
            this._selectedLine = true;
            this._component=false;    
        	this._points.splice( this._selected, 0, new Point(x,y) );
        }
        //If is one point of setLinePoints select pivot point
        else if(i>=1){       
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = this._pivotP;
        }
        //If the first setLine was cliked select his setLinePoint
        else{
        	this._selectedPoint = true;
            this._component=false;
           	this._selected = 1;
        	
        }
        return true;
      }
    }
    


  return false;
}




/**
 * Calculates element orientation.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method __calculateOrientation
 * @return {Boolean} True if the element was oriented along the x axis, False in other case.
 * @private
 */
GeneralizationSet.prototype._calculateOrientation = function() {
	  //getting the orientation based on the slope of the line
	  var m=(this._elemA.getCentralPoint().getY()-this._elemB.getCentralPoint().getY())
	  /(this._elemA.getCentralPoint().getX()-this._elemB.getCentralPoint().getX());
      return (m<1&&m>-1);
}



/**
 * Check is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isXOriented
 * @return {Boolean} If the element was oriented along the x axis
 */
GeneralizationSet.prototype.isXOriented = function() {
	return this._orientation;
}




/**
 * Check is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method _isYOriented
 * @return {Boolean} If the element was oriented along the y axis
 */
GeneralizationSet.prototype.isYOriented = function() {
	return !this._orientation;
}




/**
 * Set is the element orientation is along the x axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setXOrientation
 */
GeneralizationSet.prototype.setXOrientation = function() {
	this._orientation=true;
}




/**
 * Set is the element orientation is along the y axis.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method setYOrientation
 */
GeneralizationSet.prototype.setYOrientation = function() {
	this._orientation=false;
}




/**
 * return the orientation of the element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 14/05/2013
 *
 * @method getOrientation
 * @return {String} The axis of the element orientation
 */
GeneralizationSet.prototype.getOrientation = function() {
	if(this._orientation)return "x";
	return "y";
}



/**
 * The grafical style of the GeneralizationSet's lines and SetLines will be defined as style
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set to the relation and all his SetLines
 */
GeneralizationSet.prototype.setLineStyle = function(style){
	//try to change the style of the relation
	if(!(GeneralizationSet.base.setLineStyle.call(this,style)))return false;
	//try to the change the style of the SetLines
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine"){
			if(!(this._relations[i].setLineStyle(style)))return false;
		}		
	}
	return true;
}




/**
 * The color of the GeneralizationSet's lines and SetLines will be defined as color
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines and SetLines
 */

GeneralizationSet.prototype.setLineColor = function(color){
	//change the color of the relation
	GeneralizationSet.base.setLineColor.call(this,color)
	//change the color of the SetLines
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineColor(color);		
	}
}




/**
 * The width of the GeneralizationSet's lines and SetLines will be defined as width
 * 
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/06/2013
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines and SetLines
 */
GeneralizationSet.prototype.setLineWidth = function(width) {
	//change the color of the relation
	GeneralizationSet.base.setLineWidth.call(this,width)
	//change the color of the SetLines
	for(i in this._relations){
		if(this._relations[i].getType()=="SetLine")this._relations[i].setLineWidth(width);		
	}
}




/**
 * Constructor de la clase SetLine
 * Representa una relación n-aria
 * 
 * @author Alejandro Arrabal Hidalgo
 * @update 07/10/2012
 *
 * @class SetLine
 * @extends Relation
 */
var SetLine = function( params ) {
	  params=params || {};
	  this._last=null;
	  this._id = 0;
	  this._type = 'SetLine';
	  this._line_color= '#000000';
	  this._line_width=1.25;
	  this._points = [ new Point(), new Point() ];
	  
	  this._selected = -1;
	  this._selectedBefore = false;
	  this._moved = false;
	  this._activeComponent = null;

	  
	  this._selectedLine = false;
	  this._selectedPoint = false;

	  this._relations= [];
	  this._components = [];
	  this._diagram = null;

	  this.setElements( params.a, params.b );
	  f=this;
	  if(this._elemB){
		  //Link the contextual menu to the GeneralizationSet element
		  this.setMenu([[function(){f._elemB.showStyleDialog({that: f._elemB});f._elemB.removeContextualMenu();},'Style']]);
		  //take his style from the GeneralizationSet
		  this.setLineStyle( this._elemB.getLineStyle() );
		  this.setLineColor(this._elemB.getLineColor());
		  this.setLineWidth(this._elemB.getLineWidth());
		  }
}
JSFun.extend(SetLine,Relation);




/**
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 4/03/2013
 *
 * @method _delUselessPoints
 * @private
 */
SetLine.prototype._delUselessPoints = function() {
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
 *
 */
SetLine.prototype.select = function( x, y ) {
  this._deselectComponent();
  var radius= ( this._diagram._touch) ? 4 : 0;
  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();  
}


  if(this._diagram._pressMouseRight == true || this._diagram._hold == true){
		/* 
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */	  this.setType( 'SetLine' );
	   if( this.isOver( x, y ) ) {
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
  // you have clicked on one lines
  for( var i = 0; i > this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {  

      if( this._selected > -1 )
        this._selectedBefore = true;
          
      this._selected = 1;
      this._selectedLine = true;
      this._component=false;
      return true;
    }
  }
  // you have clicked on one point
  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {
      if(i==2)return false;
      //If the setLinePoint has been selected
      if( this._selected > -1 )
        this._selectedBefore = true;
      this._selected = i;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }
  // you have clicked on one lines
  for( var i = 0; i < this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 20 ) ) {  

      if( this._selected > -1 )
        this._selectedBefore = true;
          
      this._selected = 1;
      this._selectedPoint = true;
      this._component=false;
      return true;
    }
  }

  return false;
}




/**
 * Calculates the final points of the relation 
 * that are in contact with the node and relation
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
*/
SetLine.prototype._calculateLineEnds= function() {
    if(!this._elemB)return false;
    var pointA=this._points[1];
    //setting the point in relation with the middle point and  node
    
    //if generalizationSet is x oriented
	if(this._elemB._orientation){
	    if(this._points.length<3){
	    	var pointA= new Point(this._elemB._points[1].getX(),this._elemA.getCentralPoint().getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);
	    }
	    else{
		//first checks if the set points overlap
	    	if(this._elemA.isOver(this._points[2])){
	    		if(this._elemB._points[this._elemB._pivotP].getY()
		   			<this._elemA.getY())
		   		this._points[2].setY(this._elemA.getY()-20);
	    		else{this._points[2].setY(this._elemA.getY()+this._elemA.getHeight()+20);}
	    	}
		    
			//then check if the line overlaps
		    if(this._points[0].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[2].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX());
				this._points[1].setX(this._elemA.getX()-10);

		    }
		    else if(this._points[2].getX()>=this._elemA.getX()+this._elemA.getWidth()
		    		&&this._points[0].getX()<=this._elemA.getX())
		    {
				this._points[0].setX(this._elemA.getX()+this._elemA.getWidth());
				this._points[1].setX(this._elemA.getX()+this._elemA.getWidth()+10);

		    }
			
	    }

	}
	
	//if generalizationSet is y oriented
	else{
		if(this._points.length<3){
			var pointA= new Point(this._elemA.getCentralPoint().getX(),this._elemB._points[1].getY());
		    this._points[0]=this._elemA.getLinkCentered(pointA);	
		}
		else{
			//Prevents the elementA for been overlaped by the line
			
			//first checks if the set points overlap
			if(this._elemA.isOver(this._points[2])){
		    	if(this._elemB._points[this._elemB._pivotP].getX()
		    			<this._elemA.getX())
		    		this._points[2].setX(this._elemA.getX()-20);
		    	else{this._points[2].setX(this._elemA.getX()+this._elemA.getWidth()+20);}
		    }
			
			//then check if the line overlaps
		    if(this._points[0].getY()<=this._elemA.getY()
		    		&&this._points[2].getY()>this._elemA.getY()+this._elemA.getHeight())
		    	{
		    		this._points[0].setY(this._elemA.getY()+this._elemA.getHeight());	    		
		    		this._points[1].setY(this._elemA.getY()+this._elemA.getHeight()+10);
		    	}
		    else if(this._points[0].getY()>=this._elemA.getY()+this._elemA.getHeight()
		    		&&this._points[2].getY()<=this._elemA.getY())
		    {
				this._points[0].setY(this._elemA.getY());
				this._points[1].setY(this._elemA.getY()-10);

		    }
		    
		}
		
	}

	//if the middle point is undefined 
	if(this._points.length<3){
		this._points[1]=pointA;
		this._points[1]=new Point(this.getCentralPoint());
		this._points[2]=pointA;
	}
	


	this._points[0]=this._elemA.getLinkCentered(this._points[1]);
}




/**
 * Receives a xml node with the information this.setElements( ids[ idElemA ], ids[ idElemB ] );of the relation and get it back 
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
*/
SetLine.prototype.setElementXML = function( xmlnode, ids ) {
	var idElemA = xmlnode.getAttribute( 'side_A' );
	var idElemB = xmlnode.getAttribute( 'side_B' );
	var elemB =ids[ idElemB ];
	var elemA =ids[ idElemA ];
	
	//A SetLine only had sense if is linked to a GeneralizationSet element
	if(!(elemB instanceof GeneralizationSet))return null;
	
	//Every new setLine needs to be created propretly by the generalizationSet's method addElement
	elemB.addElement(elemA);
    relation = elemB._relations[elemB._relations.length-1];
    this.setId(xmlnode.getAttribute( 'id' ));
    
    //The current object that call this function, should take his atrributes from the new relation
    var i;
    var childs = xmlnode.childNodes;
    var p = 0;
    for( i = 0; i < childs.length; i++ ) {
      if( childs[i].nodeName == 'point' ) {
    	  this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                     parseInt( childs[i].getAttribute( 'y' ) )
                                    );
        p++;
      }
    }
    elemB.delElement(elemA);
    
    
    //Then get the styles from generalizationSet object
    this.setLineStyle(elemB.getLineStyle() );
    this.setLineColor(elemB.getLineColor());
    this.setLineWidth(elemB.getLineWidth());
    this._type = 'SetLine';
    
    //linking the relation to his elements
    this._elemA=elemA;
    this._elemB=elemB;    
 
    //And the elements to this 
    elemB._relations.splice( elemB._relations.length-1, 1, this );   
    this._points[2]=elemB._points[elemB._pivotP];
    elemB._pivotP++;
    elemB.notifyChange();
    
	elemA.addRelation(this);
}